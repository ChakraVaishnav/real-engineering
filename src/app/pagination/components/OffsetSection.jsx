"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Copy, AlertCircle, TrendingDown } from "lucide-react";

export default function OffsetSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setScanProgress(p => {
         if (p >= 100) return 0;
         return p + 1.5; // Simulate slow scanning
      });
    }, 50);
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <section ref={ref} className="py-28 px-6 bg-slate-100 border-y border-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <TrendingDown className="w-3 h-3" /> Approach 1
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              The LIMIT / OFFSET Trap
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-6">
              To fix the flood, developers naturally reach for OFFSET. LIMIT says "how many", and OFFSET says "skip this many".
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
            
            {/* Visual network lines */}
            <motion.div variants={fadeUp} custom={1} className="relative h-[400px] bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-xl">
               
               <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-bold font-mono text-slate-500 uppercase tracking-widest">Database Table Memory</span>
                 <span className="text-[10px] font-bold font-mono text-red-500 uppercase tracking-widest bg-red-50 px-2 py-1 rounded">OFFSET 100,000</span>
               </div>

               {/* Slow DB Scan Simulation */}
               <div className="flex-1 relative border border-slate-200 bg-slate-50 rounded-xl overflow-hidden shadow-inner flex flex-col justify-start">
                  
                  {/* Rows */}
                  <div className="w-full flex flex-col absolute inset-0" style={{ transform: `translateY(-${scanProgress}%)` }}>
                     {[...Array(60)].map((_, i) => (
                        <div key={i} className={`w-full flex items-center border-b border-white h-[30px] px-4 font-mono text-[10px] ${scanProgress > (i/60)*100 ? 'bg-orange-100/50 opacity-40' : 'bg-slate-100 text-slate-400'}`}>
                           <span className="w-16">Row {(i*1666).toLocaleString()}</span>
                           <span className="text-slate-500 flex-1 ml-4 truncate">Data scanned and discarded...</span>
                        </div>
                     ))}
                  </div>

                  {/* Scanning Laser Focus */}
                  <div className="absolute top-[80%] left-0 right-0 h-[40px] bg-gradient-to-b from-transparent to-red-500/10 border-b-2 border-red-500 flex justify-between items-end px-2 pb-1 pointer-events-none">
                     <span className="text-[10px] font-bold font-mono text-red-600 bg-white shadow-sm px-1 overflow-hidden" style={{ width: scanProgress < 100 ? `${scanProgress}%` : '100%' }}>
                       Scanning {Math.floor(scanProgress)}%
                     </span>
                  </div>

               </div>
               
               <div className="text-xs text-orange-600 font-bold font-mono bg-orange-50 border border-orange-200 mt-4 p-3 rounded-xl shadow-sm leading-relaxed text-center flex items-center gap-2">
                  <AlertCircle className="shrink-0 w-4 h-4" />
                  The database MUST scan and compute the first 100k rows before throwing them away to give you the 10.
               </div>

            </motion.div>

            {/* SQL Code Block */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-6">
               <div className="bg-slate-50 border border-slate-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm group">
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                    <span className="text-slate-600 font-bold text-xs font-mono uppercase tracking-widest flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500 shadow-sm animate-pulse" />
                      offset_query.sql
                    </span>
                    <Copy className="w-4 h-4 text-slate-400 hover:text-slate-600 transition-colors" />
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[200px]">
                     <span className="text-blue-600 font-bold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-bold">FROM</span> <span className="text-emerald-600">orders</span><br/>
                     <span className="text-blue-600 font-bold">WHERE</span> <span className="text-slate-700">user_id =</span> <span className="text-amber-600">123</span><br/>
                     <span className="text-blue-600 font-bold">ORDER BY</span> <span className="text-slate-700">created_at</span> <span className="text-blue-600 font-bold">DESC</span><br/>
                     <span className="text-blue-600 font-bold">LIMIT</span> <span className="text-amber-600">10</span> <span className="bg-orange-100 border border-orange-300 rounded font-bold px-1 whitespace-nowrap"><span className="text-orange-700">OFFSET</span> <span className="text-amber-600">100000</span></span><span className="text-slate-500">;</span>
                  </div>
               </div>

               <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3 border-b border-slate-100 pb-2">
                    Why OFFSET falls apart
                 </h3>
                 <ul className="space-y-3 text-sm text-slate-600 font-medium">
                    <li className="flex items-start gap-2">
                       <span className="text-red-500 font-bold">❌</span>
                       <div><strong className="text-slate-900">Slows down over time:</strong> Page 1 is fast. Page 1,000 takes entire seconds because the DB scans the offset history every single time.</div>
                    </li>
                    <li className="flex items-start gap-2">
                       <span className="text-red-500 font-bold">❌</span>
                       <div><strong className="text-slate-900">Inconsistent Data:</strong> If new orders are inserted while the user clicks "Next Page", the offset shifts. The user will see duplicate rows or skip rows entirely.</div>
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
