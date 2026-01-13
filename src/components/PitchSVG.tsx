import React from 'react';

interface PitchSVGProps {
  className?: string;
}

export const PitchSVG: React.FC<PitchSVGProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 140"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Pitch Background */}
      <rect x="0" y="0" width="100" height="140" fill="url(#pitchGradient)" />
      
      {/* Grass pattern stripes */}
      {[...Array(14)].map((_, i) => (
        <rect
          key={i}
          x="0"
          y={i * 10}
          width="100"
          height="10"
          fill={i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
        />
      ))}
      
      {/* Outer boundary */}
      <rect
        x="3"
        y="3"
        width="94"
        height="134"
        className="pitch-lines"
        rx="1"
      />
      
      {/* Center line */}
      <line x1="3" y1="70" x2="97" y2="70" className="pitch-lines" />
      
      {/* Center circle */}
      <circle cx="50" cy="70" r="12" className="pitch-lines" />
      <circle cx="50" cy="70" r="0.8" fill="hsl(142 50% 70%)" />
      
      {/* Top penalty area */}
      <rect x="20" y="3" width="60" height="22" className="pitch-lines" />
      
      {/* Top goal area */}
      <rect x="32" y="3" width="36" height="8" className="pitch-lines" />
      
      {/* Top penalty spot */}
      <circle cx="50" cy="17" r="0.8" fill="hsl(142 50% 70%)" />
      
      {/* Top penalty arc */}
      <path
        d="M 35 25 A 12 12 0 0 0 65 25"
        className="pitch-lines"
      />
      
      {/* Bottom penalty area */}
      <rect x="20" y="115" width="60" height="22" className="pitch-lines" />
      
      {/* Bottom goal area */}
      <rect x="32" y="129" width="36" height="8" className="pitch-lines" />
      
      {/* Bottom penalty spot */}
      <circle cx="50" cy="123" r="0.8" fill="hsl(142 50% 70%)" />
      
      {/* Bottom penalty arc */}
      <path
        d="M 35 115 A 12 12 0 0 1 65 115"
        className="pitch-lines"
      />
      
      {/* Corner arcs */}
      <path d="M 3 6 A 3 3 0 0 0 6 3" className="pitch-lines" />
      <path d="M 94 3 A 3 3 0 0 0 97 6" className="pitch-lines" />
      <path d="M 3 134 A 3 3 0 0 1 6 137" className="pitch-lines" />
      <path d="M 94 137 A 3 3 0 0 1 97 134" className="pitch-lines" />
      
      {/* Goal nets - top */}
      <g>
        <rect x="36" y="0" width="28" height="3" fill="rgba(0,0,0,0.3)" stroke="hsl(142 50% 70%)" strokeWidth="0.3" />
        {/* Net pattern - top */}
        {[...Array(7)].map((_, i) => (
          <line key={`top-v-${i}`} x1={38 + i * 4} y1="0" x2={38 + i * 4} y2="3" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        ))}
        <line x1="36" y1="1" x2="64" y2="1" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        <line x1="36" y1="2" x2="64" y2="2" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
      </g>
      
      {/* Goal nets - bottom */}
      <g>
        <rect x="36" y="137" width="28" height="3" fill="rgba(0,0,0,0.3)" stroke="hsl(142 50% 70%)" strokeWidth="0.3" />
        {/* Net pattern - bottom */}
        {[...Array(7)].map((_, i) => (
          <line key={`bot-v-${i}`} x1={38 + i * 4} y1="137" x2={38 + i * 4} y2="140" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        ))}
        <line x1="36" y1="138" x2="64" y2="138" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        <line x1="36" y1="139" x2="64" y2="139" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
      </g>
      
      <defs>
        <linearGradient id="pitchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="hsl(142 76% 28%)" />
          <stop offset="50%" stopColor="hsl(142 70% 32%)" />
          <stop offset="100%" stopColor="hsl(142 76% 28%)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
