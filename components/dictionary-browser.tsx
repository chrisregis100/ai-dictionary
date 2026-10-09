"use client";

import { ArrowUpRight, Search, X } from "@deemlol/next-icons";
import Link from "next/link";
import { parseAsString, useQueryState } from "nuqs";
import { useEffect, useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import { filterEntries } from "@/lib/search";
import { cn } from "@/lib/utils";

export interface DictionaryCardEntry {
  slug: string;
  term: string;
  description: string;
}

export interface DictionarySectionGroup {
  id: string;
  title: string;
  entries: DictionaryCardEntry[];
}

interface DictionaryBrowserProps {
  sections: DictionarySectionGroup[];
}

function notionCountLabel(count: number): string {
  return count === 1 ? "1 NOTION" : `${count} NOTIONS`;
}

function resultPhrase(count: number, query: string): string {
  if (count === 1) return `1 notion pour « ${query} »`;
  return `${count} notions pour « ${query} »`;
}

export function DictionaryBrowser({ sections }: DictionaryBrowserProps) {
  const [query, setQuery] = useQueryState(
    "q",
    parseAsString.withDefault("").withOptions({ history: "replace" }),
  );
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const filtered = useMemo(
    () =>
      sections
        .map((section) => ({
          ...section,
          entries: filterEntries(section.entries, query),
        }))
        .filter((section) => section.entries.length > 0),
    [query, sections],
  );

  const resultCount = filtered.reduce(
    (total, section) => total + section.entries.length,
    0,
  );
  const trimmedQuery = query.trim();

  useEffect(() => {
    const headings = filtered
      .map((section) => document.getElementById(section.id))
      .filter((node): node is HTMLElement => node !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const id = visible[0]?.target.id;
        if (id) setActiveId(id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [filtered]);

  const handleChange = (value: string) => {
    void setQuery(value === "" ? null : value);
  };

  const handleClear = () => {
    void setQuery(null);
  };

  return (
    <div className="rounded-2xl border border-line bg-card">
      <div className="lg:grid lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <aside className="border-b border-line lg:sticky lg:top-16 lg:z-10 lg:self-start lg:border-r lg:border-b-0 lg:bg-card">
          <div className="space-y-4 p-4 lg:max-h-[calc(100vh-4.5rem)] lg:overflow-y-auto">
            <form
              role="search"
              onSubmit={(event) => event.preventDefault()}
              className="relative"
            >
              <label className="sr-only" htmlFor="dictionnaire-recherche">
                Chercher dans le dictionnaire
              </label>
              <Search
                size={16}
                strokeWidth={1.75}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sage"
                aria-hidden
              />
              <Input
                id="dictionnaire-recherche"
                role="searchbox"
                aria-label="Chercher dans le dictionnaire"
                value={query}
                placeholder="Chercher dans le dictionnaire…"
                autoComplete="off"
                onChange={(event) => handleChange(event.target.value)}
                className="h-10 rounded-xl pr-10 pl-10 text-sm"
              />
              {trimmedQuery ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-muted transition-colors hover:text-ink"
                  aria-label="Effacer la recherche"
                >
                  <X size={14} strokeWidth={2} aria-hidden />
                </button>
              ) : null}
            </form>
            {trimmedQuery ? (
              <p className="text-sm text-muted" aria-live="polite">
                {resultPhrase(resultCount, trimmedQuery)}
              </p>
            ) : null}
            {filtered.length > 0 ? (
              <p className="text-[0.65rem] font-medium tracking-[0.2em] text-muted uppercase">
                Sections
              </p>
            ) : null}
            <nav aria-label="Sections du dictionnaire">
              <ul className="flex gap-1 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
                {filtered.map((section) => {
                  const isActive = activeId === section.id;

                  return (
                    <li key={section.id} className="shrink-0 lg:shrink">
                      <a
                        href={`#${section.id}`}
                        aria-label={`Aller à la section ${section.title}`}
                        aria-current={isActive ? "true" : undefined}
                        onClick={() => setActiveId(section.id)}
                        className={cn(
                          "flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 font-mono text-sm whitespace-nowrap transition-colors",
                          isActive
                            ? "bg-paper-sand text-ink"
                            : "text-muted hover:bg-paper-sand hover:text-ink",
                        )}
                      >
                        <span>
                          <span aria-hidden className="text-clay">
                            #
                          </span>{" "}
                          {section.title}
                        </span>
                        <span className="hidden text-xs text-muted lg:inline">
                          {section.entries.length}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </aside>

        <div className="min-w-0">
          {filtered.length === 0 ? (
            <p className="px-5 py-12 text-sm text-muted" aria-live="polite">
              Aucune notion pour « {trimmedQuery} ».
            </p>
          ) : (
            filtered.map((section) => (
              <section key={section.id} aria-labelledby={section.id}>
                <div className="flex items-end justify-between gap-4 border-b border-line px-5 py-6">
                  <h2
                    id={section.id}
                    className="scroll-mt-24 font-serif text-2xl tracking-[-0.02em] text-ink md:text-3xl"
                  >
                    {section.title}
                  </h2>
                  <p className="shrink-0 text-[0.65rem] font-medium tracking-[0.18em] text-muted uppercase">
                    {notionCountLabel(section.entries.length)}
                  </p>
                </div>
                <ul className="grid grid-cols-1 md:grid-cols-2">
                  {section.entries.map((entry) => (
                    <li
                      key={entry.slug}
                      className="border-b border-line md:odd:border-r"
                    >
                      <Link
                        href={`/notions/${entry.slug}`}
                        aria-label={entry.term}
                        aria-describedby={`desc-${entry.slug}`}
                        className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-paper-sand motion-reduce:transition-none"
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span className="text-xl font-semibold text-ink">
                            {entry.term}
                          </span>
                          <ArrowUpRight
                            size={16}
                            strokeWidth={1.75}
                            className="mt-1 shrink-0 text-muted group-hover:text-clay"
                            aria-hidden
                          />
                        </span>
                        <span
                          id={`desc-${entry.slug}`}
                          className="text-sm leading-6 text-muted"
                        >
                          {entry.description}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
