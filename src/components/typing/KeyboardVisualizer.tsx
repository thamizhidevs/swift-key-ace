
import React, { useEffect, useState } from 'react';
import { Keyboard } from 'lucide-react';

interface KeyProps {
  letter: string;
  isActive: boolean;
  finger: string;
  fingerColor: string;
  isNextKey?: boolean;
}

const Key = ({ letter, isActive, finger, fingerColor, isNextKey }: KeyProps) => (
  <div 
    className={`
      relative p-3 rounded-lg border min-w-[40px] min-h-[40px] flex items-center justify-center
      ${isActive ? 'bg-primary text-primary-foreground border-primary shadow-md animate-key-press' : 
        isNextKey ? 'bg-accent/30 text-accent-foreground border-accent' : 'bg-card border-muted'}
      transition-all duration-200
    `}
  >
    <span className="text-sm font-mono">{letter}</span>
    {(isActive || isNextKey) && (
      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className={`px-2 py-1 rounded-md text-xs font-medium ${fingerColor} ${isNextKey ? 'animate-finger-indicator' : 'animate-fade-in'} shadow-lg`}>
          {finger}
        </div>
      </div>
    )}
  </div>
);

const KeyboardVisualizer = ({ currentKey, nextKey }: { currentKey: string, nextKey?: string }) => {
  // Define the keyboard layout to match a real keyboard
  // First row: Q to P
  // Second row: A to L
  // Third row: Z to M
  const keyboardLayout = [
    // Top row
    [
      { letter: 'q', finger: 'L Pinky', color: 'bg-pink-500 text-white' },
      { letter: 'w', finger: 'L Ring', color: 'bg-purple-500 text-white' },
      { letter: 'e', finger: 'L Middle', color: 'bg-blue-500 text-white' },
      { letter: 'r', finger: 'L Index', color: 'bg-green-500 text-white' },
      { letter: 't', finger: 'L Index', color: 'bg-green-500 text-white' },
      { letter: 'y', finger: 'R Index', color: 'bg-yellow-500 text-black' },
      { letter: 'u', finger: 'R Index', color: 'bg-yellow-500 text-black' },
      { letter: 'i', finger: 'R Middle', color: 'bg-orange-500 text-white' },
      { letter: 'o', finger: 'R Ring', color: 'bg-red-500 text-white' },
      { letter: 'p', finger: 'R Pinky', color: 'bg-rose-500 text-white' },
    ],
    // Middle row
    [
      { letter: 'a', finger: 'L Pinky', color: 'bg-pink-500 text-white' },
      { letter: 's', finger: 'L Ring', color: 'bg-purple-500 text-white' },
      { letter: 'd', finger: 'L Middle', color: 'bg-blue-500 text-white' },
      { letter: 'f', finger: 'L Index', color: 'bg-green-500 text-white' },
      { letter: 'g', finger: 'L Index', color: 'bg-green-500 text-white' },
      { letter: 'h', finger: 'R Index', color: 'bg-yellow-500 text-black' },
      { letter: 'j', finger: 'R Index', color: 'bg-yellow-500 text-black' },
      { letter: 'k', finger: 'R Middle', color: 'bg-orange-500 text-white' },
      { letter: 'l', finger: 'R Ring', color: 'bg-red-500 text-white' },
      { letter: ';', finger: 'R Pinky', color: 'bg-rose-500 text-white' },
    ],
    // Bottom row
    [
      { letter: 'z', finger: 'L Pinky', color: 'bg-pink-500 text-white' },
      { letter: 'x', finger: 'L Ring', color: 'bg-purple-500 text-white' },
      { letter: 'c', finger: 'L Middle', color: 'bg-blue-500 text-white' },
      { letter: 'v', finger: 'L Index', color: 'bg-green-500 text-white' },
      { letter: 'b', finger: 'L Index', color: 'bg-green-500 text-white' },
      { letter: 'n', finger: 'R Index', color: 'bg-yellow-500 text-black' },
      { letter: 'm', finger: 'R Index', color: 'bg-yellow-500 text-black' },
      { letter: ',', finger: 'R Middle', color: 'bg-orange-500 text-white' },
      { letter: '.', finger: 'R Ring', color: 'bg-red-500 text-white' },
      { letter: '/', finger: 'R Pinky', color: 'bg-rose-500 text-white' },
    ]
  ];

  return (
    <div className="mt-8 p-4 bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <Keyboard className="h-5 w-5 text-primary" />
        <h3 className="font-medium">Keyboard Guide</h3>
      </div>
      
      <div className="flex flex-col gap-1.5 keyboard-container">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1 justify-center">
            {rowIndex === 1 && <div className="w-[20px]"></div>}
            {rowIndex === 2 && <div className="w-[35px]"></div>}
            
            {row.map((key) => (
              <Key
                key={key.letter}
                letter={key.letter}
                isActive={currentKey.toLowerCase() === key.letter}
                isNextKey={nextKey && nextKey.toLowerCase() === key.letter}
                finger={key.finger}
                fingerColor={key.color}
              />
            ))}
          </div>
        ))}
        
        <div className="mt-4 flex justify-center">
          <div className={`
            px-16 py-2 rounded-md border
            ${currentKey === ' ' ? 'bg-primary text-primary-foreground border-primary animate-key-press' : 
              nextKey === ' ' ? 'bg-accent/30 text-accent-foreground border-accent' : 'bg-card border-muted'}
            transition-all duration-200
          `}>
            <span className="text-sm text-muted-foreground">Space Bar - Both Thumbs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardVisualizer;
