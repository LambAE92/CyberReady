/** CCRR/CEAM integration checks run against a disposable local test database. */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

process.env.PORT = '3002';
const BASE = 'http://localhost:3002/api';
const adminUsername = process.env.DEMO_ADMIN_USER;
const adminPassword = process.env.DEMO_ADMIN_PASS;
if (!adminUsername || !adminPassword) throw new Error('Set DEMO_ADMIN_USER and DEMO_ADMIN_PASS before running CCRR API tests.');
const require = createRequire(import.meta.url);
const { app, db } = require('../server/index.js');

let cookie = '';
let firstAssessmentId;
let secondAssessmentId;
let firstDomainSnapshot;
let alternateDistrictId;
let server;

async function req(path, options = {}) {
  const response = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    ...options,
  });
  const setCookie = response.headers.get('set-cookie');
  if (setCookie) cookie = setCookie.split(';')[0];
  return { status: response.status, body: await response.json().catch(() => null) };
}

function post(path, body) {
  return req(path, { method: 'POST', body: JSON.stringify(body) });
}

describe('CCRR / CEAM API', () => {
  before(async () => {
    server = await new Promise(resolve => {
      const listener = app.listen(3002, () => resolve(listener));
    });
    assert.equal((await post('/login', { username: adminUsername, password: adminPassword })).status, 200);
    const districts = await req('/districts');
    assert.equal(districts.status, 200);
    const selected = districts.body.find(district => district.slug === 'walkerville') || districts.body[0];
    assert.ok(selected?.id);
    // The normal synthetic demo uses one district. Add a second, synthetic
    // tenant only inside the disposable validation database to test isolation.
    const existing = db.prepare("SELECT id FROM districts WHERE slug = 'ccrr-isolation-test'").get();
    alternateDistrictId = existing?.id || Number(db.prepare(`INSERT INTO districts
      (name, slug, state, student_count, staff_count, school_count, fiscal_year)
      VALUES (?, ?, ?, ?, ?, ?, ?)`)
      .run('CCRR Isolation Test District', 'ccrr-isolation-test', 'Test', 1, 1, 1, '2026').lastInsertRowid);
    assert.equal((await post('/switch-district', { districtId: selected.id })).status, 200);
  });

  after(async () => {
    await new Promise(resolve => server.close(resolve));
  });

  it('creates an empty CCRR baseline without converting legacy snapshots', async () => {
    const response = await post('/ccrr-assessments', { name: 'CCRR API Validation Baseline' });
    assert.equal(response.status, 201);
    firstAssessmentId = response.body.id;
    const loaded = await req(`/ccrr-assessments/${firstAssessmentId}`);
    assert.equal(loaded.status, 200);
    assert.deepEqual(loaded.body.domain_assessments, []);
    assert.equal(loaded.body.rubric_key, 'ccrr_v1');
    assert.equal(loaded.body.evidence_methodology_key, 'ceam_v1');
  });

  it('requires accepted or partial CEAM evidence before a Level 2+ current determination', async () => {
    const blocked = await post(`/ccrr-assessments/${firstAssessmentId}/domains`, {
      domain_id: 'CR.GV-01', current_maturity: 3, target_maturity: 5, confidence: 'Low', rating_rationale: 'Attempt without evidence',
    });
    assert.equal(blocked.status, 400);
    const evidence = await post(`/ccrr-assessments/${firstAssessmentId}/evidence`, {
      domain_id: 'CR.GV-01', evidence_type: 'Policy', title: 'Validation record', source_owner: 'Technology', source_location: 'Controlled repository',
      effective_or_observed_date: '2026-09-01', reviewed_date: '2026-09-20', scope: 'District-wide', validation_status: 'Accepted', confidentiality: 'Internal',
    });
    assert.equal(evidence.status, 200);
    const rated = await post(`/ccrr-assessments/${firstAssessmentId}/domains`, {
      domain_id: 'CR.GV-01', current_maturity: 3, target_maturity: 5, confidence: 'Low', rating_rationale: 'Evidence supported current state', risk_sensitive_critical: true,
    });
    assert.equal(rated.status, 200);
    const record = rated.body.domain_assessments.find(item => item.domain_id === 'CR.GV-01');
    assert.equal(record.current_maturity, 3);
    assert.equal(record.target_maturity, 5);
    assert.equal(record.confidence, 'Low');
    assert.equal(record.critical_gap, 1);
    firstDomainSnapshot = { ...record };
  });

  it('supports every CEAM gap type and one-step roadmap transitions', async () => {
    const gapTypes = ['Evidence Gap', 'Implementation Gap', 'Coverage Gap', 'Governance Gap', 'Technical Gap', 'Validation Gap', 'Target-State Gap'];
    for (const gap_type of gapTypes) {
      const finding = await post(`/ccrr-assessments/${firstAssessmentId}/findings`, { domain_id: 'CR.GV-01', gap_type, title: `${gap_type} validation`, critical_gap: gap_type === 'Technical Gap' });
      assert.equal(finding.status, 200, gap_type);
    }
    const roadmap = await post(`/ccrr-assessments/${firstAssessmentId}/roadmap`, {
      domain_id: 'CR.GV-01', current_level: 3, target_level: 4, advancement_transition: '3→4', advancement_action: 'Measure and review the control.',
    });
    assert.equal(roadmap.status, 200);
    assert.equal(roadmap.body.findings.length, 7);
    assert.equal(roadmap.body.roadmap[0].advancement_transition, '3→4');
  });

  it('preserves the prior assessment state when a linked reassessment is created', async () => {
    const created = await post('/ccrr-assessments', { name: 'CCRR API Validation Reassessment', prior_assessment_id: firstAssessmentId, reassessment_trigger: 'Scheduled review' });
    assert.equal(created.status, 201);
    secondAssessmentId = created.body.id;
    assert.equal(created.body.prior_assessment_id, firstAssessmentId);
    const prior = await req(`/ccrr-assessments/${firstAssessmentId}`);
    const original = prior.body.domain_assessments.find(item => item.domain_id === 'CR.GV-01');
    assert.deepEqual({ current_maturity: original.current_maturity, target_maturity: original.target_maturity, confidence: original.confidence, critical_gap: original.critical_gap }, { current_maturity: firstDomainSnapshot.current_maturity, target_maturity: firstDomainSnapshot.target_maturity, confidence: firstDomainSnapshot.confidence, critical_gap: firstDomainSnapshot.critical_gap });
    const current = await req(`/ccrr-assessments/${secondAssessmentId}`);
    assert.equal(current.status, 200);
    assert.deepEqual(current.body.domain_assessments, []);
  });

  it('enforces district isolation for CCRR assessment records', async () => {
    assert.ok(alternateDistrictId);
    assert.equal((await post('/switch-district', { districtId: alternateDistrictId })).status, 200);
    assert.equal((await req(`/ccrr-assessments/${firstAssessmentId}`)).status, 404);
  });
});
