"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";

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
          </motion.div>

          {/* Setup grid */}
          <motion.div variants={fadeUp} custom={1} className="bg-white border border-slate-200 rounded-3xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-3 bg-slate-100 border-b border-slate-200 font-bold text-sm tracking-widest uppercase text-slate-600">
               <div className="px-6 py-4">Approach</div>
               <div className="px-6 py-4 text-center">Performance</div>
               <div className="px-6 py-4 text-center">Consistency</div>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-100 hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg">No Pagination</span>
                  <span className="text-sm text-slate-500 font-mono mt-1">SELECT *</span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 text-red-600 font-bold bg-red-50 px-3 py-1 rounded border border-red-200">
                     <span className="text-lg">❌</span> Terrible
                  </span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center">
                  <span className="text-red-500 font-bold text-xl">❌</span>
               </div>
            </div>

            <div className="grid grid-cols-3 border-b border-slate-100 hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg">LIMIT / OFFSET</span>
                  <span className="text-sm text-slate-500 font-mono mt-1">OFFSET 100K</span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 text-orange-600 font-bold bg-orange-50 px-3 py-1 rounded border border-orange-200">
                     <span className="text-lg">⚠️</span> Medium
                  </span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center">
                  <span className="text-red-500 font-bold text-xl">❌</span>
               </div>
            </div>

            <div className="grid grid-cols-3 hover:bg-slate-50 transition-colors">
               <div className="px-6 py-6 flex flex-col justify-center">
                  <span className="font-bold text-slate-900 block text-lg">Cursor-Based</span>
                  <span className="text-sm text-slate-500 font-mono mt-1">&lt; timestamp LIMIT 10</span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center">
                  <span className="inline-flex items-center gap-2 text-emerald-700 font-bold bg-emerald-100 px-3 py-1 rounded border border-emerald-300 shadow-sm">
                     <span className="text-lg">✅</span> Best
                  </span>
               </div>
               <div className="px-6 py-6 flex items-center justify-center">
                  <span className="text-emerald-500 font-bold text-xl">✅</span>
               </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
