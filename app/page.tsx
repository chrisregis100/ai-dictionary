import { LearningPath } from "@/components/learning-path";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-semibold tracking-wide text-clay-deep uppercase">
          Parcours
        </p>
        <h1 className="max-w-xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Le vocabulaire, dans l&apos;ordre où il sert.
        </h1>
        <p className="max-w-prose text-base leading-7 text-muted">
          Sept sections, des termes anglais laissés tels quels, et une
          explication française pour chacun. Marque une notion comme comprise :
          ça reste sur cet appareil.
        </p>
      </header>
      <LearningPath />
    </div>
  );
}
