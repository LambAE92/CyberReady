import { useEffect, useState } from 'react';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import AdminDashboard from './AdminDashboard';
import { TrendingUp, TrendingDown, AlertTriangle, ShieldCheck, ArrowRight, FileDown, Brain } from 'lucide-react';

const MATURITY_LABELS = [
  null,
  { short: 'Initial',    tone: 'text-red-600 dark:text-red-400' },
  { short: 'Repeatable', tone: 'text-orange-600 dark:text-orange-400' },
  { short: 'Defined',    tone: 'text-amber-600 dark:text-amber-400' },
  { short: 'Managed',    tone: 'text-blue-600 dark:text-blue-400' },
  { short: 'Optimized',  tone: 'text-green-600 dark:text-green-400' },
];

const FUNCTION_COLORS = {
  Govern:   { bg: 'bg-indigo-100 dark:bg-indigo-900/30',  text: 'text-indigo-700 dark:text-indigo-300',  ring: 'ring-indigo-200 dark:ring-indigo-800',  bar: '#6366f1' },
  Identify: { bg: 'bg-blue-100 dark:bg-blue-900/30',      text: 'text-blue-700 dark:text-blue-300',      ring: 'ring-blue-200 dark:ring-blue-800',      bar: '#3b82f6' },
  Protect:  { bg: 'bg-emerald-100 dark:bg-emerald-900/30',text: 'text-emerald-700 dark:text-emerald-300',ring: 'ring-emerald-200 dark:ring-emerald-800', bar: '#10b981' },
  Detect:   { bg: 'bg-amber-100 dark:bg-amber-900/30',    text: 'text-amber-700 dark:text-amber-300',    ring: 'ring-amber-200 dark:ring-amber-800',    bar: '#f59e0b' },
  Respond:  { bg: 'bg-orange-100 dark:bg-orange-900/30',  text: 'text-orange-700 dark:text-orange-300',  ring: 'ring-orange-200 dark:ring-orange-800',  bar: '#f97316' },
  Recover:  { bg: 'bg-cyan-100 dark:bg-cyan-900/30',      text: 'text-cyan-700 dark:text-cyan-300',      ring: 'ring-cyan-200 dark:ring-cyan-800',      bar: '#06b6d4' },
};

const AI_FUNCTION_COLORS = {
  GOVERN:  { bg: 'bg-indigo-100 dark:bg-indigo-900/30',   text: 'text-indigo-700 dark:text-indigo-300',   ring: 'ring-indigo-200 dark:ring-indigo-800',   bar: '#4F46E5' },
  MAP:     { bg: 'bg-blue-100 dark:bg-blue-900/30',       text: 'text-blue-700 dark:text-blue-300',       ring: 'ring-blue-200 dark:ring-blue-800',       bar: '#0369A1' },
  MEASURE: { bg: 'bg-amber-100 dark:bg-amber-900/30',     text: 'text-amber-700 dark:text-amber-300',     ring: 'ring-amber-200 dark:ring-amber-800',     bar: '#D97706' },
  MANAGE:  { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', ring: 'ring-emerald-200 dark:ring-emerald-800', bar: '#059669' },
};

function ScoreRing({ score, size = 160 }) {
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#2563eb' : pct >= 30 ? '#f59e0b' : '#dc2626';
  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="10"
                className="stroke-slate-200 dark:stroke-slate-700" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="10"
                stroke={color} strokeLinecap="round"
                strokeDasharray={c} strokeDashoffset={offset}
                style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-4xl font-bold text-slate-900 dark:text-white">{score.toFixed(1)}</p>
        <p className="text-xs text-slate-500 dark:text-slate-400">out of 5.0</p>
      </div>
    </div>
  );
}

