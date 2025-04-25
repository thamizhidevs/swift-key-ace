
import React from 'react';
import { Button } from "@/components/ui/button";

export type LevelType = 'letters' | 'words' | 'sentences' | 'game';

interface LevelSelectorProps {
  currentLevel: LevelType;
  onLevelChange: (level: LevelType) => void;
}

const LevelSelector = ({ currentLevel, onLevelChange }: LevelSelectorProps) => {
  const levels = [
    { type: 'letters' as LevelType, label: 'Letters' },
    { type: 'words' as LevelType, label: 'Words' },
    { type: 'sentences' as LevelType, label: 'Sentences' },
    { type: 'game' as LevelType, label: 'Game Mode' }
  ];

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {levels.map(({ type, label }) => (
        <Button
          key={type}
          variant={currentLevel === type ? "default" : "outline"}
          onClick={() => onLevelChange(type)}
          className="flex-1 min-w-[120px]"
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default LevelSelector;

