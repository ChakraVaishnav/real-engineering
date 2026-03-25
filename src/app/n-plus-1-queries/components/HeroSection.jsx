"use client";
import { motion } from "framer-motion";
import { containerVariants, fadeUp } from "./animations";
import { ChevronDown, Database, Server, Cpu } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-100 via-white to-slate-50" />
      
      {/* Grid lines */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(59,130,246,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.15) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-400/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-indigo-400/10 rounded-full blur-[100px]" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={fadeUp} custom={0}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 bg-white text-blue-700 text-sm font-semibold mb-8 tracking-wide shadow-sm">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            Database Performance
          </span>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          custom={1}
          className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          <span className="text-slate-900">N+1 Queries — The</span>
          <br />
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-600 bg-clip-text text-transparent">
            Silent Backend Killer
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          custom={2}
          className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium"
        >
          How a "simple" orders API silently triggered 200+ database queries per request — and how to fix it.
        </motion.p>

        <motion.div
          variants={fadeUp}
          custom={3}
          className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500 font-bold uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-blue-500" />
            Backend Systems
          </div>
          <div className="w-px h-4 bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-indigo-500" />
            API Design
          </div>
          <div className="w-px h-4 bg-slate-300 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-500" />
            Database Optimization
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          custom={4}
          className="mt-16 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-blue-500 bg-blue-50 p-3 rounded-full border border-blue-100 shadow-sm"
          >
            <ChevronDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
