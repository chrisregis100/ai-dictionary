import { createFinding } from "@/lib/audit/rubric";
import type { AuditFinding } from "@/lib/audit/types";
import type { DictionaryEntry } from "@/lib/validate-dictionary";

const requiredHeadings = ["## À éviter", "## En situation"] as const;

function normalizedText(value: string): string {
  return value.normalize("NFKD").replace(/\p{Diacritic}/gu, "").toLowerCase();
}

function firstParagraph(body: string): string | undefined {
  return body
    .split(/\n\s*\n/u)
    .map((paragraph) => paragraph.trim())
    .find(
      (paragraph) =>
        paragraph.length > 0 &&
        !paragraph.startsWith("#") &&
        !paragraph.startsWith(">"),
    );
}

export function auditStructure(entry: DictionaryEntry): AuditFinding[] {
  const findings: AuditFinding[] = [];
  const headingPositions = requiredHeadings.map((heading) => ({
    heading,
    position: entry.body.indexOf(heading),
  }));

  for (const { heading, position } of headingPositions) {
    if (position >= 0) continue;

    findings.push(
      createFinding({
        axis: "structure",
        severity: "error",
        code: "missing-required-heading",
        evidence: `Rubrique requise absente : « ${heading} ».`,
        recommendation: `Ajouter la rubrique « ${heading} » conformément à CONTENT.md.`,
      }),
    );
  }

  const [avoid, situation] = headingPositions;
  if (
    avoid.position >= 0 &&
    situation.position >= 0 &&
    avoid.position > situation.position
  ) {
    findings.push(
      createFinding({
        axis: "structure",
        severity: "error",
        code: "required-heading-order",
        evidence: "« En situation » apparaît avant « À éviter ».",
        recommendation:
          "Placer « À éviter » avant « En situation », à la fin de la fiche.",
      }),
    );
  }

  const introduction = firstParagraph(entry.body);
  if (!introduction) {
    findings.push(
      createFinding({
        axis: "structure",
        severity: "error",
        code: "missing-introduction",
        evidence: "Aucun paragraphe d'introduction n'a été trouvé.",
        recommendation: "Commencer la fiche par une phrase qui désigne la notion.",
      }),
    );
    return findings;
  }

  if (!normalizedText(introduction).includes(normalizedText(entry.term))) {
    findings.push(
      createFinding({
        axis: "structure",
        severity: "warning",
        code: "term-missing-from-introduction",
        evidence: `Le premier paragraphe ne contient pas « ${entry.term} ».`,
        recommendation:
          "Nommer le terme dès l'introduction pour ancrer sa désignation.",
      }),
    );
  }

  return findings;
}
