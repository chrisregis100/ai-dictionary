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
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
        <p className="font-serif text-lg italic text-ink">Administration</p>
        <nav aria-label="Administration" className="flex items-center gap-4 text-sm">
          <Link href="/admin/articles" className="link-ink text-sage">
            Articles
          </Link>
          <Link href="/handler/sign-out" className="link-ink text-sage">
            Se déconnecter
          </Link>
        </nav>
      </div>
      <Suspense
        fallback={<p className="text-sm text-muted">Vérification de la session…</p>}
      >
        <AdminGuard>{children}</AdminGuard>
      </Suspense>
    </div>
  );
}
