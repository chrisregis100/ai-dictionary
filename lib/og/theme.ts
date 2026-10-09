export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_CONTENT_TYPE = "image/png";

/** Light-theme tokens from `app/globals.css` `:root` — hex only, no invented colors. */
export const ogColors = {
  paper: "#f4efe6",
  paperSand: "#ede6d6",
  paperKraft: "#e4d5c0",
  card: "#fffdf8",
  ink: "#1c1712",
  muted: "#5c554c",
  line: "#d9cebb",
  clay: "#c4512c",
  clayDeep: "#8a3114",
  onClay: "#fffdf8",
  sage: "#5c6b4a",
} as const;

export const ogType = {
  siteTitle: 72,
  siteDescription: 32,
  sectionLabel: 22,
  sourceTerm: 28,
  description: 30,
  footer: 22,
  kicker: 18,
} as const;

export function termFontSize(term: string): number {
  const length = term.length;
  if (length <= 8) return 104;
  if (length <= 14) return 88;
  if (length <= 20) return 72;
  return 58;
}
