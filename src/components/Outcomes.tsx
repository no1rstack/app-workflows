import { motion } from 'motion/react';
import * as Lucide from 'lucide-react';
import { FlowStepData } from '../types';

interface OutcomesProps {
  steps: FlowStepData[];
  hoveredStep: number | null;
  onHoverStep: (step: number | null) => void;
}

export default function Outcomes({ steps, hoveredStep, onHoverStep }: OutcomesProps) {
  // Map step index to custom coloring
  const stepColors = [
    '#22c55e', // cascades green
    '#a855f7', // judicium purple
    '#3b82f6', // hexarch blue
    '#14b8a6', // aitracer teal
    '#eab308', // noirai yellow
  ];

  const getIcon = (name: string, index: number, isActive: boolean) => {
    const IconComponent = (Lucide as any)[name] || Lucide.HelpCircle;
    return (
      <IconComponent 
        className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" 
        style={{ color: isActive ? stepColors[index] : '#a3a3a3' }}
      />
    );
  };

  return (
    <div 
      id="outcomes-flow-pipeline"
      className="relative rounded-2xl border border-neutral-900 bg-neutral-950/40 p-6 md:p-8 backdrop-blur-sm overflow-hidden"
    >
      {/* Laser horizontal scan light flowing through the pipeline */}
      <motion.div 
        className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent pointer-events-none opacity-40"
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      <div className="flex flex-col lg:flex-row items-stretch gap-6 relative z-10">
        
        {/* Title Section */}
        <div className="flex flex-col justify-center min-w-[140px] pr-4 border-b lg:border-b-0 lg:border-r border-neutral-800 pb-4 lg:pb-0">
          <h4 className="font-display font-extrabold text-sm tracking-widest text-white uppercase leading-tight">
            How It
          </h4>
          <span className="font-display font-black text-lg tracking-widest text-[#ff7a1a] uppercase">
            Flows
          </span>
          <p className="text-[10px] font-mono text-neutral-500 uppercase mt-2">
            INTEGRATED RUNTIME
          </p>
        </div>

        {/* Steps Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-center">
          {steps.map((step, idx) => {
            const isHovered = hoveredStep === step.step;
            const accentColor = stepColors[idx];

            return (
              <div key={step.step} className="flex items-center gap-3 relative group">
                {/* Flow Step Card */}
                <motion.div
                  className="flex-1 flex gap-3 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer relative"
                  style={{
                    backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0,0,0,0.3)',
                    borderColor: isHovered ? accentColor : 'rgba(255,255,255,0.03)',
                    boxShadow: isHovered ? `0 0 15px -3px ${accentColor}40` : 'none'
                  }}
                  onMouseEnter={() => onHoverStep(step.step)}
                  onMouseLeave={() => onHoverStep(null)}
                  whileHover={{ y: -2 }}
                >
                  {/* Step icon with circular glowing aura */}
                  <div 
                    className="p-2.5 rounded-lg flex items-center justify-center border transition-all duration-300"
                    style={{
                      backgroundColor: isHovered ? `${accentColor}10` : 'rgba(255, 255, 255, 0.01)',
                      borderColor: isHovered ? `${accentColor}40` : 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {getIcon(step.iconName, idx, isHovered)}
                  </div>

                  {/* Text Details */}
                  <div className="flex-1">
                    <span 
                      className="text-[10px] font-mono tracking-wider transition-colors duration-300 font-bold"
                      style={{ color: isHovered ? accentColor : '#737373' }}
                    >
                      {step.title.split('.')[0]}. {step.title.split('.')[1]?.trim()}
                    </span>
                    <p className="text-[11px] text-neutral-400 mt-1 font-sans leading-tight">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Arrow connector (only show on larger screens between items) */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:flex items-center text-neutral-800">
                    <Lucide.ChevronRight className="w-4 h-4 text-neutral-700 animate-pulse" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
