import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { EntryBody } from "@/components/entry-body";
import { RelatedTerms } from "@/components/related-terms";
import { UnderstoodButton } from "@/components/understood-button";
import { sectionById } from "@/content/curriculum";
import { getEntries, getEntry } from "@/lib/dictionary";

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
  if (!entry) return { title: "Notion introuvable" };
  return { title: entry.term, description: entry.description };
}

export default async function NotionPage({ params }: NotionPageProps) {
  const { slug } = await params;
  const entry = getEntry(slug);
  if (!entry) notFound();

  const section = sectionById(entry.section);
  const bySlug = new Map(getEntries().map((item) => [item.slug, item]));
  const related = entry.related.flatMap((relatedSlug) => {
    const target = bySlug.get(relatedSlug);
    return target
      ? [{ slug: target.slug, term: target.term, description: target.description }]
      : [];
  });

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <p className="text-sm text-muted">
          <Link href="/" className="hover:text-clay-deep">
            Parcours
          </Link>
          <span aria-hidden> · </span>
          {section.title}
        </p>
        <h1 className="font-serif text-4xl text-ink sm:text-5xl">{entry.term}</h1>
        <p className="max-w-prose text-lg leading-8 text-ink/80">
          {entry.description}
        </p>
        <UnderstoodButton slug={entry.slug} />
      </header>
      <EntryBody markdown={entry.body} />
      <RelatedTerms terms={related} />
    </article>
  );
}
