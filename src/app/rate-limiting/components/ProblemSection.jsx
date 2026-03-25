"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Server, Database, User, Activity } from "lucide-react";

export default function ProblemSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [serverShake, setServerShake] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setServerShake(true);
      setTimeout(() => setServerShake(false), 300);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={ref} className="py-28 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={fadeUp} custom={0} className="text-center mb-20">
            <span className="text-xs uppercase tracking-widest text-red-500 font-bold mb-3 block">
              The Problem
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              The System Under Siege
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto">
              A single user fires{" "}
              <span className="text-red-500 font-semibold">1,000 requests/sec</span>. With
              no rate limiting, the backend chokes.
            </p>
          </motion.div>

          {/* Animated flow diagram */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="relative bg-blue-50 border border-blue-100/50 shadow-xl shadow-blue-900/5 rounded-2xl p-8 overflow-hidden"
          >
            <div className="relative h-40 flex items-center justify-between px-10">
              
              {/* User node */}
              <div className="flex flex-col items-center gap-2 z-10 w-24">
                <div className="w-16 h-16 rounded-xl bg-white border border-blue-200 shadow-sm flex items-center justify-center text-blue-500">
                  <User className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-500 font-mono font-semibold">Client</span>
                <span className="text-xs text-red-500 font-mono font-bold">1K req/s</span>
              </div>

              {/* Arrow line user→server */}
              <div className="flex-1 px-4 relative flex items-center h-full">
                <div className="w-full h-1.5 bg-blue-100 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-red-400 w-1/3 blur-[1px]"
                    animate={{ left: ["-50%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Server node */}
              <motion.div
                className="flex flex-col items-center gap-2 z-10 w-24"
                animate={serverShake ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-16 h-16 rounded-xl bg-white border-2 border-red-500 shadow-md flex items-center justify-center text-red-500 relative">
                  <Server className="w-8 h-8" />
                  <motion.div
                    className="absolute inset-0 rounded-xl"
                    animate={{ boxShadow: ["0 0 0px rgba(239,68,68,0)", "0 0 15px rgba(239,68,68,0.3)", "0 0 0px rgba(239,68,68,0)"] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                  />
                </div>
                <span className="text-xs text-slate-500 font-mono font-semibold">Backend</span>
                <span className="text-xs text-red-500 font-mono font-bold animate-pulse">⚠ Overloaded</span>
              </motion.div>

              {/* Arrow server→DB */}
              <div className="flex-1 px-4 relative flex items-center h-full">
                <div className="w-full h-1.5 bg-blue-100 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 bg-orange-400 w-1/3 blur-[1px]"
                    animate={{ left: ["-50%", "150%"] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                  />
                </div>
              </div>

              {/* DB node */}
              <motion.div
                className="flex flex-col items-center gap-2 z-10 w-24"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              >
                <div className="w-16 h-16 rounded-xl bg-white border border-orange-400 shadow-sm flex items-center justify-center text-orange-500">
                  <Database className="w-8 h-8" />
                </div>
                <span className="text-xs text-slate-500 font-mono font-semibold">Database</span>
                <span className="text-xs text-orange-500 font-mono font-bold">Stressed</span>
              </motion.div>

            </div>

            {/* Stats bar */}
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-blue-200/60 pt-6">
              {[
                { label: "Requests/sec", value: "1,000", color: "text-red-500", icon: <Activity className="w-4 h-4 mb-1 mx-auto" /> },
                { label: "Server CPU", value: "99%", color: "text-red-500", icon: <Server className="w-4 h-4 mb-1 mx-auto" /> },
                { label: "Error Rate", value: "67%", color: "text-orange-500", icon: <Activity className="w-4 h-4 mb-1 mx-auto" /> },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className={`text-2xl font-bold font-mono ${stat.color} flex flex-col items-center`}>
                    {stat.icon}
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-500 font-medium mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
