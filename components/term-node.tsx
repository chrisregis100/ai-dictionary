"use client";

import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { useUnderstoodSlugs } from "@/hooks/use-understood";

interface TermNodeProps {
  slug: string;
  term: string;
  description: string;
}

export function TermNode({ slug, term, description }: TermNodeProps) {
  const understood = useUnderstoodSlugs().includes(slug);

  return (
    <li className="relative rounded-2xl bg-card p-4 ring-1 ring-line">
      <div className="flex items-start justify-between gap-3">
        <Link
          href={`/notions/${slug}`}
          className="font-serif text-xl text-ink after:absolute after:inset-0"
        >
          {term}
        </Link>
        <Badge className="pointer-events-none" tone={understood ? "moss" : "muted"}>
          {understood ? "Compris" : "À lire"}
        </Badge>
      </div>
      <p className="relative z-10 mt-2 max-w-prose text-sm leading-6 text-muted pointer-events-none">
        {description}
      </p>
    </li>
  );
}
