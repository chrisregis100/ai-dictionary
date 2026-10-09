import Link from "next/link";
import ReactMarkdown from "react-markdown";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

interface EntryBodyProps {
  markdown: string;
}

export function EntryBody({ markdown }: EntryBodyProps) {
  return (
    <div className="entry-body max-w-prose space-y-4 text-base leading-7 text-ink [&_a]:link-ink [&_a]:font-medium [&_a]:text-sage [&_blockquote]:border-l [&_blockquote]:border-sage [&_blockquote]:bg-paper-sand [&_blockquote]:px-4 [&_blockquote]:py-3 [&_blockquote]:text-ink/90 [&_h2]:mt-10 [&_h2]:scroll-mt-24 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:italic [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:text-pretty [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:border-line [&_td]:px-2 [&_td]:py-2 [&_th]:px-2 [&_th]:pb-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
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
            return (
              <a href={href} rel="noreferrer" target="_blank">
                {children}
              </a>
            );
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
