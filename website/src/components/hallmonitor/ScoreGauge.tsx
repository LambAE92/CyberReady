"use client";

type ScoreGaugeProps = {
  score: number; // 0–5 maturity scale
  size?: number;
};

const maturityLabel = (s: number) => {
  if (s >= 4.5) return "Optimized";
  if (s >= 3.5) return "Managed";
  if (s >= 2.5) return "Defined";
  if (s >= 1.5) return "Repeatable";
  return "Initial";
};

const maturityColor = (s: number) => {
  if (s >= 4.5) return "#3b82f6";
  if (s >= 3.5) return "#22c55e";
  if (s >= 2.5) return "#eab308";
  if (s >= 1.5) return "#f97316";
  return "#ef4444";
};

export default function ScoreGauge({ score, size = 140 }: ScoreGaugeProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.max(0, Math.min(100, (score / 5) * 100));
  const offset = circumference - (pct / 100) * circumference;
  const color = maturityColor(score);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-navy-900 leading-none">
            {score.toFixed(1)}
          </span>
          <span className="text-[10px] uppercase tracking-wider text-slate-400 mt-0.5">
            of 5.0
          </span>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">Portfolio Avg Maturity</p>
      <p className="text-sm font-semibold mt-0.5" style={{ color }}>
        {maturityLabel(score)}
      </p>
    </div>
  );
}
