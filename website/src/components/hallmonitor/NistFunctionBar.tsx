"use client";

import { NIST_FUNCTIONS } from "@/lib/constants";

// Representative per-function maturity scores (1–5 scale)
const scores = [
  { function: "Govern",   level: 3.2 },
  { function: "Identify", level: 2.8 },
  { function: "Protect",  level: 3.5 },
  { function: "Detect",   level: 2.4 },
  { function: "Respond",  level: 2.1 },
  { function: "Recover",  level: 2.6 },
];

const levelName = (l: number) => {
  const n = Math.round(l);
  return ["", "Initial", "Repeatable", "Defined", "Managed", "Optimized"][n] ?? "N/A";
};

export default function NistFunctionBar() {
  return (
    <div className="space-y-2.5">
      {scores.map((item) => {
        const nist = NIST_FUNCTIONS.find((f) => f.name === item.function);
        const pct = (item.level / 5) * 100;
        return (
          <div key={item.function} className="flex items-center gap-3">
            <span className="text-xs font-medium text-slate-600 w-16 shrink-0">
              {item.function}
            </span>
            <div className="flex-1 h-5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full flex items-center justify-end pr-1.5 transition-all duration-1000 ease-out"
                style={{
                  width: `${pct}%`,
                  backgroundColor: nist?.color ?? "#3b82f6",
                  minWidth: "1.5rem",
                }}
              />
            </div>
            <span className="text-[11px] font-semibold text-slate-600 w-20 shrink-0">
              L{Math.round(item.level)} · {levelName(item.level)}
            </span>
          </div>
        );
      })}
      <div className="flex justify-between pt-1 text-[10px] text-slate-400 border-t border-slate-100">
        <span>L1 Initial</span>
        <span>L3 Defined</span>
        <span>L5 Optimized</span>
      </div>
    </div>
  );
}
