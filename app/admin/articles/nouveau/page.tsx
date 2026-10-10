import type { Metadata } from "next";

import { createArticle } from "@/actions/articles-actions";
import { ArticleForm } from "@/components/admin/article-form";

export const metadata: Metadata = {
  title: "Nouvel article",
  robots: { index: false },
};

export default function NewArticlePage() {
  return (
    <div className="space-y-8">
      <h1 className="font-serif text-3xl italic tracking-[-0.02em] text-ink">
        Nouvel article
      </h1>
      <ArticleForm action={createArticle} submitLabel="Créer l'article" />
    </div>
  );
}
