"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";

export default function TakeawaySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(201);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => {
      // Dramatic drop
      let current = 201;
      const interval = setInterval(() => {
        current -= 6;
        if (current <= 3) {
          current = 3;
          clearInterval(interval);
        }
        setCount(current);
      }, 30);
    }, 1200);

    return () => clearTimeout(timer);
  }, [inView]);

  return (
    <section ref={ref} className="py-32 px-6 bg-slate-100 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-300/20 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="mb-4 bg-white border border-slate-200 px-4 py-1.5 rounded-full inline-block text-slate-500 font-bold font-mono text-xs tracking-widest shadow-sm uppercase">
             The Engineering Reality
          </motion.div>

          <motion.h2
            variants={fadeUp}
            custom={1}
            className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-8 text-slate-900"
          >
            Query Count Matters<br />
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent italic">
              More Than You Think
            </span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            custom={2}
            className="text-xl text-slate-600 mb-16 max-w-2xl mx-auto font-medium"
          >
            Reducing queries changes everything. A feature doesn't work until it scales. Watch your logs, use eager loading, and respect the database connection pool.
          </motion.p>
        </motion.div>

        {/* The Big Number Drop */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="relative"
        >
           <div className="text-[12rem] leading-none font-black font-mono tracking-tighter bg-gradient-to-b from-slate-900 to-slate-400 bg-clip-text text-transparent drop-shadow-sm">
             {count}
           </div>
           {inView && count === 3 && (
             <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent flex items-center justify-center -z-10 blur-[8px]"
             >
                3
             </motion.div>
           )}
           <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 text-emerald-600 font-bold tracking-widest uppercase text-sm whitespace-nowrap bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full shadow-sm">
             {count === 3 ? "Massive Optimization Achieved 🔥" : "Optimizing..."}
           </div>
        </motion.div>
      </div>
    </section>
  );
}
