import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import {
  LayoutGrid, ShieldAlert, GraduationCap, TrendingUp, Building2,
  AlertTriangle, CheckCircle2, Clock, ChevronRight, Users, School,
  ClipboardCheck, RefreshCw, XCircle, AlertCircle, Minus,
  FileText, Calendar, ClipboardList, ChevronDown, Brain,
} from 'lucide-react';

const MATURITY_LABELS = [
  null,
  { short: 'Initial',    tone: 'text-red-600 dark:text-red-400' },
  { short: 'Repeatable', tone: 'text-orange-600 dark:text-orange-400' },
  { short: 'Defined',    tone: 'text-amber-600 dark:text-amber-400' },
  { short: 'Managed',    tone: 'text-blue-600 dark:text-blue-400' },
  { short: 'Optimized',  tone: 'text-green-600 dark:text-green-400' },
];

const PRIORITY_COLORS = {
  Critical: { bg: 'bg-red-50 dark:bg-red-900/20',     text: 'text-red-700 dark:text-red-400',     ring: 'ring-red-200 dark:ring-red-800' },
  High:     { bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-700 dark:text-orange-400', ring: 'ring-orange-200 dark:ring-orange-800' },
  Medium:   { bg: 'bg-amber-50 dark:bg-amber-900/20', text: 'text-amber-700 dark:text-amber-400', ring: 'ring-amber-200 dark:ring-amber-800' },
  Low:      { bg: 'bg-blue-50 dark:bg-blue-900/20',   text: 'text-blue-700 dark:text-blue-400',   ring: 'ring-blue-200 dark:ring-blue-800' },
};

function maturityBand(score) {
  if (!score || score === 0) return { level: 0, label: '-', tone: 'text-slate-400' };
  const level = Math.min(5, Math.max(1, Math.round(score)));
  return { level, ...MATURITY_LABELS[level] };
}

function ScoreRing({ score, size = 120 }) {
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : pct >= 30 ? '#f97316' : '#ef4444';
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="8"
                className="stroke-slate-200 dark:stroke-slate-700" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="8"
                stroke={color} strokeLinecap="round"
                strokeDasharray={c} strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{score.toFixed(1)}</p>
        <p className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">of 5.0</p>
      </div>
    </div>
  );
}

// ── Tab components ──────────────────────────────────────────────

