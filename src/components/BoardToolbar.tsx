import React from 'react';
import { Undo2, Redo2, RotateCcw, Save, Download } from 'lucide-react';
import { motion } from 'framer-motion';

interface BoardToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
  onExport: () => void;
}

export const BoardToolbar: React.FC<BoardToolbarProps> = ({
  canUndo,
  canRedo,
  onUndo,
  onRedo,
  onReset,
  onSave,
  onExport,
}) => {
  const tools = [
    { icon: Undo2, onClick: onUndo, disabled: !canUndo, label: 'Undo' },
    { icon: Redo2, onClick: onRedo, disabled: !canRedo, label: 'Redo' },
    { icon: RotateCcw, onClick: onReset, disabled: false, label: 'Reset' },
    { icon: Save, onClick: onSave, disabled: false, label: 'Save', primary: true },
    { icon: Download, onClick: onExport, disabled: false, label: 'Export' },
  ];

  return (
    <div className="flex items-center justify-center gap-2 py-2">
      {tools.map((tool, index) => (
        <motion.button
          key={tool.label}
          onClick={tool.onClick}
          disabled={tool.disabled}
          className={`p-2.5 rounded-lg transition-all ${
            tool.primary 
              ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          } ${tool.disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
          whileTap={{ scale: 0.95 }}
          title={tool.label}
        >
          <tool.icon className="w-5 h-5" />
        </motion.button>
      ))}
    </div>
  );
};
