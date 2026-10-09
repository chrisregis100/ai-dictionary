"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { useUnderstoodSlugs } from "@/hooks/use-understood";
import { grammarLabel } from "@/lib/lemma";

interface TermNodeProps {
  slug: string;
  term: string;
  description: string;
}

export function TermNode({ slug, term, description }: TermNodeProps) {
  const understood = useUnderstoodSlugs().includes(slug);

  return (
    <li className="paper-card relative rounded-2xl bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/notions/${slug}`}
          className="font-serif text-xl italic text-ink after:absolute after:inset-0"
        >
          {term}
          <span aria-hidden className="ml-2 font-serif text-sm not-italic text-sage">
            {grammarLabel(term)}
          </span>
        </Link>
        <Badge className="pointer-events-none" tone={understood ? "sage" : "muted"}>
          {understood ? "Compris" : "À lire"}
        </Badge>
      </div>
      <p className="pointer-events-none relative z-10 mt-2 max-w-prose text-sm leading-6 text-muted">
        {description}
      </p>
    </li>
  );
}
