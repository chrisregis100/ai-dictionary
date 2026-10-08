"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import type { SearchEntry } from "@/lib/dictionary";

interface SearchPaletteProps {
  entries: SearchEntry[];
}

export function SearchPalette({ entries }: SearchPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSelect = (slug: string) => {
    setOpen(false);
    router.push(`/notions/${slug}`);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-10 items-center gap-3 rounded-full bg-card px-3 text-sm text-muted ring-1 ring-line hover:text-ink"
      >
        Rechercher
        <kbd className="hidden rounded-md bg-paper px-1.5 py-0.5 font-sans text-xs sm:inline">
          ⌘K
        </kbd>
      </button>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-40 bg-ink/40" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed top-[12vh] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 rounded-3xl bg-card p-3 shadow-xl ring-1 ring-line"
          >
            <Dialog.Title className="sr-only">Rechercher une notion</Dialog.Title>
            <Command label="Notions" className="flex flex-col">
              <Command.Input
                placeholder="Token, cache, harnais…"
                className="h-12 w-full bg-transparent px-3 text-base outline-none placeholder:text-muted"
              />
              <Command.List className="max-h-80 overflow-y-auto">
                <Command.Empty className="px-3 py-6 text-sm text-muted">
                  Aucune notion.
                </Command.Empty>
                {entries.map((entry) => (
                  <Command.Item
                    key={entry.slug}
                    value={`${entry.term} ${entry.description} ${entry.sectionTitle}`}
                    onSelect={() => handleSelect(entry.slug)}
                    className="cursor-pointer rounded-2xl px-3 py-3 data-[selected=true]:bg-paper"
                  >
                    <span className="block font-semibold">{entry.term}</span>
                    <span className="mt-1 block text-sm text-muted">
                      {entry.description}
                    </span>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
