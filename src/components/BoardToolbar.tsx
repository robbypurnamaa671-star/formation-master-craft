import React from 'react';
import { Undo2, Redo2, RotateCcw, Save, Download, Pencil, MoveRight, Route, Trash2, Circle, Square } from 'lucide-react';
import { motion } from 'framer-motion';
import { ArrowType, ZoneColor } from '@/types/tactics';
import { DrawingMode } from '@/hooks/useTacticsBoard';

interface BoardToolbarProps {
  canUndo: boolean;
  canRedo: boolean;
  drawingMode: DrawingMode;
  arrowType: ArrowType;
  zoneColor: ZoneColor;
  hasArrows: boolean;
  hasZones: boolean;
  showBall: boolean;
  onUndo: () => void;
  onRedo: () => void;
  onReset: () => void;
  onSave: () => void;
  onExport: () => void;
  onSetDrawingMode: (mode: DrawingMode) => void;
  onChangeArrowType: (type: ArrowType) => void;
  onChangeZoneColor: (color: ZoneColor) => void;
  onClearArrows: () => void;
  onClearZones: () => void;
  onToggleBall: () => void;
}

const zoneColors: { color: ZoneColor; bg: string; label: string }[] = [
  { color: 'red', bg: 'bg-red-500', label: 'Red' },
  { color: 'blue', bg: 'bg-blue-500', label: 'Blue' },
  { color: 'green', bg: 'bg-green-500', label: 'Green' },
  { color: 'yellow', bg: 'bg-yellow-400', label: 'Yellow' },
];

export const BoardToolbar: React.FC<BoardToolbarProps> = ({
  canUndo,
  canRedo,
  drawingMode,
  arrowType,
  zoneColor,
  hasArrows,
  hasZones,
  onUndo,
  onRedo,
  onReset,
  onSave,
  onExport,
  onSetDrawingMode,
  onChangeArrowType,
  onChangeZoneColor,
  onClearArrows,
  onClearZones,
  onToggleBall,
  showBall,
}) => {
  const tools = [
    { icon: Undo2, onClick: onUndo, disabled: !canUndo, label: 'Undo' },
    { icon: Redo2, onClick: onRedo, disabled: !canRedo, label: 'Redo' },
    { icon: RotateCcw, onClick: onReset, disabled: false, label: 'Reset' },
    { icon: Save, onClick: onSave, disabled: false, label: 'Save', primary: true },
    { icon: Download, onClick: onExport, disabled: false, label: 'Export' },
  ];

  const isDrawing = drawingMode !== 'none';

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
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* Ball toggle */}
        <motion.button
          onClick={onToggleBall}
          className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${
            showBall 
              ? 'bg-orange-500 text-white' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          whileTap={{ scale: 0.95 }}
          title={showBall ? 'Hide Ball' : 'Show Ball'}
        >
          <Circle className="w-5 h-5" fill={showBall ? 'currentColor' : 'none'} />
          <span className="text-sm font-medium">Ball</span>
        </motion.button>

        <div className="w-px h-6 bg-border" />
        
        {/* Arrow drawing mode */}
        <motion.button
          onClick={() => onSetDrawingMode(drawingMode === 'arrow' ? 'none' : 'arrow')}
          className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${
            drawingMode === 'arrow' 
              ? 'bg-amber-500 text-white' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          whileTap={{ scale: 0.95 }}
          title={drawingMode === 'arrow' ? 'Exit Arrow Mode' : 'Draw Arrows'}
        >
          <Pencil className="w-5 h-5" />
          <span className="text-sm font-medium">Arrows</span>
        </motion.button>

        {/* Zone drawing mode */}
        <motion.button
          onClick={() => onSetDrawingMode(drawingMode === 'zone' ? 'none' : 'zone')}
          className={`p-2.5 rounded-lg transition-all flex items-center gap-2 ${
            drawingMode === 'zone' 
              ? 'bg-purple-500 text-white' 
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          }`}
          whileTap={{ scale: 0.95 }}
          title={drawingMode === 'zone' ? 'Exit Zone Mode' : 'Draw Zones'}
        >
          <Square className="w-5 h-5" />
          <span className="text-sm font-medium">Zones</span>
        </motion.button>
        
        {/* Arrow type selection */}
        {drawingMode === 'arrow' && (
          <>
            <div className="w-px h-6 bg-border" />
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

        {/* Zone color selection */}
        {drawingMode === 'zone' && (
          <>
            <div className="w-px h-6 bg-border" />
            {zoneColors.map((z) => (
              <motion.button
                key={z.color}
                onClick={() => onChangeZoneColor(z.color)}
                className={`p-2 rounded-lg transition-all ${
                  zoneColor === z.color 
                    ? 'ring-2 ring-white ring-offset-2 ring-offset-background' 
                    : 'opacity-60 hover:opacity-100'
                }`}
                whileTap={{ scale: 0.95 }}
                title={z.label}
              >
                <div className={`w-5 h-5 rounded ${z.bg}`} />
              </motion.button>
            ))}
          </>
        )}
        
        {/* Clear buttons */}
        {hasArrows && (
          <motion.button
            onClick={onClearArrows}
            className="p-2.5 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-all flex items-center gap-1.5"
            whileTap={{ scale: 0.95 }}
            title="Clear All Arrows"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-medium">Arrows</span>
          </motion.button>
        )}

        {hasZones && (
          <motion.button
            onClick={onClearZones}
            className="p-2.5 rounded-lg bg-destructive/20 text-destructive hover:bg-destructive/30 transition-all flex items-center gap-1.5"
            whileTap={{ scale: 0.95 }}
            title="Clear All Zones"
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-xs font-medium">Zones</span>
          </motion.button>
        )}
      </div>

      {/* Drawing mode indicator */}
      {isDrawing && (
        <div className="text-center text-xs text-muted-foreground">
          {drawingMode === 'arrow' ? '🎯 Click and drag to draw arrows' : '📍 Click and drag to draw zones'}
        </div>
      )}
    </div>
  );
};
