export interface UmamiEventData {
  [key: string]: string | number | boolean;
}

interface UmamiClient {
  track: (eventName: string, data?: UmamiEventData) => void;
}

declare global {
  interface Window {
    umami?: UmamiClient;
  }
}

export const ANALYTICS_EVENTS = {
  search: "search",
  termClick: "term_click",
  filterApply: "filter_apply",
  outboundClick: "outbound_click",
  ctaClick: "cta_click",
} as const;

export function trackEvent(name: string, data?: UmamiEventData): void {
  if (typeof window === "undefined") return;

  const track = window.umami?.track;
  if (typeof track !== "function") return;

  try {
    if (data) {
      track(name, data);
      return;
    }
    track(name);
  } catch {
    return;
  }
}
