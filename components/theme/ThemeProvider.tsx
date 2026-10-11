/**
 * @file components/theme/ThemeProvider.tsx
 * @description Lightweight class-based theme provider (no dependency).
 * Dark is the brand default; choice persists in localStorage under
 * `quintence-theme`. An inline head script in app/layout.tsx sets the class
 * pre-paint to avoid FOUC ~ this provider syncs React state after mount.
 */

"use client";

import * as React from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "quintence-theme";

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

const ThemeContext = React.createContext<ThemeContextValue>({
  theme: "dark",
  setTheme: () => { },
  toggle: () => { },
});

function getStoredTheme(): Theme | null {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "light" || stored === "dark" ? stored : null;
  } catch {
    return null;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("dark");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const stored = getStoredTheme();
    const initial =
      stored ?? (document.documentElement.classList.contains("light") ? "light" : "dark");
    setThemeState(initial);
    setMounted(true);
  }, []);

  const setTheme = React.useCallback((next: Theme) => {
    setThemeState(next);
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    root.style.colorScheme = next;
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable ~ theme still applies for the session */
    }
  }, []);

  const toggle = React.useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Avoid rendering theme-dependent UI until mounted to prevent
  // hydration mismatch (server renders dark-first fallback).
  void mounted;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  return React.useContext(ThemeContext);
}
