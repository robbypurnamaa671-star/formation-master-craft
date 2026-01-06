import React from 'react';
import { LayoutGrid, Users, Folder, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

export type TabType = 'board' | 'coaches' | 'saved' | 'share';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'board' as TabType, icon: LayoutGrid, label: 'Board' },
  { id: 'coaches' as TabType, icon: Users, label: 'Coaches' },
  { id: 'saved' as TabType, icon: Folder, label: 'Saved' },
  { id: 'share' as TabType, icon: Share2, label: 'Share' },
];

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  return (
    <nav className="bottom-nav z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`nav-item relative ${isActive ? 'active' : ''}`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <Icon className={`w-5 h-5 relative z-10 ${isActive ? 'text-primary' : ''}`} />
              <span className={`text-xs mt-1 relative z-10 ${isActive ? 'text-primary font-medium' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
