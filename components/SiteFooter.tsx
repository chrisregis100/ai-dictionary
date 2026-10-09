import { BookOpen } from "@deemlol/next-icons";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-paper-kraft">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-12 lg:px-6">
        <p className="ornament text-xs" aria-hidden>
          ※
        </p>
        <div className="flex items-start gap-3">
          <BookOpen
            size={20}
            strokeWidth={1.6}
            className="mt-1 text-sage"
            aria-hidden
          />
          <div className="space-y-2">
            <p className="font-serif text-sm italic tracking-wide text-sage">
              Achevé d&apos;imprimer
            </p>
            <p className="font-serif text-2xl leading-snug text-ink">
              Dictionnaire d&apos;IA coding
            </p>
            <p className="max-w-prose text-sm leading-6 text-muted">
              Les termes restent en anglais. Les explications sont une
              réécriture française, pas une traduction du glossaire source.
            </p>
          </div>
        </div>
        <nav
          aria-label="Colophon"
          className="flex flex-wrap gap-x-5 gap-y-2 text-sm"
        >
          <Link href="/" className="link-ink text-sage">
            Dictionnaire
          </Link>
          <Link href="/recherche" className="link-ink text-sage">
            Recherche
          </Link>
          <Link href="/a-propos" className="link-ink text-sage">
            À propos
          </Link>
          <a
            href="https://github.com/mattpocock/dictionary-of-ai-coding"
            className="link-ink text-sage"
            rel="noreferrer"
            target="_blank"
          >
            Glossaire source
          </a>
        </nav>
        <p className="font-serif text-xs italic text-muted">¶ fin</p>
      </div>
    </footer>
  );
}