export default function Executive() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!inAdminOverview) api.executiveSummary().then(setData);
  }, [inAdminOverview]);

  // Admin doesn't need Executive Summary in overview, show Evaluation History tab instead
  if (inAdminOverview) return <AdminDashboard defaultTab="evalHistory" />;

  if (!data) return <div className="flex items-center justify-center h-64 text-slate-500">Loading...</div>;

  const districtName = data.district?.name || 'District';
  const overall = data.overallMaturity || 0;
  const overallLevel = overall > 0 ? Math.min(5, Math.max(1, Math.round(overall))) : 0;
  const label = overallLevel > 0 ? MATURITY_LABELS[overallLevel] : null;
  const hasRatings = overall > 0;
  const generatedOn = new Date(data.generatedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  const insuranceScore = data.insuranceScore || 0;
  const insuranceTone = insuranceScore >= 70 ? 'text-green-600' : insuranceScore >= 50 ? 'text-amber-500' : 'text-red-600';
  const insuranceBar = insuranceScore >= 70 ? 'bg-green-500' : insuranceScore >= 50 ? 'bg-amber-500' : 'bg-red-500';
  const insuranceLabel = insuranceScore >= 70 ? 'Strong Readiness' : insuranceScore >= 50 ? 'Moderate Readiness' : 'Needs Improvement';
  const aiOverall = data.aiOverallMaturity || 0;
  const aiOverallLevel = aiOverall > 0 ? Math.min(5, Math.max(1, Math.round(aiOverall))) : 0;
  const aiLabel = aiOverallLevel > 0 ? MATURITY_LABELS[aiOverallLevel] : null;
  const hasAiRatings = aiOverall > 0;

  // Build dynamic progress items from live data
  const progressItems = [];
  if (data.trainingRate >= 70) {
    progressItems.push({ color: 'bg-green-500', text: `Staff training at ${data.trainingRate}% completion across all departments.` });
  } else {
    progressItems.push({ color: 'bg-amber-500', text: `Staff training at ${data.trainingRate}%, below target of 80%.` });
  }
  if (data.complianceRate >= 60) {
    progressItems.push({ color: 'bg-green-500', text: `${data.complianceRate}% of framework compliance requirements currently met.` });
  } else {
    progressItems.push({ color: 'bg-red-500', text: `Only ${data.complianceRate}% compliance rate, significant gaps remain.` });
  }
  if (data.phishingTrend) {
    if (data.phishingTrend.improving) {
      progressItems.push({ color: 'bg-green-500', text: `Phishing click rate improved from ${data.phishingTrend.previous}% to ${data.phishingTrend.current}%.` });
    } else {
      progressItems.push({ color: 'bg-amber-500', text: `Phishing click rate at ${data.phishingTrend.current}% (was ${data.phishingTrend.previous}%).` });
    }
  }
  if (hasRatings && data.categoriesRated > 0) {
    progressItems.push({
      color: overall >= 3 ? 'bg-green-500' : 'bg-amber-500',
      text: `CCRE self-assessment: ${data.categoriesRated} of ${data.totalCategories} categories rated. Overall maturity at Level ${overallLevel} (${label?.short || ''}).`,
    });
  }
  if (hasAiRatings && data.aiCategoriesRated > 0) {
    progressItems.push({
      color: aiOverall >= 3 ? 'bg-green-500' : 'bg-amber-500',
      text: `CAIRE self-assessment: ${data.aiCategoriesRated} of ${data.aiTotalCategories} AI categories rated. Overall AI maturity at Level ${aiOverallLevel} (${aiLabel?.short || ''}).`,
    });
  }

  const handleExport = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const functionRows = (data.functionMaturity || []).map(fn => {
      const rounded = fn.score > 0 ? Math.min(5, Math.max(1, Math.round(fn.score))) : 0;
      const lbl = rounded > 0 ? `L${rounded} - ${MATURITY_LABELS[rounded]?.short || ''}` : 'Not rated';
      return `<tr>
        <td>${fn.name}</td>
        <td>${fn.score > 0 ? fn.score.toFixed(1) : '-'}</td>
        <td>${lbl}</td>
        <td>${fn.rated} / ${fn.total}</td>
      </tr>`;
    }).join('');

    const aiFunctionRows = (data.aiFunctionMaturity || []).map(fn => {
      const rounded = fn.score > 0 ? Math.min(5, Math.max(1, Math.round(fn.score))) : 0;
      const lbl = rounded > 0 ? `L${rounded} - ${MATURITY_LABELS[rounded]?.short || ''}` : 'Not rated';
      return `<tr>
        <td>${fn.name}</td>
        <td>${fn.score > 0 ? fn.score.toFixed(1) : '-'}</td>
        <td>${lbl}</td>
        <td>${fn.rated} / ${fn.total}</td>
      </tr>`;
    }).join('');

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>HallMonitor Executive Summary</title>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 900px; margin: 40px auto; padding: 0 24px; color: #0f172a; }
            h1 { font-size: 28px; margin-bottom: 8px; }
            h2 { font-size: 18px; margin-top: 28px; margin-bottom: 12px; color: #1d4ed8; }
            p { line-height: 1.6; }
            .muted { color: #64748b; }
            .grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin: 20px 0; }
            .card { border: 1px solid #cbd5e1; border-radius: 12px; padding: 16px; background: #f8fafc; }
            .metric { font-size: 28px; font-weight: 700; margin-top: 8px; }
            .list { margin: 0; padding-left: 18px; }
            .list li { margin-bottom: 8px; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th { text-align: left; padding: 8px 12px; background: #f1f5f9; border-bottom: 2px solid #cbd5e1; font-weight: 600; }
            td { padding: 8px 12px; border-bottom: 1px solid #e2e8f0; }
            .footer { border-top: 1px solid #cbd5e1; margin-top: 32px; padding-top: 16px; font-size: 12px; color: #64748b; }
            @media print { body { margin: 0; padding: 24px; } }
          </style>
        </head>
        <body>
          <h1>Executive Summary</h1>
          <p class="muted">${districtName}, generated ${generatedOn}</p>

          <div class="grid">
            <div class="card">
              <div class="muted">Overall Maturity</div>
              <div class="metric">${hasRatings ? overall.toFixed(1) + ' / 5.0' : 'Not Assessed'}</div>
              <div>${hasRatings ? `Level ${overallLevel} - ${label?.short || ''}` : '-'}</div>
            </div>
            <div class="card">
              <div class="muted">AI Maturity</div>
              <div class="metric">${hasAiRatings ? aiOverall.toFixed(1) + ' / 5.0' : 'Not Assessed'}</div>
              <div>${hasAiRatings ? `Level ${aiOverallLevel} - ${aiLabel?.short || ''}` : '-'}</div>
            </div>
            <div class="card">
              <div class="muted">Training Completion</div>
              <div class="metric">${data.trainingRate}%</div>
              <div>Staff trained</div>
            </div>
            <div class="card">
              <div class="muted">Compliance Rate</div>
              <div class="metric">${data.complianceRate}%</div>
              <div>Framework items met</div>
            </div>
          </div>

          <h2>CCRE Maturity by NIST Function</h2>
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Score</th>
                <th>Maturity Level</th>
                <th>Categories Rated</th>
              </tr>
            </thead>
            <tbody>${functionRows}</tbody>
          </table>

          <h2>CAIRE AI Maturity by NIST AI RMF Function</h2>
          <table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Score</th>
                <th>Maturity Level</th>
                <th>Categories Rated</th>
              </tr>
            </thead>
            <tbody>${aiFunctionRows}</tbody>
          </table>

          <h2>Top Priority Risks</h2>
          <ul class="list">
            ${(data.topRisks || []).map(r => `<li><strong>${r.title}</strong>, ${r.severity} / ${r.status}${r.owner ? ` (Owner: ${r.owner})` : ''}</li>`).join('')}
          </ul>

          <h2>Recommended Next Steps</h2>
          <ul class="list">
            ${(data.nextSteps || []).map(s => `<li>${s}</li>`).join('')}
          </ul>

          <div class="footer">
            Prepared by HallMonitor · CyberReady K-12 Cybersecurity Platform · CCRE Cybersecurity Rubric 2.0
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Executive Summary</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Board-ready overview, {districtName}</p>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <FileDown size={16} />
          Export Summary
        </button>
      </div>

      {/* Overall Maturity Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={overall} size={160} />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CCRE Cybersecurity Maturity</h3>
            {hasRatings ? (
              <>
                <p className={`text-2xl font-bold mt-1 ${label?.tone}`}>
                  Level {overallLevel} - {label?.short}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {districtName}&apos;s overall CCRE maturity score is <strong>{overall.toFixed(1)}</strong> out of 5.0,
                  based on {data.categoriesRated} of {data.totalCategories} rated categories.
                  {overall < 2 && ' Immediate action is recommended to establish foundational cybersecurity controls.'}
                  {overall >= 2 && overall < 3 && ' Foundational processes are emerging. Focus on formalizing documentation and standardizing practices.'}
                  {overall >= 3 && overall < 4 && ' Core processes are defined and documented. Prioritize measurement, enforcement, and consistency.'}
                  {overall >= 4 && ' Practices are actively managed with strong oversight. Continue optimizing and embedding a culture of security.'}
                </p>
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                No self-assessment data yet. Complete the CCRE Cybersecurity Rubric evaluation to generate maturity scores.
              </p>
            )}
            <div className="flex gap-4 mt-4 text-sm flex-wrap">
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <ShieldCheck size={16} className="text-blue-500" />
                <span>{data.trainingRate}% staff trained</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                {data.phishingTrend?.improving
                  ? <TrendingDown size={16} className="text-green-500" />
                  : <TrendingUp size={16} className="text-amber-500" />}
                <span>{data.complianceRate}% compliance rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* L1-L5 scale bar */}
        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700 grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map(lvl => {
            const m = MATURITY_LABELS[lvl];
            const isCurrent = hasRatings && overallLevel === lvl;
            return (
              <div key={lvl}
                   className={`text-center py-2 rounded-lg text-xs font-medium transition-colors ${
                     isCurrent
                       ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                       : 'bg-slate-50 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400'
                   }`}>
                <div className="text-base font-bold">L{lvl}</div>
                <div>{m.short}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Governance Maturity Card */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <ScoreRing score={aiOverall} size={160} />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Brain size={20} className="text-indigo-600" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">CAIRE AI Governance Maturity</h3>
            </div>
            {hasAiRatings ? (
              <>
                <p className={`text-2xl font-bold mt-1 ${aiLabel?.tone}`}>
                  Level {aiOverallLevel} - {aiLabel?.short}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-3 leading-relaxed">
                  {districtName}&apos;s AI governance maturity score is <strong>{aiOverall.toFixed(1)}</strong> out of 5.0,
                  based on {data.aiCategoriesRated} of {data.aiTotalCategories} CAGR category ratings across {data.aiSystemCount} registered AI system{data.aiSystemCount !== 1 ? 's' : ''}.
                </p>
              </>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                No CAIRE self-assessment data yet. Complete the AI governance assessment to show NIST AI RMF maturity across GOVERN, MAP, MEASURE, and MANAGE.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Insurance Readiness Score */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="md:w-56">
            <p className={`text-5xl font-bold ${insuranceTone}`}>
              {insuranceScore.toFixed(0)}
            </p>
            <p className={`text-sm font-semibold mt-1 ${insuranceTone}`}>
              {insuranceLabel}
            </p>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Insurance Readiness Score</h3>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mt-4">
              <div
                className={`h-full rounded-full ${insuranceBar}`}
                style={{ width: `${Math.max(0, Math.min(100, insuranceScore))}%` }}
              />
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">Function</th>
                    <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">Maturity</th>
                    <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">Weight</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {[
                    ['Govern', `${(data.governMaturity || 0).toFixed(1)} / 5`, '25%'],
                    ['Protect', `${(data.protectMaturity || 0).toFixed(1)} / 5`, '20%'],
                    ['Detect', `${(data.detectMaturity || 0).toFixed(1)} / 5`, '20%'],
                    ['Respond', `${(data.respondMaturity || 0).toFixed(1)} / 5`, '15%'],
                    ['Recover', `${(data.recoverMaturity || 0).toFixed(1)} / 5`, '10%'],
                    ['Training', `${data.trainingRate}%`, '10%'],
                  ].map(row => (
                    <tr key={row[0]}>
                      <td className="py-2 text-slate-700 dark:text-slate-300">{row[0]}</td>
                      <td className="py-2 text-slate-700 dark:text-slate-300">{row[1]}</td>
                      <td className="py-2 text-slate-500 dark:text-slate-400">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Reflects governance maturity across the NIST functions most weighted by cyber insurance underwriters. Improve your Govern, Protect, and Detect scores to advance this rating.
            </p>
          </div>
        </div>
      </div>

      {/* NIST Function Maturity Cards */}
      {data.functionMaturity && data.functionMaturity.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Cyber Maturity by NIST CSF 2.0 Function
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.functionMaturity.map(fn => {
              const c = FUNCTION_COLORS[fn.name] || FUNCTION_COLORS.Govern;
              const rounded = fn.score > 0 ? Math.min(5, Math.max(1, Math.round(fn.score))) : 0;
              const lbl = rounded > 0 ? MATURITY_LABELS[rounded] : null;
              const pct = (fn.score / 5) * 100;
              return (
                <div key={fn.name} className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 ring-1 ${c.ring}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${c.bg} ${c.text} uppercase tracking-wider`}>
                      {fn.name}
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                        {fn.score > 0 ? fn.score.toFixed(1) : '--'}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">of 5.0</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: c.bar }} />
                  </div>
                  {lbl ? (
                    <p className={`text-sm font-semibold ${lbl.tone}`}>
                      Level {rounded} - {lbl.short}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 italic">Not yet evaluated</p>
                  )}
                  <p className="mt-2 text-[10px] text-slate-400 uppercase tracking-wider">
                    {fn.rated} of {fn.total} categories rated
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* AI RMF Function Maturity Cards */}
      {data.aiFunctionMaturity && data.aiFunctionMaturity.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            AI Maturity by NIST AI RMF 1.0 Function
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {data.aiFunctionMaturity.map(fn => {
              const c = AI_FUNCTION_COLORS[fn.name] || AI_FUNCTION_COLORS.GOVERN;
              const rounded = fn.score > 0 ? Math.min(5, Math.max(1, Math.round(fn.score))) : 0;
              const lbl = rounded > 0 ? MATURITY_LABELS[rounded] : null;
              const pct = (fn.score / 5) * 100;
              return (
                <div key={fn.name} className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 ring-1 ${c.ring}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${c.bg} ${c.text} uppercase tracking-wider`}>
                      {fn.name}
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                        {fn.score > 0 ? fn.score.toFixed(1) : '--'}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">of 5.0</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: c.bar }} />
                  </div>
                  {lbl ? (
                    <p className={`text-sm font-semibold ${lbl.tone}`}>
                      Level {rounded} - {lbl.short}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 italic">Not yet evaluated</p>
                  )}
                  <p className="mt-2 text-[10px] text-slate-400 uppercase tracking-wider">
                    {fn.rated} of {fn.total} category ratings
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Priority Risks */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle size={16} className="text-red-500" />
          Top Priority Risks
        </h3>
        {data.topRisks?.length ? (
          <div className="space-y-3">
            {data.topRisks.map((risk, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/30">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">{risk.title}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Severity: <span className={risk.severity === 'Critical' ? 'text-red-500' : 'text-orange-500'}>{risk.severity}</span>
                    {' '}&middot; Status: {risk.status}
                    {risk.owner && <> &middot; Owner: {risk.owner}</>}
                  </p>
                  {risk.recommended_action && (
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Action: {risk.recommended_action}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No active risks recorded.</p>
        )}
      </div>

      {/* Progress & Trends */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
          Progress &amp; Trends
        </h3>
        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          {progressItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className={`flex-shrink-0 w-2 h-2 mt-1.5 rounded-full ${item.color}`} />
              <p>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Next Steps */}
      <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-200 dark:border-blue-800 p-6">
        <h3 className="text-sm font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-4">
          Recommended Next Steps
        </h3>
        <div className="space-y-3">
          {(data.nextSteps || []).map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <ArrowRight size={16} className="flex-shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" />
              <p className="text-sm text-slate-700 dark:text-slate-300">{step}</p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs text-center text-slate-400 dark:text-slate-500 py-4">
        Prepared by HallMonitor &bull; CyberReady K-12 Cybersecurity Platform &bull; {generatedOn}
      </p>
    </div>
  );
}
