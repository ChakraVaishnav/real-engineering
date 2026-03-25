"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";

export default function TakeawaySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-slate-100 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-300/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-4 bg-white border border-slate-200 px-4 py-1.5 rounded-full inline-block text-slate-500 font-bold font-mono text-xs tracking-widest shadow-sm uppercase">
             System Design Storytelling
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-12 text-slate-900"
          >
            Engineering Scale
            <div className="mt-2 text-3xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
               The Evolution of an Architecture
            </div>
          </motion.h2>

          <motion.div variants={fadeUp} custom={2} className="w-full text-left bg-white border border-slate-200 rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-200/50 mb-12">
            
            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 text-center italic border-b border-slate-100 pb-8">
               We initially fetched all orders and <strong className="text-red-500 font-bold">crushed the server</strong>. We swapped to OFFSET pagination and hit <strong className="text-orange-500 font-bold">scaling roadblocks</strong>. We finally landed on <strong className="text-emerald-600 font-bold">Cursor-based Pagination</strong> to save the day.
            </p>

            <div className="space-y-6 max-w-2xl mx-auto">
               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold font-mono border border-slate-200 shadow-sm shrink-0">1</div>
                  <div>
                    <strong className="text-slate-900 text-lg border-b border-slate-200">Rate Limits</strong> 
                    <span className="text-slate-500 ml-2 font-medium">Control the sheer volume of external requests.</span>
                  </div>
               </div>

               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold font-mono border border-blue-200 shadow-sm shrink-0">2</div>
                  <div>
                    <strong className="text-slate-900 text-lg border-b border-blue-200">N+1 Queries</strong> 
                    <span className="text-slate-500 ml-2 font-medium">Reduce how many individual queries hit the database.</span>
                  </div>
               </div>

               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center font-bold font-mono border border-orange-200 shadow-sm shrink-0">3</div>
                  <div>
                    <strong className="text-slate-900 text-lg border-b border-orange-200">Pagination</strong> 
                    <span className="text-slate-500 ml-2 font-medium">Reduce the actual physical size of the data returned.</span>
                  </div>
               </div>

               <div className="flex gap-4 items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold font-mono border border-emerald-200 shadow-sm shrink-0">4</div>
                  <div>
                    <strong className="text-slate-900 text-lg border-b border-emerald-200">Indexing</strong> 
                    <span className="text-slate-500 ml-2 font-medium">Optimize the speed at which the database finds the data.</span>
                  </div>
               </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
