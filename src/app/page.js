import Link from "next/link";
import { ArrowRight, ShieldCheck, Database, LayoutList, Search, BrainCircuit } from "lucide-react";

const studies = [
  {
    title: "Rate Limiting",
    description: "Protecting systems from abuse and sheer volume using Redis token buckets.",
    href: "/rate-limiting",
    icon: ShieldCheck,
    color: "text-blue-500",
    bg: "bg-blue-50 border-blue-200"
  },
  {
    title: "N+1 Queries",
    description: "The silent backend killer. How loops create thousands of database trips.",
    href: "/n-plus-1-queries",
    icon: Database,
    color: "text-orange-500",
    bg: "bg-orange-50 border-orange-200"
  },
  {
    title: "Pagination",
    description: "Cursor vs OFFSET. Why loading millions of rows crashes your memory.",
    href: "/pagination",
    icon: LayoutList,
    color: "text-indigo-500",
    bg: "bg-indigo-50 border-indigo-200"
  },
  {
    title: "Database Indexing",
    description: "O(N) Scans vs O(log N) B-Trees. The final barrier to instant queries.",
    href: "/indexing",
    icon: Search,
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-200"
  },
  {
    title: "AI & Inventory Mapping",
    description: "Decoupling Computer Vision Inference from Relational DB Business Logic.",
    href: "/ai-integration",
    icon: BrainCircuit,
    color: "text-violet-500",
    bg: "bg-violet-50 border-violet-200"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-500/30 py-20 px-6">
      <div className="max-w-5xl mx-auto">

        <header className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-blue-700 text-sm font-semibold mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Interactive Case Studies</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Real Engineering <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Architecture</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
            Explore the difference between &quot;Vibe Coding&quot; and robust production engineering through interactive visual simulations.
          </p>
        </header>
        {/* Mobile View */}
        <div className="flex flex-col gap-6 md:hidden">
          {studies.map((study, idx) => {
            const Icon = study.icon;
            return (
              <Link key={idx} href={study.href} className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-blue-300 transition-all block relative overflow-hidden">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${study.bg}`}>
                  <Icon className={`w-6 h-6 ${study.color}`} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {study.title}
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-8">
                  {study.description}
                </p>
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Explore Study</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Desktop Lattice View */}
        <div className="hidden md:grid grid-cols-3 gap-8 items-center max-w-6xl mx-auto">
           {/* Left Column */}
           <div className="flex flex-col gap-8 transform -translate-y-12">
              <StudyCard study={studies[1]} /> {/* N+1 Queries */}
              <StudyCard study={studies[2]} /> {/* Pagination */}
           </div>

           {/* Center Column: Rate Limiting (Hero Card) */}
           <div className="flex flex-col relative z-20">
              {/* Glowing Aura */}
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full w-full h-full -z-10 animate-pulse" />
              
              <Link href={studies[0].href} className="group bg-white border-2 border-blue-400 rounded-3xl p-10 shadow-2xl hover:shadow-blue-500/20 transition-all block relative overflow-hidden transform scale-110 hover:scale-115">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border bg-blue-50 border-blue-200 shadow-inner`}>
                  <ShieldCheck className={`w-8 h-8 text-blue-600`} />
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Rate Limiting
                </h3>
                <p className="text-slate-600 font-medium leading-relaxed mb-10 text-lg">
                  Protecting systems from abuse and sheer volume using Redis token buckets.
                </p>
                <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between font-bold text-blue-500 group-hover:text-blue-600 transition-colors">
                  <span>Start Here</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
           </div>

           {/* Right Column */}
           <div className="flex flex-col gap-8 transform translate-y-12">
              <StudyCard study={studies[3]} /> {/* Database Indexing */}
              <StudyCard study={studies[4]} /> {/* AI & Inventory */}
           </div>
        </div>

      </div>
    </div>
  );
}

function StudyCard({ study }) {
  const Icon = study.icon;
  return (
    <Link href={study.href} className="group bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all block relative overflow-hidden">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${study.bg}`}>
        <Icon className={`w-6 h-6 ${study.color}`} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors">
        {study.title}
      </h3>
      <p className="text-slate-600 font-medium leading-relaxed mb-8">
        {study.description}
      </p>
      <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between text-sm font-bold text-slate-400 group-hover:text-slate-600 transition-colors">
        <span>Explore Study</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
