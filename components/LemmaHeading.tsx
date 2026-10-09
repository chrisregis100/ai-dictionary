import { grammarLabel, phoneticReading } from "@/lib/lemma";

interface LemmaHeadingProps {
  term: string;
  as?: "h1" | "h2";
}

export function LemmaHeading({ term, as: Tag = "h1" }: LemmaHeadingProps) {
  const isDisplay = Tag === "h1";

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <Tag
          className={
            isDisplay
              ? "font-serif text-[clamp(2.4rem,6vw,4.4rem)] leading-[1.08] tracking-[-0.03em] text-ink italic"
              : "font-serif text-2xl leading-tight text-ink italic"
          }
        >
          {term}
        </Tag>
        <span className="font-serif text-sm italic text-sage">
          {grammarLabel(term)}
        </span>
      </div>
      <p className="font-serif text-base italic text-muted">
        [{phoneticReading(term)}]
      </p>
    </div>
  );
}
