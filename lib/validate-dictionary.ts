import {
  curriculum,
  type CurriculumSection,
  type SectionId,
} from "@/content/curriculum";
import { entrySchema, type EntryFrontmatter } from "@/lib/schema";

interface FieldIssue {
  code: string;
  message: string;
  path: PropertyKey[];
}

export interface DictionaryEntry extends EntryFrontmatter {
  body: string;
}

export interface RawEntry {
  filename: string;
  data: unknown;
  body: string;
}

export type DictionaryIssueCode =
  | "invalid-frontmatter"
  | "duplicate-slug"
  | "broken-related"
  | "orphan-entry"
  | "missing-entry"
  | "description-too-long"
  | "missing-source-term"
  | "section-mismatch"
  | "slug-mismatch";

export interface DictionaryIssue {
  code: DictionaryIssueCode;
  message: string;
}

export interface DictionaryReport {
  entries: DictionaryEntry[];
  issues: DictionaryIssue[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function issueFromZod(filename: string, issue: FieldIssue): DictionaryIssue {
  const field = issue.path[0];
  if (field === "description" && issue.code === "too_big") {
    return {
      code: "description-too-long",
      message: `${filename} : description trop longue`,
    };
  }
  if (field === "sourceTerm") {
    return {
      code: "missing-source-term",
      message: `${filename} : sourceTerm manquant`,
    };
  }
  return {
    code: "invalid-frontmatter",
    message: `${filename} : ${issue.message}`,
  };
}

function sectionForSlug(
  sections: CurriculumSection[],
  slug: string,
): SectionId | undefined {
  return sections.find((section) => section.terms.includes(slug))?.id;
}

export function validateDictionary(
  raws: RawEntry[],
  sections: CurriculumSection[] = curriculum,
): DictionaryReport {
  const issues: DictionaryIssue[] = [];
  const entries: DictionaryEntry[] = [];

  for (const raw of raws) {
    if (!isRecord(raw.data)) {
      issues.push({
        code: "invalid-frontmatter",
        message: `${raw.filename} : frontmatter illisible`,
      });
      continue;
    }

    const parsed = entrySchema.safeParse(raw.data);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        issues.push(issueFromZod(raw.filename, issue));
      }
      continue;
    }

    const expectedSlug = raw.filename.replace(/\.md$/, "");
    if (parsed.data.slug !== expectedSlug) {
      issues.push({
        code: "slug-mismatch",
        message: `${raw.filename} : le slug « ${parsed.data.slug} » ne correspond pas au fichier`,
      });
    }

    const owner = sectionForSlug(sections, parsed.data.slug);
    if (!owner) {
      issues.push({
        code: "orphan-entry",
        message: `${parsed.data.slug} : fiche absente du curriculum`,
      });
    } else if (owner !== parsed.data.section) {
      issues.push({
        code: "section-mismatch",
        message: `${parsed.data.slug} : section « ${parsed.data.section} », curriculum « ${owner} »`,
      });
    }

    entries.push({ ...parsed.data, body: raw.body.trim() });
  }

  const seen = new Set<string>();
  for (const entry of entries) {
    if (seen.has(entry.slug)) {
      issues.push({
        code: "duplicate-slug",
        message: `${entry.slug} : slug en double`,
      });
    }
    seen.add(entry.slug);
  }

  const known = new Set(entries.map((entry) => entry.slug));
  for (const entry of entries) {
    for (const related of entry.related) {
      if (!known.has(related)) {
        issues.push({
          code: "broken-related",
          message: `${entry.slug} : lien related « ${related} » introuvable`,
        });
      }
    }
  }

  for (const section of sections) {
    for (const slug of section.terms) {
      if (!known.has(slug)) {
        issues.push({
          code: "missing-entry",
          message: `${section.id} : la fiche « ${slug} » est au curriculum mais absente du dossier`,
        });
      }
    }
  }

  return { entries, issues };
}
