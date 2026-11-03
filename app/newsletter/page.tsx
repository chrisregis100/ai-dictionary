import type { Metadata } from "next";
import { Suspense } from "react";

import { NewsletterForm } from "@/components/newsletter/newsletter-form";
import {
  newsletterSourceSchema,
  type NewsletterSource,
} from "@/lib/newsletter-audience";

const newsletterDescription =
  "La newsletter Dev Hero : le développement assisté par IA en français clair, directement dans ta boîte mail.";

const pageCopy: Record<
  NewsletterSource,
  { kicker: string; title: string; description: string }
> = {
  newsletter: {
    kicker: "Newsletter",
    title: "Reste à jour, en français.",
    description:
      "Les nouvelles notions du dictionnaire, les articles du blog et ce qui bouge dans le développement assisté par IA. Pas de spam, désinscription en un clic.",
  },
  build: {
    kicker: "Dev Hero Build",
    title: "Sois prévenu du lancement.",
    description:
      "Dev Hero Build n’est pas encore ouvert. Laisse ton e-mail : on t’écrit quand c’est prêt. Pas de spam, désinscription en un clic.",
  },
  formations: {
    kicker: "Formations",
    title: "Sois prévenu des formations.",
    description:
      "Les formations ne sont pas encore ouvertes. Laisse ton e-mail : on t’écrit quand une session est prête. Pas de spam, désinscription en un clic.",
  },
};

export const metadata: Metadata = {
  title: "Newsletter",
  description: newsletterDescription,
  alternates: { canonical: "/newsletter" },
};

export default function NewsletterPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 lg:px-6 lg:py-14">
      <div className="max-w-2xl">
        <Suspense fallback={<NewsletterPanel source="newsletter" />}>
          <NewsletterSignup searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}

async function NewsletterSignup({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const rawSource = typeof params.source === "string" ? params.source : undefined;
  const source = newsletterSourceSchema.parse(rawSource);

  return <NewsletterPanel source={source} />;
}

function NewsletterPanel({ source }: { source: NewsletterSource }) {
  const copy = pageCopy[source];

  return (
    <div className="space-y-8">
      <header className="space-y-4">
        <p className="text-xs font-medium tracking-widest text-muted-foreground uppercase">
          {copy.kicker}
        </p>
        <h1 className="text-[clamp(2.2rem,5vw,3.5rem)] leading-[1.08] font-semibold tracking-[-0.04em] text-foreground text-balance">
          {copy.title}
        </h1>
        <p className="max-w-prose text-base leading-7 text-muted-foreground text-pretty">
          {copy.description}
        </p>
      </header>
      <NewsletterForm source={source} />
    </div>
  );
}
