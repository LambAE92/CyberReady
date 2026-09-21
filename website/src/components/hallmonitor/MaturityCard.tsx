"use client";

import { MATURITY_LEVELS } from "@/lib/constants";

type MaturityCardProps = {
  currentLevel?: number;
};

export default function MaturityCard({ currentLevel = 3 }: MaturityCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1">
        <h4 className="text-sm font-semibold text-slate-700">
          Maturity Level
        </h4>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full text-white"
          style={{
            backgroundColor:
              MATURITY_LEVELS[currentLevel - 1]?.color ?? "#eab308",
          }}
        >
          Level {currentLevel} &mdash;{" "}
          {MATURITY_LEVELS[currentLevel - 1]?.name}
        </span>
      </div>
      <div className="flex gap-1.5">
        {MATURITY_LEVELS.map((level) => (
          <div
            key={level.level}
            className="flex-1 h-2.5 rounded-full transition-all"
            style={{
              backgroundColor:
                level.level <= currentLevel ? level.color : "#e2e8f0",
            }}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-slate-400">
        <span>Initial</span>
        <span>Optimized</span>
      </div>
    </div>
  );
}
