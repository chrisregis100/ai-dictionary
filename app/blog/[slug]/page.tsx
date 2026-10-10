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
        <p className="text-sm text-sage">
          <Link href="/blog" className="link-ink">
            ← Tous les articles
          </Link>
        </p>
        {post.publishedAt ? (
          <time
            dateTime={post.publishedAt.toISOString()}
            className="block text-xs font-medium tracking-wide text-sage"
          >
            {formatPostDate(post.publishedAt)}
          </time>
        ) : null}
        <h1 className="font-serif text-[clamp(2.4rem,6vw,4rem)] leading-[1.08] tracking-[-0.03em] text-ink">
          {post.title}
        </h1>
        <p className="max-w-prose text-lg leading-8 text-muted">
          {post.excerpt}
        </p>
      </header>
      <hr className="border-line" />
      <EntryBody markdown={post.contentMd} />
    </article>
  );
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      <Suspense
        fallback={<p className="text-sm text-muted">Chargement de l&apos;article…</p>}
      >
        <PostArticle params={params} />
      </Suspense>
    </div>
  );
}
