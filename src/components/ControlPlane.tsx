import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldAlert, Fingerprint, Database, ClipboardList, Key, 
  Workflow, Cpu, Terminal, Layers, Radio, Network, FileCode, Users
} from 'lucide-react';

interface ControlPlaneProps {
  hoveredCardColor: string | null;
  hoveredCardId: string | null;
}

interface OSModule {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  status: 'online' | 'active' | 'synced';
  load: string;
  details: string;
}

export default function ControlPlane({ hoveredCardColor, hoveredCardId }: ControlPlaneProps) {
  const [selectedModule, setSelectedModule] = useState<string | null>('events');
  const [activeLog, setActiveLog] = useState<string>('System initialized. All services synced.');
  const [sysLoad, setSysLoad] = useState<number>(12.4);

  const modules: OSModule[] = [
    { id: 'identity', name: 'Identity & Auth', icon: Fingerprint, status: 'online', load: '1.2%', details: 'Centralized OAuth2, SAML, & JWT session brokers.' },
    { id: 'rbac', name: 'RBAC Systems', icon: Users, status: 'online', load: '0.4%', details: 'Role-based fine-grained access control policies.' },
    { id: 'events', name: 'Event Bus Broker', icon: Radio, status: 'active', load: '4.8%', details: 'High-throughput secure event streaming & replication.' },
    { id: 'policies', name: 'Compliance Policies', icon: ClipboardList, status: 'online', load: '0.2%', details: 'Automated governance, compliance guardrails & policy enforcement.' },
    { id: 'audit', name: 'Immutable Audit', icon: ShieldAlert, status: 'active', load: '1.9%', details: 'Cryptographically anchored system-wide audit logs.' },
    { id: 'secrets', name: 'Secrets (Infisical)', icon: Key, status: 'synced', load: '0.1%', details: 'End-to-end encrypted runtime env vars & credentials storage.' },
    { id: 'registry', name: 'Service Registry', icon: Database, status: 'online', load: '0.8%', details: 'Discovery hub for dynamic application routing.' },
    { id: 'gateway', name: 'API Gateway', icon: Network, status: 'active', load: '3.4%', details: 'APISIX routing, rate-limiting & WAF enforcement.' },
    { id: 'sdk', name: 'Developer SDK', icon: FileCode, status: 'synced', load: '0.0%', details: 'Type-safe SDKs for microservice telemetry registration.' },
    { id: 'cli', name: 'Noir Command CLI', icon: Terminal, status: 'online', load: '0.3%', details: 'Developer CLI tool for orchestration and deployment.' },
  ];

  const glowColor = hoveredCardColor || '#22d3ee'; // fallback to cyan

  // Simulating live system events & system load fluctuations
  useEffect(() => {
    const logs = [
      'Event Stream [identity] validated token for shdwcdr@gmail.com',
      'API Gateway [gateway] route modified: cascading-v2 online',
      'Audit Registry [audit] anchored proof chunk #90881 to ledger',
      'Secrets Manager [secrets] injected secure environment variables to Judicium',
      'Compliance engine [policies] verified model behavior signature: PASSED',
      'CLI session established: tunnels set up on port 3000',
    ];

    const interval = setInterval(() => {
      const log = logs[Math.floor(Math.random() * logs.length)];
      setActiveLog(log);
      
      // Gently fluctuate system load
      setSysLoad((prev) => {
        const delta = (Math.random() - 0.5) * 1.5;
        const next = Math.max(8.0, Math.min(18.0, prev + delta));
        return parseFloat(next.toFixed(1));
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div 
      id="control-plane"
      className="relative rounded-2xl border bg-black/90 p-6 md:p-8 backdrop-blur-md transition-all duration-700 w-full"
      style={{
        borderColor: hoveredCardColor ? glowColor : 'rgba(34, 211, 238, 0.12)',
        boxShadow: hoveredCardColor 
          ? `0 0 35px -5px ${glowColor}40, inset 0 0 15px -3px ${glowColor}25` 
          : 'none',
      }}
    >
      {/* OS Grid Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-neutral-900 pb-4 mb-6 gap-3">
        <div className="flex items-center gap-2.5">
          <div className="relative p-1.5 rounded bg-cyan-500/5 border border-cyan-500/20">
            <Cpu className="w-5 h-5 text-cyan-400 animate-pulse" />
          </div>
          <div>
            <h4 className="font-display font-extrabold text-sm md:text-base tracking-wider text-white uppercase">
              NOIR OS / CONTROL PLANE
            </h4>
            <span className="text-[9px] font-mono text-neutral-500 tracking-widest uppercase">
              Distributed Platform Operating System v4.1
            </span>
          </div>
        </div>

        {/* Live system load status */}
        <div className="flex items-center gap-3 bg-neutral-950 px-2.5 py-1 rounded border border-neutral-900">
          <span className="text-[9px] font-mono text-neutral-400 font-bold">SYS LOAD:</span>
          <motion.span 
            key={sysLoad}
            initial={{ scale: 1.1, color: '#10b981' }}
            animate={{ scale: 1, color: '#34d399' }}
            transition={{ duration: 0.3 }}
            className="text-[9px] font-mono font-bold"
          >
            {sysLoad.toFixed(1)}% ACTIVE
          </motion.span>
        </div>
      </div>

      {/* Main OS Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        
        {/* Module Tiles Grid (Col-Span 7) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-2">
          {modules.map((mod) => {
            const Icon = mod.icon;
            const isSelected = selectedModule === mod.id;

            return (
              <motion.button
                key={mod.id}
                onClick={() => setSelectedModule(mod.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all cursor-pointer relative group`}
                style={{
                  backgroundColor: isSelected ? `${glowColor}10` : 'rgba(0,0,0,0.3)',
                  borderColor: isSelected 
                    ? glowColor 
                    : 'rgba(255, 255, 255, 0.03)',
                }}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Tech indicator dot */}
                <span className={`absolute top-2 right-2 w-1 h-1 rounded-full ${
                  mod.status === 'active' ? 'bg-emerald-400 animate-ping' : 'bg-neutral-500'
                }`} />

                <Icon 
                  className={`w-5 h-5 mb-2 transition-colors duration-300`}
                  style={{ color: isSelected ? glowColor : undefined }}
                />

                <span className={`text-[10px] font-display font-bold tracking-wide leading-tight ${
                  isSelected ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-200'
                }`}>
                  {mod.name.split(' ')[0]}
                </span>
                <span className="text-[8px] font-mono text-neutral-600 mt-0.5">
                  {mod.name.split(' ')[1] || ''}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Module Specs Terminal (Col-Span 5) */}
        <div className="md:col-span-4 flex flex-col justify-between rounded-xl border border-neutral-900 bg-neutral-950/80 p-4 relative">
          
          {/* Module telemetry */}
          <div>
            <div className="flex justify-between items-center border-b border-neutral-900/60 pb-1.5 mb-2">
              <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">
                MODULE SPECS
              </span>
              <span className="text-[9px] font-mono text-cyan-400 bg-cyan-950/20 border border-cyan-900/30 px-1.5 rounded uppercase">
                SECURE
              </span>
            </div>

            <AnimatePresence mode="wait">
              {selectedModule && (
                <motion.div
                  key={selectedModule}
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -5 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-2"
                >
                  <h5 className="font-display font-extrabold text-xs text-white uppercase tracking-wider">
                    {modules.find(m => m.id === selectedModule)?.name}
                  </h5>
                  <p className="text-[10px] text-neutral-400 font-sans leading-relaxed">
                    {modules.find(m => m.id === selectedModule)?.details}
                  </p>
                  <div className="flex gap-4 pt-1 border-t border-neutral-900/40 text-[9px] font-mono">
                    <div>
                      <span className="text-neutral-500 uppercase">LOAD:</span>
                      <span className="font-bold ml-1" style={{ color: glowColor }}>
                        {modules.find(m => m.id === selectedModule)?.load}
                      </span>
                    </div>
                    <div>
                      <span className="text-neutral-500 uppercase">STATE:</span>
                      <span className="text-emerald-400 font-bold ml-1">HEALTHY</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Active rolling log readout */}
          <div className="mt-4 pt-2 border-t border-neutral-900/60">
            <div className="flex items-center gap-1.5 text-[8px] font-mono text-neutral-500 uppercase mb-1">
              <Terminal className="w-2.5 h-2.5" />
              <span>Realtime Kernel Log</span>
            </div>
            <div className="font-mono text-[9px] text-emerald-400 bg-black/60 p-2 rounded border border-neutral-900/50 leading-normal truncate">
              $ {activeLog}
            </div>
          </div>

        </div>

      </div>

      {/* Embedded Connectors Map Representation (Bottom Sub-bar) */}
      <div className="mt-4 pt-2 border-t border-neutral-900 flex justify-between items-center text-[9px] font-mono text-neutral-500">
        <span className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-neutral-400 animate-pulse" />
          <span>MICROSERVICE FABRIC INGRESS POINT</span>
        </span>
        <span style={{ color: glowColor }}>STATUS: SYNCED TO OPERATIONAL FLOW</span>
      </div>
    </div>
  );
}
