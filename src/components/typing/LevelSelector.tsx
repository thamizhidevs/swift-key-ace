
import React from 'react';
import { Button } from "@/components/ui/button";
import { 
  Keyboard,
  AlignJustify,
  FileText,
  Gamepad2
} from 'lucide-react';

export type LevelType = 'letters' | 'words' | 'sentences' | 'game';

interface LevelSelectorProps {
  currentLevel: LevelType;
  onLevelChange: (level: LevelType) => void;
}

const LevelSelector = ({ currentLevel, onLevelChange }: LevelSelectorProps) => {
  const levels = [
    { 
      type: 'letters' as LevelType, 
      label: 'Letters', 
      icon: <Keyboard className="h-4 w-4 mr-2" />,
      description: 'Practice individual key presses'
    },
    { 
      type: 'words' as LevelType, 
      label: 'Words', 
      icon: <AlignJustify className="h-4 w-4 mr-2" />,
      description: 'Type common words and improve vocabulary'
    },
    { 
      type: 'sentences' as LevelType, 
      label: 'Sentences', 
      icon: <FileText className="h-4 w-4 mr-2" />,
      description: 'Complete sentences for real-world typing'
    },
    { 
      type: 'game' as LevelType, 
      label: 'Game Mode', 
      icon: <Gamepad2 className="h-4 w-4 mr-2" />,
      description: 'Fun typing challenges'
    }
  ];

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {levels.map(({ type, label, icon }) => (
          <Button
            key={type}
            variant={currentLevel === type ? "default" : "outline"}
            onClick={() => onLevelChange(type)}
            className="flex-1 min-w-[120px] flex items-center justify-center"
          >
            {icon}
            <span>{label}</span>
          </Button>
        ))}
      </div>
      <div className="text-sm text-muted-foreground text-center">
        {levels.find(level => level.type === currentLevel)?.description}
      </div>
    </div>
  );
};

export default LevelSelector;
