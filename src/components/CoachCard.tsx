import React from 'react';
import { CoachTactic } from '@/types/tactics';
import { ChevronRight, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface CoachCardProps {
  coach: CoachTactic;
  onSelect: (coach: CoachTactic) => void;
}

export const CoachCard: React.FC<CoachCardProps> = ({ coach, onSelect }) => {
  return (
    <motion.button
      onClick={() => onSelect(coach)}
      className="coach-card w-full text-left"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-display font-semibold text-foreground">{coach.name}</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="formation-badge">{coach.formation}</span>
            <span className="text-xs text-muted-foreground">{coach.style}</span>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground mt-1" />
      </div>
      
      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
        {coach.description}
      </p>
    </motion.button>
  );
};
