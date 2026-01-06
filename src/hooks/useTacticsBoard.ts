import { useState, useCallback, useRef } from 'react';
import { Player, Formation, HistoryState, TeamColors } from '@/types/tactics';
import { toast } from 'sonner';

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultTeamColors: TeamColors = {
  primary: '#3B82F6',
  secondary: '#1E40AF',
  text: '#FFFFFF'
};

const createDefaultPlayers = (colors: TeamColors): Player[] => [
  { id: generateId(), x: 50, y: 92, number: 1, name: 'GK', color: '#FFD700', textColor: '#000000' },
  { id: generateId(), x: 18, y: 72, number: 2, name: 'RB', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 38, y: 78, number: 4, name: 'CB', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 62, y: 78, number: 5, name: 'CB', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 82, y: 72, number: 3, name: 'LB', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 30, y: 52, number: 6, name: 'CM', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 50, y: 48, number: 8, name: 'CM', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 70, y: 52, number: 10, name: 'CM', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 20, y: 28, number: 7, name: 'RW', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 50, y: 22, number: 9, name: 'ST', color: colors.primary, textColor: colors.text },
  { id: generateId(), x: 80, y: 28, number: 11, name: 'LW', color: colors.primary, textColor: colors.text },
];

export function useTacticsBoard() {
  const [players, setPlayers] = useState<Player[]>(() => createDefaultPlayers(defaultTeamColors));
  const [teamColors, setTeamColors] = useState<TeamColors>(defaultTeamColors);
  const [history, setHistory] = useState<HistoryState[]>([{ players: createDefaultPlayers(defaultTeamColors) }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [savedFormations, setSavedFormations] = useState<Formation[]>(() => {
    const saved = localStorage.getItem('tacticsFormations');
    return saved ? JSON.parse(saved) : [];
  });

  const saveToHistory = useCallback((newPlayers: Player[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ players: newPlayers });
      return newHistory.slice(-50); // Keep last 50 states
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const updatePlayer = useCallback((id: string, updates: Partial<Player>) => {
    setPlayers(prev => {
      const newPlayers = prev.map(p => p.id === id ? { ...p, ...updates } : p);
      return newPlayers;
    });
  }, []);

  const commitPlayerMove = useCallback((id: string, x: number, y: number) => {
    setPlayers(prev => {
      const newPlayers = prev.map(p => p.id === id ? { ...p, x, y } : p);
      saveToHistory(newPlayers);
      return newPlayers;
    });
  }, [saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setPlayers(history[newIndex].players);
      toast('Undo');
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setPlayers(history[newIndex].players);
      toast('Redo');
    }
  }, [history, historyIndex]);

  const saveFormation = useCallback((name: string) => {
    const formation: Formation = {
      id: generateId(),
      name,
      players: players.map(p => ({ ...p })),
      teamColors,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    
    setSavedFormations(prev => {
      const newFormations = [...prev, formation];
      localStorage.setItem('tacticsFormations', JSON.stringify(newFormations));
      return newFormations;
    });
    
    toast.success(`Formation "${name}" saved!`);
    return formation;
  }, [players, teamColors]);

  const loadFormation = useCallback((formation: Formation) => {
    setPlayers(formation.players.map(p => ({ ...p, id: generateId() })));
    setTeamColors(formation.teamColors);
    saveToHistory(formation.players);
    toast.success(`Loaded "${formation.name}"`);
  }, [saveToHistory]);

  const deleteFormation = useCallback((id: string) => {
    setSavedFormations(prev => {
      const newFormations = prev.filter(f => f.id !== id);
      localStorage.setItem('tacticsFormations', JSON.stringify(newFormations));
      return newFormations;
    });
    toast('Formation deleted');
  }, []);

  const loadCoachFormation = useCallback((coachPlayers: Omit<Player, 'id'>[]) => {
    const newPlayers = coachPlayers.map(p => ({
      ...p,
      id: generateId(),
    }));
    setPlayers(newPlayers);
    saveToHistory(newPlayers);
  }, [saveToHistory]);

  const updateTeamColors = useCallback((colors: TeamColors) => {
    setTeamColors(colors);
    setPlayers(prev => prev.map((p, i) => 
      i === 0 
        ? p // Keep goalkeeper colors
        : { ...p, color: colors.primary, textColor: colors.text }
    ));
  }, []);

  const resetBoard = useCallback(() => {
    const newPlayers = createDefaultPlayers(teamColors);
    setPlayers(newPlayers);
    saveToHistory(newPlayers);
    toast('Board reset');
  }, [teamColors, saveToHistory]);

  return {
    players,
    teamColors,
    savedFormations,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
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
  };
}
