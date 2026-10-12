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
      <h1 className="text-3xl font-semibold tracking-tight text-foreground">
        Nouvel article
      </h1>
      <ArticleForm action={createArticle} submitLabel="Créer l'article" />
    </div>
  );
}
