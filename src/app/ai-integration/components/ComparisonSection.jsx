"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Check, X } from "lucide-react";

export default function ComparisonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-slate-50 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Final Comparison
            </h2>
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">The difference between a flashy demo and a robust production system.</p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_2fr] bg-slate-100 border-b border-slate-200 font-bold text-sm tracking-widest uppercase text-slate-600 max-w-full overflow-x-auto">
               <div className="px-6 py-4">Architecture</div>
               <div className="px-6 py-4 border-l border-slate-200">Characteristics</div>
            </div>

            <div className="grid lg:grid-cols-[1fr_2fr] border-b border-slate-100 hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg">Vibe Coding</span>
                  <span className="text-sm text-slate-500 font-mono mt-1 w-max">End-to-End ML</span>
               </div>
               <div className="px-6 py-6 flex flex-col justify-center border-l border-slate-100">
                  <ul className="space-y-3 font-medium text-slate-700">
                     <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Fails unexpectedly because inventory changes.</li>
                     <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Cannot filter by "In Stock" effectively inside the Neural Net.</li>
                     <li className="flex items-start gap-2"><X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" /> Impossible to debug why a specific product was recommended.</li>
                  </ul>
               </div>
            </div>

            <div className="grid lg:grid-cols-[1fr_2fr] hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg flex items-center gap-2">Real Engineering</span>
                  <span className="text-sm text-emerald-600 font-mono mt-1 w-max font-bold bg-emerald-50 px-1 border border-emerald-200 rounded">Decoupled ML & Relational DB</span>
               </div>
               <div className="px-6 py-6 flex flex-col justify-center border-l border-slate-100">
                  <ul className="space-y-3 font-medium text-slate-700">
                     <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> High accuracy. ML only predicts what it sees.</li>
                     <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Instantly uses existing SQL joins to guarantee items are in stock.</li>
                     <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /> Easy to debug (Did the ML misclassify, or is the DB mapping wrong?).</li>
                  </ul>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
