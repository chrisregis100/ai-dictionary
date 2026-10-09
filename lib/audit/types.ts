import type { DictionaryEntry } from "@/lib/validate-dictionary";

export const auditAxes = [
  "structure",
  "linguistique",
  "typographie",
] as const;

export const auditSeverities = ["error", "warning", "info"] as const;

export type AuditAxis = (typeof auditAxes)[number];
export type AuditSeverity = (typeof auditSeverities)[number];

export interface AuditFinding {
  axis: AuditAxis;
  severity: AuditSeverity;
  code: string;
  evidence: string;
  recommendation: string;
}

export interface EntryAudit {
  entry: Pick<DictionaryEntry, "slug" | "term" | "section">;
  findings: AuditFinding[];
  score: number;
  requiresHumanReview: boolean;
}

export interface SectionAuditSummary {
  section: string;
  entries: number;
  findings: number;
  requiresHumanReview: number;
  averageScore: number;
}

export interface AuditReport {
  generatedAt: string;
  entries: EntryAudit[];
  sections: SectionAuditSummary[];
  reviewQueue: EntryAudit[];
}
