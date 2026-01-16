import React from 'react';

interface PitchSVGProps {
  className?: string;
}

export const PitchSVG: React.FC<PitchSVGProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 140 100"
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Pitch Background */}
      <rect x="0" y="0" width="140" height="100" fill="url(#pitchGradient)" />
      
      {/* Grass pattern stripes - horizontal */}
      {[...Array(14)].map((_, i) => (
        <rect
          key={i}
          x={i * 10}
          y="0"
          width="10"
          height="100"
          fill={i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)'}
        />
      ))}
      
      {/* Outer boundary */}
      <rect
        x="3"
        y="3"
        width="134"
        height="94"
        className="pitch-lines"
        rx="1"
      />
      
      {/* Center line */}
      <line x1="70" y1="3" x2="70" y2="97" className="pitch-lines" />
      
      {/* Center circle */}
      <circle cx="70" cy="50" r="12" className="pitch-lines" />
      <circle cx="70" cy="50" r="0.8" fill="hsl(142 50% 70%)" />
      
      {/* Left penalty area */}
      <rect x="3" y="20" width="22" height="60" className="pitch-lines" />
      
      {/* Left goal area */}
      <rect x="3" y="32" width="8" height="36" className="pitch-lines" />
      
      {/* Left penalty spot */}
      <circle cx="17" cy="50" r="0.8" fill="hsl(142 50% 70%)" />
      
      {/* Left penalty arc */}
      <path
        d="M 25 35 A 12 12 0 0 1 25 65"
        className="pitch-lines"
      />
      
      {/* Right penalty area */}
      <rect x="115" y="20" width="22" height="60" className="pitch-lines" />
      
      {/* Right goal area */}
      <rect x="129" y="32" width="8" height="36" className="pitch-lines" />
      
      {/* Right penalty spot */}
      <circle cx="123" cy="50" r="0.8" fill="hsl(142 50% 70%)" />
      
      {/* Right penalty arc */}
      <path
        d="M 115 35 A 12 12 0 0 0 115 65"
        className="pitch-lines"
      />
      
      {/* Corner arcs */}
      <path d="M 6 3 A 3 3 0 0 0 3 6" className="pitch-lines" />
      <path d="M 3 94 A 3 3 0 0 0 6 97" className="pitch-lines" />
      <path d="M 134 3 A 3 3 0 0 1 137 6" className="pitch-lines" />
      <path d="M 137 94 A 3 3 0 0 1 134 97" className="pitch-lines" />
      
      {/* Goal nets - left */}
      <g>
        <rect x="0" y="36" width="3" height="28" fill="rgba(0,0,0,0.3)" stroke="hsl(142 50% 70%)" strokeWidth="0.3" />
        {[...Array(7)].map((_, i) => (
          <line key={`left-h-${i}`} x1="0" y1={38 + i * 4} x2="3" y2={38 + i * 4} stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        ))}
        <line x1="1" y1="36" x2="1" y2="64" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        <line x1="2" y1="36" x2="2" y2="64" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
      </g>
      
      {/* Goal nets - right */}
      <g>
        <rect x="137" y="36" width="3" height="28" fill="rgba(0,0,0,0.3)" stroke="hsl(142 50% 70%)" strokeWidth="0.3" />
        {[...Array(7)].map((_, i) => (
          <line key={`right-h-${i}`} x1="137" y1={38 + i * 4} x2="140" y2={38 + i * 4} stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        ))}
        <line x1="138" y1="36" x2="138" y2="64" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
        <line x1="139" y1="36" x2="139" y2="64" stroke="hsl(142 50% 70%)" strokeWidth="0.15" opacity="0.6" />
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
