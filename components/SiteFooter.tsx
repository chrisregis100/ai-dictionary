import Link from "next/link";

import { OutboundLink } from "@/components/analytics/outbound-link";
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
    <footer className="mt-auto border-t border-line bg-paper-kraft">
      <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)]">
          <div className="space-y-4">
            <p className="font-serif text-lg italic text-ink">
              {siteConfig.name}
            </p>
            <p className="max-w-sm text-sm leading-6 text-muted">
              {siteConfig.description}
            </p>
            <div className="space-y-2">
              <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
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
              <p className="text-[0.7rem] font-medium tracking-[0.22em] text-muted uppercase">
                {column.title}
              </p>
              <ul className="space-y-2 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-ink text-sage">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6">
          <p className="font-serif text-sm italic text-muted">
            Fait par {siteConfig.author}
          </p>
          <OutboundLink
            href={siteConfig.githubUrl}
            className="link-ink text-sm text-sage"
          >
            GitHub
          </OutboundLink>
        </div>
      </div>
    </footer>
  );
}
