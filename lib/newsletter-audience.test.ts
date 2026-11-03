import { describe, expect, it } from "vitest";

import {
  isDuplicateContactError,
  isHoneypotFilled,
  newsletterSourceSchema,
  resolveAudienceId,
} from "@/lib/newsletter-audience";

describe("newsletterSourceSchema", () => {
  it("accepte les valeurs valides", () => {
    expect(newsletterSourceSchema.parse("newsletter")).toBe("newsletter");
    expect(newsletterSourceSchema.parse("build")).toBe("build");
    expect(newsletterSourceSchema.parse("formations")).toBe("formations");
  });

  it("repli sur 'newsletter' pour une valeur invalide", () => {
    expect(newsletterSourceSchema.parse("unknown")).toBe("newsletter");
    expect(newsletterSourceSchema.parse("")).toBe("newsletter");
    expect(newsletterSourceSchema.parse(123)).toBe("newsletter");
  });

  it("repli sur 'newsletter' si absent ou null", () => {
    expect(newsletterSourceSchema.parse(null)).toBe("newsletter");
    expect(newsletterSourceSchema.parse(undefined)).toBe("newsletter");
  });
});

describe("resolveAudienceId", () => {
  const base = { RESEND_AUDIENCE_ID: "aud-base" } as const;
  const full = {
    RESEND_AUDIENCE_ID: "aud-base",
    RESEND_AUDIENCE_ID_BUILD: "aud-build",
    RESEND_AUDIENCE_ID_FORMATIONS: "aud-formations",
  } as const;

  describe("source newsletter", () => {
    it("retourne l'audience de base", () => {
      expect(resolveAudienceId("newsletter", base)).toBe("aud-base");
      expect(resolveAudienceId("newsletter", full)).toBe("aud-base");
    });
  });

  describe("source build", () => {
    it("retourne l'audience dédiée si configurée", () => {
      expect(resolveAudienceId("build", full)).toBe("aud-build");
    });

    it("repli sur l'audience de base si RESEND_AUDIENCE_ID_BUILD absent", () => {
      expect(resolveAudienceId("build", base)).toBe("aud-base");
    });

    it("repli sur l'audience de base si la variable dédiée est vide", () => {
      expect(
        resolveAudienceId("build", {
          RESEND_AUDIENCE_ID: "aud-base",
          RESEND_AUDIENCE_ID_BUILD: "  ",
        }),
      ).toBe("aud-base");
    });
  });

  describe("source formations", () => {
    it("retourne l'audience dédiée si configurée", () => {
      expect(resolveAudienceId("formations", full)).toBe("aud-formations");
    });

    it("repli sur l'audience de base si RESEND_AUDIENCE_ID_FORMATIONS absent", () => {
      expect(resolveAudienceId("formations", base)).toBe("aud-base");
    });
  });

  describe("aucune audience configurée", () => {
    it("retourne null pour toutes les sources", () => {
      expect(resolveAudienceId("newsletter", {})).toBeNull();
      expect(resolveAudienceId("build", {})).toBeNull();
      expect(resolveAudienceId("formations", {})).toBeNull();
    });
  });
});

describe("isDuplicateContactError", () => {
  it("reconnaît un contact déjà présent", () => {
    expect(
      isDuplicateContactError({
        name: "validation_error",
        message: "Contact already exists",
      }),
    ).toBe(true);
    expect(
      isDuplicateContactError({
        name: "email_already_exists",
        message: "Email already exists",
      }),
    ).toBe(true);
  });

  it("laisse passer les autres erreurs de validation", () => {
    expect(
      isDuplicateContactError({
        name: "validation_error",
        message: "Audience not found",
      }),
    ).toBe(false);
    expect(
      isDuplicateContactError({
        name: "missing_required_field",
        message: "Missing `email` field.",
      }),
    ).toBe(false);
  });
});

describe("isHoneypotFilled", () => {
  it("retourne false si le champ est vide", () => {
    expect(isHoneypotFilled("")).toBe(false);
  });

  it("retourne false si le champ est null ou undefined", () => {
    expect(isHoneypotFilled(null)).toBe(false);
    expect(isHoneypotFilled(undefined)).toBe(false);
  });

  it("retourne true si le champ contient une valeur (bot)", () => {
    expect(isHoneypotFilled("http://spam.com")).toBe(true);
    expect(isHoneypotFilled("anything")).toBe(true);
    expect(isHoneypotFilled(" ")).toBe(true);
  });
});
