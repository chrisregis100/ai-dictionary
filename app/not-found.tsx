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
    <div
      className={cn(
        "mx-auto w-full max-w-6xl space-y-10 px-4 py-10 lg:px-6 lg:py-14",
      )}
    >
      <header className="flex max-w-xl flex-col gap-5">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          Erreur 404
        </p>
        <h1 className="text-[clamp(2rem,4.5vw,2.85rem)] leading-[1.12] font-semibold tracking-[-0.04em] text-foreground">
          Page introuvable
        </h1>
        <p className="max-w-prose text-base leading-7 text-muted-foreground text-pretty">
          Cette adresse ne correspond à aucune page de la plateforme.
        </p>
        <div className={cn("flex flex-wrap items-center gap-3")}>
          <Button asChild>
            <Link href="/" aria-label="Retourner à l'accueil du dictionnaire">
              Retour à l&apos;accueil
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="/dictionnaire/recherche"
              aria-label="Chercher une notion"
            >
              Chercher une notion
            </Link>
          </Button>
        </div>
      </header>
    </div>
  );
}

export default NotFound;
