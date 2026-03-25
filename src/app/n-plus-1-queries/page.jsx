import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import ExplosionSection from "./components/ExplosionSection";
import WhyBadSection from "./components/WhyBadSection";
import Solution1Section from "./components/Solution1Section";
import Solution2Section from "./components/Solution2Section";
import ComparisonSection from "./components/ComparisonSection";
import TakeawaySection from "./components/TakeawaySection";

export const metadata = {
  title: "N+1 Queries — The Silent Backend Killer | Engineering Case Study",
  description:
    "A premium database engineering deep-dive into the N+1 query problem, how it triggers cascades, and how to fix it with batch loading and JOINs.",
};
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NPlusOneQueriesPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 relative">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all hover:scale-105">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      <HeroSection />
      <ProblemSection />
      <ExplosionSection />
      <WhyBadSection />
      <Solution1Section />
      <Solution2Section />
      <ComparisonSection />
      <TakeawaySection />
    </main>
  );
}
