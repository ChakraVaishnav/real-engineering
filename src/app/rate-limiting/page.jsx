import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import Approach1Section from "./components/Approach1Section";
import WhyFailsSection from "./components/WhyFailsSection";
import Approach2Section from "./components/Approach2Section";
import ComparisonSection from "./components/ComparisonSection";
import TakeawaySection from "./components/TakeawaySection";

export const metadata = {
  title: "When Rate Limiting Fails in Production | Engineering Case Study",
  description:
    "A real-world backend engineering deep-dive into rate limiting failures in distributed systems, and how Redis solves them.",
};
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function RateLimitingPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 relative">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all hover:scale-105">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      <HeroSection />
      <ProblemSection />
      <Approach1Section />
      <WhyFailsSection />
      <Approach2Section />
      <ComparisonSection />
      <TakeawaySection />
    </main>
  );
}
