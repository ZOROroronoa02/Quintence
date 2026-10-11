/**
 * @file components/system/StatusDot.tsx
 * @description Status indicator: pulsing signal dot + mono label (e.g. live / warning).
 * The pulse is the system's single permitted ambient loop and respects
 * prefers-reduced-motion via CSS.
 */

import { cn } from "@/lib/utils";

type StatusTone = "live" | "warning" | "error" | "idle";

const toneDot: Record<StatusTone, string> = {
  live: "bg-success",
  warning: "bg-warning",
  error: "bg-destructive",
  idle: "bg-muted-foreground",
};

interface StatusDotProps {
  label: string;
  tone?: StatusTone;
  className?: string;
  pulse?: boolean;
}

export function StatusDot({ label, tone = "live", className, pulse = true }: StatusDotProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn("h-2 w-2 rounded-full", toneDot[tone], pulse && tone === "live" && "status-pulse")}
      />
      <span className="mono-label text-[11px] text-foreground">{label}</span>
    </span>
  );
}
