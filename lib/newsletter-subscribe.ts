import { Resend } from "resend";
import { z } from "zod";

import type { NewsletterFormState } from "@/lib/newsletter-form-state";
import {
  isDuplicateContactError,
  isHoneypotFilled,
  newsletterSourceSchema,
  resolveAudienceId,
  type NewsletterAudienceEnv,
} from "@/lib/newsletter-audience";
import {
  isNewsletterRateLimited,
  newsletterRateLimitDefaults,
  readClientIp,
} from "@/lib/newsletter-rate-limit";

export const newsletterMessages = {
  missingEmail: "Entre ton adresse e-mail.",
  invalidEmail: "Cette adresse e-mail ne semble pas valide.",
  missingConsent: "Tu dois cocher la case pour continuer.",
  unavailable:
    "L'inscription est momentanément indisponible. Réessaie plus tard.",
  failed: "L'inscription a échoué. Réessaie dans un instant.",
  success: "C'est noté, tu es inscrit(e) !",
  duplicate: "Tu étais déjà inscrit(e). Merci de ton intérêt !",
  rateLimited: "Trop de tentatives. Réessaie dans quelques minutes.",
} as const;

const SubscribeSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, newsletterMessages.missingEmail)
    .max(254, newsletterMessages.invalidEmail)
    .email(newsletterMessages.invalidEmail),
  consent: z
    .string()
    .nullable()
    .refine((value) => value === "true", {
      message: newsletterMessages.missingConsent,
    }),
  source: newsletterSourceSchema,
});

export interface NewsletterRuntimeEnv extends NewsletterAudienceEnv {
  RESEND_API_KEY?: string;
}

export interface NewsletterContactInput {
  apiKey: string;
  email: string;
  audienceId: string;
}

export interface NewsletterContactResult {
  error: { name: string; message: string } | null;
}

export interface NewsletterSubmission {
  email: unknown;
  consent: unknown;
  source: unknown;
  website: unknown;
  forwardedFor: string | null;
  realIp: string | null;
  env: NewsletterRuntimeEnv;
  now?: number;
  createContact?: (
    input: NewsletterContactInput,
  ) => Promise<NewsletterContactResult>;
  updateContact?: (
    input: NewsletterContactInput,
  ) => Promise<NewsletterContactResult>;
}

function readField(value: unknown): string | null {
  if (typeof value !== "string") return null;
  return value;
}

async function createResendContact(
  input: NewsletterContactInput,
): Promise<NewsletterContactResult> {
  const resend = new Resend(input.apiKey);
  const { error } = await resend.contacts.create({
    email: input.email,
    audienceId: input.audienceId,
    unsubscribed: false,
  });

  if (!error) return { error: null };
  return { error: { name: error.name, message: error.message } };
}

async function updateResendContact(
  input: NewsletterContactInput,
): Promise<NewsletterContactResult> {
  const resend = new Resend(input.apiKey);
  const { error } = await resend.contacts.update({
    email: input.email,
    audienceId: input.audienceId,
    unsubscribed: false,
  });

  if (!error) return { error: null };
  return { error: { name: error.name, message: error.message } };
}

export async function submitNewsletterSubscription(
  input: NewsletterSubmission,
): Promise<NewsletterFormState> {
  const website = readField(input.website);
  if (isHoneypotFilled(website)) {
    return { status: "success", message: newsletterMessages.success };
  }

  const parsed = SubscribeSchema.safeParse({
    email: readField(input.email) ?? "",
    consent: readField(input.consent),
    source: readField(input.source),
  });

  const now = input.now ?? Date.now();
  const ip = readClientIp(input.forwardedFor, input.realIp);
  const email = parsed.success ? parsed.data.email.toLowerCase() : "";
  const ipLimited = isNewsletterRateLimited(`ip:${ip}`, now, {
    limit: newsletterRateLimitDefaults.ipLimit,
    windowMs: newsletterRateLimitDefaults.windowMs,
  });
  const emailLimited =
    email.length > 0 &&
    isNewsletterRateLimited(`email:${email}`, now, {
      limit: newsletterRateLimitDefaults.emailLimit,
      windowMs: newsletterRateLimitDefaults.windowMs,
    });

  if (ipLimited || emailLimited) {
    return { status: "error", message: newsletterMessages.rateLimited };
  }

  if (!parsed.success) {
    const [firstIssue] = parsed.error.issues;
    return {
      status: "error",
      message: firstIssue?.message ?? "Formulaire invalide.",
    };
  }

  const apiKey = input.env.RESEND_API_KEY?.trim() ?? "";
  const audienceId = resolveAudienceId(parsed.data.source, input.env);
  if (!apiKey || !audienceId) {
    return { status: "error", message: newsletterMessages.unavailable };
  }

  try {
    const createContact = input.createContact ?? createResendContact;
    const { error } = await createContact({
      apiKey,
      email: parsed.data.email,
      audienceId,
    });

    if (error) {
      if (isDuplicateContactError(error)) {
        const updateContact = input.updateContact ?? updateResendContact;
        const { error: updateError } = await updateContact({
          apiKey,
          email: parsed.data.email,
          audienceId,
        });

        if (updateError) {
          return { status: "error", message: newsletterMessages.failed };
        }
        return { status: "success", message: newsletterMessages.duplicate };
      }
      return { status: "error", message: newsletterMessages.failed };
    }
  } catch {
    return { status: "error", message: newsletterMessages.failed };
  }

  return { status: "success", message: newsletterMessages.success };
}
