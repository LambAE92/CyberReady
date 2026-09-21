/**
 * HallMonitor Smoke Tests
 * Run: node --test tests/smoke.test.mjs
 * Requires the server to be running on PORT 3001.
 */
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';

const BASE = 'http://localhost:3001/api';
let cookie = '';
const adminUsername = process.env.DEMO_ADMIN_USER;
const adminPassword = process.env.DEMO_ADMIN_PASS;
const districtItUsername = process.env.DEMO_DISTRICT_IT_USER;
const districtItPassword = process.env.DEMO_DISTRICT_IT_PASS;
const superintendentUsername = process.env.DEMO_SUPERINTENDENT_USER;
const superintendentPassword = process.env.DEMO_SUPERINTENDENT_PASS;

if (!adminUsername || !adminPassword || !districtItUsername || !districtItPassword || !superintendentUsername || !superintendentPassword) {
  throw new Error('Set all DEMO_*_USER and DEMO_*_PASS values before running the smoke test.');
}

async function req(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(cookie ? { Cookie: cookie } : {}) },
    ...opts,
  });
  const setCookie = res.headers.get('set-cookie');
  if (setCookie) cookie = setCookie.split(';')[0];
  return { status: res.status, body: await res.json().catch(() => null) };
}

describe('Auth', () => {
  it('rejects unauthenticated requests', async () => {
    cookie = '';
    const { status } = await req('/me');
    assert.equal(status, 401);
  });

  it('rejects wrong credentials', async () => {
    const { status } = await req('/login', { method: 'POST', body: JSON.stringify({ username: adminUsername, password: 'wrong' }) });
    assert.equal(status, 401);
  });

  it('logs in with admin credentials', async () => {
    const { status, body } = await req('/login', { method: 'POST', body: JSON.stringify({ username: adminUsername, password: adminPassword }) });
    assert.equal(status, 200);
    assert.equal(body.role, 'platform_admin');
    assert.equal(body.adminOverview, true);
    assert.equal(body.district, null);
  });

  it('returns user profile via /me', async () => {
    const { status, body } = await req('/me');
    assert.equal(status, 200);
    assert.equal(body.username, adminUsername);
    assert.equal(body.adminOverview, true);
    assert.equal(body.activeDistrictId, null);
  });
});

describe('District scoping', () => {
  it('lists all districts for platform_admin', async () => {
    const { status, body } = await req('/districts');
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.length >= 1, 'Expected at least one seeded district');
  });

  it('switches to a district and returns current district info', async () => {
    const { body: districts } = await req('/districts');
    const maplewood = districts.find(d => d.slug === 'maplewood') ?? districts[0];
    await req('/switch-district', { method: 'POST', body: JSON.stringify({ districtId: maplewood.id }) });
    const { status, body } = await req('/district');
    assert.equal(status, 200);
    assert.ok(body.name);
    assert.ok(body.student_count > 0);
  });

  it('switches district for platform_admin', async () => {
    const { body: districts } = await req('/districts');
    const target = districts.find(d => d.slug === 'walkerville') ?? districts[0];
    const { status, body } = await req('/switch-district', { method: 'POST', body: JSON.stringify({ districtId: target.id }) });
    assert.equal(status, 200);
    assert.equal(body.id, target.id);

    // Verify scoped data changes
    const { body: health } = await req('/health');
    assert.ok(health.categories.length > 0);

    // Switch back to admin overview mode.
    await req('/switch-district', { method: 'POST', body: JSON.stringify({ districtId: null }) });
  });
});

describe('Executive summary', () => {
  it('returns fully dynamic summary', async () => {
    const { body: districts } = await req('/districts');
    const target = districts.find(d => d.slug === 'walkerville') ?? districts[0];
    await req('/switch-district', { method: 'POST', body: JSON.stringify({ districtId: target.id }) });
    const { status, body } = await req('/executive-summary');
    assert.equal(status, 200);
    assert.ok(body.district);
    assert.ok(typeof body.overallMaturity === 'number');
    assert.ok(Array.isArray(body.functionMaturity));
    assert.ok(typeof body.aiOverallMaturity === 'number');
    assert.ok(Array.isArray(body.aiFunctionMaturity));
    assert.ok(Array.isArray(body.topRisks));
    assert.ok(typeof body.trainingRate === 'number');
    assert.ok(typeof body.complianceRate === 'number');
    assert.ok(Array.isArray(body.nextSteps));
    assert.ok(body.nextSteps.length > 0, 'Expected at least one next step');
    assert.ok(body.generatedAt);
  });
});

