import type {
  SchemaBreadcrumbList,
  SchemaDefinedTerm,
  SchemaDefinedTermSet,
  SchemaWebSite,
} from "@/lib/seo/structured-data";

export interface JsonLdGraph {
  "@context"?: "https://schema.org";
  "@type": string;
}

export type JsonLdDocument =
  | SchemaWebSite
  | SchemaDefinedTermSet
  | SchemaDefinedTerm
  | SchemaBreadcrumbList
  | JsonLdGraph;

interface JsonLdProps {
  data: JsonLdDocument;
}

export function serializeJsonLd(data: JsonLdDocument): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
