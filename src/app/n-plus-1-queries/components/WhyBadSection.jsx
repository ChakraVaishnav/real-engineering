"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { AlertOctagon, Activity, Clock, ServerCrash, Database } from "lucide-react";

export default function WhyBadSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 px-6 bg-slate-50 border-y border-slate-200 relative overflow-hidden">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">
              Why 200+ Queries is a Disaster
            </h2>
          </motion.div>

          {/* Response Delay bar */}
          <motion.div variants={fadeUp} custom={1} className="max-w-3xl mx-auto mb-16">
             <div className="flex justify-between text-sm font-mono font-bold text-slate-500 mb-2 uppercase tracking-widest">
                <span>Latency Breakdown</span>
                <span className="text-red-500">~200ms total</span>
             </div>
             <div className="h-6 w-full bg-slate-200 rounded-full overflow-hidden flex shadow-inner border border-slate-300">
                <motion.div 
                   className="h-full bg-emerald-400" 
                   initial={{ width: 0 }}
                   animate={inView ? { width: "5%" } : {}}
                   transition={{ duration: 0.5, delay: 0.2 }}
                />
                <motion.div 
                   className="h-full bg-red-400 relative" 
                   initial={{ width: 0 }}
                   animate={inView ? { width: "95%" } : {}}
                   transition={{ duration: 1.5, delay: 0.7, ease: "easeOut" }}
                >
                   <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-400" />
                   {/* Striped overlay for danger effect */}
                   <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 10px, #fff 10px, #fff 20px)" }} />
                </motion.div>
             </div>
             <div className="flex justify-between text-xs mt-3 font-mono font-bold">
                <span className="text-emerald-600">App Logic (5ms)</span>
                <span className="text-red-600">201 Network Round Trips (195ms)</span>
             </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
             <motion.div variants={fadeUp} custom={2} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden group hover:border-red-300 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Clock className="w-24 h-24 text-red-500" />
                </div>
                <Activity className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">High Latency</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Every DB query incurs network latency. 200 sequential round trips to the database means your users stare at a loading spinner.
                </p>
             </motion.div>

             <motion.div variants={fadeUp} custom={3} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden group hover:border-red-300 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Database className="w-24 h-24 text-red-500" />
                </div>
                <ServerCrash className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">Connection Pool Exhaustion</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  Holding database connections open while firing hundreds of microscopic queries prevents other users from accessing the DB.
                </p>
             </motion.div>

             <motion.div variants={fadeUp} custom={4} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-6 relative overflow-hidden group hover:border-red-300 transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <AlertOctagon className="w-24 h-24 text-red-500" />
                </div>
                <AlertOctagon className="w-8 h-8 text-indigo-500 mb-4" />
                <h3 className="text-lg font-bold text-slate-800 mb-2">CPU Overhead</h3>
                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                  The database has to parse, plan, and execute 201 separate SQL statements instead of optimizing a single query plan.
                </p>
             </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
