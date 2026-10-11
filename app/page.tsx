/**
 * THESIS: A waxed-black reference desk for AI vocabulary — the dictionary
 * itself is the product, not a SaaS metric hero.
 * OWN-WORLD: Near-black wax, glossy cards, metallic rims, molten orange.
 * STORY: This is the French AI vocabulary of record; it is free; go explore.
 * FIRST VIEWPORT: Announcement strip, then headline + CTAs beside a glossy
 * terminal folio of a real entry, with a metrics bar underneath.
 * FORM: AI Hero structure dressed in Noir Ciré.
 */
import type { Metadata } from "next";

import { LandingBuild } from "@/components/landing/landing-build";
import { LandingCategories } from "@/components/landing/landing-categories";
import { LandingCta } from "@/components/landing/landing-cta";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingIntentions } from "@/components/landing/landing-intentions";
import { LandingManifesto } from "@/components/landing/landing-manifesto";
import { LandingPaths } from "@/components/landing/landing-paths";
import { LandingPosts } from "@/components/landing/landing-posts";
import { LandingTerms } from "@/components/landing/landing-terms";
import { JsonLd } from "@/components/seo/json-ld";
import { getEntries } from "@/lib/dictionary";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site";

const FEATURED_SLUGS = [
  "token",
  "context-window",
  "agent",
  "mcp",
  "system-prompt",
  "harness",
  "hallucination",
  "skill",
] as const;

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: `${siteConfig.name} — le développement assisté par IA, en français clair`,
    },
    description: siteConfig.description,
    alternates: { canonical: "/" },
  };
}

export default function HomePage() {
  const entries = getEntries();
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const entry = bySlug.get(slug);
    return entry ? [entry] : [];
  });

  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      {/* <AnnouncementBanner /> */}
      <LandingHero entryCount={entries.length} />
      <LandingManifesto />
      <LandingPaths />
      <LandingCategories />
      <LandingIntentions />
      <LandingTerms entries={featured} />
      <LandingBuild />
      <LandingPosts />
      <LandingCta />
    </>
  );
}
