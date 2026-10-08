import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import type { ReactNode } from "react";

import { SiteHeader } from "@/components/site-header";
import { getSearchEntries } from "@/lib/dictionary";

import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
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
      className={`${outfit.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <NuqsAdapter>
          <SiteHeader entries={entries} />
          <main className="mx-auto w-full max-w-3xl px-4 py-8">{children}</main>
        </NuqsAdapter>
      </body>
    </html>
  );
}
