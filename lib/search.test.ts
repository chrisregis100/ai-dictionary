import { describe, expect, it } from "vitest";

import { filterEntries } from "@/lib/search";

const entries = [
  {
    slug: "token",
    term: "Token",
    description: "Unité lue par le modèle.",
  },
  {
    slug: "prefix-cache",
    term: "Prefix cache",
    description: "Réemploi du début identique.",
  },
  {
    slug: "context-window",
    term: "Context window",
    description: "La fenêtre de contexte.",
  },
];

describe("filterEntries", () => {
  it("renvoie tout quand la requête est vide", () => {
    expect(filterEntries(entries, "  ")).toEqual(entries);
  });

  it("cherche dans le terme, le slug et la description", () => {
    expect(filterEntries(entries, "cache").map((entry) => entry.slug)).toEqual([
      "prefix-cache",
    ]);
    expect(filterEntries(entries, "unité").map((entry) => entry.slug)).toEqual([
      "token",
    ]);
  });

  it("ignore les accents des deux côtés", () => {
    expect(
      filterEntries(entries, "fenetre").map((entry) => entry.slug),
    ).toEqual(["context-window"]);
    expect(
      filterEntries(entries, "FENÊTRE").map((entry) => entry.slug),
    ).toEqual(["context-window"]);
  });
});
