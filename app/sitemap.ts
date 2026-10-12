import type { MetadataRoute } from "next";

import { getEntryLastModified } from "@/lib/content-dates";
import { getEntries } from "@/lib/dictionary";
import { absoluteUrl } from "@/lib/site";

function sitemapEntry(
  path: string,
  options: {
    changeFrequency: NonNullable<
      MetadataRoute.Sitemap[number]["changeFrequency"]
    >;
    priority: number;
    lastModified?: Date;
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    ...(options.lastModified ? { lastModified: options.lastModified } : {}),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    sitemapEntry("/", { changeFrequency: "weekly", priority: 1 }),
    sitemapEntry("/dictionnaire", { changeFrequency: "weekly", priority: 0.9 }),
    sitemapEntry("/dictionnaire/recherche", {
      changeFrequency: "monthly",
      priority: 0.5,
    }),
    sitemapEntry("/blog", { changeFrequency: "weekly", priority: 0.8 }),
    sitemapEntry("/newsletter", { changeFrequency: "yearly", priority: 0.5 }),
    sitemapEntry("/a-propos", { changeFrequency: "yearly", priority: 0.3 }),
  ];

  const entryRoutes = getEntries().map((entry) =>
    sitemapEntry(`/dictionnaire/${entry.slug}`, {
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: getEntryLastModified(entry.slug),
    }),
  );

  return [...staticRoutes, ...entryRoutes];
}
