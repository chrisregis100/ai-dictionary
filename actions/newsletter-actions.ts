"use server";

import { connection } from "next/server";
import { headers } from "next/headers";

import type { NewsletterFormState } from "@/lib/newsletter-form-state";
import { submitNewsletterSubscription } from "@/lib/newsletter-subscribe";

function readEnv(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

export async function subscribeToNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  await connection();
  const headerStore = await headers();
  const website = formData.get("website");

  return submitNewsletterSubscription({
    email: formData.get("email"),
    consent: formData.get("consent"),
    source: formData.get("source"),
    website:
      typeof website === "string" ? website : website instanceof File ? "file" : null,
    forwardedFor: headerStore.get("x-forwarded-for"),
    realIp: headerStore.get("x-real-ip"),
    env: {
      RESEND_API_KEY: readEnv("RESEND_API_KEY"),
      RESEND_AUDIENCE_ID: readEnv("RESEND_AUDIENCE_ID"),
      RESEND_AUDIENCE_ID_BUILD: readEnv("RESEND_AUDIENCE_ID_BUILD"),
      RESEND_AUDIENCE_ID_FORMATIONS: readEnv("RESEND_AUDIENCE_ID_FORMATIONS"),
    },
  });
}
