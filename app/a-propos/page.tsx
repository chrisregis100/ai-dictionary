import type { Metadata } from "next";
import Link from "next/link";

import { OutboundLink } from "@/components/analytics/outbound-link";
import { siteConfig } from "@/lib/site";

const aboutDescription =
  "La mission de Dev Hero, ce que contient la plateforme, et qui l'a faite.";

export const metadata: Metadata = {
  title: "À propos",
  description: aboutDescription,
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      <article className="h-full max-w-prose space-y-12 text-base leading-7">
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] tracking-[-0.03em] italic">
          À propos
        </h1>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl italic tracking-[-0.02em] text-ink">
            La mission
          </h2>
          <p>
            {siteConfig.name} aide les développeurs francophones à maîtriser le
            développement assisté par IA. Les outils, les docs et les
            conversations se passent en anglais ; la plateforme explique en
            français clair ce qu&apos;ils font, sans traduire les termes qui
            comptent.
          </p>
          <p>
            Tout part du contenu gratuit : un{" "}
            <Link href="/dictionnaire" className="link-ink font-medium text-sage">
              dictionnaire
            </Link>{" "}
            des notions du code assisté par IA, un{" "}
            <Link href="/blog" className="link-ink font-medium text-sage">
              blog
            </Link>{" "}
            d&apos;articles pratiques, et une{" "}
            <Link href="/newsletter" className="link-ink font-medium text-sage">
              newsletter
            </Link>{" "}
            pour suivre ce qui bouge.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl italic tracking-[-0.02em] text-ink">
            Le dictionnaire
          </h2>
          <p>
            Le dictionnaire reprend l&apos;ordre et les termes du glossaire{" "}
            <OutboundLink
              className="link-ink font-medium text-sage"
              href={siteConfig.upstreamUrl}
            >
              dictionary-of-ai-coding
            </OutboundLink>{" "}
            de Matt Pocock. Les explications françaises sont une réécriture
            originale : le texte du dépôt source n&apos;est pas recopié. Chaque
            fiche est un fichier Markdown validé au build, et le site se
            reconstruit à partir de ces fichiers.
          </p>
          <p>
            Les noms de notions restent en anglais — Token, Harness, MCP —
            parce que ce sont les mots que tu croises dans les outils. Le
            français sert à dire ce qu&apos;ils font.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-2xl italic tracking-[-0.02em] text-ink">
            Qui l&apos;a fait
          </h2>
          <p>
            Cette plateforme est faite par {siteConfig.author}. Le code et les
            fiches sont sur{" "}
            <OutboundLink
              className="link-ink font-medium text-sage"
              href={siteConfig.githubUrl}
            >
              GitHub
            </OutboundLink>
            .
          </p>
        </section>
      </article>
    </div>
  );
}
