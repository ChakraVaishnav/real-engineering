"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Copy, CheckCircle, Database, Server } from "lucide-react";

export default function Solution2Section() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-slate-100 border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-white shadow-sm text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
              <CheckCircle className="w-3 h-3" /> Solution 2
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              The Mighty JOIN
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              Alternatively, combine all tables into a <strong className="text-blue-600">single query</strong> to get all data over the network in one pass.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual network lines */}
            <motion.div variants={fadeUp} custom={1} className="relative h-[350px] bg-white border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col justify-center shadow-xl group cursor-crosshair">
               <div className="flex justify-between items-center px-8 relative z-10">
                  <div className="flex flex-col items-center">
                    <Server className="w-8 h-8 text-blue-500 mb-2" />
                  </div>
                  <div className="flex flex-col items-center">
                    <Database className="w-8 h-8 text-emerald-500 mb-2 group-hover:scale-110 transition-transform" />
                  </div>
               </div>

               <div className="absolute top-1/2 left-24 right-24 h-4 bg-blue-50 border border-blue-100 -translate-y-1/2 rounded-full overflow-hidden shadow-inner">
                  {/* Streaming data representing the giant payload */}
                  <motion.div 
                    className="h-full bg-blue-500 absolute w-[50%]"
                     initial={{ left: "-50%" }}
                     animate={{ left: "150%" }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />
                  </motion.div>
                  <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] text-blue-700 font-bold font-mono tracking-widest bg-white px-2 py-0.5 rounded-full border border-blue-200 shadow-sm">SINGLE STREAM</span>
               </div>
            </motion.div>

            {/* SQL Code Block */}
            <motion.div variants={fadeUp} custom={2} className="bg-slate-50 border border-slate-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm group">
               <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                 <span className="text-slate-600 font-bold text-xs flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-blue-500 shadow-sm" />
                   single_query.sql
                 </span>
                 <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600 hover:scale-110 cursor-pointer transition-all" />
               </div>
               <div className="p-6 overflow-x-auto leading-relaxed h-[278px]">
                  <span className="text-blue-600 font-bold">SELECT</span><br/>
                  <span className="text-slate-700 pl-4">o.</span><span className="text-emerald-600">*</span><span className="text-slate-600">,</span><br/>
                  <span className="text-slate-700 pl-4">u.</span><span className="text-emerald-600">*</span><span className="text-slate-600">,</span><br/>
                  <span className="text-slate-700 pl-4">oi.</span><span className="text-emerald-600">*</span><br/>
                  <span className="text-blue-600 font-bold">FROM</span> <span className="text-emerald-600">orders</span> <span className="text-slate-700">o</span><br/>
                  <span className="text-blue-600 font-extrabold border-b border-blue-200 mb-1">JOIN</span> <span className="text-emerald-600">users</span> <span className="text-slate-700">u</span> <span className="text-blue-600 font-bold">ON</span> <span className="text-slate-700">u.id = o.user_id</span><br/>
                  <span className="text-blue-600 font-extrabold border-b border-blue-200 mb-1">JOIN</span> <span className="text-emerald-600">order_items</span> <span className="text-slate-700">oi</span> <span className="text-blue-600 font-bold">ON</span> <span className="text-slate-700">oi.order_id = o.id</span><br/>
                  <span className="text-blue-600 font-bold">ORDER BY</span> <span className="text-slate-700">o.created_at</span> <span className="text-blue-600 font-bold">DESC LIMIT</span> <span className="text-amber-600">100</span><span className="text-slate-500">;</span>
               </div>
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
