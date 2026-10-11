import { z } from "zod";

export const NEWSLETTER_SOURCES = ["newsletter", "build", "formations"] as const;
export type NewsletterSource = (typeof NEWSLETTER_SOURCES)[number];

/**
 * Schéma de source avec repli sur "newsletter" si la valeur est absente ou invalide.
 * Ne fait jamais échouer l'inscription pour une source inconnue.
 */
export const newsletterSourceSchema = z.enum(NEWSLETTER_SOURCES).catch("newsletter");

/**
 * Résout l'identifiant d'audience Resend selon la source.
 *
 * Mapping :
 * - newsletter → RESEND_AUDIENCE_ID
 * - build      → RESEND_AUDIENCE_ID_BUILD ?? RESEND_AUDIENCE_ID
 * - formations → RESEND_AUDIENCE_ID_FORMATIONS ?? RESEND_AUDIENCE_ID
 *
 * Accepte un objet `env` en paramètre pour faciliter les tests unitaires.
 * En production, utilise `process.env` par défaut.
 *
 * Retourne null si aucune audience n'est configurée.
 */
function readAudienceId(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export function resolveAudienceId(
  source: NewsletterSource,
  env: Partial<
    Pick<
      NodeJS.ProcessEnv,
      | "RESEND_AUDIENCE_ID"
      | "RESEND_AUDIENCE_ID_BUILD"
      | "RESEND_AUDIENCE_ID_FORMATIONS"
    >
  > = process.env,
): string | null {
  const base = readAudienceId(env.RESEND_AUDIENCE_ID);

  switch (source) {
    case "build":
      return readAudienceId(env.RESEND_AUDIENCE_ID_BUILD) ?? base;
    case "formations":
      return readAudienceId(env.RESEND_AUDIENCE_ID_FORMATIONS) ?? base;
    case "newsletter":
    default:
      return base;
  }
}

/**
 * Détecte si le champ honeypot `website` a été rempli.
 * Un utilisateur humain ne voit pas ce champ et ne le remplit jamais.
 */
export function isHoneypotFilled(website: string | null | undefined): boolean {
  return typeof website === "string" && website.length > 0;
}

/**
 * Resend renvoie souvent un 422 pour plusieurs erreurs de validation.
 * Seul un doublon doit passer en succès UX.
 */
export function isDuplicateContactError(error: {
  name: string;
  message: string;
}): boolean {
  const name = error.name.toLowerCase();
  const message = error.message.toLowerCase();

  if (name.includes("already_exists") || name.includes("duplicate")) return true;

  return /already (exists|in (the )?(audience|segment))|duplicate/.test(message);
}
