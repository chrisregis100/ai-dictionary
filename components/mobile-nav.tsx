"use client";

import { Menu, X } from "@deemlol/next-icons";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useState } from "react";

import { OutboundLink } from "@/components/analytics/outbound-link";
import { Logo } from "@/components/brand/logo";
import { siteConfig } from "@/lib/site";

const navLinks = [
  { href: "/dictionnaire", label: "Dictionnaire" },
  { href: "/blog", label: "Blog" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/a-propos", label: "À propos" },
] as const;

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring md:hidden"
          aria-label="Ouvrir le menu"
        >
          <Menu size={18} strokeWidth={1.75} aria-hidden />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,calc(100vw-1.5rem))] flex-col border-l border-border bg-background p-6 shadow-xl focus:outline-none"
        >
          <div className="mb-8 flex items-center justify-between">
            <Dialog.Title className="sr-only">Navigation</Dialog.Title>
            <Logo />
            <Dialog.Close asChild>
              <button
                type="button"
                className="inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
                aria-label="Fermer le menu"
              >
                <X size={18} strokeWidth={1.75} aria-hidden />
              </button>
            </Dialog.Close>
          </div>
          <nav aria-label="Pages" className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Dialog.Close asChild key={link.href}>
                <Link
                  href={link.href}
                  className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-surface"
                >
                  {link.label}
                </Link>
              </Dialog.Close>
            ))}
          </nav>
          <div className="mt-auto border-t border-border pt-4">
            <OutboundLink
              href={siteConfig.githubUrl}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              GitHub
            </OutboundLink>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
