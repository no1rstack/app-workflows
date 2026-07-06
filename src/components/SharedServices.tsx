import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, Search, HardDrive, Database, ListOrdered, Calendar, 
  ArrowRight, FileType, Check, Languages, Mail, Radio, Key, Fingerprint, Receipt, Code
} from 'lucide-react';

interface Utility {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  description: string;
  usedBy: string[]; // IDs of apps that use it
}

interface SharedServicesProps {
  hoveredCardId?: string | null;
}

export default function SharedServices({ hoveredCardId = null }: SharedServicesProps) {
  const [hoveredUtil, setHoveredUtil] = useState<string | null>(null);
  const [activeFlowStep, setActiveFlowStep] = useState<number>(0);

  const sharedUtilities: Utility[] = [
    { id: 'ai', name: 'AI Providers', icon: Sparkles, description: 'Gemini 2.5 Pro, Flash & Custom LLM gateways.', usedBy: ['wordmaker', 'aitracer'] },
    { id: 'search', name: 'Shared Search', icon: Search, description: 'Elastic & Vector clustered query indexing.', usedBy: ['judicium', 'wordmaker'] },
    { id: 'storage', name: 'Shared Storage', icon: HardDrive, description: 'Secure encrypted blob, file & artifact storage.', usedBy: ['cascades', 'wordmaker', 'hexarch'] },
    { id: 'vectordb', name: 'Vector Database', icon: Database, description: 'Pgvector & Pinecone embeddings workspace.', usedBy: ['judicium', 'aitracer', 'noirai'] },
    { id: 'queue', name: 'Task Queue', icon: ListOrdered, description: 'High-throughput Redis & RabbitMQ message broker.', usedBy: ['cascades', 'noirai'] },
    { id: 'scheduler', name: 'Job Scheduler', icon: Calendar, description: 'Automated cron & task orchestration engine.', usedBy: ['cascades', 'ledgerbill'] },
    { id: 'fileproc', name: 'File Processor', icon: FileType, description: 'Asynchronous sandbox and archive file extraction.', usedBy: ['judicium', 'wordmaker'] },
    { id: 'ocr', name: 'OCR Parser', icon: Check, description: 'Optical document character scanning & extraction.', usedBy: ['judicium', 'wordmaker'] },
    { id: 'translation', name: 'Translation Eng', icon: Languages, description: 'Automated localization and international mapping.', usedBy: ['judicium'] },
    { id: 'email', name: 'Email Outbox', icon: Mail, description: 'SMTP transactional notification and dispatching.', usedBy: ['cascades', 'ledgerbill'] },
    { id: 'webhooks', name: 'Webhook Relays', icon: Radio, description: 'Signed and retried event webhook broker.', usedBy: ['aitracer'] },
    { id: 'secrets', name: 'Secrets Engine', icon: Key, description: 'Secure centralized token & credential rotation.', usedBy: ['hexarch', 'ledgerbill'] },
  ];

  // Steps of the shared platform flow graph
  const flowNodes = [
    { id: 'search', name: 'Shared Search', icon: Search, desc: 'Clustered Elastic Queries' },
    { id: 'apps', name: 'Judicium • WordMaker • CodeCraft', icon: Code, desc: 'Workspace Processors', isGroup: true },
    { id: 'vector', name: 'Shared Vector DB', icon: Database, desc: 'Pgvector Semantic Embeddings' },
    { id: 'identity', name: 'Shared Identity', icon: Fingerprint, desc: 'Centralized OAuth / SAML Auth' },
    { id: 'billing', name: 'Shared Billing', icon: Receipt, desc: 'Ledgerbill Usage Metering' },
  ];

  // Auto-cycle active shared platform flow steps to bring motion to the diagram
  React.useEffect(() => {
    const cycle = setInterval(() => {
      setActiveFlowStep((prev) => (prev + 1) % flowNodes.length);
    }, 4500);
    return () => clearInterval(cycle);
  }, []);

  return (
    <div className="space-y-12">
      
      {/* 1. VISUAL FLOW GRAPH */}
      <div id="shared-flow-graph" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 backdrop-blur-sm">
        {/* Title */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-neutral-900/60 pb-3">
          <div>
            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
              Platform Architecture Integration
            </span>
            <h4 className="font-display font-extrabold text-sm md:text-base text-neutral-200 uppercase mt-1 tracking-wider">
              Unified Platform Shared Components Flow
            </h4>
          </div>
          <div className="flex gap-1.5 items-center">
            <button 
              onClick={() => setActiveFlowStep((prev) => (prev + 1) % flowNodes.length)}
              className="text-[9px] font-mono font-bold uppercase tracking-wider text-cyan-400 border border-cyan-500/20 bg-cyan-950/5 hover:bg-cyan-950/15 px-2.5 py-1 rounded cursor-pointer transition-colors"
            >
              Cycle Data Transfer
            </button>
          </div>
        </div>

        <p className="text-[11px] text-neutral-400 mb-6 font-sans leading-relaxed">
          Noir Stack avoids application isolation. All products directly leverage shared cluster components for unified operations:
        </p>

        {/* Node Flow Display */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 md:gap-2 items-center relative">
          
          {flowNodes.map((node, index) => {
            const Icon = node.icon;
            const isActive = activeFlowStep === index;

            return (
              <React.Fragment key={node.id}>
                <motion.div
                  className={`p-4 rounded-xl border transition-all duration-300 relative flex flex-col items-center text-center ${
                    node.isGroup ? 'bg-cyan-950/5 border-cyan-900/20' : 'bg-black/60 border-neutral-900'
                  }`}
                  style={{
                    borderColor: isActive ? '#22d3ee' : undefined,
                    boxShadow: isActive ? '0 0 20px -3px rgba(34, 211, 238, 0.25)' : 'none',
                  }}
                  animate={isActive ? { scale: 1.03 } : { scale: 1 }}
                >
                  {/* Glowing core indicator */}
                  <div 
                    className="p-2.5 rounded-lg mb-2 flex items-center justify-center transition-colors"
                    style={{
                      backgroundColor: isActive ? 'rgba(34, 211, 238, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                      border: `1px solid ${isActive ? 'rgba(34, 211, 238, 0.2)' : 'rgba(255, 255, 255, 0.05)'}`,
                    }}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-neutral-500'}`} />
                  </div>

                  <span className={`text-[11.5px] font-display font-extrabold tracking-wide uppercase ${
                    isActive ? 'text-white' : 'text-neutral-300'
                  }`}>
                    {node.name}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 mt-1 leading-normal max-w-[150px]">
                    {node.desc}
                  </span>

                  {/* Active ping beacon */}
                  {isActive && (
                    <span className="absolute top-2 right-2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                  )}
                </motion.div>

                {/* Draw connecting arrow on MD screens */}
                {index < flowNodes.length - 1 && (
                  <div className="hidden md:flex justify-center items-center text-neutral-800">
                    <ArrowRight className={`w-4 h-4 transition-colors ${isActive ? 'text-cyan-500' : 'text-neutral-800'}`} />
                  </div>
                )}
              </React.Fragment>
            );
          })}

        </div>
      </div>

      {/* 2. SECURE PLATFORM SHARED SERVICES UTILITIES GRID */}
      <div id="shared-utilities-panel" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 backdrop-blur-sm">
        {/* Title */}
        <div className="mb-5 pb-3 border-b border-neutral-900/60">
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
            Central Shared Utilities
          </span>
          <h4 className="font-display font-extrabold text-sm md:text-base text-neutral-200 uppercase mt-1 tracking-wider">
            Pluggable Shared Platform Services
          </h4>
        </div>

        <p className="text-[11px] text-neutral-400 mb-5 font-sans leading-relaxed">
          Hover an ecosystem application above to see which shared microservice APIs it connects to, or hover any service below to view client applications:
        </p>

        {/* Utilities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {sharedUtilities.map((util) => {
            const Icon = util.icon;
            const isHovered = hoveredUtil === util.id;
            const isHighlightedByHoveredCard = hoveredCardId ? util.usedBy.includes(hoveredCardId) : false;

            return (
              <motion.div
                key={util.id}
                onMouseEnter={() => setHoveredUtil(util.id)}
                onMouseLeave={() => setHoveredUtil(null)}
                className="p-3 rounded-xl border bg-black/50 flex flex-col items-center text-center cursor-pointer relative group transition-all duration-300"
                style={{
                  borderColor: isHighlightedByHoveredCard 
                    ? '#06b6d4' 
                    : isHovered 
                      ? '#ff7a1a' 
                      : 'rgba(255,255,255,0.05)',
                  boxShadow: isHighlightedByHoveredCard 
                    ? '0 0 15px rgba(6, 182, 212, 0.3)' 
                    : isHovered 
                      ? '0 0 15px rgba(255, 122, 26, 0.3)' 
                      : 'none',
                  scale: isHighlightedByHoveredCard ? 1.05 : 1,
                }}
                whileHover={{ y: -3 }}
              >
                {/* Active connection pulse for high usability ownership display */}
                {isHighlightedByHoveredCard && (
                  <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500"></span>
                  </span>
                )}

                <div 
                  className="p-2 rounded-lg bg-neutral-950 border border-neutral-900/80 flex items-center justify-center mb-1.5 transition-colors group-hover:border-neutral-700"
                  style={{
                    backgroundColor: isHighlightedByHoveredCard 
                      ? 'rgba(6, 182, 212, 0.1)' 
                      : isHovered 
                        ? 'rgba(255, 122, 26, 0.08)' 
                        : undefined,
                  }}
                >
                  <Icon className={`w-4.5 h-4.5 transition-colors duration-300 ${
                    isHighlightedByHoveredCard 
                      ? 'text-cyan-400' 
                      : isHovered 
                        ? 'text-[#ff7a1a]' 
                        : 'text-neutral-500 group-hover:text-neutral-300'
                  }`} />
                </div>
                <span className="text-[10px] font-display font-bold text-neutral-300 tracking-wide">
                  {util.name}
                </span>

                {/* Absolute popover details for each shared service */}
                {(isHovered || isHighlightedByHoveredCard) && (
                  <div className="absolute bottom-[105%] left-1/2 -translate-x-1/2 z-30 min-w-[200px] bg-neutral-950/95 border border-neutral-800 p-3 rounded-lg shadow-[0_8px_30px_rgba(0,0,0,0.95)] pointer-events-none text-left">
                    <span className="text-[10px] font-mono font-bold text-cyan-400 block mb-1 uppercase tracking-wider">
                      {util.name}
                    </span>
                    <p className="text-[10px] text-neutral-400 leading-snug font-sans mb-2">
                      {util.description}
                    </p>
                    <div className="pt-1.5 border-t border-neutral-900">
                      <span className="text-[8px] font-mono text-neutral-500 uppercase block font-bold">
                        Client Applications
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {util.usedBy.map((appId) => (
                          <span 
                            key={appId} 
                            className="text-[8.5px] font-mono px-1 py-0.2 rounded uppercase font-semibold"
                            style={{
                              backgroundColor: 'rgba(255,255,255,0.03)',
                              color: hoveredCardId === appId ? '#06b6d4' : '#ff7a1a',
                              border: `1px solid ${hoveredCardId === appId ? 'rgba(6,182,212,0.3)' : 'rgba(255,122,26,0.1)'}`
                            }}
                          >
                            {appId}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
