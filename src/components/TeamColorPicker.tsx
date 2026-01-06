import React from 'react';
import { TeamColors, TeamType } from '@/types/tactics';
import { Label } from '@/components/ui/label';
import { Palette, Users } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamColorPickerProps {
  homeColors: TeamColors;
  awayColors: TeamColors;
  activeTeam: TeamType;
  showAwayTeam: boolean;
  onChangeTeam: (team: TeamType) => void;
  onChangeColors: (colors: TeamColors, team: TeamType) => void;
  onToggleAwayTeam: () => void;
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
  homeColors,
  awayColors,
  activeTeam,
  showAwayTeam,
  onChangeTeam,
  onChangeColors,
  onToggleAwayTeam,
}) => {
  const currentColors = activeTeam === 'home' ? homeColors : awayColors;

  return (
    <div className="space-y-3">
      {/* Team Toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-primary" />
          <Label className="text-sm font-medium text-foreground">Teams</Label>
        </div>
        <button
          onClick={onToggleAwayTeam}
          className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
            showAwayTeam 
              ? 'bg-primary/20 text-primary' 
              : 'bg-secondary text-muted-foreground'
          }`}
        >
          {showAwayTeam ? 'Both Teams' : 'Home Only'}
        </button>
      </div>

      {/* Team Selector */}
      <div className="flex gap-2">
        <motion.button
          onClick={() => onChangeTeam('home')}
          className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
            activeTeam === 'home'
              ? 'border-primary bg-primary/10'
              : 'border-border bg-secondary hover:border-muted-foreground/50'
          }`}
          whileTap={{ scale: 0.98 }}
        >
          <div 
            className="w-5 h-5 rounded-full border-2 border-background/50"
            style={{ backgroundColor: homeColors.primary }}
          />
          <span className="text-sm font-medium">Home</span>
        </motion.button>
        
        {showAwayTeam && (
          <motion.button
            onClick={() => onChangeTeam('away')}
            className={`flex-1 py-2 px-3 rounded-lg border-2 transition-all flex items-center justify-center gap-2 ${
              activeTeam === 'away'
                ? 'border-primary bg-primary/10'
                : 'border-border bg-secondary hover:border-muted-foreground/50'
            }`}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div 
              className="w-5 h-5 rounded-full border-2 border-background/50"
              style={{ backgroundColor: awayColors.primary }}
            />
            <span className="text-sm font-medium">Away</span>
          </motion.button>
        )}
      </div>

      {/* Color Presets */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-muted-foreground" />
          <Label className="text-xs text-muted-foreground">
            {activeTeam === 'home' ? 'Home' : 'Away'} Kit Colors
          </Label>
        </div>
        
        <div className="grid grid-cols-6 gap-2">
          {presetTeams.map((team) => (
            <button
              key={team.name}
              onClick={() => onChangeColors({ 
                primary: team.primary, 
                secondary: team.primary, 
                text: team.text 
              }, activeTeam)}
              className={`group relative h-8 rounded-lg border-2 transition-all ${
                currentColors.primary === team.primary 
                  ? 'border-accent scale-105' 
                  : 'border-transparent hover:border-muted-foreground/30'
              }`}
              style={{ backgroundColor: team.primary }}
              title={team.name}
            />
          ))}
        </div>
      </div>
      
      {/* Custom Color */}
      <div className="flex gap-2 items-center">
        <Label className="text-xs text-muted-foreground">Custom:</Label>
        <input
          type="color"
          value={currentColors.primary}
          onChange={(e) => onChangeColors({ 
            ...currentColors, 
            primary: e.target.value,
            text: isLightColor(e.target.value) ? '#000000' : '#FFFFFF'
          }, activeTeam)}
          className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
        />
        <span className="text-xs text-muted-foreground uppercase">{currentColors.primary}</span>
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
