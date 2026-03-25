"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { AlertOctagon, Sparkles, Image as ImageIcon, ShoppingCart, Bomb } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setStage(s => (s >= 3 ? 0 : s + 1));
    }, 2500);
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
            <span className="text-xs uppercase tracking-widest text-blue-600 font-bold mb-3 block px-3 py-1 bg-blue-50 border border-blue-200 rounded-full inline-flex w-max shadow-sm">
              The Vibe Coding Trap
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              The &quot;Magic AI&quot; Monolith
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              When a developer hears <strong className="text-blue-600 font-bold">&quot;Use AI,&quot;</strong>{' '}they often assume the neural network should do the entire job. They try to train or prompt the model to not only recognize a sick plant, but to directly spit out our company&apos;s product names.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center mb-16">
             
             {/* Visualizer */}
             <motion.div variants={fadeUp} custom={1} className="relative bg-slate-50 border border-slate-200 rounded-3xl py-12 px-6 overflow-hidden flex flex-col items-center justify-center shadow-xl">
                
                {/* Vertical Vibe Coding Pipeline */}
                <div className="flex flex-col items-center gap-4 w-full relative z-10">
                   
                   {/* Step 1: User Image */}
                   <div className="flex flex-col items-center gap-2">
                      <motion.div 
                        className="w-16 h-16 bg-white border-2 border-slate-300 rounded-2xl shadow flex items-center justify-center"
                        animate={stage === 0 ? { scale: [1, 1.1, 1], borderColor: '#3b82f6' } : { borderColor: '#e2e8f0', scale: 1 }}
                      >
                         <ImageIcon className={`w-8 h-8 ${stage === 0 ? 'text-blue-500' : 'text-slate-400'}`} />
                      </motion.div>
                      <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-slate-500 text-center absolute -left-20 top-6 whitespace-nowrap">User Image</span>
                   </div>

                   {/* Flow Arrow */}
                   <div className="relative w-[2px] h-10 bg-slate-200">
                      {stage === 1 && (
                         <motion.div className="w-full h-full bg-blue-500 origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 }} />
                      )}
                   </div>

                   {/* Step 2: The "Brain" */}
                   <div className="flex flex-col items-center gap-2 relative">
                      <motion.div 
                        className="w-40 h-28 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-slate-800 rounded-3xl flex flex-col items-center justify-center border-4 border-slate-700 relative z-20 shadow-xl"
                        animate={stage === 1 ? { scale: [1, 1.05, 1], boxShadow: ["0 0 30px rgba(59,130,246,0.3)", "0 0 60px rgba(59,130,246,0.8)", "0 0 30px rgba(59,130,246,0.3)"] } : {}}
                        transition={{ duration: 0.5 }}
                      >
                        <Sparkles className="w-10 h-10 text-blue-400 mb-2" />
                        <span className="text-xs font-bold font-mono text-slate-300">"Magic AI"</span>
                        {stage === 1 && (
                           <div className="absolute -inset-2 border-2 border-blue-400 rounded-3xl animate-ping opacity-50 pointer-events-none" />
                        )}
                      </motion.div>
                      <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-slate-500 text-center absolute -left-28 top-10 whitespace-nowrap">Prompt / Model</span>
                   </div>

                   {/* Flow Arrow */}
                   <div className="relative w-[2px] h-10 bg-slate-200">
                      {stage >= 2 && (
                         <motion.div className="w-full h-full bg-red-500 origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 }} />
                      )}
                      {stage >= 2 && (
                         <motion.div className="absolute top-1/2 -translate-y-1/2 left-4 bg-red-100 text-red-800 font-mono text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-red-300" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                            "Bio-Spray XL" (???)
                         </motion.div>
                      )}
                   </div>

                   {/* Step 3: Checkout Error */}
                   <div className="flex flex-col items-center gap-2 relative">
                      <motion.div 
                        className="w-16 h-16 bg-white border-2 border-slate-300 rounded-2xl shadow flex items-center justify-center relative"
                        animate={stage >= 2 ? { scale: [1, 1.1, 1], borderColor: '#f87171' } : { borderColor: '#e2e8f0', scale: 1 }}
                      >
                         <ShoppingCart className={`w-8 h-8 ${stage >= 2 ? 'text-red-500' : 'text-slate-400'}`} />
                         {stage >= 2 && (
                            <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                               <AlertOctagon className="w-4 h-4" />
                            </div>
                         )}
                      </motion.div>
                      <span className="text-[10px] font-bold font-mono tracking-widest uppercase text-slate-500 text-center absolute -left-20 top-6 whitespace-nowrap">Checkout</span>
                   </div>
                </div>

                {/* Explainer Box at bottom */}
                <div className="w-[90%] mt-12 z-20">
                   {stage === 0 && (
                      <div className="bg-white border border-slate-200 p-4 rounded-xl shadow relative flex items-center gap-3 w-full min-h-[72px]">
                         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                         <span className="text-sm font-mono font-bold text-slate-700">1. Client uploads sick plant photo.</span>
                      </div>
                   )}
                   {stage === 1 && (
                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl shadow relative flex items-center gap-3 w-full min-h-[72px]">
                         <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
                         <span className="text-sm font-mono font-bold text-blue-700">2. Processing massive ML request to identify plant AND invent a cart item...</span>
                      </div>
                   )}
                   {stage >= 2 && (
                      <div className="bg-red-50 border border-red-200 p-4 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] relative flex items-center gap-3 w-full min-h-[72px]">
                         <Bomb className="w-5 h-5 text-red-500 shrink-0" />
                         <span className="text-sm font-mono font-bold text-red-700 leading-tight">3. Error! Model hallucinated product. Doesn't match our database id.</span>
                      </div>
                   )}
                </div>

             </motion.div>

             {/* Code Block */}
             <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-4">
               
               <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-red-800 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4" /> The AI Anti-Pattern
                 </h3>
                 <p className="text-sm text-red-900 font-medium leading-relaxed mb-4">
                    Trying to make a Vision model or LLM output your proprietary database IDs or inventory names directly causes chaos:
                 </p>
                 <ul className="list-disc pl-5 mt-4 space-y-4 text-sm text-red-800 font-medium">
                    <li>
                       <strong className="text-red-900">Hallucinations:</strong>{' '}The AI will invent products or suggest items that are currently out of stock.
                    </li>
                    <li>
                       <strong className="text-red-900">Tight Coupling:</strong>{' '}If your marketing team renames &quot;SuperFertilizer&quot; to &quot;UltraGro&quot;, you have to re-train or update prompts for the entire ML pipeline.
                    </li>
                    <li>
                       <strong className="text-red-900">Black Box Debugging:</strong>{' '}If it recommends the wrong product, you don&apos;t know if the image recognition failed or the inventory mapping failed.
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
