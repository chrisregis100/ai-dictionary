import { ArrowRight } from "@deemlol/next-icons";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "01",
    name: "Specify",
    description: "Décrire le besoin : périmètre, contraintes, critères de succès.",
  },
  {
    number: "02",
    name: "Plan",
    description: "Découper le travail en étapes vérifiables.",
  },
  {
    number: "03",
    name: "Approve",
    description: "Valider le plan avant d'écrire la moindre ligne de code.",
  },
  {
    number: "04",
    name: "Implement",
    description: "Implémenter par petits incréments, relus au fil de l'eau.",
  },
  {
    number: "05",
    name: "Verify",
    description: "Tester et vérifier chaque artefact produit.",
  },
  {
    number: "06",
    name: "Review",
    description: "Relire, confronter au besoin, corriger.",
  },
  {
    number: "07",
    name: "Deliver",
    description: "Livrer des artefacts consultables, traçables, validés par un humain.",
  },
] as const;

export function LandingBuild() {
  return (
    <section
      id="dev-hero-build"
      className="scroll-mt-20 border-b border-border bg-surface/40"
    >
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-10 max-w-2xl space-y-3">
          <p className="flex flex-wrap items-center gap-2 font-mono text-sm text-accent">
            Dev Hero Build
            <Badge tone="muted">Liste d&apos;attente</Badge>
          </p>
          <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
            Une Software Factory méthodique.
          </h2>
          <p className="text-muted-foreground text-pretty">
            Dev Hero Build n&apos;est pas encore disponible. La méthode est
            décrite ci-dessous ; la liste d&apos;attente sert à être prévenu du
            lancement, sans promesse de disponibilité immédiate. En attendant,
            la rigueur du cycle s&apos;applique déjà à chaque fiche du
            dictionnaire.
          </p>
        </div>
        <ol className="grid gap-2">
          {steps.map((step) => (
            <li
              key={step.number}
              className="glass-card flex items-baseline gap-4 rounded-2xl px-5 py-4"
            >
              <span
                aria-hidden
                className="shrink-0 font-mono text-sm text-accent"
              >
                {step.number}
              </span>
              <span className="shrink-0 font-semibold tracking-tight">
                {step.name}
              </span>
              <span className="text-sm leading-6 text-muted-foreground text-pretty">
                {step.description}
              </span>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/newsletter?source=build">
              Être prévenu du lancement
              <ArrowRight size={16} strokeWidth={2} aria-hidden />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
