import { GitHub } from "@deemlol/next-icons";
import Link from "next/link";

import { OutboundLink } from "@/components/analytics/outbound-link";
import { Logo } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { blogModule } from "@/lib/modules/blog";
import { dictionaryModule } from "@/lib/modules/dictionary";
import { siteConfig } from "@/lib/site";

const footerColumns = [
  {
    title: "Ressources",
    links: [
      { label: dictionaryModule.shortName, href: dictionaryModule.basePath },
      { label: blogModule.shortName, href: blogModule.basePath },
      { label: "Recherche", href: "/dictionnaire/recherche" },
    ],
  },
  {
    title: "Plateforme",
    links: [
      { label: "Newsletter", href: "/newsletter" },
      { label: "À propos", href: "/a-propos" },
    ],
  },
] as const;

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-12 lg:px-6">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-sm text-sm leading-6 text-muted-foreground text-pretty">
              {siteConfig.description}
            </p>
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                Newsletter
              </p>
              <NewsletterForm />
            </div>
          </div>
          {footerColumns.map((column) => (
            <nav
              key={column.title}
              aria-label={column.title}
              className="space-y-3"
            >
              <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
                {column.title}
              </p>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <p className="text-sm text-muted-foreground">
            Fait par {siteConfig.author}
          </p>
          <OutboundLink
            href={siteConfig.githubUrl}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <GitHub size={16} strokeWidth={1.75} aria-hidden />
            GitHub
          </OutboundLink>
        </div>
      </div>
    </footer>
  );
}
