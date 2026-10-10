import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import {
  deleteArticle,
  togglePublishArticle,
} from "@/actions/articles-actions";
import { Button } from "@/components/ui/button";
import { formatPostDate } from "@/lib/blog/format";
import { getAllPosts } from "@/lib/blog/queries";

export const metadata: Metadata = {
  title: "Articles",
  robots: { index: false },
};

async function ArticleTable() {
  await connection();
  const posts = await getAllPosts();

  if (posts.length === 0) {
    return (
      <p className="rounded-2xl bg-paper-sand px-4 py-6 text-sm text-muted">
        Aucun article pour l&apos;instant. Crée le premier.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-card px-4 py-3"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-ink">{post.title}</p>
            <p className="text-xs text-muted">
              /blog/{post.slug}
              {post.publishedAt
                ? ` · publié le ${formatPostDate(post.publishedAt)}`
                : " · brouillon"}
            </p>
          </div>
          <span
            className={
              post.status === "PUBLISHED"
                ? "rounded-full bg-sage-soft px-2.5 py-1 text-xs font-medium text-sage"
                : "rounded-full bg-paper-sand px-2.5 py-1 text-xs font-medium text-muted"
            }
          >
            {post.status === "PUBLISHED" ? "Publié" : "Brouillon"}
          </span>
          <div className="flex items-center gap-2">
            <Button asChild variant="quiet" size="sm">
              <Link href={`/admin/articles/${post.id}`}>Éditer</Link>
            </Button>
            <form action={togglePublishArticle}>
              <input type="hidden" name="id" value={post.id} />
              <Button type="submit" variant="sage" size="sm">
                {post.status === "PUBLISHED" ? "Dépublier" : "Publier"}
              </Button>
            </form>
            <form action={deleteArticle}>
              <input type="hidden" name="id" value={post.id} />
              <Button type="submit" variant="quiet" size="sm">
                Supprimer
              </Button>
            </form>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AdminArticlesPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-serif text-3xl italic tracking-[-0.02em] text-ink">
          Articles
        </h1>
        <Button asChild>
          <Link href="/admin/articles/nouveau">Nouvel article</Link>
        </Button>
      </header>
      <Suspense
        fallback={<p className="text-sm text-muted">Chargement des articles…</p>}
      >
        <ArticleTable />
      </Suspense>
    </div>
  );
}
