import Link from "next/link";

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
      <h2 className="font-serif text-xl">Notions liées</h2>
      <ul className="space-y-2">
        {terms.map((term) => (
          <li
            key={term.slug}
            className="relative rounded-2xl bg-card px-4 py-3 ring-1 ring-line hover:ring-clay"
          >
            <Link
              href={`/notions/${term.slug}`}
              className="font-semibold after:absolute after:inset-0"
            >
              {term.term}
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
