import React, { useRef, useState, useCallback } from 'react';
import { PitchSVG } from './PitchSVG';
import { PlayerToken } from './PlayerToken';
import { BallToken } from './BallToken';
import { ArrowLayer } from './ArrowLayer';
import { Player, Arrow, ArrowType } from '@/types/tactics';
import { BallPosition } from '@/hooks/useTacticsBoard';

interface TacticsBoardProps {
  players: Player[];
  onPlayerMove: (id: string, x: number, y: number) => void;
  onPlayerUpdate: (id: string, updates: Partial<Player>) => void;
  onSelectPlayer: (player: Player | null) => void;
  selectedPlayer: Player | null;
  boardRef: React.RefObject<HTMLDivElement>;
  showBall?: boolean;
  ballPosition?: BallPosition;
  onBallMove?: (x: number, y: number) => void;
  arrows?: Arrow[];
  isDrawingMode?: boolean;
  arrowType?: ArrowType;
  onAddArrow?: (startX: number, startY: number, endX: number, endY: number) => void;
  onDeleteArrow?: (id: string) => void;
}

export const TacticsBoard: React.FC<TacticsBoardProps> = ({
  players,
  onPlayerMove,
  onPlayerUpdate,
  onSelectPlayer,
  selectedPlayer,
  boardRef,
  showBall = true,
  ballPosition = { x: 50, y: 50 },
  onBallMove,
  arrows = [],
  isDrawingMode = false,
  arrowType = 'pass',
  onAddArrow,
  onDeleteArrow,
}) => {
  const playersContainerRef = useRef<HTMLDivElement>(null);
  const [drawingArrow, setDrawingArrow] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);

  const getRelativePosition = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!playersContainerRef.current) return null;
    
    const rect = playersContainerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    
    return { x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) };
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!isDrawingMode) return;
    
    const pos = getRelativePosition(e);
    if (pos) {
      setDrawingArrow({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
    }
  }, [isDrawingMode, getRelativePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!drawingArrow) return;
    
    const pos = getRelativePosition(e);
    if (pos) {
      setDrawingArrow(prev => prev ? { ...prev, endX: pos.x, endY: pos.y } : null);
    }
  }, [drawingArrow, getRelativePosition]);

  const handleMouseUp = useCallback(() => {
    if (drawingArrow && onAddArrow) {
      const distance = Math.sqrt(
        Math.pow(drawingArrow.endX - drawingArrow.startX, 2) +
        Math.pow(drawingArrow.endY - drawingArrow.startY, 2)
      );
      // Only add arrow if it has meaningful length (> 5%)
      if (distance > 5) {
        onAddArrow(drawingArrow.startX, drawingArrow.startY, drawingArrow.endX, drawingArrow.endY);
      }
    }
    setDrawingArrow(null);
  }, [drawingArrow, onAddArrow]);

  const handleBoardClick = useCallback(() => {
    if (!isDrawingMode) {
      onSelectPlayer(null);
    }
  }, [isDrawingMode, onSelectPlayer]);

  return (
    <div 
      ref={boardRef}
      className="relative w-full aspect-[14/10] max-h-[70vh] rounded-xl overflow-hidden shadow-2xl"
      onClick={handleBoardClick}
    >
      {/* Pitch Background */}
      <PitchSVG className="absolute inset-0 w-full h-full" />
      
      {/* Players Layer - positioned within pitch boundary */}
      {/* SVG viewBox is 140x100, pitch lines are at x:3-137, y:3-97 */}
      {/* So playable area: left=3/140=2.14%, top=3/100=3%, width=134/140=95.72%, height=94/100=94% */}
      <div 
        ref={playersContainerRef}
        className={`absolute overflow-hidden ${isDrawingMode ? 'cursor-crosshair' : ''}`}
        style={{
          left: '2.14%',
          top: '3%',
          width: '95.72%',
          height: '94%',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Arrow Layer */}
        <ArrowLayer
          arrows={arrows}
          currentArrow={drawingArrow}
          arrowType={arrowType}
          onDeleteArrow={onDeleteArrow || (() => {})}
        />
        
        {players.map((player) => (
          <PlayerToken
            key={player.id}
            player={player}
            containerRef={playersContainerRef}
            onDragEnd={isDrawingMode ? () => {} : onPlayerMove}
            onUpdate={onPlayerUpdate}
            onSelect={isDrawingMode ? () => {} : onSelectPlayer}
            isSelected={selectedPlayer?.id === player.id}
          />
        ))}
        
        {/* Ball */}
        {showBall && onBallMove && (
          <BallToken
            position={ballPosition}
            containerRef={playersContainerRef}
            onDragEnd={isDrawingMode ? () => {} : onBallMove}
          />
        )}
      </div>
      
      {/* Drawing mode indicator */}
      {isDrawingMode && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium border border-border">
          {arrowType === 'pass' ? '🎯 Drawing Pass' : '🏃 Drawing Run'}
        </div>
      )}
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10" />
    </div>
  );
};
