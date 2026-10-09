import Link from "next/link";

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
      <h2 className="font-serif text-xl italic">Notions liées</h2>
      <ul className="space-y-2">
        {terms.map((term) => (
          <li key={term.slug} className="paper-card relative rounded-2xl bg-card px-4 py-3">
            <Link
              href={`/notions/${term.slug}`}
              className="font-serif text-lg italic after:absolute after:inset-0"
            >
              {term.term}
              <span aria-hidden className="ml-2 font-serif text-sm not-italic text-sage">
                {grammarLabel(term.term)}
              </span>
            </Link>
            <p className="pointer-events-none mt-1 text-sm leading-6 text-muted">
              {term.description}
            </p>
          </li>
        ))}
      </ul>
    </nav>
  );
}
