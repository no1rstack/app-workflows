import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  FileText, ShieldAlert, LayoutDashboard, Briefcase, FileSignature, 
  Receipt, Bell, Download, Terminal, Settings2, Code, ArrowLeft 
} from 'lucide-react';

interface OutputItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  count: number;
  lastGenerated: string;
  color: string;
}

export default function Outputs() {
  const [outputs, setOutputs] = useState<OutputItem[]>([
    { id: 'reports', name: 'Analysis Reports', icon: FileSignature, count: 1420, lastGenerated: 'A forensic incident compilation report created by Judicium', color: '#a855f7' },
    { id: 'alerts', name: 'Realtime Alerts', icon: ShieldAlert, count: 8943, lastGenerated: 'Suspicious credential harvest trigger flagged by AiTracer', color: '#f43f5e' },
    { id: 'dashboards', name: 'Live Dashboards', icon: LayoutDashboard, count: 48, lastGenerated: 'Operational KPI analytics matrix rendered by NoirAi', color: '#06b6d4' },
    { id: 'cases', name: 'Legal/Audit Cases', icon: Briefcase, count: 310, lastGenerated: 'Immutable case ledger package sealed in Hexarch', color: '#3b82f6' },
    { id: 'documents', name: 'Word Docs / PDFs', icon: FileText, count: 5219, lastGenerated: 'Evidence appendix document compiled by WordMaker', color: '#10b981' },
    { id: 'proofs', name: 'Crypto Proofs', icon: Settings2, count: 18023, lastGenerated: 'ECDSA signature batch registered on blockchain ledger', color: '#14b8a6' },
    { id: 'invoices', name: 'Invoices & Usage', icon: Receipt, count: 1205, lastGenerated: 'Stripe usage billing session registered by Ledgerbill', color: '#eab308' },
    { id: 'notifications', name: 'Push Notifications', icon: Bell, count: 62410, lastGenerated: 'Platform routing webhook distributed by Cascades', color: '#f97316' },
    { id: 'exports', name: 'Data Exports', icon: Download, count: 3209, lastGenerated: 'Full JSON dataset exported via API gateway integration', color: '#6366f1' },
    { id: 'apis', name: 'APIs Exposed', icon: Code, count: 120, lastGenerated: 'Dynamic gRPC endpoint exposed through APISIX cluster', color: '#10b981' },
  ]);

  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  // Periodic counts incrementation & live toast notification stimulation
  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * outputs.length);
      
      setOutputs((prev) =>
        prev.map((item, idx) => {
          if (idx === randomIndex) {
            const increment = Math.floor(Math.random() * 3) + 1;
            return {
              ...item,
              count: item.count + increment,
            };
          }
          return item;
        })
      );

      // Trigger a tiny live creation notification toast
      const updatedItem = outputs[randomIndex];
      setActiveNotification(`${updatedItem.name} updated: count incremented.`);
      setTimeout(() => setActiveNotification(null), 3000);

    }, 5000);

    return () => clearInterval(interval);
  }, [outputs]);

  return (
    <div id="outputs-created-panel" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/45 p-6 md:p-8 backdrop-blur-sm">
      {/* Header */}
      <div className="mb-6 pb-3 border-b border-neutral-900/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
            Egress Deliverables
          </span>
          <h4 className="font-display font-extrabold text-sm text-neutral-200 uppercase mt-1 tracking-wider">
            Operational Outputs
          </h4>
        </div>
        <div className="text-[9px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/10 border border-cyan-900/20 uppercase animate-pulse">
          Egress Live
        </div>
      </div>

      <p className="text-[11px] text-neutral-400 mb-5 font-sans leading-relaxed">
        Finished secure artifacts, legal proofs, metrics dashboards, and business invoices distributed system-wide:
      </p>

      {/* Outputs List */}
      <div className="space-y-3">
        {outputs.map((out) => {
          const Icon = out.icon;

          return (
            <motion.div
              key={out.id}
              className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-900 bg-black/45 transition-colors group hover:border-neutral-800"
              whileHover={{ x: -3 }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div 
                  className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors group-hover:border-neutral-700"
                >
                  <Icon 
                    className="w-4 h-4" 
                    style={{ color: out.color }} 
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-display font-bold text-neutral-200 block truncate group-hover:text-white transition-colors">
                    {out.name}
                  </span>
                  <p className="text-[8px] font-mono text-neutral-500 truncate max-w-[140px]">
                    {out.lastGenerated}
                  </p>
                </div>
              </div>

              {/* Counter details with micro scale-color pops on update */}
              <div className="text-right">
                <motion.span 
                  key={out.count}
                  initial={{ scale: 1.15, color: '#22d3ee' }}
                  animate={{ scale: 1, color: '#f5f5f5' }}
                  transition={{ duration: 0.4 }}
                  className="text-[11.5px] font-mono font-extrabold block"
                >
                  {out.count.toLocaleString()}
                </motion.span>
                <span className="text-[8px] font-mono text-emerald-400 uppercase tracking-widest block -mt-0.5">
                  DELIVERED
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Micro-Notification layer */}
      <AnimatePresence>
        {activeNotification && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute bottom-16 left-4 right-4 bg-cyan-950/90 border border-cyan-500/30 px-3 py-2 rounded-lg backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.6)] flex items-center gap-2 pointer-events-none"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-mono text-white truncate">{activeNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Arrow linking from previous steps */}
      <div className="mt-4 pt-3 border-t border-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <div className="flex items-center gap-1 text-cyan-400 font-bold">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>FROM OPERATIONAL PIPELINE</span>
        </div>
        <span className="uppercase">Egress verified</span>
      </div>
    </div>
  );
}
