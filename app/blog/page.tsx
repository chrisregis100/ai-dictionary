import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";

import { PostCard } from "@/components/blog/post-card";
import { blogModule } from "@/lib/modules/blog";
import { getPublishedPosts } from "@/lib/blog/queries";

export const metadata: Metadata = {
  title: blogModule.shortName,
  description: blogModule.description,
  alternates: { canonical: "/blog" },
};

async function PostList() {
  await connection();
  const posts = await getPublishedPosts();

  if (posts.length === 0) {
    return (
      <p className="rounded-xl border border-border bg-surface px-4 py-6 text-sm text-muted-foreground">
        Les premiers articles arrivent bientôt. Inscris-toi à la newsletter
        pour être prévenu.
      </p>
    );
  }

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </ul>
  );
}

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
      <div className="max-w-3xl space-y-8">
        <header className="space-y-4">
          <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
            Blog
          </p>
          <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground">
            Blog
          </h1>
          <p className="max-w-prose text-base leading-7 text-muted-foreground text-pretty">
            {blogModule.description}
          </p>
        </header>
        <Suspense
          fallback={
            <p className="text-sm text-muted-foreground">
              Chargement des articles…
            </p>
          }
        >
          <PostList />
        </Suspense>
      </div>
    </div>
  );
}
