import Link from "next/link";

import { formatPostDate } from "@/lib/blog/format";
import type { Post } from "@/lib/blog/queries";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <li className="relative rounded-xl border border-border bg-card px-5 py-5 transition-colors hover:bg-surface">
      {post.publishedAt ? (
        <time
          dateTime={post.publishedAt.toISOString()}
          className="text-xs font-medium tracking-wide text-muted-foreground"
        >
          {formatPostDate(post.publishedAt)}
        </time>
      ) : null}
      <h2 className="mt-1 text-lg font-semibold tracking-tight text-foreground">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h2>
      <p className="pointer-events-none mt-2 text-sm leading-6 text-muted-foreground">
        {post.excerpt}
      </p>
    </li>
  );
}
