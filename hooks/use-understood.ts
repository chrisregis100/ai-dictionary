"use client";

import { useSyncExternalStore } from "react";

import {
  parseUnderstood,
  UNDERSTOOD_EVENT,
  UNDERSTOOD_STORAGE_KEY,
} from "@/lib/progress";

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(UNDERSTOOD_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(UNDERSTOOD_EVENT, onStoreChange);
  };
}

function getSnapshot() {
  return window.localStorage.getItem(UNDERSTOOD_STORAGE_KEY) ?? "[]";
}

function getServerSnapshot() {
  return "[]";
}

export function useUnderstoodSlugs(): string[] {
  const raw = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return parseUnderstood(raw);
}
