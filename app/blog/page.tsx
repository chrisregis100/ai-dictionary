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
      <p className="rounded-2xl bg-paper-sand px-4 py-6 text-sm text-muted">
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
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      <div className="max-w-3xl space-y-8">
        <header className="space-y-4">
          <p className="font-serif text-sm italic text-sage">¶ Blog</p>
          <h1 className="font-serif text-[clamp(2.4rem,6vw,4.2rem)] leading-[1.08] tracking-[-0.03em] italic text-ink">
            Blog
          </h1>
          <p className="max-w-prose text-base leading-7 text-muted">
            {blogModule.description}
          </p>
        </header>
        <Suspense
          fallback={<p className="text-sm text-muted">Chargement des articles…</p>}
        >
          <PostList />
        </Suspense>
      </div>
    </div>
  );
}
