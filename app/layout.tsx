import { StackProvider, StackTheme } from "@stackframe/stack";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

import { UmamiAnalytics } from "@/components/analytics/umami-analytics";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/site-header";
import { getSearchEntries } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";
import { themeInitScript } from "@/lib/theme";
import { stackServerApp } from "@/stack";

import "./globals.css";

const outfit = localFont({
  src: "../assets/fonts/Outfit-Variable.woff2",
  weight: "100 900",
  variable: "--font-outfit",
  display: "swap",
  adjustFontFallback: "Arial",
});

const fraunces = localFont({
  src: [
    {
      path: "../assets/fonts/Fraunces-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
    {
      path: "../assets/fonts/Fraunces-Variable-Italic.woff2",
      weight: "100 900",
      style: "italic",
    },
  ],
  variable: "--font-fraunces",
  display: "swap",
  adjustFontFallback: "Times New Roman",
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
    "développement assisté par IA",
    "AI coding",
    "dictionnaire IA",
    "vocabulaire IA",
    "intelligence artificielle",
    "agent IA",
    "LLM",
    "prompt",
    "MCP",
    "blog IA",
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
        <StackProvider app={stackServerApp}>
          <StackTheme>
            <NuqsAdapter>
              <SiteHeader entries={entries} />
              <main className="w-full flex-1">{children}</main>
              <SiteFooter />
            </NuqsAdapter>
          </StackTheme>
        </StackProvider>
        <UmamiAnalytics />
      </body>
    </html>
  );
}
