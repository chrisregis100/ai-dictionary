import { ArrowRight, BookOpen, Compass, Tool, Users } from "@deemlol/next-icons";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const pillars = [
  {
    number: "01",
    icon: BookOpen,
    title: "Learn",
    role: "Comprendre et progresser.",
    deliverables: ["Dictionnaire IA", "Blog", "Guides"],
    href: "/dictionnaire",
    action: "Explorer le dictionnaire",
    badge: null,
  },
  {
    number: "02",
    icon: Tool,
    title: "Build",
    role: "Produire avec méthode et outils.",
    deliverables: ["Dev Hero Build", "Workflows", "Dépôts"],
    href: "#dev-hero-build",
    action: "Découvrir Dev Hero Build",
    badge: "Liste d'attente",
  },
  {
    number: "03",
    icon: Compass,
    title: "Apply",
    role: "Mettre en pratique sur du réel.",
    deliverables: ["Tutoriels", "Démos", "Retours d'expérience"],
    href: "/blog",
    action: "Lire le blog",
    badge: null,
  },
  {
    number: "04",
    icon: Users,
    title: "Connect",
    role: "Rester informé et contribuer.",
    deliverables: ["Newsletter", "Annonces", "GitHub"],
    href: "/newsletter",
    action: "S'inscrire à la newsletter",
    badge: null,
  },
] as const;

export function LandingPaths() {
  return (
    <section className="border-b border-border bg-surface/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="font-mono text-sm text-accent">Les quatre piliers</p>
          <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
            Une méthode, pas juste un outil.
          </h2>
          <p className="text-muted-foreground text-pretty">
            Quatre piliers pour passer de l&apos;usage ponctuel de l&apos;IA à
            une maîtrise structurée. Commence là où tu en es.
          </p>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          {pillars.map((pillar) => (
            <li key={pillar.number}>
              <Link
                href={pillar.href}
                className="group glass-card flex h-full flex-col gap-4 rounded-2xl p-6"
              >
                <span className="flex items-start justify-between gap-2">
                  <pillar.icon
                    size={22}
                    strokeWidth={1.6}
                    aria-hidden
                    className="text-accent"
                  />
                  <span className="flex items-center gap-2">
                    {pillar.badge ? (
                      <Badge tone="muted">{pillar.badge}</Badge>
                    ) : null}
                    <span
                      aria-hidden
                      className="font-mono text-sm text-muted-foreground"
                    >
                      {pillar.number}
                    </span>
                  </span>
                </span>
                <span className="space-y-1">
                  <span className="block text-lg font-semibold tracking-tight">
                    {pillar.title}
                  </span>
                  <span className="block text-sm leading-6 text-muted-foreground text-pretty">
                    {pillar.role}
                  </span>
                </span>
                <span className="flex flex-wrap gap-1.5">
                  {pillar.deliverables.map((item) => (
                    <Badge key={item} tone="muted">
                      {item}
                    </Badge>
                  ))}
                </span>
                <span
                  className={cn(
                    "mt-auto inline-flex items-center gap-1 text-sm font-medium",
                    "text-muted-foreground group-hover:text-accent",
                  )}
                >
                  {pillar.action}
                  <ArrowRight size={14} strokeWidth={2} aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
