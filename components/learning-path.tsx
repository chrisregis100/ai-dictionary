import { curriculum } from "@/content/curriculum";
import { ProgressMeter } from "@/components/progress-meter";
import { TermNode } from "@/components/term-node";
import { getEntriesForSection } from "@/lib/dictionary";

export function LearningPath() {
  const publishedCount = curriculum.reduce(
    (total, section) => total + section.terms.length,
    0,
  );

  return (
    <div className="space-y-8">
      <ProgressMeter total={publishedCount} />
      <ol className="space-y-10">
        {curriculum.map((section, index) => {
          const entries = getEntriesForSection(section.id);
          return (
            <li key={section.id} className="relative pl-10">
              <span
                aria-hidden
                className="absolute top-0 left-0 flex size-8 items-center justify-center rounded-full bg-clay text-sm font-semibold text-white"
              >
                {index + 1}
              </span>
              {index < curriculum.length - 1 ? (
                <span
                  aria-hidden
                  className="absolute top-8 bottom-[-2.5rem] left-[0.95rem] w-px bg-clay/35"
                />
              ) : null}
              <h2 className="font-serif text-2xl text-ink">{section.title}</h2>
              <p className="mt-1 max-w-prose text-sm leading-6 text-muted">
                {section.summary}
              </p>
              {entries.length === 0 ? (
                <p className="mt-4 rounded-2xl border border-dashed border-line bg-card/60 px-4 py-3 text-sm text-muted">
                  À venir. Le sentier est prêt, les fiches s&apos;ajoutent sans
                  changer de page.
                </p>
              ) : (
                <ol className="mt-4 space-y-3">
                  {entries.map((entry) => (
                    <TermNode
                      key={entry.slug}
                      slug={entry.slug}
                      term={entry.term}
                      description={entry.description}
                    />
                  ))}
                </ol>
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
