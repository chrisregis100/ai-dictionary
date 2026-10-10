"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import type { ArticleFormState, PostInput } from "@/lib/blog/schema";
import { PostInputSchema } from "@/lib/blog/schema";
import { prisma } from "@/lib/db";
import { stackServerApp } from "@/stack";

async function requireUser(): Promise<boolean> {
  const user = await stackServerApp.getUser();
  return user !== null;
}

function parseArticleForm(formData: FormData):
  | { success: true; data: PostInput }
  | { success: false; state: ArticleFormState } {
  const parsed = PostInputSchema.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    excerpt: formData.get("excerpt"),
    contentMd: formData.get("contentMd"),
    status: formData.get("status"),
  });

  if (!parsed.success) {
    const fieldErrors: ArticleFormState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (
        typeof field === "string" &&
        (field === "title" ||
          field === "slug" ||
          field === "excerpt" ||
          field === "contentMd" ||
          field === "status") &&
        !fieldErrors[field]
      ) {
        fieldErrors[field] = issue.message;
      }
    }
    return {
      success: false,
      state: {
        status: "error",
        message: "Le formulaire contient des erreurs.",
        fieldErrors,
      },
    };
  }

  return { success: true, data: parsed.data };
}

function revalidateBlogPaths(slug: string): void {
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/");
  revalidatePath("/admin/articles");
}

export async function createArticle(
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  if (!(await requireUser())) {
    return { status: "error", message: "Session expirée. Reconnecte-toi." };
  }

  const result = parseArticleForm(formData);
  if (!result.success) return result.state;

  const existing = await prisma.post.findUnique({
    where: { slug: result.data.slug },
    select: { id: true },
  });
  if (existing) {
    return {
      status: "error",
      message: "Ce slug est déjà utilisé par un autre article.",
      fieldErrors: { slug: "Slug déjà pris." },
    };
  }

  await prisma.post.create({
    data: {
      ...result.data,
      publishedAt: result.data.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidateBlogPaths(result.data.slug);
  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prevState: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  if (!(await requireUser())) {
    return { status: "error", message: "Session expirée. Reconnecte-toi." };
  }

  const result = parseArticleForm(formData);
  if (!result.success) return result.state;

  const current = await prisma.post.findUnique({ where: { id } });
  if (!current) {
    return { status: "error", message: "Article introuvable." };
  }

  const slugTaken = await prisma.post.findFirst({
    where: { slug: result.data.slug, NOT: { id } },
    select: { id: true },
  });
  if (slugTaken) {
    return {
      status: "error",
      message: "Ce slug est déjà utilisé par un autre article.",
      fieldErrors: { slug: "Slug déjà pris." },
    };
  }

  await prisma.post.update({
    where: { id },
    data: {
      ...result.data,
      publishedAt:
        result.data.status === "PUBLISHED"
          ? (current.publishedAt ?? new Date())
          : null,
    },
  });

  revalidateBlogPaths(current.slug);
  revalidateBlogPaths(result.data.slug);
  return { status: "success", message: "Article mis à jour." };
}

export async function togglePublishArticle(formData: FormData): Promise<void> {
  if (!(await requireUser())) return;

  const id = formData.get("id");
  if (typeof id !== "string" || id === "") return;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;

  const isPublishing = post.status !== "PUBLISHED";
  await prisma.post.update({
    where: { id },
    data: {
      status: isPublishing ? "PUBLISHED" : "DRAFT",
      publishedAt: isPublishing ? (post.publishedAt ?? new Date()) : null,
    },
  });

  revalidateBlogPaths(post.slug);
}

export async function deleteArticle(formData: FormData): Promise<void> {
  if (!(await requireUser())) return;

  const id = formData.get("id");
  if (typeof id !== "string" || id === "") return;

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return;

  await prisma.post.delete({ where: { id } });
  revalidateBlogPaths(post.slug);
}
