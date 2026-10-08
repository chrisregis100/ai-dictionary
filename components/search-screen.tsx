"use client";

import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";

import { Input } from "@/components/ui/input";
import type { SearchEntry } from "@/lib/dictionary";
import { filterEntries } from "@/lib/search";

interface SearchScreenProps {
  entries: SearchEntry[];
}

export function SearchScreen({ entries }: SearchScreenProps) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ history: "replace" }),
  );
  const results = filterEntries(entries, query);

  const handleChange = (value: string) => {
    void setQuery(value === "" ? null : value);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="font-serif text-4xl text-ink">Recherche</h1>
        <p className="max-w-prose text-muted">
          Le terme anglais, le slug ou un mot de la description. L&apos;adresse
          garde la requête, tu peux la partager.
        </p>
      </div>
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="recherche-notion">
          Rechercher une notion
        </label>
        <Input
          id="recherche-notion"
          role="searchbox"
          aria-label="Rechercher une notion"
          value={query}
          placeholder="Token, cache, effort…"
          onChange={(event) => handleChange(event.target.value)}
        />
      </form>
      <p className="text-sm text-muted">
        {results.length}{" "}
        {results.length === 1 ? "notion" : "notions"}
      </p>
      <ul className="space-y-3">
        {results.map((entry) => (
          <li
            key={entry.slug}
            className="relative rounded-2xl bg-card px-4 py-4 ring-1 ring-line hover:ring-clay"
          >
            <span className="text-xs font-semibold tracking-wide text-clay-deep uppercase">
              {entry.sectionTitle}
            </span>
            <Link
              href={`/notions/${entry.slug}`}
              className="mt-1 block font-serif text-2xl after:absolute after:inset-0"
            >
              {entry.term}
            </Link>
            <p className="pointer-events-none mt-1 text-sm leading-6 text-muted">
              {entry.description}
            </p>
          </li>
        ))}
      </ul>
      {results.length === 0 ? (
        <p className="text-sm text-muted">
          Aucune notion pour « {query} ».
        </p>
      ) : null}
    </div>
  );
}
