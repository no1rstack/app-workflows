import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, FileText, Database, Radio, Cloud, Users, Cpu, Rss, Globe, Layers, ArrowRight 
} from 'lucide-react';

interface DataSourceItem {
  id: string;
  name: string;
  icon: React.ComponentType<any>;
  rate: string;
  status: 'streaming' | 'idle';
  color: string;
}

export default function DataSources() {
  const [sources, setSources] = useState<DataSourceItem[]>([
    { id: 'email', name: 'Email Ingestion', icon: Mail, rate: '42.5 kb/s', status: 'streaming', color: '#a855f7' },
    { id: 'files', name: 'File Uploads', icon: FileText, rate: '1.2 Mb/s', status: 'streaming', color: '#3b82f6' },
    { id: 'db', name: 'Databases', icon: Database, rate: '0.0 kb/s', status: 'idle', color: '#eab308' },
    { id: 'apis', name: 'Webhooks & APIs', icon: Radio, rate: '254.1 kb/s', status: 'streaming', color: '#22c55e' },
    { id: 'cloud', name: 'Cloud Infrastructure', icon: Cloud, rate: '3.1 Mb/s', status: 'streaming', color: '#06b6d4' },
    { id: 'users', name: 'User Sessions', icon: Users, rate: '18.9 kb/s', status: 'streaming', color: '#ec4899' },
    { id: 'iot', name: 'IoT Telemetry', icon: Cpu, rate: '115.4 kb/s', status: 'streaming', color: '#14b8a6' },
    { id: 'rss', name: 'RSS Feeds', icon: Rss, rate: '0.0 kb/s', status: 'idle', color: '#f97316' },
    { id: 'osint', name: 'OSINT Monitors', icon: Globe, rate: '85.2 kb/s', status: 'streaming', color: '#8b5cf6' },
    { id: 'internal', name: 'Internal Legacy Apps', icon: Layers, rate: '14.0 kb/s', status: 'streaming', color: '#64748b' },
  ]);

  // Simulate changing data ingestion rates to make it look super alive
  useEffect(() => {
    const interval = setInterval(() => {
      setSources((prev) =>
        prev.map((source) => {
          if (source.status === 'idle' && Math.random() > 0.85) {
            return { ...source, status: 'streaming', rate: `${(Math.random() * 20).toFixed(1)} kb/s` };
          }
          if (source.status === 'streaming') {
            if (Math.random() > 0.9) {
              return { ...source, status: 'idle', rate: '0.0 kb/s' };
            }
            const currentVal = parseFloat(source.rate);
            const multiplier = source.rate.includes('Mb') ? 1000 : 1;
            const newVal = Math.max(5, currentVal * multiplier + (Math.random() - 0.5) * 50);
            const displayRate = newVal > 1000 
              ? `${(newVal / 1000).toFixed(1)} Mb/s` 
              : `${newVal.toFixed(1)} kb/s`;
            return { ...source, rate: displayRate };
          }
          return source;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="data-sources-panel" className="relative rounded-2xl border border-neutral-900 bg-neutral-950/45 p-6 md:p-8 backdrop-blur-sm">
      {/* Title */}
      <div className="mb-6 pb-3 border-b border-neutral-900/60 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase block">
            Ingestion Pipeline
          </span>
          <h4 className="font-display font-extrabold text-sm text-neutral-200 uppercase mt-1 tracking-wider">
            Ingress Data Sources
          </h4>
        </div>
        <div className="text-[9px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-950/20 border border-cyan-900/30 uppercase animate-pulse">
          Active Ingest
        </div>
      </div>

      <p className="text-[11px] text-neutral-400 mb-5 font-sans leading-relaxed">
        Realtime feeds structured, decrypted, and indexed before ingestion into <span className="text-cyan-400 font-bold font-mono">CASCADES</span>:
      </p>

      {/* Sources Grid */}
      <div className="space-y-3">
        {sources.map((src) => {
          const Icon = src.icon;
          const isStreaming = src.status === 'streaming';

          return (
            <motion.div
              key={src.id}
              className="flex items-center justify-between p-2.5 rounded-lg border border-neutral-900 bg-black/45 transition-colors group hover:border-neutral-800"
              whileHover={{ x: 3 }}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {/* Clean micro-indicator container with no permanent glow shadow */}
                <div className="p-1.5 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center transition-colors group-hover:border-neutral-700">
                  <Icon 
                    className="w-4 h-4" 
                    style={{ color: isStreaming ? src.color : '#525252' }} 
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-display font-bold text-neutral-200 block truncate group-hover:text-white transition-colors">
                    {src.name}
                  </span>
                  <span className="text-[9px] font-mono text-neutral-500 block -mt-0.5">
                    {isStreaming ? 'STREAMING FEED' : 'STANDBY LINK'}
                  </span>
                </div>
              </div>

              {/* Bandwidth Rate Readout with micro scale-color pops on update */}
              <div className="flex items-center gap-2">
                <motion.span 
                  key={src.rate}
                  initial={{ scale: 1.1, color: '#22d3ee' }}
                  animate={{ scale: 1, color: isStreaming ? '#22d3ee' : '#525252' }}
                  transition={{ duration: 0.3 }}
                  className="text-[9px] font-mono font-medium"
                >
                  {src.rate}
                </motion.span>
                <span 
                  className={`w-1.5 h-1.5 rounded-full ${
                    isStreaming ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-800'
                  }`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Arrow linking to Cascades */}
      <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <span className="uppercase">Ingest routing:</span>
        <div className="flex items-center gap-1 text-cyan-400 font-bold">
          <span>TO CASCADES</span>
          <ArrowRight className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </div>
    </div>
  );
}
