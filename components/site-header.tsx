import { Zap } from "@deemlol/next-icons";
import Link from "next/link";

import { SearchPalette } from "@/components/search-palette";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { SearchEntry } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";

interface SiteHeaderProps {
  entries: SearchEntry[];
}

export function SiteHeader({ entries }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-3 lg:px-6">
        <Link
          href="/"
          className="link-ink inline-flex items-center gap-2 font-serif text-lg italic text-ink"
        >
          <Zap size={18} strokeWidth={1.6} className="text-clay" aria-hidden />
          {siteConfig.name}
        </Link>
        <nav aria-label="Pages" className="flex items-center gap-4 text-sm">
          <Link href="/dictionnaire" className="link-ink text-sage">
            Dictionnaire
          </Link>
          <Link href="/blog" className="link-ink text-sage">
            Blog
          </Link>
          <Link href="/newsletter" className="link-ink text-sage">
            Newsletter
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SearchPalette entries={entries} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
