export const OG_SIZE = {
  width: 1200,
  height: 630,
} as const;

export const OG_CONTENT_TYPE = "image/png";

/** Dark-first tokens from `app/globals.css` `.dark` — hex only. */
export const ogColors = {
  background: "#050505",
  foreground: "#fafafa",
  muted: "#a1a1aa",
  card: "#0d0d10",
  border: "#26262c",
  accent: "#ff6600",
  accentForeground: "#050505",
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
