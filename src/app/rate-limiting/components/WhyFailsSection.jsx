"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { AlertTriangle, User, AlertCircle, Cpu } from "lucide-react";

const workers = [
  { id: "W1", count: 100 },
  { id: "W2", count: 100 },
  { id: "W3", count: 100 },
  { id: "W4", count: 100 },
];

function WorkerBad({ worker, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2 + index * 0.15, duration: 0.5 }}
      className="bg-white border-2 border-red-200 shadow-md rounded-xl p-4 flex flex-col items-center gap-2"
    >
      <div className="text-red-500">
        <Cpu className="w-8 h-8" />
      </div>
      <span className="text-xs font-mono font-bold text-slate-500">{worker.id}</span>
      <div className="w-full bg-slate-50 border border-slate-100 rounded px-2 py-1.5 text-center">
        <div className="text-xs font-semibold text-slate-500">Counter</div>
        <motion.div
          className="text-base font-bold font-mono text-red-500"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 + index * 0.15 }}
        >
          {worker.count}
        </motion.div>
      </div>
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ delay: 0.9 + index * 0.15, type: "spring" }}
        className="text-xs px-2 py-0.5 rounded-full bg-red-100 border-red-200 text-red-600 font-mono font-bold flex items-center gap-1 mt-2"
      >
        <span>✓</span> Allowed
      </motion.div>
    </motion.div>
  );
}

export default function WhyFailsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
              <AlertTriangle className="w-3 h-3" /> Key Insight
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              Why This Fails
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              The same user hits all 4 workers. Each thinks it's only seen 100 requests.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} custom={1} className="mb-10">
            <div className="flex items-center flex-col justify-center gap-6 mb-8 mt-4">
              <div className="flex flex-col items-center">
                <motion.div
                  className="w-16 h-16 rounded-xl bg-white border-2 border-red-400 shadow-md flex items-center justify-center text-red-500"
                  animate={{ boxShadow: ["0 0 0px rgba(248,113,113,0)", "0 0 15px rgba(248,113,113,0.3)", "0 0 0px rgba(248,113,113,0)"] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  <User className="w-8 h-8" />
                </motion.div>
                <span className="text-xs text-slate-600 mt-2 font-bold font-mono">user_123</span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {workers.map((w, i) => (
                <WorkerBad key={w.id} worker={w} index={i} inView={inView} />
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            <div className="bg-slate-50 border shadow-sm border-slate-200 rounded-xl p-5 text-center">
              <div className="text-xs text-slate-500 font-bold mb-1">Expected total limit</div>
              <div className="text-3xl font-bold font-mono text-emerald-500">100</div>
              <div className="text-xs text-slate-500 mt-1">req / min</div>
            </div>
            <div className="bg-red-50 border shadow-sm border-red-200 rounded-xl p-5 text-center">
              <div className="text-xs text-red-500 font-bold mb-1">Actual total allowed</div>
              <motion.div
                className="text-3xl font-bold font-mono text-red-600"
                initial={{ scale: 1 }}
                animate={inView ? { scale: [1, 1.1, 1] } : {}}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                400
              </motion.div>
              <div className="text-xs text-red-400 mt-1 font-semibold">req / min (4× over!)</div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={3}
            className="flex items-center gap-3 bg-red-50 border border-red-200 shadow-sm rounded-xl p-5"
          >
            <AlertCircle className="text-red-500 w-8 h-8 shrink-0" />
            <p className="text-red-700 font-medium">
              Rate limiting is inconsistent across workers.{" "}
              <span className="text-red-500/80 font-normal block mt-1">
                Local state cannot enforce a global constraint in a distributed system.
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
