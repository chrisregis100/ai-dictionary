"use client";

import type { AnchorHTMLAttributes, MouseEvent } from "react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

interface OutboundLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export function OutboundLink({
  href,
  onClick,
  rel = "noreferrer",
  target = "_blank",
  children,
  ...props
}: OutboundLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackEvent(ANALYTICS_EVENTS.outboundClick, { url: href });
    onClick?.(event);
  };

  return (
    <a href={href} rel={rel} target={target} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}
