
import React from 'react';
import { Keyboard } from 'lucide-react';

interface KeyProps {
  letter: string;
  isActive: boolean;
  finger: string;
}

const Key = ({ letter, isActive, finger }: KeyProps) => (
  <div 
    className={`
      relative p-3 rounded-lg border 
      ${isActive ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-muted'}
      transition-all duration-200
    `}
  >
    <span className="text-sm font-mono">{letter}</span>
    {isActive && (
      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
        <span className="text-xs text-muted-foreground">{finger}</span>
      </div>
    )}
  </div>
);

const KeyboardVisualizer = ({ currentKey }: { currentKey: string }) => {
  const keyboardLayout = [
    [
      { letters: ['q', 'a', 'z'], finger: 'L Pinky' },
      { letters: ['w', 's', 'x'], finger: 'L Ring' },
      { letters: ['e', 'd', 'c'], finger: 'L Middle' },
      { letters: ['r', 'f', 'v', 't', 'g', 'b'], finger: 'L Index' },
      { letters: ['y', 'h', 'n', 'u', 'j', 'm'], finger: 'R Index' },
      { letters: ['i', 'k'], finger: 'R Middle' },
      { letters: ['o', 'l'], finger: 'R Ring' },
      { letters: ['p'], finger: 'R Pinky' },
    ],
  ];

  const getFingerForKey = (key: string): string => {
    const finger = keyboardLayout.flat().find(row => 
      row.letters.includes(key.toLowerCase())
    );
    return finger?.finger || '';
  };

  return (
    <div className="mt-8 p-4 bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Keyboard className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Keyboard Guide</h3>
      </div>
      
      <div className="grid grid-cols-8 gap-2">
        {keyboardLayout[0].map((key, idx) => (
          <div key={idx} className="flex flex-col gap-2">
            {key.letters.map((letter) => (
              <Key
                key={letter}
                letter={letter}
                isActive={currentKey.toLowerCase() === letter}
                finger={key.finger}
              />
            ))}
          </div>
        ))}
      </div>
      
      <div className="mt-6 text-center">
        <div className="inline-block px-8 py-2 bg-muted/20 rounded-lg">
          <span className="text-sm text-muted-foreground">Space Bar - Both Thumbs</span>
        </div>
      </div>
    </div>
  );
};

export default KeyboardVisualizer;