describe('Assessments', () => {
  let assessmentId;

  it('creates a new assessment', async () => {
    const { status, body } = await req('/assessments', { method: 'POST', body: JSON.stringify({ name: 'Smoke Test Assessment' }) });
    assert.equal(status, 200);
    assert.ok(body.id);
    assessmentId = body.id;
  });

  it('lists assessments', async () => {
    const { status, body } = await req('/assessments');
    assert.equal(status, 200);
    assert.ok(body.some(a => a.id === assessmentId));
  });

  it('saves a rating', async () => {
    const { status } = await req(`/assessments/${assessmentId}/ratings`, {
      method: 'POST',
      body: JSON.stringify({ nist_function: 'GOVERN', category: 'POLICY', level: 3, evidence: 'Test evidence', notes: 'Test notes' }),
    });
    assert.equal(status, 200);
  });

  it('retrieves assessment with ratings', async () => {
    const { status, body } = await req(`/assessments/${assessmentId}`);
    assert.equal(status, 200);
    assert.ok(body.ratings.length > 0);
    assert.equal(body.ratings[0].level, 3);
  });

  it('completes assessment', async () => {
    const { status } = await req(`/assessments/${assessmentId}/complete`, { method: 'PUT' });
    assert.equal(status, 200);
  });

  it('deletes assessment', async () => {
    const { status } = await req(`/assessments/${assessmentId}`, { method: 'DELETE' });
    assert.equal(status, 200);
  });
});

describe('Self-Assessment (CC4E)', () => {
  it('saves self-assessment to server', async () => {
    const { status } = await req('/self-assessment', {
      method: 'POST',
      body: JSON.stringify({ timeframe: 'March 2026', ratings: { 'Govern::POLICY': 3 }, notes: { 'Govern::POLICY': 'Test note' }, status: 'in_progress' }),
    });
    assert.equal(status, 200);
  });

  it('loads self-assessment from server', async () => {
    const { status, body } = await req('/self-assessment');
    assert.equal(status, 200);
    assert.ok(body);
    assert.equal(body.ratings['Govern::POLICY'], 3);
  });

  it('creates a snapshot', async () => {
    const { status, body } = await req('/self-assessment/snapshot', {
      method: 'POST',
      body: JSON.stringify({ timeframe: 'March 2026', ratings: { 'Govern::POLICY': 3 }, notes: {} }),
    });
    assert.equal(status, 200);
    assert.ok(body.id);
  });
});

describe('Notifications', () => {
  it('returns alert array', async () => {
    const { status, body } = await req('/notifications');
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));
  });
});

describe('Audit log', () => {
  it('returns audit entries', async () => {
    const { status, body } = await req('/audit-log');
    assert.equal(status, 200);
    assert.ok(Array.isArray(body));
    assert.ok(body.length > 0, 'Expected audit entries from login');
  });
});

describe('Role-based access', () => {
  it('district_it can access risks', async () => {
    cookie = '';
    const { status } = await req('/login', { method: 'POST', body: JSON.stringify({ username: districtItUsername, password: districtItPassword }) });
    assert.equal(status, 200);
    const { status: riskStatus } = await req('/risks');
    assert.equal(riskStatus, 200);
  });

  it('district_it cannot switch districts', async () => {
    const { status } = await req('/switch-district', { method: 'POST', body: JSON.stringify({ districtId: 2 }) });
    assert.equal(status, 403);
  });

  it('superintendent can access executive summary', async () => {
    cookie = '';
    const { status } = await req('/login', { method: 'POST', body: JSON.stringify({ username: superintendentUsername, password: superintendentPassword }) });
    assert.equal(status, 200);
    const { status: execStatus } = await req('/executive-summary');
    assert.equal(execStatus, 200);
  });
});
