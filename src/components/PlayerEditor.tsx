import React from 'react';
import { Player } from '@/types/tactics';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlayerEditorProps {
  player: Player | null;
  onUpdate: (id: string, updates: Partial<Player>) => void;
  onClose: () => void;
}

const jerseyColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6',
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
  '#FFFFFF', '#000000', '#1E40AF', '#DC2626', '#059669',
];

export const PlayerEditor: React.FC<PlayerEditorProps> = ({
  player,
  onUpdate,
  onClose,
}) => {
  if (!player) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="glass-panel p-4 space-y-4"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-foreground">Edit Player</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-secondary transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
            <Input
              id="name"
              value={player.name}
              onChange={(e) => onUpdate(player.id, { name: e.target.value })}
              className="h-9 bg-secondary border-border"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="number" className="text-xs text-muted-foreground">Number</Label>
            <Input
              id="number"
              type="number"
              min={1}
              max={99}
              value={player.number}
              onChange={(e) => onUpdate(player.id, { number: parseInt(e.target.value) || 1 })}
              className="h-9 bg-secondary border-border"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">Jersey Color</Label>
          <div className="flex flex-wrap gap-2">
            {jerseyColors.map((color) => (
              <button
                key={color}
                onClick={() => onUpdate(player.id, { 
                  color, 
                  textColor: color === '#FFFFFF' || color === '#F59E0B' || color === '#84CC16' ? '#000000' : '#FFFFFF' 
                })}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  player.color === color 
                    ? 'border-accent scale-110' 
                    : 'border-transparent hover:border-muted-foreground/50'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
