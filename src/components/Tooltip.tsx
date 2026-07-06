import { motion, AnimatePresence } from 'motion/react';

interface TooltipProps {
  visible: boolean;
  x: number;
  y: number;
  content: {
    title: string;
    status: 'Operational' | 'Active' | 'Locked' | 'Monitoring' | string;
    metrics: string[];
    details: string;
  } | null;
}

export default function Tooltip({ visible, x, y, content }: TooltipProps) {
  if (!visible || !content) return null;

  return (
    <AnimatePresence>
      <motion.div
        id="hover-tooltip"
        className="fixed pointer-events-none z-50 min-w-[240px] rounded-lg border border-neutral-800 bg-neutral-950/90 p-4 shadow-[0_4px_24px_rgba(0,0,0,0.8)] backdrop-blur-md"
        style={{ left: x + 16, top: y + 16 }}
        initial={{ opacity: 0, scale: 0.95, y: 5 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
      >
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-neutral-800">
          <span className="font-display font-semibold text-xs tracking-wide text-white uppercase">
            {content.title}
          </span>
          <span className="flex items-center gap-1.5 text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
            {content.status}
          </span>
        </div>
        
        <p className="text-xs text-neutral-400 mb-3 font-sans leading-relaxed">
          {content.details}
        </p>

        {content.metrics.length > 0 && (
          <div className="space-y-1">
            {content.metrics.map((m, i) => (
              <div key={i} className="flex justify-between items-center text-[10px] font-mono">
                <span className="text-neutral-500 uppercase">{m.split(':')[0]}</span>
                <span className="text-indigo-400 font-medium">{m.split(':')[1] || ''}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
