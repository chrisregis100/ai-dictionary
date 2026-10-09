import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

import { UmamiAnalytics } from "@/components/analytics/umami-analytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/site-header";
import { getSearchEntries } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  publisher: siteConfig.author,
  keywords: [
    "dictionnaire IA",
    "vocabulaire IA",
    "AI coding",
    "glossaire",
    "intelligence artificielle",
    "token",
    "agent IA",
    "LLM",
    "prompt",
    "codage assisté par IA",
    "MCP",
  ],
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: "/" },
  formatDetection: { telephone: false },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const entries = getSearchEntries();

  return (
    <html
      lang="fr"
      className={`${outfit.variable} ${fraunces.variable} min-h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="flex min-h-dvh flex-col">
        <NuqsAdapter>
          <SiteHeader entries={entries} />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-6 lg:py-10">
            {children}
          </main>
          <SiteFooter />
        </NuqsAdapter>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
