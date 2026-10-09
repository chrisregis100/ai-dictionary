import { Hero } from "@/components/Hero";
import { LearningPath } from "@/components/learning-path";

export default function HomePage() {
  return (
    <div className="space-y-14">
      <Hero />
      <LearningPath />
    </div>
  );
}
