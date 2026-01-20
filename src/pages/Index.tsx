import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TacticsBoard } from '@/components/TacticsBoard';
import { PlayerEditor } from '@/components/PlayerEditor';
import { TeamColorPicker } from '@/components/TeamColorPicker';
import { CoachCard } from '@/components/CoachCard';
import { CoachDetail } from '@/components/CoachDetail';
import { FormationsList } from '@/components/FormationsList';
import { SaveFormationDialog } from '@/components/SaveFormationDialog';
import { BottomNav, TabType } from '@/components/BottomNav';
import { BoardToolbar } from '@/components/BoardToolbar';
import { ExportPanel } from '@/components/ExportPanel';
import { useTacticsBoard } from '@/hooks/useTacticsBoard';
import { coachTactics } from '@/data/coaches';
import { Player, CoachTactic } from '@/types/tactics';
import { toPng } from 'html-to-image';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('board');
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [selectedCoach, setSelectedCoach] = useState<CoachTactic | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);

  const {
    players,
    homeColors,
    awayColors,
    activeTeam,
    showAwayTeam,
    showBall,
    ballPosition,
    savedFormations,
    canUndo,
    canRedo,
    setActiveTeam,
    toggleAwayTeam,
    toggleBall,
    moveBall,
    updatePlayer,
    commitPlayerMove,
    undo,
    redo,
    saveFormation,
    loadFormation,
    deleteFormation,
    loadCoachFormation,
    updateTeamColors,
    resetBoard,
  } = useTacticsBoard();

  const handleExport = async () => {
    if (!boardRef.current) return;
    
    try {
      const dataUrl = await toPng(boardRef.current, {
        backgroundColor: '#1a1f2e',
        pixelRatio: 2,
      });
      
      const link = document.createElement('a');
      link.download = `tactics-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      
      toast.success('Formation exported!');
    } catch (error) {
      toast.error('Failed to export');
    }
  };

  const handleApplyCoach = () => {
    if (selectedCoach) {
      loadCoachFormation(selectedCoach.players);
      setSelectedCoach(null);
      setActiveTab('board');
      toast.success(`${selectedCoach.name}'s ${selectedCoach.formation} applied!`);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'board':
        return (
          <motion.div
            key="board"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <BoardToolbar
              canUndo={canUndo}
              canRedo={canRedo}
              onUndo={undo}
              onRedo={redo}
              onReset={resetBoard}
              onSave={() => setSaveDialogOpen(true)}
              onExport={handleExport}
            />
            
            <TacticsBoard
              players={players}
              onPlayerMove={commitPlayerMove}
              onPlayerUpdate={updatePlayer}
              onSelectPlayer={setSelectedPlayer}
              selectedPlayer={selectedPlayer}
              boardRef={boardRef}
              showBall={showBall}
              ballPosition={ballPosition}
              onBallMove={moveBall}
            />
            
            {selectedPlayer ? (
              <PlayerEditor
                player={selectedPlayer}
                onUpdate={updatePlayer}
                onClose={() => setSelectedPlayer(null)}
              />
            ) : (
              <TeamColorPicker
                homeColors={homeColors}
                awayColors={awayColors}
                activeTeam={activeTeam}
                showAwayTeam={showAwayTeam}
                onChangeTeam={setActiveTeam}
                onChangeColors={updateTeamColors}
                onToggleAwayTeam={toggleAwayTeam}
              />
            )}
          </motion.div>
        );

      case 'coaches':
        return (
          <motion.div
            key="coaches"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-foreground">Tactics Library</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Learn from the world's best coaches
              </p>
            </div>

            <AnimatePresence mode="wait">
              {selectedCoach ? (
                <CoachDetail
                  key="detail"
                  coach={selectedCoach}
                  onBack={() => setSelectedCoach(null)}
                  onApply={handleApplyCoach}
                />
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  {coachTactics.map((coach, index) => (
                    <motion.div
                      key={coach.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <CoachCard coach={coach} onSelect={setSelectedCoach} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'saved':
        return (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-foreground">Saved Formations</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Your custom tactics library
              </p>
            </div>

            <FormationsList
              formations={savedFormations}
              onLoad={(f) => {
                loadFormation(f);
                setActiveTab('board');
              }}
              onDelete={deleteFormation}
            />
          </motion.div>
        );

      case 'share':
        return (
          <motion.div
            key="share"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h2 className="font-display text-xl font-bold text-foreground">Export & Share</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Share your tactics with the team
              </p>
            </div>

            <ExportPanel boardRef={boardRef} />
          </motion.div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="container py-3">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-pitch flex items-center justify-center">
                <span className="text-lg">⚽</span>
              </div>
              <h1 className="font-display font-bold text-lg text-foreground">
                Tactics<span className="text-primary">Board</span>
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-4 safe-bottom">
        <AnimatePresence mode="wait">
          {renderContent()}
        </AnimatePresence>
      </main>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Save Dialog */}
      <SaveFormationDialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={saveFormation}
      />
    </div>
  );
};

export default Index;
