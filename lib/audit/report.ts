import { auditLinguisticQuality } from "@/lib/audit/linguistic";
import { auditEntry } from "@/lib/audit/rubric";
import { auditStructure } from "@/lib/audit/structural";
import type {
  AuditReport,
  EntryAudit,
  SectionAuditSummary,
} from "@/lib/audit/types";
import type { DictionaryEntry } from "@/lib/validate-dictionary";

function roundScore(value: number): number {
  return Math.round(value * 10) / 10;
}

function summarizeSections(entries: EntryAudit[]): SectionAuditSummary[] {
  const bySection = new Map<string, EntryAudit[]>();

  for (const entry of entries) {
    const sectionEntries = bySection.get(entry.entry.section) ?? [];
    sectionEntries.push(entry);
    bySection.set(entry.entry.section, sectionEntries);
  }

  return [...bySection.entries()]
    .map(([section, sectionEntries]) => ({
      section,
      entries: sectionEntries.length,
      findings: sectionEntries.reduce(
        (total, entry) => total + entry.findings.length,
        0,
      ),
      requiresHumanReview: sectionEntries.filter(
        (entry) => entry.requiresHumanReview,
      ).length,
      averageScore: roundScore(
        sectionEntries.reduce((total, entry) => total + entry.score, 0) /
          sectionEntries.length,
      ),
    }))
    .toSorted((left, right) => left.section.localeCompare(right.section, "fr"));
}

export function auditDefinitions(
  entries: DictionaryEntry[],
  generatedAt = new Date().toISOString(),
): AuditReport {
  const auditedEntries = entries.map((entry) =>
    auditEntry(entry, [
      ...auditStructure(entry),
      ...auditLinguisticQuality(entry),
    ]),
  );
  const reviewQueue = auditedEntries
    .filter((entry) => entry.requiresHumanReview)
    .toSorted(
      (left, right) =>
        left.score - right.score ||
        left.entry.slug.localeCompare(right.entry.slug, "fr"),
    );

  return {
    generatedAt,
    entries: auditedEntries,
    sections: summarizeSections(auditedEntries),
    reviewQueue,
  };
}

function markdownCell(value: string | number): string {
  return String(value).replaceAll("|", "\\|");
}

export function formatAuditReport(report: AuditReport): string {
  const lines = [
    "# Audit éditorial des définitions",
    "",
    `Généré le : ${report.generatedAt}`,
    "",
    "## Résumé par section",
    "",
    "| Section | Fiches | Findings | Revue humaine | Score moyen |",
    "| --- | ---: | ---: | ---: | ---: |",
    ...report.sections.map((section) =>
      [
        markdownCell(section.section),
        section.entries,
        section.findings,
        section.requiresHumanReview,
        section.averageScore,
      ].join(" | "),
    ).map((line) => `| ${line} |`),
    "",
    "## File de revue",
    "",
  ];

  if (report.reviewQueue.length === 0) {
    lines.push("Aucune fiche ne requiert de revue humaine.");
  } else {
    for (const audit of report.reviewQueue) {
      lines.push(
        `### ${audit.entry.term} (${audit.entry.slug}) — score ${audit.score}/100`,
        "",
      );
      for (const finding of audit.findings) {
        lines.push(
          `- **${finding.severity} · ${finding.axis}** — ${finding.evidence} Recommandation : ${finding.recommendation}`,
        );
      }
      lines.push("");
    }
  }

  return `${lines.join("\n")}\n`;
}
