import { GitHub } from "@deemlol/next-icons";

import { OutboundLink } from "@/components/analytics/outbound-link";
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
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Dictionnaire · IA coding
        </p>
        <h1 className="max-w-xl text-[clamp(2rem,4.5vw,2.85rem)] leading-[1.12] font-semibold tracking-[-0.04em] text-balance">
          <span className="block">Le vocabulaire du code assisté par IA,</span>
          <span className="block text-muted-foreground">en français clair.</span>
        </h1>
        <p className="max-w-prose text-base leading-7 text-muted-foreground text-pretty">
          Définitions brèves des termes qui font cliquer le code agentique.
          Cherchez parmi les {entryCount} notions, ou entrez directement par une
          section.
        </p>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <GitHub
            size={16}
            strokeWidth={1.75}
            aria-hidden
            className="text-muted-foreground"
          />
          <OutboundLink
            href={SOURCE_GLOSSARY_URL}
            className="transition-colors hover:text-foreground"
          >
            chrisregis100/ai-dictionary
          </OutboundLink>
        </p>
      </div>
      <div className="flex items-center rounded-xl border border-border bg-card px-6 py-8 lg:px-10">
        <nav aria-label="Ancres des sections">
          <ul className="space-y-2 font-mono text-sm text-muted-foreground">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="transition-colors hover:text-accent"
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
