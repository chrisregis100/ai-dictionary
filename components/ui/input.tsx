import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-2xl border border-line bg-card px-4 text-base text-ink outline-none ring-clay placeholder:text-muted focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay",
        className,
      )}
      {...props}
    />
  );
}
