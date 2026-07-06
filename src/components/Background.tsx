import AnimatedGrid from './AnimatedGrid';
import Particles from './Particles';

export default function Background() {
  return (
    <div 
      id="root-background" 
      className="absolute inset-0 bg-black overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {/* Dynamic Grid overlay */}
      <AnimatedGrid />

      {/* Glowing atmospheric circles */}
      {/* 1. Purple center glow behind the Control Plane */}
      <div 
        className="absolute top-[48%] left-[58%] -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[120px] mix-blend-screen" 
      />
      
      {/* 2. Subtler cyan glow slightly offset */}
      <div 
        className="absolute top-[52%] left-[64%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-950/15 rounded-full blur-[100px] mix-blend-screen" 
      />

      {/* Floating Sparkles & Particles */}
      <Particles color="rgba(147, 197, 253, 0.2)" count={75} />
    </div>
  );
}
