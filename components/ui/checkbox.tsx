import type { InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="checkbox"
      className={cn(
        "mt-0.5 size-4 shrink-0 cursor-pointer rounded border border-border bg-card accent-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
      {...props}
    />
  );
}
