"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { AlertOctagon, Activity, ServerCrash, Server, Database } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-white relative overflow-hidden border-b border-slate-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-red-600 font-bold mb-3 block px-3 py-1 bg-red-50 border border-red-200 rounded-full inline-flex w-max shadow-sm">
              The Problem — No Pagination
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              SELECT * FROM orders;
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
              It seems harmless... until your user profile fetches <strong className="text-red-600">1 million orders</strong> simultaneously. A perfectly good query becomes a production killer.
            </p>
          </motion.div>

          {/* Interactive Flow */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 items-center mb-16">
             <motion.div variants={fadeUp} custom={1} className="relative h-[450px] bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col justify-center shadow-xl">
                
                {/* Node structure */}
                <div className="flex justify-between items-center absolute left-8 right-8 top-12 z-20">
                   <div className="flex flex-col items-center gap-2">
                       <div className="w-16 h-16 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-red-600 shadow-sm relative group overflow-hidden">
                          <ServerCrash className="w-8 h-8 relative z-10" />
                          <motion.div className="absolute inset-0 bg-red-500 origin-bottom" animate={{ scaleY: [0, 1] }} transition={{ repeat: Infinity, duration: 2.5, ease: "easeIn" }} />
                       </div>
                       <span className="text-xs text-slate-600 font-bold font-mono tracking-widest bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">Backend</span>
                   </div>
                   
                   <div className="flex flex-col items-center gap-2">
                       <div className="w-16 h-16 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shadow-sm">
                          <Database className="w-8 h-8" />
                       </div>
                       <span className="text-xs text-slate-600 font-bold font-mono tracking-widest bg-white px-2 py-0.5 rounded shadow-sm border border-slate-200">Database</span>
                   </div>
                </div>

                {/* The Flood Animation */}
                <div className="absolute inset-0 top-36 overflow-hidden pt-4 pb-0 flex flex-col items-center justify-start pointer-events-none">
                   
                   {/* Data pipes */}
                   <div className="absolute top-[-50px] right-16 w-[150px] h-[300px] -skew-x-[25deg] overflow-hidden opacity-80">
                      {[...Array(60)].map((_, i) => (
                         <motion.div 
                            key={i}
                            className="absolute right-0 h-4 bg-red-400/80 rounded"
                            style={{ 
                               width: 80 + ((i * 17) % 60), 
                               top: (i * 23) % 300,
                            }}
                            initial={{ x: "0%", opacity: 0 }}
                            animate={{ x: "-200%", opacity: [0, 1, 1, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 + ((i % 10) / 10), delay: (i % 20) / 10, ease: "linear" }}
                         />
                      ))}
                   </div>
                </div>

                {/* Overwhelmed Server Alert */}
                <motion.div 
                   className="absolute bottom-16 left-8 bg-white border border-red-200 p-4 rounded-xl shadow-[0_0_20px_rgba(239,68,68,0.2)] max-w-[200px]"
                   animate={{ y: [0, -5, 0] }}
                   transition={{ repeat: Infinity, duration: 2 }}
                >
                   <div className="text-[10px] font-bold text-red-600 uppercase tracking-widest mb-1 flex items-center gap-1">
                      <AlertOctagon className="w-3 h-3" /> Critical Alert
                   </div>
                   <div className="text-sm font-mono font-bold text-slate-800">
                      OOM Killer Triggered
                   </div>
                   <div className="text-xs text-slate-500 mt-1 leading-snug">
                      Process ran out of memory attempting to serialize 1.2GB payload.
                   </div>
                </motion.div>

             </motion.div>

             {/* Code Block */}
             <motion.div variants={fadeUp} custom={2} className="flex flex-col gap-4">
               <div className="bg-slate-50 border border-slate-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm">
                  <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                    <span className="text-slate-600 text-xs font-bold tracking-widest uppercase flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 shadow-sm" />
                      bad_query.sql
                    </span>
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[180px]">
                     <span className="text-slate-500 font-semibold italic">-- Give me everything.</span><br/>
                     <span className="text-blue-600 font-bold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-bold">FROM</span> <span className="text-emerald-600">orders</span><br/>
                     <span className="text-blue-600 font-bold">WHERE</span> <span className="text-slate-700">user_id =</span> <span className="text-amber-600">123</span><span className="text-slate-500">;</span>
                  </div>
               </div>

               <div className="bg-red-50 border border-red-200 rounded-2xl p-6 shadow-sm">
                 <h3 className="text-sm font-bold text-red-700 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <AlertOctagon className="w-4 h-4" /> Production Issues
                 </h3>
                 <ul className="space-y-2 text-sm text-red-900 font-medium">
                    <li className="flex items-start gap-2 before:content-['✕'] before:text-red-500 before:font-bold">
                       Database struggles to return massive dataset.
                    </li>
                    <li className="flex items-start gap-2 before:content-['✕'] before:text-red-500 before:font-bold">
                       Backend chokes trying to load millions of objects into RAM.
                    </li>
                    <li className="flex items-start gap-2 before:content-['✕'] before:text-red-500 before:font-bold">
                       Network suffers sending multi-megabyte JSON payloads.
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
