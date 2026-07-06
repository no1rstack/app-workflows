import { motion } from 'motion/react';

export default function AnimatedGrid() {
  return (
    <div id="cyber-grid" className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* 2D Tech Grid Overlay with Radial Gradient Masking */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 95%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 40%, transparent 95%)'
        }}
      />

      {/* Cyberpunk Perspective Floor Grid (Subtle at the bottom) */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[250px] opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.2) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: 'perspective(500px) rotateX(75deg) scale(1.5)',
          transformOrigin: 'bottom center',
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)'
        }}
      />

      {/* Dynamic Scanline Beam */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent"
        initial={{ y: '-10%' }}
        animate={{ y: '110%' }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      {/* Grid Pulse glow in Center */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none animate-pulse"
        style={{ animationDuration: '8s' }}
      />
    </div>
  );
}
