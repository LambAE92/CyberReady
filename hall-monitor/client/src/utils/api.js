const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (res.status === 401) {
    window.dispatchEvent(new Event('hallmonitor:unauthorized'));
    throw new Error('Unauthorized');
  }
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const api = {
  // Auth
  login: (username, password) => request('/login', { method: 'POST', body: JSON.stringify({ username, password }) }),
  logout: () => request('/logout', { method: 'POST' }),
  me: () => request('/me'),

  // Districts
  districts: () => request('/districts'),
  district: () => request('/district'),
  switchDistrict: (districtId) => request('/switch-district', { method: 'POST', body: JSON.stringify({ districtId }) }),

  // Admin
  adminOverview: () => request('/admin/overview'),
  resetDemo: () => request('/demo/reset', { method: 'POST' }),

  // Dashboard
  metrics: () => request('/metrics'),
  health: () => request('/health'),
  updateHealth: (id, score) => request(`/health/${id}`, { method: 'PUT', body: JSON.stringify({ score }) }),

  // Risks
  risks: (filters = {}) => {
    const params = new URLSearchParams();
    if (filters.severity) params.set('severity', filters.severity);
    if (filters.status) params.set('status', filters.status);
    return request(`/risks?${params}`);
  },
  updateRisk: (id, data) => request(`/risks/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Training & Phishing
  training: () => request('/training'),
  phishing: () => request('/phishing'),

  // Compliance
  compliance: () => request('/compliance'),
  governanceStatus: () => request('/governance-status'),

  // Executive Summary
  executiveSummary: () => request('/executive-summary'),

  // Notifications
  notifications: () => request('/notifications'),

  // Assessments (structured NIST assessment)
  assessments: () => request('/assessments'),
  createAssessment: (name) => request('/assessments', { method: 'POST', body: JSON.stringify({ name }) }),
  getAssessment: (id) => request(`/assessments/${id}`),
  deleteAssessment: (id) => request(`/assessments/${id}`, { method: 'DELETE' }),
  completeAssessment: (id) => request(`/assessments/${id}/complete`, { method: 'PUT' }),
  reopenAssessment: (id) => request(`/assessments/${id}/reopen`, { method: 'PUT' }),
  saveRating: (id, data) => request(`/assessments/${id}/ratings`, { method: 'POST', body: JSON.stringify(data) }),
  getInterviewResponses: (id) => request(`/assessments/${id}/interview-responses`),
  saveInterviewResponse: (id, data) => request(`/assessments/${id}/interview-responses`, { method: 'POST', body: JSON.stringify(data) }),
  saveChecklist: (id, data) => request(`/assessments/${id}/checklist`, { method: 'POST', body: JSON.stringify(data) }),

  // Audit Requests
  auditRequests: () => request('/audit-requests'),
  requestAudit: (data) => request('/audit-requests', {
    method: 'POST',
    body: JSON.stringify(typeof data === 'string' ? { notes: data } : data),
  }),
  updateAuditRequest: (id, data) => request(`/audit-requests/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  // Reports
  reports: () => request('/reports'),
  generateReport: (assessmentId) => fetch(`${API_BASE}/assessments/${assessmentId}/generate-report`, {
    method: 'POST', credentials: 'include', headers: { 'Content-Type': 'application/json' },
  }).then(res => {
    if (!res.ok) throw new Error(`Report generation failed: ${res.status}`);
    return res.blob();
  }),
  downloadReport: (reportId) => fetch(`${API_BASE}/reports/${reportId}/download`, {
    credentials: 'include',
  }).then(res => {
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);
    return res.blob();
  }),

  // Self-assessment persistence
  selfAssessment: () => request('/self-assessment'),
  selfAssessmentHistory: () => request('/self-assessment/history'),
  saveSelfAssessment: (data) => request('/self-assessment', { method: 'POST', body: JSON.stringify(data) }),
  snapshotSelfAssessment: (data) => request('/self-assessment/snapshot', { method: 'POST', body: JSON.stringify(data) }),

  // CCRR / CEAM v1.0 (separate from preserved legacy self-assessment snapshots)
  ccrrAssessments: () => request('/ccrr-assessments'),
  createCcrrAssessment: (data) => request('/ccrr-assessments', { method: 'POST', body: JSON.stringify(data) }),
  ccrrAssessment: (id) => request(`/ccrr-assessments/${id}`),
  saveCcrrDomain: (id, data) => request(`/ccrr-assessments/${id}/domains`, { method: 'POST', body: JSON.stringify(data) }),
  addCeamEvidence: (id, data) => request(`/ccrr-assessments/${id}/evidence`, { method: 'POST', body: JSON.stringify(data) }),
  addCeamFinding: (id, data) => request(`/ccrr-assessments/${id}/findings`, { method: 'POST', body: JSON.stringify(data) }),
  addCcrrRoadmapItem: (id, data) => request(`/ccrr-assessments/${id}/roadmap`, { method: 'POST', body: JSON.stringify(data) }),

  // AI Governance
  aiSystems: () => request('/ai-systems'),
  createAiSystem: (data) => request('/ai-systems', { method: 'POST', body: JSON.stringify(data) }),
  aiSystemRatings: (id) => request(`/ai-systems/${id}/ratings`),
  saveAiRating: (id, data) =>
    request(`/ai-systems/${id}/ratings`, { method: 'POST', body: JSON.stringify(data) }),
  aiGovernanceSummary: () => request('/ai-governance/summary'),

  // Audit log
  auditLog: (limit = 100, offset = 0) => request(`/audit-log?limit=${limit}&offset=${offset}`),

  // Findings — document upload + AI evaluation
  findingsDocuments: () => request('/findings/documents'),
  uploadFindingsDocument: (file) => {
    const form = new FormData();
    form.append('document', file);
    return fetch(`${API_BASE}/findings/upload`, {
      method: 'POST',
      credentials: 'include',
      body: form,
    }).then(res => {
      if (res.status === 401) { window.dispatchEvent(new Event('hallmonitor:unauthorized')); throw new Error('Unauthorized'); }
      if (!res.ok) return res.json().then(e => { throw new Error(e.error || `Upload failed: ${res.status}`); });
      return res.json();
    });
  },

  // Masterclass Requests
  submitMasterclassRequest: (data) => request('/masterclass-requests', { method: 'POST', body: JSON.stringify(data) }),
  masterclassRequests: () => request('/masterclass-requests'),

  // Masterclass Training
  masterclassModules: () => request('/masterclass/modules'),
  masterclassDepartments: () => request('/masterclass/departments'),
  masterclassModuleDepts: (moduleId) => request(`/masterclass/modules/${moduleId}/departments`),
  updateMasterclassCompletion: (completionId, completed) =>
    request(`/masterclass/completions/${completionId}`, { method: 'PUT', body: JSON.stringify({ completed }) }),
};
