"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Copy, CheckCircle, Database } from "lucide-react";

export default function Solution1Section() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-white border-y border-slate-100">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <CheckCircle className="w-3 h-3" /> Solution 1
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
              Batch Loading with IN
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium">
              Instead of querying per order, we gather IDs and fetch everything in just <strong className="text-emerald-600">3 queries</strong>.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Visual network lines */}
            <motion.div variants={fadeUp} custom={1} className="relative h-[350px] bg-slate-50 border border-slate-200 rounded-3xl p-6 overflow-hidden flex flex-col justify-between shadow-xl">
               <div className="flex justify-between items-center px-8 relative z-10">
                  <span className="text-sm font-bold font-mono text-slate-700 bg-white shadow-sm px-4 py-2 rounded-xl border border-slate-200">Backend</span>
                  <Database className="w-8 h-8 text-emerald-500" />
               </div>

               <div className="flex-1 relative mt-4">
                  {/* Query 1 */}
                  <div className="absolute top-[20%] left-24 right-20 h-[2px] bg-slate-200">
                     <motion.div 
                        className="h-full bg-blue-500 w-1/4 absolute"
                        initial={{ left: "0%" }}
                        animate={{ left: ["0%", "100%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                     />
                     <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-blue-600 font-bold font-mono tracking-wider bg-slate-50 px-1 whitespace-nowrap">1. Fetch Orders</span>
                  </div>

                  {/* Query 2 */}
                  <div className="absolute top-[50%] left-24 right-20 h-[2px] bg-slate-200">
                     <motion.div 
                        className="h-full bg-emerald-500 w-1/4 absolute"
                        initial={{ left: "0%" }}
                        animate={{ left: ["0%", "100%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 2.2, delay: 0.5, ease: "linear" }}
                     />
                     <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-emerald-600 font-bold font-mono tracking-wider bg-slate-50 px-1 whitespace-nowrap">2. Fetch Users (IN)</span>
                  </div>

                  {/* Query 3 */}
                  <div className="absolute top-[80%] left-24 right-20 h-[2px] bg-slate-200">
                     <motion.div 
                        className="h-full bg-orange-500 w-1/4 absolute"
                        initial={{ left: "0%" }}
                        animate={{ left: ["0%", "100%", "0%"] }}
                        transition={{ repeat: Infinity, duration: 2.4, delay: 1, ease: "linear" }}
                     />
                     <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-orange-500 font-bold font-mono tracking-wider bg-slate-50 px-1 whitespace-nowrap">3. Fetch Items (IN)</span>
                  </div>
               </div>
            </motion.div>

            {/* SQL Code Block */}
            <motion.div variants={fadeUp} custom={2} className="bg-slate-50 border border-slate-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm group">
               <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
                 <span className="text-slate-600 font-bold text-xs flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm" />
                   batch_load.sql
                 </span>
                 <Copy className="w-4 h-4 text-slate-400 group-hover:text-slate-600 hover:scale-110 cursor-pointer transition-all" />
               </div>
               <div className="p-6 overflow-x-auto leading-relaxed max-h-[350px]">
                  <div className="mb-4">
                     <span className="text-slate-500 italic font-semibold">-- 1. Fetch recent orders</span><br/>
                     <span className="text-blue-600 font-semibold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-semibold">FROM</span> <span className="text-emerald-600">orders</span><br/>
                     <span className="text-blue-600 font-semibold">ORDER BY</span> <span className="text-slate-700">created_at</span> <span className="text-blue-600 font-semibold">DESC LIMIT</span> <span className="text-amber-600">100</span><span className="text-slate-500">;</span>
                  </div>
                  <div className="mb-4">
                     <span className="text-slate-500 italic font-semibold">-- 2. Fetch Users</span><br/>
                     <span className="text-blue-600 font-semibold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-semibold">FROM</span> <span className="text-emerald-600">users</span><br/>
                     <span className="text-blue-600 font-semibold">WHERE</span> <span className="text-slate-700">id</span> <span className="text-emerald-600 font-bold mb-1 border-b border-emerald-200">IN</span> <span className="text-slate-700">(</span><span className="text-amber-600">12, 18, ..., 95</span><span className="text-slate-700">)</span><span className="text-slate-500">;</span>
                  </div>
                  <div>
                     <span className="text-slate-500 italic font-semibold">-- 3. Fetch Items</span><br/>
                     <span className="text-blue-600 font-semibold">SELECT</span> <span className="text-slate-700">*</span> <span className="text-blue-600 font-semibold">FROM</span> <span className="text-emerald-600">order_items</span><br/>
                     <span className="text-blue-600 font-semibold">WHERE</span> <span className="text-slate-700">order_id</span> <span className="text-emerald-600 font-bold mb-1 border-b border-emerald-200">IN</span> <span className="text-slate-700">(</span><span className="text-amber-600">101, 102, ..., 200</span><span className="text-slate-700">)</span><span className="text-slate-500">;</span>
                  </div>
               </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
