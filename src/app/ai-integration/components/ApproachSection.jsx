"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Copy, ShieldCheck, Leaf, Server, Database, BrainCircuit, ArrowDown } from "lucide-react";

export default function ApproachSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setPulse(p => p >= 4 ? 0 : p + 1);
    }, 1800);
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
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Layered Decoupling
             </span>
             <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
                The True Engineering Fix
             </h2>
             <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-6">
                Split the domain. The Machine Learning model <strong className="text-indigo-600 font-bold">only</strong>{' '}classifies the plant disease. The backend API handles the robust relational inventory mapping.
             </p>
          </motion.div>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start mb-16">
            
            {/* Visual network lines */}
            <motion.div variants={fadeUp} custom={1} className="relative bg-slate-50 border border-slate-200 rounded-3xl py-12 px-6 overflow-hidden flex flex-col items-center justify-center shadow-xl">
               
               {/* Decoupled Pipeline */}
               <div className="flex flex-col items-center gap-4 w-full relative z-10">
                  
                  {/* Step 1: Client/Image */}
                  <div className="flex flex-col items-center gap-2 relative">
                     <motion.div 
                        className="w-16 h-16 bg-white border-2 border-slate-300 rounded-full flex items-center justify-center shadow z-10"
                        animate={pulse === 0 ? { borderColor: '#10b981', scale: 1.1 } : { borderColor: '#e2e8f0', scale: 1 }}
                     >
                        <Leaf className={`w-8 h-8 ${pulse === 0 ? 'text-emerald-500' : 'text-slate-400'}`} />
                     </motion.div>
                     <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 font-mono absolute -left-24 top-6 whitespace-nowrap">1. User Photo</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="relative w-[2px] h-8 bg-slate-200">
                     {pulse === 1 && (
                        <motion.div className="w-full h-full bg-indigo-500 origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 }} />
                     )}
                  </div>

                  {/* Step 2: ML Model Container */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                     <motion.div 
                        className="w-[240px] h-20 bg-indigo-50 border-2 border-indigo-200 rounded-2xl flex items-center justify-center gap-4 shadow-inner relative"
                        animate={pulse === 1 || pulse === 2 ? { borderColor: '#6366f1', backgroundColor: '#e0e7ff' } : { borderColor: '#c7d2fe', backgroundColor: '#eef2ff' }}
                     >
                        <BrainCircuit className="w-8 h-8 text-indigo-600" />
                        <div className="flex flex-col items-start leading-none">
                           <span className="text-xs font-bold text-indigo-800">Vision API</span>
                           <span className="text-[10px] font-mono text-indigo-500">Classification</span>
                        </div>
                     </motion.div>
                     <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 font-mono absolute -left-28 top-8 whitespace-nowrap">2. Inference</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="relative w-[2px] h-8 bg-slate-200">
                     {pulse === 2 && (
                        <motion.div className="w-full h-full bg-blue-500 origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 }} />
                     )}
                     {pulse === 2 && (
                        <motion.div className="absolute top-1/2 -translate-y-1/2 left-4 bg-emerald-100 text-emerald-800 font-mono text-[10px] font-bold px-2 py-1 rounded shadow-sm border border-emerald-300" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                           {"{id: 'D104'}"}
                        </motion.div>
                     )}
                  </div>

                  {/* Step 3: Backend Business Logic */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                     <motion.div 
                        className="w-[240px] h-20 bg-blue-50 border-2 border-blue-200 rounded-2xl flex items-center justify-center gap-4 shadow relative"
                        animate={pulse === 2 || pulse === 3 ? { borderColor: '#3b82f6', backgroundColor: '#dbeafe' } : { borderColor: '#bfdbfe', backgroundColor: '#eff6ff' }}
                     >
                        <Server className="w-8 h-8 text-blue-600" />
                        <div className="flex flex-col items-start leading-none">
                           <span className="text-xs font-bold text-blue-800">Node/Go Backend</span>
                           <span className="text-[10px] font-mono text-blue-500">Business Logic</span>
                        </div>
                     </motion.div>
                     <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 font-mono absolute -left-28 top-8 whitespace-nowrap">3. API Layer</span>
                  </div>

                  {/* Flow Arrow */}
                  <div className="relative w-[2px] h-8 bg-slate-200">
                     {(pulse === 3) && (
                        <motion.div className="w-full h-full bg-emerald-500 origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.5 }} />
                     )}
                     {(pulse === 3) && (
                        <motion.div className="absolute top-1/2 -translate-y-1/2 left-4 bg-blue-100 text-blue-800 font-mono text-[9px] font-bold px-2 py-1 rounded whitespace-nowrap shadow-sm border border-blue-200" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
                           SQL JOIN
                        </motion.div>
                     )}
                  </div>

                  {/* Step 4: Database Lookup */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                     
                     <motion.div 
                        className="w-24 h-24 bg-white border-4 border-slate-200 rounded-3xl flex flex-col items-center justify-center shadow-md relative"
                        animate={pulse === 3 ? { borderColor: '#10b981', scale: 1.05 } : { borderColor: '#e2e8f0', scale: 1 }}
                     >
                        <Database className="w-8 h-8 text-slate-500 mb-1" style={{ color: pulse === 3 ? '#10b981' : '#64748b' }} />
                        <span className="text-[10px] font-mono font-bold text-slate-500" style={{ color: pulse === 3 ? '#047857' : '#64748b' }}>PostgreSQL</span>
                     </motion.div>

                     {pulse === 4 && (
                        <motion.div className="absolute right-[-150px] top-4 bg-white border border-slate-200 p-3 rounded-lg shadow-xl text-left font-mono text-xs font-bold text-emerald-700 w-36"
                           initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        >
                           <div className="text-slate-500 text-[10px] mb-1">Products Returned:</div>
                           <div>[1] Copper Spray ($12)</div>
                           <div>[2] Blight Control ($9)</div>
                        </motion.div>
                     )}
                     <span className="text-[10px] uppercase tracking-widest font-bold text-slate-500 font-mono absolute -left-28 top-8 whitespace-nowrap">4. Database</span>
                  </div>
               </div>

            </motion.div>

            {/* Code Blocks */}
            <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-6">
               
               <div className="bg-slate-900 border border-slate-800 shadow-xl rounded-2xl overflow-hidden font-mono text-sm relative group">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a16] border-b border-white/5">
                    <span className="text-indigo-400 font-bold text-[11px] uppercase tracking-widest flex items-center gap-2">
                       inference.py
                    </span>
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[130px] text-slate-300">
                     <span className="text-slate-500 italic"># Pure classification, NO DB awareness</span><br/>
                     <span className="text-blue-400 font-bold">def</span> <span className="text-amber-300">detect_disease</span>(image_bytes):<br/>
                     &nbsp;&nbsp;&nbsp;&nbsp;disease = model.<span className="text-blue-300">predict</span>(image_bytes)<br/>
                     &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400 font-bold">return</span> {"{"} <span className="text-emerald-300">"disease_id"</span>: disease.id {"}"}
                  </div>
               </div>

               <div className="bg-slate-50 border border-blue-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm relative group">
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-blue-100">
                    <span className="text-blue-700 font-bold text-[11px] uppercase tracking-widest flex items-center gap-2">
                       business_logic.ts
                    </span>
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600 hover:scale-110 cursor-pointer transition-all" />
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[255px]">
                     <span className="text-blue-600 font-bold">const</span> inferenceResponse = <span className="text-blue-600 font-bold">await</span> <span className="text-amber-600">callVisionAPI</span>(image);<br/><br/>
                     <span className="text-slate-500 italic font-semibold">{"// Now map strictly to reliable inventory"}</span><br/>
                     <span className="text-blue-600 font-bold">const</span> products = <span className="text-blue-600 font-bold">await</span> db.query(<span className="text-emerald-700">`</span><br/>
                     &nbsp;&nbsp;<span className="text-blue-700 font-semibold">SELECT</span> p.<span className="text-slate-700">*</span> <br/>
                     &nbsp;&nbsp;<span className="text-blue-700 font-semibold">FROM</span> products p<br/>
                     &nbsp;&nbsp;<span className="text-blue-700 font-bold border-b border-blue-200">JOIN</span> disease_treatments dt <span className="text-blue-700 font-semibold">ON</span> p.id = dt.product_id<br/>
                     &nbsp;&nbsp;<span className="text-blue-700 font-semibold">WHERE</span> dt.disease_id = <span className="text-amber-600">$1</span><br/>
                     &nbsp;&nbsp;<span className="text-emerald-700">`</span>, [inferenceResponse.disease_id]);
                  </div>
               </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
