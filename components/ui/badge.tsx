import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "accent" | "muted";
}

const tones = {
  accent: "border-accent/20 bg-accent/10 text-accent",
  muted: "border-border bg-surface text-muted-foreground",
} as const;

export function Badge({
  className,
  tone = "accent",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
