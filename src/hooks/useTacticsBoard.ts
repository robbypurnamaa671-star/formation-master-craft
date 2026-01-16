import { useState, useCallback } from 'react';
import { Player, Formation, HistoryState, TeamColors, TeamType } from '@/types/tactics';
import { toast } from 'sonner';

const generateId = () => Math.random().toString(36).substring(2, 9);

const defaultHomeColors: TeamColors = {
  primary: '#3B82F6',
  secondary: '#1E40AF',
  text: '#FFFFFF'
};

const defaultAwayColors: TeamColors = {
  primary: '#EF4444',
  secondary: '#DC2626',
  text: '#FFFFFF'
};

// 4-3-3 formation for home team - in their half (x < 50% for horizontal pitch)
// Now positions are relative to the playable area (inside the pitch boundary)
const createDefaultHomePlayers = (colors: TeamColors): Player[] => [
  { id: generateId(), x: 5, y: 50, number: 1, name: 'GK', color: '#FFD700', textColor: '#000000', team: 'home' },
  { id: generateId(), x: 16, y: 8, number: 2, name: 'RB', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 14, y: 35, number: 4, name: 'CB', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 14, y: 65, number: 5, name: 'CB', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 16, y: 92, number: 3, name: 'LB', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 28, y: 25, number: 6, name: 'CM', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 32, y: 50, number: 8, name: 'CM', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 28, y: 75, number: 10, name: 'CM', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 42, y: 8, number: 7, name: 'RW', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 46, y: 50, number: 9, name: 'ST', color: colors.primary, textColor: colors.text, team: 'home' },
  { id: generateId(), x: 42, y: 92, number: 11, name: 'LW', color: colors.primary, textColor: colors.text, team: 'home' },
];

// 4-3-3 formation for away team - in their half (x > 50% for horizontal pitch)
const createDefaultAwayPlayers = (colors: TeamColors): Player[] => [
  { id: generateId(), x: 95, y: 50, number: 1, name: 'GK', color: '#22C55E', textColor: '#000000', team: 'away' },
  { id: generateId(), x: 84, y: 92, number: 2, name: 'RB', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 86, y: 65, number: 4, name: 'CB', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 86, y: 35, number: 5, name: 'CB', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 84, y: 8, number: 3, name: 'LB', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 72, y: 75, number: 6, name: 'CM', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 68, y: 50, number: 8, name: 'CM', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 72, y: 25, number: 10, name: 'CM', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 58, y: 92, number: 7, name: 'RW', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 54, y: 50, number: 9, name: 'ST', color: colors.primary, textColor: colors.text, team: 'away' },
  { id: generateId(), x: 58, y: 8, number: 11, name: 'LW', color: colors.primary, textColor: colors.text, team: 'away' },
];

