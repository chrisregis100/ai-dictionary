import { GitHub } from "@deemlol/next-icons";

import type { SectionId } from "@/content/curriculum";

const SOURCE_GLOSSARY_URL = "https://github.com/chrisregis100/ai-dictionary";

interface DictionaryHeroProps {
  entryCount: number;
  sections: Array<{ id: SectionId; title: string }>;
}

export function DictionaryHero({ entryCount, sections }: DictionaryHeroProps) {
  return (
    <header className="grid gap-8 lg:grid-cols-2 lg:items-stretch">
      <div className="flex flex-col justify-center gap-5">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
          Dictionnaire · IA coding
        </p>
        <h1 className="max-w-xl font-serif text-[clamp(2.15rem,5vw,3rem)] leading-[1.12] tracking-[-0.03em] text-ink">
          <span className="block">Le vocabulaire du code assisté par IA,</span>
          <span className="block text-clay">en français clair.</span>
        </h1>
        <p className="max-w-prose text-base leading-7 text-muted">
          Définitions brèves des termes qui font cliquer le code agentique.
          Cherchez parmi les {entryCount} notions, ou entrez directement par une
          section.
        </p>
        <p className="flex items-center gap-2 text-sm text-muted">
          <GitHub
            size={16}
            strokeWidth={1.75}
            aria-hidden
            className="text-sage"
          />
          <a
            href={SOURCE_GLOSSARY_URL}
            className="link-ink text-sage"
            rel="noreferrer"
            target="_blank"
          >
            chrisregis100/ai-dictionary
          </a>
        </p>
      </div>
      <div className="hero-index-panel flex items-center rounded-2xl px-6 py-8 lg:px-10">
        <nav aria-label="Ancres des sections">
          <ul className="space-y-2 font-mono text-sm text-clay">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="link-ink"
                  aria-label={`Aller à la section ${section.title}`}
                >
                  #{section.id}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
