import type { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "clay" | "sage" | "muted";
}

const tones = {
  clay: "bg-clay/10 text-clay-deep",
  sage: "bg-sage-soft text-sage",
  muted: "bg-paper-sand text-muted",
} as const;

export function Badge({
  className,
  tone = "clay",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
