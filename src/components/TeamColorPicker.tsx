import React from 'react';
import { TeamColors } from '@/types/tactics';
import { Label } from '@/components/ui/label';
import { Palette } from 'lucide-react';

interface TeamColorPickerProps {
  colors: TeamColors;
  onChange: (colors: TeamColors) => void;
}

const presetTeams = [
  { name: 'Manchester City', primary: '#6CABDD', text: '#FFFFFF' },
  { name: 'Arsenal', primary: '#EF0107', text: '#FFFFFF' },
  { name: 'Liverpool', primary: '#C8102E', text: '#FFFFFF' },
  { name: 'Chelsea', primary: '#034694', text: '#FFFFFF' },
  { name: 'Real Madrid', primary: '#FFFFFF', text: '#000000' },
  { name: 'Barcelona', primary: '#A50044', text: '#FFFFFF' },
  { name: 'Bayern Munich', primary: '#DC052D', text: '#FFFFFF' },
  { name: 'PSG', primary: '#004170', text: '#FFFFFF' },
  { name: 'Juventus', primary: '#000000', text: '#FFFFFF' },
  { name: 'Man United', primary: '#DA291C', text: '#FFFFFF' },
  { name: 'Tottenham', primary: '#132257', text: '#FFFFFF' },
  { name: 'Atletico', primary: '#CB3524', text: '#FFFFFF' },
];

export const TeamColorPicker: React.FC<TeamColorPickerProps> = ({
  colors,
  onChange,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-primary" />
        <Label className="text-sm font-medium text-foreground">Team Kits</Label>
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {presetTeams.map((team) => (
          <button
            key={team.name}
            onClick={() => onChange({ 
              primary: team.primary, 
              secondary: team.primary, 
              text: team.text 
            })}
            className={`group relative h-10 rounded-lg border-2 transition-all ${
              colors.primary === team.primary 
                ? 'border-accent scale-105' 
                : 'border-transparent hover:border-muted-foreground/30'
            }`}
            style={{ backgroundColor: team.primary }}
            title={team.name}
          >
            <span 
              className="absolute inset-0 flex items-center justify-center text-[8px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ color: team.text }}
            >
              {team.name.split(' ').map(w => w[0]).join('')}
            </span>
          </button>
        ))}
      </div>
      
      <div className="flex gap-2">
        <div className="flex-1">
          <Label className="text-xs text-muted-foreground">Custom Color</Label>
          <div className="mt-1 flex items-center gap-2">
            <input
              type="color"
              value={colors.primary}
              onChange={(e) => onChange({ 
                ...colors, 
                primary: e.target.value,
                text: isLightColor(e.target.value) ? '#000000' : '#FFFFFF'
              })}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <span className="text-xs text-muted-foreground uppercase">{colors.primary}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}
