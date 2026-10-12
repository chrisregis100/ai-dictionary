"use client";

import { Search } from "@deemlol/next-icons";
import { parseAsString, useQueryState } from "nuqs";

import { TermLink } from "@/components/analytics/term-link";
import { Input } from "@/components/ui/input";
import type { SearchEntry } from "@/lib/dictionary";
import { grammarLabel } from "@/lib/lemma";
import { filterEntries } from "@/lib/search";
import { useTrackSearch } from "@/lib/use-track-search";

interface SearchScreenProps {
  entries: SearchEntry[];
}

export function SearchScreen({ entries }: SearchScreenProps) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ history: "replace" }),
  );
  const results = filterEntries(entries, query);
  useTrackSearch(query, results.length);

  const handleChange = (value: string) => {
    void setQuery(value === "" ? null : value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Index
        </p>
        <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground">
          Recherche
        </h1>
        <p className="max-w-prose text-muted-foreground text-pretty">
          Le terme anglais, le slug ou un mot de la description. L&apos;adresse
          garde la requête, tu peux la partager.
        </p>
      </div>
      <form role="search" onSubmit={(event) => event.preventDefault()} className="relative">
        <label className="sr-only" htmlFor="recherche-notion">
          Rechercher une notion
        </label>
        <Search
          size={18}
          strokeWidth={1.75}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <Input
          id="recherche-notion"
          role="searchbox"
          aria-label="Rechercher une notion"
          value={query}
          placeholder="Token, cache, effort…"
          onChange={(event) => handleChange(event.target.value)}
          className="h-11 pl-11"
        />
      </form>
      <p className="text-sm text-muted-foreground">
        {results.length}{" "}
        {results.length === 1 ? "notion" : "notions"}
      </p>
      <ul className="space-y-3">
        {results.map((entry) => (
          <li
            key={entry.slug}
            className="relative rounded-xl border border-border bg-card px-4 py-4 transition-colors hover:bg-surface"
          >
            <span className="text-xs font-medium tracking-wide text-muted-foreground">
              {entry.sectionTitle}
              <span className="ml-2 font-mono">{grammarLabel(entry.term)}</span>
            </span>
            <TermLink
              term={entry.term}
              slug={entry.slug}
              className="mt-1 block text-xl font-semibold tracking-tight after:absolute after:inset-0"
            >
              {entry.term}
            </TermLink>
            <p className="pointer-events-none mt-1 text-sm leading-6 text-muted-foreground">
              {entry.description}
            </p>
          </li>
        ))}
      </ul>
      {results.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface px-4 py-6 text-sm text-muted-foreground">
          Aucune notion pour « {query} ».
        </p>
      ) : null}
    </div>
  );
}
