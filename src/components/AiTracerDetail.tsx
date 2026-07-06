import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Cpu, 
  Layers, 
  Network, 
  Database, 
  CheckCircle2, 
  Lock, 
  Eye, 
  Activity, 
  Shield, 
  Zap, 
  ArrowRight,
  Server,
  Key,
  Flame,
  Shuffle,
  Check,
  X,
  ShieldAlert,
  Search,
  FileText,
  DollarSign,
  TrendingUp,
  Link
} from 'lucide-react';

interface AiTracerDetailProps {
  onBack: () => void;
}

export default function AiTracerDetail({ onBack }: AiTracerDetailProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'position'>('pipeline');
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Architecture Layers for AITracer
  const layers = [
    {
      id: 'presentation',
      name: '1. Presentation Layer',
      sub: 'Operational Visibility & Interaction Panels',
      items: ['Dashboard', 'Trace Explorer', 'AI Studio', 'Reports', 'Governance Console', 'Cost Analytics'],
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
      icon: Layers,
      details: 'Renders comprehensive dashboards, telemetry traces, and policy logs. Offers deep filtering capabilities to audit cost, safety benchmarks, and latency profiles across dynamic AI models.'
    },
    {
      id: 'api',
      name: '2. API Layer',
      sub: 'Secure Operational Ingress',
      items: ['JWT Authentication', 'API Key Authentication', 'Request Validation', 'Rate Limiting', 'API Versioning', 'REST Endpoints'],
      color: 'from-purple-500/10 to-indigo-500/10',
      borderColor: 'border-purple-500/20',
      icon: Lock,
      details: 'Secure entry gate ensuring payload structural sanitization. Verifies rotating API tokens, enforces rate metrics, and normalizes headers without making policy decisions.'
    },
    {
      id: 'processing',
      name: '3. Processing Layer',
      sub: 'Central Trace Normalization Pipeline',
      items: ['Normalize Trace', 'Compute SHA-256', 'Policy Triggering', 'Cost Matrix', 'Webhooks Dispatch'],
      color: 'from-[#ff7a1a]/10 to-red-500/5',
      borderColor: 'border-[#ff7a1a]/30',
      icon: Cpu,
      details: 'The operational core of AITracer. Validates payloads, transforms provider-specific telemetry into canonical records, calculates tokens, executes governance blocks, and triggers notifications.'
    },
    {
      id: 'governance',
      name: '4. Governance Layer',
      sub: 'PII Identification & Policy Decision Center',
      items: ['PII Detection', 'Compliance Scanning', 'Custom Policy Rules', 'Risk Classification', 'Evidence Blocks'],
      color: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-500/20',
      icon: Shield,
      details: 'Evaluates normalized runs against rigorous organizational templates. Identifies credentials leak, checks compliance benchmarks, flags toxic outputs, and scores overall trace risks.'
    },
    {
      id: 'verification',
      name: '5. Verification Layer',
      sub: 'Canonical Hash & Tamper Protection',
      items: ['Canonical Serializer', 'SHA-256 Hashing', 'Integrity Proofs', 'Evidence Generator'],
      color: 'from-blue-500/10 to-indigo-500/10',
      borderColor: 'border-blue-500/25',
      icon: CheckCircle2,
      details: 'Constructs tamper-proof seals over trace streams. Uses canonical serialization and robust SHA-256 signatures to build chains of evidence that can be validated independently.'
    },
    {
      id: 'intelligence',
      name: '6. Intelligence Layer',
      sub: 'Financial & Model Performance Aggregators',
      items: ['Cost Aggregation', 'Token Utility Indexes', 'Evaluation Scores', 'Trend Analytics'],
      color: 'from-amber-500/10 to-orange-500/5',
      borderColor: 'border-amber-500/20',
      icon: TrendingUp,
      details: 'Converts simple streams into structured reports. Aggregates tokens, maps model accuracy over time, detects anomalies, and generates financial summaries across different departments.'
    },
    {
      id: 'integration',
      name: '7. Integration Layer',
      sub: 'Downstream Service Dispatchers',
      items: ['AI Providers', 'Notification Channels', 'Webhooks Dispatch', 'OpenTelemetry', 'Enterprise API'],
      color: 'from-pink-500/10 to-rose-500/5',
      borderColor: 'border-pink-500/25',
      icon: Network,
      details: 'Bridges AITracer with downstream systems. Handles OAuth tokens, manages payload buffering, and maps trace metrics to OpenTelemetry or external enterprise log repositories.'
    },
    {
      id: 'persistence',
      name: '8. Persistence Layer',
      sub: 'Durable, Secure Forensic Archive',
      items: ['AI Traces Store', 'Execution History', 'Audit Logs', 'Alerts Registry', 'Policy Signatures'],
      color: 'from-neutral-500/10 to-neutral-900/10',
      borderColor: 'border-neutral-800',
      icon: Database,
      details: 'Maintains long-term, read-optimized archival stores for historical query structures, active alerts, policy results, and security forensic checks.'
    }
  ];

  // Pipeline execution sequence
  const executionSteps = [
    { step: 1, name: 'AI Application', desc: 'The client application invokes an LLM model and captures raw request-response structures.' },
    { step: 2, name: 'AITracer API', desc: 'Securely dispatches payload metrics and model headers into the AITracer telemetry endpoint.' },
    { step: 3, name: 'Authentication', desc: 'Verifies incoming keys or Auth0 tokens to map logs to correct tenant workspaces.' },
    { step: 4, name: 'Validation', desc: 'Sanitizes the trace payload ensuring schema compatibility and structural integrity.' },
    { step: 5, name: 'Normalization', desc: 'Maps vendor-specific JSON fields (OpenAI, Anthropic, Gemini) into a unified trace schema.' },
    { step: 6, name: 'Decision Record', desc: 'Constructs a canonical execution record capture outlining parameters, costs, and content.' },
    { step: 7, name: 'SHA-256 Hashing', desc: 'Generates a robust cryptographic signature to protect logs against retrospective edits.' },
    { step: 8, name: 'Governance Engine', desc: 'Scans text fields for PII, toxic patterns, credentials leak, and company safety parameters.' },
    { step: 9, name: 'Cost Analysis', desc: 'Maps token counts to model pricing tiers to calculate real-time execution cost logs.' },
    { step: 10, name: 'Persistence', desc: 'Durably writes canonical structures, SHA signatures, and metadata into read-optimized vaults.' },
    { step: 11, name: 'Event Bus', desc: 'Publishes domain event markers to inform dashboards, alerts, and active webhooks.' },
    { step: 12, name: 'Dashboards', desc: 'Updates analytical visuals, exports PDF audits, and alerts security admins immediately.' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16 md:space-y-24 py-6"
    >
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-900 pb-6 gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2.5 rounded-lg border border-neutral-900 bg-neutral-950/60 text-neutral-400 hover:text-white hover:border-neutral-800 transition-all cursor-pointer flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest text-[#22d3ee] font-bold uppercase">
                GOVERNANCE PLATFORM
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase mt-0.5">
              AITRACER PLATFORM
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="text-[10px] font-mono tracking-wider font-bold bg-white text-black px-4 py-2 rounded-md hover:bg-neutral-200 transition-colors cursor-pointer uppercase"
          >
            Back to Ecosystem Map
          </button>
        </div>
      </div>

      {/* DYNAMIC TWO COLUMN OVERVIEW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE ARCHITECTURAL STACK */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block mb-1">
              GOVERNANCE PIPELINES
            </span>
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase tracking-tight">
              AITracer Public Architecture
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
              Every execution can be inspected, verified, governed, and audited without changing your underlying AI provider. Hover over any layer below to explore system features.
            </p>
          </div>

          {/* Interactive layers diagram */}
          <div className="relative border border-neutral-900/60 bg-neutral-950/20 rounded-2xl p-6 md:p-8 space-y-3.5 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

            <div className="space-y-3 relative z-10">
              {layers.map((layer, index) => {
                const isHovered = hoveredLayer === layer.id;
                const LayerIcon = layer.icon;

                return (
                  <div key={layer.id} className="flex flex-col items-center">
                    <div 
                      onMouseEnter={() => setHoveredLayer(layer.id)}
                      onMouseLeave={() => setHoveredLayer(null)}
                      className={`w-full bg-black border ${layer.borderColor} rounded-xl p-4 transition-all duration-300 cursor-help relative group bg-gradient-to-r ${layer.color} ${isHovered ? `shadow-md shadow-neutral-950 scale-[1.01]` : ''}`}
                    >
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/5 rounded-t-xl group-hover:bg-white/10" />

                      <div className="flex items-start gap-3.5">
                        <div className="p-2 rounded-lg bg-black/40 border border-white/5 text-neutral-300 group-hover:text-white transition-colors">
                          <LayerIcon className="w-4 h-4 text-emerald-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-display font-extrabold text-xs tracking-wider uppercase text-neutral-200">
                              {layer.name}
                            </h4>
                            <span className="text-[8px] font-mono text-neutral-500 font-bold">
                              LEVEL {layers.length - index}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 font-sans mt-0.5">
                            {layer.sub}
                          </p>

                          <div className="flex flex-wrap gap-1 mt-2.5">
                            {layer.items.map((item, idx) => (
                              <span 
                                key={idx}
                                className="text-[8px] font-mono px-1.5 py-0.2 bg-black/80 text-neutral-300 border border-neutral-900 rounded-sm"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <AnimatePresence>
                        {isHovered && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-3 pt-3 border-t border-neutral-900/60 overflow-hidden"
                          >
                            <p className="text-[10.5px] text-neutral-300 font-sans leading-relaxed">
                              {layer.details}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {index < layers.length - 1 && (
                      <div className="py-1 text-neutral-800 flex flex-col items-center">
                        <ArrowDownIcon className="w-3.5 h-3.5 text-neutral-700 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* DESIGN PRINCIPLES */}
          <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
              <Zap className="w-4 h-4 text-[#ff7a1a]" />
              <h4 className="font-display font-bold text-xs tracking-wider uppercase text-white">
                Core Design Principles
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              {[
                { title: 'Provider Agnostic', desc: 'Works with any LLM vendor standard.' },
                { title: 'Cryptographically Verifiable', desc: 'Secure SHA-256 integrity checks.' },
                { title: 'Governance First', desc: 'Checks safety policies asynchronously.' },
                { title: 'Immutable Audit Evidence', desc: 'Maintains durable custodial log files.' },
                { title: 'Event Driven', desc: 'Triggers alerts instantly on-the-fly.' },
                { title: 'Enterprise Ready', desc: 'Equipped with Auth0 keys and scaling models.' }
              ].map((p, idx) => (
                <div key={idx} className="space-y-0.5">
                  <strong className="text-[10px] font-mono tracking-wider text-neutral-200 uppercase block">{p.title}</strong>
                  <span className="text-[10.5px] text-neutral-500 font-sans block leading-snug">{p.desc}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: CORE INTERACTIVE EXPERIENCES */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* TAB HEADERS */}
          <div className="flex items-center gap-4 border-b border-neutral-900 pb-2">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`text-xs font-mono font-bold uppercase pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'pipeline' ? 'border-emerald-400 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Trace Lifecycle
            </button>
            <button
              onClick={() => setActiveTab('position')}
              className={`text-xs font-mono font-bold uppercase pb-2 border-b-2 transition-all cursor-pointer ${
                activeTab === 'position' ? 'border-[#ff7a1a] text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Position in Stack
            </button>
          </div>

          {activeTab === 'pipeline' ? (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block mb-1">
                  TRACE LIFECYCLE
                </span>
                <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                  End-to-End Execution Flow
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-1">
                  Trace how an AI interaction request gets securely captured, structured, signed, evaluated, and stored into custody records.
                </p>
              </div>

              {/* Interactive flow list */}
              <div className="space-y-2 max-h-[700px] overflow-y-auto pr-1 scrollbar-thin">
                {executionSteps.map((stepItem, idx) => {
                  const isActive = activeStep === idx;

                  return (
                    <div 
                      key={stepItem.step}
                      onMouseEnter={() => setActiveStep(idx)}
                      onMouseLeave={() => setActiveStep(null)}
                      className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-neutral-950 border-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.1)] scale-[1.005]' 
                          : 'bg-neutral-950/40 border-neutral-900/60 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${isActive ? 'bg-emerald-400 text-black' : 'bg-neutral-900 text-neutral-500'}`}>
                            {stepItem.step}
                          </span>
                          <h4 className={`font-display font-bold text-xs tracking-wide uppercase ${isActive ? 'text-emerald-400' : 'text-neutral-200'}`}>
                            {stepItem.name}
                          </h4>
                        </div>
                        {idx < executionSteps.length - 1 && (
                          <span className="text-[9px] font-mono text-neutral-700">NEXT →</span>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {(isActive || true) && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed border-t border-neutral-900/50 pt-2"
                          >
                            {stepItem.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block mb-1">
                  NOIR STACK UNIFICATION
                </span>
                <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                  Position Within the Noir Stack
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-1">
                  AITracer provides the crucial telemetry and governance framework. Surrounding Noir Stack applications consume AITracer proof metrics to drive deeper orchestrations.
                </p>
              </div>

              {/* Architectural Block Map */}
              <div className="bg-neutral-950 p-6 rounded-2xl border border-neutral-900 space-y-6">
                <div className="flex justify-center">
                  <div className="border border-emerald-500/30 bg-emerald-950/10 rounded-xl px-6 py-3.5 text-center w-full max-w-sm shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block">Core Source</span>
                    <strong className="text-sm font-display text-white uppercase block mt-1">AI Applications</strong>
                    <span className="text-[10px] text-neutral-400 block font-sans mt-0.5">LLM Requests, Agent Tasks, Chat Streams</span>
                  </div>
                </div>

                <div className="flex justify-center text-neutral-700 animate-pulse">
                  <span className="text-lg">↓</span>
                </div>

                <div className="flex justify-center">
                  <div className="border border-white/20 bg-neutral-950 px-6 py-4 rounded-xl text-center w-full max-w-sm border-l-2 border-l-emerald-400">
                    <span className="text-[9px] font-mono text-emerald-400 uppercase tracking-widest block">Governance Gateway</span>
                    <strong className="text-base font-display text-white uppercase block mt-1">AITracer OS</strong>
                    <span className="text-[10.5px] text-neutral-400 block font-sans mt-1">Captures, normalizes, hash-verifies, and evaluates safety models</span>
                  </div>
                </div>

                <div className="flex justify-center text-neutral-700 animate-pulse">
                  <span className="text-lg">↓</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {[
                    { title: 'Cascades', color: 'border-[#ff7a1a]/30', sub: 'Workflow Orchestration', desc: 'Retrieves governance decisions to route steps, branch operations, or execute retry loops.' },
                    { title: 'LedgerBill', color: 'border-blue-500/20', sub: 'Usage & Token Billing', desc: 'Reads trace token costs and model pricing models to calculate transactional billings.' },
                    { title: 'Hexarch', color: 'border-cyan-500/20', sub: 'Proof & Policy Services', desc: 'Registers AITracer SHA-256 integrity hashes on decentralised audit tables.' },
                    { title: 'NoirAI', color: 'border-pink-500/20', sub: 'Telemetry Observability', desc: 'Aggregates latency spikes, model utilization stats, and active platform performance.' }
                  ].map((block, idx) => (
                    <div key={idx} className={`bg-black/40 border ${block.color} p-4 rounded-xl space-y-1.5`}>
                      <span className="text-[9px] font-mono text-neutral-500 uppercase block">{block.sub}</span>
                      <strong className="text-xs text-white uppercase block font-display">{block.title}</strong>
                      <p className="text-[10.5px] text-neutral-400 font-sans leading-relaxed">{block.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* COMPARISON TRADITIONAL LOGS vs AITRACER */}
          <div className="space-y-6 pt-6 border-t border-neutral-900/80">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block mb-1">
                VALUE VERITY
              </span>
              <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                Traditional AI Logging vs. AITracer
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                See how AITracer moves beyond basic print logs and telemetry trackers into standard-driven secure records.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TRADITIONAL SOLUTIONS */}
              <div className="bg-neutral-950/40 border border-neutral-900/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                  <X className="w-4 h-4 text-red-500" />
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-400">
                    Traditional AI Logging
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {[
                    { title: 'Vendor Lock-in', desc: 'Siloed logs tied directly to specific cloud consoles or model accounts.' },
                    { title: 'Editable History', desc: 'Records stored in basic mutable tables, vulnerable to retrospectives.' },
                    { title: 'No Governance Policy', desc: 'Captures data passively without checking for PII or toxic leaks.' },
                    { title: 'Isolated Cost Tracking', desc: 'Requires manual spreadsheets to compute tokens and expenditures.' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs">
                      <span className="font-mono text-[9px] text-neutral-600 mt-0.5">0{idx + 1}</span>
                      <div>
                        <strong className="text-neutral-300 font-medium block">{item.title}</strong>
                        <span className="text-neutral-500 font-sans text-[11px] leading-relaxed block">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AITRACER SOLUTIONS */}
              <div className="bg-neutral-950/80 border border-emerald-950/50 rounded-xl p-5 space-y-4 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-emerald-400">
                    AITracer Gateway
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {[
                    { title: 'Provider Agnostic', desc: 'Uniform, normalized schema maps any LLM provider JSON instantly.' },
                    { title: 'Cryptographic Custody', desc: 'Durable records sealed with real-time SHA-256 verify hash-chains.' },
                    { title: 'Asynchronous Scans', desc: 'Automated PII detection, risk tags, and security blocks.' },
                    { title: 'Cost Intelligence', desc: 'Calculates tokens, pricing metrics, and real-time department budgets.' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs">
                      <span className="font-mono text-[9px] text-emerald-500/70 mt-0.5">0{idx + 1}</span>
                      <div>
                        <strong className="text-emerald-400 font-bold block">{item.title}</strong>
                        <span className="text-neutral-300 font-sans text-[11px] leading-relaxed block">{item.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}

// Simple internal helper
function ArrowDownIcon(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M12 5v14M19 12l-7 7-7-7" />
    </svg>
  );
}
