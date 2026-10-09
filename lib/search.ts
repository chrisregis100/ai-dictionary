export interface SearchableEntry {
  term: string;
  slug: string;
  description: string;
}

export function foldDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function filterEntries<T extends SearchableEntry>(
  entries: T[],
  query: string,
): T[] {
  const needle = foldDiacritics(query.trim());
  if (!needle) return entries;

  return entries.filter((entry) => {
    const haystack = foldDiacritics(
      `${entry.term} ${entry.slug} ${entry.description}`,
    );
    return haystack.includes(needle);
  });
}
