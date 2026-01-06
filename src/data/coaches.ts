import { CoachTactic } from "@/types/tactics";

export const coachTactics: CoachTactic[] = [
  {
    id: "guardiola",
    name: "Pep Guardiola",
    formation: "4-3-3",
    style: "Positional Play",
    description: "Master of possession-based football with fluid attacking movements. Players constantly interchange positions to create numerical superiorities.",
    keyPrinciples: [
      "Maintain possession in all areas",
      "Create triangles for passing options",
      "False 9 drops deep to create space",
      "Full-backs invert into midfield",
      "High defensive line with offside trap"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 15, y: 75, number: 2, name: "RB", color: "#6CABDD", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 80, number: 5, name: "CB", color: "#6CABDD", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 80, number: 6, name: "CB", color: "#6CABDD", textColor: "#FFFFFF", position: "CB" },
      { x: 85, y: 75, number: 3, name: "LB", color: "#6CABDD", textColor: "#FFFFFF", position: "LB" },
      { x: 50, y: 60, number: 4, name: "DM", color: "#6CABDD", textColor: "#FFFFFF", position: "DM" },
      { x: 30, y: 50, number: 8, name: "CM", color: "#6CABDD", textColor: "#FFFFFF", position: "CM" },
      { x: 70, y: 50, number: 17, name: "CM", color: "#6CABDD", textColor: "#FFFFFF", position: "CM" },
      { x: 15, y: 30, number: 7, name: "RW", color: "#6CABDD", textColor: "#FFFFFF", position: "RW" },
      { x: 50, y: 25, number: 9, name: "CF", color: "#6CABDD", textColor: "#FFFFFF", position: "CF" },
      { x: 85, y: 30, number: 11, name: "LW", color: "#6CABDD", textColor: "#FFFFFF", position: "LW" },
    ]
  },
  {
    id: "arteta",
    name: "Mikel Arteta",
    formation: "4-2-3-1",
    style: "Structured Build-up",
    description: "Combines Guardiola's principles with aggressive pressing and structured positional play. Emphasizes width and quick combination play.",
    keyPrinciples: [
      "Left-back inverts into midfield",
      "Right-back provides width",
      "Double pivot for defensive security",
      "Wide players stay high and wide",
      "Quick transitions through the 10"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 15, y: 75, number: 4, name: "RB", color: "#EF0107", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 80, number: 6, name: "CB", color: "#EF0107", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 80, number: 2, name: "CB", color: "#EF0107", textColor: "#FFFFFF", position: "CB" },
      { x: 85, y: 75, number: 35, name: "LB", color: "#EF0107", textColor: "#FFFFFF", position: "LB" },
      { x: 40, y: 58, number: 5, name: "DM", color: "#EF0107", textColor: "#FFFFFF", position: "DM" },
      { x: 60, y: 58, number: 41, name: "DM", color: "#EF0107", textColor: "#FFFFFF", position: "DM" },
      { x: 15, y: 38, number: 7, name: "RW", color: "#EF0107", textColor: "#FFFFFF", position: "RW" },
      { x: 50, y: 42, number: 8, name: "AM", color: "#EF0107", textColor: "#FFFFFF", position: "AM" },
      { x: 85, y: 38, number: 11, name: "LW", color: "#EF0107", textColor: "#FFFFFF", position: "LW" },
      { x: 50, y: 22, number: 9, name: "ST", color: "#EF0107", textColor: "#FFFFFF", position: "ST" },
    ]
  },
  {
    id: "klopp",
    name: "Jürgen Klopp",
    formation: "4-3-3",
    style: "Gegenpressing",
    description: "Heavy metal football with intense counter-pressing and devastating fast transitions. Win the ball back within 6 seconds of losing it.",
    keyPrinciples: [
      "Win ball back within 6 seconds",
      "Aggressive counter-pressing triggers",
      "Full-backs push very high",
      "Midfielders cover enormous ground",
      "Direct, vertical attacking play"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 12, y: 70, number: 66, name: "RB", color: "#C8102E", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 78, number: 4, name: "CB", color: "#C8102E", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 78, number: 5, name: "CB", color: "#C8102E", textColor: "#FFFFFF", position: "CB" },
      { x: 88, y: 70, number: 26, name: "LB", color: "#C8102E", textColor: "#FFFFFF", position: "LB" },
      { x: 50, y: 55, number: 6, name: "DM", color: "#C8102E", textColor: "#FFFFFF", position: "DM" },
      { x: 30, y: 45, number: 8, name: "CM", color: "#C8102E", textColor: "#FFFFFF", position: "CM" },
      { x: 70, y: 45, number: 17, name: "CM", color: "#C8102E", textColor: "#FFFFFF", position: "CM" },
      { x: 15, y: 25, number: 11, name: "RW", color: "#C8102E", textColor: "#FFFFFF", position: "RW" },
      { x: 50, y: 20, number: 9, name: "CF", color: "#C8102E", textColor: "#FFFFFF", position: "CF" },
      { x: 85, y: 25, number: 7, name: "LW", color: "#C8102E", textColor: "#FFFFFF", position: "LW" },
    ]
  },
  {
    id: "slot",
    name: "Arne Slot",
    formation: "4-3-3",
    style: "Possession-Based",
    description: "Dutch philosophy with flexible positioning. Controlled possession with patient build-up and sudden accelerations in attack.",
    keyPrinciples: [
      "Patient possession in build-up",
      "Flexible player positioning",
      "Width through wingers",
      "Controlled pressing triggers",
      "Quick switches of play"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 15, y: 72, number: 2, name: "RB", color: "#C8102E", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 80, number: 4, name: "CB", color: "#C8102E", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 80, number: 5, name: "CB", color: "#C8102E", textColor: "#FFFFFF", position: "CB" },
      { x: 85, y: 72, number: 3, name: "LB", color: "#C8102E", textColor: "#FFFFFF", position: "LB" },
      { x: 50, y: 58, number: 6, name: "DM", color: "#C8102E", textColor: "#FFFFFF", position: "DM" },
      { x: 35, y: 48, number: 8, name: "CM", color: "#C8102E", textColor: "#FFFFFF", position: "CM" },
      { x: 65, y: 48, number: 10, name: "CM", color: "#C8102E", textColor: "#FFFFFF", position: "CM" },
      { x: 18, y: 28, number: 11, name: "RW", color: "#C8102E", textColor: "#FFFFFF", position: "RW" },
      { x: 50, y: 22, number: 9, name: "CF", color: "#C8102E", textColor: "#FFFFFF", position: "CF" },
      { x: 82, y: 28, number: 7, name: "LW", color: "#C8102E", textColor: "#FFFFFF", position: "LW" },
    ]
  },
  {
    id: "tuchel",
    name: "Thomas Tuchel",
    formation: "3-4-2-1",
    style: "Tactical Adaptability",
    description: "Master tactician with compact defensive shape and quick transitions. Excellent at nullifying opponents' strengths.",
    keyPrinciples: [
      "Compact defensive block",
      "Wing-backs provide width",
      "Two creative players behind striker",
      "Quick transitions on turnover",
      "Tactical flexibility mid-game"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 25, y: 78, number: 4, name: "CB", color: "#034694", textColor: "#FFFFFF", position: "CB" },
      { x: 50, y: 82, number: 6, name: "CB", color: "#034694", textColor: "#FFFFFF", position: "CB" },
      { x: 75, y: 78, number: 5, name: "CB", color: "#034694", textColor: "#FFFFFF", position: "CB" },
      { x: 10, y: 55, number: 2, name: "RWB", color: "#034694", textColor: "#FFFFFF", position: "RWB" },
      { x: 35, y: 58, number: 8, name: "CM", color: "#034694", textColor: "#FFFFFF", position: "CM" },
      { x: 65, y: 58, number: 7, name: "CM", color: "#034694", textColor: "#FFFFFF", position: "CM" },
      { x: 90, y: 55, number: 3, name: "LWB", color: "#034694", textColor: "#FFFFFF", position: "LWB" },
      { x: 35, y: 35, number: 10, name: "AM", color: "#034694", textColor: "#FFFFFF", position: "AM" },
      { x: 65, y: 35, number: 11, name: "AM", color: "#034694", textColor: "#FFFFFF", position: "AM" },
      { x: 50, y: 20, number: 9, name: "ST", color: "#034694", textColor: "#FFFFFF", position: "ST" },
    ]
  },
  {
    id: "ancelotti",
    name: "Carlo Ancelotti",
    formation: "4-4-2",
    style: "Balanced & Flexible",
    description: "The grandfather of modern management. Perfectly balanced teams that can adapt to any situation with elegant, effective football.",
    keyPrinciples: [
      "Balanced defensive and attacking shape",
      "Two strikers create partnerships",
      "Wide midfielders track back",
      "Simple, effective passing",
      "Calm, controlled game management"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 15, y: 75, number: 2, name: "RB", color: "#FFFFFF", textColor: "#000000", position: "RB" },
      { x: 35, y: 80, number: 4, name: "CB", color: "#FFFFFF", textColor: "#000000", position: "CB" },
      { x: 65, y: 80, number: 5, name: "CB", color: "#FFFFFF", textColor: "#000000", position: "CB" },
      { x: 85, y: 75, number: 3, name: "LB", color: "#FFFFFF", textColor: "#000000", position: "LB" },
      { x: 15, y: 50, number: 7, name: "RM", color: "#FFFFFF", textColor: "#000000", position: "RM" },
      { x: 38, y: 55, number: 8, name: "CM", color: "#FFFFFF", textColor: "#000000", position: "CM" },
      { x: 62, y: 55, number: 6, name: "CM", color: "#FFFFFF", textColor: "#000000", position: "CM" },
      { x: 85, y: 50, number: 11, name: "LM", color: "#FFFFFF", textColor: "#000000", position: "LM" },
      { x: 40, y: 25, number: 9, name: "ST", color: "#FFFFFF", textColor: "#000000", position: "ST" },
      { x: 60, y: 25, number: 10, name: "ST", color: "#FFFFFF", textColor: "#000000", position: "ST" },
    ]
  },
  {
    id: "tenhagen",
    name: "Erik ten Hag",
    formation: "4-2-3-1",
    style: "Organized Pressing",
    description: "Ajax DNA with structured pressing and organized attacks. Quick combinations in tight spaces with clear tactical discipline.",
    keyPrinciples: [
      "High pressing with clear triggers",
      "Quick short passing combinations",
      "Double pivot shields defense",
      "Width from full-backs and wingers",
      "Late runners into the box"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 15, y: 72, number: 2, name: "RB", color: "#DA291C", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 80, number: 5, name: "CB", color: "#DA291C", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 80, number: 6, name: "CB", color: "#DA291C", textColor: "#FFFFFF", position: "CB" },
      { x: 85, y: 72, number: 3, name: "LB", color: "#DA291C", textColor: "#FFFFFF", position: "LB" },
      { x: 40, y: 58, number: 4, name: "DM", color: "#DA291C", textColor: "#FFFFFF", position: "DM" },
      { x: 60, y: 58, number: 8, name: "DM", color: "#DA291C", textColor: "#FFFFFF", position: "DM" },
      { x: 18, y: 38, number: 7, name: "RW", color: "#DA291C", textColor: "#FFFFFF", position: "RW" },
      { x: 50, y: 42, number: 10, name: "AM", color: "#DA291C", textColor: "#FFFFFF", position: "AM" },
      { x: 82, y: 38, number: 11, name: "LW", color: "#DA291C", textColor: "#FFFFFF", position: "LW" },
      { x: 50, y: 22, number: 9, name: "ST", color: "#DA291C", textColor: "#FFFFFF", position: "ST" },
    ]
  },
  {
    id: "simeone",
    name: "Diego Simeone",
    formation: "4-4-2",
    style: "Defensive Solidity",
    description: "El Cholo's relentless defensive approach. Compact, organized, and devastating on the counter-attack. Never give up.",
    keyPrinciples: [
      "Compact defensive block",
      "Win every duel",
      "Quick counter-attacks",
      "Two banks of four",
      "Mental toughness and passion"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 15, y: 72, number: 2, name: "RB", color: "#CB3524", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 78, number: 4, name: "CB", color: "#CB3524", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 78, number: 5, name: "CB", color: "#CB3524", textColor: "#FFFFFF", position: "CB" },
      { x: 85, y: 72, number: 3, name: "LB", color: "#CB3524", textColor: "#FFFFFF", position: "LB" },
      { x: 15, y: 52, number: 7, name: "RM", color: "#CB3524", textColor: "#FFFFFF", position: "RM" },
      { x: 38, y: 58, number: 8, name: "CM", color: "#CB3524", textColor: "#FFFFFF", position: "CM" },
      { x: 62, y: 58, number: 6, name: "CM", color: "#CB3524", textColor: "#FFFFFF", position: "CM" },
      { x: 85, y: 52, number: 11, name: "LM", color: "#CB3524", textColor: "#FFFFFF", position: "LM" },
      { x: 40, y: 28, number: 9, name: "ST", color: "#CB3524", textColor: "#FFFFFF", position: "ST" },
      { x: 60, y: 28, number: 10, name: "ST", color: "#CB3524", textColor: "#FFFFFF", position: "ST" },
    ]
  },
  {
    id: "nagelsmann",
    name: "Julian Nagelsmann",
    formation: "3-5-2",
    style: "Innovative Positioning",
    description: "Young tactical genius with innovative formations and fluid positional rotations. Embraces modern football analytics.",
    keyPrinciples: [
      "Back three with ball-playing CBs",
      "Wing-backs provide width",
      "Midfield overload in center",
      "Vertical passing lanes",
      "Flexible shape in possession"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 25, y: 78, number: 4, name: "CB", color: "#DC052D", textColor: "#FFFFFF", position: "CB" },
      { x: 50, y: 82, number: 5, name: "CB", color: "#DC052D", textColor: "#FFFFFF", position: "CB" },
      { x: 75, y: 78, number: 6, name: "CB", color: "#DC052D", textColor: "#FFFFFF", position: "CB" },
      { x: 10, y: 50, number: 2, name: "RWB", color: "#DC052D", textColor: "#FFFFFF", position: "RWB" },
      { x: 30, y: 55, number: 8, name: "CM", color: "#DC052D", textColor: "#FFFFFF", position: "CM" },
      { x: 50, y: 52, number: 6, name: "DM", color: "#DC052D", textColor: "#FFFFFF", position: "DM" },
      { x: 70, y: 55, number: 10, name: "CM", color: "#DC052D", textColor: "#FFFFFF", position: "CM" },
      { x: 90, y: 50, number: 3, name: "LWB", color: "#DC052D", textColor: "#FFFFFF", position: "LWB" },
      { x: 40, y: 25, number: 9, name: "ST", color: "#DC052D", textColor: "#FFFFFF", position: "ST" },
      { x: 60, y: 25, number: 11, name: "ST", color: "#DC052D", textColor: "#FFFFFF", position: "ST" },
    ]
  },
  {
    id: "flick",
    name: "Hansi Flick",
    formation: "4-2-3-1",
    style: "High Pressing",
    description: "Bayern's sextuple-winning manager. Aggressive high line with devastating pressing and quick attacking transitions.",
    keyPrinciples: [
      "Extremely high defensive line",
      "Immediate counter-press on loss",
      "Fast transitions to attack",
      "Full-backs push very high",
      "Direct, vertical attacking"
    ],
    players: [
      { x: 50, y: 95, number: 1, name: "GK", color: "#FFD700", textColor: "#000000", position: "GK" },
      { x: 12, y: 68, number: 2, name: "RB", color: "#DC052D", textColor: "#FFFFFF", position: "RB" },
      { x: 35, y: 75, number: 4, name: "CB", color: "#DC052D", textColor: "#FFFFFF", position: "CB" },
      { x: 65, y: 75, number: 5, name: "CB", color: "#DC052D", textColor: "#FFFFFF", position: "CB" },
      { x: 88, y: 68, number: 3, name: "LB", color: "#DC052D", textColor: "#FFFFFF", position: "LB" },
      { x: 40, y: 55, number: 6, name: "DM", color: "#DC052D", textColor: "#FFFFFF", position: "DM" },
      { x: 60, y: 55, number: 8, name: "DM", color: "#DC052D", textColor: "#FFFFFF", position: "DM" },
      { x: 18, y: 35, number: 7, name: "RW", color: "#DC052D", textColor: "#FFFFFF", position: "RW" },
      { x: 50, y: 40, number: 10, name: "AM", color: "#DC052D", textColor: "#FFFFFF", position: "AM" },
      { x: 82, y: 35, number: 11, name: "LW", color: "#DC052D", textColor: "#FFFFFF", position: "LW" },
      { x: 50, y: 20, number: 9, name: "ST", color: "#DC052D", textColor: "#FFFFFF", position: "ST" },
    ]
  }
];

export const defaultFormations = [
  { name: "4-4-2", id: "442" },
  { name: "4-3-3", id: "433" },
  { name: "4-2-3-1", id: "4231" },
  { name: "3-5-2", id: "352" },
  { name: "3-4-3", id: "343" },
  { name: "5-3-2", id: "532" },
];
