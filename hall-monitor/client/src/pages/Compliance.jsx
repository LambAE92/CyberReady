import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';
import { CheckCircle, AlertCircle, XCircle, Minus, FileText, GraduationCap, ChevronDown } from 'lucide-react';

const NIST_COLORS = {
  Govern:   'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
  Identify: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  Protect:  'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  Detect:   'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
  Respond:  'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
  Recover:  'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300',
};

const MATURITY_LABELS = [null,
  { short: 'Initial',    tone: 'text-red-600 dark:text-red-400' },
  { short: 'Repeatable', tone: 'text-orange-600 dark:text-orange-400' },
  { short: 'Defined',    tone: 'text-amber-600 dark:text-amber-400' },
  { short: 'Managed',    tone: 'text-blue-600 dark:text-blue-400' },
  { short: 'Optimized',  tone: 'text-green-600 dark:text-green-400' },
];

const statusIcon = {
  Met: <CheckCircle size={16} className="text-green-500" />,
  'Partially Met': <AlertCircle size={16} className="text-amber-500" />,
  'Not Met': <XCircle size={16} className="text-red-500" />,
  'N/A': <Minus size={16} className="text-slate-400" />,
};

const statusColor = {
  Met: 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  'Partially Met': 'bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400',
  'Not Met': 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  'N/A': 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400',
};

