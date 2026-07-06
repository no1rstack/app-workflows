import React, { useEffect, useState, useRef } from 'react';

interface ConnectionLayerProps {
  hoveredCardId: string | null;
  hoveredServiceId: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  viewMode: 'pipeline' | 'eventbus';
}

interface PathData {
  id: string;
  color: string;
  path: string;
  glowColor: string;
  isSecondary?: boolean;
  label?: string;
  midX?: number;
  midY?: number;
}

export default function ConnectionLayer({
  hoveredCardId,
  hoveredServiceId,
  containerRef,
  viewMode,
}: ConnectionLayerProps) {
  const [paths, setPaths] = useState<PathData[]>([]);
  const requestRef = useRef<number | null>(null);

  const calculatePaths = () => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newPaths: PathData[] = [];

    // Helper to get center coordinates of an element relative to container
    const getElCoords = (id: string, anchor: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'center') => {
      const el = document.getElementById(id);
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const x = rect.left - containerRect.left;
      const y = rect.top - containerRect.top;

      switch (anchor) {
        case 'left':
          return { x, y: y + rect.height / 2 };
        case 'right':
          return { x: x + rect.width, y: y + rect.height / 2 };
        case 'top':
          return { x: x + rect.width / 2, y };
        case 'bottom':
          return { x: x + rect.width / 2, y: y + rect.height };
        default:
          return { x: x + rect.width / 2, y: y + rect.height / 2 };
      }
    };

    // Card details map
    const cards = [
      { id: 'cascades', color: '#22c55e', glowColor: 'rgba(34, 197, 94, 0.5)' },
      { id: 'judicium', color: '#a855f7', glowColor: 'rgba(168, 85, 247, 0.5)' },
      { id: 'wordmaker', color: '#10b981', glowColor: 'rgba(16, 185, 129, 0.5)' },
      { id: 'hexarch', color: '#3b82f6', glowColor: 'rgba(59, 130, 246, 0.5)' },
      { id: 'aitracer', color: '#14b8a6', glowColor: 'rgba(20, 184, 166, 0.5)' },
      { id: 'ledgerbill', color: '#f97316', glowColor: 'rgba(249, 115, 22, 0.5)' },
      { id: 'noirai', color: '#eab308', glowColor: 'rgba(234, 179, 8, 0.5)' },
    ];

    if (viewMode === 'pipeline') {
      // MODE 1: SEQUENTIAL PIPELINE STORY
      // Sources on Left -> Cascades -> Judicium -> WordMaker -> Hexarch -> AiTracer -> Ledgerbill -> Noirai -> Outputs on Right
      
      // 1. Ingestion sources to Cascades
      const sourcesPanel = document.getElementById('data-sources-panel');
      const cascadesCoords = getElCoords('card-cascades', 'left');

      if (sourcesPanel && cascadesCoords) {
        const sourcesRect = sourcesPanel.getBoundingClientRect();
        const startX = sourcesRect.right - containerRect.left;
        const panelHeight = sourcesRect.height;
        
        // Draw 3 beautiful branching fibers from sources panel to Cascades Left port
        for (let i = 0; i < 3; i++) {
          const startY = sourcesRect.top - containerRect.top + (panelHeight / 4) * (i + 1);
          const midX = (startX + cascadesCoords.x) / 2;
          const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${cascadesCoords.y}, ${cascadesCoords.x} ${cascadesCoords.y}`;
          
          // Midpoint logic
          const midPointX = 0.5 * startX + 0.5 * cascadesCoords.x;
          const midPointY = 0.5 * startY + 0.5 * cascadesCoords.y;

          newPaths.push({
            id: `source-branch-${i}`,
            color: '#06b6d4',
            glowColor: 'rgba(6, 182, 212, 0.3)',
            path,
            midX: midPointX,
            midY: midPointY,
          });
        }
      }

      // 2. Sequential connections between cards with labels
      const sequence = ['cascades', 'judicium', 'wordmaker', 'hexarch', 'aitracer', 'ledgerbill', 'noirai'];
      const labels = [
        "Investigation Created", // cascades -> judicium
        "Entities Resolved",      // judicium -> wordmaker
        "Compiled Report PDF",   // wordmaker -> hexarch
        "Signed Proof Anchored", // hexarch -> aitracer
        "Usage Telemetry",       // aitracer -> ledgerbill
        "Operational Metrics",   // ledgerbill -> noirai
      ];

      for (let i = 0; i < sequence.length - 1; i++) {
        const cardA = sequence[i];
        const cardB = sequence[i + 1];
        
        let anchorA: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'bottom';
        let anchorB: 'center' | 'left' | 'right' | 'top' | 'bottom' = 'top';

        if (cardA === 'cascades' && cardB === 'judicium') {
          anchorA = 'right'; anchorB = 'left';
        } else if (cardA === 'judicium' && cardB === 'wordmaker') {
          anchorA = 'bottom'; anchorB = 'top';
        } else if (cardA === 'wordmaker' && cardB === 'hexarch') {
          anchorA = 'right'; anchorB = 'left';
        } else if (cardA === 'hexarch' && cardB === 'aitracer') {
          anchorA = 'bottom'; anchorB = 'top';
        } else if (cardA === 'aitracer' && cardB === 'ledgerbill') {
          anchorA = 'right'; anchorB = 'left';
        } else if (cardA === 'ledgerbill' && cardB === 'noirai') {
          anchorA = 'bottom'; anchorB = 'top';
        }

        const coordsA = getElCoords(`card-${cardA}`, anchorA);
        const coordsB = getElCoords(`card-${cardB}`, anchorB);

        if (coordsA && coordsB) {
          // Calculate Cubic Bezier Control Points
          let cx1 = coordsA.x;
          let cy1 = coordsA.y;
          let cx2 = coordsB.x;
          let cy2 = coordsB.y;

          if (anchorA === 'right' && anchorB === 'left') {
            cx1 = coordsA.x + 80;
            cy1 = coordsA.y;
            cx2 = coordsB.x - 80;
            cy2 = coordsB.y;
          } else {
            const midY = (coordsA.y + coordsB.y) / 2;
            cx1 = coordsA.x;
            cy1 = midY;
            cx2 = coordsB.x;
            cy2 = midY;
          }

          const path = `M ${coordsA.x} ${coordsA.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${coordsB.x} ${coordsB.y}`;
          
          // Midpoint calculated at t=0.5
          const midX = 0.125 * coordsA.x + 0.375 * cx1 + 0.375 * cx2 + 0.125 * coordsB.x;
          const midY = 0.125 * coordsA.y + 0.375 * cy1 + 0.375 * cy2 + 0.125 * coordsB.y;

          const matchingCard = cards.find(c => c.id === cardA);
          newPaths.push({
            id: `pipeline-flow-${cardA}-to-${cardB}`,
            color: matchingCard?.color || '#a855f7',
            glowColor: matchingCard?.glowColor || 'rgba(168, 85, 247, 0.4)',
            path,
            label: labels[i],
            midX,
            midY,
          });
        }
      }

      // 3. NoirAi to Outputs Column
      const outputsPanel = document.getElementById('outputs-created-panel');
      const noiraiCoords = getElCoords('card-noirai', 'right');

      if (outputsPanel && noiraiCoords) {
        const outputsRect = outputsPanel.getBoundingClientRect();
        const endX = outputsRect.left - containerRect.left;
        const panelHeight = outputsRect.height;

        // Draw 3 branching deliverable outputs lines
        for (let i = 0; i < 3; i++) {
          const endY = outputsRect.top - containerRect.top + (panelHeight / 4) * (i + 1);
          const midX = (noiraiCoords.x + endX) / 2;
          const path = `M ${noiraiCoords.x} ${noiraiCoords.y} C ${midX} ${noiraiCoords.y}, ${midX} ${endY}, ${endX} ${endY}`;
          
          const midPointX = 0.5 * noiraiCoords.x + 0.5 * endX;
          const midPointY = 0.5 * noiraiCoords.y + 0.5 * endY;

          newPaths.push({
            id: `output-branch-${i}`,
            color: '#a855f7',
            glowColor: 'rgba(168, 85, 247, 0.3)',
            path,
            midX: midPointX,
            midY: midPointY,
          });
        }
      }

    } else {
      // MODE 2: EVENT BUS HUB / CONTROL PLANE ARCHITECTURE
      // All cards connecting to the central Control Plane Hub (ControlPlane centerpiece)
      const cpElement = document.getElementById('control-plane');
      if (cpElement) {
        const cpRect = cpElement.getBoundingClientRect();
        const cpX = cpRect.left - containerRect.left + cpRect.width / 2;
        const cpY = cpRect.top - containerRect.top + cpRect.height / 2;

        cards.forEach((card) => {
          const coords = getElCoords(`card-${card.id}`, 'center');
          if (coords) {
            const midY = (coords.y + cpY) / 2;
            const path = `M ${coords.x} ${coords.y} C ${coords.x} ${midY}, ${cpX} ${midY}, ${cpX} ${cpY}`;
            
            const midPointX = 0.5 * coords.x + 0.5 * cpX;
            const midPointY = 0.5 * coords.y + 0.5 * cpY;

            newPaths.push({
              id: `eventbus-spoke-${card.id}`,
              color: card.color,
              glowColor: card.glowColor,
              path,
              label: `Channel: ${card.id.toUpperCase()}`,
              midX: midPointX,
              midY: midPointY,
            });
          }
        });
      }
    }

    setPaths(newPaths);
  };

  useEffect(() => {
    calculatePaths();

    const handleResize = () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(calculatePaths);
    };

    window.addEventListener('resize', handleResize);
    const timer = setTimeout(calculatePaths, 500);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      clearTimeout(timer);
    };
  }, [containerRef, viewMode, hoveredCardId]);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
      <svg
        id="connection-svg-layer"
        className="absolute inset-0 w-full h-full pointer-events-none"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {paths.map(({ id, color, path, glowColor }) => {
          const isHighlighted = 
            hoveredCardId === id || 
            (id.startsWith('pipeline-flow-') && id.includes(hoveredCardId || '___NONE___')) ||
            (id.startsWith('eventbus-spoke-') && id.includes(hoveredCardId || '___NONE___')) ||
            (id.startsWith('source-branch-') && hoveredCardId === 'cascades') ||
            (id.startsWith('output-branch-') && hoveredCardId === 'noirai');

          const strokeColor = isHighlighted ? color : 'rgba(255, 255, 255, 0.035)';
          const strokeWidth = isHighlighted ? 2.5 : 1.2;

          return (
            <g key={id} className="transition-all duration-500">
              {/* 1. Backdrop glow (only visible when highlighted) */}
              {isHighlighted && (
                <path
                  d={path}
                  fill="none"
                  stroke={color}
                  strokeWidth={strokeWidth + 5}
                  strokeLinecap="round"
                  opacity={0.35}
                  filter="url(#glow)"
                  className="transition-all duration-300"
                />
              )}

              {/* 2. Base static line */}
              <path
                d={path}
                fill="none"
                stroke={strokeColor}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                className="transition-all duration-500"
              />

              {/* 3. Fast Animated Pulse Particle */}
              <path
                d={path}
                fill="none"
                stroke={isHighlighted ? '#ffffff' : color}
                strokeWidth={isHighlighted ? strokeWidth + 0.5 : strokeWidth}
                strokeLinecap="round"
                opacity={isHighlighted ? 0.95 : 0.35}
                strokeDasharray="15 150"
                className="pulse-dash-anim"
              />

              {/* 4. Real Traveling SVG Data Packet Particle */}
              <circle r={isHighlighted ? "3" : "1.5"} fill={isHighlighted ? "#ffffff" : color} opacity={isHighlighted ? 1 : 0.4} filter="url(#glow)">
                <animateMotion 
                  dur={id.includes("branch") ? "2.5s" : "4.5s"} 
                  repeatCount="indefinite" 
                  path={path} 
                  key={`${id}-packet-led`}
                />
              </circle>
            </g>
          );
        })}
      </svg>

      {/* Floating Labels Overlay at path midpoints */}
      {paths.map(({ id, color, label, midX, midY }) => {
        if (!label || midX === undefined || midY === undefined) return null;

        const isHighlighted = 
          hoveredCardId !== null && 
          (id.includes(hoveredCardId) || id === hoveredCardId);

        return (
          <div
            key={`label-${id}`}
            className="absolute transition-all duration-500 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-auto"
            style={{
              left: `${midX}px`,
              top: `${midY}px`,
              zIndex: isHighlighted ? 30 : 20,
              opacity: isHighlighted ? 1 : 0.15,
              scale: isHighlighted ? '1.08' : '0.82',
            }}
          >
            <div
              className="px-2 py-0.5 rounded text-[8px] font-mono tracking-wider font-extrabold uppercase border shadow-2xl backdrop-blur-md transition-all duration-300"
              style={{
                backgroundColor: isHighlighted ? `${color}15` : 'rgba(10, 10, 10, 0.85)',
                borderColor: isHighlighted ? color : 'rgba(255, 255, 255, 0.04)',
                color: isHighlighted ? '#ffffff' : 'rgba(255, 255, 255, 0.35)',
                boxShadow: isHighlighted ? `0 0 14px ${color}30, inset 0 0 5px ${color}20` : 'none',
              }}
            >
              {label}
            </div>
          </div>
        );
      })}
    </div>
  );
}
