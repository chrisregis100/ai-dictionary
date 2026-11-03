import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none ring-ring placeholder:text-muted-foreground focus:ring-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  );
}
