import Link from "next/link";
import { Suspense } from "react";
import type { ReactNode } from "react";

import { stackServerApp } from "@/stack";

async function AdminGuard({ children }: { children: ReactNode }) {
  await stackServerApp.getUser({ or: "redirect" });
  return <>{children}</>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <p className="text-lg font-semibold tracking-tight text-foreground">
          Administration
        </p>
        <nav aria-label="Administration" className="flex items-center gap-4 text-sm">
          <Link
            href="/admin/articles"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Articles
          </Link>
          <Link
            href="/handler/sign-out"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Se déconnecter
          </Link>
        </nav>
      </div>
      <Suspense
        fallback={
          <p className="text-sm text-muted-foreground">
            Vérification de la session…
          </p>
        }
      >
        <AdminGuard>{children}</AdminGuard>
      </Suspense>
    </div>
  );
}
