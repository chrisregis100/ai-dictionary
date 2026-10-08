import Link from "next/link";

import { SearchPalette } from "@/components/search-palette";
import type { SearchEntry } from "@/lib/dictionary";

interface SiteHeaderProps {
  entries: SearchEntry[];
}

export function SiteHeader({ entries }: SiteHeaderProps) {
  return (
    <header className="border-b border-line bg-paper/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center gap-3 px-4 py-4">
        <Link href="/" className="font-serif text-lg text-ink">
          Dictionnaire
        </Link>
        <nav aria-label="Pages" className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-clay-deep">
            Parcours
          </Link>
          <Link href="/recherche" className="hover:text-clay-deep">
            Recherche
          </Link>
          <Link href="/a-propos" className="hover:text-clay-deep">
            À propos
          </Link>
        </nav>
        <div className="ml-auto">
          <SearchPalette entries={entries} />
        </div>
      </div>
    </header>
  );
}
