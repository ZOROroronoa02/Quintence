/**
 * @file components/system/CountUp.tsx
 * @description Animated number that counts to its target on first inView.
 * Under OS reduced motion it renders the final value instantly ~ MotionConfig
 * alone does not stop value animations, so this checks useReducedMotion
 * explicitly. Always paired with tabular-nums to prevent layout jitter.
 */

"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface CountUpProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function CountUp({ value, decimals = 0, prefix = "", suffix = "", className }: CountUpProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReduced = useReducedMotion();
  const [display, setDisplay] = React.useState<string | null>(prefersReduced ? null : "0");

  const format = React.useCallback(
    (n: number) => `${prefix}${n.toFixed(decimals)}${suffix}`,
    [decimals, prefix, suffix],
  );

  React.useEffect(() => {
    if (!inView) return;
    if (prefersReduced) {
      setDisplay(null);
      return;
    }
    const controls = animate(0, value, {
      duration: DURATION.slow + 0.6,
      ease: EASE,
      onUpdate: (v) => setDisplay(format(v)),
    });
    return () => controls.stop();
  }, [inView, prefersReduced, value, format]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {display ?? format(value)}
    </span>
  );
}
