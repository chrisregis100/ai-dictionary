import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface EntryBodyProps {
  markdown: string;
}

export function EntryBody({ markdown }: EntryBodyProps) {
  return (
    <div className="max-w-prose space-y-4 text-base leading-7 text-ink [&_a]:font-medium [&_a]:text-clay-deep [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-clay [&_blockquote]:pl-4 [&_blockquote]:text-ink/90 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_ol]:list-decimal [&_ol]:space-y-1 [&_ol]:pl-5 [&_p]:text-pretty [&_table]:w-full [&_table]:text-sm [&_td]:border-t [&_td]:border-line [&_td]:px-2 [&_td]:py-2 [&_th]:px-2 [&_th]:pb-2 [&_th]:text-left [&_th]:font-semibold [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => {
            if (!href) return <span>{children}</span>;
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
