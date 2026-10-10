export interface SiteConfig {
  name: string;
  shortName: string;
  description: string;
  url: string;
  locale: "fr_FR";
  author: string;
  githubUrl: string;
  upstreamUrl: string;
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}

function withProtocol(value: string): string {
  if (/^https?:\/\//i.test(value)) return value;
  return `https://${value}`;
}

export function resolveSiteUrl(
  env: NodeJS.ProcessEnv = process.env,
): string {
  const configured = env.NEXT_PUBLIC_SITE_URL?.trim();
  if (configured) return stripTrailingSlash(withProtocol(configured));

  const productionHost = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (productionHost) return stripTrailingSlash(withProtocol(productionHost));

  const previewHost = env.VERCEL_URL?.trim();
  if (previewHost) return stripTrailingSlash(withProtocol(previewHost));

  return "http://localhost:3000";
}

export const siteConfig = {
  name: "Dev Hero",
  shortName: "Dev Hero",
  description:
    "La plateforme francophone pour maîtriser le développement assisté par IA : dictionnaire, blog et ressources pratiques, en français clair.",
  url: resolveSiteUrl(),
  locale: "fr_FR",
  author: "Regis Kiki",
  githubUrl: "https://github.com/chrisregis100/ai-dictionary",
  upstreamUrl: "https://github.com/mattpocock/dictionary-of-ai-coding",
} as const satisfies SiteConfig;

export function absoluteUrl(path: string): string {
  const normalizedPath = path.replace(/^\/+|\/+$/g, "");
  if (normalizedPath === "") return siteConfig.url;
  return `${siteConfig.url}/${normalizedPath}`;
}
