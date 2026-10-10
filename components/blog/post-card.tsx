import Link from "next/link";

import { formatPostDate } from "@/lib/blog/format";
import type { Post } from "@/lib/blog/queries";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <li className="paper-card relative rounded-2xl bg-card px-5 py-5">
      {post.publishedAt ? (
        <time
          dateTime={post.publishedAt.toISOString()}
          className="text-xs font-medium tracking-wide text-sage"
        >
          {formatPostDate(post.publishedAt)}
        </time>
      ) : null}
      <h2 className="mt-1 font-serif text-2xl italic text-ink">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </Link>
      </h2>
      <p className="pointer-events-none mt-2 text-sm leading-6 text-muted">
        {post.excerpt}
      </p>
    </li>
  );
}
