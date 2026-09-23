// Stable CCRR v1.0 identifiers used by the API. Detailed canonical content is
// consumed from client/src/data/ccrrData.js; these mappings keep server-side
// storage and scoring versioned without importing presentation components.
const CCRR_DOMAIN_FUNCTIONS = Object.freeze({
  'CR.GV-01': 'GOVERN', 'CR.GV-02': 'GOVERN', 'CR.GV-03': 'GOVERN', 'CR.GV-04': 'GOVERN',
  'CR.ID-01': 'IDENTIFY', 'CR.ID-02': 'IDENTIFY', 'CR.ID-03': 'IDENTIFY',
  'CR.PR-01': 'PROTECT', 'CR.PR-02': 'PROTECT', 'CR.PR-03': 'PROTECT', 'CR.PR-04': 'PROTECT', 'CR.PR-05': 'PROTECT',
  'CR.DE-01': 'DETECT', 'CR.DE-02': 'DETECT',
  'CR.RS-01': 'RESPOND', 'CR.RS-02': 'RESPOND',
  'CR.RC-01': 'RECOVER', 'CR.RC-02': 'RECOVER',
});

const CCRR_FUNCTIONS = ['GOVERN', 'IDENTIFY', 'PROTECT', 'DETECT', 'RESPOND', 'RECOVER'];
const CEAM_VALIDATION_STATUSES = ['Accepted', 'Partial', 'Rejected', 'Superseded', 'Needs Follow-up'];
const CEAM_GAP_TYPES = ['Evidence Gap', 'Implementation Gap', 'Coverage Gap', 'Governance Gap', 'Technical Gap', 'Validation Gap', 'Target-State Gap'];

function calculateScores(rows = []) {
  const functions = CCRR_FUNCTIONS.map(key => {
    const levels = rows.filter(row => CCRR_DOMAIN_FUNCTIONS[row.domain_id] === key && Number.isInteger(row.current_maturity)).map(row => row.current_maturity);
    const targets = rows.filter(row => CCRR_DOMAIN_FUNCTIONS[row.domain_id] === key && Number.isInteger(row.target_maturity)).map(row => row.target_maturity);
    return {
      key,
      current: levels.length ? levels.reduce((sum, level) => sum + level, 0) / levels.length : null,
      target: targets.length ? targets.reduce((sum, level) => sum + level, 0) / targets.length : null,
      ratedDomains: levels.length,
      totalDomains: Object.values(CCRR_DOMAIN_FUNCTIONS).filter(fn => fn === key).length,
    };
  });
  const current = functions.map(fn => fn.current).filter(score => score !== null);
  const target = functions.map(fn => fn.target).filter(score => score !== null);
  return {
    functions,
    overall: current.length === 6 ? current.reduce((sum, score) => sum + score, 0) / 6 : null,
    targetOverall: target.length === 6 ? target.reduce((sum, score) => sum + score, 0) / 6 : null,
    provisionalOverall: current.length ? current.reduce((sum, score) => sum + score, 0) / current.length : null,
  };
}

module.exports = { CCRR_DOMAIN_FUNCTIONS, CCRR_FUNCTIONS, CEAM_VALIDATION_STATUSES, CEAM_GAP_TYPES, calculateScores };
