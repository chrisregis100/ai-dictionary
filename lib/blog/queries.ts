import { prisma } from "@/lib/db";
import type { Post } from "@/lib/generated/prisma/client";

export type { Post };

export function getPublishedPosts(limit?: number): Promise<Post[]> {
  return prisma.post.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    ...(limit ? { take: limit } : {}),
  });
}

export function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  return prisma.post.findFirst({
    where: { slug, status: "PUBLISHED" },
  });
}

export function getAllPosts(): Promise<Post[]> {
  return prisma.post.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export function getPostById(id: string): Promise<Post | null> {
  return prisma.post.findUnique({ where: { id } });
}
