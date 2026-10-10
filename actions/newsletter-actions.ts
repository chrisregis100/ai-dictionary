"use server";

import { Resend } from "resend";
import { z } from "zod";

import type { NewsletterFormState } from "@/lib/newsletter-form-state";

const SubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Entre ton adresse e-mail.")
    .email("Cette adresse e-mail ne semble pas valide."),
});

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const parsed = SubscribeSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    const [firstIssue] = parsed.error.issues;
    return {
      status: "error",
      message: firstIssue?.message ?? "Adresse e-mail invalide.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  if (!apiKey || !audienceId) {
    return {
      status: "error",
      message:
        "L'inscription est momentanément indisponible. Réessaie plus tard.",
    };
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.contacts.create({
    email: parsed.data.email,
    audienceId,
    unsubscribed: false,
  });

  if (error) {
    return {
      status: "error",
      message: "L'inscription a échoué. Réessaie dans un instant.",
    };
  }

  return {
    status: "success",
    message: "C'est noté ! Vérifie ta boîte mail.",
  };
}
