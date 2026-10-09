import { sectionById } from "@/content/curriculum";
import { OgEntryCard, OgFallbackCard } from "@/lib/og/cards";
import { renderOgImage } from "@/lib/og/render";
import { OG_CONTENT_TYPE, OG_SIZE } from "@/lib/og/theme";
import { getEntries, getEntry } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return getEntries().map((entry) => ({ slug: entry.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getEntry(slug);

  if (!entry) {
    return renderOgImage(
      <OgFallbackCard
        heading="Notion introuvable"
        detail={siteConfig.description}
      />,
    );
  }

  return renderOgImage(
    <OgEntryCard
      term={entry.term}
      sourceTerm={entry.sourceTerm}
      description={entry.description}
      sectionTitle={sectionById(entry.section).title}
    />,
  );
}
