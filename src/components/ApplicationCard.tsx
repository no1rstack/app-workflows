import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as Lucide from 'lucide-react';
import { AppCardData } from '../types';

interface ApplicationCardProps {
  card: AppCardData;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onMouseMove: (e: React.MouseEvent) => void;
  isActiveStep: boolean;
  viewMode: 'pipeline' | 'eventbus';
  onClick?: () => void;
}

export default function ApplicationCard({
  card,
  isHovered,
  onHoverStart,
  onHoverEnd,
  onMouseMove,
  isActiveStep,
  viewMode,
  onClick,
}: ApplicationCardProps) {
  const [activeTab, setActiveTab] = useState<'specs' | 'capabilities' | 'integration'>('specs');
  const IconComponent = (Lucide as any)[card.iconName] || Lucide.HelpCircle;

  return (
    <motion.div
      id={`card-${card.id}`}
      className="relative rounded-xl border bg-neutral-950/80 p-6 md:p-8 transition-all duration-300 backdrop-blur-md cursor-pointer overflow-hidden group"
      style={{
        borderColor: isHovered 
          ? card.color 
          : isActiveStep 
          ? `${card.color}80` 
          : 'rgba(255, 255, 255, 0.07)',
        boxShadow: isHovered 
          ? `0 0 30px -5px ${card.glowColor}` 
          : isActiveStep
            ? `0 0 15px -8px ${card.glowColor}`
            : 'none',
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      onMouseMove={onMouseMove}
      onClick={onClick}
      whileHover={{ y: -5 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
    >
      {/* Glow gradient background inside the card */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle 200px at var(--mouse-x, 50%) var(--mouse-y, 50%), ${card.glowColor}, transparent 80%)`,
        }}
      />

      {/* Step Badge / Flow Number */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 z-20">
        <span 
          className="text-[9px] font-mono px-2.5 py-0.5 rounded border font-semibold tracking-wider transition-colors duration-300"
          style={{
            backgroundColor: `${card.color}15`,
            borderColor: `${card.color}30`,
            color: card.color,
          }}
        >
          STEP {card.stepNumber}
        </span>
      </div>

      {/* Top Section: Icon & Header */}
      <div className="flex gap-4 items-start relative z-10 pr-12">
        <div 
          className="p-3 rounded-xl flex items-center justify-center transition-transform duration-500 group-hover:scale-105"
          style={{
            background: `rgba(${parseInt(card.color.slice(1,3), 16)}, ${parseInt(card.color.slice(3,5), 16)}, ${parseInt(card.color.slice(5,7), 16)}, 0.08)`,
            border: `1px solid rgba(${parseInt(card.color.slice(1,3), 16)}, ${parseInt(card.color.slice(3,5), 16)}, ${parseInt(card.color.slice(5,7), 16)}, 0.25)`,
          }}
        >
          <IconComponent 
            className="w-6 h-6" 
            style={{ color: card.color }} 
          />
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 
              className="font-display font-extrabold text-base tracking-wider uppercase transition-all duration-300"
              style={{ 
                color: isHovered ? '#ffffff' : card.color,
                textShadow: isHovered ? `0 0 10px ${card.color}` : 'none'
              }}
            >
              {card.name}
            </h3>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {card.id === 'judicium' && (
              <span className="text-[7.5px] font-mono px-1.5 py-0.2 bg-orange-950/20 text-[#ff7a1a] border border-[#ff7a1a]/30 rounded font-bold uppercase animate-pulse">
                Click to Open
              </span>
            )}
          </div>
          <p className="text-[10px] font-semibold text-neutral-400 tracking-wide mt-1">
            {card.subtitle}
          </p>
        </div>
      </div>

      {/* Tab Selectors inside Card for deep specs */}
      <div className="flex gap-4 border-b border-neutral-900 mt-6 pb-2 relative z-10">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('specs');
          }}
          className={`text-[9px] font-mono uppercase tracking-wider font-bold transition-colors pb-0.5 ${
            activeTab === 'specs' ? 'text-white border-b border-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Specs
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('capabilities');
          }}
          className={`text-[9px] font-mono uppercase tracking-wider font-bold transition-colors pb-0.5 ${
            activeTab === 'capabilities' ? 'text-white border-b border-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Capabilities
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setActiveTab('integration');
          }}
          className={`text-[9px] font-mono uppercase tracking-wider font-bold transition-colors pb-0.5 ${
            activeTab === 'integration' ? 'text-white border-b border-white' : 'text-neutral-500 hover:text-neutral-300'
          }`}
        >
          Integration
        </button>
      </div>

      {/* Tab Contents */}
      <div className="mt-5 relative z-10 min-h-[110px]">
        {activeTab === 'specs' && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2.5"
          >
            {/* Purpose */}
            <div>
              <span className="text-[9px] font-mono text-neutral-500 uppercase block font-bold">
                Purpose
              </span>
              <p className="text-[11px] text-neutral-300 font-sans leading-snug">
                {card.purpose}
              </p>
            </div>

            {/* Consumes & Produces Grid */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-900/60">
              <div>
                <span className="text-[8px] font-mono text-purple-400 uppercase font-bold block">
                  Consumes
                </span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {card.consumes.map((item, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] font-mono px-1 py-0.2 bg-purple-950/20 text-purple-300 rounded border border-purple-900/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <span className="text-[8px] font-mono text-cyan-400 uppercase font-bold block">
                  Produces
                </span>
                <div className="flex flex-wrap gap-1 mt-0.5">
                  {card.produces.map((item, i) => (
                    <span 
                      key={i} 
                      className="text-[9px] font-mono px-1 py-0.2 bg-cyan-950/20 text-cyan-300 rounded border border-cyan-900/30"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'capabilities' && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1.5"
          >
            <span className="text-[9px] font-mono text-neutral-500 uppercase block font-bold">
              Exposed Capabilities
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1">
              {card.capabilities.map((cap, i) => (
                <div key={i} className="flex items-center gap-1.5 text-[10px] text-neutral-300 font-mono">
                  <Lucide.Check className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="truncate">{cap}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'integration' && (
          <motion.div
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2.5"
          >
            {/* Emits */}
            <div>
              <span className="text-[9px] font-mono text-purple-400 uppercase block font-bold">
                Emits Events
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {card.emits?.map((evt, i) => (
                  <span 
                    key={i} 
                    className="text-[9.5px] font-mono px-1.5 py-0.5 bg-purple-950/45 text-purple-300 rounded border border-purple-500/30 font-semibold"
                  >
                    {evt}
                  </span>
                ))}
              </div>
            </div>

            {/* Platform Services Used */}
            <div className="pt-1.5 border-t border-neutral-900/60">
              <span className="text-[9px] font-mono text-cyan-400 block font-bold uppercase">
                Platform Services Used
              </span>
              <div className="flex flex-wrap gap-1 mt-0.5">
                {card.servicesUsed?.map((svc, i) => (
                  <span 
                    key={i} 
                    className="text-[9px] font-sans px-1.5 py-0.5 bg-cyan-950/20 text-cyan-300 rounded border border-cyan-900/40"
                  >
                    {svc}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Card Footer: Domain Link & Modes */}
      <div className="mt-6 pt-4 border-t border-neutral-900/60 flex items-center justify-between relative z-10">
        <a 
          href={`https://${card.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[9px] font-mono tracking-wider transition-colors duration-200"
          style={{ color: isHovered ? card.color : 'rgba(255, 255, 255, 0.4)' }}
          onClick={(e) => e.stopPropagation()}
        >
          {card.url}
          <Lucide.ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
        </a>

        {/* Mini indicator representing Event Bus vs Pipeline flow */}
        <span className="text-[8px] font-mono uppercase bg-neutral-900 px-1.5 py-0.5 rounded border border-neutral-800 text-neutral-500">
          {viewMode === 'pipeline' ? 'PIPELINE' : 'EVENT_BUS'}
        </span>
      </div>
    </motion.div>
  );
}
