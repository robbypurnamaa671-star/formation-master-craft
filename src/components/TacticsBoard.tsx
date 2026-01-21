import React, { useRef, useState, useCallback } from 'react';
import { PitchSVG } from './PitchSVG';
import { PlayerToken } from './PlayerToken';
import { BallToken } from './BallToken';
import { ArrowLayer } from './ArrowLayer';
import { ZoneLayer } from './ZoneLayer';
import { Player, Arrow, ArrowType, Zone, ZoneColor } from '@/types/tactics';
import { BallPosition, DrawingMode } from '@/hooks/useTacticsBoard';

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
  zones?: Zone[];
  drawingMode?: DrawingMode;
  arrowType?: ArrowType;
  zoneColor?: ZoneColor;
  onAddArrow?: (startX: number, startY: number, endX: number, endY: number) => void;
  onDeleteArrow?: (id: string) => void;
  onAddZone?: (x: number, y: number, width: number, height: number) => void;
  onDeleteZone?: (id: string) => void;
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
  zones = [],
  drawingMode = 'none',
  arrowType = 'pass',
  zoneColor = 'red',
  onAddArrow,
  onDeleteArrow,
  onAddZone,
  onDeleteZone,
}) => {
  const playersContainerRef = useRef<HTMLDivElement>(null);
  const [drawingArrow, setDrawingArrow] = useState<{
    startX: number;
    startY: number;
    endX: number;
    endY: number;
  } | null>(null);
  const [drawingZone, setDrawingZone] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  const isDrawing = drawingMode !== 'none';

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
    if (drawingMode === 'none') return;
    
    const pos = getRelativePosition(e);
    if (pos) {
      if (drawingMode === 'arrow') {
        setDrawingArrow({ startX: pos.x, startY: pos.y, endX: pos.x, endY: pos.y });
      } else if (drawingMode === 'zone') {
        setDrawingZone({ x: pos.x, y: pos.y, width: 0, height: 0 });
      }
    }
  }, [drawingMode, getRelativePosition]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const pos = getRelativePosition(e);
    if (!pos) return;

    if (drawingArrow) {
      setDrawingArrow(prev => prev ? { ...prev, endX: pos.x, endY: pos.y } : null);
    }
    if (drawingZone) {
      setDrawingZone(prev => prev ? { 
        ...prev, 
        width: pos.x - prev.x, 
        height: pos.y - prev.y 
      } : null);
    }
  }, [drawingArrow, drawingZone, getRelativePosition]);

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

    if (drawingZone && onAddZone) {
      const width = Math.abs(drawingZone.width);
      const height = Math.abs(drawingZone.height);
      // Only add zone if it has meaningful size (> 3% in both dimensions)
      if (width > 3 && height > 3) {
        const x = drawingZone.width < 0 ? drawingZone.x + drawingZone.width : drawingZone.x;
        const y = drawingZone.height < 0 ? drawingZone.y + drawingZone.height : drawingZone.y;
        onAddZone(x, y, width, height);
      }
    }
    setDrawingZone(null);
  }, [drawingArrow, drawingZone, onAddArrow, onAddZone]);

  const handleBoardClick = useCallback(() => {
    if (!isDrawing) {
      onSelectPlayer(null);
    }
  }, [isDrawing, onSelectPlayer]);

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
        className={`absolute overflow-hidden ${isDrawing ? 'cursor-crosshair' : ''}`}
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
        {/* Zone Layer (rendered first, so it's behind arrows and players) */}
        <ZoneLayer
          zones={zones}
          currentZone={drawingZone}
          zoneColor={zoneColor}
          onDeleteZone={onDeleteZone || (() => {})}
        />

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
            onDragEnd={isDrawing ? () => {} : onPlayerMove}
            onUpdate={onPlayerUpdate}
            onSelect={isDrawing ? () => {} : onSelectPlayer}
            isSelected={selectedPlayer?.id === player.id}
          />
        ))}
        
        {/* Ball */}
        {showBall && onBallMove && (
          <BallToken
            position={ballPosition}
            containerRef={playersContainerRef}
            onDragEnd={isDrawing ? () => {} : onBallMove}
          />
        )}
      </div>
      
      {/* Drawing mode indicator */}
      {isDrawing && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium border border-border">
          {drawingMode === 'arrow' 
            ? (arrowType === 'pass' ? '🎯 Drawing Pass' : '🏃 Drawing Run')
            : '📍 Drawing Zone'}
        </div>
      )}
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10" />
    </div>
  );
};
