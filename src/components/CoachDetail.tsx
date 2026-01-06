import React from 'react';
import { CoachTactic } from '@/types/tactics';
import { ArrowLeft, Play, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

interface CoachDetailProps {
  coach: CoachTactic;
  onBack: () => void;
  onApply: () => void;
}

export const CoachDetail: React.FC<CoachDetailProps> = ({ coach, onBack, onApply }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="text-sm">Back to coaches</span>
      </button>

      <div className="glass-panel p-4 space-y-4">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">{coach.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="formation-badge">{coach.formation}</span>
            <span className="text-sm text-accent font-medium">{coach.style}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {coach.description}
        </p>

        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-foreground">Key Principles</h4>
          <ul className="space-y-2">
            {coach.keyPrinciples.map((principle, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                <span>{principle}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <Button
          onClick={onApply}
          className="w-full action-button-primary"
        >
          <Play className="w-4 h-4" />
          Apply Formation
        </Button>
      </div>
    </motion.div>
  );
};
