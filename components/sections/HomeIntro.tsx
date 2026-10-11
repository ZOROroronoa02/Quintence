/**
 * @file components/sections/HomeIntro.tsx
 * @description Minimal 4s home intro loader. Wordmark + thin progress bar,
 * once per session (sessionStorage). Skippable via button/Esc, honors
 * reduced-motion (renders nothing), locks scroll while visible. Content
 * underneath stays server-rendered for SEO ~ this is a client overlay only.
 */

"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Logo } from "@/components/brand/Logo";

const STORAGE_KEY = "quintence-intro-seen";
const TOTAL_MS = 4000;

export function HomeIntro() {
  const prefersReduced = useReducedMotion();
  const [visible, setVisible] = React.useState(false);
  const [dismissed, setDismissed] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  React.useEffect(() => {
    if (prefersReduced) return;
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {
      seen = false;
    }
    if (seen) return;
    setVisible(true);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    timerRef.current = setTimeout(() => {
      setVisible(false);
    }, TOTAL_MS);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", onKey);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [prefersReduced]);

  const handleExitComplete = React.useCallback(() => {
    setDismissed(true);
    document.body.style.overflow = "";
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* private mode ~ intro simply replays next session */
    }
  }, []);

  const skip = React.useCallback(() => setVisible(false), []);

  if (prefersReduced || dismissed) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          role="status"
          aria-label="Loading Quintence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
        >
          <div className="w-full max-w-xs space-y-8 px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex justify-center"
            >
              <Logo />
            </motion.div>

            <div
              className="h-px w-full overflow-hidden bg-border"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Page loading progress"
            >
              <motion.div
                className="h-full bg-primary"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: TOTAL_MS / 1000 - 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="flex items-center justify-between">
              <p className="mono-label text-[11px] text-muted-foreground">
                From pipeline to launch
              </p>
              <button
                type="button"
                onClick={skip}
                className="mono-label text-[11px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                Skip
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
