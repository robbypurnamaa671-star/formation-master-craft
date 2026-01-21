import React from 'react';
import { Zone, ZoneColor } from '@/types/tactics';

interface ZoneLayerProps {
  zones: Zone[];
  currentZone: { x: number; y: number; width: number; height: number } | null;
  zoneColor: ZoneColor;
  onDeleteZone: (id: string) => void;
}

const getZoneColorValue = (color: ZoneColor) => {
  switch (color) {
    case 'red': return 'rgba(239, 68, 68, 0.35)';
    case 'blue': return 'rgba(59, 130, 246, 0.35)';
    case 'green': return 'rgba(34, 197, 94, 0.35)';
    case 'yellow': return 'rgba(250, 204, 21, 0.35)';
  }
};

const getZoneBorderColor = (color: ZoneColor) => {
  switch (color) {
    case 'red': return '#EF4444';
    case 'blue': return '#3B82F6';
    case 'green': return '#22C55E';
    case 'yellow': return '#FACC15';
  }
};

export const ZoneLayer: React.FC<ZoneLayerProps> = ({
  zones,
  currentZone,
  zoneColor,
  onDeleteZone,
}) => {
  const renderZone = (
    x: number,
    y: number,
    width: number,
    height: number,
    color: ZoneColor,
    id?: string
  ) => {
    // Normalize coordinates (handle negative width/height from dragging backwards)
    const normalizedX = width < 0 ? x + width : x;
    const normalizedY = height < 0 ? y + height : y;
    const normalizedWidth = Math.abs(width);
    const normalizedHeight = Math.abs(height);

    return (
      <g key={id || 'current'}>
        <rect
          x={normalizedX}
          y={normalizedY}
          width={normalizedWidth}
          height={normalizedHeight}
          fill={getZoneColorValue(color)}
          stroke={getZoneBorderColor(color)}
          strokeWidth="0.5"
          strokeDasharray="2 1"
          rx="1"
        />
        {id && (
          <circle
            cx={normalizedX + normalizedWidth / 2}
            cy={normalizedY + normalizedHeight / 2}
            r="3"
            fill="transparent"
            className="cursor-pointer hover:fill-red-500/50"
            onClick={(e) => {
              e.stopPropagation();
              onDeleteZone(id);
            }}
          />
        )}
      </g>
    );
  };

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 2 }}
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <g className="pointer-events-auto">
        {zones.map((zone) =>
          renderZone(zone.x, zone.y, zone.width, zone.height, zone.color, zone.id)
        )}
        {currentZone &&
          renderZone(
            currentZone.x,
            currentZone.y,
            currentZone.width,
            currentZone.height,
            zoneColor
          )}
      </g>
    </svg>
  );
};
