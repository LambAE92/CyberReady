"use client";

// Mock data, mirrors what Hall Monitor shows for a school district.

const DISTRICT_NAME = "Walkerville School District";
const OVERALL_SCORE = 1.7;
const OVERALL_LEVEL = 2;
const AI_SCORE = 1.6;
const AI_LEVEL = 2;
const CATEGORIES_RATED = 22;
const TOTAL_CATEGORIES = 22;
const AI_CATEGORIES_RATED = 9;
const AI_TOTAL_CATEGORIES = 38;

// Per-function scores with the exact colors used in the Hall Monitor app
const NIST_SCORES = [
  { name: "Govern",   score: 2.0, level: 2, levelName: "Repeatable", barColor: "#6366f1", bg: "bg-indigo-50", badge: "text-indigo-700" },
  { name: "Identify", score: 1.7, level: 2, levelName: "Repeatable", barColor: "#3b82f6", bg: "bg-blue-50",   badge: "text-blue-700"   },
  { name: "Protect",  score: 2.0, level: 2, levelName: "Repeatable", barColor: "#10b981", bg: "bg-emerald-50",badge: "text-emerald-700" },
  { name: "Detect",   score: 1.5, level: 2, levelName: "Repeatable", barColor: "#f59e0b", bg: "bg-amber-50",  badge: "text-amber-700"  },
  { name: "Respond",  score: 1.5, level: 2, levelName: "Repeatable", barColor: "#f97316", bg: "bg-orange-50", badge: "text-orange-700" },
  { name: "Recover",  score: 1.5, level: 2, levelName: "Repeatable", barColor: "#06b6d4", bg: "bg-cyan-50",   badge: "text-cyan-700"   },
];

const AI_RMF_SCORES = [
  { name: "GOVERN",  score: 1.3, level: 1, levelName: "Initial",    barColor: "#4F46E5", bg: "bg-indigo-50", badge: "text-indigo-700" },
  { name: "MAP",     score: 1.5, level: 2, levelName: "Repeatable", barColor: "#0369A1", bg: "bg-blue-50",   badge: "text-blue-700" },
  { name: "MEASURE", score: 0,   level: 0, levelName: "Not Rated",  barColor: "#D97706", bg: "bg-amber-50",  badge: "text-amber-700" },
  { name: "MANAGE",  score: 0,   level: 0, levelName: "Not Rated",  barColor: "#059669", bg: "bg-emerald-50",badge: "text-emerald-700" },
];

const MATURITY_SCALE = [
  { level: 1, short: "Initial"    },
  { level: 2, short: "Repeatable" },
  { level: 3, short: "Defined"    },
  { level: 4, short: "Managed"    },
  { level: 5, short: "Optimized"  },
];

const ROADMAP_ITEMS = [
  { fn: "Respond",  fnColor: "bg-orange-50 text-orange-700", priority: "bg-red-50 text-red-700",    label: "Critical", action: "Establish and document a formal incident response plan with assigned roles." },
  { fn: "Detect",   fnColor: "bg-amber-50 text-amber-700",   priority: "bg-orange-50 text-orange-700", label: "High",  action: "Implement continuous monitoring and anomaly detection procedures." },
];

// Inline ScoreRing, exact replica of the Hall Monitor component.

