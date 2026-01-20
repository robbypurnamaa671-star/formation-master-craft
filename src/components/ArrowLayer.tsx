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
        <line
          x1={`${startX}%`}
          y1={`${startY}%`}
          x2={`${endX}%`}
          y2={`${endY}%`}
          stroke={color}
          strokeWidth="3"
          strokeDasharray={isDashed ? '8 4' : 'none'}
          markerEnd={`url(#${markerId})`}
          className="drop-shadow-md"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        />
        {id && (
          <circle
            cx={`${(startX + endX) / 2}%`}
            cy={`${(startY + endY) / 2}%`}
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
