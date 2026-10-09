"use client";

import { useUnderstoodSlugs } from "@/hooks/use-understood";

interface ProgressMeterProps {
  total: number;
}

export function ProgressMeter({ total }: ProgressMeterProps) {
  const count = useUnderstoodSlugs().length;
  const percent = total === 0 ? 0 : Math.round((count / total) * 100);

  return (
    <div className="paper-card rounded-2xl bg-paper-sand p-4">
      <p className="text-sm text-muted">
        <span className="font-semibold text-ink">{count}</span>
        {count === 1 ? " notion comprise" : " notions comprises"} sur {total}
      </p>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-line"
        role="meter"
        aria-label="Progression du parcours"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={count}
      >
        <div
          className="h-full rounded-full bg-sage"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
