import HeroSection from "./components/HeroSection";
import ProblemSection from "./components/ProblemSection";
import OffsetSection from "./components/OffsetSection";
import CursorSection from "./components/CursorSection";
import ComparisonSection from "./components/ComparisonSection";
import TakeawaySection from "./components/TakeawaySection";

export const metadata = {
  title: "Pagination Data Floods — Engineering Case Study",
  description:
    "A deep dive into why fetching all data breaks systems, why OFFSET pagination gets slow, and how Cursor-based pagination saves the day.",
};
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PaginationPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-500/30 relative">
      <div className="absolute top-6 left-6 z-50">
        <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:text-blue-600 hover:border-blue-300 shadow-sm transition-all hover:scale-105">
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
      </div>
      <HeroSection />
      <ProblemSection />
      <OffsetSection />
      <CursorSection />
      <ComparisonSection />
      <TakeawaySection />
    </main>
  );
}
