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
            <p className="text-lg text-slate-600 font-medium max-w-2xl mx-auto">See how drastically indexes change filtering and sorting performance over large datasets.</p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-[1fr_200px_200px] bg-slate-100 border-b border-slate-200 font-bold text-sm tracking-widest uppercase text-slate-600 max-w-full overflow-x-auto">
               <div className="px-6 py-4">Database State</div>
               <div className="px-6 py-4 text-center border-l border-slate-200">Access Type</div>
               <div className="px-6 py-4 text-center border-l border-slate-200">Performance</div>
            </div>

            <div className="grid grid-cols-[1fr_200px_200px] border-b border-slate-100 hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg">No Index</span>
                  <span className="text-sm text-slate-500 font-mono mt-1 w-max">Table Scan</span>
               </div>
               <div className="px-6 py-6 flex flex-col items-center justify-center border-l border-slate-100 font-mono font-bold text-sm">
                  <span className="text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">O(N)</span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center border-l border-slate-100">
                  <span className="inline-flex items-center gap-2 text-red-600 font-bold">
                     <X className="w-5 h-5 border-2 border-red-600 rounded-full p-0.5" /> Slow
                  </span>
               </div>
            </div>

            <div className="grid grid-cols-[1fr_200px_200px] hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg flex items-center gap-2">With B-Tree Index</span>
                  <span className="text-sm text-emerald-600 font-mono mt-1 w-max font-bold bg-emerald-50 px-1 border border-emerald-200 rounded">Index Scan</span>
               </div>
               <div className="px-6 py-6 flex flex-col items-center justify-center border-l border-slate-100 font-mono font-bold text-sm">
                  <span className="text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">O(log N)</span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center border-l border-slate-100">
                  <span className="inline-flex items-center gap-2 text-emerald-600 font-bold shadow-sm bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                     <Check className="w-5 h-5 border-2 border-emerald-600 rounded-full p-0.5" /> Fast
                  </span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
