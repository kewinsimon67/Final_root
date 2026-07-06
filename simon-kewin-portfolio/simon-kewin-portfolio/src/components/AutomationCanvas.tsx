import React, { useState, useEffect, useRef } from "react";
import { Play, Webhook, Cpu, CheckCircle2, AlertCircle, Sparkles, Terminal, ArrowRight, ShieldCheck, Mail, Database } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface LogEntry {
  time: string;
  type: "info" | "success" | "warn" | "ai";
  message: string;
}

export default function AutomationCanvas() {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number>(-1);
  const [logs, setLogs] = useState<LogEntry[]>([
    { time: "11:47:00", type: "info", message: "Automation pipeline initialized. Awaiting triggers." }
  ]);
  const [leadName, setLeadName] = useState("Alexander Wright");
  const [leadCompany, setLeadCompany] = useState("Vapor SaaS");
  const [leadBudget, setLeadBudget] = useState("$25,000");
  
  const logEndRef = useRef<HTMLDivElement>(null);

  const addLog = (message: string, type: "info" | "success" | "warn" | "ai") => {
    const now = new Date();
    const timeStr = now.toTimeString().split(" ")[0];
    setLogs((prev) => [...prev, { time: timeStr, type, message }]);
  };

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs]);

  const runSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setActiveStep(0);
    setLogs([]);
    
    // Step 0: Trigger
    addLog(`Incoming webhook received from contact form: ${leadName} (${leadCompany})`, "info");
    
    // Step 1: Data enrichment
    setTimeout(() => {
      setActiveStep(1);
      addLog("Querying Clearbit and LinkedIn APIs for corporate footprint...", "info");
      addLog(`Corporate profile resolved: ${leadCompany} - B2B Software, $4.2M Series A, Budget: ${leadBudget}`, "success");
    }, 1800);

    // Step 2: AI Qualification
    setTimeout(() => {
      setActiveStep(2);
      addLog("Sending profile vectors to Google Gemini 3.5 Flash...", "ai");
      addLog(`Gemini prompt: 'Synthesize personalized intro copy for ${leadName} focusing on automated operations...'`, "ai");
      addLog("Gemini response: 'High business fit detected. Dynamic outreach template drafted successfully.'", "success");
    }, 3600);

    // Step 3: Decision Node
    setTimeout(() => {
      setActiveStep(3);
      addLog("Evaluating outbound lead score matrix...", "info");
      addLog("Lead score calculated: 96/100 (Tier 1 Key Account)", "success");
    }, 5400);

    // Step 4: Outcome Sync
    setTimeout(() => {
      setActiveStep(4);
      addLog(`Publishing priority alert to Slack channels #sales-leads`, "success");
      addLog(`Synchronizing Hubspot CRM record with lead metadata`, "success");
      addLog("Draft outreach email dispatched to draft outbox", "success");
      addLog("Pipeline run completed. Uptime: 100%, Cost: $0.0034", "info");
      setIsRunning(false);
      setActiveStep(-1);
    }, 7200);
  };

  // Preset lead generator
  const loadPreset = (name: string, company: string, budget: string) => {
    if (isRunning) return;
    setLeadName(name);
    setLeadCompany(company);
    setLeadBudget(budget);
    addLog(`Configured simulation lead: ${name} @ ${company}`, "info");
  };

  return (
    <div className="w-full bg-[#1A1815] border border-border-custom/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden text-pure-white" id="automation-canvas-container">
      {/* Background soft glowing orb */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary-accent/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/5 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h4 className="font-bold tracking-tight text-sm uppercase text-white/90">Lead Capture Pipeline</h4>
          </div>
          <p className="text-xs text-white/50 mt-1">Live visual simulation of an autonomous AI sales agent</p>
        </div>
        
        <button
          onClick={runSimulation}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg text-xs font-bold tracking-wide uppercase flex items-center gap-2 transition-all duration-300 cursor-pointer ${
            isRunning 
              ? "bg-white/5 text-white/40 cursor-not-allowed" 
              : "bg-primary-accent text-pure-white hover:bg-hover-accent"
          }`}
          id="btn-trigger-simulation"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          {isRunning ? "Running..." : "Run Simulator"}
        </button>
      </div>

      {/* Preset pickers */}
      <div className="flex flex-wrap gap-2 py-3 border-b border-white/5 items-center">
        <span className="text-[11px] uppercase tracking-wider text-white/40 mr-1">Select Scenario:</span>
        <button
          onClick={() => loadPreset("Diana Prince", "Amazonia Labs", "$45,000")}
          disabled={isRunning}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
            leadName === "Diana Prince" ? "bg-primary-accent/20 text-primary-accent border border-primary-accent/30" : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          Scale Startup
        </button>
        <button
          onClick={() => loadPreset("James Sterling", "Fintech Peak", "$60,000")}
          disabled={isRunning}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
            leadName === "James Sterling" ? "bg-primary-accent/20 text-primary-accent border border-primary-accent/30" : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          Fintech Enterprise
        </button>
        <button
          onClick={() => loadPreset("Luna Sterling", "Aether Robotics", "$15,000")}
          disabled={isRunning}
          className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
            leadName === "Luna Sterling" ? "bg-primary-accent/20 text-primary-accent border border-primary-accent/30" : "bg-white/5 text-white/70 hover:bg-white/10"
          }`}
        >
          Robotics Lab
        </button>
      </div>

      {/* Visual Canvas flow */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 py-6 items-center relative" id="automation-canvas-nodes">
        
        {/* Node 1: Webhook Trigger */}
        <div 
          className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${
            activeStep === 0 
              ? "bg-primary-accent/10 border-primary-accent shadow-lg shadow-primary-accent/10 scale-105" 
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className={`p-2.5 rounded-lg mb-2 ${activeStep === 0 ? "bg-primary-accent text-white" : "bg-white/5 text-white/60"}`}>
            <Webhook className="w-5 h-5 animate-pulse" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-white/40">Step 1</span>
          <span className="font-bold text-xs text-white/90 mt-0.5">Webhook In</span>
          <p className="text-[10px] text-white/50 mt-1 max-w-[120px] truncate">{leadCompany}</p>
        </div>

        {/* Arrow / Line 1 */}
        <div className="hidden md:flex justify-center text-white/20">
          <motion.div 
            animate={activeStep === 0 ? { x: [0, 10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className={`w-5 h-5 ${activeStep === 0 ? "text-primary-accent" : "text-white/20"}`} />
          </motion.div>
        </div>

        {/* Node 2: AI Processor */}
        <div 
          className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${
            activeStep === 1 || activeStep === 2
              ? "bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/10 scale-105" 
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className={`p-2.5 rounded-lg mb-2 ${activeStep === 1 || activeStep === 2 ? "bg-amber-500 text-white" : "bg-white/5 text-white/60"}`}>
            <Cpu className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-white/40">Step 2</span>
          <span className="font-bold text-xs text-white/90 mt-0.5">AI Engine</span>
          <p className="text-[10px] text-amber-400 font-semibold mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Gemini 3.5
          </p>
        </div>

        {/* Arrow / Line 2 */}
        <div className="hidden md:flex justify-center text-white/20">
          <motion.div 
            animate={activeStep === 2 ? { x: [0, 10, 0] } : {}}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowRight className={`w-5 h-5 ${activeStep === 2 ? "text-amber-500" : "text-white/20"}`} />
          </motion.div>
        </div>

        {/* Node 3: Database & CRM */}
        <div 
          className={`p-4 rounded-xl border flex flex-col items-center text-center transition-all duration-300 ${
            activeStep === 3 || activeStep === 4
              ? "bg-emerald-500/10 border-emerald-500 shadow-lg shadow-emerald-500/10 scale-105" 
              : "bg-white/5 border-white/10"
          }`}
        >
          <div className={`p-2.5 rounded-lg mb-2 ${activeStep === 3 || activeStep === 4 ? "bg-emerald-500 text-white" : "bg-white/5 text-white/60"}`}>
            <Database className="w-5 h-5" />
          </div>
          <span className="text-[11px] uppercase tracking-wider text-white/40">Step 3</span>
          <span className="font-bold text-xs text-white/90 mt-0.5">Integration</span>
          <p className="text-[10px] text-emerald-400 font-semibold mt-1">CRM + Slack</p>
        </div>

      </div>

      {/* Terminal logs panel */}
      <div className="bg-black/40 border border-white/5 rounded-xl p-4 font-mono text-xs">
        <div className="flex items-center justify-between pb-2 border-b border-white/5 mb-3">
          <div className="flex items-center gap-2 text-white/60">
            <Terminal className="w-4 h-4 text-primary-accent" />
            <span className="text-[11px] uppercase tracking-wider font-semibold">Console Logs</span>
          </div>
          <span className="text-[10px] text-white/35">Output Log Terminal v1.4</span>
        </div>
        
        <div className="h-[140px] overflow-y-auto space-y-2 pr-2" id="sim-terminal-logs">
          {logs.map((log, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: -10 }} 
              animate={{ opacity: 1, x: 0 }}
              className="flex items-start gap-2.5 leading-relaxed"
            >
              <span className="text-white/30 text-[10px] pt-0.5">{log.time}</span>
              
              {log.type === "info" && <span className="text-sky-400 font-semibold flex-shrink-0">[INFO]</span>}
              {log.type === "success" && <span className="text-emerald-400 font-semibold flex-shrink-0">[SYNC]</span>}
              {log.type === "warn" && <span className="text-amber-500 font-semibold flex-shrink-0">[WARN]</span>}
              {log.type === "ai" && <span className="text-pink-400 font-semibold flex-shrink-0 flex items-center gap-0.5"><Sparkles className="w-2.5 h-2.5" /> [AI]</span>}
              
              <span className="text-white/80">{log.message}</span>
            </motion.div>
          ))}
          <div ref={logEndRef} />
        </div>
      </div>

      {/* Micro badges showing technology items */}
      <div className="flex flex-wrap gap-2 mt-4 items-center justify-center text-[10px] font-semibold text-white/40 tracking-wider uppercase border-t border-white/5 pt-4">
        <span>Powered By:</span>
        <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5">n8n</span>
        <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5">Google Gemini</span>
        <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5">HubSpot API</span>
        <span className="px-2 py-0.5 bg-white/5 rounded border border-white/5">Webhook Router</span>
      </div>
    </div>
  );
}
