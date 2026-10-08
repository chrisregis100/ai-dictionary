export interface UpstreamDiff {
  added: string[];
  removedOrRenamed: string[];
}

export function diffUpstreamTerms(
  upstreamTerms: string[],
  localSourceTerms: string[],
): UpstreamDiff {
  const upstream = new Set(upstreamTerms);
  const local = new Set(localSourceTerms);

  return {
    added: upstreamTerms.filter((term) => !local.has(term)).sort(),
    removedOrRenamed: localSourceTerms
      .filter((term) => !upstream.has(term))
      .sort(),
  };
}

export function formatUpstreamReport(diff: UpstreamDiff): string {
  if (diff.added.length === 0 && diff.removedOrRenamed.length === 0) {
    return "Veille : le glossaire source n'a pas de terme absent ou en trop par rapport aux fiches locales.";
  }

  const lines = ["Veille : le glossaire source a bougé.", ""];

  if (diff.added.length > 0) {
    lines.push("Ajoutés côté source (absents en local) :");
    for (const term of diff.added) lines.push(`- ${term}`);
    lines.push("");
  }

  if (diff.removedOrRenamed.length > 0) {
    lines.push("Retirés ou renommés (présents en local, absents côté source) :");
    for (const term of diff.removedOrRenamed) lines.push(`- ${term}`);
    lines.push("");
  }

  lines.push(
    "Le script ne télécharge pas le texte des fiches. Une réécriture française se fait à la main.",
  );

  return lines.join("\n").trimEnd();
}
