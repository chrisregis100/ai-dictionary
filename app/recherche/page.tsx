import { Suspense } from "react";

import { SearchScreen } from "@/components/search-screen";
import { getSearchEntries } from "@/lib/dictionary";

export default function RecherchePage() {
  const entries = getSearchEntries();

  return (
    <Suspense fallback={<p className="text-muted">Recherche…</p>}>
      <SearchScreen entries={entries} />
    </Suspense>
  );
}
