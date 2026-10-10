import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CopyPageButton } from "@/components/copy-page-button";
import { EntryBody } from "@/components/entry-body";
import { RelatedTerms } from "@/components/related-terms";
import { JsonLd } from "@/components/seo/json-ld";
import { TermSidebar } from "@/components/term-sidebar";
import { curriculum, sectionById } from "@/content/curriculum";
import { getEntries, getEntry } from "@/lib/dictionary";
import {
  buildBreadcrumbSchema,
  buildDefinedTermSchema,
} from "@/lib/seo/structured-data";
import { absoluteUrl, siteConfig } from "@/lib/site";

interface NotionPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: NotionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) {
    return { title: "Notion introuvable", robots: { index: false } };
  }

  const sectionTitle = sectionById(entry.section).title;
  const canonicalPath = `/dictionnaire/${slug}`;
  const url = absoluteUrl(canonicalPath);
  const keywords = [...new Set([entry.term, entry.sourceTerm, sectionTitle])];

  return {
    title: entry.term,
    description: entry.description,
    alternates: { canonical: canonicalPath },
    keywords,
    openGraph: {
      type: "article",
      url,
      title: entry.term,
      description: entry.description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
    },
    twitter: {
      card: "summary_large_image",
      title: entry.term,
      description: entry.description,
    },
  };
}

export default async function NotionPage({ params }: NotionPageProps) {
  const { slug } = await params;
  const entries = getEntries();
  const entry = entries.find((item) => item.slug === slug);
  if (!entry) notFound();

  const bySlug = new Map(entries.map((item) => [item.slug, item]));
  const related = entry.related.flatMap((relatedSlug) => {
    const target = bySlug.get(relatedSlug);
    return target
      ? [{ slug: target.slug, term: target.term, description: target.description }]
      : [];
  });
  const navSections = curriculum.map((section) => ({
    id: section.id,
    title: section.title,
    terms: section.terms.flatMap((termSlug) => {
      const item = bySlug.get(termSlug);
      return item ? [{ slug: item.slug, term: item.term }] : [];
    }),
  }));
  const pageMarkdown = `# ${entry.term}\n\n${entry.description}\n\n${entry.body.trim()}\n`;
  const sectionTitle = sectionById(entry.section).title;

  return (
    <>
      <JsonLd data={buildDefinedTermSchema(entry, sectionTitle)} />
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Dictionnaire", path: "/dictionnaire" },
          { name: sectionTitle, path: `/dictionnaire#${entry.section}` },
          { name: entry.term, path: `/dictionnaire/${entry.slug}` },
        ])}
      />
      <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-10">
        <TermSidebar
          sections={navSections}
          currentSection={entry.section}
          currentSlug={entry.slug}
        />
        <article className="min-w-0 space-y-8 lg:border-l lg:border-line lg:pl-10">
          <header className="space-y-5">
            <h1 className="font-serif text-[clamp(2.6rem,7vw,4.4rem)] leading-[1.08] tracking-[-0.03em] text-ink">
              {entry.term}
            </h1>
            <p className="max-w-3xl text-xl leading-8 text-muted md:text-2xl">
              {entry.description}
            </p>
            <CopyPageButton markdown={pageMarkdown} />
          </header>
          <hr className="border-line" />
          <EntryBody markdown={entry.body} />
          <RelatedTerms terms={related} />
        </article>
      </div>
    </>
  );
}
