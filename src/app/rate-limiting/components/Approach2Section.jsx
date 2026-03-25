"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants, scaleIn } from "./animations";
import { User, Server, CheckCircle, ArrowRight, Cpu } from "lucide-react";

// Official Redis SVG path colors simplified
const RedisIcon = ({ className }) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" 
    alt="Redis" 
    className={className} 
  />
);

const workerIds = ["W1", "W2", "W3", "W4"];

function PulsingDot({ delay }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
      style={{ top: "calc(50% - 4px)", left: 0 }}
      animate={{
        left: ["0%", "50%", "100%"],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: 1.2,
        repeat: Infinity,
        delay: delay,
        ease: "linear",
      }}
    />
  );
}

export default function Approach2Section() {
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
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-green-200 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest mb-4">
              <CheckCircle className="w-3 h-3" /> Approach 2 — Solution
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Centralized Rate Limiting
              <span className="bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                {" "}with Redis
              </span>
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              All workers share a single Redis counter. Global state enforces a true limit.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="relative bg-white border border-blue-100 shadow-xl shadow-blue-900/5 rounded-2xl p-8 overflow-hidden mb-8"
          >
            <div className="relative flex items-center justify-between" style={{ minHeight: "260px" }}>
              
              <div className="flex flex-col items-center gap-1 w-20 z-10">
                <div className="w-14 h-14 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center text-blue-500">
                  <User className="w-7 h-7" />
                </div>
                <span className="text-xs text-slate-600 font-bold font-mono mt-1">Client</span>
              </div>

              <div className="flex-1 flex px-4 items-center">
                <div className="h-1.5 flex-1 bg-blue-100 rounded-full relative overflow-hidden">
                   <motion.div 
                     className="absolute top-0 bottom-0 left-0 bg-green-400 w-1/3 blur-[1px]"
                     animate={{ left: ["-50%", "150%"] }}
                     transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                   />
                </div>
              </div>

              <div className="flex flex-col items-center gap-1 w-24 z-10">
                <div className="w-14 h-14 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center text-blue-500">
                   <Server className="w-7 h-7" />
                </div>
                <span className="text-xs text-slate-600 font-bold font-mono mt-1 text-center">Backend Server</span>
              </div>

              <div className="flex-1 flex flex-col justify-around h-[200px] px-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex relative items-center">
                    <div className="h-1 w-full bg-blue-100/50 rounded-full relative overflow-hidden">
                       <motion.div 
                         className="absolute top-0 bottom-0 left-0 bg-green-400 w-1/3 blur-[1px]"
                         animate={{ left: ["-50%", "150%"] }}
                         transition={{ repeat: Infinity, duration: 1, delay: i * 0.15, ease: "linear" }}
                       />
                    </div>
                  </div>
                ))}
              </div>

              {/* Workers column */}
              <div className="flex flex-col gap-3 w-32 z-10">
                {workerIds.map((id, i) => (
                  <motion.div
                     key={id}
                     variants={scaleIn}
                     custom={i}
                     className="flex items-center gap-2 bg-white border-2 border-blue-200 shadow-sm rounded-lg px-2 py-2"
                  >
                    <Cpu className="w-4 h-4 text-blue-500" />
                    <span className="text-xs font-bold font-mono text-slate-600">{id}</span>
                  </motion.div>
                ))}
              </div>

              {/* Clean animation to Redis node */}
              <div className="flex-1 flex flex-col justify-around h-[200px] px-4">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className="flex relative items-center h-full w-full">
                     {/* Static path */}
                     <div className="absolute w-full h-px bg-slate-200 top-1/2 -translate-y-1/2 border-dashed border-b" />
                     {/* Pulsing individual dots (cleaner!) */}
                     {inView && (
                       <>
                         <PulsingDot delay={i * 0.3} />
                         <PulsingDot delay={i * 0.3 + 0.6} />
                       </>
                     )}
                  </div>
                ))}
              </div>

              {/* Redis node */}
              <motion.div
                className="flex flex-col items-center gap-2 w-32 z-10"
                animate={inView ? { scale: [0.98, 1.02, 0.98] } : {}}
                transition={{ repeat: Infinity, duration: 2.5 }}
              >
                <div className="w-24 h-24 rounded-2xl bg-white border-2 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.2)] flex flex-col items-center justify-center relative">
                  <RedisIcon className="w-12 h-12 mb-1" />
                  <span className="text-[10px] text-red-600 font-bold font-mono mt-0.5">REDIS</span>
                  <motion.div
                    className="absolute inset-0 rounded-2xl border border-red-400"
                    animate={{ opacity: [0, 0.4, 0], scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                  />
                </div>
                <span className="text-xs text-slate-600 font-bold font-mono text-center">Shared Counter</span>
              </motion.div>
            </div>

            {/* INCR counter animation */}
            <div className="mt-8 border-t border-blue-100 pt-6 flex items-center justify-center gap-4 flex-wrap">
              <div className="font-mono text-sm font-semibold">
                <span className="text-slate-400">$</span>{" "}
                <span className="text-blue-600">INCR</span>{" "}
                <span className="text-green-600">user_123:counter</span>
              </div>
              <div className="text-slate-400"><ArrowRight className="w-4 h-4" /></div>
              <motion.div
                className="font-mono text-sm px-3 py-1.5 rounded-lg bg-green-50 border border-green-200 flex items-center gap-2 font-bold"
                animate={{ opacity: inView ? [0, 1] : 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
              >
                <span className="text-green-600">101</span>{" "}
                <span className="text-red-600 flex items-center gap-1 ml-1">
                  → BLOCKED <span className="w-2 h-2 rounded-full bg-red-500 inline-block ml-1 animate-pulse" />
                </span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="flex items-center gap-3 bg-green-50 border border-green-200 shadow-sm rounded-xl p-5"
          >
            <CheckCircle className="text-green-600 w-8 h-8 shrink-0" />
            <p className="text-green-800 font-medium">
              user_123 → 100 requests →{" "}
              <span className="text-red-500 font-mono font-bold">BLOCK</span>.{" "}
              <span className="text-green-700/80 font-normal block mt-1">
                Redis atomically increments a single counter, enforcing the true global limit regardless of which worker handles the request.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
