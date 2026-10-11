import { ArrowRight, Sparkles } from "@deemlol/next-icons";
import Link from "next/link";

import { dictionaryModule } from "@/lib/modules/dictionary";

export function AnnouncementBanner() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-6 lg:px-6">
      <p className="flex justify-center">
        <Link
          href={dictionaryModule.basePath}
          className="group inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-accent/40 hover:text-foreground"
        >
          <Sparkles
            size={13}
            strokeWidth={2}
            aria-hidden
            className="shrink-0 text-accent"
          />
          <span className="truncate">
            Dev Hero — dictionnaire, blog et ressources pour le dev assisté
            par IA
          </span>
          <ArrowRight
            size={13}
            strokeWidth={2}
            aria-hidden
            className="shrink-0 transition-transform group-hover:translate-x-0.5"
          />
        </Link>
      </p>
    </div>
  );
}
