import Link from "next/link";

import { cn } from "@/lib/utils";

interface TermNavItem {
  slug: string;
  term: string;
}

interface TermNavSection {
  id: string;
  title: string;
  terms: TermNavItem[];
}

interface TermSidebarProps {
  sections: TermNavSection[];
  currentSection: string;
  currentSlug: string;
}

export function TermSidebar({
  sections,
  currentSection,
  currentSlug,
}: TermSidebarProps) {
  return (
    <nav
      aria-label="Sections du dictionnaire"
      className="lg:sticky lg:top-16 lg:max-h-[calc(100vh-5rem)] lg:self-start lg:overflow-y-auto"
    >
      <p className="mb-3 hidden text-[0.65rem] font-medium tracking-[0.2em] text-muted uppercase lg:block">
        Sections
      </p>
      <ul className="flex gap-1 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
        {sections.map((section) => {
          const isCurrent = section.id === currentSection;

          if (!isCurrent) {
            return (
              <li key={section.id} className="shrink-0 lg:shrink">
                <Link
                  href={`/#${section.id}`}
                  aria-label={`Aller à la section ${section.title} sur l'accueil`}
                  className="block rounded-lg px-2.5 py-2 font-mono text-sm whitespace-nowrap text-muted transition-colors hover:bg-paper-sand hover:text-ink"
                >
                  <span aria-hidden className="text-clay">
                    #
                  </span>{" "}
                  {section.title}
                </Link>
              </li>
            );
          }

          return (
            <li key={section.id} className="min-w-0 flex-1 lg:flex-none">
              <p
                aria-current="true"
                className="rounded-lg bg-paper-sand px-2.5 py-2 font-mono text-sm text-ink"
              >
                <span aria-hidden className="text-clay">
                  #
                </span>{" "}
                {section.title}
              </p>
              <ul className="mt-1 hidden space-y-0.5 lg:block">
                {section.terms.map((term) => {
                  const isActive = term.slug === currentSlug;
                  return (
                    <li key={term.slug}>
                      <Link
                        href={`/notions/${term.slug}`}
                        aria-current={isActive ? "page" : undefined}
                        className={cn(
                          "block rounded-md px-2.5 py-1.5 text-sm transition-colors",
                          isActive
                            ? "bg-sage-soft font-medium text-ink"
                            : "text-muted hover:bg-paper-sand hover:text-ink",
                        )}
                      >
                        {term.term}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <ul
        className="mt-3 flex flex-wrap gap-2 lg:hidden"
        aria-label="Notions de la section courante"
      >
        {sections
          .find((section) => section.id === currentSection)
          ?.terms.map((term) => {
            const isActive = term.slug === currentSlug;
            return (
              <li key={term.slug}>
                <Link
                  href={`/notions/${term.slug}`}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "block rounded-full px-3 py-1 text-sm ring-1 ring-line",
                    isActive
                      ? "bg-sage-soft font-medium text-ink"
                      : "text-muted hover:bg-paper-sand hover:text-ink",
                  )}
                >
                  {term.term}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
}
