/**
 * @file components/system/Stat.tsx
 * @description Metric display: tabular-nums value + mono label + optional description.
 * Numbers always use tabular figures so telemetry columns never jitter.
 */

import * as React from "react";
import { cn } from "@/lib/utils";

interface StatProps {
  /** Accepts a node so animated values (e.g. CountUp) can render inline. */
  value: React.ReactNode;
  label: string;
  description?: string;
  className?: string;
}

export function Stat({ value, label, description, className }: StatProps) {
  return (
    <div className={cn("flex flex-col gap-1.5 border-l border-border pl-4 lg:pl-6", className)}>
      <div className="font-heading text-3xl font-bold tabular-nums tracking-tight text-primary sm:text-4xl">
        {value}
      </div>
      <div className="text-sm font-semibold tracking-wide text-foreground">{label}</div>
      {description && (
        <div className="mono-label pt-0.5 text-[11px] normal-case tracking-normal text-muted-foreground">
          {description}
        </div>
      )}
    </div>
  );
}
