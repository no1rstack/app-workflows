import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowDown, 
  Cpu, 
  Layers, 
  Network, 
  Database, 
  FileText, 
  CheckCircle2, 
  Globe, 
  Lock, 
  Share2, 
  Eye, 
  Activity, 
  Terminal, 
  Shield, 
  Zap, 
  GitBranch, 
  ArrowRight,
  Server,
  Key,
  Flame,
  Shuffle,
  Compass,
  Check,
  X
} from 'lucide-react';

interface CascadesDetailProps {
  onBack: () => void;
}

export default function CascadesDetail({ onBack }: CascadesDetailProps) {
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'current' | 'target'>('target');
  const [activeSection, setActiveSection] = useState<'details' | 'flow'>('details');
  const [activeEventStep, setActiveEventStep] = useState<number | null>(null);

  // Architecture Layers for Cascades
  const layers = [
    {
      id: 'presentation',
      name: '1. Presentation Layer',
      sub: 'User Interaction & Workflow Visualization',
      items: ['Landing Page', 'Dashboard', 'Visual Workflow Builder', 'Execution Monitoring', 'Workflow History'],
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
      icon: Layers,
      details: 'This layer handles the high-fidelity user interface. Analysts use the Visual Workflow Builder to map operational pipelines, monitor current runs in real time, and audit past executions.'
    },
    {
      id: 'edge',
      name: '2. Edge Layer',
      sub: 'Secure Ingress & API Policy Enforcement Gate',
      items: ['Apache APISIX', 'TLS Termination', 'Auth0 JWT', 'Rate Limiting', 'Webhook Ingress', 'Observability'],
      color: 'from-purple-500/10 to-indigo-500/10',
      borderColor: 'border-purple-500/20',
      icon: Shield,
      details: 'Responsible for secure ingress and TLS termination. Enforces granular OAuth/Auth0 policies, coordinates API routing, and secures webhook callbacks. IMPORTANT: Does NOT perform workflow scheduling or orchestration.'
    },
    {
      id: 'orchestration',
      name: '3. Orchestration Layer',
      sub: 'Core Workflow Engine & State Semantic Manager',
      items: ['Workflow API', 'DAG Scheduler', 'Event Orchestrator', 'Retry Engine', 'DLQ & Recovery', 'Audit Log'],
      color: 'from-[#ff7a1a]/10 to-red-500/5',
      borderColor: 'border-[#ff7a1a]/30',
      icon: Cpu,
      details: 'The central brains of Cascades. Owns ALL execution semantics including DAG scheduling, parallel branching, event triggers (webhooks/timers), retries, state machine management, and complete audit history.'
    },
    {
      id: 'integration',
      name: '4. Integration Layer',
      sub: 'External Invocations & Microservice Connectors',
      items: ['Judicium Adapter', 'Hexarch Adapter', 'LedgerBill Adapter', 'Generic Webhook Adapter'],
      color: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-500/20',
      icon: Network,
      details: 'Contains strict connectors and adapters only. Invokes downstream API contracts. Note: This layer should never contain workflow scheduling, retry policies, or state machine semantics.'
    },
    {
      id: 'infrastructure',
      name: '5. Infrastructure Layer',
      sub: 'Platform Runtime Services & Durable Queues',
      items: ['In-Memory Store', 'Single-Node Process', 'PostgreSQL (Future)', 'Redis (Future)', 'Kafka (Future)'],
      color: 'from-blue-500/10 to-cyan-500/5',
      borderColor: 'border-blue-500/20',
      icon: Database,
      details: 'Provides persistence and messaging pipelines. Currently operates as an ephemeral in-memory cache on a single Node process, but scales to postgres, distributed queues, and horizontal worker clusters in the target topology.'
    }
  ];

  // Event Flow Steps
  const eventFlowSteps = [
    { step: 1, name: 'External Event', desc: 'Downstream webhook triggers or time-based schedules ignite the ingress pipeline.' },
    { step: 2, name: 'APISIX Gateway', desc: 'Authenticates requests via Auth0 tokens, terminates TLS, and routes payloads.' },
    { step: 3, name: 'Workflow API', desc: 'Accepts the event packet and initiates lookup parameters for associated run graphs.' },
    { step: 4, name: 'Event Orchestrator', desc: 'Correlates payload data and decides when, why, and how a workflow must execute.' },
    { step: 5, name: 'DAG Scheduler', desc: 'Resolves task dependencies and schedules executable nodes according to target branching rules.' },
    { step: 6, name: 'Execution Engine', desc: 'Executes parallel steps, stores checkpoints, and controls operational state machines.' },
    { step: 7, name: 'Integration Adapters', desc: 'Dispatches secure, structured payloads to outbound service endpoints.' },
    { step: 8, name: 'Service Downstream', desc: 'Triggers deep activities in Judicium, Hexarch, or LedgerBill and reports status.' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-16 md:space-y-24 py-6"
    >
      {/* HEADER BAR */}
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
                ENTERPRISE DIVISION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase mt-0.5">
              CASCADES PLATFORM
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

      {/* TWO COLUMN INTERACTIVE PANELS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE ARCHITECTURAL LAYERS STACK */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-1">
              SYSTEM RE-ENGINEERING
            </span>
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase tracking-tight">
              Operational Architecture
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
              Explore the five structural layers driving Cascades. Hover over any layer to review exact boundaries, active micro-services, and execution responsibilities.
            </p>
          </div>

          {/* Interactive Stack Visual */}
          <div className="relative border border-neutral-900/60 bg-neutral-950/20 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

            <div className="space-y-4 relative z-10">
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
                          <LayerIcon className="w-4 h-4" />
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
                        <ArrowDown className="w-3.5 h-3.5 text-neutral-700 animate-pulse" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* KEY DESIGN PRINCIPLES CARD */}
          <div className="border border-neutral-900 bg-neutral-950/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#ff7a1a]" />
              <h4 className="font-display font-bold text-xs tracking-wider uppercase text-white">
                Key Design Principle
              </h4>
            </div>
            <div className="text-xs text-neutral-400 leading-relaxed space-y-2 font-sans">
              <p>
                <strong className="text-neutral-200">The Edge Layer</strong> accepts incoming requests.
              </p>
              <p>
                <strong className="text-[#ff7a1a]">The Orchestration Layer</strong> decides <em className="text-white not-italic font-semibold">when, why, and how</em> workflows execute.
              </p>
              <p>
                <strong className="text-neutral-200">The Integration Layer</strong> acts purely as adapters to invoke external services.
              </p>
              <p>
                <strong className="text-neutral-200">The Infrastructure Layer</strong> provides persistence, buffers, and distributed services.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: BRAND TRUTH & ARCHITECTURAL COMPARISONS */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Section Selector */}
          <div className="flex items-center gap-4 border-b border-neutral-900 pb-2">
            <button
              onClick={() => setActiveSection('details')}
              className={`text-xs font-mono font-bold uppercase pb-2 border-b-2 transition-all cursor-pointer ${
                activeSection === 'details' ? 'border-[#ff7a1a] text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Pipeline Transitions
            </button>
            <button
              onClick={() => setActiveSection('flow')}
              className={`text-xs font-mono font-bold uppercase pb-2 border-b-2 transition-all cursor-pointer ${
                activeSection === 'flow' ? 'border-cyan-400 text-white' : 'border-transparent text-neutral-500 hover:text-neutral-300'
              }`}
            >
              Interactive Event Flow
            </button>
          </div>

          {activeSection === 'details' ? (
            <div className="space-y-8">
              {/* Value block */}
              <div className="border-l-2 border-[#ff7a1a] pl-5 space-y-2">
                <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block">
                  EVOLUTION OF EXECUTION
                </span>
                <h3 className="font-display font-extrabold text-xl md:text-2xl text-white leading-tight uppercase">
                  Durable Multi-Branch Orchestration
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed font-sans max-w-xl">
                  Cascades transitions from a linear synchronous worker into a fully distributed DAG scheduler capable of executing nested dependency trees and real-time triggers.
                </p>
              </div>

              {/* CURRENT vs TARGET TABS */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 p-1 bg-black border border-neutral-900 rounded-lg max-w-md">
                  <button
                    onClick={() => setActiveTab('current')}
                    className={`py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                      activeTab === 'current' 
                        ? 'bg-neutral-950 text-[#ff7a1a] border border-neutral-900' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Current Architecture
                  </button>
                  <button
                    onClick={() => setActiveTab('target')}
                    className={`py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                      activeTab === 'target' 
                        ? 'bg-neutral-950 text-cyan-400 border border-neutral-900' 
                        : 'text-neutral-500 hover:text-neutral-300'
                    }`}
                  >
                    Target Architecture
                  </button>
                </div>

                <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-900/60">
                  {activeTab === 'current' ? (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-[#ff7a1a] uppercase tracking-wider mb-2">
                          Active Sync Model (Linear Synchronous)
                        </h4>
                        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                          A streamlined, lightweight microservice focusing on immediate requests and linear steps. Excellent for local developments but limited in nested topologies.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: 'Execution Model', desc: 'Linear sequential workflows. No complex branching rules or parallel stages.' },
                          { title: 'Process Model', desc: 'Runs as a single, lightweight Node.js Express thread.' },
                          { title: 'Gateway Access', desc: 'Direct mapping routed via Auth0 verification inside APISIX.' },
                          { title: 'Data Persistence', desc: 'Transient state stored inside localized in-memory arrays.' }
                        ].map((item, idx) => (
                          <div key={idx} className="border border-neutral-900/60 p-3.5 rounded bg-black/40">
                            <span className="text-[9px] font-mono text-neutral-500 block mb-1">0{idx + 1} // STATUS: ACTIVE</span>
                            <strong className="text-xs text-neutral-200 uppercase tracking-wide block font-display">{item.title}</strong>
                            <span className="text-xs text-neutral-400 font-sans mt-1 block leading-relaxed">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div>
                        <h4 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider mb-2">
                          Distributed DAG Topology (Asynchronous Orchestrator)
                        </h4>
                        <p className="text-xs text-neutral-400 font-sans leading-relaxed">
                          Durable workflow state machines executing non-blocking directed acyclic graph instructions across dynamic, asynchronous nodes.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                        {[
                          { title: 'DAG Scheduler', desc: 'Asynchronous dependency engines mapping complex trees and parallel stages.' },
                          { title: 'Event Bus OS', desc: 'Webhook hooks, timed chronos feeds, and robust correlation models.' },
                          { title: 'Horizontal Workers', desc: 'Durable message queues and distributed worker runners for resilient jobs.' },
                          { title: 'Data Storage', desc: 'Durable schema state machines utilizing PostgreSQL caching models.' }
                        ].map((item, idx) => (
                          <div key={idx} className="border border-emerald-950/30 p-3.5 rounded bg-emerald-950/5">
                            <span className="text-[9px] font-mono text-emerald-400/60 block mb-1">0{idx + 1} // STATUS: SCALING</span>
                            <strong className="text-xs text-emerald-400 uppercase tracking-wide block font-display">{item.title}</strong>
                            <span className="text-xs text-neutral-400 font-sans mt-1 block leading-relaxed">{item.desc}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-1">
                  INGRESS PIPELINES
                </span>
                <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                  External Event Ingestion Pipeline
                </h3>
                <p className="text-xs text-neutral-400 font-sans mt-1">
                  Follow how external signals are validated, mapped to complex workflows, scheduled, and dispatched down to operational platforms.
                </p>
              </div>

              {/* Interactive Event Flow Steps */}
              <div className="space-y-2">
                {eventFlowSteps.map((flowStep, idx) => {
                  const isActive = activeEventStep === idx;

                  return (
                    <div 
                      key={flowStep.step}
                      onMouseEnter={() => setActiveEventStep(idx)}
                      onMouseLeave={() => setActiveEventStep(null)}
                      className={`p-3.5 rounded-lg border transition-all duration-200 cursor-pointer ${
                        isActive 
                          ? 'bg-neutral-950 border-cyan-500 text-white shadow-[0_0_15px_rgba(34,211,238,0.1)] scale-[1.005]' 
                          : 'bg-neutral-950/40 border-neutral-900/60 text-neutral-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-mono font-bold ${isActive ? 'bg-cyan-400 text-black' : 'bg-neutral-900 text-neutral-500'}`}>
                            {flowStep.step}
                          </span>
                          <h4 className={`font-display font-bold text-xs tracking-wide uppercase ${isActive ? 'text-cyan-400' : 'text-neutral-200'}`}>
                            {flowStep.name}
                          </h4>
                        </div>
                        {idx < eventFlowSteps.length - 1 && (
                          <span className="text-[9px] font-mono text-neutral-700">FORWARD →</span>
                        )}
                      </div>
                      
                      {/* Description on active / hover */}
                      <AnimatePresence initial={false}>
                        {(isActive || true) && (
                          <motion.p 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed border-t border-neutral-900/50 pt-2"
                          >
                            {flowStep.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ADDED COMPARISON: "TRADITIONAL INTEGRATION VS. CASCADES ORCHESTRATOR" */}
          <div className="space-y-6 pt-6 border-t border-neutral-900/80">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block mb-1">
                VALUE COMPARISON
              </span>
              <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                Traditional Integrations vs. Cascades Orchestrator
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Understand how Cascades differentiates its orchestration core from custom scripts, cron systems, or raw API connectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TRADITIONAL SOLUTIONS */}
              <div className="bg-neutral-950/40 border border-neutral-900/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                  <X className="w-4 h-4 text-red-500" />
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-400">
                    Traditional Integrations
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {[
                    { title: 'Custom Cron / Shell Scripts', desc: 'Brittle scripts with zero visualization dashboard panels.' },
                    { title: 'No Retry Recovery', desc: 'Failed API calls crash or silent dump, missing dead-letter queues.' },
                    { title: 'Point-to-Point Piping', desc: 'No central state machine or DAG logic for parallel routes.' },
                    { title: 'Direct API Exposure', desc: 'Accepts requests directly at downstream with poor rate bounds.' }
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

              {/* CASCADES SYSTEM */}
              <div className="bg-neutral-950/80 border border-cyan-950/50 rounded-xl p-5 space-y-4 shadow-[0_0_15px_rgba(34,211,238,0.05)]">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                  <Check className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-cyan-400">
                    Cascades Orchestrator
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {[
                    { title: 'Durable DAG Engine', desc: 'Maps exact multi-branch dependencies and parallel workers safely.' },
                    { title: 'Resilient DLQ & Retries', desc: 'Robust retry policies, checkpoints, and manual error recovery.' },
                    { title: 'Unified Event Control', desc: 'Webhook callbacks, timers, and telemetry correlations on-the-fly.' },
                    { title: 'APISIX Protected Ingress', desc: 'Zero-trust gateways managing ingress policies and rate caps.' }
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-xs">
                      <span className="font-mono text-[9px] text-cyan-500/70 mt-0.5">0{idx + 1}</span>
                      <div>
                        <strong className="text-cyan-400 font-bold block">{item.title}</strong>
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
