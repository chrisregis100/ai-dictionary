import { getSourceTerms } from "@/lib/dictionary";
import { diffUpstreamTerms, formatUpstreamReport } from "@/lib/upstream";

const ENDPOINT =
  "https://api.github.com/repos/mattpocock/dictionary-of-ai-coding/contents/dictionary?ref=main";

interface GithubItem {
  name: string;
  type: string;
}

function isGithubItem(value: unknown): value is GithubItem {
  if (typeof value !== "object" || value === null) return false;
  const record = value as Record<string, unknown>;
  return typeof record.name === "string" && typeof record.type === "string";
}

async function main() {
  const response = await fetch(ENDPOINT, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "ai-dictionary-upstream-check",
    },
  });

  if (!response.ok) {
    console.warn(
      `Veille : l'API GitHub a répondu ${response.status}. Rien n'est bloqué.`,
    );
    return;
  }

  const payload: unknown = await response.json();
  if (!Array.isArray(payload) || !payload.every(isGithubItem)) {
    console.warn("Veille : réponse GitHub inattendue. Rien n'est bloqué.");
    return;
  }

  const upstreamTerms = payload
    .filter((item) => item.type === "file" && item.name.endsWith(".md"))
    .map((item) => item.name.slice(0, -3));

  console.log(
    formatUpstreamReport(diffUpstreamTerms(upstreamTerms, getSourceTerms())),
  );
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : "erreur inconnue";
  console.warn(`Veille : ${message}. Rien n'est bloqué.`);
});
