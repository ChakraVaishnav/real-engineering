"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { CheckCircle2, ArrowRightLeft, DatabaseZap, Network } from "lucide-react";

export default function ComparisonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-200 bg-purple-50 shadow-sm text-purple-700 text-xs font-bold uppercase tracking-widest mb-4">
              <ArrowRightLeft className="w-3 h-3" /> Tradeoffs
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Batching vs Joins
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              Which one should you pick? Both solve N+1, but they behave differently under load.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 relative">
            
            {/* Split screen divider line */}
            <div className="hidden md:block absolute top-[10%] bottom-[10%] left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-slate-200 to-transparent" />

            {/* Left: Batch Loading */}
            <motion.div variants={fadeUp} custom={1} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-emerald-300 hover:shadow-lg transition-all shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                  <Network className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-slate-900">Batch Loading (IN)</h3>
                   <span className="text-emerald-600 text-sm font-bold font-mono tracking-wider">MULTIPLE QUERIES</span>
                </div>
              </div>

               <div className="space-y-4 mb-8">
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                   <p className="text-slate-700 text-sm leading-relaxed font-medium"><strong className="text-emerald-700">Clean Data:</strong> No duplication over the network. Each row is fetched exactly once.</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                   <p className="text-slate-700 text-sm leading-relaxed font-medium"><strong className="text-emerald-700">Cache Friendly:</strong> Easy to cache queries independently (e.g., caching the users).</p>
                 </div>
                 <div className="flex items-start gap-3 opacity-70">
                   <span className="w-5 h-5 flex items-center justify-center font-bold text-slate-500 shrink-0 mt-0.5">✕</span>
                   <p className="text-slate-600 text-sm leading-relaxed">Multiple network round trips required.</p>
                 </div>
               </div>
            </motion.div>

            {/* Right: JOIN */}
            <motion.div variants={fadeUp} custom={2} className="bg-slate-50 border border-slate-200 rounded-3xl p-8 hover:border-blue-300 hover:shadow-lg transition-all shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                  <DatabaseZap className="w-6 h-6" />
                </div>
                <div>
                   <h3 className="text-2xl font-bold text-slate-900">Single JOIN</h3>
                   <span className="text-blue-600 text-sm font-bold font-mono tracking-wider">ONE QUERY</span>
                </div>
              </div>

               <div className="space-y-4 mb-8">
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                   <p className="text-slate-700 text-sm leading-relaxed font-medium"><strong className="text-blue-700">Fastest Network:</strong> Only one round trip to the database.</p>
                 </div>
                 <div className="flex items-start gap-3">
                   <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                   <p className="text-slate-700 text-sm leading-relaxed font-medium"><strong className="text-blue-700">Atomic:</strong> Guarantees a consistent snapshot of data at a single point in time.</p>
                 </div>
                 <div className="flex items-start gap-3 opacity-70">
                   <span className="w-5 h-5 flex items-center justify-center font-bold text-slate-500 shrink-0 mt-0.5">✕</span>
                   <p className="text-slate-600 text-sm leading-relaxed">Data duplication: Parent data is repeated for every child row (Cartesian explosion).</p>
                 </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
