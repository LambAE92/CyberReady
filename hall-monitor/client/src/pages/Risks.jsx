import { Fragment, useEffect, useRef, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';
import DataFreshness from '../components/DataFreshness';
import {
  ChevronDown, Upload, FileText, Sparkles, CheckCircle2,
  AlertTriangle, RefreshCw, X, Info,
} from 'lucide-react';

const NIST_FUNCTIONS = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

const NIST_COLORS = {
  Govern:   'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  Identify: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Protect:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Detect:   'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Respond:  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Recover:  'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
};

const priorityBadge = {
  Critical: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  High:     'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  Medium:   'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  Low:      'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
};

const statusBadge = {
  Open:          'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400',
  'In Progress': 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
  Mitigated:     'bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400',
  Closed:        'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
};

const statusLabel = {
  Open:          'Active',
  'In Progress': 'Addressing',
  Mitigated:     'Resolved',
  Closed:        'Closed',
};

function SourceBadge({ sourceType }) {
  if (sourceType === 'ai_evaluated') {
    return (
      <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
        <Sparkles size={9} /> AI
      </span>
    );
  }
  return null;
}

export default function Risks() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  const fileInputRef = useRef(null);

  if (inAdminOverview) return <AdminDashboard defaultTab="findings" />;

  const [risks, setRisks]           = useState([]);
  const [documents, setDocuments]   = useState([]);
  const [severity, setSeverity]     = useState('');
  const [status, setStatus]         = useState('');
  const [nistFilter, setNistFilter] = useState('');
  const [expanded, setExpanded]     = useState(null);
  const [editingNotes, setEditingNotes] = useState({});

  // Upload state
  const [dragOver, setDragOver]     = useState(false);
  const [uploading, setUploading]   = useState(false);
  const [uploadResult, setUploadResult] = useState(null); // { findingsExtracted, filename, aiEnabled, aiError }
  const [uploadError, setUploadError]   = useState('');

  const canEdit = ['platform_admin', 'district_it'].includes(user?.role);

  const loadData = () => {
    api.risks({ severity, status }).then(setRisks);
    api.findingsDocuments().catch(() => []).then(setDocuments);
  };

  useEffect(() => { loadData(); }, [severity, status]);

  const handleStatusChange = async (id, newStatus) => {
    await api.updateRisk(id, { status: newStatus });
    api.risks({ severity, status }).then(setRisks);
  };

  const handleNotesSave = async (id) => {
    await api.updateRisk(id, { notes: editingNotes[id] || '' });
    setEditingNotes(prev => { const n = { ...prev }; delete n[id]; return n; });
    api.risks({ severity, status }).then(setRisks);
  };

  const handleUpload = async (file) => {
    if (!file) return;
    setUploading(true);
    setUploadError('');
    setUploadResult(null);
    try {
      const result = await api.uploadFindingsDocument(file);
      setUploadResult(result);
      // Refresh risks + documents
      api.risks({ severity, status }).then(setRisks);
      api.findingsDocuments().catch(() => []).then(setDocuments);
    } catch (err) {
      setUploadError(err.message || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleUpload(file);
  };

  const filteredRisks = nistFilter
    ? risks.filter(r => r.nist_function === nistFilter)
    : risks;

  const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
  risks.forEach(r => { if (counts[r.severity] !== undefined) counts[r.severity]++; });
  const activeCount = risks.filter(r => r.status === 'Open' || r.status === 'In Progress').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Findings &amp; Recommendations</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Upload evaluation documents for AI-assisted finding extraction, or manage findings manually
          </p>
        </div>
        <button onClick={loadData}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
          <RefreshCw size={15} />
          Refresh
        </button>
      </div>

      {/* ── Document Upload ─────────────────────────────────────── */}
      {canEdit && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center gap-3">
            <Sparkles size={16} className="text-purple-500" />
            <div>
              <h3 className="text-sm font-semibold text-slate-900 dark:text-white">AI-Assisted Finding Extraction</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Upload an assessment document, policy review, or report for optional AI-assisted finding extraction. Review all suggested findings before relying on them.
              </p>
            </div>
          </div>

          <div className="p-6 space-y-4">
            {/* Drop zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !uploading && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                dragOver
                  ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-slate-50 dark:hover:bg-slate-700/30'
              } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.docx,.pdf"
                className="hidden"
                onChange={handleFileChange}
              />
              {uploading ? (
                <div className="flex flex-col items-center gap-3">
                  <RefreshCw size={28} className="text-blue-500 animate-spin" />
                  <p className="text-sm font-medium text-slate-700 dark:text-slate-300">Analyzing document with AI…</p>
                  <p className="text-xs text-slate-400">This may take a few seconds</p>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Upload size={28} className="text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      Drop a document here or <span className="text-blue-600 dark:text-blue-400">browse</span>
                    </p>
                    <p className="text-xs text-slate-400 mt-1">Supported: .txt, .docx, .pdf — Max 10 MB</p>
                  </div>
                </div>
              )}
            </div>

            {/* Upload result */}
            {uploadResult && (
              <div className="rounded-lg border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20 p-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={18} className="text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-green-900 dark:text-green-200">
                      {uploadResult.findingsExtracted > 0
                        ? `${uploadResult.findingsExtracted} finding${uploadResult.findingsExtracted !== 1 ? 's' : ''} extracted from "${uploadResult.filename}"`
                        : `Document uploaded — no findings identified in "${uploadResult.filename}"`}
                    </p>
                    {!uploadResult.aiEnabled && (
                      <p className="text-xs text-amber-700 dark:text-amber-400 mt-1 flex items-start gap-1.5">
                        <Info size={12} className="flex-shrink-0 mt-0.5" />
                        AI evaluation is disabled. Add <code className="font-mono bg-amber-100 dark:bg-amber-900/40 px-1 rounded">ANTHROPIC_API_KEY</code> to your .env file to enable automatic finding extraction.
                      </p>
                    )}
                    {uploadResult.aiError && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-1">{uploadResult.aiError}</p>
                    )}
                  </div>
                  <button onClick={() => setUploadResult(null)} className="text-slate-400 hover:text-slate-600">
                    <X size={16} />
                  </button>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="rounded-lg border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 p-3 flex items-start gap-2">
                <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700 dark:text-red-400">{uploadError}</p>
              </div>
            )}

            {/* Document history */}
            {documents.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  Uploaded Documents
                </p>
                <div className="space-y-1.5">
                  {documents.slice(0, 5).map(doc => (
                    <div key={doc.id} className="flex items-center gap-3 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900/40">
                      <FileText size={14} className="text-slate-400 flex-shrink-0" />
                      <span className="flex-1 text-sm text-slate-700 dark:text-slate-300 truncate">{doc.original_name}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0">{doc.findings_count} finding{doc.findings_count !== 1 ? 's' : ''}</span>
                      <span className="text-xs text-slate-400 flex-shrink-0">
                        {new Date(doc.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  ))}
                  {documents.length > 5 && (
                    <p className="text-xs text-slate-400 pl-3">{documents.length - 5} more documents…</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Summary ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(counts).map(([pri, c]) => (
          <div key={pri} className={`px-3 py-1.5 rounded-lg text-sm font-medium ${priorityBadge[pri]}`}>
            {pri}: {c}
          </div>
        ))}
        <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          Total: {risks.length}
        </div>
        <div className="px-3 py-1.5 rounded-lg text-sm font-medium bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400">
          Active: {activeCount}
        </div>
      </div>

      {/* ── Filters ─────────────────────────────────────────────── */}
      <div className="flex flex-wrap gap-3">
        <select value={severity} onChange={e => setSeverity(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300">
          <option value="">All Priorities</option>
          <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select value={status} onChange={e => setStatus(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300">
          <option value="">All Statuses</option>
          <option value="Open">Active</option>
          <option value="In Progress">Addressing</option>
          <option value="Mitigated">Resolved</option>
          <option value="Closed">Closed</option>
        </select>
        <select value={nistFilter} onChange={e => setNistFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-300">
          <option value="">All NIST Functions</option>
          {NIST_FUNCTIONS.map(fn => <option key={fn}>{fn}</option>)}
        </select>
      </div>

      {/* ── Findings Table ───────────────────────────────────────── */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        {filteredRisks.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <AlertTriangle size={28} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No findings match your current filters.</p>
            {canEdit && <p className="text-xs mt-1">Upload a document above to automatically extract findings.</p>}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Finding</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Priority</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Status</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Owner</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">NIST Function</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Updated</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {filteredRisks.map(risk => (
                  <Fragment key={risk.id}>
                    <tr
                      className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer"
                      onClick={() => setExpanded(expanded === risk.id ? null : risk.id)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-slate-900 dark:text-white">{risk.title}</span>
                          <SourceBadge sourceType={risk.source_type} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${priorityBadge[risk.severity]}`}>
                          {risk.severity}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge[risk.status]}`}>
                          {statusLabel[risk.status] || risk.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400 text-xs">{risk.owner || '—'}</td>
                      <td className="px-4 py-3">
                        {risk.nist_function ? (
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${NIST_COLORS[risk.nist_function] || ''}`}>
                            {risk.nist_function}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400">{risk.category || '—'}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <DataFreshness updatedAt={risk.updated_at} sourceType={risk.source_type} />
                      </td>
                      <td className="px-4 py-3">
                        <ChevronDown size={16} className={`text-slate-400 transition-transform ${expanded === risk.id ? 'rotate-180' : ''}`} />
                      </td>
                    </tr>

                    {expanded === risk.id && (
                      <tr>
                        <td colSpan={7} className="px-4 py-4 bg-slate-50 dark:bg-slate-900/30">
                          <div className="space-y-3">
                            {risk.recommended_action && (
                              <div>
                                <span className="text-xs font-medium text-slate-500 uppercase">Recommendation</span>
                                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">{risk.recommended_action}</p>
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-medium text-slate-500 uppercase">Identified</span>
                              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{risk.discovered_date || '—'}</p>
                            </div>
                            {canEdit && (
                              <div className="flex items-center gap-3 flex-wrap">
                                <span className="text-xs font-medium text-slate-500 uppercase">Update Status:</span>
                                {[
                                  { value: 'Open',        label: 'Active' },
                                  { value: 'In Progress', label: 'Addressing' },
                                  { value: 'Mitigated',   label: 'Resolved' },
                                  { value: 'Closed',      label: 'Closed' },
                                ].map(({ value, label }) => (
                                  <button
                                    key={value}
                                    onClick={(e) => { e.stopPropagation(); handleStatusChange(risk.id, value); }}
                                    className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                                      risk.status === value
                                        ? statusBadge[value] + ' ring-2 ring-blue-400'
                                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                                    }`}
                                  >
                                    {label}
                                  </button>
                                ))}
                              </div>
                            )}
                            <div>
                              <span className="text-xs font-medium text-slate-500 uppercase">Notes</span>
                              <textarea
                                value={editingNotes[risk.id] !== undefined ? editingNotes[risk.id] : (risk.notes || '')}
                                onChange={e => setEditingNotes(prev => ({ ...prev, [risk.id]: e.target.value }))}
                                className="w-full mt-1 px-3 py-2 text-sm border rounded-lg dark:bg-slate-800 dark:border-slate-600 dark:text-white"
                                rows={2}
                                placeholder="Add notes..."
                                readOnly={!canEdit}
                              />
                              {canEdit && editingNotes[risk.id] !== undefined && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); handleNotesSave(risk.id); }}
                                  className="mt-1 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700"
                                >
                                  Save Notes
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
