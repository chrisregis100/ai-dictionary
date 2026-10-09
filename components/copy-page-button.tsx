"use client";

import { Check, Copy } from "@deemlol/next-icons";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

interface CopyPageButtonProps {
  markdown: string;
}

export function CopyPageButton({ markdown }: CopyPageButtonProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  useEffect(() => {
    if (status === "idle") return;
    const timer = window.setTimeout(() => setStatus("idle"), 2000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(markdown);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };

  const label = status === "copied" ? "Copié" : "Copier la page";

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        variant="quiet"
        size="sm"
        onClick={() => void handleCopy()}
      >
        {status === "copied" ? (
          <Check size={16} strokeWidth={1.75} aria-hidden />
        ) : (
          <Copy size={16} strokeWidth={1.75} aria-hidden />
        )}
        {label}
      </Button>
      <p className="sr-only" aria-live="polite">
        {status === "copied" ? "Page copiée dans le presse-papier." : null}
        {status === "error" ? "Impossible de copier la page." : null}
      </p>
    </div>
  );
}
