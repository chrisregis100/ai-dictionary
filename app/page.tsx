import { ArrowRight, BookOpen, FileText, Sparkles } from "@deemlol/next-icons";
import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import { OutboundLink } from "@/components/analytics/outbound-link";
import { PostCard } from "@/components/blog/post-card";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { JsonLd } from "@/components/seo/json-ld";
import { Button } from "@/components/ui/button";
import { getPublishedPosts } from "@/lib/blog/queries";
import { getEntries } from "@/lib/dictionary";
import { blogModule } from "@/lib/modules/blog";
import { dictionaryModule } from "@/lib/modules/dictionary";
import {
  buildOrganizationSchema,
  buildWebSiteSchema,
} from "@/lib/seo/structured-data";
import { siteConfig } from "@/lib/site";

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: `${siteConfig.name} — le développement assisté par IA, en français clair`,
    },
    description: siteConfig.description,
    alternates: { canonical: "/" },
  };
}

function LandingHero({ entryCount }: { entryCount: number }) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-14 pb-16 lg:px-6 lg:pt-20">
      <div className="flex max-w-3xl flex-col gap-6">
        <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
          Dev Hero · développement assisté par IA
        </p>
        <h1 className="font-serif text-[clamp(2.6rem,7vw,4.6rem)] leading-[1.08] tracking-[-0.03em] text-ink">
          <span className="block">Deviens un héros du code</span>
          <span className="block text-clay">assisté par IA.</span>
        </h1>
        <p className="max-w-prose text-lg leading-8 text-muted">
          Les outils, les docs et les conversations se passent en anglais.
          {" "}{siteConfig.name} t&apos;explique en français clair comment les
          agents, les modèles et les workflows fonctionnent — et comment t&apos;en
          servir pour mieux coder.
        </p>
        <NewsletterForm />
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild variant="quiet">
            <Link href={dictionaryModule.basePath}>
              Explorer les {entryCount} notions
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function LandingVision() {
  return (
    <section className="border-y border-line bg-paper-sand">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 lg:grid-cols-2 lg:px-6">
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-ink">
          Le code assisté par IA bouge vite.
          <span className="block text-sage">En français, presque rien ne suit.</span>
        </h2>
        <div className="space-y-4 text-base leading-7 text-muted">
          <p>
            Tokens, agents, MCP, harness, context window : le vocabulaire et
            les pratiques changent tous les mois, et l&apos;essentiel des
            explications n&apos;existe qu&apos;en anglais.
          </p>
          <p>
            {siteConfig.name} construit le socle francophone : des définitions
            précises, des articles pratiques et des ressources qui gardent les
            termes anglais — parce que ce sont les mots que tu croises dans les
            outils — mais qui expliquent en français ce qu&apos;ils font.
          </p>
        </div>
      </div>
    </section>
  );
}

function LandingResources({ entryCount }: { entryCount: number }) {
  const resources = [
    {
      title: dictionaryModule.name,
      description: `${entryCount} notions du code assisté par IA, expliquées en français. Une URL par terme, validées au build.`,
      href: dictionaryModule.basePath,
      cta: "Ouvrir le dictionnaire",
      icon: BookOpen,
      available: true,
    },
    {
      title: blogModule.name,
      description: blogModule.description,
      href: blogModule.basePath,
      cta: "Lire le blog",
      icon: FileText,
      available: true,
    },
    {
      title: "Modules à venir",
      description:
        "Guides approfondis, ateliers et parcours pratiques. Inscris-toi à la newsletter pour être prévenu.",
      href: "/newsletter",
      cta: "Être prévenu",
      icon: Sparkles,
      available: false,
    },
  ] as const;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6">
      <div className="mb-8 max-w-2xl space-y-3">
        <p className="font-serif text-sm italic text-sage">¶ Ressources</p>
        <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-ink">
          Tout est gratuit, tout commence ici.
        </h2>
      </div>
      <ul className="grid gap-4 md:grid-cols-3">
        {resources.map((resource) => (
          <li
            key={resource.title}
            className="paper-card relative flex flex-col gap-3 rounded-2xl bg-card px-5 py-6"
          >
            <resource.icon
              size={22}
              strokeWidth={1.6}
              className="text-clay"
              aria-hidden
            />
            <h3 className="font-serif text-xl italic text-ink">
              <Link
                href={resource.href}
                className="after:absolute after:inset-0"
              >
                {resource.title}
              </Link>
            </h3>
            <p className="text-sm leading-6 text-muted">
              {resource.description}
            </p>
            <p className="mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-sage">
              {resource.available ? resource.cta : "À venir"}
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function LatestPostList() {
  await connection();
  const posts = await getPublishedPosts(3);

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl bg-paper-sand px-4 py-6 text-sm text-muted">
        Les premiers articles arrivent bientôt. Inscris-toi à la newsletter
        pour être prévenu.
      </p>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}

function LandingLatestPosts() {
  return (
    <section className="border-t border-line bg-paper-sand">
      <div className="mx-auto w-full max-w-6xl px-4 py-14 lg:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div className="space-y-3">
            <p className="font-serif text-sm italic text-sage">¶ Blog</p>
            <h2 className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-[1.15] tracking-[-0.02em] text-ink">
              Derniers articles
            </h2>
          </div>
          <Link href="/blog" className="link-ink text-sm text-sage">
            Tous les articles
          </Link>
        </div>
        <Suspense
          fallback={<p className="text-sm text-muted">Chargement des articles…</p>}
        >
          <LatestPostList />
        </Suspense>
      </div>
    </section>
  );
}

function LandingBio() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:px-6">
        <div className="space-y-3">
          <p className="font-serif text-sm italic text-sage">¶ Qui écrit ici</p>
          <h2 className="font-serif text-[clamp(1.8rem,4vw,2.4rem)] leading-[1.15] tracking-[-0.02em] text-ink">
            {siteConfig.author}
          </h2>
        </div>
        <div className="space-y-4 text-base leading-7 text-muted">
          <p>
            Développeur, je passe mes journées dans les outils de code assisté
            par IA — et mes soirées à documenter en français ce qu&apos;ils
            font vraiment. Chaque fiche du dictionnaire et chaque article du
            blog est écrit, relu et maintenu à la main.
          </p>
          <p>
            Le code de la plateforme est ouvert :{" "}
            <OutboundLink
              href={siteConfig.githubUrl}
              className="link-ink font-medium text-sage"
            >
              tout est sur GitHub
            </OutboundLink>
            .{" "}
            <Link href="/a-propos" className="link-ink font-medium text-sage">
              En savoir plus
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  const entryCount = getEntries().length;

  return (
    <>
      <JsonLd data={buildOrganizationSchema()} />
      <JsonLd data={buildWebSiteSchema()} />
      <LandingHero entryCount={entryCount} />
      <LandingVision />
      <LandingResources entryCount={entryCount} />
      <LandingLatestPosts />
      <LandingBio />
    </>
  );
}
