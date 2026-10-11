"use server";

import { Resend } from "resend";
import { z } from "zod";

import {
  isDuplicateContactError,
  isHoneypotFilled,
  newsletterSourceSchema,
  resolveAudienceId,
} from "@/lib/newsletter-audience";
import type { NewsletterFormState } from "@/lib/newsletter-form-state";

const SubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Entre ton adresse e-mail.")
    .email("Cette adresse e-mail ne semble pas valide."),
  consent: z
    .string()
    .nullable()
    .refine((v) => v === "true", {
      message: "Tu dois cocher la case pour continuer.",
    }),
  source: newsletterSourceSchema,
});

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  // Honeypot : vérification avant tout — réponse neutre sans appeler Resend
  const website = formData.get("website");
  const honeypot =
    typeof website === "string" ? website : website instanceof File ? "file" : null;
  if (isHoneypotFilled(honeypot)) {
    return { status: "success", message: "C'est noté, merci !" };
  }

  const parsed = SubscribeSchema.safeParse({
    email: formData.get("email"),
    consent: formData.get("consent"),
    source: formData.get("source"),
  });

  if (!parsed.success) {
    const [firstIssue] = parsed.error.issues;
    return {
      status: "error",
      message: firstIssue?.message ?? "Formulaire invalide.",
    };
  }

  const { email, source } = parsed.data;
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = resolveAudienceId(source);

  if (!apiKey || !audienceId) {
    return {
      status: "error",
      message: "L'inscription est momentanément indisponible. Réessaie plus tard.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({
    email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    if (isDuplicateContactError(error)) {
      return {
        status: "success",
        message: "Tu étais déjà inscrit(e). Merci de ton intérêt !",
      };
    }
    return {
      status: "error",
      message: "L'inscription a échoué. Réessaie dans un instant.",
    };
  }

  return {
    status: "success",
    message: "C'est noté, tu es inscrit(e) !",
  };
}
