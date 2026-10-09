import { describe, expect, it } from "vitest";

import { auditDefinitions } from "@/lib/audit/report";
import type { DictionaryEntry } from "@/lib/validate-dictionary";

function entry(body: string): DictionaryEntry {
  return {
    term: "Model",
    slug: "model",
    section: "model",
    description: "Un modèle prédit le token suivant.",
    sourceTerm: "Model",
    related: [],
    body,
  };
}

describe("auditDefinitions", () => {
  it("signale une rubrique À éviter manquante", () => {
    const report = auditDefinitions(
      [
        entry(`Le Model prédit le token suivant.

## En situation

> « Que fait-il ? »

> « Il prédit. »`),
      ],
      "2026-10-09T00:00:00.000Z",
    );

    expect(report.entries[0].findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "missing-required-heading",
          severity: "error",
        }),
      ]),
    );
  });

  it("signale un mot anglais résiduel sans pénaliser le terme", () => {
    const report = auditDefinitions(
      [
        entry(`Le Model prédit le token suivant when a request arrives.

## À éviter

- Croire que le modèle agit seul.

## En situation

> « Que fait-il ? »

> « Il prédit. »`),
      ],
      "2026-10-09T00:00:00.000Z",
    );

    expect(report.entries[0].findings).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: "residual-english-word",
          evidence: expect.stringContaining("« when »"),
        }),
      ]),
    );
    expect(report.entries[0].findings).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({ evidence: expect.stringContaining("« model »") }),
      ]),
    );
  });
});
