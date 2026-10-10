import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";

import { updateArticle } from "@/actions/articles-actions";
import { ArticleForm } from "@/components/admin/article-form";
import { getPostById } from "@/lib/blog/queries";

export const metadata: Metadata = {
  title: "Éditer un article",
  robots: { index: false },
};

interface EditArticlePageProps {
  params: Promise<{ id: string }>;
}

async function EditArticle({ params }: EditArticlePageProps) {
  await connection();
  const { id } = await params;
  const post = await getPostById(id);
  if (!post) notFound();

  const updateArticleWithId = updateArticle.bind(null, post.id);

  return (
    <ArticleForm
      action={updateArticleWithId}
      defaultValues={{
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        contentMd: post.contentMd,
        status: post.status,
      }}
      submitLabel="Enregistrer"
    />
  );
}

export default function EditArticlePage({ params }: EditArticlePageProps) {
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl italic tracking-[-0.02em] text-ink">
        Éditer un article
      </h1>
      <Suspense
        fallback={<p className="text-sm text-muted">Chargement de l&apos;article…</p>}
      >
        <EditArticle params={params} />
      </Suspense>
    </div>
  );
}
