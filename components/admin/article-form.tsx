"use client";

import { useActionState, useId } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ArticleFormState } from "@/lib/blog/schema";
import { POST_STATUSES, initialArticleFormState } from "@/lib/blog/schema";
import { cn } from "@/lib/utils";

const statusLabels: Record<(typeof POST_STATUSES)[number], string> = {
  DRAFT: "Brouillon",
  PUBLISHED: "Publié",
};

interface ArticleFormValues {
  title: string;
  slug: string;
  excerpt: string;
  contentMd: string;
  status: (typeof POST_STATUSES)[number];
}

interface ArticleFormProps {
  action: (
    prevState: ArticleFormState,
    formData: FormData,
  ) => Promise<ArticleFormState>;
  defaultValues?: ArticleFormValues;
  submitLabel: string;
}

const fieldClassName =
  "min-h-28 w-full rounded-lg border border-border bg-card px-4 py-3 text-base text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

export function ArticleForm({
  action,
  defaultValues,
  submitLabel,
}: ArticleFormProps) {
  const [state, formAction, isPending] = useActionState(
    action,
    initialArticleFormState,
  );
  const formId = useId();

  return (
    <form action={formAction} className="max-w-2xl space-y-5">
      <div className="space-y-1.5">
        <label htmlFor={`${formId}-title`} className="text-sm font-medium text-foreground">
          Titre
        </label>
        <Input
          id={`${formId}-title`}
          name="title"
          required
          defaultValue={defaultValues?.title}
          placeholder="Comprendre les agents IA"
        />
        {state.fieldErrors?.title ? (
          <p className="text-sm text-destructive">{state.fieldErrors.title}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label htmlFor={`${formId}-slug`} className="text-sm font-medium text-foreground">
          Slug
        </label>
        <Input
          id={`${formId}-slug`}
          name="slug"
          required
          defaultValue={defaultValues?.slug}
          placeholder="comprendre-les-agents-ia"
        />
        {state.fieldErrors?.slug ? (
          <p className="text-sm text-destructive">{state.fieldErrors.slug}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${formId}-excerpt`}
          className="text-sm font-medium text-foreground"
        >
          Extrait
        </label>
        <textarea
          id={`${formId}-excerpt`}
          name="excerpt"
          required
          defaultValue={defaultValues?.excerpt}
          placeholder="Résumé affiché dans la liste des articles."
          className={cn(fieldClassName, "min-h-20")}
        />
        {state.fieldErrors?.excerpt ? (
          <p className="text-sm text-destructive">{state.fieldErrors.excerpt}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${formId}-content`}
          className="text-sm font-medium text-foreground"
        >
          Contenu (Markdown)
        </label>
        <textarea
          id={`${formId}-content`}
          name="contentMd"
          required
          defaultValue={defaultValues?.contentMd}
          placeholder="## Introduction…"
          className={cn(fieldClassName, "min-h-72 font-mono text-sm")}
        />
        {state.fieldErrors?.contentMd ? (
          <p className="text-sm text-destructive">{state.fieldErrors.contentMd}</p>
        ) : null}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor={`${formId}-status`}
          className="text-sm font-medium text-foreground"
        >
          Statut
        </label>
        <select
          id={`${formId}-status`}
          name="status"
          defaultValue={defaultValues?.status ?? "DRAFT"}
          className={cn(fieldClassName, "h-12 min-h-0 py-0")}
        >
          {POST_STATUSES.map((status) => (
            <option key={status} value={status}>
              {statusLabels[status]}
            </option>
          ))}
        </select>
        {state.fieldErrors?.status ? (
          <p className="text-sm text-destructive">{state.fieldErrors.status}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Enregistrement…" : submitLabel}
        </Button>
        <p
          role="status"
          aria-live="polite"
          className={cn(
            "text-sm",
            state.status === "error" ? "text-destructive" : "text-muted-foreground",
          )}
        >
          {state.message}
        </p>
      </div>
    </form>
  );
}
