import React, { useState } from 'react';
import { SimulationData, Timeline, TimelineEvent } from '../types';

interface MultiverseGraphProps {
  data: SimulationData;
  onEventClick: (event: TimelineEvent, theme: string) => void;
  theme: 'cyberpunk' | 'minimalist';
}

export const MultiverseGraph: React.FC<MultiverseGraphProps> = ({ data, onEventClick, theme }) => {
  const [hoveredNode, setHoveredNode] = useState<{
    event: TimelineEvent;
    x: number;
    y: number;
    themeColor: string;
  } | null>(null);

  const isCyber = theme === 'cyberpunk';

  // SVG Configuration
  const width = 1000;
  const height = 600;
  const padding = 50;
  const startX = 50;
  const startY = height / 2;
  
  // Theme configurations
  const getThemeColor = (timelineTheme: string) => {
    switch (timelineTheme) {
      case 'Safe': return isCyber ? '#3b82f6' : '#60a5fa'; // Blue
      case 'Risk': return isCyber ? '#8b5cf6' : '#a78bfa'; // Purple
      case 'Chaos': return isCyber ? '#ef4444' : '#f87171'; // Red
      default: return '#fff';
    }
  };

  const getThemeYOffset = (index: number) => {
    // Spread the timelines out: Safe (Top), Risk (Middle), Chaos (Bottom)
    const spread = 150;
    if (index === 0) return -spread; // Up
    if (index === 1) return 0;       // Straight
    if (index === 2) return spread;  // Down
    return 0;
  };

  // Generate paths and points
  const renderTimeline = (timeline: Timeline, index: number) => {
    const color = getThemeColor(timeline.theme);
    const yOffset = getThemeYOffset(index);
    const endY = startY + yOffset;
    
    // Path definition: Cubic Bezier from start to end
    // First segment: Split from origin
    const splitPointX = 200;
    
    const pathD = `
      M ${startX} ${startY}
      C ${startX + 100} ${startY}, ${splitPointX - 50} ${endY}, ${splitPointX} ${endY}
      L ${width - padding} ${endY}
    `;

    // Determine gradient based on theme
    const gradientUrl = timeline.theme === 'Safe' ? 'url(#blueGradient)' :
                        timeline.theme === 'Risk' ? 'url(#purpleGradient)' :
                        'url(#redGradient)';

    return (
      <g key={timeline.id}>
        {/* Glow Filter Def for this color - Only active in Cyberpunk mode or if we want soft glow in minimal */}
        {isCyber && (
          <defs>
            <filter id={`glow-${timeline.id}`}>
              <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        )}

        {/* The Line with gradient */}
        <path
          d={pathD}
          fill="none"
          stroke={gradientUrl}
          strokeWidth={isCyber ? "3" : "2"}
          strokeOpacity={isCyber ? "0.7" : "0.9"}
          filter={isCyber ? `url(#glow-${timeline.id})` : undefined}
          className="animate-draw-line"
          style={{
            strokeDasharray: 2000,
            strokeDashoffset: 0,
            animation: 'dash 2s ease-out forwards'
          }}
        />

        {/* Animated flow particles along path */}
        {isCyber && (
          <>
            <circle r="3" fill={color} opacity="0.8">
              <animateMotion dur="4s" repeatCount="indefinite" path={pathD} />
            </circle>
            <circle r="2" fill="white" opacity="0.6">
              <animateMotion dur="4s" repeatCount="indefinite" path={pathD} begin="1s" />
            </circle>
            <circle r="2.5" fill={color} opacity="0.7">
              <animateMotion dur="4s" repeatCount="indefinite" path={pathD} begin="2s" />
            </circle>
          </>
        )}

        {/* Timeline Label with background */}
        <g style={{ 
          opacity: 0,
          animation: `fadeIn 0.5s ease-out forwards 1.8s`
        }}>
          <rect
            x={width - padding + 5}
            y={endY - 12}
            width={60}
            height={20}
            rx="4"
            fill={color}
            opacity="0.2"
          />
          <text
            x={width - padding + 35}
            y={endY + 3}
            textAnchor="middle"
            fill={color}
            className={`text-xs font-bold uppercase ${isCyber ? '' : 'font-sans'}`}
          >
            {timeline.theme}
          </text>
        </g>

        {/* Event Nodes */}
        {timeline.events.map((event, i) => {
          const totalEvents = timeline.events.length;
          // Distribute events along the straight part of the line
          const lineLength = (width - padding) - splitPointX;
          const step = lineLength / (totalEvents + 1);
          const cx = splitPointX + (step * (i + 1));
          const cy = endY;
          
          const isHovered = hoveredNode?.event === event;

          return (
            <g 
              key={`${timeline.id}-${event.year}`}
              onClick={() => onEventClick(event, timeline.theme)}
              onMouseEnter={() => setHoveredNode({ event, x: cx, y: cy, themeColor: color })}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              style={{
                opacity: 0,
                transformBox: 'fill-box',
                transformOrigin: 'center',
                animation: `popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards ${0.5 + (i * 0.3)}s`
              }}
            >
              {/* Outer glow ring when hovered */}
              {isHovered && (
                <circle
                  cx={cx}
                  cy={cy}
                  r="16"
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  opacity="0.5"
                  className="animate-ping"
                />
              )}
              
              {/* Main event node */}
              <circle
                cx={cx}
                cy={cy}
                r="6"
                // Change fill to white on hover
                fill={isHovered ? "#ffffff" : (isCyber ? "#0a0a0a" : "#18181b")}
                stroke={color}
                // Keep strokeWidth constant so scaling handles the visual thickness increase naturally
                strokeWidth={2}
                filter={isHovered && isCyber ? "url(#glow-strong)" : undefined}
                className="transition-all duration-300 ease-out"
                style={{
                  transformOrigin: 'center',
                  transformBox: 'fill-box',
                  // Scale up to 1.5x on hover for visual feedback
                  transform: isHovered ? 'scale(1.5)' : 'scale(1)'
                }}
              />
              
              {/* Inner highlight */}
              <circle
                cx={cx}
                cy={cy}
                r="3"
                fill={color}
                opacity={isHovered ? "0.8" : "0.3"}
                className="transition-opacity duration-300"
                style={{
                  transformOrigin: 'center',
                  transformBox: 'fill-box',
                  transform: isHovered ? 'scale(1.5)' : 'scale(1)'
                }}
              />
              
              {/* Year Label */}
              <text
                x={cx}
                y={cy - 25}
                textAnchor="middle"
                fill={color}
                fontSize="11"
                fontWeight={isHovered ? "bold" : "normal"}
                className={`transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-60'} ${isCyber ? '' : 'font-sans'}`}
              >
                {event.year}
              </text>
            </g>
          );
        })}
      </g>
    );
  };

  return (
    <div className="relative w-full">
      {/* Hover Tooltip - Outside SVG for better positioning */}
      {hoveredNode && (
        <div 
          className={`absolute z-50 pointer-events-none transition-all duration-200 ease-out
            ${isCyber ? 'font-mono' : 'font-sans'}`}
          style={{
            left: `${hoveredNode.x}px`,
            top: `${hoveredNode.y - 120}px`,
            transform: 'translate(-50%, 0)',
            animation: 'tooltipFloat 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
          }}
        >
          <div className={`relative px-4 py-3 rounded-lg border backdrop-blur-xl shadow-2xl
            ${isCyber 
              ? 'bg-black/95 border-gray-700' 
              : 'bg-zinc-900/95 border-zinc-700'}`}
            style={{ 
              borderColor: hoveredNode.themeColor,
              boxShadow: `0 0 20px ${hoveredNode.themeColor}40`
            }}
          >
            {/* Decorative corner accents */}
            {isCyber && (
              <>
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: hoveredNode.themeColor }} />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: hoveredNode.themeColor }} />
              </>
            )}
            
            {/* Content */}
            <div className="space-y-2 min-w-[200px]">
              <p className="text-white text-sm font-bold leading-tight">
                {hoveredNode.event.title}
              </p>
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center gap-1">
                  <span className={isCyber ? 'text-gray-400' : 'text-zinc-400'}>😊</span>
                  <span className={hoveredNode.event.happiness > 50 ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                    {hoveredNode.event.happiness}%
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className={isCyber ? 'text-gray-400' : 'text-zinc-400'}>💰</span>
                  <span className="text-yellow-400 font-semibold">
                    {hoveredNode.event.wealth}%
                  </span>
                </div>
              </div>
            </div>
            
            {/* Arrow pointing to node */}
            <div 
              className="absolute left-1/2 -bottom-2 w-3 h-3 transform -translate-x-1/2 rotate-45"
              style={{ 
                backgroundColor: isCyber ? '#0a0a0a' : '#18181b',
                borderRight: `1px solid ${hoveredNode.themeColor}`,
                borderBottom: `1px solid ${hoveredNode.themeColor}`
              }}
            />
          </div>
        </div>
      )}

      <div className={`w-full overflow-x-auto border rounded-xl p-6 relative transition-all duration-500
        ${isCyber 
          ? 'border-gray-800 bg-gradient-to-br from-black via-gray-950 to-black shadow-[0_0_50px_rgba(139,92,246,0.1)]' 
          : 'border-zinc-800 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 shadow-xl'}`}>
        
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 rounded-full ${isCyber ? 'bg-purple-500' : 'bg-blue-500'}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3,
                animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        
        {/* Header with enhanced styling */}
        <div className="absolute top-4 left-6 flex items-center gap-3 z-10">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isCyber ? 'bg-green-500' : 'bg-blue-500'}`} />
          <h3 className={`text-xs uppercase tracking-widest font-semibold
            ${isCyber ? 'text-green-500/70' : 'text-zinc-500'}`}>
            Multiverse Visualization
          </h3>
        </div>

        {/* Timeline Legend */}
        <div className="absolute top-4 right-6 flex items-center gap-4 text-xs z-10">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            <span className={isCyber ? 'text-blue-400' : 'text-blue-300'}>Safe</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-purple-500"></div>
            <span className={isCyber ? 'text-purple-400' : 'text-purple-300'}>Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-red-500"></div>
            <span className={isCyber ? 'text-red-400' : 'text-red-300'}>Chaos</span>
          </div>
        </div>

        {/* Statistics Dashboard */}
        <div className="absolute bottom-4 left-6 flex items-center gap-6 text-xs z-10">
          <div className={`flex flex-col ${isCyber ? 'text-green-400' : 'text-blue-400'}`}>
            <span className="opacity-60">Timelines</span>
            <span className="text-lg font-bold">{data.timelines.length}</span>
          </div>
          <div className={`flex flex-col ${isCyber ? 'text-purple-400' : 'text-purple-300'}`}>
            <span className="opacity-60">Events</span>
            <span className="text-lg font-bold">
              {data.timelines.reduce((sum, t) => sum + t.events.length, 0)}
            </span>
          </div>
          <div className={`flex flex-col ${isCyber ? 'text-yellow-400' : 'text-yellow-300'}`}>
            <span className="opacity-60">Avg Happiness</span>
            <span className="text-lg font-bold">
              {Math.round(
                data.timelines.reduce((sum, t) => 
                  sum + t.events.reduce((s, e) => s + e.happiness, 0) / t.events.length, 0
                ) / data.timelines.length
              )}%
            </span>
          </div>
        </div>
        
        <svg 
          width="100%" 
          height="100%" 
          viewBox={`0 0 ${width} ${height}`}
          className="min-w-[800px]"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#3b82f6', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#60a5fa', stopOpacity: 0.8 }} />
            </linearGradient>
            <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8b5cf6', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#a78bfa', stopOpacity: 0.8 }} />
            </linearGradient>
            <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#ef4444', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#f87171', stopOpacity: 0.8 }} />
            </linearGradient>
            
            {/* Enhanced Glow Filters */}
            <filter id="glow-origin">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            <filter id="glow-strong">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
        {/* Origin Node */}
        <g filter={isCyber ? "url(#glow-origin)" : undefined}>
          <circle cx={startX} cy={startY} r="12" fill="white" className="animate-pulse" />
          <circle cx={startX} cy={startY} r="20" fill="none" stroke="white" strokeWidth="1" opacity="0.3" className="animate-ping" />
          <circle cx={startX} cy={startY} r="30" fill="none" stroke="white" strokeWidth="0.5" opacity="0.2" className="animate-ping" style={{ animationDelay: '0.5s' }} />
        </g>
        <text x={startX} y={startY + 35} textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" className={isCyber ? '' : 'font-sans'}>ORIGIN</text>

        {data.timelines.map((t, i) => renderTimeline(t, i))}
      </svg>

      <style>{`
        @keyframes dash {
          from { stroke-dashoffset: 2000; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes tooltipFloat {
          from { 
            opacity: 0; 
            transform: translate(-50%, 10px) scale(0.9); 
          }
          to { 
            opacity: 1; 
            transform: translate(-50%, 0) scale(1); 
          }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-5px, -20px); }
          75% { transform: translate(-10px, -5px); }
        }
        @keyframes ping {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.5); opacity: 0.4; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
      </div>
    </div>
  );
};