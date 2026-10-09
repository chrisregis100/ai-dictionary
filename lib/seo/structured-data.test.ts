import { describe, expect, it } from "vitest";

import { getEntries } from "@/lib/dictionary";
import {
  DEFINED_TERM_SET_ID,
  SEARCH_QUERY_PARAM,
  buildBreadcrumbSchema,
  buildDefinedTermSchema,
  buildDefinedTermSetSchema,
  buildWebSiteSchema,
} from "@/lib/seo/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

describe("buildWebSiteSchema", () => {
  it("pointe SearchAction vers le paramètre nuqs réel", () => {
    const schema = buildWebSiteSchema();
    expect(SEARCH_QUERY_PARAM).toBe("q");
    expect(schema.potentialAction.target.urlTemplate).toBe(
      `${absoluteUrl("/recherche")}?q={search_term_string}`,
    );
    expect(schema.url).toBe(siteConfig.url);
    expect(schema["@id"].startsWith("http")).toBe(true);
  });
});

describe("buildDefinedTermSetSchema", () => {
  it("liste les 71 termes avec des @id absolus", () => {
    const entries = getEntries();
    const schema = buildDefinedTermSetSchema(entries);

    expect(entries).toHaveLength(71);
    expect(schema.hasDefinedTerm).toHaveLength(71);
    expect(schema["@id"]).toBe(DEFINED_TERM_SET_ID);
    expect(schema.hasDefinedTerm.every((term) => term["@id"].startsWith("http"))).toBe(
      true,
    );
  });
});

describe("buildDefinedTermSchema", () => {
  it("n'ajoute alternateName que si sourceTerm diffère du terme", () => {
    const same = buildDefinedTermSchema(
      {
        term: "Token",
        slug: "token",
        description: "Unité lue par le modèle.",
        sourceTerm: "Token",
      },
      "Le modèle",
    );
    expect(same.alternateName).toBeUndefined();

    const different = buildDefinedTermSchema(
      {
        term: "Jeton",
        slug: "token",
        description: "Unité lue par le modèle.",
        sourceTerm: "Token",
      },
      "Le modèle",
    );
    expect(different.alternateName).toBe("Token");
    expect(different.inDefinedTermSet).toBe(DEFINED_TERM_SET_ID);
    expect(different.url.startsWith("http")).toBe(true);
  });
});

describe("buildBreadcrumbSchema", () => {
  it("utilise le titre français de section, pas l'id", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Accueil", path: "/" },
      { name: "Le modèle", path: "/#model" },
      { name: "Token", path: "/notions/token" },
    ]);

    expect(schema.itemListElement[1]?.name).toBe("Le modèle");
    expect(schema.itemListElement[1]?.name).not.toBe("model");
    expect(schema.itemListElement[2]?.item).toBe(absoluteUrl("/notions/token"));
  });
});
