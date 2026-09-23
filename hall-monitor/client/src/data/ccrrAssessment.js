import { CCRR_DOMAINS, CCRR_FUNCTIONS } from './ccrrData';

export const CEAM = Object.freeze({
  key: 'ceam_v1',
  version: '1.0',
  name: 'CyberReady Cybersecurity Evidence Assessment Methodology',
  shortName: 'CEAM',
  validationStatuses: ['Accepted', 'Partial', 'Rejected', 'Superseded', 'Needs Follow-up'],
  confidenceLevels: ['High', 'Moderate', 'Low'],
  gapTypes: [
    'Evidence Gap',
    'Implementation Gap',
    'Coverage Gap',
    'Governance Gap',
    'Technical Gap',
    'Validation Gap',
    'Target-State Gap',
  ],
  roadmapStatuses: ['Planned', 'In Progress', 'Blocked', 'Complete', 'Accepted Risk', 'Deferred'],
});

const domainById = Object.fromEntries(CCRR_DOMAINS.map(domain => [domain.id, domain]));

function validLevel(level) {
  return Number.isInteger(Number(level)) && Number(level) >= 1 && Number(level) <= 5;
}

function mean(levels) {
  return levels.length ? levels.reduce((sum, level) => sum + Number(level), 0) / levels.length : null;
}

/**
 * Calculates CCRR current or target maturity. The overall score uses six
 * equally weighted NIST CSF function scores, never a simple 18-domain mean.
 * A full score is withheld until every function has a rated domain; callers
 * can display provisionalOverall while an assessment remains in progress.
 */
export function calculateCcrrScores(domainAssessments = []) {
  const ratings = Object.fromEntries(
    domainAssessments
      .filter(item => item?.domain_id && domainById[item.domain_id])
      .map(item => [item.domain_id, item])
  );

  const functions = CCRR_FUNCTIONS.map(fn => {
    const items = fn.domains.map(id => ratings[id]).filter(Boolean);
    const current = mean(items.map(item => item.current_maturity).filter(validLevel));
    const target = mean(items.map(item => item.target_maturity).filter(validLevel));
    return {
      key: fn.key,
      name: fn.name,
      current,
      target,
      ratedDomains: items.filter(item => validLevel(item.current_maturity)).length,
      targetedDomains: items.filter(item => validLevel(item.target_maturity)).length,
      totalDomains: fn.domains.length,
    };
  });

  const currentFunctionScores = functions.map(fn => fn.current).filter(value => value !== null);
  const targetFunctionScores = functions.map(fn => fn.target).filter(value => value !== null);
  const allFunctionsRated = functions.every(fn => fn.current !== null);
  const allFunctionsTargeted = functions.every(fn => fn.target !== null);

  return {
    functions,
    overall: allFunctionsRated ? currentFunctionScores.reduce((sum, score) => sum + score, 0) / 6 : null,
    targetOverall: allFunctionsTargeted ? targetFunctionScores.reduce((sum, score) => sum + score, 0) / 6 : null,
    provisionalOverall: mean(currentFunctionScores),
    provisionalTargetOverall: mean(targetFunctionScores),
    ratedDomains: domainAssessments.filter(item => validLevel(item.current_maturity)).length,
    totalDomains: CCRR_DOMAINS.length,
  };
}

export function advancementPath(domainId, currentLevel, targetLevel) {
  const domain = domainById[domainId];
  if (!domain || !validLevel(currentLevel) || !validLevel(targetLevel) || Number(targetLevel) <= Number(currentLevel)) return [];
  const actions = new Map(domain.advancement.map(action => [action.from, action]));
  const path = [];
  for (let level = Number(currentLevel); level < Number(targetLevel); level += 1) {
    const action = actions.get(level);
    if (action) path.push({ ...action, domain_id: domainId });
  }
  return path;
}

/** Critical gaps remain separate from numeric averages and target differences. */
export function isCriticalGap(assessment = {}) {
  if (Number(assessment.current_maturity) === 1) return true;
  return Boolean(assessment.risk_sensitive_critical || assessment.critical_gap);
}

export function validateEvidenceRecord(evidence = {}) {
  return {
    valid: Boolean(
      evidence.assessment_id && evidence.domain_id && evidence.evidence_type && evidence.title &&
      evidence.source_owner && evidence.source_location && evidence.effective_or_observed_date &&
      evidence.reviewed_date && evidence.scope && evidence.validation_status &&
      CEAM.validationStatuses.includes(evidence.validation_status)
    ),
    missing: [
      'assessment_id', 'domain_id', 'evidence_type', 'title', 'source_owner', 'source_location',
      'effective_or_observed_date', 'reviewed_date', 'scope', 'validation_status',
    ].filter(field => !evidence[field]),
  };
}
