export interface Player {
  id: string;
  x: number;
  y: number;
  number: number;
  name: string;
  color: string;
  textColor: string;
  position?: string;
}

export interface Formation {
  id: string;
  name: string;
  players: Player[];
  teamColors: TeamColors;
  createdAt: number;
  updatedAt: number;
}

export interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

export interface CoachTactic {
  id: string;
  name: string;
  formation: string;
  style: string;
  description: string;
  keyPrinciples: string[];
  players: Omit<Player, 'id'>[];
  image?: string;
}

export interface AnimationPath {
  playerId: string;
  points: { x: number; y: number }[];
}

export interface HistoryState {
  players: Player[];
}