function TrainingFeed({ departments }) {
  if (!departments.length) return null;
  const overallPct = departments.length
    ? Math.round(departments.reduce((s, d) => s + d.completion_pct, 0) / departments.length)
    : 0;
  const below = departments.filter(d => d.completion_pct < 80);

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 flex items-center gap-2">
        <GraduationCap size={15} className="text-indigo-500" />
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300">Masterclass Training Completion</h4>
        <span className={`ml-auto text-xs font-bold px-2 py-0.5 rounded ${overallPct >= 80 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : overallPct >= 60 ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          {overallPct}% overall
        </span>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
        {departments.map((d, i) => {
          const pct = Math.round(d.completion_pct);
          const barColor = pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-amber-500' : 'bg-red-500';
          return (
            <div key={i} className="px-4 py-2.5 flex items-center gap-3">
              {pct >= 80
                ? <CheckCircle size={14} className="flex-shrink-0 text-green-500" />
                : <AlertCircle size={14} className={`flex-shrink-0 ${pct >= 60 ? 'text-amber-500' : 'text-red-500'}`} />
              }
              <span className="flex-1 text-sm text-slate-700 dark:text-slate-300">{d.department}</span>
              <div className="w-24 h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div className={`h-full rounded-full ${barColor}`} style={{ width: `${pct}%` }} />
              </div>
              <span className="w-10 text-right text-xs text-slate-500 dark:text-slate-400">{pct}%</span>
            </div>
          );
        })}
      </div>
      {below.length > 0 && (
        <div className="px-4 py-2.5 bg-amber-50 dark:bg-amber-900/10 border-t border-amber-100 dark:border-amber-800">
          <p className="text-xs text-amber-700 dark:text-amber-400">
            {below.length} department{below.length !== 1 ? 's' : ''} below 80% — training completion affects overall governance readiness.
          </p>
        </div>
      )}
    </div>
  );
}

function GovernanceStatusSection({ fnData }) {
  const [expanded, setExpanded] = useState(null);
  if (!fnData || fnData.length === 0) return null;

  const totalFns = fnData.length;
  const metFns = fnData.filter(f => f.status === 'Met').length;
  const partialFns = fnData.filter(f => f.status === 'Partially Met').length;
  const notMetFns = fnData.filter(f => f.status === 'Not Met').length;
  const notAssessed = fnData.filter(f => f.status === 'Not Assessed').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Cybersecurity Governance Status (CCRE-aligned)</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Derived from self-assessment maturity scores and active findings
          </p>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="text-green-600 dark:text-green-400 font-medium">{metFns} Met</span>
          <span className="text-amber-600 dark:text-amber-400 font-medium">{partialFns} Partial</span>
          <span className="text-red-600 dark:text-red-400 font-medium">{notMetFns} Not Met</span>
          {notAssessed > 0 && <span className="text-slate-400 font-medium">{notAssessed} Not Assessed</span>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {fnData.map(fn => {
          const c = NIST_COLORS[fn.name] || '';
          const isOpen = expanded === fn.name;
          const rounded = fn.avgMaturity > 0 ? Math.min(5, Math.max(1, Math.round(fn.avgMaturity))) : 0;
          const matLabel = rounded > 0 ? MATURITY_LABELS[rounded] : null;
          const totalActive = (fn.activeFindings?.Critical || 0) + (fn.activeFindings?.High || 0) + (fn.activeFindings?.Medium || 0) + (fn.activeFindings?.Low || 0);

          const statusCls = fn.status === 'Met'
            ? 'text-green-600 dark:text-green-400'
            : fn.status === 'Partially Met'
            ? 'text-amber-600 dark:text-amber-400'
            : fn.status === 'Not Met'
            ? 'text-red-600 dark:text-red-400'
            : 'text-slate-400';

          const statusIcon = fn.status === 'Met' ? <CheckCircle size={14} />
            : fn.status === 'Partially Met' ? <AlertCircle size={14} />
            : fn.status === 'Not Met' ? <XCircle size={14} />
            : <Minus size={14} />;

          return (
            <div key={fn.name} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => setExpanded(isOpen ? null : fn.name)}
                className="w-full px-5 py-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors text-left"
              >
                <span className={`text-xs font-bold px-2 py-1 rounded ${c} uppercase tracking-wider flex-shrink-0`}>
                  {fn.name}
                </span>
                <div className="flex-1 min-w-0">
                  {fn.avgMaturity > 0 ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">
                        {fn.avgMaturity.toFixed(1)}
                      </span>
                      {matLabel && (
                        <span className={`text-xs ${matLabel.tone}`}>L{rounded} · {matLabel.short}</span>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400">No self-assessment data</span>
                  )}
                  {totalActive > 0 && (
                    <p className="text-[10px] text-red-500 dark:text-red-400 mt-0.5">
                      {totalActive} active finding{totalActive !== 1 ? 's' : ''}
                      {fn.activeFindings?.Critical > 0 && ` · ${fn.activeFindings.Critical} critical`}
                    </p>
                  )}
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold flex-shrink-0 ${statusCls}`}>
                  {statusIcon}
                  <span className="hidden sm:inline">{fn.status}</span>
                </div>
                <ChevronDown size={14} className={`text-slate-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && fn.categories.length > 0 && (
                <div className="border-t border-slate-100 dark:border-slate-700/50 divide-y divide-slate-100 dark:divide-slate-700/50">
                  {fn.categories.map((cat, i) => {
                    const catStatusCls = cat.status === 'Met'
                      ? 'text-green-600 dark:text-green-400'
                      : cat.status === 'Partially Met'
                      ? 'text-amber-600 dark:text-amber-400'
                      : cat.status === 'Not Met'
                      ? 'text-red-600 dark:text-red-400'
                      : 'text-slate-400';
                    const catIcon = cat.status === 'Met' ? <CheckCircle size={12} />
                      : cat.status === 'Partially Met' ? <AlertCircle size={12} />
                      : cat.status === 'Not Met' ? <XCircle size={12} />
                      : <Minus size={12} />;
                    return (
                      <div key={i} className="px-5 py-2.5 flex items-center gap-3">
                        <span className={`flex-shrink-0 ${catStatusCls}`}>{catIcon}</span>
                        <span className="flex-1 text-xs text-slate-700 dark:text-slate-300 capitalize">
                          {cat.name.toLowerCase().replace(/_/g, ' ')}
                        </span>
                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                          {cat.maturityScore ? `L${cat.maturityScore}` : '—'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
              {isOpen && fn.categories.length === 0 && (
                <div className="border-t border-slate-100 dark:border-slate-700/50 px-5 py-3 text-xs text-slate-400">
                  No categories rated yet. Complete the cybersecurity-governance self-assessment to see detailed status.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Compliance() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  if (inAdminOverview) return <AdminDashboard defaultTab="compliance" />;

  const [data, setData]               = useState([]);
  const [depts, setDepts]             = useState([]);
  const [govStatus, setGovStatus]     = useState({ functions: [] });
  const [filter, setFilter]           = useState('');

  useEffect(() => {
    api.compliance().then(setData);
    api.masterclassDepartments().then(setDepts).catch(() => {});
    api.governanceStatus().then(setGovStatus).catch(() => {});
  }, []);

  // Group by framework
  const grouped = {};
  data.forEach(item => {
    if (!grouped[item.framework]) grouped[item.framework] = {};
    if (!grouped[item.framework][item.category]) grouped[item.framework][item.category] = [];
    grouped[item.framework][item.category].push(item);
  });

  const filtered = filter ? { [filter]: grouped[filter] } : grouped;

  const total   = data.filter(d => d.status !== 'N/A').length;
  const met     = data.filter(d => d.status === 'Met').length;
  const partial = data.filter(d => d.status === 'Partially Met').length;
  const notMet  = data.filter(d => d.status === 'Not Met').length;

  const districtName = activeDistrict?.name || 'District';

  const handleGenerateReport = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html><head><title>HallMonitor Governance Report</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1e293b; }
        h1 { font-size: 24px; border-bottom: 2px solid #3b82f6; padding-bottom: 8px; }
        h2 { font-size: 18px; color: #3b82f6; margin-top: 24px; }
        h3 { font-size: 14px; color: #64748b; margin-top: 16px; text-transform: uppercase; }
        table { width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px; }
        th, td { text-align: left; padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
        th { background: #f8fafc; font-weight: 600; color: #64748b; }
        .met { color: #16a34a; } .partial { color: #d97706; } .notmet { color: #dc2626; }
        .summary { display: flex; gap: 24px; margin: 16px 0; }
        .stat { padding: 12px 20px; border-radius: 8px; background: #f8fafc; }
        .stat strong { display: block; font-size: 24px; }
        .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8; }
        @media print { body { margin: 0; } }
      </style></head><body>
      <h1>Governance Compliance Report</h1>
      <p>${districtName} &mdash; Generated ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
      <div class="summary">
        <div class="stat"><strong>${total ? Math.round(met / total * 100) : 0}%</strong>Compliance Rate</div>
        <div class="stat"><strong class="met">${met}</strong>Requirements Met</div>
        <div class="stat"><strong class="partial">${partial}</strong>Partially Met</div>
        <div class="stat"><strong class="notmet">${notMet}</strong>Not Met</div>
      </div>
      ${Object.entries(grouped).map(([fw, cats]) => `
        <h2>${fw}</h2>
        ${Object.entries(cats).map(([cat, items]) => `
          <h3>${cat}</h3>
          <table>
            <thead><tr><th>Requirement</th><th>Status</th><th>Evidence</th></tr></thead>
            <tbody>
              ${items.map(item => `
                <tr>
                  <td>${item.requirement}</td>
                  <td class="${item.status === 'Met' ? 'met' : item.status === 'Not Met' ? 'notmet' : 'partial'}">${item.status}</td>
                  <td>${item.evidence || '\u2014'}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `).join('')}
      `).join('')}
      <div class="footer">
        <p>Prepared by HallMonitor &bull; CyberReady K-12 Cybersecurity Platform</p>
        <p>This report is intended for board review and internal governance use only.</p>
      </div>
      </body></html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Governance Compliance</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Rubric alignment, policy readiness, and training completion across all governance domains
          </p>
        </div>
        <button onClick={handleGenerateReport}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          <FileText size={16} />
          Generate Board Report
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-3xl font-bold text-slate-900 dark:text-white">{total ? Math.round(met / total * 100) : 0}%</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Compliance Rate</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-3xl font-bold text-green-600">{met}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Met</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-3xl font-bold text-amber-500">{partial}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Partially Met</p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 text-center">
          <p className="text-3xl font-bold text-red-500">{notMet}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Not Met</p>
        </div>
      </div>

      {/* Cybersecurity-governance status derived from the CCRE-aligned workflow */}
      <GovernanceStatusSection fnData={govStatus.functions} />

      {/* Training Completion Feed */}
      <TrainingFeed departments={depts} />

      {/* Framework Filter */}
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setFilter('')}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!filter ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
          All Frameworks
        </button>
        {Object.keys(grouped).map(fw => (
          <button key={fw} onClick={() => setFilter(fw)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${filter === fw ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200'}`}>
            {fw}
          </button>
        ))}
      </div>

      {/* Compliance Items */}
      {Object.entries(filtered).map(([fw, cats]) => (
        <div key={fw} className="space-y-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{fw}</h3>
          {Object.entries(cats).map(([cat, items]) => (
            <div key={cat} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50">
                <h4 className="text-sm font-semibold text-slate-600 dark:text-slate-300">{cat}</h4>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {items.map(item => (
                  <div key={item.id} className="px-4 py-3 flex items-start gap-3">
                    {statusIcon[item.status]}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-900 dark:text-white">{item.requirement}</p>
                      {item.evidence && (
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.evidence}</p>
                      )}
                    </div>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ${statusColor[item.status]}`}>
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
