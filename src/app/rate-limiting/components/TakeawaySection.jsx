"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Share2, Zap, TrendingUp } from "lucide-react";

export default function TakeawaySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const principles = [
    {
      icon: <Share2 className="w-8 h-8 text-blue-500" />,
      title: "Shared State is Essential",
      desc: "Distributed workers cannot enforce global constraints without shared state.",
      border: "border-blue-200",
      bg: "bg-white shadow border-b-4 border-b-blue-400",
    },
    {
      icon: <Zap className="w-8 h-8 text-orange-500" />,
      title: "Atomic Operations",
      desc: "Redis INCR is atomic — no race conditions, no double-counting.",
      border: "border-orange-200",
      bg: "bg-white shadow border-b-4 border-b-orange-400",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-red-500" />,
      title: "Design for Scale",
      desc: "Solutions that work on one server often break on ten. Plan ahead.",
      border: "border-red-200",
      bg: "bg-white shadow border-b-4 border-b-red-400",
    },
  ];

  return (
    <section ref={ref} className="py-32 px-6 bg-slate-100 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-400/10 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-blue-700 text-sm font-bold uppercase tracking-widest shadow-sm">
              Final Takeaway
            </span>
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6 text-slate-900"
          >
            State must be shared<br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              in distributed systems
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto font-medium"
          >
            Local memory breaks.{" "}
            <span className="text-blue-700 font-bold">Centralized systems scale.</span>
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                custom={3 + i}
                whileHover={{ scale: 1.03, y: -4 }}
                className={`${p.bg} border ${p.border} rounded-2xl p-6 text-left transition-all duration-200`}
              >
                <div className="mb-4">{p.icon}</div>
                <h3 className="text-slate-800 font-bold text-lg mb-2">{p.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            custom={6}
            className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 text-left font-mono text-sm max-w-3xl mx-auto"
          >
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-100">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-slate-400 font-bold text-xs font-sans uppercase">rate_limiter.py</span>
            </div>
            <div className="space-y-1 mt-2 text-[15px] leading-relaxed">
              <div><span className="text-slate-400 italic"># [X] In-memory (breaks in distributed env)</span></div>
              <div><span className="text-slate-800">counter</span> <span className="text-blue-600">=</span> <span className="text-emerald-600">{"{}"}  </span><span className="text-slate-400 italic"># local to this worker</span></div>
              <div className="mt-4"><span className="text-slate-400 italic"># [OK] Redis-based (globally consistent)</span></div>
              <div><span className="text-slate-800">count</span> <span className="text-blue-600">=</span> <span className="text-red-600 font-semibold">redis</span><span className="text-slate-800">.</span><span className="text-purple-600">incr</span><span className="text-slate-800">(</span><span className="text-amber-600">{`f"rl:{user_id}:{window}"`}</span><span className="text-slate-800">)</span></div>
              <div><span className="text-blue-600 font-semibold">if</span> <span className="text-slate-800">count</span> <span className="text-blue-600">&gt;</span> <span className="text-amber-600">LIMIT</span><span className="text-slate-800">:</span></div>
              <div className="pl-6"><span className="text-blue-600 font-semibold">raise</span> <span className="text-teal-600">RateLimitExceeded</span><span className="text-slate-800">()</span></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
