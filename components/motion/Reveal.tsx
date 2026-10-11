/**
 * @file components/motion/Reveal.tsx
 * @description Shared scroll-reveal wrapper. Fades content up on first inView using
 * the centralized ease/duration tokens from lib/motion.ts. Honors OS reduced-motion
 * globally via MotionConfig ~ renders statically when the user prefers it.
 */

"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { DURATION, EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds before the reveal starts. */
  delay?: number;
  /** Vertical rise distance in px. Keep subtle (12–24). */
  y?: number;
  as?: "div" | "section" | "span" | "li";
}

export function Reveal({ children, className, delay = 0, y = 16, as = "div" }: RevealProps) {
  const prefersReduced = useReducedMotion();
  const Tag = as as "div";

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>;
  }

  const Comp = (motion as unknown as Record<string, typeof motion.div>)[as] ?? motion.div;

  return (
    <Comp
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: DURATION.base, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}
