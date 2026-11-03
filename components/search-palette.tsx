"use client";

import { Search } from "@deemlol/next-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";
import type { SearchEntry } from "@/lib/dictionary";
import { filterEntries } from "@/lib/search";
import { useTrackSearch } from "@/lib/use-track-search";

interface SearchPaletteProps {
  entries: SearchEntry[];
}

export function SearchPalette({ entries }: SearchPaletteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [paletteQuery, setPaletteQuery] = useState("");
  const paletteResults = filterEntries(entries, paletteQuery);
  useTrackSearch(open ? paletteQuery : "", paletteResults.length);

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
    const entry = entries.find((item) => item.slug === slug);
    if (entry) {
      trackEvent(ANALYTICS_EVENTS.termClick, {
        term: entry.term,
        slug: entry.slug,
      });
    }
    setOpen(false);
    setPaletteQuery("");
    router.push(`/dictionnaire/${slug}`);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) setPaletteQuery("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-surface/70 px-2.5 text-sm text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <Search size={15} strokeWidth={1.75} aria-hidden />
        <span className="hidden sm:inline">Rechercher</span>
        <kbd className="ml-1 hidden items-center rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[0.65rem] text-muted-foreground sm:inline-flex">
          ⌘K
        </kbd>
      </button>
      <Dialog.Root open={open} onOpenChange={handleOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-foreground/40 backdrop-blur-sm" />
          <Dialog.Content
            aria-describedby={undefined}
            className="fixed top-[12vh] left-1/2 z-50 w-[min(36rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-2xl"
          >
            <Dialog.Title className="sr-only">Rechercher une notion</Dialog.Title>
            <Command label="Notions" className="flex flex-col">
              <Command.Input
                value={paletteQuery}
                onValueChange={setPaletteQuery}
                placeholder="Token, cache, harnais…"
                className="h-12 w-full border-b border-border bg-transparent px-4 text-base outline-none placeholder:text-muted-foreground focus-visible:outline-none"
              />
              <Command.List className="max-h-80 overflow-y-auto p-1.5">
                <Command.Empty className="px-3 py-6 text-sm text-muted-foreground">
                  Aucune notion.
                </Command.Empty>
                {entries.map((entry) => (
                  <Command.Item
                    key={entry.slug}
                    value={`${entry.term} ${entry.description} ${entry.sectionTitle}`}
                    onSelect={() => handleSelect(entry.slug)}
                    className="cursor-pointer rounded-lg px-3 py-2.5 data-[selected=true]:bg-surface"
                  >
                    <span className="block text-sm font-medium text-foreground">
                      {entry.term}
                    </span>
                    <span className="mt-0.5 block text-sm text-muted-foreground">
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
