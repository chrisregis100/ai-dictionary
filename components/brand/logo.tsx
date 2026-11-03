import type { SVGProps } from "react";

import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LogoMark({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      className={className}
      {...props}
    >
      <rect
        x="2.75"
        y="2.75"
        width="26.5"
        height="26.5"
        rx="7.5"
        stroke="currentColor"
        strokeWidth="1.75"
      />
      <path
        d="M11 10.25 20.25 16 11 21.75"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="21.2"
        y="14.4"
        width="2.5"
        height="3.2"
        rx="0.5"
        className="fill-accent"
      />
    </svg>
  );
}

interface LogoProps {
  className?: string;
  markClassName?: string;
}

export function Logo({ className, markClassName }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark className={cn("size-6", markClassName)} />
      <span className="text-[0.95rem] font-semibold tracking-tight">
        {siteConfig.name}
      </span>
    </span>
  );
}