export function useTacticsBoard() {
  const [homePlayers, setHomePlayers] = useState<Player[]>(() => createDefaultHomePlayers(defaultHomeColors));
  const [awayPlayers, setAwayPlayers] = useState<Player[]>(() => createDefaultAwayPlayers(defaultAwayColors));
  const [homeColors, setHomeColors] = useState<TeamColors>(defaultHomeColors);
  const [awayColors, setAwayColors] = useState<TeamColors>(defaultAwayColors);
  const [activeTeam, setActiveTeam] = useState<TeamType>('home');
  const [showAwayTeam, setShowAwayTeam] = useState(true);
  
  const [history, setHistory] = useState<HistoryState[]>([{ 
    players: [...createDefaultHomePlayers(defaultHomeColors), ...createDefaultAwayPlayers(defaultAwayColors)] 
  }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const [savedFormations, setSavedFormations] = useState<Formation[]>(() => {
    const saved = localStorage.getItem('tacticsFormations');
    return saved ? JSON.parse(saved) : [];
  });

  const allPlayers = showAwayTeam ? [...homePlayers, ...awayPlayers] : homePlayers;

  const saveToHistory = useCallback((newHomePlayers: Player[], newAwayPlayers: Player[]) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ players: [...newHomePlayers, ...newAwayPlayers] });
      return newHistory.slice(-50);
    });
    setHistoryIndex(prev => Math.min(prev + 1, 49));
  }, [historyIndex]);

  const updatePlayer = useCallback((id: string, updates: Partial<Player>) => {
    const isHome = homePlayers.some(p => p.id === id);
    if (isHome) {
      setHomePlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    } else {
      setAwayPlayers(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
  }, [homePlayers]);

  const commitPlayerMove = useCallback((id: string, x: number, y: number) => {
    const isHome = homePlayers.some(p => p.id === id);
    if (isHome) {
      setHomePlayers(prev => {
        const newPlayers = prev.map(p => p.id === id ? { ...p, x, y } : p);
        saveToHistory(newPlayers, awayPlayers);
        return newPlayers;
      });
    } else {
      setAwayPlayers(prev => {
        const newPlayers = prev.map(p => p.id === id ? { ...p, x, y } : p);
        saveToHistory(homePlayers, newPlayers);
        return newPlayers;
      });
    }
  }, [homePlayers, awayPlayers, saveToHistory]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      const players = history[newIndex].players;
      setHomePlayers(players.filter(p => p.team === 'home'));
      setAwayPlayers(players.filter(p => p.team === 'away'));
      toast('Undo');
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      const players = history[newIndex].players;
      setHomePlayers(players.filter(p => p.team === 'home'));
      setAwayPlayers(players.filter(p => p.team === 'away'));
      toast('Redo');
    }
  }, [history, historyIndex]);

  const saveFormation = useCallback((name: string) => {
    const formation: Formation = {
      id: generateId(),
      name,
      players: homePlayers.map(p => ({ ...p })),
      awayPlayers: awayPlayers.map(p => ({ ...p })),
      homeColors,
      awayColors,
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
  }, [homePlayers, awayPlayers, homeColors, awayColors]);

  const loadFormation = useCallback((formation: Formation) => {
    const newHomePlayers = formation.players.map(p => ({ ...p, id: generateId(), team: 'home' as TeamType }));
    const newAwayPlayers = (formation.awayPlayers || []).map(p => ({ ...p, id: generateId(), team: 'away' as TeamType }));
    
    setHomePlayers(newHomePlayers);
    if (newAwayPlayers.length > 0) {
      setAwayPlayers(newAwayPlayers);
    }
    if (formation.homeColors) setHomeColors(formation.homeColors);
    if (formation.awayColors) setAwayColors(formation.awayColors);
    
    saveToHistory(newHomePlayers, newAwayPlayers.length > 0 ? newAwayPlayers : awayPlayers);
    toast.success(`Loaded "${formation.name}"`);
  }, [saveToHistory, awayPlayers]);

  const deleteFormation = useCallback((id: string) => {
    setSavedFormations(prev => {
      const newFormations = prev.filter(f => f.id !== id);
      localStorage.setItem('tacticsFormations', JSON.stringify(newFormations));
      return newFormations;
    });
    toast('Formation deleted');
  }, []);

  const loadCoachFormation = useCallback((coachPlayers: Omit<Player, 'id' | 'team'>[]) => {
    const newPlayers = coachPlayers.map(p => ({
      ...p,
      id: generateId(),
      team: 'home' as TeamType,
    }));
    setHomePlayers(newPlayers);
    saveToHistory(newPlayers, awayPlayers);
  }, [saveToHistory, awayPlayers]);

  const updateTeamColors = useCallback((colors: TeamColors, team: TeamType) => {
    if (team === 'home') {
      setHomeColors(colors);
      setHomePlayers(prev => prev.map((p, i) => 
        i === 0 
          ? p // Keep goalkeeper colors
          : { ...p, color: colors.primary, textColor: colors.text }
      ));
    } else {
      setAwayColors(colors);
      setAwayPlayers(prev => prev.map((p, i) => 
        i === 0 
          ? p // Keep goalkeeper colors
          : { ...p, color: colors.primary, textColor: colors.text }
      ));
    }
  }, []);

  const resetBoard = useCallback(() => {
    const newHomePlayers = createDefaultHomePlayers(homeColors);
    const newAwayPlayers = createDefaultAwayPlayers(awayColors);
    setHomePlayers(newHomePlayers);
    setAwayPlayers(newAwayPlayers);
    saveToHistory(newHomePlayers, newAwayPlayers);
    toast('Board reset');
  }, [homeColors, awayColors, saveToHistory]);

  const toggleAwayTeam = useCallback(() => {
    setShowAwayTeam(prev => !prev);
  }, []);

  return {
    players: allPlayers,
    homePlayers,
    awayPlayers,
    homeColors,
    awayColors,
    activeTeam,
    showAwayTeam,
    savedFormations,
    canUndo: historyIndex > 0,
    canRedo: historyIndex < history.length - 1,
    setActiveTeam,
    toggleAwayTeam,
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
