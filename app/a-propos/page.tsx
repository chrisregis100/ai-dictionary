import type { Metadata } from "next";

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
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
      <article className="h-full max-w-prose space-y-12 text-base leading-7">
        <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.04em]">
          À propos
        </h1>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            La mission
          </h2>
          <p className="text-pretty">
            {siteConfig.name} aide les développeurs à maîtriser le développement
            assisté par IA. Les outils, les docs et les conversations se passent
            en anglais ; la plateforme explique en français clair ce qu&apos;ils
            font, sans traduire les termes qui comptent.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Le dictionnaire
          </h2>
          <p className="text-pretty">
            Le dictionnaire reprend l&apos;ordre et les termes du glossaire{" "}
            <OutboundLink
              className="font-medium text-accent underline-offset-4 hover:underline"
              href={siteConfig.upstreamUrl}
            >
              dictionary-of-ai-coding
            </OutboundLink>{" "}
            de Matt Pocock. Les explications françaises sont une réécriture
            originale
          </p>
          <p className="text-pretty">
            Les noms de notions restent en anglais — Token, Harness, MCP — parce
            que ce sont les mots que tu croises dans les outils. Le français
            sert à dire ce qu&apos;ils font.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">
            Qui l&apos;a fait
          </h2>
          <p className="text-pretty">
            Cette plateforme est faite par {siteConfig.author}. Le code et les
            fiches sont sur{" "}
            <OutboundLink
              className="font-medium text-accent underline-offset-4 hover:underline"
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
