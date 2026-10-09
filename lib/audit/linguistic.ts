import { createFinding } from "@/lib/audit/rubric";
import type { AuditFinding } from "@/lib/audit/types";
import type { DictionaryEntry } from "@/lib/validate-dictionary";

const residualEnglishWords = new Set([
  "because",
  "from",
  "into",
  "should",
  "that",
  "the",
  "then",
  "this",
  "when",
  "with",
  "without",
]);

function protectedWords(entry: DictionaryEntry): Set<string> {
  return new Set(
    `${entry.term} ${entry.sourceTerm}`
      .toLocaleLowerCase("fr")
      .match(/\p{L}+/gu) ?? [],
  );
}

function residualWords(entry: DictionaryEntry): string[] {
  const protectedTerms = protectedWords(entry);
  const words = entry.body.toLocaleLowerCase("fr").match(/\p{L}+/gu) ?? [];

  return [...new Set(
    words.filter(
      (word) => residualEnglishWords.has(word) && !protectedTerms.has(word),
    ),
  )];
}

export function auditLinguisticQuality(
  entry: DictionaryEntry,
): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const englishWords = residualWords(entry);

  if (englishWords.length > 0) {
    findings.push(
      createFinding({
        axis: "linguistique",
        severity: "warning",
        code: "residual-english-word",
        evidence: `Mot anglais résiduel détecté : ${englishWords.map((word) => `« ${word} »`).join(", ")}.`,
        recommendation:
          "Remplacer ce calque potentiel par une formulation française, sauf s'il est indispensable au sens.",
      }),
    );
  }

  const straightApostrophes = entry.body.match(/'/gu)?.length ?? 0;
  if (straightApostrophes > 0) {
    findings.push(
      createFinding({
        axis: "typographie",
        severity: "info",
        code: "straight-apostrophe",
        evidence: `${straightApostrophes} apostrophe(s) droite(s) (') détectée(s).`,
        recommendation:
          "Vérifier si l’apostrophe typographique (’) convient à la formulation française.",
      }),
    );
  }

  return findings;
}
