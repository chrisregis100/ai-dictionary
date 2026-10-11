"use client";

import { ArrowRight } from "@deemlol/next-icons";
import { useActionState, useId } from "react";

import { subscribeToNewsletter } from "@/actions/newsletter-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { initialNewsletterFormState } from "@/lib/newsletter-form-state";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialNewsletterFormState,
  );
  const emailId = useId();
  const feedbackId = useId();

  return (
    <form action={formAction} className={cn("space-y-2", className)}>
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
