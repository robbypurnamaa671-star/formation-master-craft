import React, { useRef } from 'react';
import { motion, useDragControls } from 'framer-motion';
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
  const dragControls = useDragControls();

  const handleDrag = (event: any, info: any) => {
    // Constrain during drag visually if needed
  };

  const handleDragEnd = (event: any, info: any) => {
    if (!containerRef.current || !tokenRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const token = tokenRef.current.getBoundingClientRect();
    
    // Get the center of the token after drag
    const tokenCenterX = token.left + token.width / 2;
    const tokenCenterY = token.top + token.height / 2;
    
    // Calculate position as percentage relative to container
    const newX = ((tokenCenterX - container.left) / container.width) * 100;
    const newY = ((tokenCenterY - container.top) / container.height) * 100;
    
    // Clamp values between 5% and 95% to keep players within the pitch boundary
    const clampedX = Math.max(5, Math.min(95, newX));
    const clampedY = Math.max(5, Math.min(95, newY));
    
    onDragEnd(player.id, clampedX, clampedY);
  };

  return (
    <motion.div
      ref={tokenRef}
      className={`player-jersey absolute touch-none select-none ${isSelected ? 'ring-2 ring-accent ring-offset-2 ring-offset-transparent' : ''}`}
      style={{
        left: `${player.x}%`,
        top: `${player.y}%`,
        backgroundColor: player.color,
        color: player.textColor,
        x: '-50%',
        y: '-50%',
        zIndex: isSelected ? 20 : 10,
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0}
      dragMomentum={false}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(player);
      }}
      whileDrag={{ 
        scale: 1.15, 
        boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
        zIndex: 30,
      }}
      whileTap={{ scale: 1.05 }}
    >
      <span className="font-bold select-none pointer-events-none" style={{ fontSize: '10px' }}>
        {player.number}
      </span>
      
      {/* Player name label */}
      <div 
        className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 text-[8px] font-medium whitespace-nowrap px-0.5 py-0.5 rounded bg-background/80 text-foreground pointer-events-none select-none"
      >
        {player.name}
      </div>
    </motion.div>
  );
};
