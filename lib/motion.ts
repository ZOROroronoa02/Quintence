/**
 * @file lib/motion.ts
 * @description Centralized motion system for Quintence. Single source of truth for
 * animation variants, durations, and easing. Global reduced-motion is handled once
 * via <MotionConfig reducedMotion="user"> in the root layout ~ no per-component
 * media queries. Motion communicates state and hierarchy only.
 */

import type { Variants } from "motion/react";

/** Shared ease curve ~ snappy entry, soft landing. Used by every variant. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Standard durations (seconds). Keep all motion within this band. */
export const DURATION = {
  fast: 0.4,
  base: 0.5,
  slow: 0.6,
} as const;

/** Fade + rise. Default reveal for sections and cards. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE, delay },
  }),
};

/** Fade only. For backgrounds, textures, and non-hierarchical elements. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: DURATION.base, ease: EASE, delay },
  }),
};

/** Subtle scale-in. For dialogs, badges, and emphasis elements. */
export const scaleSubtle: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE, delay },
  }),
};

/** Stagger container ~ children using fadeUp/fadeIn inherit sequencing. */
export const staggerContainer: Variants = {
  hidden: {},
  visible: (stagger: number = 0.08) => ({
    transition: { staggerChildren: stagger, delayChildren: 0.05 },
  }),
};

/** Viewport config for scroll reveals ~ fire once, with a comfortable margin. */
export const viewportOnce = { once: true, margin: "-80px" } as const;
