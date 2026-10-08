import { describe, expect, it } from "vitest";

import { curriculum, type CurriculumSection } from "@/content/curriculum";
import { loadDictionary } from "@/lib/dictionary";
import {
  validateDictionary,
  type RawEntry,
} from "@/lib/validate-dictionary";

function sectionsWith(terms: string[]): CurriculumSection[] {
  return curriculum.map((section) =>
    section.id === "model"
      ? { ...section, terms }
      : { ...section, terms: [] },
  );
}

function raw(filename: string, data: Record<string, unknown>): RawEntry {
  return { filename, data, body: "Corps de fiche." };
}

const validData = {
  term: "Token",
  slug: "token",
  section: "model",
  description: "Unité de lecture.",
  sourceTerm: "Token",
  related: [] as string[],
};

describe("dictionnaire publié", () => {
  it("accepte les fiches de la section Le modèle", () => {
    const report = loadDictionary();
    expect(report.issues).toEqual([]);
    expect(report.entries).toHaveLength(16);
  });
});

describe("validation", () => {
  it("signale une description trop longue", () => {
    const report = validateDictionary(
      [
        raw("token.md", {
          ...validData,
          description: "x".repeat(141),
        }),
      ],
      sectionsWith(["token"]),
    );
    expect(report.issues.map((issue) => issue.code)).toContain(
      "description-too-long",
    );
  });

  it("signale un sourceTerm manquant", () => {
    const { sourceTerm: _sourceTerm, ...withoutSource } = validData;
    void _sourceTerm;
    const report = validateDictionary(
      [raw("token.md", withoutSource)],
      sectionsWith(["token"]),
    );
    expect(report.issues.map((issue) => issue.code)).toContain(
      "missing-source-term",
    );
  });

  it("signale une fiche hors curriculum", () => {
    const report = validateDictionary(
      [
        raw("ghost.md", {
          ...validData,
          term: "Ghost",
          slug: "ghost",
          sourceTerm: "Ghost",
        }),
      ],
      sectionsWith([]),
    );
    expect(report.issues.map((issue) => issue.code)).toContain("orphan-entry");
  });

  it("signale un lien related introuvable", () => {
    const report = validateDictionary(
      [raw("token.md", { ...validData, related: ["absent"] })],
      sectionsWith(["token"]),
    );
    expect(report.issues.map((issue) => issue.code)).toContain(
      "broken-related",
    );
  });

  it("signale un slug en double", () => {
    const report = validateDictionary(
      [
        raw("token.md", validData),
        raw("token-bis.md", validData),
      ],
      sectionsWith(["token"]),
    );
    expect(report.issues.map((issue) => issue.code)).toContain(
      "duplicate-slug",
    );
  });
});
