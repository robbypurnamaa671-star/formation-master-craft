import React, { useRef } from 'react';
import { PitchSVG } from './PitchSVG';
import { PlayerToken } from './PlayerToken';
import { BallToken } from './BallToken';
import { Player } from '@/types/tactics';
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
}) => {
  const playersContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={boardRef}
      className="relative w-full aspect-[14/10] max-h-[70vh] rounded-xl overflow-hidden shadow-2xl"
      onClick={() => onSelectPlayer(null)}
    >
      {/* Pitch Background */}
      <PitchSVG className="absolute inset-0 w-full h-full" />
      
      {/* Players Layer - positioned within pitch boundary */}
      {/* SVG viewBox is 140x100, pitch lines are at x:3-137, y:3-97 */}
      {/* So playable area: left=3/140=2.14%, top=3/100=3%, width=134/140=95.72%, height=94/100=94% */}
      <div 
        ref={playersContainerRef}
        className="absolute overflow-hidden"
        style={{
          left: '2.14%',
          top: '3%',
          width: '95.72%',
          height: '94%',
        }}
      >
        {players.map((player) => (
          <PlayerToken
            key={player.id}
            player={player}
            containerRef={playersContainerRef}
            onDragEnd={onPlayerMove}
            onUpdate={onPlayerUpdate}
            onSelect={onSelectPlayer}
            isSelected={selectedPlayer?.id === player.id}
          />
        ))}
        
        {/* Ball */}
        {showBall && onBallMove && (
          <BallToken
            position={ballPosition}
            containerRef={playersContainerRef}
            onDragEnd={onBallMove}
          />
        )}
      </div>
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10" />
    </div>
  );
};
