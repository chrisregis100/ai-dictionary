import { ArrowRight, GitHub, Terminal } from "@deemlol/next-icons";

import { OutboundLink } from "@/components/analytics/outbound-link";
import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/utils";

export function LandingCta() {
  return (
    <section>
      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 lg:px-6 lg:py-24">
        <div
          className="orange-glow pointer-events-none absolute inset-x-8 top-1/2 h-48 -translate-y-1/2"
          aria-hidden
        />
        <div className="glass-card relative grid gap-10 rounded-3xl p-6 md:p-10 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="font-mono text-sm text-accent">Newsletter</p>
            <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
              Restez à la pointe.
            </h2>
            <p className="max-w-prose text-sm leading-6 text-muted-foreground text-pretty">
              Les nouvelles notions, les retours d&rsquo;expérience du blog et
              ce qui bouge dans le développement assisté par IA — une fois par
              mois, en français, sans spam.
            </p>
            <NewsletterForm />
          </div>
          <div className="flex flex-col justify-between gap-6 border-t border-border pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <div className="space-y-4">
              <Terminal
                size={22}
                strokeWidth={1.6}
                className="text-accent"
                aria-hidden
              />
              <h2 className="text-[clamp(1.7rem,3vw,2.35rem)] font-semibold tracking-tight text-balance">
                Contribuez.
              </h2>
              <p className="max-w-prose text-sm leading-6 text-muted-foreground text-pretty">
                Fiches Markdown, curriculum et application Next.js : tout est
                open source sur GitHub. Propose une notion ou améliore une
                fiche.
              </p>
            </div>
            <OutboundLink
              href={siteConfig.githubUrl}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "self-start",
              )}
            >
              <GitHub size={16} strokeWidth={1.75} aria-hidden />
              Voir le dépôt
              <ArrowRight size={14} strokeWidth={2} aria-hidden />
            </OutboundLink>
          </div>
        </div>
      </div>
    </section>
  );
}
