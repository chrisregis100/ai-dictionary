export const UNDERSTOOD_STORAGE_KEY = "dictionnaire-ia:compris";
export const UNDERSTOOD_EVENT = "dictionnaire-ia:progress";

export function parseUnderstood(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is string => typeof item === "string");
  } catch {
    return [];
  }
}

export function toggleUnderstood(current: string[], slug: string): string[] {
  return current.includes(slug)
    ? current.filter((item) => item !== slug)
    : [...current, slug];
}

export function writeUnderstood(slugs: string[]): void {
  window.localStorage.setItem(UNDERSTOOD_STORAGE_KEY, JSON.stringify(slugs));
  window.dispatchEvent(new Event(UNDERSTOOD_EVENT));
}
