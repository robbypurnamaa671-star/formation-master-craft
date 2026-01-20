import React, { useRef } from 'react';
import { motion } from 'framer-motion';

interface BallPosition {
  x: number;
  y: number;
}

interface BallTokenProps {
  position: BallPosition;
  containerRef: React.RefObject<HTMLDivElement>;
  onDragEnd: (x: number, y: number) => void;
}

export const BallToken: React.FC<BallTokenProps> = ({
  position,
  containerRef,
  onDragEnd,
}) => {
  const tokenRef = useRef<HTMLDivElement>(null);

  const handleDragEnd = () => {
    if (!containerRef.current || !tokenRef.current) return;
    
    const container = containerRef.current.getBoundingClientRect();
    const token = tokenRef.current.getBoundingClientRect();
    
    const tokenCenterX = token.left + token.width / 2;
    const tokenCenterY = token.top + token.height / 2;
    
    const newX = ((tokenCenterX - container.left) / container.width) * 100;
    const newY = ((tokenCenterY - container.top) / container.height) * 100;
    
    const clampedX = Math.max(3, Math.min(97, newX));
    const clampedY = Math.max(3, Math.min(97, newY));
    
    onDragEnd(clampedX, clampedY);
  };

  return (
    <motion.div
      ref={tokenRef}
      className="absolute touch-none select-none cursor-grab active:cursor-grabbing"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        x: '-50%',
        y: '-50%',
        zIndex: 25,
      }}
      drag
      dragConstraints={containerRef}
      dragElastic={0}
      dragMomentum={false}
      onDragEnd={handleDragEnd}
      whileDrag={{ 
        scale: 1.2, 
        boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)',
        zIndex: 35,
      }}
      whileTap={{ scale: 1.1 }}
    >
      {/* Football/Soccer Ball */}
      <div 
        className="w-6 h-6 rounded-full flex items-center justify-center"
        style={{
          background: 'radial-gradient(circle at 30% 30%, #ffffff 0%, #f0f0f0 40%, #d4d4d4 100%)',
          boxShadow: '0 3px 10px rgba(0,0,0,0.5), inset 0 -2px 6px rgba(0,0,0,0.15), inset 0 2px 4px rgba(255,255,255,0.8)',
        }}
      >
        {/* Pentagon pattern to make it look like a football */}
        <svg viewBox="0 0 24 24" className="w-full h-full">
          <circle cx="12" cy="12" r="11" fill="none" stroke="#1a1a1a" strokeWidth="0.8" />
          {/* Center pentagon */}
          <polygon 
            points="12,5 15,9 14,13 10,13 9,9" 
            fill="#1a1a1a"
          />
          {/* Top pentagon */}
          <polygon 
            points="12,1 14.5,4 12,5 9.5,4" 
            fill="#1a1a1a"
          />
          {/* Bottom left */}
          <polygon 
            points="5,10 9,9 10,13 7,15 4,13" 
            fill="#1a1a1a"
          />
          {/* Bottom right */}
          <polygon 
            points="19,10 15,9 14,13 17,15 20,13" 
            fill="#1a1a1a"
          />
          {/* Bottom */}
          <polygon 
            points="12,19 9,16 10,13 14,13 15,16" 
            fill="#1a1a1a"
          />
        </svg>
      </div>
    </motion.div>
  );
};
