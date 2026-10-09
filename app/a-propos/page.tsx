import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "D'où viennent les notions, et pourquoi le texte français n'est pas une traduction du glossaire source.",
};

export default function AboutPage() {
  return (
    <article className="max-w-prose space-y-5 text-base leading-7">
      <p className="font-serif text-sm italic text-sage">¶ Notice</p>
      <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] tracking-[-0.03em] italic">
        À propos
      </h1>
      <p>
        Ce dictionnaire reprend l&apos;ordre et les termes de{" "}
        <a
          className="link-ink font-medium text-sage"
          href="https://github.com/mattpocock/dictionary-of-ai-coding"
        >
          dictionary-of-ai-coding
        </a>
        , le glossaire de Matt Pocock. Les explications françaises sont une
        réécriture originale. Le texte du dépôt source n&apos;est pas recopié.
      </p>
      <p>
        Les noms de notions restent en anglais — Token, Harness, MCP — parce
        que ce sont les mots que tu croises dans les outils, les docs et les
        conversations. Le français sert à dire ce qu&apos;ils font.
      </p>
      <p>
        Une fiche nouvelle est un fichier Markdown. Le site se reconstruit.
        <code className="mx-1 rounded-md bg-card px-1.5 py-0.5 text-sm ring-1 ring-line">
          pnpm content:upstream
        </code>
        signale les termes ajoutés ou retirés dans le glossaire source, sans
        en télécharger le corps. Les règles d&apos;écriture sont dans{" "}
        <code className="rounded-md bg-card px-1.5 py-0.5 text-sm ring-1 ring-line">
          CONTENT.md
        </code>
        .
      </p>
      <p className="ornament pt-6 text-xs" aria-hidden>
        ※
      </p>
    </article>
  );
}