function ScoreRing({ score, size = 140 }: { score: number; size?: number }) {
  const r = size / 2 - 9;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));
  const offset = c - (pct / 100) * c;
  const color =
    pct >= 80 ? "#10b981" :
    pct >= 60 ? "#2563eb" :
    pct >= 30 ? "#f59e0b" :
               "#dc2626";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="9" stroke="#e2e8f0" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none" strokeWidth="9"
          stroke={color} strokeLinecap="round"
          strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 0.7s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-navy-900 leading-none">{score.toFixed(1)}</span>
        <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">out of 5.0</span>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DashboardPreview() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden">

      {/* Mock browser chrome */}
      <div className="bg-navy-900 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
          </div>
          <span className="ml-3 text-xs font-medium text-slate-300">
            Hall Monitor: {DISTRICT_NAME}
          </span>
        </div>
        <span className="text-[10px] text-slate-500 hidden sm:block">
          CCRE {CATEGORIES_RATED} / {TOTAL_CATEGORIES}, AI {AI_CATEGORIES_RATED} / {AI_TOTAL_CATEGORIES}
        </span>
      </div>

      <div className="p-5 space-y-5">

        {/* ── Row 1: Maturity ring + context panel + L1–L5 scale ── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">

          {/* Rings */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center justify-center py-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                Cyber Maturity
              </p>
              <ScoreRing score={OVERALL_SCORE} size={124} />
              <p className="mt-3 text-sm font-semibold text-orange-600">
                Level {OVERALL_LEVEL} - Repeatable
              </p>
            </div>
            <div className="flex flex-col items-center justify-center py-3">
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                AI Maturity
              </p>
              <ScoreRing score={AI_SCORE} size={124} />
              <p className="mt-3 text-sm font-semibold text-orange-600">
                Level {AI_LEVEL} - Repeatable
              </p>
            </div>
          </div>

          {/* Context + scale */}
          <div className="lg:col-span-2 bg-slate-50 rounded-xl p-4 flex flex-col justify-between gap-4">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                What This Score Means
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Walkerville shows emerging cybersecurity and AI governance foundations.
                The next priority is documenting ownership, evidence, and repeatable processes.
              </p>
            </div>
            {/* L1–L5 level strip */}
            <div className="grid grid-cols-5 gap-1.5">
              {MATURITY_SCALE.map(({ level, short }) => (
                <div
                  key={level}
                  className={`text-center py-2 rounded-lg text-[10px] font-medium transition-colors ${
                    level === OVERALL_LEVEL
                      ? "bg-slate-900 text-white"
                      : "bg-white border border-slate-200 text-slate-400"
                  }`}
                >
                  <div className="text-xs font-bold mb-0.5">L{level}</div>
                  <div className="leading-tight">{short}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Six NIST function cards ── */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
            NIST CSF 2.0 Function Maturity
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {NIST_SCORES.map((fn) => {
              const pct = (fn.score / 5) * 100;
              return (
                <div key={fn.name} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${fn.bg} ${fn.badge}`}>
                      {fn.name}
                    </span>
                    <span className="text-base font-bold text-navy-900 leading-none">{fn.score.toFixed(1)}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: fn.barColor }}
                    />
                  </div>
                  <p className={`text-[11px] font-semibold mt-1.5 ${fn.badge}`}>
                    L{fn.level} {fn.levelName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Row 3: Q1 roadmap preview ── */}
        <div>
          <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
            NIST AI RMF 1.0 Function Maturity
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {AI_RMF_SCORES.map((fn) => {
              const pct = (fn.score / 5) * 100;
              return (
                <div key={fn.name} className="bg-white rounded-xl border border-slate-100 shadow-sm p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${fn.bg} ${fn.badge}`}>
                      {fn.name}
                    </span>
                    <span className="text-base font-bold text-navy-900 leading-none">{fn.score > 0 ? fn.score.toFixed(1) : "--"}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: fn.barColor }}
                    />
                  </div>
                  <p className={`text-[11px] font-semibold mt-1.5 ${fn.badge}`}>
                    {fn.level > 0 ? `L${fn.level} ${fn.levelName}` : fn.levelName}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
              Q1 Improvement Roadmap
            </p>
            <span className="text-[10px] text-slate-400">Months 1-3, stabilize the foundation</span>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white divide-y divide-slate-100 overflow-hidden">
            {ROADMAP_ITEMS.map((item, i) => (
              <div key={i} className="px-4 py-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${item.fnColor}`}>{item.fn}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${item.priority}`}>{item.label}</span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{item.action}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
