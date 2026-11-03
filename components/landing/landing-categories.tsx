import { ArrowUpRight } from "@deemlol/next-icons";
import Link from "next/link";

import { TermLink } from "@/components/analytics/term-link";
import { curriculum, type SectionId } from "@/content/curriculum";
import { getEntries } from "@/lib/dictionary";
import { cn } from "@/lib/utils";

const exampleSlugs: Record<SectionId, [string, string, string]> = {
  model: ["ai", "model", "token"],
  sessions: ["stateless", "context", "context-window"],
  tools: ["tool", "mcp", "filesystem"],
  failures: ["hallucination", "sycophancy", "knowledge-cutoff"],
  handoffs: ["handoff", "spec", "ticket"],
  memory: ["skill", "subagent", "agents-md"],
  patterns: ["human-in-the-loop", "human-review", "automated-check"],
};

export function LandingCategories() {
  const labels = new Map(
    getEntries().map((entry) => [entry.slug, entry.term] as const),
  );

  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="font-mono text-sm text-accent">01 — 07</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
            Sept sections pour lire le dictionnaire.
          </h2>
          <p className="text-muted-foreground text-pretty">
            Le même découpage que la page dictionnaire : du modèle aux façons
            de travailler, chaque notion a sa place.
          </p>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {curriculum.map((section, index) => {
            const number = String(index + 1).padStart(2, "0");
            const href = `/dictionnaire#${section.id}`;

            return (
              <li key={section.id} className="group">
                <div
                  className={cn(
                    "grid gap-4 py-8",
                    "md:grid-cols-[5.5rem_minmax(0,1fr)_auto] md:items-start md:gap-8",
                  )}
                >
                  <p className="font-mono text-3xl font-semibold tracking-tight text-accent md:text-4xl">
                    {number}
                  </p>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight">
                      <Link
                        href={href}
                        className="rounded-sm transition-colors hover:text-accent"
                      >
                        {section.title}
                      </Link>
                    </h3>
                    <p className="max-w-xl text-sm leading-6 text-muted-foreground text-pretty">
                      {section.summary}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {exampleSlugs[section.id].map((slug) => (
                        <li key={slug}>
                          <TermLink
                            term={labels.get(slug) ?? slug}
                            slug={slug}
                            className="rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                          >
                            {labels.get(slug) ?? slug}
                          </TermLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    href={href}
                    className="inline-flex items-center gap-1 self-start text-sm text-muted-foreground transition-colors group-hover:text-accent"
                  >
                    Ouvrir
                    <ArrowUpRight size={14} strokeWidth={2} aria-hidden />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
