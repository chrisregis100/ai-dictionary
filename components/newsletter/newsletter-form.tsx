"use client";

import { ArrowRight } from "@deemlol/next-icons";
import { useActionState, useId } from "react";

import { subscribeToNewsletter } from "@/actions/newsletter-actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import type { NewsletterSource } from "@/lib/newsletter-audience";
import { initialNewsletterFormState } from "@/lib/newsletter-form-state";
import { cn } from "@/lib/utils";

const consentCopy: Record<NewsletterSource, string> = {
  newsletter: "J’accepte de recevoir la newsletter Dev Hero à cette adresse.",
  build: "J’accepte d’être prévenu du lancement de Dev Hero Build à cette adresse.",
  formations: "J’accepte d’être prévenu des formations Dev Hero à cette adresse.",
};

interface NewsletterFormProps {
  className?: string;
  source?: NewsletterSource;
}

export function NewsletterForm({
  className,
  source = "newsletter",
}: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialNewsletterFormState,
  );
  const emailId = useId();
  const consentId = useId();
  const feedbackId = useId();
  const honeypotId = useId();

  return (
    <form action={formAction} className={cn("relative space-y-3", className)}>
      <div className="absolute h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={honeypotId}>Ne pas remplir</label>
        <input
          id={honeypotId}
          name="website"
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          tabIndex={-1}
          defaultValue=""
        />
      </div>

      {/* Source (champ caché transmis à la Server Action) */}
      <input type="hidden" name="source" value={source} />

      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor={emailId}>
          Adresse e-mail
        </label>
        <Input
          id={emailId}
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="ton@email.dev"
          aria-describedby={feedbackId}
          className="h-10 w-full max-w-xs"
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Inscription…" : "S'inscrire"}
          <ArrowRight size={16} strokeWidth={2} aria-hidden />
        </Button>
      </div>

      {/* Consentement explicite requis */}
      <div className="flex items-start gap-2">
        <Checkbox
          id={consentId}
          name="consent"
          value="true"
          required
          defaultChecked={false}
          aria-describedby={feedbackId}
        />
        <label
          htmlFor={consentId}
          className="cursor-pointer text-xs leading-relaxed text-muted-foreground"
        >
          {consentCopy[source]}
        </label>
      </div>

      <p className="text-xs leading-relaxed text-muted-foreground">
        Seule ton adresse e-mail est enregistrée. Tu peux te désinscrire à tout
        moment via le lien en bas de chaque e-mail.
      </p>

      <p
        id={feedbackId}
        role="status"
        aria-live="polite"
        className={cn(
          "min-h-5 text-sm",
          state.status === "error" ? "text-destructive" : "text-muted-foreground",
        )}
      >
        {state.message}
      </p>
    </form>
  );
}
