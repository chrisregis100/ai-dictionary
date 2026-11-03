import { ArrowRight, BookOpen, Check, Compass, Tool } from "@deemlol/next-icons";
import Link from "next/link";

import { TermLink } from "@/components/analytics/term-link";
import { cn } from "@/lib/utils";

const intentions = [
  {
    icon: BookOpen,
    title: "Comprendre ce que le modèle fait vraiment",
    problem:
      "Les réponses ont l’air sûres, mais d’où viennent-elles — et que coûte chaque appel ?",
    terms: [
      { label: "Next-token prediction", slug: "next-token-prediction" },
      { label: "Non-determinism", slug: "non-determinism" },
      { label: "Hallucination", slug: "hallucination" },
    ],
    href: "/dictionnaire#model",
    action: "Explorer la section Modèle",
  },
  {
    icon: Tool,
    title: "Configurer un agent et ses outils",
    problem:
      "Fichiers, commandes, MCP et permissions : brancher l’environnement sans tout casser.",
    terms: [
      { label: "MCP", slug: "mcp" },
      { label: "Tool call", slug: "tool-call" },
      { label: "Permission mode", slug: "permission-mode" },
    ],
    href: "/dictionnaire#tools",
    action: "Explorer la section Outils",
  },
  {
    icon: Check,
    title: "Livrer un code solide, relu par l’humain",
    problem:
      "Vérifications automatisées et revue humaine : savoir quand faire confiance et quand revérifier.",
    terms: [
      { label: "Human review", slug: "human-review" },
      { label: "Automated check", slug: "automated-check" },
      { label: "Human-in-the-loop", slug: "human-in-the-loop" },
    ],
    href: "/blog",
    action: "Lire les retours d’expérience",
  },
  {
    icon: Compass,
    title: "Automatiser le travail sur plusieurs fichiers",
    problem:
      "Specs, tickets et passations : garder le fil quand la session devient trop longue.",
    terms: [
      { label: "Spec", slug: "spec" },
      { label: "Ticket", slug: "ticket" },
      { label: "Handoff", slug: "handoff" },
    ],
    href: "/dictionnaire#handoffs",
    action: "Explorer la section Passations",
  },
] as const;

export function LandingIntentions() {
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="font-mono text-sm text-accent">Par où commencer</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
            Que voulez-vous accomplir ?
          </h2>
          <p className="text-muted-foreground text-pretty">
            Quatre situations de travail, les notions qui débloquent chacune
            — et où les lire.
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {intentions.map((intention) => (
            <li key={intention.title} className="h-full">
              <div className="glass-card flex h-full flex-col gap-4 rounded-2xl p-6">
                <span className="flex items-start justify-between gap-2">
                  <intention.icon
                    size={22}
                    strokeWidth={1.6}
                    aria-hidden
                    className="text-accent"
                  />
                </span>
                <span className="space-y-1">
                  <span className="block text-lg font-semibold tracking-tight">
                    {intention.title}
                  </span>
                  <span className="block text-sm leading-6 text-muted-foreground text-pretty">
                    {intention.problem}
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {intention.terms.map((term) => (
                    <TermLink
                      key={term.slug}
                      term={term.label}
                      slug={term.slug}
                      className="rounded-md border border-border bg-card px-2 py-1 text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-foreground"
                    >
                      {term.label}
                    </TermLink>
                  ))}
                </span>
                <Link
                  href={intention.href}
                  className={cn(
                    "mt-auto inline-flex items-center gap-1 text-sm font-medium",
                    "text-muted-foreground transition-colors hover:text-accent",
                  )}
                >
                  {intention.action}
                  <ArrowRight size={14} strokeWidth={2} aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
