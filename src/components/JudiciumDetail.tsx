import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowDown, 
  Scale, 
  Search, 
  ShieldAlert, 
  Database, 
  Cpu, 
  Layers, 
  Network, 
  FileText, 
  Users, 
  CheckCircle2, 
  Activity, 
  Globe, 
  Clock, 
  Lock, 
  Share2, 
  Eye, 
  FolderPlus, 
  Briefcase, 
  Compass, 
  FileSpreadsheet, 
  HelpCircle,
  Laptop,
  Check,
  X,
  Terminal,
  Shield
} from 'lucide-react';

interface JudiciumDetailProps {
  onBack: () => void;
}

export default function JudiciumDetail({ onBack }: JudiciumDetailProps) {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [hoveredLayer, setHoveredLayer] = useState<string | null>(null);
  const [activeLifecycleTab, setActiveLifecycleTab] = useState<'intelligence' | 'evidence' | 'different'>('intelligence');

  // Architecture Layers - Renamed and intelligence-focused
  const layers = [
    {
      id: 'workspace',
      name: 'Analyst Workspace',
      sub: 'User Interface & Collaborative Case Command',
      items: ['Analyst Workspace', 'Investigations', 'Evidence', 'Search', 'Reports', 'AI Assistant'],
      color: 'from-cyan-500/20 to-blue-500/10',
      borderColor: 'border-cyan-500/30',
      glowColor: 'shadow-cyan-500/10',
      icon: Laptop,
      details: 'A high-density investigation workbench. Built with collaborative case boards, instant visualizers, timeline mapping engines, and an omnipresent AI Assistant designed for deep investigative intelligence.'
    },
    {
      id: 'platform',
      name: 'Platform Services',
      sub: 'Enterprise Integration & Secure Collaboration Gates',
      items: ['Authentication', 'Collaboration', 'Notifications', 'Automation', 'Integrations'],
      color: 'from-purple-500/10 to-indigo-500/10',
      borderColor: 'border-purple-500/20',
      glowColor: 'shadow-purple-500/5',
      icon: Cpu,
      details: 'Core business orchestration layers. Protects investigations with fine-grained SAML SSO authentication, facilitates real-time team collaboration, automates alerts, and integrates seamlessly with external webhooks.'
    },
    {
      id: 'engine',
      name: 'Investigation Engine',
      sub: 'Entity Resolution & Relational Reasoning Controllers',
      items: ['Case Management', 'Evidence Management', 'Entity Resolution', 'Relationship Analysis', 'AI Assistance'],
      color: 'from-[#ff7a1a]/10 to-red-500/5',
      borderColor: 'border-[#ff7a1a]/30',
      glowColor: 'shadow-orange-500/5',
      icon: Layers,
      details: 'The central logic orchestrator of Judicium. Resolves entities across multiple data structures, manages case life cycles, and calculates relation weight vectors to discover hidden clusters.'
    },
    {
      id: 'intelligence',
      name: 'Evidence & Intelligence',
      sub: 'Cryptographic Verification & Forensic Correlation Hub',
      items: ['Correlation', 'Pattern Detection', 'Timeline Analysis', 'Relationship Discovery', 'Risk Scoring', 'Intelligence Search', 'AI Recommendations'],
      color: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-500/20',
      glowColor: 'shadow-emerald-500/5',
      icon: Network,
      details: 'Heuristic modeling layers that process leads asynchronously. Performs pattern correlation, builds cross-case timelines, flags risks, and generates automated intelligence briefs.'
    },
    {
      id: 'repository',
      name: 'Evidence Repository',
      sub: 'Secure, Encrypted & Verifiable Data Archival',
      items: ['PostgreSQL', 'Event Bus', 'Files', 'Cache'],
      color: 'from-blue-500/10 to-cyan-500/5',
      borderColor: 'border-blue-500/20',
      glowColor: 'shadow-blue-500/5',
      icon: Database,
      details: 'Secure evidence database. Features strict hash checks on file write, relational state compliance using PostgreSQL, real-time message bus buffers, and local in-memory caching tiers.'
    },
    {
      id: 'sources',
      name: 'Public Intelligence Sources',
      sub: 'Global Registries, Feeds & Public Record Collectors',
      items: ['Corporate Records', 'Government Records', 'News', 'Social Media', 'Sanctions', 'Technical Intelligence', 'Documents', 'Custom Sources'],
      color: 'from-pink-500/10 to-rose-500/5',
      borderColor: 'border-pink-500/25',
      glowColor: 'shadow-pink-500/5',
      icon: Globe,
      details: 'Pre-configured external ingestion connectors. Monitors company registries, news feeds, sanctions listings, social footprints, and custom API integrations with automated rotation policies.'
    }
  ];

  // Primary 8-Step Intelligence Journey (Updated per user feedback)
  const workflowSteps = [
    {
      step: 1,
      title: 'Create Investigation',
      short: 'Create Investigation',
      icon: FolderPlus,
      desc: 'Every investigation begins with a case. Define the objective, assign investigators, establish priorities, and organize work from a single workspace.',
      details: 'Judicium structures cases as secure envelopes. It automatically spins up zero-trust access permissions, generates audit logs for custody assurance, and alerts assigned teams instantly.'
    },
    {
      step: 2,
      title: 'Define Objectives',
      short: 'Define Objectives',
      icon: ShieldAlert,
      desc: 'Identify the questions that need answers before collection begins. A focused investigation produces better intelligence than collecting everything.',
      details: 'Avoid data drowning. Researchers configure target parameters, keywords, entities, and strict data-retention schedules to construct a highly targeted search plan.'
    },
    {
      step: 3,
      title: 'Collect Intelligence',
      short: 'Collect Intelligence',
      icon: Search,
      desc: 'Search corporate records, government data, sanctions lists, news, social media, technical infrastructure, public documents, and other intelligence sources from one interface.',
      details: 'Executes parallel distributed lookups across global databases, including corporate registries, dark web forums, WHOIS records, IP block lists, and court records without leaving the page.'
    },
    {
      step: 4,
      title: 'Capture Evidence',
      short: 'Capture Evidence',
      icon: Lock,
      desc: 'Capture relevant information while preserving its source, timestamps, and supporting metadata so every finding remains traceable.',
      details: 'Judicium\'s secure capture ensures absolute preservation. Every item saved is hash-verified immediately. Timestamps are linked with verifiable cryptographic proof chains to ensure court admissibility and custody audit compliance.'
    },
    {
      step: 5,
      title: 'Discover Relationships',
      short: 'Discover Relationships',
      icon: Network,
      desc: 'Reveal connections that are difficult to identify manually by visualizing relationships between entities, events, evidence, and investigations.',
      details: 'Entity resolution models run on saved texts, automatically parsing and categorizing entities, detecting duplicates, and populating investigation record relation graphs.'
    },
    {
      step: 6,
      title: 'Analyze Findings',
      short: 'Analyze Findings',
      icon: Activity,
      desc: 'Review the evidence, identify patterns, validate assumptions, assess confidence, and transform information into actionable intelligence.',
      details: 'Investigators compile analysis sheets, rate information reliability, challenge assumptions using built-in matrices, and generate confidence assessments based on the weight of the proof.'
    },
    {
      step: 7,
      title: 'Generate Report',
      short: 'Generate Report',
      icon: FileText,
      desc: 'Produce structured intelligence reports complete with executive summaries, key findings, supporting evidence, confidence assessments, timelines, and recommendations.',
      details: 'Exports highly polished reports with custom branding. Automatically aggregates files, entity tables, network diagrams, and timestamps into legal-ready forensic briefs.'
    },
    {
      step: 8,
      title: 'Share & Archive',
      short: 'Share & Archive',
      icon: Share2,
      desc: 'Publish investigations, securely archive evidence, maintain a complete audit trail, and continue monitoring subjects as new intelligence becomes available.',
      details: 'Archives data in offline long-term vaults while establishing continuous telemetry alerts. Receives push messages if new public registry updates emerge regarding previously mapped entities.'
    }
  ];

  // System lifecycles (tweak intelligence lifecycle & evidence lifecycle)
  const lifecycles = {
    intelligence: {
      title: 'Intelligence Lifecycle',
      subtitle: 'Converting raw feeds into high-level business logic & directives (with Verification)',
      steps: ['Public Information', 'Collection', 'Evidence', 'Verification', 'Analysis', 'Intelligence', 'Decision'],
      color: '#22d3ee'
    },
    evidence: {
      title: 'Evidence Lifecycle',
      subtitle: 'Rigorous chain of custody tracking and digital preservation',
      steps: ['Source', 'Evidence', 'Verification', 'Relationships', 'Timeline', 'Report', 'Archive'],
      color: '#ff7a1a'
    },
    different: {
      title: 'What Makes Judicium Different',
      subtitle: 'Most platforms help you search. Judicium helps you investigate.',
      steps: ['Search', 'Evidence', 'Relationships', 'Intelligence', 'Decisions'],
      color: '#ffffff'
    }
  };

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
              <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase">
                ENTERPRISE DIVISION
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3xl tracking-tight text-white uppercase mt-0.5">
              JUDICIUM PLATFORM
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

      {/* TWO COLUMN VIEW: ARCHITECTURE ON LEFT, WORKFLOWS & VALUE STORY ON RIGHT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-start">
        
        {/* LEFT COLUMN: INTERACTIVE ARCHITECTURE STACK */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block mb-1">
              SYSTEM INFRASTRUCTURE
            </span>
            <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase tracking-tight">
              Operational Architecture
            </h2>
            <p className="text-xs text-neutral-400 font-sans mt-2 leading-relaxed">
              An interactive blueprint showing data flow and integration pipelines. Hover over any layer of the stack to explore system capabilities.
            </p>
          </div>

          {/* Interactive Stack Visual */}
          <div className="relative border border-neutral-900/60 bg-neutral-950/20 rounded-2xl p-6 md:p-8 space-y-4 shadow-2xl overflow-hidden">
            {/* Ambient Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none opacity-40" />

            {/* STACK LAYERS */}
            <div className="space-y-4 relative z-10">
              {layers.map((layer, index) => {
                const isHovered = hoveredLayer === layer.id;
                const LayerIcon = layer.icon;

                return (
                  <div key={layer.id} className="flex flex-col items-center">
                    {/* The Layer Box */}
                    <div 
                      onMouseEnter={() => setHoveredLayer(layer.id)}
                      onMouseLeave={() => setHoveredLayer(null)}
                      className={`w-full bg-black border ${layer.borderColor} rounded-xl p-4 transition-all duration-300 cursor-help relative group bg-gradient-to-r ${layer.color} ${isHovered ? `shadow-md shadow-neutral-950 scale-[1.01]` : ''}`}
                    >
                      {/* Top outline indicator */}
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
                              LAYER {layers.length - index}
                            </span>
                          </div>
                          <p className="text-[10px] text-neutral-400 font-sans truncate mt-0.5">
                            {layer.sub}
                          </p>

                          {/* Horizontal pills */}
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

                      {/* Detail overlay on Hover */}
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

                    {/* Connecting Arrow between layers (not the last) */}
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
        </div>

        {/* RIGHT COLUMN: BRAND & MARKETING PATHWAY */}
        <div className="lg:col-span-7 space-y-12">
          
          {/* Main Question Accent Block */}
          <div className="border-l-2 border-[#ff7a1a] pl-5 space-y-2">
            <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block">
              Core Value Narrative
            </span>
            <h3 className="font-display font-extrabold text-xl md:text-2xl text-white leading-tight uppercase">
              How does an investigation move through Judicium?
            </h3>
            <p className="text-sm text-neutral-400 leading-relaxed font-sans max-w-xl">
              Rather than overwhelming teams with unsorted noise, Judicium transforms raw public data feeds into secure, validated, and highly defensible intelligence reports. Here is how cases progress through our secure engine.
            </p>
          </div>

          {/* PRIMARY WORKFLOW STEP SLIDER & TIMELINE */}
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
              <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-200">
                Primary Intelligence Workflow
              </h4>
              <span className="text-[9px] font-mono text-neutral-500">
                8-STEP COMPLETE PATHWAY
              </span>
            </div>

            {/* Step Selection Bar */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-neutral-900 scrollbar-track-transparent">
              {workflowSteps.map((step, idx) => {
                const isActive = activeStep === idx;

                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(idx)}
                    className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-mono font-bold tracking-wide transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-neutral-950 border-[#ff7a1a] text-white shadow-[0_0_12px_rgba(255,122,26,0.15)]' 
                        : 'bg-black border-neutral-900 text-neutral-500 hover:text-neutral-300 hover:border-neutral-800'
                    }`}
                  >
                    <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${isActive ? 'bg-[#ff7a1a] text-black' : 'bg-neutral-900 text-neutral-500'}`}>
                      {step.step}
                    </span>
                    <span className="truncate max-w-[150px]">{step.short}</span>
                  </button>
                );
              })}
            </div>

            {/* Active Step Panel */}
            <div className="bg-neutral-950/60 border border-neutral-900 rounded-xl p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-between">
              {/* Background Step Glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#ff7a1a]/5 rounded-bl-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between border-b border-neutral-900/60 pb-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-neutral-900 border border-neutral-800 text-[#ff7a1a]">
                      {React.createElement(workflowSteps[activeStep].icon, { className: 'w-4 h-4' })}
                    </div>
                    <div>
                      <span className="text-[8px] font-mono text-neutral-500 uppercase tracking-widest font-bold">
                        STEP {workflowSteps[activeStep].step} OF {workflowSteps.length}
                      </span>
                      <h4 className="font-display font-extrabold text-sm sm:text-base text-white uppercase tracking-wide">
                        {workflowSteps[activeStep].title}
                      </h4>
                    </div>
                  </div>

                  <span className="text-[9px] font-mono text-neutral-500 font-bold bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800/80">
                    PHASE {Math.floor(activeStep / 3) + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans font-medium">
                  {workflowSteps[activeStep].desc}
                </p>

                <p className="text-xs text-neutral-400 leading-relaxed font-sans mt-3 border-t border-neutral-900/40 pt-3">
                  {workflowSteps[activeStep].details}
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500 mt-5 pt-3 border-t border-neutral-900/30">
                <span className="uppercase">Click the steps above to cycle through the flow</span>
                <span className="text-[#ff7a1a] font-bold">VERIFIED INTEGRITY SECURED</span>
              </div>
            </div>
          </div>

          {/* SYSTEM LIFECYCLES (SIDE-BY-SIDE TAB EXPLORER) */}
          <div className="space-y-6 pt-6 border-t border-neutral-900/80">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block mb-1">
                OPERATIONAL REPLICATORS
              </span>
              <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                Ingestion & Evidence Lifecycle Stages
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                Compare how information, digital proof, and decisions circulate through the core components of Judicium.
              </p>
            </div>

            {/* Lifecycle Tabs */}
            <div className="grid grid-cols-3 gap-2 p-1 bg-black border border-neutral-900 rounded-lg">
              <button
                onClick={() => setActiveLifecycleTab('intelligence')}
                className={`py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                  activeLifecycleTab === 'intelligence' 
                    ? 'bg-neutral-950 text-cyan-400 border border-neutral-900' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Intelligence
              </button>
              <button
                onClick={() => setActiveLifecycleTab('evidence')}
                className={`py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                  activeLifecycleTab === 'evidence' 
                    ? 'bg-neutral-950 text-[#ff7a1a] border border-neutral-900' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Evidence Chain
              </button>
              <button
                onClick={() => setActiveLifecycleTab('different')}
                className={`py-2 text-[10px] font-mono font-bold tracking-wider uppercase rounded-md transition-all cursor-pointer ${
                  activeLifecycleTab === 'different' 
                    ? 'bg-neutral-950 text-white border border-neutral-900' 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Why Judicium?
              </button>
            </div>

            {/* Active Lifecycle Display */}
            <div className="bg-neutral-950 p-6 rounded-xl border border-neutral-900/60">
              <h4 className="text-xs font-mono font-bold tracking-wider uppercase mb-1" style={{ color: lifecycles[activeLifecycleTab].color }}>
                {lifecycles[activeLifecycleTab].title}
              </h4>
              <p className="text-[11px] text-neutral-400 font-sans mb-6">
                {lifecycles[activeLifecycleTab].subtitle}
              </p>

              {/* Step Flow List */}
              <div className="flex flex-col md:flex-row md:items-center flex-wrap gap-2 md:gap-1.5 justify-start">
                {lifecycles[activeLifecycleTab].steps.map((step, idx) => (
                  <React.Fragment key={idx}>
                    <div 
                      className="px-3 py-2 rounded border border-neutral-900/80 bg-black/60 flex items-center gap-2 relative group hover:border-neutral-800 transition-colors"
                    >
                      <span className="text-[9px] font-mono text-neutral-500">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-display font-bold text-neutral-200 uppercase tracking-wide">
                        {step}
                      </span>
                    </div>

                    {/* Connecting text indicator between elements */}
                    {idx < lifecycles[activeLifecycleTab].steps.length - 1 && (
                      <span className="hidden md:inline-block text-neutral-700 text-xs font-bold px-1 select-none">
                        →
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>

          {/* ADDED COMPARISON: "WHAT MAKES JUDICIUM DIFFERENT" */}
          <div className="space-y-6 pt-6 border-t border-neutral-900/80">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase block mb-1">
                VALUE PROPOSITION
              </span>
              <h3 className="font-display font-extrabold text-sm md:text-base text-white uppercase tracking-tight">
                Traditional OSINT vs. Judicium
              </h3>
              <p className="text-xs text-neutral-400 font-sans mt-1">
                See why leading analysts select Judicium to evolve simple, disconnected search queries into highly defensible decisions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* TRADITIONAL OSINT PANELS */}
              <div className="bg-neutral-950/40 border border-neutral-900/80 rounded-xl p-5 space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                  <X className="w-4 h-4 text-red-500" />
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-neutral-400">
                    Traditional OSINT
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {[
                    { title: 'Search', desc: 'Siloed, repetitive search inputs over multiple tabs' },
                    { title: 'Bookmark', desc: 'Manual browser bookmarks subject to dynamic rot' },
                    { title: 'Screenshot', desc: 'Simple pixel grab without verifiable hash bounds' },
                    { title: 'Write Report', desc: 'Manual typing and formatting, highly error-prone' },
                    { title: 'Done', desc: 'Static deliverable with zero subsequent updates' }
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

              {/* JUDICIUM PANELS */}
              <div className="bg-neutral-950/80 border border-emerald-950/50 rounded-xl p-5 space-y-4 shadow-[0_0_15px_rgba(16,185,129,0.05)]">
                <div className="flex items-center gap-2 pb-2 border-b border-neutral-900">
                  <Check className="w-4 h-4 text-emerald-400" />
                  <h4 className="font-display font-bold text-xs tracking-wider uppercase text-emerald-400">
                    Judicium Platform
                  </h4>
                </div>

                <ul className="space-y-2.5">
                  {[
                    { title: 'Search', desc: 'Omnichannel simultaneous queries in one workspace' },
                    { title: 'Evidence', desc: 'Defensible records tagged with complete provenance' },
                    { title: 'Verification', desc: 'Cryptographically locked and hash-signed blocks' },
                    { title: 'Relationships', desc: 'Automated entity resolution and graph linking' },
                    { title: 'Timeline', desc: 'Temporal analysis with dynamic cross-case syncing' },
                    { title: 'AI Assistance', desc: 'Intelligent prompt tracing and automated suggestions' },
                    { title: 'Report', desc: 'Automated case compilations and appendix briefs' },
                    { title: 'Audit Trail', desc: 'Verifiable history of investigator activities' },
                    { title: 'Continuous Monitoring', desc: 'Asynchronous updates and registry tracking' }
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


// Custom simple icon representing Laptop/Browser
function LaptopIcon(props: any) {
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
      <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
      <line x1="2" x2="22" y1="20" y2="20" />
      <line x1="5" x2="19" y1="16" y2="16" />
    </svg>
  );
}
