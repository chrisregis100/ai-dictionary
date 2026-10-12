import type { ReactNode } from "react";

export default function DictionaryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 lg:px-6 lg:py-10">
      {children}
    </div>
  );
}
