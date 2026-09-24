import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { CCRR_DOMAIN_FUNCTIONS, CCRR_FUNCTIONS, CEAM_VALIDATION_STATUSES, CEAM_GAP_TYPES, calculateScores } = require('../server/ccrr.js');
const { CCRR_DOMAINS, CCRR_MATURITY_LEVELS } = await import('../client/src/data/ccrrData.js');
const { advancementPath, calculateCcrrScores, isCriticalGap } = await import('../client/src/data/ccrrAssessment.js');

// Reconciled manually against CyberReady_CCRR_Canonical_Domain_Register_v1.0.
// This index validates stable canonical IDs, names, Functions, and external
// NIST reference metadata without embedding third-party framework text.
const CANONICAL_DOMAIN_INDEX = [
  ['CR.GV-01', 'Mission & Leadership', 'GOVERN', ['GV.OC', 'GV.OV']],
  ['CR.GV-02', 'Risk Strategy & Policy', 'GOVERN', ['GV.RM', 'GV.PO', 'GV.OV']],
  ['CR.GV-03', 'Accountability & Workforce', 'GOVERN', ['GV.RR']],
  ['CR.GV-04', 'Third-Party Ecosystem', 'GOVERN', ['GV.SC', 'GV.OC']],
  ['CR.ID-01', 'Asset & Data Visibility', 'IDENTIFY', ['ID.AM']],
  ['CR.ID-02', 'Cyber Risk Discovery', 'IDENTIFY', ['ID.RA']],
  ['CR.ID-03', 'Improvement Planning', 'IDENTIFY', ['ID.IM']],
  ['CR.PR-01', 'Identity & Access Safeguards', 'PROTECT', ['PR.AA']],
  ['CR.PR-02', 'Human Readiness', 'PROTECT', ['PR.AT']],
  ['CR.PR-03', 'Data Protection', 'PROTECT', ['PR.DS']],
  ['CR.PR-04', 'Secure Platforms', 'PROTECT', ['PR.PS']],
  ['CR.PR-05', 'Infrastructure Resilience', 'PROTECT', ['PR.IR']],
  ['CR.DE-01', 'Security Visibility & Monitoring', 'DETECT', ['DE.CM']],
  ['CR.DE-02', 'Event Analysis & Escalation', 'DETECT', ['DE.AE']],
  ['CR.RS-01', 'Incident Command & Coordination', 'RESPOND', ['RS.MA']],
  ['CR.RS-02', 'Incident Analysis, Containment & Communication', 'RESPOND', ['RS.AN', 'RS.CO', 'RS.MI']],
  ['CR.RC-01', 'Restoration & Continuity', 'RECOVER', ['RC.RP']],
  ['CR.RC-02', 'Recovery Communication & Improvement', 'RECOVER', ['RC.CO', 'ID.IM']],
];

test('CCRR v1.0 has exactly 18 stable domains across six functions', () => {
  assert.equal(Object.keys(CCRR_DOMAIN_FUNCTIONS).length, 18);
  assert.equal(CCRR_DOMAINS.length, 18);
  assert.equal(CCRR_MATURITY_LEVELS.length, 5);
  assert.deepEqual(CCRR_FUNCTIONS, ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER']);
  assert.deepEqual(Object.values(CCRR_DOMAIN_FUNCTIONS).reduce((counts, fn) => ({ ...counts, [fn]: (counts[fn] || 0) + 1 }), {}), {
    GOVERN: 4, IDENTIFY: 3, PROTECT: 5, DETECT: 2, RESPOND: 2, RECOVER: 2,
  });
});

test('canonical domain IDs, titles, functions, and NIST metadata match the v1.0 domain register', () => {
  assert.deepEqual(
    CCRR_DOMAINS.map(domain => [domain.id, domain.title, domain.function, domain.nistMapping.references]),
    CANONICAL_DOMAIN_INDEX,
  );
  assert.deepEqual(Object.keys(CCRR_DOMAIN_FUNCTIONS), CANONICAL_DOMAIN_INDEX.map(([id]) => id));
});

test('every canonical CCRR domain has questions, five criteria, evidence, and four advancement transitions', () => {
  CCRR_DOMAINS.forEach(domain => {
    assert.ok(domain.guidedQuestions.length > 0, `${domain.id} questions`);
    assert.equal(Object.keys(domain.maturityLevels).length, 5, `${domain.id} maturity levels`);
    assert.ok(domain.evidenceExpectations.length > 0, `${domain.id} evidence`);
    assert.deepEqual(domain.advancement.map(item => `${item.from}→${item.to}`), ['1→2', '2→3', '3→4', '4→5']);
  });
});

test('CCRR overall score equally weights the six function scores', () => {
  const rows = Object.entries(CCRR_DOMAIN_FUNCTIONS).map(([domain_id, fn]) => ({
    domain_id, current_maturity: { GOVERN: 1, IDENTIFY: 2, PROTECT: 3, DETECT: 4, RESPOND: 5, RECOVER: 5 }[fn], target_maturity: 5,
  }));
  const result = calculateScores(rows);
  assert.equal(result.overall, 20 / 6);
  assert.equal(result.targetOverall, 5);
  assert.equal(result.functions.find(fn => fn.key === 'PROTECT').current, 3);
});

test('missing functions yield a provisional score, not a false six-function overall', () => {
  const result = calculateScores([{ domain_id: 'CR.GV-01', current_maturity: 3, target_maturity: 5 }]);
  assert.equal(result.overall, null);
  assert.equal(result.provisionalOverall, 3);
  assert.equal(result.targetOverall, null);
});

test('current and target scores remain separate, and confidence never changes maturity math', () => {
  const base = { domain_id: 'CR.GV-01', current_maturity: 2, target_maturity: 5 };
  const lowConfidence = calculateCcrrScores([{ ...base, confidence: 'Low' }]);
  const highConfidence = calculateCcrrScores([{ ...base, confidence: 'High' }]);
  assert.equal(lowConfidence.provisionalOverall, 2);
  assert.equal(highConfidence.provisionalOverall, 2);
  assert.equal(lowConfidence.functions[0].target, 5);
  assert.equal(lowConfidence.functions[0].current, 2);
});

test('advancement decomposes multi-level targets into canonical sequential transitions and keeps criticality independent', () => {
  const path = advancementPath('CR.PR-01', 1, 5);
  assert.deepEqual(path.map(item => [item.from, item.to]), [[1, 2], [2, 3], [3, 4], [4, 5]]);
  assert.ok(path.every(item => item.action));
  assert.equal(isCriticalGap({ current_maturity: 4, risk_sensitive_critical: true }), true);
  assert.equal(isCriticalGap({ current_maturity: 4, risk_sensitive_critical: false }), false);
});

test('CEAM canonical validation statuses and seven gap types remain available', () => {
  assert.deepEqual(CEAM_VALIDATION_STATUSES, ['Accepted', 'Partial', 'Rejected', 'Superseded', 'Needs Follow-up']);
  assert.equal(CEAM_GAP_TYPES.length, 7);
  assert.ok(CEAM_GAP_TYPES.includes('Target-State Gap'));
});
