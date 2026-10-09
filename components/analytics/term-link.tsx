"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

interface TermLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  term: string;
  slug: string;
}

export function TermLink({ term, slug, onClick, ...props }: TermLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(ANALYTICS_EVENTS.termClick, { term, slug });
    onClick?.(event);
  };

  return <Link href={`/notions/${slug}`} onClick={handleClick} {...props} />;
}
