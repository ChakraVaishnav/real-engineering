"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { containerVariants, fadeUp } from "./animations";
import { Server, Database, Flame, CheckCircle } from "lucide-react";

export default function ExplosionSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [isOptimized, setIsOptimized] = useState(false);
  const [activeBox, setActiveBox] = useState(-1);
  const [stage, setStage] = useState(0);

  // Unoptimized Loop Sequence
  useEffect(() => {
    if (!inView) return;
    
    if (isOptimized) {
      setStage(3);
      setActiveBox(-1);
      return;
    }

    setStage(1);
    const t1 = setTimeout(() => {
      setStage(2);
      let current = 0;
      const interval = setInterval(() => {
        if (current >= 100) {
          clearInterval(interval);
          setStage(4); // Finished loop
          setActiveBox(-1);
          return;
        }
        setActiveBox(current);
        current++;
      }, 150); // slower loop simulation

      return () => clearInterval(interval);
    }, 1000);

    return () => clearTimeout(t1);
  }, [inView, isOptimized]);

  // Calculate dynamic query count
  const queryCount = isOptimized 
    ? 3 
    : stage === 1 ? 1 : activeBox >= 0 ? 1 + (activeBox + 1) * 2 : stage >= 4 ? 201 : 1;

  return (
    <section ref={ref} className="py-28 px-6 bg-slate-100 relative overflow-hidden border-y border-slate-200">
      
      {/* Background Danger Glow (Only when unoptimized) */}
      <motion.div
        className="absolute bottom-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-red-400/0 rounded-full blur-[150px] pointer-events-none"
        animate={!isOptimized && activeBox >= 0 ? { backgroundColor: "rgba(239, 68, 68, 0.15)" } : { backgroundColor: "rgba(239, 68, 68, 0)" }}
        transition={{ duration: 0.5 }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-4 shadow-sm transition-colors ${isOptimized ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-red-200 bg-red-50 text-red-600'}`}>
              {isOptimized ? <CheckCircle className="w-3 h-3" /> : <Flame className="w-3 h-3" />}
              {isOptimized ? 'The Fix (Batching)' : 'The N+1 Explosion'}
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              {isOptimized ? '3 Clean Queries' : 'The Iteration Trap'}
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium h-[56px]">
              {isOptimized 
                ? "Switching to IN clauses fetches all required users and items across all orders in just two large batch queries." 
                : "Watch what happens when you loop through 100 orders and fire database queries from inside the loop."}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
            
            {/* Left: Interactive Visualizer */}
            <motion.div variants={fadeUp} custom={1} className="relative min-h-[550px] bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-xl">
              
              <div className="flex justify-center mt-2 relative z-10">
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 px-6 py-3 rounded-2xl shadow-sm text-slate-700">
                  <Server className="w-6 h-6 text-slate-500" />
                  <span className="text-sm font-mono font-bold">Backend Service</span>
                </div>
              </div>

              {/* Central Grid Area */}
              <div className="flex-1 w-full flex flex-col items-center justify-center relative mt-8 mb-4">
                
                {/* 100 Order Boxes Array */}
                <div className="grid grid-cols-10 gap-1.5 w-full max-w-[280px] relative z-20">
                  {[...Array(100)].map((_, i) => {
                     const isPast = activeBox > i || stage >= 4;
                     const isActive = activeBox === i && !isOptimized;
                     const isOptimizedActive = isOptimized;

                     return (
                        <div key={i} className="relative w-full aspect-square">
                           <div 
                              className={`w-full h-full rounded shadow-sm transition-colors duration-200 ${
                                 isOptimizedActive ? 'bg-emerald-100 border border-emerald-300' 
                                 : isActive ? 'bg-red-500 scale-125 z-10 shadow-red-500/50' 
                                 : isPast ? 'bg-slate-200 opacity-50' 
                                 : 'bg-blue-50 border border-blue-200'
                              }`}
                           />
                           
                           {/* Active Box Tooltip & Lasers */}
                           {isActive && (
                              <div className="absolute top-1/2 left-1/2 z-50 pointer-events-none">
                                 {/* Floating Label */}
                                 <motion.div 
                                    initial={{ y: 0, opacity: 0 }}
                                    animate={{ y: -30, opacity: 1 }}
                                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-slate-900 text-white text-[10px] font-mono font-bold px-2 py-1 rounded shadow-xl whitespace-nowrap"
                                 >
                                    Order #{i + 1}
                                 </motion.div>

                                 {/* Firing Lasers Down to DB */}
                                 <motion.div 
                                    className="absolute top-full left-[-2px] w-[2px] bg-orange-500 origin-top shadow-[0_0_5px_rgba(249,115,22,1)]"
                                    initial={{ height: 0, opacity: 1 }}
                                    animate={{ height: 180, opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                 />
                                 <motion.div 
                                    className="absolute top-full right-[-2px] w-[2px] bg-red-500 origin-top shadow-[0_0_5px_rgba(239,68,68,1)]"
                                    initial={{ height: 0, opacity: 1 }}
                                    animate={{ height: 180, opacity: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 }}
                                 />
                              </div>
                           )}
                        </div>
                     )
                  })}
                </div>

                {/* Optimized Clean Lines */}
                {isOptimized && (
                   <div className="absolute top-[80%] left-1/2 -translate-x-1/2 w-full h-[100px] flex justify-center items-start gap-12 z-0 pointer-events-none opacity-80">
                      <motion.div className="w-[3px] rounded-full h-full bg-blue-400" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.2, duration: 1, repeat: Infinity, repeatType: 'reverse' }} style={{ originY: 0 }} />
                      <motion.div className="w-[3px] rounded-full h-full bg-emerald-400" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.4, duration: 1, repeat: Infinity, repeatType: 'reverse' }} style={{ originY: 0 }} />
                      <motion.div className="w-[3px] rounded-full h-full bg-orange-400" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.6, duration: 1, repeat: Infinity, repeatType: 'reverse' }} style={{ originY: 0 }} />
                   </div>
                )}
              </div>

              {/* Database node */}
              <div className="flex justify-center mt-4 mb-2 z-10 relative">
                <motion.div 
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl border bg-white shadow-lg transition-colors ${isOptimized ? 'border-emerald-200 relative' : activeBox >= 0 ? 'border-red-300 relative' : 'border-slate-200 relative'}`}
                  animate={!isOptimized && activeBox >= 0 ? { y: [0, 2, -1, 0] } : {}}
                  transition={{ repeat: Infinity, duration: 0.2 }}
                >
                   {/* Danger/Safe Pulse */}
                   {(!isOptimized && activeBox >= 0) && (
                     <motion.div className="absolute inset-0 rounded-2xl bg-red-50 -z-10" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.3 }} />
                   )}
                   {(isOptimized) && (
                     <motion.div className="absolute inset-0 rounded-2xl bg-emerald-50 -z-10" animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }} />
                   )}

                  <Database className={`w-8 h-8 ${isOptimized ? 'text-emerald-500' : activeBox >= 0 ? "text-red-500" : "text-slate-400"}`} />
                  <span className={`text-base font-mono font-bold ${isOptimized ? 'text-emerald-700' : activeBox >= 0 ? "text-red-700" : "text-slate-600"}`}>Database</span>
                </motion.div>
              </div>

              {/* Query Counter Overlay */}
              <div className="absolute top-6 right-6 z-30">
                <div className="bg-white/90 backdrop-blur border border-slate-200 rounded-xl px-5 py-3 text-right shadow-lg">
                  <div className="text-[10px] text-slate-500 font-bold font-mono uppercase tracking-wider mb-1">Live Query Count</div>
                  <div className={`text-4xl font-black font-mono tracking-tighter transition-colors ${isOptimized ? "text-emerald-600" : activeBox >= 0 || stage >= 4 ? "text-red-600" : "text-blue-600"}`}>
                    {queryCount}
                  </div>
                </div>
              </div>

            </motion.div>

            {/* Right: Timeline & Controls */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-4">
              
              {/* Toggle Switch */}
              <div className="flex bg-slate-200/70 p-1.5 rounded-full mb-4 relative shadow-inner">
                 <button onClick={() => setIsOptimized(false)} className={`flex-1 flex justify-center py-2.5 text-sm font-bold z-10 transition-colors ${!isOptimized ? 'text-slate-900' : 'text-slate-500 hover:text-slate-700'}`}>
                    Unoptimized (201)
                 </button>
                 <button onClick={() => setIsOptimized(true)} className={`flex-1 flex justify-center py-2.5 text-sm font-bold z-10 transition-colors ${isOptimized ? 'text-slate-900' : 'text-emerald-600 hover:text-emerald-700'}`}>
                    Optimized (3)
                 </button>
                 <motion.div 
                   className="absolute top-1.5 bottom-1.5 left-1.5 bg-white rounded-full shadow border border-slate-200"
                   initial={false}
                   animate={{ width: "calc(50% - 6px)", x: isOptimized ? "100%" : "0%" }}
                   transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                 />
              </div>

              {/* Steps Timeline - Unoptimized */}
              {!isOptimized && (
                 <div className="space-y-3">
                    <div className={`p-4 rounded-xl border transition-all duration-300 ${stage >= 1 ? "bg-blue-50 border-blue-200" : "bg-white border-slate-200 opacity-50"}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold font-mono text-blue-700 uppercase tracking-widest">1. Initial Fetch</span>
                          <span className="text-[10px] font-mono font-bold bg-white text-blue-600 px-2 py-0.5 rounded border border-blue-100 shadow-sm">1 Query</span>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed">
                          <span className="text-blue-600 font-semibold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-semibold">FROM</span> orders <span className="text-blue-600 font-semibold">LIMIT</span> 100
                       </div>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all duration-300 ${stage >= 2 ? "bg-orange-50 border-orange-200" : "bg-white border-slate-200 opacity-50"} ${activeBox >= 0 ? "shadow-md scale-[1.02]" : ""}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold font-mono text-orange-700 uppercase tracking-widest flex items-center gap-2">
                             2. Loop: Users
                             {activeBox >= 0 && <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-white text-orange-600 px-2 py-0.5 rounded border border-orange-100 shadow-sm">100 Queries</span>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed">
                          <span className="text-slate-500 italic">for order in orders:</span><br/>
                          &nbsp;&nbsp;<span className="text-orange-600 font-semibold">SELECT</span> * <span className="text-orange-600 font-semibold">FROM</span> users <span className="text-orange-600 font-semibold">WHERE</span> id=?
                       </div>
                    </div>

                    <div className={`p-4 rounded-xl border transition-all duration-300 ${stage >= 2 ? "bg-red-50 border-red-200" : "bg-white border-slate-200 opacity-50"} ${activeBox >= 0 ? "shadow-md scale-[1.02]" : ""}`}>
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold font-mono text-red-700 uppercase tracking-widest flex items-center gap-2">
                             3. Loop: Items
                             {activeBox >= 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />}
                          </span>
                          <span className="text-[10px] font-mono font-bold bg-white text-red-600 px-2 py-0.5 rounded border border-red-100 shadow-sm">100 Queries</span>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed">
                          <span className="text-slate-500 italic">for order in orders:</span><br/>
                          &nbsp;&nbsp;<span className="text-red-600 font-semibold">SELECT</span> * <span className="text-red-600 font-semibold">FROM</span> items <span className="text-red-600 font-semibold">WHERE</span> order_id=?
                       </div>
                    </div>
                 </div>
              )}

              {/* Steps Timeline - Optimized */}
              {isOptimized && (
                 <div className="space-y-3">
                    <div className="p-4 rounded-xl border bg-blue-50 border-blue-200 shadow-sm">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold font-mono text-blue-700 uppercase tracking-widest">1. Fetch Orders</span>
                          <span className="text-[10px] font-mono font-bold bg-white text-blue-600 px-2 py-0.5 rounded border border-blue-100 shadow-sm">1 Query</span>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed">
                          <span className="text-blue-600 font-semibold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-semibold">FROM</span> orders LIMIT 100
                       </div>
                    </div>

                    <div className="p-4 rounded-xl border bg-emerald-50 border-emerald-200 shadow-sm">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold font-mono text-emerald-700 uppercase tracking-widest flex items-center gap-2">2. Batch: Users</span>
                          <span className="text-[10px] font-mono font-bold bg-white text-emerald-600 px-2 py-0.5 rounded border border-emerald-100 shadow-sm">1 Query</span>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed">
                          <span className="text-emerald-600 font-semibold">SELECT</span> * <span className="text-emerald-600 font-semibold">FROM</span> users<br/>
                          <span className="text-emerald-600 font-semibold">WHERE</span> id <span className="text-emerald-600 font-bold border-b border-emerald-300">IN</span> (...)
                       </div>
                    </div>

                    <div className="p-4 rounded-xl border bg-orange-50 border-orange-200 shadow-sm">
                       <div className="flex justify-between items-center mb-2">
                          <span className="text-[11px] font-bold font-mono text-orange-700 uppercase tracking-widest flex items-center gap-2">3. Batch: Items</span>
                          <span className="text-[10px] font-mono font-bold bg-white text-orange-600 px-2 py-0.5 rounded border border-orange-100 shadow-sm">1 Query</span>
                       </div>
                       <div className="font-mono text-[13px] leading-relaxed">
                          <span className="text-orange-600 font-semibold">SELECT</span> * <span className="text-orange-600 font-semibold">FROM</span> order_items<br/>
                          <span className="text-orange-600 font-semibold">WHERE</span> order_id <span className="text-orange-600 font-bold border-b border-orange-300">IN</span> (...)
                       </div>
                    </div>
                 </div>
              )}

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
