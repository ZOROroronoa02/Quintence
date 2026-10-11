/**
 * @file components/theme/ThemeToggle.tsx
 * @description Accessible light/dark toggle. Icon-only ghost button matching
 * the header/mobile-nav density. Announces the action, not the state.
 */

"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className={cn("shrink-0 text-muted-foreground hover:text-foreground", className)}
    >
      <Sun
        aria-hidden="true"
        className="h-[1.15rem] w-[1.15rem] rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0"
      />
      <Moon
        aria-hidden="true"
        className="absolute h-[1.15rem] w-[1.15rem] rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
