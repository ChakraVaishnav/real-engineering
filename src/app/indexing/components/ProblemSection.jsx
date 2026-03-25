"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { AlertOctagon, ScanLine, XCircle } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [scanIndex, setScanIndex] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setScanIndex(prev => {
         if (prev >= 99) return 0;
         return prev + 1;
      });
    }, 250); // slower dramatic scan
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="py-28 px-6 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-orange-600 font-bold mb-3 block px-3 py-1 bg-orange-50 border border-orange-200 rounded-full inline-flex w-max shadow-sm">
              The Performance Killer
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Sequential Table Scan
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              When a query lacks an index, the database operates completely blind. It is forced to check <strong className="text-orange-600 font-bold">every single row</strong> in the table to determine if it matches your condition.
            </p>
          </motion.div>

          {/* Interactive Flow */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center mb-16">
             
             {/* Visualizer */}
             <motion.div variants={fadeUp} custom={1} className="relative h-[480px] bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col shadow-xl">
                
                <div className="flex justify-between items-center mb-6">
                   <div className="flex items-center gap-2 text-slate-700 font-mono font-bold text-[10px] tracking-widest uppercase">
                      <ScanLine className="w-4 h-4" /> 
                      Scanning 1,000,000 Rows
                   </div>
                   <div className="px-2 py-1 bg-red-100 text-red-700 rounded border border-red-200 font-bold font-mono text-[10px]">O(N) Complexity</div>
                </div>

                <div className="flex-1 relative border border-slate-200 bg-white rounded-xl overflow-hidden shadow-inner p-4 grid grid-cols-10 grid-rows-10 gap-1">
                   {[...Array(100)].map((_, i) => (
                      <div 
                         key={i} 
                         className={`w-full h-full rounded-sm transition-colors duration-100 border ${
                           scanIndex === i ? 'bg-orange-500 border-orange-600 scale-125 z-10 shadow-lg shadow-orange-500/50' 
                           : scanIndex > i ? 'bg-slate-100 border-slate-200 opacity-60' 
                           : 'bg-white border-slate-200'
                         }`}
                      />
                   ))}
                   
                   {/* Scanning Label Anchor */}
                   <div className="absolute inset-0 pointer-events-none">
                      {[...Array(100)].map((_, i) => {
                         if (scanIndex !== i) return null;
                         const row = Math.floor(i / 10);
                         const col = i % 10;
                         return (
                            <motion.div 
                               key={`label-${i}`}
                               className="absolute bg-slate-900 text-white text-[9px] font-mono px-1.5 py-0.5 rounded shadow-xl whitespace-nowrap"
                               style={{ 
                                  top: `${row * 10}%`, 
                                  left: `${col * 10}%`,
                                  marginTop: '-1.5rem',
                                  marginLeft: '-1rem'
                               }}
                               initial={{ opacity: 0, y: 5 }}
                               animate={{ opacity: 1, y: 0 }}
                               exit={{ opacity: 0, scale: 0.8 }}
                               transition={{ duration: 0.1 }}
                            >
                               Checking row {i * 10000}...
                            </motion.div>
                         )
                      })}
                   </div>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                   <div className="flex items-center text-xs text-orange-700 bg-orange-50 border border-orange-200 p-3 rounded-lg font-mono font-bold">
                      <span className="animate-pulse mr-2">⏳</span> Time remaining: ~4.2 seconds just for filtering.
                   </div>
                </div>

             </motion.div>

             {/* Code Block */}
             <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-4">
               <div className="bg-slate-50 border border-slate-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm group">
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                    <span className="text-slate-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm animate-pulse" />
                      slow_query.sql
                    </span>
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed">
                     <span className="text-slate-500 font-semibold italic">-- Wait for it...</span><br/>
                     <span className="text-blue-600 font-bold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-bold">FROM</span> <span className="text-emerald-600">orders</span><br/>
                     <span className="text-blue-600 font-bold">WHERE</span> <span className="text-slate-700">user_id =</span> <span className="text-amber-600">123</span><br/>
                     <span className="text-blue-600 font-bold">ORDER BY</span> <span className="text-slate-700">created_at</span> <span className="text-blue-600 font-bold">DESC</span><br/>
                     <span className="text-blue-600 font-bold">LIMIT</span> <span className="text-amber-600">10</span><span className="text-slate-500">;</span>
                  </div>
               </div>

               <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4" /> Execution Plan: Seq Scan
                 </h3>
                 <ul className="space-y-3 text-sm text-red-900 font-medium">
                    <li className="flex items-start gap-2">
                       <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                       Because there is no index, the DB must retrieve all 1,000,000 rows.
                    </li>
                    <li className="flex items-start gap-2">
                       <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                       It applies the filter <code className="bg-red-100 px-1 rounded mx-1">user_id=123</code> sequentially to every row.
                    </li>
                    <li className="flex items-start gap-2">
                       <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                       Then it performs an expensive memory sort before taking the top 10.
                    </li>
                 </ul>
               </div>
             </motion.div>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
