/**
 * @file components/system/Sparkline.tsx
 * @description Decorative SVG tick/line motif for data texture. Purely presentational
 * (aria-hidden) ~ never a substitute for real charted data.
 */

import { cn } from "@/lib/utils";

interface SparklineProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Sparkline({ className, width = 120, height = 28 }: SparklineProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      aria-hidden="true"
      className={cn("text-primary", className)}
    >
      <polyline
        points={`0,${height - 4} ${width * 0.18},${height - 8} ${width * 0.34},${height * 0.55} ${width * 0.5},${height * 0.62} ${width * 0.64},${height * 0.3} ${width * 0.8},${height * 0.38} ${width},6`}
        stroke="currentColor"
        strokeOpacity="0.7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={width} cy="6" r="2.5" fill="currentColor" />
    </svg>
  );
}