function OverviewTab({ data, goToDistrict }) {
  const { user } = useAuth();
  const [resetStatus, setResetStatus] = useState(null);
  const [resetting, setResetting] = useState(false);
  const {
    totalDistricts,
    districtsEvaluated,
    districtsWithAiMaturity = 0,
    averageMaturity,
    averageCagrMaturity = 0,
    aggregate,
    districts,
  } = data;
  const totalPriorities = aggregate.risks.Critical + aggregate.risks.High + aggregate.risks.Medium + aggregate.risks.Low;
  const totalAuditReqs = aggregate.auditRequests.pending + aggregate.auditRequests.scheduled + aggregate.auditRequests.in_progress + aggregate.auditRequests.completed;
  const aiDistrictScores = districts
    .map(d => Number(d.cagrMaturity) || 0)
    .filter(score => score > 0);
  const portfolioAiMaturity = aiDistrictScores.length
    ? Math.round((aiDistrictScores.reduce((sum, score) => sum + score, 0) / aiDistrictScores.length) * 10) / 10
    : averageCagrMaturity;
  const portfolioAiDistrictCount = aiDistrictScores.length || districtsWithAiMaturity;
  const band = maturityBand(averageMaturity);
  const aiPortfolioBand = maturityBand(portfolioAiMaturity);
  const complianceRate = data.compliance?.summary?.rate ?? null;
  const complianceFooter = complianceRate !== null
    ? `${data.compliance.summary.met ?? 0} met · ${data.compliance.summary.notMet ?? 0} not met`
    : 'No compliance data yet';
  const complianceTone = complianceRate === null ? 'text-slate-400'
    : complianceRate >= 80 ? 'text-green-600 dark:text-green-400'
    : complianceRate >= 50 ? 'text-amber-600 dark:text-amber-400'
    : 'text-red-600 dark:text-red-400';

  const handleResetDemo = async () => {
    if (!window.confirm('Reset all demo data to seed state? This cannot be undone.')) return;
    setResetting(true);
    setResetStatus(null);
    try {
      await api.resetDemo();
      setResetStatus({ type: 'success', text: 'Demo data reset. Refresh to see changes.' });
    } catch (err) {
      setResetStatus({ type: 'error', text: err.message || 'Demo reset failed.' });
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6">
      {user?.role === 'platform_admin' && (
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            Demo controls for seeded Walkerville data.
          </div>
          <button
            onClick={handleResetDemo}
            disabled={resetting}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 border border-red-200 dark:border-red-900/50 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 disabled:opacity-50"
          >
            <RefreshCw size={14} className={resetting ? 'animate-spin' : ''} />
            Reset Demo
          </button>
          {resetStatus && (
            <div className={`w-full text-sm ${resetStatus.type === 'success' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {resetStatus.text}
            </div>
          )}
        </div>
      )}

      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard icon={Building2} label="Districts" value={totalDistricts} footer={`${districtsEvaluated} evaluated`} color="bg-indigo-500" />
        <KpiCard icon={CheckCircle2} label="Compliance Rate"
          value={complianceRate !== null ? `${complianceRate}%` : '-'}
          footer={complianceFooter} footerTone={complianceTone} color="bg-teal-500" />
        <KpiCard icon={ShieldAlert} label="Active Findings" value={totalPriorities}
          footer={`${aggregate.risks.Critical} critical · ${aggregate.risks.High} high`} footerTone="text-red-500" color="bg-red-500" />
        <KpiCard icon={ClipboardCheck} label="Audits" value={totalAuditReqs}
          footer={`${aggregate.auditRequests.completed} completed · ${aggregate.auditRequests.in_progress + aggregate.auditRequests.pending} active`} color="bg-emerald-500" />
      </div>

      {/* Portfolio maturity ring + Priority breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 text-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Portfolio Avg Maturity</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
              <ShieldAlert size={18} className="text-blue-600 mb-2" />
              <ScoreRing score={averageMaturity} size={112} />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">Cyber</p>
              <p className={`text-xs font-semibold mt-1 ${band.tone}`}>
                {band.level > 0 ? `L${band.level} ${band.short}` : 'Not evaluated'}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Brain size={18} className="text-indigo-600 mb-2" />
              <ScoreRing score={portfolioAiMaturity} size={112} />
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2">AI</p>
              <p className={`text-xs font-semibold mt-1 ${aiPortfolioBand.tone}`}>
                {aiPortfolioBand.level > 0 ? `L${aiPortfolioBand.level} ${aiPortfolioBand.short}` : 'Not evaluated'}
              </p>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-3">
            Cyber: {districtsEvaluated} of {totalDistricts}. AI: {portfolioAiDistrictCount} of {totalDistricts}.
          </p>
          <div className="hidden"><ScoreRing score={averageMaturity} size={140} /></div>
          <p className={`hidden text-sm font-semibold mt-3 ${band.tone}`}>
            {band.level > 0 ? `L${band.level} · ${band.short}` : 'Not yet evaluated'}
          </p>
          <p className="hidden text-xs text-slate-400 mt-2">Averaged across {districtsEvaluated} of {totalDistricts} districts</p>
        </div>
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">Active Findings by Priority</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Critical', 'High', 'Medium', 'Low'].map(p => {
              const c = PRIORITY_COLORS[p];
              return (
                <div key={p} className={`rounded-lg p-4 ring-1 ${c.bg} ${c.ring}`}>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${c.text}`}>{p}</p>
                  <p className={`text-3xl font-bold mt-1 ${c.text}`}>{aggregate.risks[p]}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Districts table */}
      <DistrictsTable districts={districts} goToDistrict={goToDistrict} />
    </div>
  );
}

function FindingsTab({ data, goToDistrict }) {
  const { districts, aggregate } = data;
  const sorted = [...districts].sort((a, b) => {
    const aTotal = a.risks.Critical * 1000 + a.risks.High * 100 + a.risks.Medium * 10 + a.risks.Low;
    const bTotal = b.risks.Critical * 1000 + b.risks.High * 100 + b.risks.Medium * 10 + b.risks.Low;
    return bTotal - aTotal;
  });

  return (
    <div className="space-y-6">
      {/* Aggregate summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {['Critical', 'High', 'Medium', 'Low'].map(p => {
          const c = PRIORITY_COLORS[p];
          return (
            <div key={p} className={`rounded-xl p-5 ring-1 ${c.bg} ${c.ring}`}>
              <p className={`text-xs font-semibold uppercase tracking-wider ${c.text}`}>{p}</p>
              <p className={`text-4xl font-bold mt-1 ${c.text}`}>{aggregate.risks[p]}</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">across all districts</p>
            </div>
          );
        })}
      </div>

      {/* Per-district findings */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Findings by District</h3>
          <p className="text-xs text-slate-400 mt-0.5">Sorted by severity, click to view a district's full findings</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">District</th>
                <th className="text-center px-4 py-3 font-medium text-red-500">Critical</th>
                <th className="text-center px-4 py-3 font-medium text-orange-500">High</th>
                <th className="text-center px-4 py-3 font-medium text-amber-500">Medium</th>
                <th className="text-center px-4 py-3 font-medium text-blue-500">Low</th>
                <th className="text-center px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Total</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(d => {
                const total = d.risks.Critical + d.risks.High + d.risks.Medium + d.risks.Low;
                return (
                  <tr key={d.id} onClick={() => goToDistrict(d.id)}
                      className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer">
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900 dark:text-white">{d.name}</p>
                      <p className="text-xs text-slate-400">{d.state}</p>
                    </td>
                    <td className="px-4 py-3 text-center"><CountBadge count={d.risks.Critical} color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" /></td>
                    <td className="px-4 py-3 text-center"><CountBadge count={d.risks.High} color="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" /></td>
                    <td className="px-4 py-3 text-center"><CountBadge count={d.risks.Medium} color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" /></td>
                    <td className="px-4 py-3 text-center"><CountBadge count={d.risks.Low} color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" /></td>
                    <td className="px-4 py-3 text-center font-semibold text-slate-900 dark:text-white">{total}</td>
                    <td className="px-4 py-3 text-right"><ChevronRight size={16} className="text-slate-400 inline" /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MasterclassTab({ data }) {
  const mc = data.masterclass || [];
  const requests = data.masterclassRequests || [];

  const completed = mc.filter(d => d.completionPct >= 80);
  const inProgress = mc.filter(d => d.completionPct > 0 && d.completionPct < 80);
  const notStarted = mc.filter(d => d.completionPct === 0);
  const requested = requests.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{completed.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completed (80%+)</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-amber-500">{inProgress.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-slate-400">{notStarted.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Not Started</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-purple-600">{requested.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Pending Requests</p>
        </div>
      </div>

      {/* Pending masterclass requests */}
      {requests.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Masterclass Requests</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {requests.map(r => (
              <div key={r.id} className="px-6 py-3 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{r.full_name}</p>
                  <p className="text-xs text-slate-400">{r.organization} · {r.role}</p>
                </div>
                <span className="text-xs text-slate-400">{r.format_preference}</span>
                <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                  r.status === 'pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : r.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                }`}>{r.status.charAt(0).toUpperCase() + r.status.slice(1)}</span>
                <span className="text-xs text-slate-400">{new Date(r.created_at).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* District training status */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Training Completion by District</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">District</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Completion</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Requested</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {mc.map(d => {
                const barColor = d.completionPct >= 80 ? 'bg-green-500' : d.completionPct >= 40 ? 'bg-amber-500' : d.completionPct > 0 ? 'bg-red-500' : 'bg-slate-200 dark:bg-slate-700';
                const label = d.completionPct >= 80 ? 'Completed' : d.completionPct > 0 ? 'In Progress' : 'Not Started';
                const labelCls = d.completionPct >= 80 ? 'text-green-600 dark:text-green-400' : d.completionPct > 0 ? 'text-amber-600 dark:text-amber-400' : 'text-slate-400';
                return (
                  <tr key={d.districtId} className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{d.districtName}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-24 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                          <div className={`h-full rounded-full ${barColor}`} style={{ width: `${d.completionPct}%` }} />
                        </div>
                        <span className="text-xs text-slate-600 dark:text-slate-400 w-10">{d.completionPct}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {d.requested ? (
                        <span className="text-xs text-purple-600 dark:text-purple-400 font-medium">Yes · {d.requestStatus}</span>
                      ) : (
                        <span className="text-xs text-slate-400">No</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${labelCls}`}>{label}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function ComplianceTab({ data }) {
  const { summary, perDistrict } = data.compliance || { summary: {}, perDistrict: [] };
  const sorted = [...(perDistrict || [])].sort((a, b) => a.rate - b.rate);

  return (
    <div className="space-y-6">
      {/* Aggregate */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{summary.rate || 0}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Overall Compliance</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{summary.met || 0}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Requirements Met</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-amber-500">{summary.partial || 0}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Partially Met</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-red-500">{summary.notMet || 0}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Not Met</p>
        </div>
      </div>

      {/* Per-district compliance */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Compliance Rate by District</h3>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
          {sorted.map(d => {
            const barColor = d.rate >= 80 ? 'bg-green-500' : d.rate >= 60 ? 'bg-amber-500' : 'bg-red-500';
            return (
              <div key={d.districtId} className="px-6 py-3 flex items-center gap-4">
                <span className="flex-1 text-sm font-medium text-slate-900 dark:text-white min-w-0 truncate">{d.districtName}</span>
                <div className="w-40 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                  <div className={`h-full rounded-full ${barColor}`} style={{ width: `${d.rate}%` }} />
                </div>
                <span className="text-sm font-semibold text-slate-900 dark:text-white w-12 text-right">{d.rate}%</span>
                <span className="text-xs text-slate-400 w-20 text-right">{d.met}/{d.total} met</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function SelfAssessmentTab({ data, onRequestAudit }) {
  const saData = data.selfAssessments || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{saData.filter(d => d.completedAuditsCount > 0).length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Audits Completed</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-amber-500">{saData.filter(d => d.auditRequested).length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Active Audit Requests</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-slate-400">{saData.filter(d => d.snapshotCount > 0 && !d.auditRequested && d.completedAuditsCount === 0).length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Needs Audit Scheduling</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Self-Assessment & Audit Status by District</h3>
          <p className="text-xs text-slate-400 mt-0.5">Districts can do unlimited self-assessments but one audit per year</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">District</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Self-Assessment</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Categories</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Audit Status</th>
                <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Evaluations</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {saData.map(d => {
                const saLabel = d.snapshotCount === 0 ? 'Not Started'
                  : d.latestStatus === 'completed' ? 'Completed'
                  : d.latestStatus === 'in_progress' ? 'In Progress'
                  : 'Draft';
                const saColor = d.snapshotCount === 0 ? 'text-slate-400'
                  : d.latestStatus === 'completed' ? 'text-green-600 dark:text-green-400'
                  : 'text-amber-600 dark:text-amber-400';

                const auditLabel = d.activeAuditStatus === 'pending' ? 'Requested, Pending'
                  : d.activeAuditStatus === 'approved' ? 'Approved'
                  : d.activeAuditStatus === 'in_progress' ? 'In Progress'
                  : d.completedAuditsCount > 0 ? `${d.completedAuditsCount} Completed`
                  : 'No Audit';
                const auditColor = d.activeAuditStatus === 'pending' ? 'text-purple-600 dark:text-purple-400'
                  : d.activeAuditStatus === 'in_progress' ? 'text-amber-600 dark:text-amber-400'
                  : d.completedAuditsCount > 0 ? 'text-green-600 dark:text-green-400'
                  : 'text-slate-400';

                const needsScheduling = d.snapshotCount > 0 && !d.auditRequested && d.completedAuditsCount === 0;

                return (
                  <tr key={d.districtId} className="border-b border-slate-100 dark:border-slate-700/50">
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{d.districtName}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${saColor}`}>{saLabel}</span>
                      {d.snapshotCount > 0 && <span className="text-[10px] text-slate-400 ml-2">({d.snapshotCount} snapshot{d.snapshotCount !== 1 ? 's' : ''})</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">{d.categoriesRated}/22</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${auditColor}`}>{auditLabel}</span>
                      {d.activeAuditRequester && <span className="text-[10px] text-slate-400 ml-1">by {d.activeAuditRequester}</span>}
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-600 dark:text-slate-400">
                      {d.assessments.length > 0 ? (
                        <span>{d.assessments.filter(a => a.status === 'completed').length} done · {d.assessments.filter(a => a.status !== 'completed').length} active</span>
                      ) : '-'}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {needsScheduling && (
                        <button
                          onClick={() => onRequestAudit?.(d.districtId, d.districtName)}
                          className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          Request Schedule
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function EvaluationHistoryTab({ data }) {
  const assessments = data.allAssessments || [];

  const completed = assessments.filter(a => a.status === 'completed');
  const inProgress = assessments.filter(a => a.status === 'in_progress');
  const drafts = assessments.filter(a => a.status === 'draft');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-green-600">{completed.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Completed Evaluations</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-amber-500">{inProgress.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">In Progress</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 text-center">
          <p className="text-3xl font-bold text-slate-400">{drafts.length}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Drafts</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">All Evaluations</h3>
          <p className="text-xs text-slate-400 mt-0.5">CCRE evaluations you have conducted or started across all districts</p>
        </div>
        {assessments.length === 0 ? (
          <div className="px-6 py-12 text-center text-slate-400">
            <ClipboardList size={28} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No evaluations yet.</p>
            <p className="text-xs mt-1">Switch to a district and start an assessment from the Assessment page.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
            {assessments.map(a => {
              const statusCls = a.status === 'completed' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : a.status === 'in_progress' ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400';
              const b = maturityBand(a.overall_maturity);
              return (
                <div key={a.id} className="px-6 py-4 flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full flex-shrink-0 ${a.status === 'completed' ? 'bg-green-500' : a.status === 'in_progress' ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{a.name}</p>
                      <span className={`px-2 py-0.5 rounded text-xs font-medium ${statusCls}`}>
                        {a.status.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                      {a.overall_maturity > 0 && (
                        <span className={`text-xs font-medium ${b.tone}`}>L{b.level} · {b.short} ({a.overall_maturity.toFixed(1)})</span>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1"><Building2 size={11} />{a.district_name}</span>
                      <span className="flex items-center gap-1"><Calendar size={11} />{new Date(a.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Shared components ──────────────────────────────────────────

function DistrictsTable({ districts, goToDistrict }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Districts</h3>
        <p className="text-xs text-slate-400 mt-0.5">Click a district to switch into its dashboard view.</p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
              <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">District</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Schools / Students</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Cyber Maturity</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">AI Maturity</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Evaluation</th>
              <th className="text-left px-4 py-3 font-medium text-slate-500 dark:text-slate-400">Active Findings</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {districts.map(d => {
              const b = maturityBand(d.overallMaturity);
              const aiBand = maturityBand(d.cagrMaturity);
              const totalRisks = d.risks.Critical + d.risks.High + d.risks.Medium + d.risks.Low;
              const evLabel = d.evaluationStatus === 'none' ? 'Not started' :
                d.evaluationStatus.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
              const evTone = d.evaluationStatus === 'completed' ? 'text-green-600 dark:text-green-400' :
                             d.evaluationStatus === 'in_progress' ? 'text-amber-600 dark:text-amber-400' :
                             'text-slate-500 dark:text-slate-400';
              return (
                <tr key={d.id} onClick={() => goToDistrict(d.id)}
                    className="border-b border-slate-100 dark:border-slate-700/50 hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-slate-900 dark:text-white">{d.name}</p>
                    <p className="text-xs text-slate-400">{d.state}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                    <span className="inline-flex items-center gap-1"><School size={12} />{d.school_count}</span>
                    <span className="mx-2 text-slate-300 dark:text-slate-600">·</span>
                    <span className="inline-flex items-center gap-1"><Users size={12} />{d.student_count?.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    {d.overallMaturity > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{d.overallMaturity.toFixed(1)}</span>
                        <span className={`text-xs ${b.tone}`}>L{b.level} · {b.short}</span>
                      </div>
                    ) : <span className="text-xs text-slate-400">Not evaluated</span>}
                  </td>
                  <td className="px-4 py-3">
                    {d.cagrMaturity > 0 ? (
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 dark:text-white">{d.cagrMaturity.toFixed(1)}</span>
                        <span className={`text-xs ${aiBand.tone}`}>L{aiBand.level} {aiBand.short}</span>
                      </div>
                    ) : <span className="text-xs text-slate-400">Not evaluated</span>}
                  </td>
                  <td className="px-4 py-3"><span className={`text-xs font-medium ${evTone}`}>{evLabel}</span></td>
                  <td className="px-4 py-3">
                    {totalRisks > 0 ? (
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {d.risks.Critical > 0 && <Pill count={d.risks.Critical} color="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">C</Pill>}
                        {d.risks.High > 0     && <Pill count={d.risks.High}     color="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">H</Pill>}
                        {d.risks.Medium > 0   && <Pill count={d.risks.Medium}   color="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">M</Pill>}
                        {d.risks.Low > 0      && <Pill count={d.risks.Low}      color="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">L</Pill>}
                      </div>
                    ) : <span className="text-xs text-slate-400">None</span>}
                  </td>
                  <td className="px-4 py-3 text-right"><ChevronRight size={16} className="text-slate-400 inline" /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function KpiCard({ icon: Icon, label, value, footer, footerTone = 'text-slate-500 dark:text-slate-400', color }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</p>
        <span className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center text-white shadow-sm`}><Icon size={18} /></span>
      </div>
      <p className="text-3xl font-bold text-slate-900 dark:text-white mt-2">{value}</p>
      <p className={`text-xs mt-1 ${footerTone}`}>{footer}</p>
    </div>
  );
}

function Pill({ count, color, children }) {
  return (
    <span className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold ${color}`}>
      {children}:{count}
    </span>
  );
}

function CountBadge({ count, color }) {
  if (count === 0) return <span className="text-xs text-slate-300 dark:text-slate-600">0</span>;
  return <span className={`inline-flex items-center justify-center min-w-[24px] px-1.5 py-0.5 rounded text-xs font-bold ${color}`}>{count}</span>;
}

// ── Admin Tabs ──────────────────────────────────────────────────

const ADMIN_TABS = [
  { key: 'overview',        label: 'Dashboard',                  icon: LayoutGrid },
  { key: 'findings',        label: 'Findings & Recommendations', icon: ShieldAlert },
  { key: 'masterclass',     label: 'Masterclass Training',       icon: GraduationCap },
  { key: 'compliance',      label: 'Governance Compliance',      icon: ClipboardCheck },
  { key: 'selfAssessment',  label: 'Self-Assessment Audit',      icon: ClipboardList },
  { key: 'evalHistory',     label: 'Evaluation History',         icon: FileText },
];

export default function AdminDashboard({ defaultTab = 'overview' }) {
  const { user, switchDistrict } = useAuth();
  const [data, setData]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(defaultTab);

  const load = () => {
    setLoading(true);
    api.adminOverview().then(setData).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const goToDistrict = (id) => {
    switchDistrict(id).then(() => { window.location.reload(); });
  };

  const handleRequestAudit = (districtId, districtName) => {
    if (window.confirm(`Request ${districtName} to schedule their annual audit?`)) {
      // For now, just switch to the district so the admin can manage it
      goToDistrict(districtId);
    }
  };

  if (loading && !data) {
    return <div className="flex items-center justify-center h-64 text-slate-500">Loading admin overview…</div>;
  }
  if (!data) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
            <LayoutGrid size={12} />
            Platform Admin
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome back, {user?.fullName?.split(' ')[0] || 'Admin'}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Cross-portfolio view across {data.totalDistricts} {data.totalDistricts === 1 ? 'district' : 'districts'}.
          </p>
        </div>
        <button onClick={load} disabled={loading}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50">
          <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Tab bar */}
      <div className="flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-700 pb-px">
        {ADMIN_TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-600 text-blue-700 dark:text-blue-400 dark:border-blue-400'
                  : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-300'
              }`}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      {activeTab === 'overview'       && <OverviewTab data={data} goToDistrict={goToDistrict} />}
      {activeTab === 'findings'       && <FindingsTab data={data} goToDistrict={goToDistrict} />}
      {activeTab === 'masterclass'    && <MasterclassTab data={data} />}
      {activeTab === 'compliance'     && <ComplianceTab data={data} />}
      {activeTab === 'selfAssessment' && <SelfAssessmentTab data={data} onRequestAudit={handleRequestAudit} />}
      {activeTab === 'evalHistory'    && <EvaluationHistoryTab data={data} />}

      <p className="text-xs text-slate-400 dark:text-slate-500 text-center">
        Admin Overview · generated {new Date(data.generatedAt).toLocaleString()}
      </p>
    </div>
  );
}
