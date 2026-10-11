import type { Metadata } from "next";

import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { siteConfig } from "@/lib/site";

const newsletterDescription =
  "La newsletter Dev Hero : le développement assisté par IA en français clair, directement dans ta boîte mail.";

export const metadata: Metadata = {
  title: "Newsletter",
  description: newsletterDescription,
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
      <div className="max-w-2xl space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Newsletter
          </p>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground text-balance">
            Reste à jour, en français.
          </h1>
          <p className="max-w-prose text-base leading-7 text-muted-foreground text-pretty">
            Les nouvelles notions du dictionnaire, les articles du blog et ce
            qui bouge dans le développement assisté par IA — expliqué en
            français clair par {siteConfig.author}. Pas de spam, désinscription
            en un clic.
          </p>
        </header>
        <NewsletterForm />
      </div>
    </div>
  );
}
