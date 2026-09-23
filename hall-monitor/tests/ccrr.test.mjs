import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { CCRR_DOMAIN_FUNCTIONS, CCRR_FUNCTIONS, CEAM_VALIDATION_STATUSES, CEAM_GAP_TYPES, calculateScores } = require('../server/ccrr.js');
const { CCRR_DOMAINS, CCRR_MATURITY_LEVELS } = await import('../client/src/data/ccrrData.js');

test('CCRR v1.0 has exactly 18 stable domains across six functions', () => {
  assert.equal(Object.keys(CCRR_DOMAIN_FUNCTIONS).length, 18);
  assert.equal(CCRR_DOMAINS.length, 18);
  assert.equal(CCRR_MATURITY_LEVELS.length, 5);
  assert.deepEqual(CCRR_FUNCTIONS, ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER']);
  assert.deepEqual(Object.values(CCRR_DOMAIN_FUNCTIONS).reduce((counts, fn) => ({ ...counts, [fn]: (counts[fn] || 0) + 1 }), {}), {
    GOVERN: 4, IDENTIFY: 3, PROTECT: 5, DETECT: 2, RESPOND: 2, RECOVER: 2,
  });
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
    domain_id, current_maturity: { GOVERN: 1, IDENTIFY: 2, PROTECT: 3, DETECT: 4, RESPOND: 5, RECOVER: 5 }[fn],
    target_maturity: 5,
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

test('CEAM canonical validation statuses and seven gap types remain available', () => {
  assert.deepEqual(CEAM_VALIDATION_STATUSES, ['Accepted', 'Partial', 'Rejected', 'Superseded', 'Needs Follow-up']);
  assert.equal(CEAM_GAP_TYPES.length, 7);
  assert.ok(CEAM_GAP_TYPES.includes('Target-State Gap'));
});
