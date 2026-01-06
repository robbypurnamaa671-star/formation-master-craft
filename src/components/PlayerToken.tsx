import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@/types/tactics';

interface PlayerTokenProps {
  player: Player;
  containerRef: React.RefObject<HTMLDivElement>;
  onDragEnd: (id: string, x: number, y: number) => void;
  onUpdate: (id: string, updates: Partial<Player>) => void;
  onSelect: (player: Player) => void;
  isSelected: boolean;
}

export const PlayerToken: React.FC<PlayerTokenProps> = ({
  player,
  containerRef,
  onDragEnd,
  onSelect,
  isSelected,
}) => {
  const tokenRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = (event: any, info: any) => {
    if (!containerRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const tokenSize = 44;
    
    // Calculate new position as percentage
    const newX = ((info.point.x - container.left - tokenSize / 2) / container.width) * 100;
    const newY = ((info.point.y - container.top - tokenSize / 2) / container.height) * 100;
    
    // Clamp values between 2% and 98%
    const clampedX = Math.max(2, Math.min(98, newX));
    const clampedY = Math.max(2, Math.min(98, newY));
    
    onDragEnd(player.id, clampedX, clampedY);
  };

  return (
    <motion.div
      ref={tokenRef}
      className={`player-jersey absolute touch-none ${isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-transparent' : ''}`}
      style={{
        left: `${player.x}%`,
        top: `${player.y}%`,
        backgroundColor: player.color,
        color: player.textColor,
        transform: 'translate(-50%, -50%)',
        zIndex: isSelected ? 20 : 10,
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(player);
      }}
      whileDrag={{ scale: 1.15, boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }}
      whileTap={{ scale: 1.05 }}
      layout
    >
      <span className="font-bold text-sm select-none pointer-events-none">
        {player.number}
      </span>
      
      {/* Player name label */}
      <div 
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium whitespace-nowrap px-1 py-0.5 rounded bg-background/80 text-foreground"
        style={{ pointerEvents: 'none' }}
      >
        {player.name}
      </div>
    </motion.div>
  );
};
