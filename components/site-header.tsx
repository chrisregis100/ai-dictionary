import { GitHub } from "@deemlol/next-icons";
import Link from "next/link";

import { OutboundLink } from "@/components/analytics/outbound-link";
import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/mobile-nav";
import { SearchPalette } from "@/components/search-palette";
import { ThemeToggle } from "@/components/theme-toggle";
import type { SearchEntry } from "@/lib/dictionary";
import { siteConfig } from "@/lib/site";

interface SiteHeaderProps {
  entries: SearchEntry[];
}

const navLinks = [
  { href: "/dictionnaire", label: "Dictionnaire" },
  { href: "/blog", label: "Blog" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/a-propos", label: "À propos" },
] as const;

export function SiteHeader({ entries }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 lg:px-6">
        <Link
          href="/"
          className="text-foreground transition-opacity hover:opacity-80"
          aria-label={`${siteConfig.name}, accueil`}
        >
          <Logo />
        </Link>
        <nav
          aria-label="Pages"
          className="ml-4 hidden items-center gap-1 md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1.5">
          <SearchPalette entries={entries} />
          <ThemeToggle />
          <OutboundLink
            href={siteConfig.githubUrl}
            className="hidden size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground sm:inline-flex"
            aria-label="Dépôt GitHub"
          >
            <GitHub size={18} strokeWidth={1.75} aria-hidden />
          </OutboundLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
