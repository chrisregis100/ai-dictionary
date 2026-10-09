import { execFileSync } from "node:child_process";
import { statSync } from "node:fs";
import path from "node:path";

const lastModifiedByFile = new Map<string, Date | undefined>();

function parseIsoDate(value: string): Date | undefined {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date;
}

function readGitCommitDate(filePath: string): Date | undefined {
  try {
    const relativePath = path.relative(process.cwd(), filePath);
    const output = execFileSync(
      "git",
      ["log", "-1", "--format=%cI", "--", relativePath],
      {
        cwd: process.cwd(),
        encoding: "utf8",
        stdio: ["ignore", "pipe", "ignore"],
        timeout: 4000,
      },
    ).trim();

    if (!output) return undefined;
    return parseIsoDate(output);
  } catch {
    return undefined;
  }
}

function readFileMtime(filePath: string): Date | undefined {
  try {
    return statSync(filePath).mtime;
  } catch {
    return undefined;
  }
}

export function getContentLastModified(filePath: string): Date | undefined {
  const absolutePath = path.resolve(filePath);
  if (lastModifiedByFile.has(absolutePath)) {
    return lastModifiedByFile.get(absolutePath);
  }

  const lastModified =
    readGitCommitDate(absolutePath) ?? readFileMtime(absolutePath);
  lastModifiedByFile.set(absolutePath, lastModified);
  return lastModified;
}

export function getEntryLastModified(slug: string): Date | undefined {
  return getContentLastModified(
    path.join(process.cwd(), "content", "entries", `${slug}.md`),
  );
}
