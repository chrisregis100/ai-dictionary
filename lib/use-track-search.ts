"use client";

import { useEffect } from "react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

const SEARCH_DEBOUNCE_MS = 600;

export function useTrackSearch(query: string, resultsCount: number) {
  useEffect(() => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const timer = window.setTimeout(() => {
      trackEvent(ANALYTICS_EVENTS.search, {
        query: trimmedQuery,
        resultsCount,
      });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query, resultsCount]);
}
