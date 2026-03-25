"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { CheckCircle2, TrendingUp, Cpu } from "lucide-react";

export default function CursorSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setPulse(p => p + 1);
    }, 1500); // chunk fetch frequency
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="py-28 px-6 bg-white border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <CheckCircle2 className="w-3 h-3" /> The Golden Standard
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Cursor-Based Pagination
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-6">
              Instead of skipping blind offsets, we pass a physical bookmark (the cursor) back to the DB. "Give me exactly 10 rows arriving <strong className="text-emerald-700">AFTER</strong> this specific timestamp."
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[400px_1fr] gap-8 items-start mb-16">
            
            {/* Visual network lines */}
            <motion.div variants={fadeUp} custom={1} className="relative min-h-[450px] bg-slate-50 border border-slate-200 rounded-3xl p-6 flex flex-col items-center justify-between shadow-xl">
               
               {/* Backend Node */}
               <div className="bg-white border border-slate-300 w-full rounded-2xl p-4 shadow-sm z-10 flex flex-col items-center">
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-slate-500 mb-2">Backend Fetch</span>
                  <div className="h-6 overflow-hidden w-full bg-slate-100 rounded flex gap-1 p-1">
                     <motion.div 
                        key={pulse}
                        className="w-4 h-full bg-emerald-400 rounded-sm"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                     />
                     <motion.div 
                        key={pulse + 'b'}
                        className="w-4 h-full bg-emerald-400 rounded-sm"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                     />
                  </div>
               </div>

               {/* Chunks flow */}
               <div className="flex-1 w-20 bg-slate-100 border-x border-slate-200 relative overflow-hidden flex flex-col items-center justify-center">
                   <div className="absolute inset-x-0 h-px bg-slate-300 top-1/2 -translate-y-1/2" />
                   <span className="absolute top-1/2 left-full pl-2 -translate-y-1/2 text-[9px] font-mono font-bold text-slate-400 whitespace-nowrap">O(1) Seek</span>

                   <motion.div 
                     key={`chunk-${pulse}`}
                     initial={{ top: '100%', opacity: 1 }}
                     animate={{ top: '-20%', opacity: [1, 1, 0] }}
                     transition={{ duration: 1.2, ease: "easeOut" }}
                     className="absolute w-12 h-12 bg-emerald-100 border-2 border-emerald-400 rounded-lg shadow-sm flex items-center justify-center text-[10px] font-mono font-bold text-emerald-700"
                   >
                      Next 10
                   </motion.div>
               </div>

               {/* Database Index Area */}
               <div className="bg-white border border-emerald-200 w-full rounded-2xl p-4 shadow-sm z-10 relative overflow-hidden flex flex-col items-center">
                  <div className="absolute inset-0 bg-emerald-50 pointer-events-none" />
                  <span className="text-[10px] font-bold font-mono uppercase tracking-widest text-emerald-700 relative z-10 mb-2 flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Indexed DB
                  </span>
                  
                  <div className="w-full flex justify-between px-2 relative z-10">
                     <span className="text-[10px] font-mono text-slate-400">...rows</span>
                     <span className="text-[10px] font-mono bg-emerald-100 text-emerald-700 font-bold px-1 border border-emerald-300 rounded shadow-sm">CURSOR O(log N)</span>
                  </div>
               </div>
               
            </motion.div>

            {/* SQL Code Blocks */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-6">
               
               <div className="bg-slate-50 border border-emerald-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm relative">
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-emerald-100">
                    <span className="text-emerald-700 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                       cursor_fetch.sql
                    </span>
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[180px]">
                     <span className="text-blue-600 font-bold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-bold">FROM</span> <span className="text-emerald-600">orders</span><br/>
                     <span className="text-blue-600 font-bold">WHERE</span> <span className="text-slate-700">user_id =</span> <span className="text-amber-600">123</span><br/>
                     <span className="text-emerald-700 font-bold bg-emerald-100 px-1 rounded border border-emerald-300">AND created_at &lt; '2026-03-25T10:00:00'</span><br/>
                     <span className="text-blue-600 font-bold">ORDER BY</span> <span className="text-slate-700">created_at</span> <span className="text-blue-600 font-bold">DESC</span><br/>
                     <span className="text-blue-600 font-bold">LIMIT</span> <span className="text-amber-600">10</span><span className="text-slate-500">;</span>
                  </div>
               </div>

               <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden font-mono text-sm">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a16] border-b border-white/5">
                    <span className="text-blue-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                       <TrendingUp className="w-3 h-3" /> Turbocharge With Index
                    </span>
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[140px] text-slate-300">
                     <span className="text-blue-400 font-bold">CREATE INDEX</span> <span className="text-emerald-400">idx_orders_user_created</span><br/>
                     <span className="text-blue-400 font-bold">ON</span> <span className="text-amber-400">orders</span><span className="text-slate-400">(user_id, created_at DESC)</span><span className="text-slate-500">;</span>
                     <div className="mt-4 text-xs font-sans text-slate-400">
                       🔥 Allows the DB to jump straight to the exact row without scanning.
                     </div>
                  </div>
               </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
