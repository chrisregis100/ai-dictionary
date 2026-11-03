import { getPrisma, isDatabaseConfigured } from "@/lib/db";
import type { Post } from "@/lib/generated/prisma/client";

export type { Post };

export function getPublishedPosts(limit?: number): Promise<Post[]> {
  if (!isDatabaseConfigured()) return Promise.resolve([]);
  return getPrisma().post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });
}

export function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  if (!isDatabaseConfigured()) return Promise.resolve(null);
  return getPrisma().post.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}

export function getAllPosts(): Promise<Post[]> {
  if (!isDatabaseConfigured()) return Promise.resolve([]);
  return getPrisma().post.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function getPostById(id: string): Promise<Post | null> {
  if (!isDatabaseConfigured()) return Promise.resolve(null);
  return getPrisma().post.findUnique({ where: { id } });
}
