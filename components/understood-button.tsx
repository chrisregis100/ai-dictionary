"use client";

import { Check } from "@deemlol/next-icons";

import { Button } from "@/components/ui/button";
import { useUnderstoodSlugs } from "@/hooks/use-understood";
import { toggleUnderstood, writeUnderstood } from "@/lib/progress";

interface UnderstoodButtonProps {
  slug: string;
}

export function UnderstoodButton({ slug }: UnderstoodButtonProps) {
  const slugs = useUnderstoodSlugs();
  const understood = slugs.includes(slug);

  const handleClick = () => {
    writeUnderstood(toggleUnderstood(slugs, slug));
  };

  return (
    <Button
      type="button"
      variant={understood ? "sage" : "default"}
      aria-pressed={understood}
      onClick={handleClick}
    >
      {understood ? <Check size={16} strokeWidth={2} aria-hidden /> : null}
      {understood ? "Compris" : "J'ai compris"}
    </Button>
  );
}
