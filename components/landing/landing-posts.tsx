import { ArrowRight, BookOpen } from "@deemlol/next-icons";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import { formatPostDate } from "@/lib/blog/format";
import { getPublishedPosts, type Post } from "@/lib/blog/queries";
import { blogModule } from "@/lib/modules/blog";
import { cn } from "@/lib/utils";

export function LandingPosts() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-3">
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-sm text-accent">Blog</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
              Derniers retours d&rsquo;expérience
            </h2>
            <p className="max-w-prose text-sm leading-6 text-muted-foreground text-pretty">
              Ce qu&rsquo;on apprend en construisant avec l&rsquo;IA :
              méthodes, erreurs et retours terrain, en français clair.
            </p>
          </div>
          <Link
            href={blogModule.basePath}
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            Tous les articles
            <ArrowRight size={14} strokeWidth={2} aria-hidden />
          </Link>
        </div>
        <Suspense fallback={<LatestPostsSkeleton />}>
          <LatestPostList />
        </Suspense>
      </div>
    </section>
  );
}

function LatestPostsSkeleton() {
  return (
    <ul className="grid gap-4 md:grid-cols-3" aria-hidden>
      {["squelette-1", "squelette-2", "squelette-3"].map((key) => (
        <li
          key={key}
          className="glass-card animate-pulse rounded-2xl p-5"
        >
          <div className="h-3 w-24 rounded-full bg-muted" />
          <div className="mt-4 h-5 w-4/5 rounded-md bg-muted" />
          <div className="mt-2 h-4 w-full rounded-md bg-muted" />
          <div className="mt-1 h-4 w-2/3 rounded-md bg-muted" />
        </li>
      ))}
    </ul>
  );
}

async function LatestPostList() {
  await connection();
  const posts = await getPublishedPosts(3);

  if (posts.length === 0) {
    return (
      <div className="glass-card flex flex-col items-start gap-3 rounded-2xl p-6">
        <span className="inline-flex items-center justify-center rounded-xl border border-border bg-background p-2">
          <BookOpen
            size={18}
            strokeWidth={1.75}
            className="text-accent"
            aria-hidden
          />
        </span>
        <p className="text-sm leading-6 text-muted-foreground text-pretty">
          Les premiers retours d&rsquo;expérience arrivent bientôt. Inscris-toi
          à la newsletter pour être prévenu dès la publication.
        </p>
        <Link
          href="/newsletter"
          className="inline-flex items-center gap-1 text-sm text-foreground transition-colors hover:text-accent"
        >
          S&rsquo;inscrire à la newsletter
          <ArrowRight size={14} strokeWidth={2} aria-hidden />
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {posts.map((post) => (
        <LandingPostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}

function LandingPostCard({ post }: { post: Post }) {
  return (
    <li>
      <Link
        href={`/blog/${post.slug}`}
        className={cn(
          "glass-card group flex h-full flex-col gap-2 rounded-2xl p-5",
          "transition-colors hover:border-accent/40",
        )}
      >
        {post.publishedAt ? (
          <time
            dateTime={post.publishedAt.toISOString()}
            className="font-mono text-[0.7rem] tracking-wide text-accent uppercase"
          >
            {formatPostDate(post.publishedAt)}
          </time>
        ) : null}
        <h3 className="text-[1.05rem] leading-7 font-semibold tracking-tight text-foreground text-balance">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-sm leading-6 text-muted-foreground text-pretty">
          {post.excerpt}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 text-sm text-muted-foreground transition-colors group-hover:text-accent">
          Lire l&rsquo;article
          <ArrowRight size={14} strokeWidth={2} aria-hidden />
        </span>
      </Link>
    </li>
  );
}
