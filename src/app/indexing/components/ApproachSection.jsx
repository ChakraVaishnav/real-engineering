"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { fadeUp, containerVariants } from "./animations";
import { Copy, CheckCircle2, AlertTriangle, Zap, Search as SearchIcon, Database, Info } from "lucide-react";

const BTreeNodes = [
  { level: 0, index: 0, label: "500" },
  { level: 1, index: 0, label: "250" }, { level: 1, index: 1, label: "750" },
  { level: 2, index: 0, label: "125" }, { level: 2, index: 1, label: "375" }, { level: 2, index: 2, label: "625" }, { level: 2, index: 3, label: "875" },
  { level: 3, index: 0, range: "1-125" },
  { level: 3, index: 1, range: "126-250" },
  { level: 3, index: 2, range: "251-375" },
  { level: 3, index: 3, range: "376-500" },
  { level: 3, index: 4, range: "501-625" },
  { level: 3, index: 5, range: "626-750" },
  { level: 3, index: 6, range: "751-875" },
  { level: 3, index: 7, range: "876-999" },
];

const getX = (level, index) => `${((index + 0.5) / Math.pow(2, level)) * 100}%`;
const getYNum = (level) => [20, 80, 140, 200][level];
const getY = (level) => `${getYNum(level)}px`;

