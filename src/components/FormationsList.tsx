import React from 'react';
import { Formation } from '@/types/tactics';
import { Folder, Trash2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface FormationsListProps {
  formations: Formation[];
  onLoad: (formation: Formation) => void;
  onDelete: (id: string) => void;
}

export const FormationsList: React.FC<FormationsListProps> = ({
  formations,
  onLoad,
  onDelete,
}) => {
  if (formations.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Folder className="w-12 h-12 mx-auto mb-3 opacity-50" />
        <p className="text-sm">No saved formations yet</p>
        <p className="text-xs mt-1">Create and save your first formation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {formations.map((formation, index) => (
        <motion.div
          key={formation.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="glass-panel p-3 flex items-center justify-between group"
        >
          <button
            onClick={() => onLoad(formation)}
            className="flex-1 text-left"
          >
            <h4 className="font-medium text-foreground text-sm">{formation.name}</h4>
            <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{formatDistanceToNow(formation.updatedAt, { addSuffix: true })}</span>
            </div>
          </button>
          
          <div className="flex items-center gap-1">
            {formation.players.slice(1, 4).map((player, i) => (
              <div
                key={i}
                className="w-5 h-5 rounded-full text-[8px] flex items-center justify-center font-bold"
                style={{ backgroundColor: player.color, color: player.textColor }}
              >
                {player.number}
              </div>
            ))}
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(formation.id);
            }}
            className="p-2 ml-2 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  );
};
