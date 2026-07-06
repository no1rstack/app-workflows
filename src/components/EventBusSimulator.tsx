import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, Pause, RefreshCw, Terminal, CheckCircle2, 
  ArrowRight, Radio, Activity, Cpu, Calendar, Database, 
  Cpu as Chip, ShieldCheck, DollarSign, ExternalLink, Zap
} from 'lucide-react';

interface EventStep {
  id: number;
  title: string;
  sub: string;
  sourceNode: {
    name: string;
    color: string;
    icon: React.ComponentType<any>;
  };
  targetNode: {
    name: string;
    color: string;
    icon: React.ComponentType<any>;
  };
  eventType: string;
  eventDescription: string;
  payloadTemplate: (id: string, time: string) => object;
}

export default function EventBusSimulator() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [speed, setSpeed] = useState<number>(4000); // 4000ms per transition by default
  const [history, setHistory] = useState<Array<{ id: string; time: string; type: string; payload: any }>>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<number | null>(null);
  
  const progressRef = useRef<number>(0);
  const [progressPercent, setProgressPercent] = useState(0);

  const steps: EventStep[] = [
    {
      id: 0,
      title: "Workflow Dispatched",
      sub: "Ecosystem kickoff triggered via Cascades",
      sourceNode: { name: "Cascades", color: "#22d3ee", icon: Chip },
      targetNode: { name: "Judicium", color: "#22d3ee", icon: Activity },
      eventType: "Workflow.Started",
      eventDescription: "Triggered case ingestion. Dispatching automated OSINT & digital casework pipelines.",
      payloadTemplate: (id, time) => ({
        event_id: `evt_wf_${id}`,
        event_type: "Workflow.Started",
        timestamp: time,
        origin: "cascades.noirstack.com",
        data: {
          workflow_id: `wf_case_${Math.floor(100000 + Math.random() * 900000)}`,
          trigger_source: "api_gateway_ingress",
          target_entity: "shdwcdr@gmail.com",
          investigation_type: "forensics_automated_pdf",
          priority_level: "CRITICAL",
          node_routing: "primary-us-east"
        },
        metadata: {
          sdk_version: "noirs_node_v4.1.2",
          correlation_id: `corr_${Math.floor(Math.random() * 10000000)}`
        }
      })
    },
    {
      id: 1,
      title: "Report Compiled",
      sub: "Judicium forensic investigation completed",
      sourceNode: { name: "Judicium", color: "#22d3ee", icon: Activity },
      targetNode: { name: "HexArch", color: "#a855f7", icon: ShieldCheck },
      eventType: "Report.Generated",
      eventDescription: "Evidence ledger resolved, relational entity mapping completed, and audit report compiled.",
      payloadTemplate: (id, time) => ({
        event_id: `evt_rep_${id}`,
        event_type: "Report.Generated",
        timestamp: time,
        origin: "judicium.noirstack.com",
        data: {
          case_id: `case_osint_${Math.floor(100000 + Math.random() * 900000)}`,
          resolved_entities: ["shdwcdr@gmail.com", "noir_node_root", "proxy_pool_90"],
          pdf_checksum: "sha256_d89f1301bb97c36aef44a106b89679093bf7b1b590e0b38",
          total_evidence_nodes: 42,
          verdict: "SIGNATURE_ANOMALY_CONFIRMED"
        },
        metadata: {
          processing_ms: 1240,
          analyst_bypass: false
        }
      })
    },
    {
      id: 2,
      title: "Cryptographic Lock Created",
      sub: "HexArch anchors the compiled report to blockchain",
      sourceNode: { name: "HexArch", color: "#a855f7", icon: ShieldCheck },
      targetNode: { name: "LedgerBill", color: "#f97316", icon: DollarSign },
      eventType: "Proof.Created",
      eventDescription: "Immutable digital proof built via ECDSA cryptographic signatures and anchored to the ledger.",
      payloadTemplate: (id, time) => ({
        event_id: `evt_prf_${id}`,
        event_type: "Proof.Created",
        timestamp: time,
        origin: "hexarch.noirstack.com",
        data: {
          proof_hash: `0x${Array.from({length: 40}, () => Math.floor(Math.random()*16).toString(16)).join('')}`,
          signature: "MEYCIQCc9mGfVfE2b+k7b4L9h7m9B...[ECDSA_SHA256_SECp256k1]",
          ledger_block: Math.floor(1490200 + Math.random() * 500),
          immutable_lock: true,
          evidence_class: "FORENSIC_CASE_BRIEF"
        },
        metadata: {
          encryption_suite: "secp256k1",
          anchor_status: "ANARCHY_SECURED"
        }
      })
    },
    {
      id: 3,
      title: "Egress Bill Rendered",
      sub: "LedgerBill measures and issues the client invoice",
      sourceNode: { name: "LedgerBill", color: "#f97316", icon: DollarSign },
      targetNode: { name: "Cascades", color: "#22d3ee", icon: Chip }, // Loop back
      eventType: "Invoice.Generated",
      eventDescription: "Usage metering completed, Stripe transaction ledgered, and secure operational invoice produced.",
      payloadTemplate: (id, time) => ({
        event_id: `evt_inv_${id}`,
        event_type: "Invoice.Generated",
        timestamp: time,
        origin: "ledgerbill.noirstack.com",
        data: {
          invoice_id: `inv_corp_${Math.floor(1000 + Math.random() * 9000)}`,
          customer: "shdwcdr@gmail.com",
          compute_units: 42.15,
          total_charge_usd: 12.65,
          stripe_charge_id: "ch_stripe_8a7d3h129sdh9812",
          payment_terms: "NET_30",
          status: "DELIVERED_TO_INBOX"
        },
        metadata: {
          tax_computation: "us_sales_tax_waived",
          compliance_hash: "v_meter_90a8a7"
        }
      })
    }
  ];

  // Live timer for autopilot
  useEffect(() => {
    let timer: any;
    if (isPlaying) {
      const intervalMs = 50;
      const totalSteps = speed / intervalMs;
      timer = setInterval(() => {
        progressRef.current += 1;
        const progress = (progressRef.current / totalSteps) * 100;
        setProgressPercent(Math.min(100, progress));

        if (progressRef.current >= totalSteps) {
          progressRef.current = 0;
          setProgressPercent(0);
          
          // Advance to the next event step
          setCurrentStepIndex((prev) => {
            const next = (prev + 1) % steps.length;
            // Generate a history item
            const newHistoryItem = {
              id: Math.random().toString(36).substr(2, 9).toUpperCase(),
              time: new Date().toISOString(),
              type: steps[prev].eventType,
              payload: steps[prev].payloadTemplate(
                Math.random().toString(36).substr(2, 6).toUpperCase(),
                new Date().toISOString()
              )
            };
            setHistory((prevHistory) => [newHistoryItem, ...prevHistory.slice(0, 14)]);
            return next;
          });
        }
      }, intervalMs);
    }
    return () => clearInterval(timer);
  }, [isPlaying, speed]);

  const triggerStep = (index: number) => {
    progressRef.current = 0;
    setProgressPercent(0);
    setCurrentStepIndex(index);
    
    const targetStep = steps[index];
    const newHistoryItem = {
      id: Math.random().toString(36).substr(2, 9).toUpperCase(),
      time: new Date().toISOString(),
      type: targetStep.eventType,
      payload: targetStep.payloadTemplate(
        Math.random().toString(36).substr(2, 6).toUpperCase(),
        new Date().toISOString()
      )
    };
    setHistory((prev) => [newHistoryItem, ...prev.slice(0, 14)]);
  };

  const currentStep = steps[currentStepIndex];
  const activePayload = currentStep.payloadTemplate("LIVE_SIM", new Date().toISOString());

  // Show a default history list if none exists
  useEffect(() => {
    if (history.length === 0) {
      const initialHistory = steps.map((s, i) => ({
        id: `INIT_${100 + i}`,
        time: new Date(Date.now() - (steps.length - i) * 60000).toISOString(),
        type: s.eventType,
        payload: s.payloadTemplate(`INIT_${100 + i}`, new Date().toISOString())
      })).reverse();
      setHistory(initialHistory);
    }
  }, []);

  return (
    <div id="event-bus-simulator" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/80 p-6 md:p-8 backdrop-blur-md transition-all duration-500 w-full">
      {/* Abstract Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-20" />

      {/* Header section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-neutral-900 pb-4 mb-6 gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/5 border border-cyan-500/20 flex items-center justify-center">
            <Radio className="w-5.5 h-5.5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
              REAL-TIME ORCHESTRATION BROKER
            </span>
            <h3 className="font-display font-extrabold text-base md:text-lg text-white uppercase mt-0.5 tracking-wider">
              HIGH-FIDELITY EVENT BUS FLOW
            </h3>
          </div>
        </div>

        {/* Live Controller Settings */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Autopilot Switcher */}
          <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-900">
            <span className="text-[9px] font-mono text-neutral-500 font-semibold uppercase">AUTOPILOT:</span>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded border transition-colors cursor-pointer font-bold uppercase ${
                isPlaying 
                  ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
              {isPlaying ? 'ACTIVE' : 'PAUSED'}
            </button>
          </div>

          {/* Speed settings */}
          <div className="flex items-center gap-1 bg-black/60 px-2.5 py-1 rounded-lg border border-neutral-900 text-[9px] font-mono text-neutral-500">
            <span className="mr-1">SPEED:</span>
            <button 
              onClick={() => setSpeed(6000)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${speed === 6000 ? 'text-cyan-400 font-bold bg-cyan-950/20' : 'hover:text-neutral-300'}`}
            >
              SLOW
            </button>
            <button 
              onClick={() => setSpeed(4000)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${speed === 4000 ? 'text-cyan-400 font-bold bg-cyan-950/20' : 'hover:text-neutral-300'}`}
            >
              NORM
            </button>
            <button 
              onClick={() => setSpeed(2000)}
              className={`px-1.5 py-0.5 rounded cursor-pointer ${speed === 2000 ? 'text-[#ff7a1a] font-bold bg-orange-950/20' : 'hover:text-neutral-300'}`}
            >
              WARP
            </button>
          </div>

          {/* Reset button */}
          <button 
            onClick={() => {
              progressRef.current = 0;
              setProgressPercent(0);
              setCurrentStepIndex(0);
              setHistory([]);
            }}
            className="p-1.5 rounded-lg border border-neutral-900 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Reset Event History"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs md:text-sm text-neutral-400 mb-8 max-w-2xl leading-relaxed relative z-10">
        Observe the life-cycle of standard telemetry workflows crossing the platform bus. Event channels serialize data across microservices, spawning secondary auditing, blockchain validation, and billing jobs dynamically.
      </p>

      {/* Grid: Schema Diagram vs Live Log Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch relative z-10">
        
        {/* LEFT COLUMN: THE GRAPHIC EVENT BUS FLOW (Col-Span 7) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Main Visual bus diagram */}
          <div className="relative border border-neutral-900 bg-black/50 rounded-xl p-5 md:p-6 overflow-hidden flex-1 flex flex-col justify-between">
            {/* Bus Track Line (Horizontal track in desktop, full layout) */}
            <div className="absolute top-[50%] left-6 right-6 h-0.5 bg-neutral-900 -translate-y-1/2 hidden md:block" />

            {/* Stepped Event Sequence representation */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-2 relative z-10">
              {steps.map((step, idx) => {
                const isCurrent = currentStepIndex === idx;
                const isPast = currentStepIndex > idx;
                const SourceIcon = step.sourceNode.icon;
                const TargetIcon = step.targetNode.icon;

                return (
                  <div 
                    key={step.id} 
                    className={`flex flex-col items-center justify-between p-3.5 rounded-xl border transition-all duration-500 text-center relative ${
                      isCurrent 
                        ? 'bg-neutral-950 border-neutral-700 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                        : 'bg-neutral-950/40 border-neutral-900 opacity-60 hover:opacity-100'
                    }`}
                  >
                    {/* Active Step glowing pulse halo */}
                    {isCurrent && (
                      <span 
                        className="absolute inset-0 rounded-xl pointer-events-none animate-pulse border"
                        style={{ borderColor: step.sourceNode.color }}
                      />
                    )}

                    {/* Step indicator tag */}
                    <div className="absolute top-2 right-2 text-[8px] font-mono font-bold text-neutral-600">
                      STG 0{idx + 1}
                    </div>

                    {/* Source Node Icon */}
                    <div className="flex flex-col items-center gap-1.5 mb-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-500"
                        style={{ 
                          backgroundColor: isCurrent ? `${step.sourceNode.color}10` : 'rgba(0,0,0,0.5)',
                          borderColor: isCurrent ? step.sourceNode.color : '#1f1f1f',
                          color: isCurrent ? step.sourceNode.color : '#525252'
                        }}
                      >
                        <SourceIcon className="w-4 h-4" />
                      </div>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-neutral-400">
                        {step.sourceNode.name}
                      </span>
                    </div>

                    {/* Event Arrow & Event Title */}
                    <div className="w-full py-2 flex flex-col items-center justify-center my-1 relative">
                      {/* Active traveling particle representing event packet */}
                      {isCurrent && (
                        <motion.div 
                          className="absolute h-1 rounded-full z-20 left-0 right-0 top-1/2 -translate-y-1/2"
                          style={{ background: `linear-gradient(90deg, transparent, ${step.sourceNode.color}, transparent)` }}
                          animate={{ x: ['-100%', '100%'] }}
                          transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
                        />
                      )}
                      
                      <div className="text-[10px] font-mono font-extrabold tracking-wide uppercase px-2 py-0.5 rounded border border-neutral-900 bg-black text-white">
                        {step.eventType}
                      </div>
                      
                      <div className="flex items-center justify-center mt-1 text-[8px] font-mono text-neutral-500 gap-1 uppercase">
                        <span>ROUTE TO</span>
                        <ArrowRight className="w-2.5 h-2.5 text-neutral-600 animate-pulse" />
                        <span className="font-bold text-neutral-400">{step.targetNode.name}</span>
                      </div>
                    </div>

                    {/* Target Node Icon */}
                    <div className="flex flex-col items-center gap-1.5 mt-3">
                      <div 
                        className="w-8 h-8 rounded-lg flex items-center justify-center border transition-all duration-500"
                        style={{ 
                          backgroundColor: isCurrent ? `${step.targetNode.color}05` : 'rgba(0,0,0,0.5)',
                          borderColor: isCurrent ? `${step.targetNode.color}30` : '#1f1f1f',
                          color: isCurrent ? step.targetNode.color : '#525252'
                        }}
                      >
                        <TargetIcon className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Manual step trigger */}
                    <button 
                      onClick={() => triggerStep(idx)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
                      title={`Dispatch ${step.eventType}`}
                    />
                  </div>
                );
              })}
            </div>

            {/* Custom SVG Event Bus Flow Line with interactive pulse indicators */}
            <div className="mt-6 border-t border-neutral-900/60 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] font-mono">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-ping" />
                <span className="text-neutral-400 font-semibold">ACTIVE EVENT:</span>
                <span className="text-white font-extrabold uppercase bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                  {currentStep.eventType}
                </span>
              </div>
              <div className="text-neutral-500">
                CONSUMER: <span className="text-cyan-400 font-bold uppercase">{currentStep.targetNode.name}</span>
              </div>
            </div>

            {/* Autopilot Progress Bar */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900">
                <div 
                  className="h-full bg-cyan-500 transition-all duration-100 ease-linear shadow-[0_0_8px_rgba(6,182,212,0.4)]" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            )}
          </div>

          {/* Current Event Description Box */}
          <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-4 flex gap-3.5 items-start">
            <div className="p-2 rounded-lg bg-cyan-950/30 border border-cyan-800/20 text-cyan-400 mt-0.5">
              <Zap className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div className="space-y-1">
              <h4 className="font-display font-extrabold text-xs text-white uppercase tracking-wider">
                {currentStep.title}
              </h4>
              <p className="text-[10px] text-neutral-400 leading-relaxed font-sans">
                {currentStep.eventDescription}
              </p>
              <div className="text-[8px] font-mono text-[#ff7a1a] uppercase tracking-widest pt-1 font-bold">
                Ecosystem Impact: {currentStep.sub}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REALTIME JSON LOG CONSOLE (Col-Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between border border-neutral-900 bg-black/60 rounded-xl p-4 relative overflow-hidden min-h-[420px]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-900/60 pb-2 mb-3">
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-neutral-500" />
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
                Event Bus Stream Monitor
              </span>
            </div>
            <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/20 border border-emerald-900/30 px-1.5 py-0.5 rounded uppercase font-bold animate-pulse">
              LIVE BROADCAST
            </span>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 bg-neutral-950 p-3.5 rounded-lg border border-neutral-900/80 font-mono text-[10px] text-emerald-400 overflow-y-auto max-h-[290px] leading-relaxed scrollbar-thin">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-neutral-500 mb-1">// Event Ingestion Payload Header</div>
                <pre className="text-cyan-400 text-glow-cyan selection:bg-cyan-950">
                  {JSON.stringify(activePayload, null, 2)}
                </pre>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Event Stream History Stack */}
          <div className="mt-4 pt-3 border-t border-neutral-900/60">
            <div className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest mb-1.5 font-bold">
              Recent Event History Ledger
            </div>
            <div className="space-y-1 max-h-[100px] overflow-y-auto scrollbar-thin">
              {history.map((hist, idx) => (
                <div 
                  key={hist.id + idx}
                  className="flex items-center justify-between text-[9px] font-mono px-2 py-1 rounded bg-neutral-950/50 border border-neutral-900/30 text-neutral-400 hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-neutral-600 text-[8px]">
                      {new Date(hist.time).toLocaleTimeString()}
                    </span>
                    <span className="text-cyan-400 font-extrabold uppercase">
                      {hist.type}
                    </span>
                  </div>
                  <span className="text-neutral-600 text-[8px] tracking-wider uppercase font-bold">
                    ID: {hist.id}
                  </span>
                </div>
              ))}
              {history.length === 0 && (
                <div className="text-[9px] text-neutral-600 font-mono italic text-center py-2">
                  Waiting for event dispatch...
                </div>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
