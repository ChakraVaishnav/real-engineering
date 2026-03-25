"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { User, Server, Database } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-3 block">
              The Scenario
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              "Just fetch the recent orders"
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              It starts innocent enough: you need to display a list of the 100 most recent orders.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="bg-slate-50 border border-slate-200 shadow-xl shadow-slate-200/50 rounded-2xl p-6 text-left font-mono text-sm max-w-2xl mx-auto mb-10"
          >
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-slate-500 font-sans text-xs font-bold uppercase tracking-wider">Initial Query</span>
            </div>
            <div className="text-[14px]">
              <span className="text-blue-600">SELECT</span>{" "}
              <span className="text-slate-700">*</span>{" "}
              <span className="text-blue-600">FROM</span>{" "}
              <span className="text-emerald-600">orders</span>{" "}
              <span className="text-blue-600">ORDER BY</span>{" "}
              <span className="text-slate-700">created_at</span>{" "}
              <span className="text-blue-600">DESC LIMIT</span>{" "}
              <span className="text-amber-600">100</span><span className="text-slate-500">;</span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="relative bg-white border border-blue-100 rounded-2xl p-8 shadow-xl shadow-blue-900/5"
          >
            <div className="relative flex items-center justify-between" style={{ minHeight: "180px" }}>
              <div className="flex flex-col items-center gap-2 z-10 w-24">
                <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 shadow-sm">
                  <User className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-500 font-mono tracking-wider font-bold">Client</span>
              </div>

              {/* Arrow line user→server */}
              <div className="flex-1 px-4 relative flex items-center h-full">
                <div className="w-full h-1 bg-blue-100 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-blue-400 w-1/3 blur-[1px]"
                    animate={{ left: ["-50%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 z-10 w-24">
                <div className="w-16 h-16 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shadow-sm">
                  <Server className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-500 font-mono tracking-wider font-bold">Backend</span>
              </div>

              {/* Arrow server→DB */}
              <div className="flex-1 px-4 relative flex items-center h-full">
                <div className="w-full h-1 bg-emerald-100 rounded-full relative overflow-hidden">
                   {inView && (
                    <>
                     <motion.div 
                       className="absolute top-0 bottom-0 left-0 bg-blue-400 w-1/3 blur-[1px]"
                       animate={{ left: ["-50%", "150%"] }}
                       transition={{ duration: 1.5, ease: "linear" }}
                     />
                     <motion.div 
                       className="absolute top-0 bottom-0 right-0 bg-emerald-400 w-1/3 blur-[1px]"
                       initial={{ right: "-50%" }}
                       animate={{ right: ["-50%", "150%"] }}
                       transition={{ delay: 1.5, duration: 1.5, ease: "linear" }}
                     />
                    </>
                   )}
                </div>
                {inView && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute top-8 left-1/2 -translate-x-1/2 text-[10px] text-emerald-700 font-mono font-bold border border-emerald-200 bg-emerald-50 px-2 py-0.5 rounded-full shadow-sm"
                  >
                    100 Orders Returned
                  </motion.span>
                )}
              </div>

              <div className="flex flex-col items-center gap-2 z-10 w-24">
                <div className="w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-500 shadow-sm">
                  <Database className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-500 font-mono tracking-wider font-bold">Database</span>
              </div>
            </div>
            
            <div className="mt-8 pt-4 text-center border-t border-slate-100">
              <p className="text-slate-500 text-sm font-medium">One request to fetch the list of 100 orders. So far, so good.</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
