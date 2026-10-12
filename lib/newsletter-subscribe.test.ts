import { beforeEach, describe, expect, it, vi } from "vitest";

import { newsletterMessages, submitNewsletterSubscription } from "@/lib/newsletter-subscribe";
import { resetNewsletterRateLimit } from "@/lib/newsletter-rate-limit";

const configuredEnv = {
  RESEND_API_KEY: "re_test_key",
  RESEND_AUDIENCE_ID: "aud-newsletter",
  RESEND_AUDIENCE_ID_BUILD: "aud-build",
  RESEND_AUDIENCE_ID_FORMATIONS: "aud-formations",
};

function submission(
  overrides: Partial<Parameters<typeof submitNewsletterSubscription>[0]> = {},
) {
  return submitNewsletterSubscription({
    email: "ada@example.com",
    consent: "true",
    source: "newsletter",
    website: "",
    forwardedFor: "203.0.113.10",
    realIp: null,
    env: configuredEnv,
    now: 1_000,
    createContact: vi.fn(async () => ({ error: null })),
    ...overrides,
  });
}

describe("submitNewsletterSubscription", () => {
  beforeEach(() => {
    resetNewsletterRateLimit();
  });

  it("refuse une adresse vide", async () => {
    const createContact = vi.fn();
    const result = await submission({ email: "   ", createContact });

    expect(result).toEqual({
      status: "error",
      message: newsletterMessages.missingEmail,
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("refuse une adresse invalide", async () => {
    const createContact = vi.fn();
    const result = await submission({ email: "pas-un-email", createContact });

    expect(result).toEqual({
      status: "error",
      message: newsletterMessages.invalidEmail,
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("refuse l'inscription sans consentement explicite", async () => {
    const createContact = vi.fn();
    const missing = await submission({ consent: null, createContact });
    const unchecked = await submission({ consent: "false", createContact });

    expect(missing).toEqual({
      status: "error",
      message: newsletterMessages.missingConsent,
    });
    expect(unchecked.status).toBe("error");
    expect(createContact).not.toHaveBeenCalled();
  });

  it("inscrit l'adresse et n'envoie que l'e-mail à Resend", async () => {
    const createContact = vi.fn(async () => ({ error: null }));
    const result = await submission({ createContact });

    expect(result).toEqual({
      status: "success",
      message: newsletterMessages.success,
    });
    expect(createContact).toHaveBeenCalledExactlyOnceWith({
      apiKey: "re_test_key",
      email: "ada@example.com",
      audienceId: "aud-newsletter",
    });
  });

  it("route les listes d'attente vers leur audience", async () => {
    const createContact = vi.fn(async () => ({ error: null }));
    await submission({ source: "build", createContact });
    await submission({
      source: "formations",
      email: "grace@example.com",
      createContact,
    });

    expect(createContact).toHaveBeenNthCalledWith(1, {
      apiKey: "re_test_key",
      email: "ada@example.com",
      audienceId: "aud-build",
    });
    expect(createContact).toHaveBeenNthCalledWith(2, {
      apiKey: "re_test_key",
      email: "grace@example.com",
      audienceId: "aud-formations",
    });
  });

  it("répond en erreur quand Resend n'est pas configuré", async () => {
    const createContact = vi.fn();
    const missingKey = await submission({
      env: { RESEND_AUDIENCE_ID: "aud-newsletter" },
      createContact,
    });
    const missingAudience = await submission({
      env: { RESEND_API_KEY: "re_test_key" },
      createContact,
      email: "grace@example.com",
    });

    expect(missingKey).toEqual({
      status: "error",
      message: newsletterMessages.unavailable,
    });
    expect(missingAudience).toEqual({
      status: "error",
      message: newsletterMessages.unavailable,
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("remonte une erreur fournisseur sans inscrire", async () => {
    const createContact = vi.fn(async () => ({
      error: { name: "validation_error", message: "Audience not found" },
    }));
    const result = await submission({ createContact });

    expect(result).toEqual({
      status: "error",
      message: newsletterMessages.failed,
    });
  });

  it("traite un contact déjà présent comme un succès", async () => {
    const createContact = vi.fn(async () => ({
      error: { name: "validation_error", message: "Contact already exists" },
    }));
    const result = await submission({ createContact });

    expect(result).toEqual({
      status: "success",
      message: newsletterMessages.duplicate,
    });
  });

  it("n'appelle pas Resend quand le honeypot est rempli", async () => {
    const createContact = vi.fn();
    const result = await submission({
      website: "https://spam.example",
      env: {},
      createContact,
    });

    expect(result).toEqual({
      status: "success",
      message: newsletterMessages.success,
    });
    expect(createContact).not.toHaveBeenCalled();
  });

  it("limite les tentatives répétées pour une même adresse", async () => {
    const createContact = vi.fn(async () => ({ error: null }));

    for (let attempt = 0; attempt < 5; attempt += 1) {
      const result = await submission({ createContact, now: 5_000 + attempt });
      expect(result.status).toBe("success");
    }

    const blocked = await submission({ createContact, now: 5_010 });
    expect(blocked).toEqual({
      status: "error",
      message: newsletterMessages.rateLimited,
    });
    expect(createContact).toHaveBeenCalledTimes(5);
  });
});
