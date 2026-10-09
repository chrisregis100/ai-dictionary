import { BookOpen } from "@deemlol/next-icons";
import Link from "next/link";

import { SearchPalette } from "@/components/search-palette";
import { ThemeToggle } from "@/components/ThemeToggle";
import type { SearchEntry } from "@/lib/dictionary";

interface SiteHeaderProps {
  entries: SearchEntry[];
}

export function SiteHeader({ entries }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-3 px-4 py-3">
        <Link
          href="/"
          className="link-ink inline-flex items-center gap-2 font-serif text-lg italic text-ink"
        >
          <BookOpen size={18} strokeWidth={1.6} className="text-clay" aria-hidden />
          Dictionnaire
        </Link>
        <nav aria-label="Pages" className="flex items-center gap-4 text-sm">
          <Link href="/" className="link-ink text-sage">
            Parcours
          </Link>
          <Link href="/recherche" className="link-ink text-sage">
            Recherche
          </Link>
          <Link href="/a-propos" className="link-ink text-sage">
            À propos
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
