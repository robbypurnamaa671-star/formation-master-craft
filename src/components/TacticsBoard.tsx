import React, { useRef } from 'react';
import { PitchSVG } from './PitchSVG';
import { PlayerToken } from './PlayerToken';
import { Player } from '@/types/tactics';

interface TacticsBoardProps {
  players: Player[];
  onPlayerMove: (id: string, x: number, y: number) => void;
  onPlayerUpdate: (id: string, updates: Partial<Player>) => void;
  onSelectPlayer: (player: Player | null) => void;
  selectedPlayer: Player | null;
  boardRef: React.RefObject<HTMLDivElement>;
}

export const TacticsBoard: React.FC<TacticsBoardProps> = ({
  players,
  onPlayerMove,
  onPlayerUpdate,
  onSelectPlayer,
  selectedPlayer,
  boardRef,
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
      </div>
      
      {/* Subtle vignette effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/10" />
    </div>
  );
};
