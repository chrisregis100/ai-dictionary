import { Suspense } from "react";

import { DictionaryBrowser } from "@/components/dictionary-browser";
import { DictionaryHero } from "@/components/dictionary-hero";
import { curriculum } from "@/content/curriculum";
import { getEntries } from "@/lib/dictionary";

export default function HomePage() {
  const entries = getEntries();
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const sections = curriculum.map((section) => ({
    id: section.id,
    title: section.title,
    entries: section.terms.flatMap((slug) => {
      const entry = bySlug.get(slug);
      return entry
        ? [
            {
              slug: entry.slug,
              term: entry.term,
              description: entry.description,
            },
          ]
        : [];
    }),
  }));

  return (
    <div className="space-y-10">
      <DictionaryHero
        entryCount={entries.length}
        sections={curriculum.map((section) => ({
          id: section.id,
          title: section.title,
        }))}
      />
      <Suspense
        fallback={<p className="text-sm text-muted">Chargement du dictionnaire…</p>}
      >
        <DictionaryBrowser sections={sections} />
      </Suspense>
    </div>
  );
}
