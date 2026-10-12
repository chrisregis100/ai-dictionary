import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { OutboundLink } from "@/components/analytics/outbound-link";

interface EntryBodyProps {
  markdown: string;
}

export function EntryBody({ markdown }: EntryBodyProps) {
  return (
    <div className="entry-body max-w-prose space-y-4 text-base leading-7 text-foreground [&_a]:font-medium [&_a]:text-accent [&_a]:underline-offset-4 [&_a]:hover:underline [&_blockquote]:border-l-2 [&_blockquote]:border-accent/40 [&_blockquote]:bg-surface [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-muted-foreground [&_code]:rounded-md [&_code]:bg-surface [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.875em] [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:border-t [&_h2]:border-border [&_h2]:pt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:tracking-tight [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:text-pretty [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-border [&_pre]:bg-surface [&_pre]:p-4 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:border-border [&_td]:px-2 [&_td]:py-2 [&_th]:px-2 [&_th]:pb-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["heading-anchor"],
                ariaLabel: "Lien vers cette section",
              },
              content: { type: "text", value: "#" },
            },
          ],
        ]}
        components={{
          a: ({ href, children, className }) => {
            if (!href) return <span>{children}</span>;
            if (href.startsWith("#")) {
              return (
                <a
                  href={href}
                  className={className}
                  aria-label="Lien vers cette section"
                >
                  {children}
                </a>
              );
            }
            if (href.startsWith("/")) {
              return <Link href={href}>{children}</Link>;
            }
            return <OutboundLink href={href}>{children}</OutboundLink>;
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
