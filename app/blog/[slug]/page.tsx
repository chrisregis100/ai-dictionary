import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { EntryBody } from "@/components/entry-body";
import { formatPostDate } from "@/lib/blog/format";
import { getPublishedPostBySlug } from "@/lib/blog/queries";
import { siteConfig } from "@/lib/site";
import { absoluteUrl } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) {
    return { title: "Article introuvable", robots: { index: false } };
  }

  const canonicalPath = `/blog/${slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: canonicalPath },
    openGraph: {
      type: "article",
      url: absoluteUrl(canonicalPath),
      title: post.title,
      description: post.excerpt,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(post.publishedAt
        ? { publishedTime: post.publishedAt.toISOString() }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

async function PostArticle({ params }: BlogPostPageProps) {
  await connection();
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="max-w-prose space-y-8">
      <header className="space-y-4">
        <p className="text-sm text-muted-foreground">
          <Link href="/blog" className="transition-colors hover:text-foreground">
            ← Tous les articles
          </Link>
        </p>
        {post.publishedAt ? (
          <time
            dateTime={post.publishedAt.toISOString()}
            className="block text-xs font-medium tracking-wide text-muted-foreground"
          >
            {formatPostDate(post.publishedAt)}
          </time>
        ) : null}
        <h1 className="text-[clamp(2.2rem,5vw,3.4rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground text-balance">
          {post.title}
        </h1>
        <p className="max-w-prose text-lg leading-8 text-muted-foreground text-pretty">
          {post.excerpt}
        </p>
      </header>
      <hr className="border-border" />
      <EntryBody markdown={post.contentMd} />
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      <Suspense
        fallback={<p className="text-sm text-muted-foreground">Chargement de l&apos;article…</p>}
      >
        <PostArticle params={params} />
      </Suspense>
    </div>
  );
}
