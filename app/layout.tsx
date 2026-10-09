import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/site-header";
import { getSearchEntries } from "@/lib/dictionary";
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
  title: {
    default: "Dictionnaire d'IA coding",
    template: "%s · Dictionnaire d'IA coding",
  },
  description:
    "Le vocabulaire du codage avec l'IA, expliqué en français. Les termes anglais restent les termes.",
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
      <body className="flex min-h-full flex-col">
        <NuqsAdapter>
          <SiteHeader entries={entries} />
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 lg:px-6 lg:py-10">
            {children}
          </main>
          <SiteFooter />
        </NuqsAdapter>
      </body>
    </html>
  );
}
