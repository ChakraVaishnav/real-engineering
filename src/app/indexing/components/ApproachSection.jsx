"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Copy, CheckCircle2, AlertTriangle, Zap } from "lucide-react";

export default function ApproachSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setPulse(p => p + 1);
    }, 3000); // Trigger B-tree search
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Zap className="w-3 h-3 text-amber-500" /> The B-Tree Index
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              O(log N) Lookups
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-6">
              When we add a composite index, the database builds a structured B-Tree. Instead of scanning 1,000,000 rows, it jumps <strong className="text-emerald-600 font-bold">directly</strong> to the correct starting node.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start mb-16">
            
            {/* Visual network lines */}
            <motion.div variants={fadeUp} custom={1} className="relative h-[650px] bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col items-center justify-between shadow-xl">
               
               <div className="w-full flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 z-10">
                  <span className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-widest">Searching Index For</span>
                  <div className="flex bg-slate-100 text-[10px] font-mono font-bold rounded overflow-hidden shadow-sm border border-slate-200">
                     <span className="px-3 py-1 bg-blue-100 text-blue-700">user_id: 123</span>
                     <span className="px-3 py-1 text-slate-600">created_at: DESC</span>
                  </div>
               </div>

               {/* B-Tree Visualization Area */}
               <div className="flex-1 w-full relative my-8 flex flex-col items-center justify-start gap-8">
                  
                  {/* Root Node */}
                  <motion.div 
                     className="bg-white border-2 border-slate-300 rounded shadow-sm px-4 py-2 font-mono text-xs font-bold relative z-10"
                     animate={pulse > 0 ? { borderColor: ['#cbd5e1', '#3b82f6', '#cbd5e1'] } : {}}
                     transition={{ duration: 0.5 }}
                  >
                     Root Node
                  </motion.div>

                  {/* Lines to level 2 */}
                  <svg className="absolute top-[40px] left-0 w-full h-[60px] z-0 overflow-visible" preserveAspectRatio="none">
                     <path d="M 50% 0 L 25% 100%" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                     <path d="M 50% 0 L 75% 100%" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                     {pulse > 0 && (
                        <motion.path d="M 50% 0 L 25% 100%" stroke="#3b82f6" strokeWidth="3" fill="none" 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 0.3 }}
                        />
                     )}
                  </svg>

                  {/* Level 2 Nodes */}
                  <div className="w-full flex justify-around relative z-10">
                     <motion.div 
                        className="bg-white border-2 border-slate-300 rounded shadow-sm px-4 py-2 font-mono text-xs font-bold"
                        animate={pulse > 0 ? { borderColor: ['#cbd5e1', '#3b82f6', '#cbd5e1'] } : {}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                     >
                        Users 1-500
                     </motion.div>
                     <div className="bg-white border-2 border-slate-300 rounded shadow-sm px-4 py-2 font-mono text-xs font-bold text-slate-400">
                        Users 501+
                     </div>
                  </div>

                  {/* Lines to level 3 */}
                  <svg className="absolute top-[140px] left-0 w-full h-[70px] z-0 overflow-visible" preserveAspectRatio="none">
                     <path d="M 25% 0 L 15% 100%" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                     <path d="M 25% 0 L 35% 100%" stroke="#e2e8f0" strokeWidth="2" fill="none" />
                     {pulse > 0 && (
                        <motion.path d="M 25% 0 L 35% 100%" stroke="#3b82f6" strokeWidth="3" fill="none" 
                           initial={{ pathLength: 0 }}
                           animate={{ pathLength: 1 }}
                           transition={{ duration: 0.3, delay: 0.6 }}
                        />
                     )}
                  </svg>

                  {/* Level 3 Leaf Nodes (The sorted index entries) */}
                  <div className="w-[85%] flex justify-between relative z-10">
                     <div className="bg-white border-2 border-slate-300 rounded shadow-sm px-2 py-2 font-mono text-[9px] font-bold text-slate-400 flex flex-col gap-1 items-center opacity-50">
                        <span>[u:10, t:Aug]</span>
                        <span>[u:89, t:Feb]</span>
                     </div>
                     <motion.div 
                        className="bg-emerald-50 border-2 border-emerald-400 rounded-lg shadow-emerald-500/20 shadow-lg px-3 py-2 font-mono text-[9px] font-bold text-emerald-800 flex flex-col items-center min-w-[120px]"
                        animate={pulse > 0 ? { scale: [1, 1.1, 1], borderColor: ['#34d399', '#10b981', '#34d399'] } : {}}
                        transition={{ duration: 0.5, delay: 0.9 }}
                     >
                        <div className="text-[10px] bg-emerald-100 text-emerald-800 px-2 rounded mb-1 border border-emerald-200">user_id: 123 ↑</div>
                        <div className="w-full flex justify-between border-b border-emerald-200 py-1"><span>{`>`} ptr</span> <span>Today 9AM</span></div>
                        <div className="w-full flex justify-between border-b border-emerald-200 py-1 bg-emerald-100"><span>{`>`} ptr</span> <span>Today 8AM</span></div>
                        <div className="w-full flex justify-between border-b border-emerald-200 py-1"><span>{`>`} ptr</span> <span>Yesterday</span></div>
                        <div className="w-full flex justify-between py-1 text-slate-500"><span>...</span> <span>...</span></div>
                     </motion.div>
                     <div className="bg-white border-2 border-slate-300 rounded shadow-sm px-2 py-2 font-mono text-[9px] font-bold text-slate-400 flex flex-col gap-1 items-center opacity-50">
                        <span>[u:400, t:Jan]</span>
                        <span>[u:499, t:Dec]</span>
                     </div>
                  </div>
                  
                  {/* Result Box */}
                  <div className="absolute top-[85%] left-1/2 -translate-x-1/2 flex flex-col items-center">
                     {pulse > 0 && (
                        <motion.div 
                           className="w-[2px] h-[30px] bg-emerald-500 origin-top mb-1"
                           initial={{ scaleY: 0 }}
                           animate={{ scaleY: 1, opacity: [1, 0] }}
                           transition={{ duration: 0.5, delay: 1.3 }}
                        />
                     )}
                     <motion.div 
                        className="bg-slate-900 text-white font-mono text-xs font-bold px-4 py-2 rounded-xl shadow-xl border-t border-slate-700"
                        animate={pulse > 0 ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                        transition={{ duration: 1.5, delay: 1.5 }}
                     >
                        Fetched 10 Row Pointers Instantly 🚀
                     </motion.div>
                  </div>
               </div>
            </motion.div>

            {/* SQL Code Blocks */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-6">
               
               <div className="bg-slate-900 shadow-xl border border-slate-800 rounded-2xl overflow-hidden font-mono text-sm relative group">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a16] border-b border-white/5">
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="w-3 h-3" /> adding_the_index.sql
                    </span>
                    <Copy className="w-4 h-4 text-slate-600 group-hover:text-slate-400 hover:scale-110 cursor-pointer transition-all" />
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[130px] text-slate-300">
                     <span className="text-blue-400 font-bold">CREATE INDEX</span> <span className="text-emerald-400">idx_orders_user_time</span><br/>
                     <span className="text-blue-400 font-bold">ON</span> <span className="text-amber-400">orders</span><span className="text-slate-400">(user_id, created_at DESC)</span><span className="text-slate-500">;</span>
                  </div>
               </div>

               <div className="bg-emerald-50 border border-emerald-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm">
                  <div className="p-5 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                        <Zap className="w-5 h-5 text-emerald-600" />
                     </div>
                     <div>
                        <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Execution Plan</div>
                        <div className="font-bold text-slate-900">Index Scan using idx_orders_user_time</div>
                     </div>
                  </div>
               </div>

               <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-[100px] -z-10" />
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1">
                     <AlertTriangle className="w-3 h-3 text-orange-500" /> IMPORTANT RULE
                  </h3>
                  
                  <p className="text-sm text-slate-700 font-medium mb-4">
                     Index composite order must identically match your <code className="bg-slate-100 font-mono text-xs px-1 rounded mx-0.5">WHERE</code> to <code className="bg-slate-100 font-mono text-xs px-1 rounded mx-0.5">ORDER BY</code> sequence.
                  </p>
                  
                  <div className="font-mono text-[11px] font-bold">
                     <div className="text-slate-400 line-through decoration-red-500 decoration-2 mb-1 pl-2 border-l border-red-200">
                        (created_at, user_id)
                     </div>
                     <div className="text-emerald-600 pl-2 border-l border-emerald-400 relative">
                        (user_id, created_at)
                        <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 bg-emerald-500 w-2 h-2 rounded-full ring-2 ring-white" />
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
