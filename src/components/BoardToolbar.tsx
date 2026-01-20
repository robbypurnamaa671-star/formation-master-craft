import React from 'react';
import { Undo2, Redo2, RotateCcw, Save, Download, Pencil, MoveRight, Route, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowType } from '@/types/tactics';

interface BoardToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  isDrawingMode: boolean;
  arrowType: ArrowType;
  hasArrows: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
  onExport: () => void;
  onToggleDrawing: () => void;
  onChangeArrowType: (type: ArrowType) => void;
  onClearArrows: () => void;
}

export const BoardToolbar: React.FC<BoardToolbarProps> = ({
  canUndo,
  canRedo,
  isDrawingMode,
  arrowType,
  hasArrows,
  onUndo,
  onRedo,
  onReset,
  onSave,
  onExport,
  onToggleDrawing,
  onChangeArrowType,
  onClearArrows,
}) => {
  const tools = [
    { icon: Undo2, onClick: onUndo, disabled: !canUndo, label: 'Undo' },
    { icon: Redo2, onClick: onRedo, disabled: !canRedo, label: 'Redo' },
    { icon: RotateCcw, onClick: onReset, disabled: false, label: 'Reset' },
    { icon: Save, onClick: onSave, disabled: false, label: 'Save', primary: true },
    { icon: Download, onClick: onExport, disabled: false, label: 'Export' },
  ];

  return (
    <div className="flex flex-col gap-2 py-2">
      {/* Main tools */}
      <div className="flex items-center justify-center gap-2">
        {tools.map((tool) => (
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
      
      {/* Drawing tools */}
      <div className="flex items-center justify-center gap-2">
        <motion.button
          onClick={onToggleDrawing}
          className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${
            isDrawingMode 
              ? 'bg-amber-500 text-white' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          whileTap={{ scale: 0.95 }}
          title={isDrawingMode ? 'Exit Drawing Mode' : 'Draw Arrows'}
        >
          <Pencil className="w-5 h-5" />
          <span className="text-sm font-medium">Draw</span>
        </motion.button>
        
        {isDrawingMode && (
          <>
            <motion.button
              onClick={() => onChangeArrowType('pass')}
              className={`p-2.5 rounded-lg transition-all flex items-center gap-1.5 ${
                arrowType === 'pass' 
                  ? 'bg-amber-400 text-black' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              whileTap={{ scale: 0.95 }}
              title="Pass Arrow"
            >
              <MoveRight className="w-4 h-4" />
              <span className="text-xs font-medium">Pass</span>
            </motion.button>
            
            <motion.button
              onClick={() => onChangeArrowType('run')}
              className={`p-2.5 rounded-lg transition-all flex items-center gap-1.5 ${
                arrowType === 'run' 
                  ? 'bg-cyan-400 text-black' 
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
              whileTap={{ scale: 0.95 }}
              title="Run Arrow"
            >
              <Route className="w-4 h-4" />
              <span className="text-xs font-medium">Run</span>
            </motion.button>
          </>
        )}
        
        {hasArrows && (
          <motion.button
            onClick={onClearArrows}
            className="p-2.5 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-all flex items-center gap-1.5"
            whileTap={{ scale: 0.95 }}
            title="Clear All Arrows"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-medium">Clear</span>
          </motion.button>
        )}
      </div>
    </div>
  );
};
