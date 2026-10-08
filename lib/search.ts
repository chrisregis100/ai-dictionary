export interface SearchableEntry {
  term: string;
  slug: string;
  description: string;
}

export function filterEntries<T extends SearchableEntry>(
  entries: T[],
  query: string,
): T[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return entries;

  return entries.filter((entry) => {
    const haystack = `${entry.term} ${entry.slug} ${entry.description}`.toLowerCase();
    return haystack.includes(needle);
  });
}
