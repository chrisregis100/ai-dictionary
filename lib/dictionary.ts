import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import { curriculum, sectionById, type SectionId } from "@/content/curriculum";
import {
  validateDictionary,
  type DictionaryEntry,
  type DictionaryIssue,
  type RawEntry,
} from "@/lib/validate-dictionary";

export interface SearchEntry {
  slug: string;
  term: string;
  description: string;
  section: SectionId;
  sectionTitle: string;
}

export function readRawEntries(): RawEntry[] {
  const filenames = readdirSync(
    path.join(process.cwd(), "content", "entries"),
  ).filter((name) => name.endsWith(".md"));

  return filenames.map((filename) => {
    const file = matter(
      readFileSync(
        path.join(process.cwd(), "content", "entries", filename),
        "utf8",
      ),
    );
    return { filename, data: file.data, body: file.content };
  });
}

export function loadDictionary(): {
  entries: DictionaryEntry[];
  issues: DictionaryIssue[];
} {
  return validateDictionary(readRawEntries(), curriculum);
}

export function getEntries(): DictionaryEntry[] {
  const { entries, issues } = loadDictionary();
  if (issues.length > 0) {
    const details = issues.map((issue) => issue.message).join("\n");
    throw new Error(`Dictionnaire invalide :\n${details}`);
  }

  const order = new Map(
    curriculum.flatMap((section) =>
      section.terms.map((slug, index) => [slug, index] as const),
    ),
  );

  return [...entries].sort(
    (left, right) => (order.get(left.slug) ?? 0) - (order.get(right.slug) ?? 0),
  );
}

export function getEntry(slug: string): DictionaryEntry | undefined {
  return getEntries().find((entry) => entry.slug === slug);
}

export function getEntriesForSection(sectionId: SectionId): DictionaryEntry[] {
  const section = sectionById(sectionId);
  const bySlug = new Map(getEntries().map((entry) => [entry.slug, entry]));
  return section.terms.flatMap((slug) => {
    const entry = bySlug.get(slug);
    return entry ? [entry] : [];
  });
}

export function getSearchEntries(): SearchEntry[] {
  return getEntries().map((entry) => ({
    slug: entry.slug,
    term: entry.term,
    description: entry.description,
    section: entry.section,
    sectionTitle: sectionById(entry.section).title,
  }));
}

export function getSourceTerms(): string[] {
  return getEntries().map((entry) => entry.sourceTerm);
}
