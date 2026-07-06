import { motion } from 'motion/react';
import { Shield, Share2, Route, Lock, LineChart, Cpu } from 'lucide-react';
import { PlatformServiceData } from '../types';

interface SharedInfrastructureProps {
  services: PlatformServiceData[];
  hoveredService: string | null;
  onHoverService: (id: string | null) => void;
}

export default function SharedInfrastructure({
  services,
  hoveredService,
  onHoverService,
}: SharedInfrastructureProps) {
  
  // Icon selector helper
  const getIcon = (name: string, isHovered: boolean) => {
    const props = {
      className: `w-5 h-5 transition-colors duration-300 ${isHovered ? 'text-purple-400' : 'text-neutral-500'}`,
    };
    switch (name) {
      case 'Shield': return <Shield {...props} />;
      case 'Share2': return <Share2 {...props} />;
      case 'Route': return <Route {...props} />;
      case 'Lock': return <Lock {...props} />;
      case 'LineChart': return <LineChart {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <div 
      id="shared-infrastructure-panel"
      className="relative rounded-2xl border border-purple-950/40 bg-neutral-950/40 p-6 shadow-[0_8px_32px_rgba(0,0,0,0.5)] backdrop-blur-sm overflow-hidden"
    >
      {/* Accent corner lines */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500/50" />

      {/* Subtle purple aura */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="mb-5">
        <span className="text-[10px] font-mono tracking-widest text-purple-400 font-bold uppercase block mb-1">
          Core Platform Services
        </span>
        <div className="h-[2px] w-12 bg-purple-500" />
      </div>

      {/* Services List */}
      <div className="space-y-4">
        {services.map((service) => {
          const isHovered = hoveredService === service.id;
          return (
            <motion.div
              key={service.id}
              className="flex gap-4 p-3 rounded-lg border transition-all duration-300 cursor-pointer"
              style={{
                backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.04)' : 'transparent',
                borderColor: isHovered ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
              }}
              onMouseEnter={() => onHoverService(service.id)}
              onMouseLeave={() => onHoverService(null)}
              whileHover={{ x: 4 }}
            >
              {/* Icon container */}
              <div 
                className="p-2.5 rounded-lg border flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: isHovered ? 'rgba(168, 85, 247, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  borderColor: isHovered ? 'rgba(168, 85, 247, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {getIcon(service.iconName, isHovered)}
              </div>

              {/* Service Info */}
              <div className="flex-1">
                <h5 
                  className="font-display font-semibold text-xs tracking-wide transition-colors duration-300"
                  style={{ color: isHovered ? '#ffffff' : '#e5e5e5' }}
                >
                  {service.name}
                </h5>
                <p className="text-[11px] text-neutral-400 mt-0.5 font-sans leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Connected Node Indicator */}
              <div className="flex items-center justify-center pr-1">
                <div 
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: isHovered ? '#a855f7' : '#262626',
                    boxShadow: isHovered ? '0 0 8px #a855f7' : 'none',
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer statistics readout */}
      <div className="mt-5 pt-3 border-t border-neutral-900 flex justify-between items-center text-[10px] font-mono text-neutral-500">
        <span>INFRASTRUCTURE STATE:</span>
        <span className="text-emerald-400">99.99% UPTIME</span>
      </div>
    </div>
  );
}
