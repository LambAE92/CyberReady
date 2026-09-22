import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import { useAuth } from '../context/useAuth';
import assessmentDomains from '../data/cybersecurityAssessment.json';
import AdminDashboard from './AdminDashboard';
import {
  ShieldCheck, AlertTriangle, ClipboardList, ArrowRight, ChevronRight,
  Building2, UsersRound, School, Calendar, Brain,
} from 'lucide-react';

// Colors for each NIST function
const FUNCTION_COLORS = {
  Govern:   { bg: 'bg-indigo-100 dark:bg-indigo-900/30', text: 'text-indigo-700 dark:text-indigo-300', ring: 'ring-indigo-200 dark:ring-indigo-800', bar: '#6366f1' },
  Identify: { bg: 'bg-blue-100 dark:bg-blue-900/30',     text: 'text-blue-700 dark:text-blue-300',     ring: 'ring-blue-200 dark:ring-blue-800',     bar: '#3b82f6' },
  Protect:  { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-300', ring: 'ring-emerald-200 dark:ring-emerald-800', bar: '#10b981' },
  Detect:   { bg: 'bg-amber-100 dark:bg-amber-900/30',   text: 'text-amber-700 dark:text-amber-300',   ring: 'ring-amber-200 dark:ring-amber-800',   bar: '#f59e0b' },
  Respond:  { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', ring: 'ring-orange-200 dark:ring-orange-800', bar: '#f97316' },
  Recover:  { bg: 'bg-cyan-100 dark:bg-cyan-900/30',     text: 'text-cyan-700 dark:text-cyan-300',     ring: 'ring-cyan-200 dark:ring-cyan-800',     bar: '#06b6d4' },
};

const AI_FUNCTIONS = [
  {
    key: 'GOVERN',
    name: 'GOVERN',
    description: 'AI policies, accountability, stakeholder engagement, and supply chain governance.',
    bg: 'bg-indigo-100 dark:bg-indigo-900/30',
    text: 'text-indigo-700 dark:text-indigo-300',
    ring: 'ring-indigo-200 dark:ring-indigo-800',
    bar: '#4F46E5',
  },
  {
    key: 'MAP',
    name: 'MAP',
    description: 'AI context, categorization, capability assessment, third-party mapping, and impact analysis.',
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-700 dark:text-blue-300',
    ring: 'ring-blue-200 dark:ring-blue-800',
    bar: '#0369A1',
  },
  {
    key: 'MEASURE',
    name: 'MEASURE',
    description: 'Metrics, trustworthy AI evaluation, risk tracking, and measurement improvement.',
    bg: 'bg-amber-100 dark:bg-amber-900/30',
    text: 'text-amber-700 dark:text-amber-300',
    ring: 'ring-amber-200 dark:ring-amber-800',
    bar: '#D97706',
  },
  {
    key: 'MANAGE',
    name: 'MANAGE',
    description: 'AI risk response, benefit management, incident communication, and continuous improvement.',
    bg: 'bg-emerald-100 dark:bg-emerald-900/30',
    text: 'text-emerald-700 dark:text-emerald-300',
    ring: 'ring-emerald-200 dark:ring-emerald-800',
    bar: '#059669',
  },
];

const MATURITY_LABELS = [
  null,
  { key: 'INITIAL',    short: 'Initial',    tone: 'text-red-600 dark:text-red-400' },
  { key: 'REPEATABLE', short: 'Repeatable', tone: 'text-orange-600 dark:text-orange-400' },
  { key: 'DEFINED',    short: 'Defined',    tone: 'text-amber-600 dark:text-amber-400' },
  { key: 'MANAGED',    short: 'Managed',    tone: 'text-blue-600 dark:text-blue-400' },
  { key: 'OPTIMIZED',  short: 'Optimized',  tone: 'text-green-600 dark:text-green-400' },
];

// Plain-English explanation of what a maturity score means
function explainScore(avg) {
  if (avg === 0) return 'Not yet evaluated.';
  if (avg < 1.5) return 'Practices are ad hoc, reactive, or undefined. This function is at highest risk and should be the first focus of the strategic plan.';
  if (avg < 2.5) return 'Foundations are emerging but practices are inconsistent. Formalize processes, document responsibilities, and shift from reactive to proactive.';
  if (avg < 3.5) return 'Core processes are defined and documented. Next priority is making them measurable and routinely enforced across the district.';
  if (avg < 4.5) return 'Processes are actively managed with metrics and oversight. Focus on continuous improvement, optimization, and cross-functional integration.';
  return 'Practices are optimized, embedded in culture, and continuously improved. Maintain by sharing lessons learned and benchmarking across the sector.';
}

function categoryKey(fn, cat) {
  return `${fn}::${cat}`;
}

// Build priority-ranked roadmap from low-scoring categories
function buildRoadmap(ratings) {
  const items = [];
  assessmentDomains.forEach(domain => {
    domain.categories.forEach(cat => {
      const rating = ratings[categoryKey(domain.title, cat.name)];
      if (!rating || rating < 3) {
        const level = rating || 1;
        const nextLevelText = cat.levels.find(l => l.level === level + 1);
        items.push({
          function: domain.title,
          category: cat.name,
          currentLevel: level,
          rated: !!rating,
          nextAction: nextLevelText
            ? nextLevelText.description.replace(/^Meets [A-Z]+ Maturity Level\s*AND\s*/i, '').split('.')[0] + '.'
            : 'Advance to the next maturity level.',
          priority: (rating || 1) === 1 ? 'Critical'
                   : (rating || 1) === 2 ? 'High' : 'Medium',
        });
      }
    });
  });
  // Sort by priority (lower current level first)
  items.sort((a, b) => a.currentLevel - b.currentLevel);

  // Bucket into quarters: 3 critical in Q1, next 3 High in Q2, etc.
  const quarters = [
    { label: 'Q1, Months 1-3',   items: [], focus: 'Stabilize the foundation' },
    { label: 'Q2, Months 4-6',   items: [], focus: 'Formalize and document' },
    { label: 'Q3, Months 7-9',   items: [], focus: 'Measure and enforce' },
    { label: 'Q4, Months 10-12', items: [], focus: 'Optimize and review' },
  ];
  items.forEach((it, i) => quarters[Math.min(3, Math.floor(i / 3))].items.push(it));
  return { items, quarters };
}

function ScoreRing({ score, size = 140, color = '#3b82f6' }) {
  const pct = (score / 5) * 100;
  const r = size / 2 - 10;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="10"
              className="stroke-slate-200 dark:stroke-slate-700" />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="10"
              stroke={color} strokeLinecap="round"
              strokeDasharray={c} strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 0.6s ease' }} />
    </svg>
  );
}

export default function Dashboard() {
  const { user, activeDistrict } = useAuth();
  const inAdminOverview = user?.role === 'platform_admin' && !activeDistrict;
  const [district, setDistrict] = useState(activeDistrict || null);
  const [assessment, setAssessment] = useState(null);
  const [aiGov, setAiGov] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (inAdminOverview) { setLoading(false); return; }
    api.district().then(setDistrict).catch(() => {});
    api.aiGovernanceSummary()
      .then(setAiGov)
      .catch(() => {});
    api.selfAssessment()
      .then(sa => setAssessment(sa || { ratings: {}, notes: {}, status: 'draft' }))
      .catch(() => setAssessment({ ratings: {}, notes: {}, status: 'draft' }))
      .finally(() => setLoading(false));
  }, [inAdminOverview]);

  // Platform admin in overview mode → show aggregate cross-district dashboard
  const { overallScore, functionScores, totalRated, totalCategories } = useMemo(() => {
    if (!assessment) return { overallScore: 0, functionScores: [], totalRated: 0, totalCategories: 0 };
    const ratings = assessment.ratings || {};
    const fnScores = assessmentDomains.map(domain => {
      const values = domain.categories
        .map(c => ratings[categoryKey(domain.title, c.name)])
        .filter(v => v);
      const avg = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      return {
        name: domain.title,
        score: avg,
        rated: values.length,
        total: domain.categories.length,
        overview: domain.overview || [],
      };
    });
    const allRated = fnScores.reduce((s, f) => s + f.rated, 0);
    const allTotal = fnScores.reduce((s, f) => s + f.total, 0);
    const ratedFunctions = fnScores.filter(f => f.rated > 0);
    const overall = allRated
      ? ratedFunctions.reduce((s, f) => s + f.score, 0) / ratedFunctions.length
      : 0;
    return { overallScore: overall, functionScores: fnScores, totalRated: allRated, totalCategories: allTotal };
  }, [assessment]);

  const roadmap = useMemo(() => buildRoadmap(assessment?.ratings || {}), [assessment]);

  // Platform admin in overview mode shows the aggregate cross-district dashboard.
  if (inAdminOverview) {
    return <AdminDashboard />;
  }

  if (loading) {
    return <div className="flex items-center justify-center h-64 text-slate-500">Loading evaluation data…</div>;
  }

  const hasAnyRating = totalRated > 0;
  const overallLabel = MATURITY_LABELS[Math.round(overallScore)] || MATURITY_LABELS[1];
  const aiOverallScore = aiGov?.overallAvgMaturity ?? 0;
  const hasAiMaturity = aiGov?.overallAvgMaturity != null;
  const aiOverallLabel = MATURITY_LABELS[Math.round(aiOverallScore)] || MATURITY_LABELS[1];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{district?.name || 'Dashboard'}</h2>
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
          {district?.school_count != null && (
            <span className="flex items-center gap-1.5"><School size={14} />{district.school_count} schools</span>
          )}
          {district?.student_count != null && (
            <span className="flex items-center gap-1.5"><UsersRound size={14} />{district.student_count.toLocaleString()} students</span>
          )}
          {district?.staff_count != null && (
            <span className="flex items-center gap-1.5"><Building2 size={14} />{district.staff_count} staff</span>
          )}
          {district?.fiscal_year && (
            <span className="flex items-center gap-1.5"><Calendar size={14} />FY {district.fiscal_year}</span>
          )}
        </div>
      </div>

      {!hasAnyRating && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-xl p-5 flex items-start gap-4">
          <ClipboardList size={24} className="flex-shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">No evaluation data yet</p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Complete the Self-Assessment to see your district's maturity scores across the six NIST functions and generate a 12-month improvement roadmap.
            </p>
          </div>
          <Link to="/self-assessment"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            Start Evaluation <ArrowRight size={14} />
          </Link>
        </div>
      )}

      {/* Overall Maturity + Coverage */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            Cyber Maturity Score
          </h3>
          <div className="relative">
            <ScoreRing score={overallScore} size={160} color={overallScore >= 3.5 ? '#10b981' : overallScore >= 2.5 ? '#3b82f6' : overallScore >= 1.5 ? '#f59e0b' : '#ef4444'} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900 dark:text-white">{overallScore.toFixed(1)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">out of 5.0</p>
            </div>
          </div>
          {hasAnyRating && (
            <p className={`mt-4 text-sm font-semibold ${overallLabel.tone}`}>
              Level {Math.round(overallScore)} - {overallLabel.short}
            </p>
          )}
          <p className="mt-1 text-xs text-slate-400">{totalRated} of {totalCategories} categories rated</p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6 flex flex-col items-center">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
            AI Maturity Score
          </h3>
          <div className="relative">
            <ScoreRing score={aiOverallScore} size={160} color={aiOverallScore >= 3.5 ? '#10b981' : aiOverallScore >= 2.5 ? '#3b82f6' : aiOverallScore >= 1.5 ? '#f59e0b' : '#ef4444'} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-slate-900 dark:text-white">{aiOverallScore.toFixed(1)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">out of 5.0</p>
            </div>
          </div>
          {hasAiMaturity ? (
            <p className={`mt-4 text-sm font-semibold ${aiOverallLabel.tone}`}>
              Level {Math.round(aiOverallScore)} - {aiOverallLabel.short}
            </p>
          ) : (
            <p className="mt-4 text-sm font-semibold text-slate-400">Not Assessed</p>
          )}
          <p className="mt-1 text-xs text-slate-400">
            {aiGov?.assessedCategories || 0} of {aiGov?.totalAssessableCategories || 0} AI categories rated
          </p>
        </div>

        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            What These Scores Mean
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Cyber maturity reflects the CCRE-aligned cybersecurity-governance self-assessment. AI maturity reflects CAIRE self-assessment ratings using the CAGR rubric.
            {' '}{explainScore(overallScore)}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map(lvl => {
              const m = MATURITY_LABELS[lvl];
              const isCurrent = hasAnyRating && Math.round(overallScore) === lvl;
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
      </div>

      {/* 6 NIST Function Breakdown */}
      <div>
        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
          Maturity Across the Six NIST Functions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {functionScores.map(fn => {
            const c = FUNCTION_COLORS[fn.name] || FUNCTION_COLORS.Govern;
            const rounded = Math.round(fn.score);
            const label = MATURITY_LABELS[rounded] || MATURITY_LABELS[1];
            const pct = (fn.score / 5) * 100;
            return (
              <div key={fn.name} className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 ring-1 ${c.ring}`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-bold px-2 py-1 rounded ${c.bg} ${c.text} uppercase tracking-wider`}>
                    {fn.name}
                  </span>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">{fn.score.toFixed(1)}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider">of 5.0</p>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-3">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: c.bar }} />
                </div>
                {fn.rated > 0 ? (
                  <>
                    <p className={`text-sm font-semibold ${label.tone} mb-1`}>
                      Level {rounded} - {label.short}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {fn.overview[rounded - 1] || explainScore(fn.score)}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-slate-400 italic">Not yet evaluated</p>
                )}
                <p className="mt-3 text-[10px] text-slate-400 uppercase tracking-wider">
                  {fn.rated} of {fn.total} categories rated
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4 NIST AI RMF Function Breakdown */}
      {aiGov && (
        <div>
          <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
            Maturity Across the Four NIST AI RMF 1.0 Functions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            {AI_FUNCTIONS.map(fn => {
              const score = aiGov.functionScores?.[fn.key] ?? 0;
              const rounded = score > 0 ? Math.min(5, Math.max(1, Math.round(score))) : 0;
              const label = rounded > 0 ? MATURITY_LABELS[rounded] : null;
              const pct = (score / 5) * 100;
              return (
                <div key={fn.key} className={`bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-5 ring-1 ${fn.ring}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-xs font-bold px-2 py-1 rounded ${fn.bg} ${fn.text} uppercase tracking-wider`}>
                      {fn.name}
                    </span>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900 dark:text-white leading-none">
                        {score > 0 ? score.toFixed(1) : '--'}
                      </p>
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider">of 5.0</p>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: fn.bar }} />
                  </div>
                  {label ? (
                    <p className={`text-sm font-semibold ${label.tone} mb-1`}>
                      Level {rounded} - {label.short}
                    </p>
                  ) : (
                    <p className="text-sm text-slate-400 italic mb-1">Not yet evaluated</p>
                  )}
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {fn.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 12-Month Strategic Roadmap */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              12-Month Strategic Roadmap
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Priority-first improvement plan based on the lowest-rated categories in your evaluation.
            </p>
          </div>
          <Link to="/self-assessment"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700">
            Update Evaluation <ChevronRight size={14} />
          </Link>
        </div>

        {roadmap.items.length === 0 ? (
          <div className="bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-8 text-center">
            <ShieldCheck size={36} className="mx-auto text-green-600 dark:text-green-400 mb-3" />
            <p className="text-lg font-semibold text-green-900 dark:text-green-200">All categories at Level 3 (Defined) or above</p>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              Focus on optimization and continuous improvement to advance toward Level 5.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {roadmap.quarters.filter(q => q.items.length).map((q, qi) => (
              <div key={qi} className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{q.label}</p>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{q.items.length} action{q.items.length !== 1 ? 's' : ''}</span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{q.focus}</p>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {q.items.map((it, i) => {
                    const c = FUNCTION_COLORS[it.function] || FUNCTION_COLORS.Govern;
                    const prioColor = it.priority === 'Critical'
                      ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      : it.priority === 'High'
                      ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                      : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
                    return (
                      <div key={i} className="px-5 py-3">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${c.bg} ${c.text} uppercase`}>
                            {it.function}
                          </span>
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${prioColor} uppercase`}>
                            {it.priority}
                          </span>
                          <span className="text-[10px] text-slate-400 uppercase">
                            L{it.currentLevel} → L{it.currentLevel + 1}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white leading-tight">
                          {it.category}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                          {it.nextAction}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {aiGov && (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain size={20} className="text-indigo-600" />
            <h3 className="font-semibold text-slate-900 dark:text-white">AI Governance Posture</h3>
          </div>

          {aiGov.systemCount === 0 ? (
            <div className="text-sm text-slate-500 dark:text-slate-400">
              <p>No AI systems registered.</p>
              <a href="/ai-governance" className="text-indigo-600 hover:underline mt-1 inline-block">
                Register AI systems to assess governance posture
              </a>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {aiGov.systemCount} AI system
                  {aiGov.systemCount !== 1 ? 's' : ''} registered
                </span>
                {aiGov.overallAvgMaturity && (
                  <span className="font-bold text-lg"
                    style={{color: aiGov.overallAvgMaturity >= 4
                      ? '#16a34a' : aiGov.overallAvgMaturity >= 3
                      ? '#2563eb' : aiGov.overallAvgMaturity >= 2
                      ? '#d97706' : '#dc2626'}}>
                    {aiGov.overallAvgMaturity.toFixed(1)} / 5.0
                  </span>
                )}
              </div>
              <div className="flex gap-2 flex-wrap">
                {['GOVERN','MAP','MEASURE','MANAGE'].map(fn => (
                  <span key={fn}
                    className="text-xs px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                    {fn}: {aiGov.functionScores[fn]
                      ? aiGov.functionScores[fn].toFixed(1)
                      : '--'}
                  </span>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Categories Assessed
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {aiGov.categoriesAssessedPct?.toFixed
                      ? aiGov.categoriesAssessedPct.toFixed(1)
                      : aiGov.categoriesAssessedPct ?? 0}%
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {aiGov.assessedCategories || 0} of {aiGov.totalAssessableCategories || 0}
                  </p>
                </div>
                <div className="rounded-lg bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    CAIRE Validated
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                    {aiGov.categoriesValidatedPct == null ? '--' : `${aiGov.categoriesValidatedPct.toFixed(1)}%`}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Evidence validation not started
                  </p>
                </div>
              </div>
              {aiGov.systemsNeedingAttention?.length > 0 && (
                <div className="text-xs text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span>
                    {aiGov.systemsNeedingAttention.length}
                    {' '}system
                    {aiGov.systemsNeedingAttention.length !== 1
                      ? 's' : ''} require governance attention
                  </span>
                </div>
              )}
              <a href="/ai-governance" className="text-sm text-indigo-600 hover:underline block">
                View AI Governance
              </a>
            </div>
          )}
        </div>
      )}

      {/* Footnote */}
      {hasAnyRating && (
        <div className="flex items-start gap-2 text-xs text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700">
          <AlertTriangle size={12} className="flex-shrink-0 mt-0.5" />
          <p>
            This dashboard reflects maturity scores from CCRE-aligned cybersecurity-governance and CAIRE AI-governance self-assessments.
            The roadmap is a prioritized recommendation. Treat it as a starting point and adapt to your district's
            context, budget, and readiness.
          </p>
        </div>
      )}
    </div>
  );
}
