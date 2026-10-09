"use client";

import { Search } from "@deemlol/next-icons";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";

import { Input } from "@/components/ui/input";
import type { SearchEntry } from "@/lib/dictionary";
import { grammarLabel } from "@/lib/lemma";
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
      <div className="space-y-3">
        <p className="font-serif text-sm italic text-sage">¶ Index</p>
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] tracking-[-0.03em] italic text-ink">
          Recherche
        </h1>
        <p className="max-w-prose text-muted">
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
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-sage"
          aria-hidden
        />
        <Input
          id="recherche-notion"
          role="searchbox"
          aria-label="Rechercher une notion"
          value={query}
          placeholder="Token, cache, effort…"
          onChange={(event) => handleChange(event.target.value)}
          className="pl-11"
        />
      </form>
      <p className="text-sm text-muted">
        {results.length}{" "}
        {results.length === 1 ? "notion" : "notions"}
      </p>
      <ul className="space-y-3">
        {results.map((entry) => (
          <li key={entry.slug} className="paper-card relative rounded-2xl bg-card px-4 py-4">
            <span className="text-xs font-medium tracking-wide text-sage">
              {entry.sectionTitle}
              <span className="ml-2 font-serif italic">{grammarLabel(entry.term)}</span>
            </span>
            <Link
              href={`/notions/${entry.slug}`}
              className="mt-1 block font-serif text-2xl italic after:absolute after:inset-0"
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
        <p className="rounded-2xl bg-paper-sand px-4 py-6 text-sm text-muted">
          Aucune notion pour « {query} ».
        </p>
      ) : null}
    </div>
  );
}
