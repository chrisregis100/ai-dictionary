import { TermLink } from "@/components/analytics/term-link";
import { grammarLabel } from "@/lib/lemma";

interface RelatedTerm {
  slug: string;
  term: string;
  description: string;
}

interface RelatedTermsProps {
  terms: RelatedTerm[];
}

export function RelatedTerms({ terms }: RelatedTermsProps) {
  if (terms.length === 0) return null;

  return (
    <nav aria-label="Notions liées" className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">Notions liées</h2>
      <ul className="space-y-2">
        {terms.map((term) => (
          <li
            key={term.slug}
            className="relative rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:bg-surface"
          >
            <TermLink
              term={term.term}
              slug={term.slug}
              className="text-base font-medium after:absolute after:inset-0"
            >
              {term.term}
              <span
                aria-hidden
                className="ml-2 text-sm font-normal text-muted-foreground"
              >
                {grammarLabel(term.term)}
              </span>
            </TermLink>
            <p className="pointer-events-none mt-1 text-sm leading-6 text-muted-foreground">
              {term.description}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
