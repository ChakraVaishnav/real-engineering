import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import ApproachSection from "./components/ApproachSection";
import ComparisonSection from "./components/ComparisonSection";

export const metadata = {
  title: "AI & System Architecture — Real Engineering",
  description:
    "How to properly decouple machine learning inference from business logic and database inventory.",
};
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AIIntegrationPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 relative">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all hover:scale-105">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      <HeroSection />
      <ProblemSection />
      <ApproachSection />
      <ComparisonSection />
    </main>
  );
}
