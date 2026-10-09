import type { Metadata } from "next";

import { OutboundLink } from "@/components/analytics/outbound-link";

const aboutDescription =
  "La mission du Dictionnaire d'IA coding, comment les fiches sont écrites, et qui l'a fait.";

export const metadata: Metadata = {
  title: "À propos",
  description: aboutDescription,
  alternates: { canonical: "/a-propos" },
};

export default function AboutPage() {
  return (
    <article className="max-w-prose h-full space-y-12 text-base leading-7">
      <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] tracking-[-0.03em] italic">
        À propos
      </h1>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl italic tracking-[-0.02em] text-ink">
          La mission
        </h2>
        <p>
          Ce dictionnaire rend lisible le vocabulaire du code assisté par IA. Il
          reprend l&apos;ordre et les termes du glossaire{" "}
          <OutboundLink
            className="link-ink font-medium text-sage"
            href="https://github.com/mattpocock/dictionary-of-ai-coding"
          >
            dictionary-of-ai-coding
          </OutboundLink>{" "}
          de Matt Pocock. Les explications françaises sont une réécriture
          originale : le texte du dépôt source n&apos;est pas recopié.
        </p>
        <p>
          Les noms de notions restent en anglais — Token, Harness, MCP — parce
          que ce sont les mots que tu croises dans les outils, les docs et les
          conversations. Le français sert à dire ce qu&apos;ils font.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl italic tracking-[-0.02em] text-ink">
          Comment ça marche
        </h2>
        <p>
          Chaque fiche est un fichier Markdown. Le site se reconstruit à partir
          de ces fichiers.
        </p>
        <p>
          <code className="mx-1 rounded-md bg-card px-1.5 py-0.5 text-sm ring-1 ring-line">
            pnpm content:upstream
          </code>{" "}
          signale les termes ajoutés ou retirés dans le glossaire source, sans
          en télécharger le corps. Les règles d&apos;écriture sont dans{" "}
          <code className="rounded-md bg-card px-1.5 py-0.5 text-sm ring-1 ring-line">
            CONTENT.md
          </code>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="font-serif text-2xl italic tracking-[-0.02em] text-ink">
          Qui l&apos;a fait
        </h2>
        <p>
          Ce projet est fait par Regis Kiki. Le code et les fiches sont sur{" "}
          <OutboundLink
            className="link-ink font-medium text-sage"
            href="https://github.com/chrisregis100/ai-dictionary"
          >
            GitHub
          </OutboundLink>
          .
        </p>
      </section>
    </article>
  );
}
