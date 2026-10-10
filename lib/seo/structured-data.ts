import { dictionaryModule } from "@/lib/modules/dictionary";
import { absoluteUrl, siteConfig } from "@/lib/site";

export const SEARCH_QUERY_PARAM = "q";
export const DEFINED_TERM_SET_ID = absoluteUrl(
  `${dictionaryModule.basePath}#glossary`,
);
export const WEBSITE_ID = absoluteUrl("/#website");

export interface StructuredTermInput {
  term: string;
  slug: string;
  description: string;
  sourceTerm: string;
}

export interface SchemaOrganization {
  "@type": "Organization";
  name: string;
  url: string;
}

export interface SchemaEntryPoint {
  "@type": "EntryPoint";
  urlTemplate: string;
}

export interface SchemaSearchAction {
  "@type": "SearchAction";
  target: SchemaEntryPoint;
  "query-input": string;
}

export interface SchemaWebSite {
  "@context": "https://schema.org";
  "@type": "WebSite";
  "@id": string;
  name: string;
  url: string;
  description: string;
  inLanguage: "fr-FR";
  publisher: SchemaOrganization;
  potentialAction: SchemaSearchAction;
}

export interface SchemaDefinedTerm {
  "@context"?: "https://schema.org";
  "@type": "DefinedTerm";
  "@id": string;
  name: string;
  description: string;
  url: string;
  alternateName?: string;
  inDefinedTermSet?: string;
  inLanguage?: "fr-FR";
}

export interface SchemaDefinedTermSet {
  "@context": "https://schema.org";
  "@type": "DefinedTermSet";
  "@id": string;
  name: string;
  description: string;
  url: string;
  inLanguage: "fr-FR";
  hasDefinedTerm: SchemaDefinedTerm[];
}

export interface SchemaListItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

export interface SchemaBreadcrumbList {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: SchemaListItem[];
}

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export function termAbsoluteUrl(slug: string): string {
  return absoluteUrl(`${dictionaryModule.basePath}/${slug}`);
}

function buildTermRef(entry: StructuredTermInput): SchemaDefinedTerm {
  const url = termAbsoluteUrl(entry.slug);
  return {
    "@type": "DefinedTerm",
    "@id": url,
    name: entry.term,
    description: entry.description,
    url,
  };
}

export interface SchemaOrganizationStandalone extends SchemaOrganization {
  "@context": "https://schema.org";
  "@id": string;
  description: string;
  sameAs: string[];
}

export function buildOrganizationSchema(): SchemaOrganizationStandalone {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    sameAs: [siteConfig.githubUrl],
  };
}

export function buildWebSiteSchema(): SchemaWebSite {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "fr-FR",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${absoluteUrl(`${dictionaryModule.basePath}/recherche`)}?${SEARCH_QUERY_PARAM}={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildDefinedTermSetSchema(
  entries: readonly StructuredTermInput[],
): SchemaDefinedTermSet {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "@id": DEFINED_TERM_SET_ID,
    name: dictionaryModule.name,
    description: dictionaryModule.description,
    url: absoluteUrl(dictionaryModule.basePath),
    inLanguage: "fr-FR",
    hasDefinedTerm: entries.map(buildTermRef),
  };
}

export function buildDefinedTermSchema(
  entry: StructuredTermInput,
  sectionTitle: string,
): SchemaDefinedTerm {
  void sectionTitle;
  const url = termAbsoluteUrl(entry.slug);
  const schema: SchemaDefinedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "@id": url,
    name: entry.term,
    description: entry.description,
    url,
    inDefinedTermSet: DEFINED_TERM_SET_ID,
    inLanguage: "fr-FR",
  };

  if (entry.sourceTerm !== entry.term) {
    schema.alternateName = entry.sourceTerm;
  }

  return schema;
}

export function buildBreadcrumbSchema(
  items: readonly BreadcrumbItem[],
): SchemaBreadcrumbList {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
