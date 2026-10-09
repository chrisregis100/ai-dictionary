"use client";

import { Moon, Sun } from "@deemlol/next-icons";
import { useCallback, useSyncExternalStore } from "react";

import { applyTheme, resolveTheme, type ThemePreference } from "@/lib/theme";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("theme-change", onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener("theme-change", onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getThemeSnapshot(): ThemePreference {
  return resolveTheme();
}

function getServerSnapshot(): ThemePreference {
  return "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    getThemeSnapshot,
    getServerSnapshot,
  );

  const handleClick = useCallback(() => {
    applyTheme(theme === "dark" ? "light" : "dark");
    window.dispatchEvent(new Event("theme-change"));
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex size-10 items-center justify-center rounded-full text-ink ring-1 ring-line transition-colors hover:bg-paper-sand hover:text-clay focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
      aria-label={isDark ? "Passer au thème papier" : "Passer au thème encre de nuit"}
      aria-pressed={isDark}
    >
      {isDark ? (
        <Sun size={18} strokeWidth={1.75} aria-hidden />
      ) : (
        <Moon size={18} strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
