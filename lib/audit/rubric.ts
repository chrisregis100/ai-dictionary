import type { AuditFinding, AuditSeverity, EntryAudit } from "@/lib/audit/types";
import type { DictionaryEntry } from "@/lib/validate-dictionary";

const severityPenalties: Record<AuditSeverity, number> = {
  error: 35,
  warning: 15,
  info: 0,
};

export function createFinding(finding: AuditFinding): AuditFinding {
  return finding;
}

export function scoreEntry(findings: AuditFinding[]): number {
  const penalty = findings.reduce(
    (total, finding) => total + severityPenalties[finding.severity],
    0,
  );

  return Math.max(0, 100 - penalty);
}

export function auditEntry(
  entry: DictionaryEntry,
  findings: AuditFinding[],
): EntryAudit {
  return {
    entry: {
      slug: entry.slug,
      term: entry.term,
      section: entry.section,
    },
    findings,
    score: scoreEntry(findings),
    requiresHumanReview: findings.some(
      (finding) => finding.severity === "error" || finding.severity === "warning",
    ),
  };
}
