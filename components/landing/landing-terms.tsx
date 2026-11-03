import { ArrowRight } from "@deemlol/next-icons";
import Link from "next/link";

import { TermLink } from "@/components/analytics/term-link";
import { Badge } from "@/components/ui/badge";
import type { SectionId } from "@/content/curriculum";
import { dictionaryModule } from "@/lib/modules/dictionary";
import type { DictionaryEntry } from "@/lib/validate-dictionary";

const sectionBadges = {
  model: "Modèle",
  sessions: "Sessions",
  tools: "Outils",
  failures: "Échecs",
  handoffs: "Passations",
  memory: "Mémoire",
  patterns: "Pratiques",
} as const satisfies Record<SectionId, string>;

interface LandingTermsProps {
  entries: DictionaryEntry[];
}

export function LandingTerms({ entries }: LandingTermsProps) {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-sm text-accent">Dictionnaire</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
              Notions clés &amp; incontournables
            </h2>
          </div>
          <Link
            href={dictionaryModule.basePath}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            Tout le dictionnaire
            <ArrowRight size={14} strokeWidth={2} aria-hidden />
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {entries.map((entry) => (
            <li key={entry.slug}>
              <TermLink
                term={entry.term}
                slug={entry.slug}
                className="group glass-card flex h-full flex-col gap-3 rounded-2xl p-4"
              >
                <span className="flex items-start justify-between gap-2">
                  <span className="font-medium tracking-tight text-foreground">
                    {entry.term}
                  </span>
                  <Badge tone="muted" className="shrink-0">
                    {sectionBadges[entry.section]}
                  </Badge>
                </span>
                <span className="text-sm leading-6 text-muted-foreground text-pretty">
                  {entry.description}
                </span>
              </TermLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
