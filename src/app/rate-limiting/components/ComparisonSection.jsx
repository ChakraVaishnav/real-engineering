"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants, slideRight } from "./animations";
import { X, Check, Server, Database, AlertCircle } from "lucide-react";

// Official Redis SVG path colors simplified
const RedisIcon = ({ className }) => (
  <img 
    src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg" 
    alt="Redis" 
    className={className} 
  />
);

const rows = [
  {
    feature: "Counter Location",
    memory: { text: "Each worker's RAM", icon: null },
    redis: { text: "Centralized Redis", icon: null },
    winner: "redis",
  },
  {
    feature: "Multi-worker Support",
    memory: { text: "No", icon: <X className="w-4 h-4" /> },
    redis: { text: "Yes", icon: <Check className="w-4 h-4" /> },
    winner: "redis",
  },
  {
    feature: "Horizontal Scalability",
    memory: { text: "Breaks at scale", icon: <X className="w-4 h-4" /> },
    redis: { text: "Scales freely", icon: <Check className="w-4 h-4" /> },
    winner: "redis",
  },
  {
    feature: "Consistency",
    memory: { text: "Per-worker only", icon: <X className="w-4 h-4" /> },
    redis: { text: "Global guarantee", icon: <Check className="w-4 h-4" /> },
    winner: "redis",
  },
  {
    feature: "Setup Complexity",
    memory: { text: "Zero infra", icon: <Check className="w-4 h-4" /> },
    redis: { text: "Needs Redis", icon: <AlertCircle className="w-4 h-4" /> },
    winner: "memory",
  },
  {
    feature: "Latency",
    memory: { text: "~0ms", icon: <Check className="w-4 h-4" /> },
    redis: { text: "~1–3ms", icon: <AlertCircle className="w-4 h-4" /> },
    winner: "memory",
  },
  {
    feature: "Failure Mode",
    memory: { text: "Silent bypass", icon: <X className="w-4 h-4" /> },
    redis: { text: "Redis downtime risk", icon: <AlertCircle className="w-4 h-4" /> },
    winner: "tie",
  },
];

export default function ComparisonSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-28 px-6 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
              Comparison
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              In-Memory vs Redis
            </h2>
            <p className="text-slate-600 text-lg">
              A clear breakdown of trade-offs between the two approaches.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="rounded-2xl overflow-hidden border border-blue-100 shadow-md bg-white"
          >
            <div className="grid grid-cols-3 bg-slate-50 border-b border-blue-100">
              <div className="px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-widest">
                Feature
              </div>
              <div className="px-6 py-4 text-sm font-bold text-blue-600 uppercase tracking-widest border-l border-blue-100 bg-blue-50/50">
                In-Memory
              </div>
              <div className="px-6 py-4 text-sm font-bold text-red-600 flex items-center gap-2 uppercase tracking-widest border-l border-blue-100 bg-red-50/50">
                <RedisIcon className="w-4 h-4" /> Redis
              </div>
            </div>

            {rows.map((row, i) => (
              <motion.div
                key={row.feature}
                variants={slideRight}
                custom={i}
                className={`grid grid-cols-3 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors`}
              >
                <div className="px-6 py-4 text-sm text-slate-700 font-semibold flex items-center">
                  {row.feature}
                </div>
                <div
                  className={`px-6 py-4 text-sm border-l border-slate-100 flex items-center gap-2 font-medium ${
                    row.winner === "memory"
                      ? "text-emerald-600"
                      : row.winner === "redis"
                      ? "text-red-500"
                      : "text-slate-500"
                  }`}
                >
                  {row.memory.icon}
                  <span>{row.memory.text}</span>
                </div>
                <div
                  className={`px-6 py-4 text-sm border-l border-slate-100 flex items-center gap-2 font-medium ${
                    row.winner === "redis"
                      ? "text-emerald-600"
                      : row.winner === "memory"
                      ? "text-slate-500"
                      : "text-slate-500"
                  }`}
                >
                  {row.redis.icon}
                  <span>{row.redis.text}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={2}
            className="mt-8 grid grid-cols-2 gap-4"
          >
            <div className="bg-blue-50 border shadow-sm border-blue-200 rounded-xl p-6 text-center flex flex-col items-center">
              <Server className="w-8 h-8 text-blue-500 mb-3" />
              <div className="text-sm font-bold text-blue-700 mb-1">Choose In-Memory when</div>
              <div className="text-xs text-slate-600 font-medium">Running single-instance apps where simplicity matters most</div>
            </div>
            <div className="bg-red-50 border shadow-sm border-red-200 rounded-xl p-6 text-center flex flex-col items-center">
              <RedisIcon className="w-8 h-8 mb-3" />
              <div className="text-sm font-bold text-red-700 mb-1">Choose Redis when</div>
              <div className="text-xs text-slate-600 font-medium">Running multiple workers or scaling horizontally</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
