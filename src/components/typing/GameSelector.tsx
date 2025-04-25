
import React from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad2, Zap, Skull, Rocket, Star, Brain, Shield } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GameSelectorProps {
  selectedGame: string;
  onSelectGame: (game: string) => void;
}

const GameSelector = ({ selectedGame, onSelectGame }: GameSelectorProps) => {
  const games = [
    {
      id: 'typingRace',
      name: 'Typing Race',
      description: 'Race against AI opponents by typing words accurately',
      icon: <Rocket className="h-5 w-5" />,
    },
    {
      id: 'zombieSurvival',
      name: 'Zombie Survival',
      description: 'Type words to defeat zombies before they reach you',
      icon: <Skull className="h-5 w-5" />,
    },
    {
      id: 'wordFlight',
      name: 'Word Flight',
      description: 'Type words to keep your plane in the air',
      icon: <Zap className="h-5 w-5" />,
    },
    {
      id: 'bossBattle',
      name: 'Boss Battle',
      description: 'Defeat the typing boss with your speed and accuracy',
      icon: <Shield className="h-5 w-5" />,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">Select a Game Mode</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {games.map((game) => (
          <TooltipProvider key={game.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={selectedGame === game.id ? "default" : "outline"}
                  onClick={() => onSelectGame(game.id)}
                  className={`flex flex-col items-center justify-center h-24 text-center p-2 ${
                    selectedGame === game.id 
                      ? 'border-primary shadow-lg shadow-primary/20' 
                      : ''
                  }`}
                >
                  <div className={`mb-2 ${selectedGame === game.id ? 'text-primary-foreground' : 'text-primary'}`}>
                    {game.icon}
                  </div>
                  <div className="text-sm font-medium">{game.name}</div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{game.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    </div>
  );
};

export default GameSelector;