export default function ApproachSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  
  const [searchValue, setSearchValue] = useState("123");
  const [searchTrigger, setSearchTrigger] = useState(0);
  const [step, setStep] = useState(0);
  
  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setSearchTrigger(p => p + 1);
  };

  const val = parseInt(searchValue) || 123;
  
  // Calculate path
  const path = [0];
  const comparisons = [];
  
  const l1Index = val <= 500 ? 0 : 1;
  path.push(l1Index);
  comparisons.push({ node: 500, dir: val <= 500 ? 'left' : 'right' });
  
  let l2Index;
  if (l1Index === 0) { l2Index = val <= 250 ? 0 : 1; comparisons.push({ node: 250, dir: val <= 250 ? 'left' : 'right' }); }
  else { l2Index = val <= 750 ? 2 : 3; comparisons.push({ node: 750, dir: val <= 750 ? 'left' : 'right' }); }
  path.push(l2Index);
  
  let l3Index;
  if (l2Index === 0) { l3Index = val <= 125 ? 0 : 1; comparisons.push({ node: 125, dir: val <= 125 ? 'left' : 'right' }); }
  else if (l2Index === 1) { l3Index = val <= 375 ? 2 : 3; comparisons.push({ node: 375, dir: val <= 375 ? 'left' : 'right' }); }
  else if (l2Index === 2) { l3Index = val <= 625 ? 4 : 5; comparisons.push({ node: 625, dir: val <= 625 ? 'left' : 'right' }); }
  else { l3Index = val <= 875 ? 6 : 7; comparisons.push({ node: 875, dir: val <= 875 ? 'left' : 'right' }); }
  path.push(l3Index);

  useEffect(() => {
    if (searchTrigger === 0) return;
    
    setStep(1); // Root Node
    
    const timeouts = [
      setTimeout(() => setStep(2), 1000), // L1
      setTimeout(() => setStep(3), 2000), // L2
      setTimeout(() => setStep(4), 3000), // L3 (Leaf reached)
      setTimeout(() => setStep(5), 4000), // Leaf Expands
      setTimeout(() => setStep(6), 5500), // Pointer to Table
      setTimeout(() => setStep(7), 6500), // Table Highlights
    ];

    return () => timeouts.forEach(clearTimeout);
  }, [searchTrigger]);

  let stepMessage = "Enter a user_id to simulate a B-Tree search.";
  if (step === 1) stepMessage = `Step 1/7: Checking root. ${val} is ${comparisons[0].dir === 'left' ? '<=' : '>'} 500, moving ${comparisons[0].dir}.`;
  if (step === 2) stepMessage = `Step 2/7: Checking L1 node. ${val} is ${comparisons[1].dir === 'left' ? '<=' : '>'} ${comparisons[1].node}, moving ${comparisons[1].dir}.`;
  if (step === 3) stepMessage = `Step 3/7: Checking L2 node. ${val} is ${comparisons[2].dir === 'left' ? '<=' : '>'} ${comparisons[2].node}, moving ${comparisons[2].dir}.`;
  if (step === 4) stepMessage = `Step 4/7: Reached Leaf Node ${l3Index + 1}.`;
  if (step === 5) stepMessage = `Step 5/7: Extracting index pointer for user_id = ${val}.`;
  if (step === 6) stepMessage = `Step 6/7: Jumping to row coordinates from index pointer.`;
  if (step === 7) stepMessage = `Step 7/7: Direct disk fetch! O(log N) lookup complete.`;

  // Draw Edges
  const edges = [];
  for (let l = 0; l < 3; l++) {
    const count = Math.pow(2, l);
    for (let i = 0; i < count; i++) {
      const isActiveLeft = path[l] === i && path[l+1] === i*2;
      const isActiveRight = path[l] === i && path[l+1] === i*2 + 1;
      
      edges.push({ id: `e-${l}-${i}-L`, from: { x: getX(l, i), y: getY(l) }, to: { x: getX(l+1, i*2), y: getY(l+1) }, isPath: isActiveLeft, level: l });
      edges.push({ id: `e-${l}-${i}-R`, from: { x: getX(l, i), y: getY(l) }, to: { x: getX(l+1, i*2 + 1), y: getY(l+1) }, isPath: isActiveRight, level: l });
    }
  }

  const leafX = ((path[3] + 0.5) / 8) * 100; 

  return (
    <section ref={ref} className="py-28 px-6 bg-slate-100 border-y border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={containerVariants} initial="hidden" animate={inView ? "visible" : "hidden"}>
          
          <motion.div variants={fadeUp} custom={0} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Zap className="w-3 h-3 text-amber-500" /> 15-Node B-Tree
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
              O(log N) Lookups
            </h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto font-medium leading-relaxed mb-6">
              When we add a composite index, the database builds a structured B-Tree. Instead of scanning 1,000,000 rows, it jumps <strong className="text-emerald-600 font-bold">directly</strong> to the correct starting node.
            </p>
          </motion.div>

          {/* Adjusted Grid Layout */}
          <div className="grid lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Visual network lines & Table Container */}
            <motion.div variants={fadeUp} custom={1} className="lg:col-span-8 relative bg-slate-50 border border-slate-200 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col shadow-xl min-h-[750px]">
               
               {/* Search Bar */}
               <div className="w-full flex justify-between items-center bg-white px-4 py-3 rounded-xl shadow-sm border border-slate-200 z-30 shrink-0">
                  <span className="text-[11px] font-bold font-mono text-slate-500 uppercase tracking-widest hidden sm:block">Searching Index For</span>
                  <form onSubmit={handleSearch} className="flex gap-2 w-full sm:w-auto">
                     <div className="flex bg-slate-100 text-[10px] font-mono font-bold rounded overflow-hidden shadow-sm border border-slate-200 items-center">
                        <span className="px-3 py-2 bg-slate-200 text-slate-600 shrink-0">user_id:</span>
                        <input 
                           type="number" 
                           value={searchValue}
                           onChange={(e) => setSearchValue(e.target.value)}
                           className="bg-white px-2 py-2 w-20 text-blue-700 outline-none"
                           placeholder="Ex: 123"
                        />
                     </div>
                     <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-xs font-bold flex items-center gap-1 transition-colors">
                        <SearchIcon className="w-3 h-3" /> Search
                     </button>
                  </form>
               </div>

               {/* Step Readout overlay */}
               <div className="mt-4 px-4 py-3 bg-blue-50 border border-blue-200 rounded-xl flex items-start sm:items-center gap-3 shadow-sm z-30 shrink-0">
                 <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5 sm:mt-0" />
                 <p className="text-sm font-semibold text-blue-900 font-mono flex-1">
                   {stepMessage}
                 </p>
                 {step > 0 && step < 7 && (
                    <span className="flex w-3 h-3 relative shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
                    </span>
                 )}
               </div>

               {/* Visualization Container (Tree Top, Table Bottom) */}
               <div className="flex-1 w-full relative mt-8 flex flex-col items-center pl-2 pr-2 h-full">
                  
                  {/* Unified SVG for Tree Edges and Table Pointer */}
                  <svg className="absolute inset-0 w-full h-[600px] z-0 overflow-visible pointer-events-none">
                     {/* B-Tree Edges */}
                     {edges.map(edge => (
                        <g key={edge.id}>
                           <path 
                              d={`M ${edge.from.x} ${edge.from.y} L ${edge.to.x} ${edge.to.y}`} 
                              stroke="#cbd5e1" 
                              strokeWidth="1.5" 
                              fill="none" 
                              className="opacity-50"
                           />
                           {edge.isPath && step >= edge.level + 2 && (
                              <motion.path 
                                 d={`M ${edge.from.x} ${edge.from.y} L ${edge.to.x} ${edge.to.y}`} 
                                 stroke="#3b82f6" 
                                 strokeWidth="3" 
                                 fill="none" 
                                 initial={{ pathLength: 0 }} 
                                 animate={{ pathLength: 1 }} 
                                 transition={{ duration: 0.5 }} 
                              />
                           )}
                        </g>
                     ))}

                     {/* Arrow down to Table */}
                     <motion.path 
                        d={`M ${leafX}% 240 C ${leafX}% 300, 50% 280, 50% 340`} 
                        stroke={step >= 6 ? "#10b981" : "transparent"} 
                        strokeWidth="2.5" 
                        fill="none" 
                        strokeDasharray="6 4"
                        initial={{ pathLength: 0 }} 
                        animate={{ pathLength: step >= 6 ? 1 : 0 }} 
                        transition={{ duration: 0.6 }} 
                     />
                     {step >= 6 && (
                        <motion.circle 
                           key={`particle-${searchTrigger}`}
                           r="6" fill="#10b981" 
                           initial={{ offsetDistance: "0%" }}
                           animate={{ offsetDistance: "100%" }}
                           transition={{ duration: 0.6, ease: "linear" }}
                           style={{ offsetPath: `path("M ${leafX}% 240 C ${leafX}% 300, 50% 280, 50% 340")` }}
                        />
                     )}
                  </svg>
                  
                  {/* B-Tree Nodes */}
                  <div className="relative w-full h-[260px] shrink-0">
                     {BTreeNodes.map(node => {
                        const isSelected = path[node.level] === node.index;
                        const isActive = isSelected && step >= node.level + 1;
                        const isLeaf = node.level === 3;
                        const isExpandedLeaf = isLeaf && isActive && step >= 5;
                        
                        return (
                           <motion.div
                              key={`${node.level}-${node.index}-${searchTrigger}`}
                              style={{
                                 position: 'absolute',
                                 left: getX(node.level, node.index),
                                 top: getY(node.level),
                                 x: '-50%',
                                 y: '-50%',
                                 zIndex: isActive ? 20 : 10
                              }}
                              className={`border rounded flex items-center justify-center font-mono font-bold transition-all duration-300 ${
                                 isExpandedLeaf 
                                    ? 'bg-emerald-50 border-emerald-500 shadow-xl w-36 pb-2 flex-col' 
                                    : isActive 
                                       ? 'bg-blue-50 border-blue-500 shadow-md text-blue-700 z-20 ' 
                                       : 'bg-white border-slate-200 text-slate-400 opacity-60 z-10'
                              } ${
                                 !isLeaf ? 'px-2 py-1 text-[11px]' : isExpandedLeaf ? 'text-[9px]' : 'px-1 py-1 w-10 sm:w-12 text-center text-[8px] whitespace-nowrap overflow-hidden'
                              }`}
                              animate={isActive && !isExpandedLeaf ? { scale: [1, 1.2, 1] } : {}}
                              transition={{ duration: 0.3 }}
                           >
                              {isExpandedLeaf ? (
                                 <>
                                    <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded mb-1 border border-emerald-300 w-[90%] text-center mt-1 text-[10px]">u: {val}</div>
                                    <div className="w-[90%] flex justify-between border-b border-emerald-200 py-1 text-emerald-700"><span>{`>`} ptr</span> <span>Today 9AM</span></div>
                                    <div className="w-[90%] flex justify-between py-1 text-emerald-700 bg-emerald-100/50"><span>{`>`} ptr</span> <span>Today 8AM</span></div>
                                 </>
                              ) : (
                                 isLeaf ? node.range : `≤ ${node.label}`
                              )}
                           </motion.div>
                        )
                     })}
                  </div>

                  {/* Database Table */}
                  <div className="relative z-10 w-full max-w-sm shrink-0 flex flex-col mt-[80px]">
                     <div className="bg-white border text-[10.5px] font-mono shadow-xl rounded-xl overflow-hidden flex flex-col w-full z-10 relative border-slate-200">
                        {/* Table Header Overlay Title */}
                        <div className="flex items-center gap-2 bg-blue-50 text-blue-800 px-4 py-2 border-b border-blue-100">
                           <Database className="w-4 h-4" />
                           <span className="text-xs font-bold uppercase tracking-wider">Orders Table</span>
                        </div>
                        
                        <div className="flex bg-slate-100 border-b font-bold text-slate-500">
                           <div className="flex-1 px-3 py-2 border-r">Row_ID</div>
                           <div className="flex-[2] px-3 py-2 border-r">User_ID</div>
                           <div className="flex-[3] px-3 py-2">Created_At</div>
                        </div>
                        
                        {/* Dummy Rows */}
                        <div className="flex border-b text-slate-400">
                           <div className="flex-1 px-3 py-2 border-r">...</div>
                           <div className="flex-[2] px-3 py-2 border-r">...</div>
                           <div className="flex-[3] px-3 py-2">...</div>
                        </div>

                        {/* Highlighted Match Rows */}
                        <motion.div 
                           className="flex border-b font-bold relative transition-colors duration-500"
                           animate={{
                              backgroundColor: step >= 7 ? "#d1fae5" : "#ffffff",
                              color: step >= 7 ? "#065f46" : "#334155"
                           }}
                        >
                           <motion.div 
                              className="absolute left-0 top-0 bottom-0 bg-emerald-500" 
                              initial={{ width: 0 }}
                              animate={{ width: step >= 7 ? 4 : 0 }}
                           />
                           <div className={`flex-1 px-3 py-2.5 border-r ${step >= 7 ? 'border-emerald-200/50' : 'border-slate-100'}`}>942</div>
                           <div className={`flex-[2] px-3 py-2.5 border-r ${step >= 7 ? 'border-emerald-200/50' : 'border-slate-100'}`}>{val}</div>
                           <div className="flex-[3] px-3 py-2.5">Today 9AM</div>
                        </motion.div>
                        <motion.div 
                           className="flex border-b font-bold relative transition-colors duration-500"
                           animate={{
                              backgroundColor: step >= 7 ? "#d1fae5" : "#ffffff",
                              color: step >= 7 ? "#065f46" : "#334155"
                           }}
                        >
                           <motion.div 
                              className="absolute left-0 top-0 bottom-0 bg-emerald-500" 
                              initial={{ width: 0 }}
                              animate={{ width: step >= 7 ? 4 : 0 }}
                           />
                           <div className={`flex-1 px-3 py-2.5 border-r ${step >= 7 ? 'border-emerald-200/50' : 'border-slate-100'}`}>943</div>
                           <div className={`flex-[2] px-3 py-2.5 border-r ${step >= 7 ? 'border-emerald-200/50' : 'border-slate-100'}`}>{val}</div>
                           <div className="flex-[3] px-3 py-2.5">Today 8AM</div>
                        </motion.div>

                        <div className="flex text-slate-400 bg-slate-50">
                           <div className="flex-1 px-3 py-2 border-r">...</div>
                           <div className="flex-[2] px-3 py-2 border-r">...</div>
                           <div className="flex-[3] px-3 py-2">...</div>
                        </div>
                     </div>
                  </div>
               </div>
            </motion.div>

            {/* SQL Code Blocks */}
            <motion.div variants={fadeUp} custom={2} className="lg:col-span-4 flex flex-col gap-6">
               
               <div className="bg-slate-900 shadow-xl border border-slate-800 rounded-2xl overflow-hidden font-mono text-sm relative group">
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0a0a16] border-b border-white/5">
                    <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 className="w-3 h-3" /> adding_the_index.sql
                    </span>
                    <Copy className="w-4 h-4 text-slate-600 group-hover:text-slate-400 hover:scale-110 cursor-pointer transition-all" />
                  </div>
                  <div className="p-6 overflow-x-auto leading-relaxed h-[130px] text-slate-300">
                     <span className="text-blue-400 font-bold">CREATE INDEX</span> <span className="text-emerald-400">idx_orders_user_time</span><br/>
                     <span className="text-blue-400 font-bold">ON</span> <span className="text-amber-400">orders</span><span className="text-slate-400">(user_id, created_at DESC)</span><span className="text-slate-500">;</span>
                  </div>
               </div>

               <div className="bg-emerald-50 border border-emerald-200 shadow-xl rounded-2xl overflow-hidden font-mono text-sm">
                  <div className="p-5 flex items-center gap-3">
                     <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 border border-emerald-200">
                        <Zap className="w-5 h-5 text-emerald-600" />
                     </div>
                     <div>
                        <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest">Execution Plan</div>
                        <div className="font-bold text-slate-900">Index Scan using idx_orders_user_time</div>
                     </div>
                  </div>
               </div>
               
               <div className="bg-white border border-slate-200 shadow-xl rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-20 h-20 bg-orange-100 rounded-bl-[100px] -z-10" />
                  <h3 className="text-[11px] font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1">
                     <AlertTriangle className="w-3 h-3 text-orange-500" /> IMPORTANT RULE
                  </h3>
                  
                  <p className="text-sm text-slate-700 font-medium mb-4">
                     Index composite order must identically match your <code className="bg-slate-100 font-mono text-xs px-1 rounded mx-0.5">WHERE</code> to <code className="bg-slate-100 font-mono text-xs px-1 rounded mx-0.5">ORDER BY</code> sequence.
                  </p>
                  
                  <div className="font-mono text-[11px] font-bold">
                     <div className="text-slate-400 line-through decoration-red-500 decoration-2 mb-1 pl-2 border-l border-red-200">
                        (created_at, user_id)
                     </div>
                     <div className="text-emerald-600 pl-2 border-l border-emerald-400 relative">
                        (user_id, created_at)
                        <span className="absolute left-[-5px] top-1/2 -translate-y-1/2 bg-emerald-500 w-2 h-2 rounded-full ring-2 ring-white" />
                     </div>
                  </div>
               </div>

            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
