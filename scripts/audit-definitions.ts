import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";

import { getEntries } from "@/lib/dictionary";
import { auditDefinitions, formatAuditReport } from "@/lib/audit/report";

const reportsDirectory = path.join(process.cwd(), "reports");

function main() {
  const report = auditDefinitions(getEntries());
  mkdirSync(reportsDirectory, { recursive: true });

  const jsonPath = path.join(reportsDirectory, "content-audit.json");
  const markdownPath = path.join(reportsDirectory, "content-audit.md");

  writeFileSync(jsonPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
  writeFileSync(markdownPath, formatAuditReport(report), "utf8");

  console.log(`Audit éditorial écrit dans ${path.relative(process.cwd(), jsonPath)}.`);
  console.log(
    `File de revue humaine : ${report.reviewQueue.length} fiche(s) sur ${report.entries.length}.`,
  );
}

main();
