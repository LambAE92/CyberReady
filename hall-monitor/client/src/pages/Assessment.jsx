import { useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import {
  RUBRIC_FUNCTIONS, INTERVIEW_QUESTIONS, MATURITY_LEVELS,
  NIST_FUNCTION_COLORS, INTERVIEW_CHECKLIST, TRAINING_GUIDE
} from '../data/rubricData';
import {
  ClipboardList, Plus, Trash2, CheckCircle, RotateCcw,
  ChevronDown, ChevronRight, MessageSquare, BookOpen,
  Download, Save, AlertCircle, FileText, Send, Clock,
  Eye, FileDown
} from 'lucide-react';

const ADMIN_TABS = [
  { id: 'assessments', label: 'Assessments' },
  { id: 'rubric', label: 'Rubric Evaluation' },
  { id: 'interview', label: 'Interview Guide' },
  { id: 'training', label: 'Training Guide' },
];

const DISTRICT_TABS = [
  { id: 'assessments', label: 'Audit History' },
  { id: 'reports', label: 'Reports' },
  { id: 'request', label: 'Request Audit' },
];

function normalizeAuditType(type) {
  if (!type || type === 'CCRE Self-Assessment') return 'CCRE Audit';
  if (type === 'CAGR Self-Assessment' || type === 'CAIRE Self-Assessment') return 'CAIRE Audit';
  return type;
}

export default function Assessment() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'platform_admin';
  const TABS = isAdmin ? ADMIN_TABS : DISTRICT_TABS;

  const [activeTab, setActiveTab] = useState('assessments');
  const [assessments, setAssessments] = useState([]);
  const [activeAssessment, setActiveAssessment] = useState(null);
  const [ratings, setRatings] = useState({});
  const [interviewResponses, setInterviewResponses] = useState({});
  const [checklistProgress, setChecklistProgress] = useState({});
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [expandedFunc, setExpandedFunc] = useState(null);
  const [expandedCat, setExpandedCat] = useState(null);
  const [saving, setSaving] = useState(false);
  const [expandedModule, setExpandedModule] = useState(null);
  const [generatingReport, setGeneratingReport] = useState(false);

  // District-specific state
  const [auditRequests, setAuditRequests] = useState([]);
  const [reports, setReports] = useState([]);
  const [requestNotes, setRequestNotes] = useState('');
  const [requestAuditType, setRequestAuditType] = useState('CCRE Audit');
  const [submittingRequest, setSubmittingRequest] = useState(false);
  const [requestSuccess, setRequestSuccess] = useState(false);

  const loadAssessments = useCallback(() => {
    api.assessments().then(setAssessments);
  }, []);

  useEffect(() => { loadAssessments(); }, [loadAssessments]);

  useEffect(() => {
    if (!isAdmin) {
      api.auditRequests().then(setAuditRequests).catch(() => {});
      api.reports().then(setReports).catch(() => {});
    } else {
      api.auditRequests().then(setAuditRequests).catch(() => {});
    }
  }, [isAdmin]);

  const loadAssessment = async (id) => {
    const data = await api.getAssessment(id);
    setActiveAssessment(data);
    const r = {};
    (data.ratings || []).forEach(rat => {
      r[`${rat.nist_function}::${rat.category}`] = {
        level: rat.level, evidence: rat.evidence || '', notes: rat.notes || ''
      };
    });
    setRatings(r);
    const cp = {};
    (data.checklist || []).forEach(c => { cp[`${c.phase}::${c.item_index}`] = !!c.completed; });
    setChecklistProgress(cp);
    if (isAdmin) {
      const resp = await api.getInterviewResponses(id);
      const ir = {};
      resp.forEach(r => { ir[`${r.nist_function}::${r.category}::${r.target_level}::${r.question}`] = r.response; });
      setInterviewResponses(ir);
      setActiveTab('rubric');
    }
  };

  const createAssessment = async () => {
    if (!newName.trim() || !isAdmin) return;
    setCreating(true);
    const result = await api.createAssessment(newName.trim());
    setNewName('');
    setCreating(false);
    loadAssessments();
    loadAssessment(result.id);
  };

  const deleteAssessment = async (id) => {
    if (!isAdmin) return;
    await api.deleteAssessment(id);
    if (activeAssessment?.id === id) {
      setActiveAssessment(null);
      setRatings({});
      setActiveTab('assessments');
    }
    loadAssessments();
  };

  const completeAssessment = async (id) => {
    if (!isAdmin) return;
    await api.completeAssessment(id);
    loadAssessments();
    if (activeAssessment?.id === id) {
      setActiveAssessment(prev => ({ ...prev, status: 'completed' }));
    }
  };

  const reopenAssessment = async (id) => {
    if (!isAdmin) return;
    await api.reopenAssessment(id);
    loadAssessments();
    if (activeAssessment?.id === id) {
      setActiveAssessment(prev => ({ ...prev, status: 'in_progress' }));
    }
  };

  const saveRating = async (nistFunction, category, level, evidence, notes) => {
    if (!activeAssessment || !isAdmin) return;
    setSaving(true);
    const key = `${nistFunction}::${category}`;
    setRatings(prev => ({ ...prev, [key]: { level, evidence, notes } }));
    await api.saveRating(activeAssessment.id, {
      nist_function: nistFunction, category, level, evidence, notes
    });
    setSaving(false);
  };

  const saveInterviewResponse = async (nistFunction, category, targetLevel, question, response) => {
    if (!activeAssessment || !isAdmin) return;
    const key = `${nistFunction}::${category}::${targetLevel}::${question}`;
    setInterviewResponses(prev => ({ ...prev, [key]: response }));
    await api.saveInterviewResponse(activeAssessment.id, {
      nist_function: nistFunction, category, target_level: targetLevel, question, response
    });
  };

  const toggleChecklist = async (phase, index) => {
    if (!activeAssessment || !isAdmin) return;
    const key = `${phase}::${index}`;
    const newVal = !checklistProgress[key];
    setChecklistProgress(prev => ({ ...prev, [key]: newVal }));
    await api.saveChecklist(activeAssessment.id, { phase, item_index: index, completed: newVal });
  };

  const handleGenerateReport = async (assessmentId) => {
    setGeneratingReport(true);
    try {
      const blob = await api.generateReport(assessmentId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `CCRE_Report_${new Date().toISOString().split('T')[0]}.docx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to generate report: ' + err.message);
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadReport = async (reportId, filename) => {
    try {
      const blob = await api.downloadReport(reportId);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download report: ' + err.message);
    }
  };

  const handleRequestAudit = async () => {
    setSubmittingRequest(true);
    try {
      await api.requestAudit({
        assessment_type: requestAuditType,
        notes: requestNotes,
      });
      setRequestNotes('');
      setRequestAuditType('CCRE Audit');
      setRequestSuccess(true);
      api.auditRequests().then(setAuditRequests);
      setTimeout(() => setRequestSuccess(false), 5000);
    } catch (err) {
      alert('Failed to submit request: ' + err.message);
    } finally {
      setSubmittingRequest(false);
    }
  };

  // Calculate maturity scores
  const functionScores = {};
  RUBRIC_FUNCTIONS.forEach(func => {
    const catRatings = func.categories.map(cat => {
      const key = `${func.key}::${cat.name}`;
      return ratings[key]?.level || null;
    }).filter(Boolean);
    functionScores[func.key] = catRatings.length > 0
      ? Math.round(catRatings.reduce((s, l) => s + l, 0) / catRatings.length * 10) / 10
      : null;
  });

  const ratedFunctions = Object.values(functionScores).filter(v => v !== null);
  const overallMaturity = ratedFunctions.length > 0
    ? Math.round(ratedFunctions.reduce((s, v) => s + v, 0) / ratedFunctions.length * 10) / 10
    : null;

  const totalCategories = RUBRIC_FUNCTIONS.reduce((s, f) => s + f.categories.length, 0);
  const ratedCategories = Object.values(ratings).filter(r => r.level != null).length;

  // Check if district has an active request for the selected audit type.
  const hasActiveRequest = auditRequests.some(r => {
    if (!['pending', 'approved', 'in_progress'].includes(r.status)) return false;
    const type = normalizeAuditType(r.assessment_type);
    return type === requestAuditType || type === 'Both' || requestAuditType === 'Both';
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          {isAdmin ? 'Assessment' : 'Audit History'}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {isAdmin
            ? 'Evaluate cybersecurity maturity using CyberReady’s NIST CSF 2.0-aligned assessment workflow'
            : 'View your district audit results and request new audits'}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
        {TABS.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Active Assessment Banner (admin only with active assessment) */}
      {isAdmin && activeAssessment && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList size={18} className="text-blue-600 dark:text-blue-400" />
            <div>
              <span className="text-sm font-medium text-blue-900 dark:text-blue-200">{activeAssessment.name}</span>
              <span className={`ml-2 text-xs px-2 py-0.5 rounded ${
                activeAssessment.status === 'completed'
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
              }`}>
                {activeAssessment.status === 'completed' ? 'Completed' : 'In Progress'}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-blue-600 dark:text-blue-400">{ratedCategories}/{totalCategories} rated</span>
            {overallMaturity !== null && (
              <span className="font-bold text-blue-700 dark:text-blue-300">Maturity: {overallMaturity}</span>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  ASSESSMENTS TAB                                          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          {/* Create New (admin only) */}
          {isAdmin && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Start New Assessment
              </h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && createAssessment()}
                  placeholder="e.g., Spring 2026 Annual Audit"
                  className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
                <button
                  onClick={createAssessment}
                  disabled={creating || !newName.trim()}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Plus size={16} />
                  Create
                </button>
              </div>
            </div>
          )}

          {/* Pending Audit Requests (admin only) */}
          {isAdmin && auditRequests.filter(r => r.status === 'pending').length > 0 && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
              <h3 className="text-sm font-semibold text-amber-700 dark:text-amber-400 uppercase tracking-wider mb-3">
                Pending Audit Requests
              </h3>
              <div className="space-y-3">
                {auditRequests.filter(r => r.status === 'pending').map(req => (
                  <div key={req.id} className="flex items-center justify-between bg-white dark:bg-slate-800 rounded-lg p-3 border border-amber-200 dark:border-amber-800">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {req.district_name} — requested by {req.requester_name}
                      </p>
                      {req.notes && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{req.notes}</p>}
                      <p className="text-xs text-slate-400 mt-1">{new Date(req.created_at).toLocaleDateString()}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => api.updateAuditRequest(req.id, { status: 'approved' }).then(() => api.auditRequests().then(setAuditRequests))}
                        className="px-3 py-1.5 text-xs font-medium text-green-700 bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 rounded-lg"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => api.updateAuditRequest(req.id, { status: 'declined' }).then(() => api.auditRequests().then(setAuditRequests))}
                        className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 rounded-lg"
                      >
                        Decline
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assessment List */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {isAdmin ? 'All Assessments' : 'District Audit History'}
              </h3>
            </div>
            {assessments.length === 0 ? (
              <div className="px-6 py-12 text-center text-slate-400">
                <ClipboardList size={32} className="mx-auto mb-3 opacity-50" />
                <p>{isAdmin ? 'No assessments yet. Create one to get started.' : 'No audits have been conducted for your district yet.'}</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {assessments.map(a => (
                  <div key={a.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <div className="flex items-center gap-3 cursor-pointer flex-1" onClick={() => loadAssessment(a.id)}>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{a.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {isAdmin ? 'Created' : 'Conducted'} {new Date(a.created_at).toLocaleDateString()}
                          {a.overall_maturity != null && ` · Maturity: ${a.overall_maturity}`}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded ${
                        a.status === 'completed'
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                          : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
                      }`}>
                        {a.status === 'completed' ? 'Completed' : 'In Progress'}
                      </span>
                      {isAdmin && (
                        <>
                          {a.status === 'completed' && (
                            <button onClick={() => handleGenerateReport(a.id)} disabled={generatingReport}
                              title="Generate CCRE Report"
                              className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded disabled:opacity-50">
                              <FileText size={16} />
                            </button>
                          )}
                          {a.status === 'in_progress' ? (
                            <button onClick={() => completeAssessment(a.id)} title="Mark complete"
                              className="p-1.5 text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded">
                              <CheckCircle size={16} />
                            </button>
                          ) : (
                            <button onClick={() => reopenAssessment(a.id)} title="Reopen"
                              className="p-1.5 text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded">
                              <RotateCcw size={16} />
                            </button>
                          )}
                          <button onClick={() => deleteAssessment(a.id)} title="Delete"
                            className="p-1.5 text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
                            <Trash2 size={16} />
                          </button>
                        </>
                      )}
                      {!isAdmin && a.status === 'completed' && (
                        <button onClick={() => loadAssessment(a.id)} title="View audit details"
                          className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded">
                          <Eye size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  REPORTS TAB (district users)                              */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'reports' && !isAdmin && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                CCRE Reports
              </h3>
            </div>
            {reports.length === 0 ? (
              <div className="px-6 py-12 text-center text-slate-400">
                <FileText size={32} className="mx-auto mb-3 opacity-50" />
                <p>No reports available yet. Reports are generated after an audit is completed.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {reports.map(r => (
                  <div key={r.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{r.filename}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        Assessment: {r.assessment_name} · Generated by {r.generated_by_name} · {new Date(r.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDownloadReport(r.id, r.filename)}
                      className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50 rounded-lg"
                    >
                      <FileDown size={14} />
                      Download
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  REQUEST AUDIT TAB (district users)                        */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'request' && !isAdmin && (
        <div className="space-y-4">
          {/* Request Form */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Request a New Audit
            </h3>
            {!requestSuccess && (
              <div className="mb-4">
                <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Audit Type
                </label>
                <select
                  value={requestAuditType}
                  onChange={e => setRequestAuditType(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="CCRE Audit">CCRE Audit</option>
                  <option value="CAIRE Audit">CAIRE Audit</option>
                  <option value="Both">Both CCRE and CAIRE</option>
                </select>
              </div>
            )}
            {hasActiveRequest ? (
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400">
                  <Clock size={16} />
                  <span className="text-sm font-medium">You already have an active audit request.</span>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-500 mt-1">
                  Your request is being reviewed by the CyberReady team. You'll be notified when it's processed.
                </p>
              </div>
            ) : requestSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <CheckCircle size={16} />
                  <span className="text-sm font-medium">Audit request submitted successfully!</span>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Submit a request for CCRE cybersecurity validation, CAIRE AI governance validation, or both.
                  The CyberReady team will review your request and schedule the audit.
                </p>
                <div>
                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Notes (optional)
                  </label>
                  <textarea
                    value={requestNotes}
                    onChange={e => setRequestNotes(e.target.value)}
                    placeholder="Any specific areas of concern or reason for the audit request..."
                    className="w-full mt-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                    rows={3}
                  />
                </div>
                <button
                  onClick={handleRequestAudit}
                  disabled={submittingRequest}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  <Send size={16} />
                  {submittingRequest ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            )}
          </div>

          {/* Request History */}
          {auditRequests.length > 0 && (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Request History
                </h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {auditRequests.map(req => {
                  const statusColors = {
                    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
                    approved: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
                    in_progress: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
                    completed: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
                    declined: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
                  };
                  return (
                    <div key={req.id} className="px-6 py-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {normalizeAuditType(req.assessment_type)}
                          </p>
                          <p className="text-sm text-slate-900 dark:text-white">
                            Requested by {req.requester_name}
                          </p>
                          {req.notes && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{req.notes}</p>}
                          {req.admin_notes && (
                            <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Admin: {req.admin_notes}</p>
                          )}
                          <p className="text-xs text-slate-400 mt-1">{new Date(req.created_at).toLocaleString()}</p>
                        </div>
                        <span className={`text-xs px-2 py-0.5 rounded font-medium capitalize ${statusColors[req.status] || ''}`}>
                          {req.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  RUBRIC EVALUATION TAB (admin only for editing)            */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'rubric' && (
        <div className="space-y-4">
          {!activeAssessment && isAdmin ? (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-12 text-center">
              <AlertCircle size={32} className="mx-auto mb-3 text-slate-400" />
              <p className="text-slate-500 dark:text-slate-400">Select or create an assessment first from the Assessments tab.</p>
            </div>
          ) : (
            <>
              {!activeAssessment && !isAdmin && (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <BookOpen size={16} />
                    <span className="text-sm">Rubric reference only. No audit has been selected.</span>
                  </div>
                </div>
              )}

              {/* Read-only notice for district users */}
              {!isAdmin && (
                <div className="bg-slate-50 dark:bg-slate-900/30 border border-slate-200 dark:border-slate-700 rounded-lg px-4 py-3">
                  <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <Eye size={16} />
                    <span className="text-sm">Viewing audit results (read-only)</span>
                  </div>
                </div>
              )}

              {/* Maturity Overview */}
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
                <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                  Maturity by Function
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                  {RUBRIC_FUNCTIONS.map(func => {
                    const score = functionScores[func.key];
                    const color = NIST_FUNCTION_COLORS[func.key];
                    return (
                      <div key={func.key} className="text-center p-3 rounded-lg bg-slate-50 dark:bg-slate-900/30">
                        <div className="text-2xl font-bold" style={{ color }}>
                          {score !== null ? score.toFixed(1) : '---'}
                        </div>
                        <div className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">{func.name}</div>
                        <div className="text-xs text-slate-400 mt-0.5">
                          {func.categories.filter(c => ratings[`${func.key}::${c.name}`]?.level).length}/{func.categories.length}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Rubric Functions */}
              {RUBRIC_FUNCTIONS.map(func => (
                <div key={func.key} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <button
                    onClick={() => setExpandedFunc(expandedFunc === func.key ? null : func.key)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: NIST_FUNCTION_COLORS[func.key] }} />
                      <span className="font-semibold text-slate-900 dark:text-white">{func.name}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        ({func.categories.length} categories)
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      {functionScores[func.key] !== null && (
                        <span className="text-sm font-bold" style={{ color: NIST_FUNCTION_COLORS[func.key] }}>
                          {functionScores[func.key].toFixed(1)}
                        </span>
                      )}
                      {expandedFunc === func.key ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                    </div>
                  </button>

                  {expandedFunc === func.key && (
                    <div className="border-t border-slate-200 dark:border-slate-700">
                      {/* Function Level Descriptions */}
                      <div className="px-6 py-3 bg-slate-50 dark:bg-slate-900/30">
                        <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                          {func.levelDescriptions['3']}
                        </p>
                      </div>

                      {/* Categories */}
                      {func.categories.map(cat => {
                        const ratingKey = `${func.key}::${cat.name}`;
                        const current = ratings[ratingKey] || { level: null, evidence: '', notes: '' };
                        const isExpanded = expandedCat === ratingKey;
                        const levelDescriptions = cat.levels || func.levelDescriptions;

                        return (
                          <div key={cat.name} className="border-t border-slate-100 dark:border-slate-700/50">
                            <button
                              onClick={() => setExpandedCat(isExpanded ? null : ratingKey)}
                              className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/20 text-left"
                            >
                              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {cat.name}
                              </span>
                              <div className="flex items-center gap-2">
                                {current.level && (
                                  <span
                                    className="text-xs font-bold px-2 py-0.5 rounded"
                                    style={{
                                      backgroundColor: MATURITY_LEVELS[current.level - 1].color + '20',
                                      color: MATURITY_LEVELS[current.level - 1].color
                                    }}
                                  >
                                    L{current.level} — {MATURITY_LEVELS[current.level - 1].name}
                                  </span>
                                )}
                                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                              </div>
                            </button>

                            {isExpanded && (
                              <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                                {/* Level Selector (admin) or read-only display (district) */}
                                {isAdmin ? (
                                  <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                      Maturity Level
                                    </label>
                                    <div className="flex gap-2 mt-2">
                                      {MATURITY_LEVELS.map(ml => (
                                        <button
                                          key={ml.level}
                                          onClick={() => saveRating(func.key, cat.name, ml.level, current.evidence, current.notes)}
                                          className={`flex-1 py-2 px-1 rounded-lg text-xs font-medium transition-all border-2 ${
                                            current.level === ml.level
                                              ? 'border-current shadow-sm'
                                              : 'border-transparent bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600'
                                          }`}
                                          style={current.level === ml.level ? {
                                            backgroundColor: ml.color + '20',
                                            color: ml.color,
                                            borderColor: ml.color
                                          } : undefined}
                                          title={ml.description}
                                        >
                                          <div className="font-bold">{ml.level}</div>
                                          <div className="hidden sm:block mt-0.5">{ml.name}</div>
                                        </button>
                                      ))}
                                    </div>
                                  </div>
                                ) : (
                                  <div>
                                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                      Maturity Level
                                    </label>
                                    {current.level ? (
                                      <div className="mt-2 flex items-center gap-3">
                                        <div
                                          className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                                          style={{ backgroundColor: MATURITY_LEVELS[current.level - 1].color }}
                                        >
                                          {current.level}
                                        </div>
                                        <div>
                                          <p className="text-sm font-medium text-slate-900 dark:text-white">
                                            {MATURITY_LEVELS[current.level - 1].name}
                                          </p>
                                          <p className="text-xs text-slate-500 dark:text-slate-400">
                                            {MATURITY_LEVELS[current.level - 1].description}
                                          </p>
                                        </div>
                                      </div>
                                    ) : (
                                      <p className="mt-2 text-sm text-slate-400">Not yet rated</p>
                                    )}
                                  </div>
                                )}

                                {/* Level Descriptions */}
                                {levelDescriptions && (
                                  <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1 bg-white dark:bg-slate-800 rounded-lg p-3 border border-slate-200 dark:border-slate-700">
                                    <p className="font-medium text-slate-600 dark:text-slate-300 mb-2">Level Descriptions:</p>
                                    {Object.entries(levelDescriptions).map(([lvl, desc]) => (
                                      <p key={lvl} className={current.level === parseInt(lvl) ? 'font-medium text-slate-700 dark:text-slate-200' : ''}>
                                        <strong>L{lvl}:</strong> {desc}
                                      </p>
                                    ))}
                                  </div>
                                )}

                                {/* Evidence (admin edit, district read-only) */}
                                <div>
                                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Evidence / Documentation
                                  </label>
                                  {isAdmin ? (
                                    <textarea
                                      value={current.evidence}
                                      onChange={e => {
                                        const val = e.target.value;
                                        setRatings(prev => ({
                                          ...prev,
                                          [ratingKey]: { ...prev[ratingKey], evidence: val }
                                        }));
                                      }}
                                      onBlur={() => current.level && saveRating(func.key, cat.name, current.level, current.evidence, current.notes)}
                                      placeholder="Describe the evidence that supports this maturity level..."
                                      className="w-full mt-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                      rows={2}
                                    />
                                  ) : (
                                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                      {current.evidence || 'No evidence recorded.'}
                                    </p>
                                  )}
                                </div>

                                {/* Notes (admin edit, district read-only) */}
                                <div>
                                  <label className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                                    Notes
                                  </label>
                                  {isAdmin ? (
                                    <textarea
                                      value={current.notes}
                                      onChange={e => {
                                        const val = e.target.value;
                                        setRatings(prev => ({
                                          ...prev,
                                          [ratingKey]: { ...prev[ratingKey], notes: val }
                                        }));
                                      }}
                                      onBlur={() => current.level && saveRating(func.key, cat.name, current.level, current.evidence, current.notes)}
                                      placeholder="Additional notes or observations..."
                                      className="w-full mt-1 px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                      rows={2}
                                    />
                                  ) : (
                                    <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                                      {current.notes || 'No notes recorded.'}
                                    </p>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  INTERVIEW GUIDE TAB (admin only)                          */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'interview' && isAdmin && (
        <div className="space-y-4">
          {/* Interview Checklist */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Interview Checklist
            </h3>
            {Object.entries(INTERVIEW_CHECKLIST).map(([phase, items]) => {
              const checked = items.filter((_, i) => checklistProgress[`${phase}::${i}`]).length;
              return (
                <div key={phase} className="mb-4 last:mb-0">
                  <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 capitalize mb-2">
                    {phase} Interview ({checked}/{items.length})
                  </h4>
                  <div className="space-y-1.5">
                    {items.map((item, i) => {
                      const key = `${phase}::${i}`;
                      return (
                        <label key={i} className="flex items-start gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={!!checklistProgress[key]}
                            onChange={() => activeAssessment ? toggleChecklist(phase, i) : null}
                            disabled={!activeAssessment}
                            className="mt-0.5 rounded border-slate-300 dark:border-slate-600 text-blue-600"
                          />
                          <span className={`text-sm ${
                            checklistProgress[key]
                              ? 'text-slate-400 dark:text-slate-500 line-through'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}>
                            {item}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              );
            })}
            {!activeAssessment && (
              <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                Select an assessment to track checklist progress.
              </p>
            )}
          </div>

          {/* Interview Questions by Function */}
          {RUBRIC_FUNCTIONS.map(func => {
            const questions = INTERVIEW_QUESTIONS[func.key];
            if (!questions) return null;
            return (
              <div key={func.key} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <button
                  onClick={() => setExpandedFunc(expandedFunc === `int-${func.key}` ? null : `int-${func.key}`)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquare size={18} style={{ color: NIST_FUNCTION_COLORS[func.key] }} />
                    <span className="font-semibold text-slate-900 dark:text-white">{func.name} — Interview Questions</span>
                  </div>
                  {expandedFunc === `int-${func.key}` ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </button>

                {expandedFunc === `int-${func.key}` && (
                  <div className="border-t border-slate-200 dark:border-slate-700">
                    {Object.entries(questions).map(([catName, levels]) => (
                      <div key={catName} className="border-t border-slate-100 dark:border-slate-700/50 first:border-t-0">
                        <button
                          onClick={() => setExpandedCat(expandedCat === `int-${func.key}-${catName}` ? null : `int-${func.key}-${catName}`)}
                          className="w-full px-6 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/20 text-left"
                        >
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{catName}</span>
                          {expandedCat === `int-${func.key}-${catName}` ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                        </button>

                        {expandedCat === `int-${func.key}-${catName}` && (
                          <div className="px-6 py-4 bg-slate-50/50 dark:bg-slate-900/20 space-y-4">
                            {Object.entries(levels).map(([level, questionText]) => {
                              const ml = MATURITY_LEVELS[parseInt(level) - 1];
                              const respKey = `${func.key}::${catName}::${level}::${questionText.substring(0, 50)}`;
                              return (
                                <div key={level} className="border-l-2 pl-4" style={{ borderColor: ml.color }}>
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-xs font-bold px-2 py-0.5 rounded"
                                      style={{ backgroundColor: ml.color + '20', color: ml.color }}>
                                      Level {level} — {ml.name}
                                    </span>
                                  </div>
                                  <div className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line mb-2">
                                    {questionText}
                                  </div>
                                  {activeAssessment && (
                                    <textarea
                                      value={interviewResponses[respKey] || ''}
                                      onChange={e => setInterviewResponses(prev => ({ ...prev, [respKey]: e.target.value }))}
                                      onBlur={e => e.target.value && saveInterviewResponse(
                                        func.key, catName, parseInt(level), questionText.substring(0, 50), e.target.value
                                      )}
                                      placeholder="Record interview responses here..."
                                      className="w-full px-3 py-2 text-sm border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                                      rows={3}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════ */}
      {/*  TRAINING GUIDE TAB (admin only)                           */}
      {/* ═══════════════════════════════════════════════════════════ */}
      {activeTab === 'training' && isAdmin && (
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={20} className="text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{TRAINING_GUIDE.title}</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Learn how to use the Cybersecurity Rubric 2.0 for evaluating K-12 cybersecurity maturity.
              These modules cover cybersecurity awareness, the NIST framework, and evaluation methodology.
            </p>
          </div>

          {TRAINING_GUIDE.modules.map(mod => (
            <div key={mod.id} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => setExpandedModule(expandedModule === mod.id ? null : mod.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/30"
              >
                <span className="font-semibold text-slate-900 dark:text-white">{mod.title}</span>
                {expandedModule === mod.id ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
              </button>

              {expandedModule === mod.id && (
                <div className="border-t border-slate-200 dark:border-slate-700 divide-y divide-slate-100 dark:divide-slate-700/50">
                  {mod.topics.map(topic => (
                    <div key={topic.id} className="px-6 py-4">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-2">{topic.title}</h4>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">{topic.content}</p>
                      <div className="space-y-1.5">
                        {topic.keyPoints.map((point, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="flex-shrink-0 w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-500" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{point}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Maturity Level Reference */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
              Maturity Level Reference
            </h3>
            <div className="space-y-3">
              {MATURITY_LEVELS.map(ml => (
                <div key={ml.level} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: ml.color }}>
                    {ml.level}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{ml.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{ml.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
