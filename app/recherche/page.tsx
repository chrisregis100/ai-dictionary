import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchScreen } from "@/components/search-screen";
import { getSearchEntries } from "@/lib/dictionary";

export const metadata: Metadata = {
  title: "Recherche",
  description:
    "Chercher une notion par son terme anglais, son slug ou un mot de la description.",
};

export default function RecherchePage() {
  const entries = getSearchEntries();

  return (
    <Suspense fallback={<p className="text-muted">Recherche…</p>}>
      <SearchScreen entries={entries} />
    </Suspense>
  );
}
