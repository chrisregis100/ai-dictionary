import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";

import {
  deleteArticle,
  togglePublishArticle,
} from "@/actions/articles-actions";
import { Badge } from "@/components/ui/badge";
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
      <p className="rounded-xl border border-border bg-surface px-4 py-6 text-sm text-muted-foreground">
        Aucun article pour l&apos;instant. Crée le premier.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {posts.map((post) => (
        <li
          key={post.id}
          className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
        >
          <div className="min-w-0 flex-1">
            <p className="truncate font-medium text-foreground">{post.title}</p>
            <p className="text-xs text-muted-foreground">
              /blog/{post.slug}
              {post.publishedAt
                ? ` · publié le ${formatPostDate(post.publishedAt)}`
                : " · brouillon"}
            </p>
          </div>
          <Badge tone={post.status === "PUBLISHED" ? "accent" : "muted"}>
            {post.status === "PUBLISHED" ? "Publié" : "Brouillon"}
          </Badge>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
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
              <Button type="submit" variant="ghost" size="sm">
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
        <h1 className="text-3xl font-semibold tracking-tight text-foreground">
          Articles
        </h1>
        <Button asChild>
          <Link href="/admin/articles/nouveau">Nouvel article</Link>
        </Button>
      </header>
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">
            Chargement des articles…
          </p>
        }
      >
        <ArticleTable />
      </Suspense>
    </div>
  );
}
