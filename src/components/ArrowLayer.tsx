import React from 'react';
import { Arrow } from '@/types/tactics';

interface ArrowLayerProps {
  arrows: Arrow[];
  currentArrow: { startX: number; startY: number; endX: number; endY: number } | null;
  arrowType: 'pass' | 'run';
  onDeleteArrow: (id: string) => void;
}

export const ArrowLayer: React.FC<ArrowLayerProps> = ({
  arrows,
  currentArrow,
  arrowType,
  onDeleteArrow,
}) => {
  const getArrowColor = (type: 'pass' | 'run') => {
    return type === 'pass' ? '#FBBF24' : '#22D3EE'; // Yellow for pass, cyan for run
  };

  // Calculate control point for quadratic Bézier curve
  const getControlPoint = (startX: number, startY: number, endX: number, endY: number) => {
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;
    
    // Calculate perpendicular offset for curve
    const dx = endX - startX;
    const dy = endY - startY;
    const length = Math.sqrt(dx * dx + dy * dy);
    
    // Curve intensity based on distance (longer arrows = more curve)
    const curveIntensity = Math.min(length * 0.15, 12);
    
    // Perpendicular direction (rotate 90 degrees)
    const perpX = -dy / length;
    const perpY = dx / length;
    
    return {
      x: midX + perpX * curveIntensity,
      y: midY + perpY * curveIntensity,
    };
  };

  const renderArrow = (
    startX: number,
    startY: number,
    endX: number,
    endY: number,
    type: 'pass' | 'run',
    id?: string
  ) => {
    const color = getArrowColor(type);
    const isDashed = type === 'run';
    const markerId = id ? `arrowhead-${id}` : 'arrowhead-current';
    
    const control = getControlPoint(startX, startY, endX, endY);
    
    // Create curved path using quadratic Bézier
    const pathD = `M ${startX} ${startY} Q ${control.x} ${control.y} ${endX} ${endY}`;

    return (
      <g key={id || 'current'}>
        <defs>
          <marker
            id={markerId}
            markerWidth="10"
            markerHeight="7"
            refX="9"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={color} />
          </marker>
        </defs>
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={isDashed ? '8 4' : 'none'}
          markerEnd={`url(#${markerId})`}
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        />
        {id && (
          <circle
            cx={control.x}
            cy={control.y}
            r="8"
            fill="transparent"
            className="cursor-pointer hover:fill-red-500/30"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteArrow(id);
            }}
          />
        )}
      </g>
    );
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <g className="pointer-events-auto">
        {arrows.map((arrow) =>
          renderArrow(arrow.startX, arrow.startY, arrow.endX, arrow.endY, arrow.type, arrow.id)
        )}
        {currentArrow &&
          renderArrow(
            currentArrow.startX,
            currentArrow.startY,
            currentArrow.endX,
            currentArrow.endY,
            arrowType
          )}
      </g>
    </svg>
  );
};
