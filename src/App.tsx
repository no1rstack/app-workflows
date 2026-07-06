import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Hexagon, Menu, X, Terminal, Shield, Play, Settings2, HelpCircle } from 'lucide-react';

import Background from './components/Background';
import ControlPlane from './components/ControlPlane';
import ApplicationCard from './components/ApplicationCard';
import ConnectionLayer from './components/ConnectionLayer';
import DataSources from './components/DataSources';
import Outputs from './components/Outputs';
import SharedServices from './components/SharedServices';
import Tooltip from './components/Tooltip';
import EcosystemStories from './components/EcosystemStories';
import EventBusSimulator from './components/EventBusSimulator';
import DeveloperSuite from './components/DeveloperSuite';
import DeploymentHub from './components/DeploymentHub';
import JudiciumDetail from './components/JudiciumDetail';
import CascadesDetail from './components/CascadesDetail';
import AiTracerDetail from './components/AiTracerDetail';

import { AppCardData } from './types';
import { fadeIn, fadeInUp, staggerContainer } from './animations';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'judicium' | 'cascades' | 'aitracer'>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'pipeline' | 'eventbus'>('pipeline');
  const [activeStep, setActiveStep] = useState<number>(1);
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);
  
  // Tooltip State
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipContent, setTooltipContent] = useState<any | null>(null);

  const diagramContainerRef = useRef<HTMLDivElement | null>(null);

  // Cycle active steps in pipeline mode to show a live moving data flow story!
  useEffect(() => {
    if (viewMode !== 'pipeline') return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev % 7) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [viewMode]);

  const appCards: AppCardData[] = [
    {
      id: 'cascades',
      name: 'Cascades',
      subtitle: 'Workflow Orchestration',
      description: 'Collection pipelines, automated workflow dispatch, SLA task scheduling.',
      url: 'cascades.noirstack.com',
      color: '#22d3ee', // Cyan
      glowColor: 'rgba(34, 211, 238, 0.15)',
      borderColor: 'border-cyan-500/20',
      textColor: 'text-cyan-400',
      iconName: 'GitBranch',
      stepNumber: 1,
      purpose: 'Collect, schedule, and distribute high-volume events & files.',
      consumes: ['Raw Feeds', 'APIs', 'Schedules'],
      produces: ['Structured Data', 'Workflow Signals', 'Webhooks'],
      capabilities: ['Workflows', 'Schedules', 'Webhooks', 'Pipelines', 'API Ingestion'],
      emits: ['Workflow.Started', 'Webhook.Dispatched', 'SLA.Exceeded'],
      servicesUsed: ['Scheduler', 'Email Outbox', 'Task Queue', 'Shared Storage'],
    },
    {
      id: 'judicium',
      name: 'Judicium',
      subtitle: 'Investigation & OSINT',
      description: 'Evidence ledger resolution, relational entity mapping, and automated PDF forensics.',
      url: 'judicium.noirstack.com',
      color: '#e5e5e5', // Light grey
      glowColor: 'rgba(229, 229, 229, 0.1)',
      borderColor: 'border-neutral-700/20',
      textColor: 'text-neutral-300',
      iconName: 'Scale',
      stepNumber: 2,
      purpose: 'Investigate complex digital threats, trace entities, and aggregate evidence.',
      consumes: ['Structured Data', 'Cases', 'PDF Files'],
      produces: ['Resolved Entities', 'Linked Relationships', 'Forensic Data'],
      capabilities: ['Cases', 'Evidence Nodes', 'Entity Resolution', 'Timelines', 'Audit Proofs'],
      emits: ['Investigation.Completed', 'Evidence.Linked', 'Entity.Created'],
      servicesUsed: ['Shared Search', 'OCR Parser', 'Translation Eng', 'Vector Database'],
    },
    {
      id: 'wordmaker',
      name: 'WordMaker',
      subtitle: 'Automated Reporting',
      description: 'Generative case brief compilations, secure appendix assembly, editorial templates.',
      url: 'wordmaker.noirstack.com',
      color: '#a3a3a3', // Neutral Grey
      glowColor: 'rgba(163, 163, 163, 0.1)',
      borderColor: 'border-neutral-800/30',
      textColor: 'text-neutral-400',
      iconName: 'FileText',
      stepNumber: 3,
      purpose: 'Compile and draft detailed investigation reports & forensic briefs.',
      consumes: ['Resolved Entities', 'Forensic Data', 'Audit Logs'],
      produces: ['Case Brief Documents', 'Compiled PDF Briefs', 'Drafts'],
      capabilities: ['Templates', 'Appendix Builder', 'Collaborations', 'Drafting', 'PDF Compiler'],
      emits: ['Document.Generated', 'Brief.Compiled'],
      servicesUsed: ['AI Providers', 'OCR Parser', 'Shared Search', 'Shared Storage'],
    },
    {
      id: 'hexarch',
      name: 'Hexarch',
      subtitle: 'Cryptographic Proofs',
      description: 'ECDSA signature verification, immutable blockchain anchoring, evidence locking.',
      url: 'hexarch.noirstack.com',
      color: '#a855f7', // Purple (Security / Auth concept)
      glowColor: 'rgba(168, 85, 247, 0.2)',
      borderColor: 'border-purple-500/20',
      textColor: 'text-purple-400',
      iconName: 'Hexagon',
      stepNumber: 4,
      purpose: 'Anchor reports and logs on immutable distributed chains to prove digital chain of custody.',
      consumes: ['Case Brief Documents', 'Briefs', 'System Logs'],
      produces: ['ECDSA Signatures', 'Custody Proofs', 'Audit Ledgers'],
      capabilities: ['Digital Signatures', 'Immutable Proofs', 'Verification', 'Ledger Anchoring', 'Custody Auditing'],
      emits: ['Proof.Created', 'Custody.Signed'],
      servicesUsed: ['Secrets Engine', 'Immutable Audit', 'Shared Storage'],
    },
    {
      id: 'aitracer',
      name: 'AiTracer',
      subtitle: 'AI Telemetry Observability',
      description: 'Secure trace tracking, prompt injection monitoring, model compliance logging.',
      url: 'aitracer.noirstack.com',
      color: '#22d3ee', // Cyan
      glowColor: 'rgba(34, 211, 238, 0.15)',
      borderColor: 'border-cyan-500/20',
      textColor: 'text-cyan-400',
      iconName: 'BrainCircuit',
      stepNumber: 5,
      purpose: 'Monitor generative AI operations, trace token loads, and enforce compliance guardrails.',
      consumes: ['LLM Prompts', 'Signatures', 'Model Metrics'],
      produces: ['Telemetry Traces', 'Injection Alarms', 'Compliance Audits'],
      capabilities: ['Prompt Tracing', 'Guardrail Blocks', 'Cost Watchdog', 'Anomaly Alarms', 'Audit Exports'],
      emits: ['Trace.Logged', 'Injection.Blocked'],
      servicesUsed: ['Shared Vector DB', 'AI Providers', 'Webhook Relays'],
    },
    {
      id: 'ledgerbill',
      name: 'Ledgerbill',
      subtitle: 'Billing & Usage Metering',
      description: 'High-throughput resource usage metering, subscription ledgering, Stripe API gateways.',
      url: 'ledgerbill.noirstack.com',
      color: '#ff7a1a', // Orange (#ff7a1a)
      glowColor: 'rgba(255, 122, 26, 0.15)',
      borderColor: 'border-orange-500/20',
      textColor: 'text-[#ff7a1a]',
      iconName: 'DollarSign',
      stepNumber: 6,
      purpose: 'Meter and ledger platform resource consumption for corporate subscription billing.',
      consumes: ['Telemetry Traces', 'API Access logs', 'Usage Metrics'],
      produces: ['Billing Ledgers', 'Corporate Invoices', 'Utilization Metrics'],
      capabilities: ['Metering', 'Stripe Bridges', 'Invoicing', 'Tax Computation', 'Resource Ledgers'],
      emits: ['Invoice.Paid', 'Meter.Logged'],
      servicesUsed: ['Scheduler', 'Email Outbox', 'Secrets Engine'],
    },
    {
      id: 'noirai',
      name: 'NoirAi',
      subtitle: 'Operational AI Intelligence',
      description: 'SLA throughput analytics, cluster container health, automated healing alerts.',
      url: 'noirai.noirstack.com',
      color: '#22d3ee', // Cyan
      glowColor: 'rgba(34, 211, 238, 0.15)',
      borderColor: 'border-cyan-500/20',
      textColor: 'text-cyan-400',
      iconName: 'Activity',
      stepNumber: 7,
      purpose: 'Oversee and optimize entire platform cluster performance, latency, and throughput health.',
      consumes: ['Telemetry Traces', 'Billing Ledgers', 'Kube Metrics'],
      produces: ['SLA Watchdogs', 'Dashboards', 'Heuristic Alarms'],
      capabilities: ['SLA Compliance', 'Kube Pod Stats', 'Dynamic Healing', 'Throughput logs', 'Alarm Routing'],
      emits: ['SLA.Verified', 'Cluster.Healed'],
      servicesUsed: ['Shared Vector DB', 'Observability', 'Task Queue'],
    }
  ];

  const handleMouseMove = (e: React.MouseEvent, id: string) => {
    const card = document.getElementById(`card-${id}`);
    if (card) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    }

    setTooltipPos({ x: e.clientX, y: e.clientY });
  };

  const handleHoverCardStart = (card: AppCardData) => {
    setHoveredCardId(card.id);
    setTooltipContent({
      title: card.name,
      status: activeStep === card.stepNumber && viewMode === 'pipeline' ? 'Active Ingest' : 'Operational',
      metrics: [
        'PURPOSE: ' + card.purpose.slice(0, 30) + '...',
        'TLS PROTOCOL: v1.3 encrypted',
        `ENDPOINT: ${card.url}`,
      ],
      details: card.description,
    });
    setTooltipVisible(true);
  };

  const handleHoverCardEnd = () => {
    setHoveredCardId(null);
    setTooltipVisible(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-purple-500/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* Absolute Background Systems (Particles, Tech grid, glows) */}
      <Background />

      {/* Global Interactive Custom Tooltip */}
      <Tooltip 
        visible={tooltipVisible} 
        x={tooltipPos.x} 
        y={tooltipPos.y} 
        content={tooltipContent} 
      />

      {/* --- HEADER --- */}
      <header className="sticky top-0 z-45 w-full border-b border-neutral-900/40 bg-black/75 backdrop-blur-md transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => {
              setCurrentPage('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <Hexagon className="w-9 h-9 text-purple-500 fill-purple-500/10 transition-colors duration-500 group-hover:text-cyan-400 group-hover:fill-cyan-400/10" strokeWidth={1.5} />
              <span className="absolute inset-0 flex items-center justify-center font-display font-black text-xs text-white">N</span>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-sm tracking-widest text-white transition-all duration-300 group-hover:text-purple-400">
                NOIR STACK
              </span>
              <span className="text-[8px] font-mono tracking-widest text-neutral-500 uppercase -mt-0.5">
                Cyber Ecosystem
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {['Platform', 'Operational Ecosystem', 'Control Plane', 'Shared Services', 'Solutions'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="relative text-[11px] font-bold text-neutral-400 hover:text-white tracking-wider uppercase transition-colors duration-200 group py-1"
              >
                {link}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-purple-500 transition-all duration-300 group-hover:w-full" />
                {link === 'Operational Ecosystem' && (
                  <span className="absolute -top-1.5 -right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                )}
              </a>
            ))}
          </nav>

          {/* Request Access Button */}
          <div className="hidden md:flex items-center gap-4">
            <motion.button 
              id="header-cta-btn"
              className="relative px-5 py-2 rounded-lg border border-neutral-800 bg-neutral-950 text-xs font-display font-bold tracking-widest uppercase overflow-hidden group cursor-pointer transition-all duration-300 hover:border-cyan-500/50 hover:bg-neutral-900"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10 text-neutral-200 group-hover:text-cyan-400 transition-colors duration-200">
                Request Access
              </span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-neutral-400 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            className="md:hidden border-b border-neutral-900 bg-black/95 px-4 pt-2 pb-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {['Platform', 'Operational Ecosystem', 'Control Plane', 'Shared Services', 'Solutions'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                className="block px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="w-full mt-4 px-4 py-2.5 rounded-lg border border-neutral-800 bg-neutral-950 hover:border-cyan-500/50 hover:text-cyan-400 font-display font-bold text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer">
              Request Access
            </button>
          </motion.div>
        )}
      </header>

      {/* --- MAIN BODY --- */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
        {currentPage === 'judicium' ? (
          <JudiciumDetail onBack={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : currentPage === 'cascades' ? (
          <CascadesDetail onBack={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : currentPage === 'aitracer' ? (
          <AiTracerDetail onBack={() => {
            setCurrentPage('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }} />
        ) : (
          <div className="space-y-24 md:space-y-32">
            {/* Intro subtitle bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase font-bold">
                  UNIFIED SECURE RUNTIME PIPELINE
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span>INTEGRATED WORKFLOW MODEL</span>
              </div>
            </div>

            {/* Header Text & Mode Interactive Selector */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
              <motion.div 
                initial="hidden"
                animate="visible"
                variants={staggerContainer(0.1)}
                className="space-y-4"
              >
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase block">
                  OPERATIONAL ECOSYSTEM
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.1]">
                  Secure Data.<br />
                  <span className="text-cyan-400">Operational</span> <span className="text-[#ff7a1a]">Intelligence</span>.
                </h1>
                <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-2xl font-sans">
                  Distributed infrastructure for state machine execution, immutable ledger compliance, cryptographic forensics, and unified network event streams.
                </p>
              </motion.div>

              {/* Interactive Mode Toggle Selector */}
              <div className="bg-neutral-950 p-1 rounded-lg border border-neutral-900 flex items-center gap-2 max-w-sm">
                <button
                  onClick={() => setViewMode('pipeline')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono tracking-wider font-bold uppercase transition-all cursor-pointer ${
                    viewMode === 'pipeline' 
                      ? 'bg-cyan-950/20 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                      : 'text-neutral-500 border border-transparent hover:text-neutral-300'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Pipeline Flow
                </button>
                <button
                  onClick={() => setViewMode('eventbus')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-mono tracking-wider font-bold uppercase transition-all cursor-pointer ${
                    viewMode === 'eventbus' 
                      ? 'bg-cyan-950/20 text-cyan-400 border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.1)]' 
                      : 'text-neutral-500 border border-transparent hover:text-neutral-300'
                  }`}
                >
                  <Settings2 className="w-3.5 h-3.5" />
                  Event Bus OS
                </button>
              </div>
            </div>


            {/* ================= MAIN INTERACTIVE OVERVIEW ================= */}
            <section id="operational-ecosystem" className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              
              {/* 1. LEFT SIDEBAR: INGESTION DATA SOURCES */}
              <div className="lg:col-span-3 flex flex-col justify-between">
                <DataSources />
              </div>

              {/* 2. CENTER STAGE: RE-ENGINEERED OPERATIONAL FLOW DIAGRAM */}
              <div 
                ref={diagramContainerRef}
                id="diagram-container"
                className="lg:col-span-6 relative rounded-2xl border border-neutral-900 bg-neutral-950/20 p-6 md:p-8 overflow-hidden flex flex-col justify-between min-h-[920px]"
              >
                {/* Dynamic Connecting Lines Layer */}
                <ConnectionLayer
                  hoveredCardId={hoveredCardId}
                  hoveredServiceId={null}
                  containerRef={diagramContainerRef}
                  viewMode={viewMode}
                />

                {/* In pipeline mode, show floating active tracer telemetry */}
                {viewMode === 'pipeline' && (
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-cyan-950/10 border border-cyan-500/20 px-3 py-1.5 rounded-md backdrop-blur-sm pointer-events-none">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-[9px] font-mono font-bold tracking-wider text-cyan-400">
                      FLOW STATE: CYCLE STEP {activeStep} ACTIVE
                    </span>
                  </div>
                )}

                {/* Applications Grid: Sequential Layout matching the story */}
                <div className="space-y-8 relative z-10">
                  
                  {/* Cascade/Judicium Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ApplicationCard
                      card={appCards[0]}
                      isHovered={hoveredCardId === 'cascades'}
                      onHoverStart={() => handleHoverCardStart(appCards[0])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'cascades')}
                      isActiveStep={activeStep === 1 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                      onClick={() => {
                        handleHoverCardEnd();
                        setCurrentPage('cascades');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                    <ApplicationCard
                      card={appCards[1]}
                      isHovered={hoveredCardId === 'judicium'}
                      onHoverStart={() => handleHoverCardStart(appCards[1])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'judicium')}
                      isActiveStep={activeStep === 2 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                      onClick={() => {
                        handleHoverCardEnd();
                        setCurrentPage('judicium');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>

                  {/* WordMaker/Hexarch Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ApplicationCard
                      card={appCards[2]}
                      isHovered={hoveredCardId === 'wordmaker'}
                      onHoverStart={() => handleHoverCardStart(appCards[2])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'wordmaker')}
                      isActiveStep={activeStep === 3 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                    />
                    <ApplicationCard
                      card={appCards[3]}
                      isHovered={hoveredCardId === 'hexarch'}
                      onHoverStart={() => handleHoverCardStart(appCards[3])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'hexarch')}
                      isActiveStep={activeStep === 4 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                    />
                  </div>

                  {/* AiTracer / Ledgerbill Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <ApplicationCard
                      card={appCards[4]}
                      isHovered={hoveredCardId === 'aitracer'}
                      onHoverStart={() => handleHoverCardStart(appCards[4])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'aitracer')}
                      isActiveStep={activeStep === 5 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                      onClick={() => {
                        handleHoverCardEnd();
                        setCurrentPage('aitracer');
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                    <ApplicationCard
                      card={appCards[5]}
                      isHovered={hoveredCardId === 'ledgerbill'}
                      onHoverStart={() => handleHoverCardStart(appCards[5])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'ledgerbill')}
                      isActiveStep={activeStep === 6 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                    />
                  </div>

                  {/* Final Step: NoirAI */}
                  <div className="max-w-md mx-auto">
                    <ApplicationCard
                      card={appCards[6]}
                      isHovered={hoveredCardId === 'noirai'}
                      onHoverStart={() => handleHoverCardStart(appCards[6])}
                      onHoverEnd={handleHoverCardEnd}
                      onMouseMove={(e) => handleMouseMove(e, 'noirai')}
                      isActiveStep={activeStep === 7 && viewMode === 'pipeline'}
                      viewMode={viewMode}
                    />
                  </div>

                </div>

              </div>

              {/* 3. RIGHT SIDEBAR: PRODUCED OUTPUTS */}
              <div className="lg:col-span-3 flex flex-col justify-between">
                <Outputs />
              </div>

            </section>


            {/* ================= INTEGRATED DEVELOPER SUITE ================= */}
            <section id="developer-integration" className="mt-20 md:mt-28 space-y-8">
              <div className="border-b border-neutral-900 pb-3 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
                  Omnichannel Integration Surface
                </span>
                <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase mt-1">
                  Developer Integration Suite
                </h2>
              </div>
              <DeveloperSuite />
            </section>


            {/* ================= INTEGRATED EVENT BUS SIMULATOR ================= */}
            <section id="event-bus" className="mt-20 md:mt-28 space-y-8">
              <div className="border-b border-neutral-900 pb-3 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
                  Event Ingestion & Replication
                </span>
                <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase mt-1">
                  Active Enterprise Event Bus Broker
                </h2>
              </div>
              <EventBusSimulator />
            </section>


            {/* ================= CONTROL PLANE & SHARED SERVICES SECTION ================= */}
            <section id="control-plane" className="mt-20 md:mt-28 space-y-12">
              
              {/* Subheader */}
              <div className="border-b border-neutral-900 pb-3 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-[#ff7a1a] font-bold uppercase block">
                  Core Platform Operating System
                </span>
                <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase mt-1">
                  Secure Operating System Hub
                </h2>
              </div>

              {/* Central Control Plane Dashboard OS */}
              <ControlPlane 
                hoveredCardColor={hoveredCardId ? appCards.find(c => c.id === hoveredCardId)?.color || null : null}
                hoveredCardId={hoveredCardId}
              />

              {/* Shared Components & Platform Pluggables */}
              <div id="shared-services" className="mt-20 md:mt-28">
                <div className="border-b border-neutral-900 pb-3 mb-8">
                  <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
                    Pluggable Foundations
                  </span>
                  <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase mt-1">
                    Shared Platform Components & APIs
                  </h2>
                </div>
                <SharedServices hoveredCardId={hoveredCardId} />
              </div>

            </section>


            {/* ================= DEPLOY ANYWHERE HUB ================= */}
            <section id="deployment-topology" className="mt-20 md:mt-28 space-y-8">
              <div className="border-b border-neutral-900 pb-3 mb-2">
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
                  DevOps & Distributed Topology
                </span>
                <h2 className="font-display font-extrabold text-xl md:text-2xl text-white uppercase mt-1">
                  Enterprise Deployment Hub
                </h2>
              </div>
              <DeploymentHub />
            </section>


            {/* Integration Suite / Deep Stories & Architecture */}
            <div className="mt-24 md:mt-32">
              <EcosystemStories />
            </div>


            {/* Ecosystem Sub-Footer branding */}
            <div className="mt-14 text-center">
              <span className="font-display font-semibold text-[10px] uppercase tracking-[0.25em] text-neutral-500">
                Unified under the Noir Stack Enterprise Fabric
              </span>
            </div>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="border-t border-neutral-900 bg-neutral-950/60 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>ALL SYSTEM MODULES SECURE</span>
          </div>
          <div>
            © 2026 NOIR STACK INC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-neutral-300">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-neutral-300">TERMS OF SERVICE</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
