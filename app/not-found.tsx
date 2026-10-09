import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export function NotFound() {
  return (
    <div className={cn("space-y-10")}>
      <header className="flex max-w-xl flex-col gap-5">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
          Erreur 404
        </p>
        <h1 className="font-serif text-[clamp(2.15rem,5vw,3rem)] leading-[1.12] tracking-[-0.03em] text-ink">
          Page introuvable
        </h1>
        <p className="max-w-prose text-base leading-7 text-muted">
          Cette adresse ne correspond à aucune fiche ni page du dictionnaire.
        </p>
        <div className={cn("flex flex-wrap items-center gap-3")}>
          <Button asChild>
            <Link href="/" aria-label="Retourner à l'accueil du dictionnaire">
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button asChild variant="quiet">
            <Link href="/recherche" aria-label="Chercher une notion">
              Chercher une notion
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
}

export default NotFound;
