import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';
import { ClipboardCheck, RefreshCw, Calendar, User, TrendingUp, TrendingDown, Minus } from 'lucide-react';

const NIST_FUNCTIONS = ['Govern', 'Identify', 'Protect', 'Detect', 'Respond', 'Recover'];

const maturityLabel = {
  1: { label: 'Initial',     color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' },
  2: { label: 'Developing',  color: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' },
  3: { label: 'Defined',     color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
  4: { label: 'Managed',     color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' },
  5: { label: 'Optimizing',  color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' },
};

const statusBadge = {
  completed:   'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  in_progress: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  draft:       'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
};

const actionColors = {
  login_success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  login_failed:  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  logout:        'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  update_risk_status:        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
  update_health_score:       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  switch_district:           'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  create_assessment:         'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  complete_assessment:       'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  delete_assessment:         'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
  create_assessment_snapshot:'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  request_audit:             'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  update_audit_request:      'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  generate_report:           'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
};

function formatAction(action) {
  return action.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function MaturityPill({ score }) {
  if (!score) return <span className="text-xs text-slate-400">—</span>;
  const level = Math.round(score);
  const m = maturityLabel[level] || maturityLabel[3];
  return (
    <span className={`px-2 py-0.5 rounded text-xs font-medium ${m.color}`}>
      L{level} – {m.label}
    </span>
  );
}

function TrendIcon({ current, previous }) {
  if (!previous) return <Minus size={14} className="text-slate-400" />;
  if (current > previous) return <TrendingUp size={14} className="text-green-500" />;
  if (current < previous) return <TrendingDown size={14} className="text-red-500" />;
  return <Minus size={14} className="text-slate-400" />;
}

export default function AuditLog() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  if (inAdminOverview) return <AdminDashboard defaultTab="evalHistory" />;

  const [assessments, setAssessments] = useState([]);
  const [logs, setLogs]               = useState([]);
  const [loading, setLoading]         = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([
      api.assessments().catch(() => []),
      api.auditLog(100).catch(() => []),
    ]).then(([a, l]) => {
      setAssessments(a);
      setLogs(l);
    }).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const completed = assessments.filter(a => a.status === 'completed');
  const inProgress = assessments.filter(a => a.status === 'in_progress' || a.status === 'draft');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Evaluation History</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            CCRR/CEAM cybersecurity assessment cycles, maturity scores, and system activity log
          </p>
        </div>
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Completed Evaluations</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{completed.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">In Progress / Draft</p>
          <p className="text-3xl font-bold text-amber-500 mt-1">{inProgress.length}</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
          <p className="text-sm text-slate-500 dark:text-slate-400">Latest Maturity Score</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
            {completed.length > 0 && completed[0].overall_maturity
              ? completed[0].overall_maturity.toFixed(1)
              : '—'}
          </p>
          {completed.length >= 2 && completed[0].overall_maturity && completed[1].overall_maturity && (
            <div className="flex items-center gap-1 mt-1">
              <TrendIcon current={completed[0].overall_maturity} previous={completed[1].overall_maturity} />
              <span className="text-xs text-slate-400">vs. previous evaluation</span>
            </div>
          )}
        </div>
      </div>

      {/* Evaluation Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Evaluation Cycles
          </h3>
        </div>
        {assessments.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <ClipboardCheck size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No evaluation cycles recorded yet.</p>
            <p className="text-xs mt-1">Start an evaluation from the Assessment page.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {assessments.map((a, i) => {
              const prevCompleted = assessments.slice(i + 1).find(p => p.status === 'completed');
              return (
                <div key={a.id} className="px-6 py-4 flex items-start gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 mt-1">
                    <div className={`w-3 h-3 rounded-full ${a.status === 'completed' ? 'bg-green-500' : a.status === 'in_progress' ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{a.name}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusBadge[a.status] || statusBadge.draft}`}>
                        {a.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                      {a.overall_maturity && <MaturityPill score={a.overall_maturity} />}
                      {a.status === 'completed' && prevCompleted?.overall_maturity && a.overall_maturity && (
                        <div className="flex items-center gap-1 text-xs text-slate-400">
                          <TrendIcon current={a.overall_maturity} previous={prevCompleted.overall_maturity} />
                          <span>
                            {a.overall_maturity > prevCompleted.overall_maturity
                              ? `+${(a.overall_maturity - prevCompleted.overall_maturity).toFixed(1)} from prior`
                              : a.overall_maturity < prevCompleted.overall_maturity
                              ? `${(a.overall_maturity - prevCompleted.overall_maturity).toFixed(1)} from prior`
                              : 'Same as prior'}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 mt-1.5 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        Created {new Date(a.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      {a.updated_at !== a.created_at && (
                        <span className="flex items-center gap-1">
                          <User size={11} />
                          Updated {new Date(a.updated_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* System Activity Log */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            System Activity Log
          </h3>
        </div>
        {logs.length === 0 ? (
          <div className="px-6 py-8 text-center text-sm text-slate-400">No activity recorded yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Timestamp</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">User</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Action</th>
                  <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Details</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id} className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {new Date(log.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">
                      {log.username || '—'}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${actionColors[log.action] || 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}>
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500 dark:text-slate-400 max-w-[240px] truncate">
                      {log.details || (log.entity_type ? `${log.entity_type}${log.entity_id ? ` #${log.entity_id}` : ''}` : '—')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
