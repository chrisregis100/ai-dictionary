import { ArrowRight, ArrowUpRight, Search } from "@deemlol/next-icons";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { curriculum } from "@/content/curriculum";
import { getPublishedPosts } from "@/lib/blog/queries";
import { dictionaryModule } from "@/lib/modules/dictionary";
import { cn } from "@/lib/utils";

interface LandingHeroProps {
  entryCount: number;
}

export function LandingHero({ entryCount }: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="hero-grid pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div
        className="hero-glow pointer-events-none absolute inset-0"
        aria-hidden
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 pt-14 pb-12 lg:px-6 lg:pt-20 lg:pb-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="text-[clamp(2.35rem,5.4vw,4.15rem)] leading-[1.04] font-semibold tracking-[-0.04em] text-balance">
            Les fondamentaux du génie logiciel{" "}
            <span className="text-accent">ne sont pas obsolètes.</span>
          </h1>
          <p className="max-w-prose text-lg leading-8 text-muted-foreground text-pretty">
            Dev Hero t&apos;aide à maîtriser le développement assisté par IA :
            un dictionnaire de référence en français clair, un blog, et bientôt
            des outils et des formations. Les termes anglais restent les termes
            — on explique ce qu&apos;ils font.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <Link href={dictionaryModule.basePath}>
                Explorer le dictionnaire
                <ArrowRight size={16} strokeWidth={2} aria-hidden />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/outils/dev-hero-build">
                Découvrir Dev Hero Build
                <ArrowUpRight size={16} strokeWidth={2} aria-hidden />
              </Link>
            </Button>
          </div>
          <Link
            href="/dictionnaire/recherche"
            aria-label="Rechercher une notion dans le dictionnaire"
            className="group flex w-full max-w-xl items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-colors hover:border-accent/40"
          >
            <Search
              size={17}
              strokeWidth={1.75}
              aria-hidden
              className="shrink-0 text-muted-foreground"
            />
            <span className="flex-1 truncate font-mono text-sm text-muted-foreground">
              token, cache, effort…
            </span>
            <kbd className="inline-flex shrink-0 items-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground">
              ⌘K
            </kbd>
          </Link>
        </div>
      </div>
      <dl className="relative mx-auto grid w-full max-w-6xl grid-cols-2 border-y border-border px-4 sm:grid-cols-4 lg:px-6">
        <div className={cn("border-border px-4 py-5 sm:py-6", "border-r")}>
          <dt className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Notions
          </dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
            {entryCount}+
          </dd>
        </div>
        <div className={cn("border-border px-4 py-5 sm:py-6", "sm:border-r")}>
          <dt className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Sections
          </dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
            {curriculum.length}
          </dd>
        </div>
        <div
          className={cn(
            "border-border px-4 py-5 sm:py-6",
            "border-t border-r sm:border-t-0",
          )}
        >
          <dt className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Articles
          </dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight tabular-nums sm:text-2xl">
            <Suspense fallback="—">
              <PublishedPostCount />
            </Suspense>
          </dd>
        </div>
        <div className="border-t border-border px-4 py-5 sm:border-t-0 sm:py-6">
          <dt className="text-[0.7rem] tracking-wide text-muted-foreground uppercase">
            Open source
          </dt>
          <dd className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            100%
          </dd>
        </div>
      </dl>
    </section>
  );
}

async function PublishedPostCount() {
  await connection();
  const posts = await getPublishedPosts();
  return posts.length > 0 ? `${posts.length}+` : "—";
}
