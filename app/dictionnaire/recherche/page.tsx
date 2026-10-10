import type { Metadata } from "next";
import { Suspense } from "react";

import { SearchScreen } from "@/components/search-screen";
import { getSearchEntries } from "@/lib/dictionary";

const rechercheDescription =
  "Chercher une notion par son terme anglais, son slug ou un mot de la description.";

export const metadata: Metadata = {
  title: "Recherche",
  description: rechercheDescription,
  alternates: { canonical: "/dictionnaire/recherche" },
};

export default function RecherchePage() {
  const entries = getSearchEntries();

  return (
    <div className="max-w-3xl">
      <Suspense fallback={<p className="text-muted">Recherche…</p>}>
        <SearchScreen entries={entries} />
      </Suspense>
    </div>
  );
}
