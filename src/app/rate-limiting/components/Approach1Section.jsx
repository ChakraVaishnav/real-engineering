"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants, scaleIn } from "./animations";
import { Server, User, CheckCircle2, Cpu } from "lucide-react";

const workers = [
  { id: "W1", color: "border-blue-200", glow: "shadow-blue-500/10" },
  { id: "W2", color: "border-cyan-200", glow: "shadow-cyan-500/10" },
  { id: "W3", color: "border-sky-200", glow: "shadow-sky-500/10" },
  { id: "W4", color: "border-indigo-200", glow: "shadow-indigo-500/10" },
];

function WorkerCard({ worker, index, inView }) {
  return (
    <motion.div
      variants={scaleIn}
      custom={index}
      className={`relative bg-white border-2 ${worker.color} rounded-xl p-4 flex flex-col items-center gap-3 shadow-md ${worker.glow} hover:scale-105 transition-transform duration-200`}
    >
      <div className="text-blue-500">
        <Cpu className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono font-bold text-slate-500 cursor-pointer">{worker.id}</span>
      <div className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-2 text-center">
        <div className="text-xs text-slate-500 font-medium mb-1">Counter</div>
        <motion.div
          key={`${inView}-${index}`}
          className="text-lg font-bold font-mono text-emerald-500"
          animate={inView ? { opacity: [0, 1], y: [10, 0] } : {}}
          transition={{ delay: 0.3 + index * 0.2 }}
        >
          {inView ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              ~25 req
            </motion.span>
          ) : "0"}
        </motion.div>
      </div>
      <div className="text-xs text-slate-500 font-semibold text-center font-mono">Limit: 100/min</div>

      {inView && (
        <motion.div
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center text-emerald-500 shadow-sm border border-emerald-100"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.2, 1], opacity: 1 }}
          transition={{ delay: 0.8 + index * 0.15, duration: 0.4 }}
        >
          <CheckCircle2 className="w-5 h-5" fill="currentColor" stroke="white" />
        </motion.div>
      )}
    </motion.div>
  );
}

export default function Approach1Section() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
              Approach 1
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              In-Memory Rate Limiting
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              Each worker maintains its own local counter — simple, fast, and initially appealing.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="mb-10 w-full flex flex-col items-center">
            
            <div className="flex items-center w-full max-w-2xl justify-between mb-8">
              <div className="flex flex-col items-center gap-2 w-24">
                <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center text-blue-500">
                  <User className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-600 font-bold font-mono">Client</span>
              </div>

              <div className="flex-1 px-4 text-center text-slate-500 flex flex-col items-center">
                <div className="w-full h-1.5 bg-blue-100 rounded-full relative overflow-hidden mb-1.5">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-green-400 w-1/3 blur-[1px]"
                    animate={{ left: ["-50%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  />
                </div>
                <span className="text-xs font-semibold">Incoming Request</span>
              </div>

              <div className="flex flex-col items-center gap-2 w-24">
                <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center text-blue-500">
                  <Server className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-600 font-bold font-mono text-center">Backend Server</span>
              </div>
            </div>

            <div className="w-full max-w-2xl flex justify-between px-8 mb-4">
               {[0, 1, 2, 3].map((i) => (
                 <div key={i} className="flex flex-col items-center">
                   <div className="h-10 w-1.5 bg-blue-100 rounded-full relative overflow-hidden">
                     <motion.div 
                       className="absolute inset-x-0 bg-green-400 h-4 blur-[1px]"
                       initial={{ y: "-100%" }}
                       animate={{ y: ["-100%", "300%"] }}
                       transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                     />
                   </div>
                 </div>
               ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {workers.map((w, i) => (
                <WorkerCard key={w.id} worker={w} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="bg-blue-50 border border-blue-200 rounded-xl p-5 text-center mt-12 shadow-sm"
          >
            <p className="text-slate-700 text-sm font-medium">
              Each worker allows up to{" "}
              <span className="text-blue-600 font-bold font-mono">100 req/min</span>{" "}
              independently. Requests are handled by independent server workers — no shared state.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
