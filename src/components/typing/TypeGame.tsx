
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Gamepad2, Zap, Skull, Rocket, Timer, Star, Brain, Shield } from 'lucide-react';
import { toast } from "sonner";

interface TypeGameProps {
  gameMode: string;
  onComplete: (stats: { wpm: number; accuracy: number; errors: number }) => void;
  isActive: boolean;
  setIsActive: (active: boolean) => void;
}

interface Word {
  id: number;
  text: string;
  position: {
    top: number;
    left: number;
  };
  speed: number;
  typed: boolean;
  health?: number;
}

const TypeGame: React.FC<TypeGameProps> = ({ gameMode, onComplete, isActive, setIsActive }) => {
  const [input, setInput] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerPosition, setPlayerPosition] = useState(0);
  const [bossHealth, setBossHealth] = useState(100);
  const [gameOver, setGameOver] = useState(false);
  const [wordPool] = useState([
    'speed', 'quick', 'type', 'fast', 'keyboard', 'race', 'game',
    'practice', 'skill', 'master', 'focus', 'champion', 'victory',
    'challenge', 'compete', 'level', 'score', 'win', 'letter',
    'word', 'sentence', 'paragraph', 'accuracy', 'error', 'correct'
  ]);
  
  // Start game when isActive changes to true
  useEffect(() => {
    if (isActive) {
      setStartTime(Date.now());
      setScore(0);
      setErrors(0);
      setTimeLeft(60);
      setGameOver(false);
      setWords([]);
      setCurrentLevel(1);
      setPlayerPosition(0);
      setBossHealth(100);
      
      // Initialize game based on mode
      initializeGame();
    } else {
      // Clean up game
      setWords([]);
    }
  }, [isActive]);
  
  // Handle timer
  useEffect(() => {
    let timerId: number | undefined;
    
    if (isActive && !gameOver && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endGame();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isActive, gameOver, timeLeft]);
  
  // Game animation loop
  useEffect(() => {
    let animationId: number;
    
    const updateGame = () => {
      if (!isActive || gameOver) return;
      
      // Update game state based on game mode
      switch (gameMode) {
        case 'typingRace':
          updateRaceGame();
          break;
        case 'zombieSurvival':
          updateZombieGame();
          break;
        case 'wordFlight':
          updateFlightGame();
          break;
        case 'bossBattle':
          updateBossBattle();
          break;
        default:
          break;
      }
      
      animationId = requestAnimationFrame(updateGame);
    };
    
    if (isActive && !gameOver) {
      animationId = requestAnimationFrame(updateGame);
    }
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isActive, gameOver, words, playerPosition, gameMode]);
  
  // Key press handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive || gameOver) return;
      
      if (e.key === 'Enter') {
        checkInput();
        return;
      }
      
      if (e.ctrlKey || e.altKey || e.metaKey) return;
      
      if (e.key === 'Backspace') {
        setInput(prev => prev.slice(0, -1));
        return;
      }
      
      if (e.key.length === 1) {
        setInput(prev => prev + e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive, gameOver, input]);
  
  // Add new words periodically
  useEffect(() => {
    let wordTimerId: number | undefined;
    
    if (isActive && !gameOver && ['zombieSurvival', 'wordFlight'].includes(gameMode)) {
      wordTimerId = window.setInterval(() => {
        addNewWord();
      }, 2000);
    }
    
    return () => {
      if (wordTimerId) clearInterval(wordTimerId);
    };
  }, [isActive, gameOver, gameMode, words]);
  
  const initializeGame = () => {
    switch (gameMode) {
      case 'typingRace':
        // Initialize race with AI opponents
        setWords([
          { id: 1, text: getRandomWord(), position: { top: 0, left: 0 }, speed: 0, typed: false },
          { id: 2, text: getRandomWord(), position: { top: 0, left: 0 }, speed: 0, typed: false },
          { id: 3, text: getRandomWord(), position: { top: 0, left: 0 }, speed: 0, typed: false }
        ]);
        toast.info("Race against AI opponents! Type words to accelerate your racer!");
        break;
      case 'zombieSurvival':
        // Start with a few zombies
        for (let i = 0; i < 3; i++) {
          addNewWord();
        }
        toast.info("Type the words to defeat the zombies before they reach you!");
        break;
      case 'wordFlight':
        setPlayerPosition(50);
        addNewWord();
        toast.info("Type words to stay airborne! Miss words and you'll lose altitude!");
        break;
      case 'bossBattle':
        setBossHealth(100);
        setWords([
          { id: 1, text: getRandomWord(), position: { top: 0, left: 0 }, speed: 0, typed: false },
        ]);
        toast.info("Defeat the typing boss by typing words correctly!");
        break;
      default:
        break;
    }
  };
  
  const getRandomWord = (): string => {
    return wordPool[Math.floor(Math.random() * wordPool.length)];
  };
  
  const addNewWord = () => {
    if (words.length >= 10) return;
    
    const newWord = {
      id: Date.now(),
      text: getRandomWord(),
      position: { 
        top: gameMode === 'zombieSurvival' ? Math.random() * 70 : Math.random() * 80,
        left: gameMode === 'zombieSurvival' ? 85 : Math.random() * 80
      },
      speed: 0.2 + (currentLevel * 0.05),
      typed: false
    };
    
    setWords(prev => [...prev, newWord]);
  };
  
  const checkInput = () => {
    const typedText = input.trim().toLowerCase();
    if (!typedText) return;
    
    // Check if input matches any words
    const wordIndex = words.findIndex(word => 
      !word.typed && word.text.toLowerCase() === typedText
    );
    
    if (wordIndex !== -1) {
      // Word match found
      handleCorrectWord(wordIndex);
    } else {
      // No match - count as error
      setErrors(prev => prev + 1);
      toast.error("Incorrect word!");
    }
    
    setInput('');
  };
  
  const handleCorrectWord = (wordIndex: number) => {
    setScore(prev => prev + (words[wordIndex].text.length * currentLevel));
    
    switch (gameMode) {
      case 'typingRace':
        // Move player forward
        setPlayerPosition(prev => Math.min(prev + 10, 100));
        if (playerPosition >= 90) {
          endGame(true);
          return;
        }
        setWords(prev => {
          const newWords = [...prev];
          newWords[wordIndex] = { ...newWords[wordIndex], typed: true };
          newWords.push({ 
            id: Date.now(), 
            text: getRandomWord(), 
            position: { top: 0, left: 0 }, 
            speed: 0, 
            typed: false 
          });
          return newWords.filter(word => !word.typed).slice(0, 3);
        });
        break;
        
      case 'zombieSurvival':
        // Remove the zombie word
        setWords(prev => prev.filter((_, i) => i !== wordIndex));
        toast.success("Zombie defeated!");
        
        // Check if level should increase
        if (score > currentLevel * 100) {
          setCurrentLevel(prev => prev + 1);
          toast.info(`Level ${currentLevel + 1}!`);
        }
        break;
        
      case 'wordFlight':
        // Boost player up
        setPlayerPosition(prev => Math.max(Math.min(prev - 10, 80), 10));
        setWords(prev => prev.filter((_, i) => i !== wordIndex));
        toast.success("Altitude gained!");
        break;
        
      case 'bossBattle':
        // Damage the boss
        setBossHealth(prev => {
          const newHealth = Math.max(0, prev - (words[wordIndex].text.length * 2));
          if (newHealth <= 0) {
            endGame(true);
          }
          return newHealth;
        });
        
        setWords(prev => {
          const newWords = prev.filter((_, i) => i !== wordIndex);
          
          // Add a new word if boss still alive
          if (bossHealth > 0) {
            return [...newWords, { 
              id: Date.now(), 
              text: getRandomWord(), 
              position: { top: 0, left: 0 }, 
              speed: 0, 
              typed: false 
            }];
          }
          
          return newWords;
        });
        break;
        
      default:
        setWords(prev => {
          const newWords = [...prev];
          newWords[wordIndex] = { ...newWords[wordIndex], typed: true };
          return newWords;
        });
        break;
    }
  };
  
  const updateRaceGame = () => {
    // Move AI racers at different speeds
    if (words.length < 3) {
      addNewWord();
    }
  };
  
  const updateZombieGame = () => {
    // Move zombies closer to player
    setWords(prev => 
      prev.map(word => {
        const newLeft = word.position.left - word.speed;
        
        // Check if zombie reached the player
        if (newLeft <= 0) {
          toast.error("Zombie got you!");
          endGame();
          return word;
        }
        
        return {
          ...word,
          position: {
            ...word.position,
            left: newLeft
          }
        };
      })
    );
  };
  
  const updateFlightGame = () => {
    // Player constantly falls unless typing correctly
    setPlayerPosition(prev => {
      const newPosition = prev + 0.2;
      if (newPosition >= 85) {
        toast.error("You crashed!");
        endGame();
        return 85;
      }
      return newPosition;
    });
  };
  
  const updateBossBattle = () => {
    // Boss occasionally attacks player
    if (Math.random() < 0.01) {
      // Boss attack - scramble words or add more difficult words
      toast.info("Boss attack! Words scrambled!");
      setWords(prev => 
        prev.map(word => ({
          ...word,
          text: getRandomWord()
        }))
      );
    }
  };
  
  const endGame = (victory: boolean = false) => {
    if (gameOver) return;
    
    const endTime = Date.now();
    const timeElapsed = ((endTime - (startTime || endTime)) / 1000) || 1;
    const wordsTyped = score / 5;
    const wpm = Math.round((wordsTyped / timeElapsed) * 60);
    const accuracy = Math.round(((score / 5) / ((score / 5) + errors)) * 100);
    
    if (victory) {
      toast.success(`Victory! ${score} points, ${wpm} WPM, ${accuracy}% accuracy`);
    } else {
      toast.error(`Game Over! ${score} points, ${wpm} WPM, ${accuracy}% accuracy`);
    }
    
    setIsActive(false);
    setGameOver(true);
    onComplete({ wpm, accuracy, errors });
  };
  
  const renderGame = () => {
    switch (gameMode) {
      case 'typingRace':
        return (
          <div className="relative h-60 bg-gradient-to-r from-muted/20 to-muted/30 rounded-lg overflow-hidden border border-muted/40 p-4">
            <div className="absolute bottom-0 left-0 w-full h-2 bg-muted/50"></div>
            <div className="absolute bottom-2 left-0 w-full flex flex-col gap-4">
              {/* Player car */}
              <div 
                className="absolute bottom-0 h-10 transition-all duration-200"
                style={{ left: `${playerPosition}%` }}
              >
                <div className="flex items-center justify-center bg-primary text-primary-foreground font-bold rounded-full p-2 animate-pulse shadow-lg">
                  <Rocket size={24} />
                  <span className="ml-1">YOU</span>
                </div>
              </div>
              
              {/* AI cars */}
              <div 
                className="absolute bottom-0 h-10"
                style={{ left: `${30 + (timeLeft % 20)}%` }}
              >
                <div className="flex items-center justify-center bg-muted text-muted-foreground rounded-full p-2 shadow">
                  <Rocket size={20} />
                  <span className="ml-1">AI 1</span>
                </div>
              </div>
              
              <div 
                className="absolute bottom-0 h-10"
                style={{ left: `${50 + (timeLeft % 15)}%` }}
              >
                <div className="flex items-center justify-center bg-muted text-muted-foreground rounded-full p-2 shadow">
                  <Rocket size={20} />
                  <span className="ml-1">AI 2</span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-4 left-0 w-full px-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span>{score}</span>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <h3 className="font-bold">Type these words to accelerate!</h3>
                <div className="flex justify-center gap-3 mt-2">
                  {words.slice(0, 3).map((word, i) => (
                    <div 
                      key={word.id} 
                      className={`px-3 py-1 rounded-md ${input.toLowerCase() === word.text.toLowerCase() 
                        ? 'bg-primary text-primary-foreground animate-pulse' 
                        : 'bg-muted/60'}`}
                    >
                      {word.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'zombieSurvival':
        return (
          <div className="relative h-60 bg-gradient-to-r from-stone-800/50 to-stone-900/50 rounded-lg overflow-hidden border border-muted/40">
            {/* Player */}
            <div className="absolute bottom-4 left-4">
              <Shield size={32} className="text-primary animate-pulse" />
            </div>
            
            {/* Zombies */}
            {words.map(word => (
              <div 
                key={word.id}
                className="absolute flex items-center animate-bounce-slow transition-all duration-200"
                style={{ 
                  top: `${word.position.top}%`, 
                  left: `${word.position.left}%` 
                }}
              >
                <div className={`flex flex-col items-center`}>
                  <Skull 
                    size={28} 
                    className={`text-red-500 ${
                      input.toLowerCase() === word.text.toLowerCase() 
                        ? 'animate-pulse text-amber-400' 
                        : ''
                    }`} 
                  />
                  <span className="text-xs font-mono bg-muted/30 px-1 rounded">
                    {word.text}
                  </span>
                </div>
              </div>
            ))}
            
            <div className="absolute top-4 left-4 right-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span>{score}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>Level {currentLevel}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'wordFlight':
        return (
          <div className="relative h-60 bg-gradient-to-b from-cyan-500/30 to-blue-900/40 rounded-lg overflow-hidden border border-muted/40">
            {/* Sky elements */}
            <div className="absolute top-10 left-[10%] w-12 h-8 bg-white/40 rounded-full blur-sm"></div>
            <div className="absolute top-20 left-[80%] w-16 h-10 bg-white/30 rounded-full blur-sm"></div>
            <div className="absolute top-5 left-[40%] w-20 h-6 bg-white/30 rounded-full blur-sm"></div>
            
            {/* Ground */}
            <div className="absolute bottom-0 left-0 w-full h-[15%] bg-gradient-to-t from-stone-700/70 to-stone-600/30"></div>
            
            {/* Player airplane */}
            <div 
              className="absolute left-[10%] transition-all duration-200 transform -translate-y-1/2"
              style={{ top: `${playerPosition}%` }}
            >
              <div className="flex items-center">
                <div className="w-12 h-6 bg-primary/80 rounded-md relative">
                  <div className="absolute top-1/2 right-0 w-3 h-4 bg-primary/80 -translate-y-1/2 translate-x-1"></div>
                  <div className="absolute top-0 left-1/2 w-6 h-1 bg-primary/80 -translate-x-1/2 -translate-y-1/2"></div>
                </div>
              </div>
            </div>
            
            {/* Words to type */}
            {words.map(word => (
              <div 
                key={word.id}
                className="absolute flex items-center justify-center animate-float transition-all duration-200"
                style={{ 
                  top: `${word.position.top}%`, 
                  left: `${word.position.left}%` 
                }}
              >
                <div className={`bg-muted/60 px-2 py-1 rounded-md ${
                  input.toLowerCase() === word.text.toLowerCase() 
                    ? 'bg-primary/80 text-primary-foreground animate-pulse' 
                    : 'bg-white/20'
                }`}>
                  {word.text}
                </div>
              </div>
            ))}
            
            {/* Game stats */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-amber-400" />
                  <span>Altitude: {Math.round(100 - playerPosition)}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span>{score}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'bossBattle':
        return (
          <div className="relative h-60 bg-gradient-to-b from-slate-900/60 to-slate-800/50 rounded-lg overflow-hidden border border-muted/40">
            {/* Boss */}
            <div className="absolute top-5 right-10 flex flex-col items-center">
              <div className="relative mb-1">
                <div className="w-full h-3 bg-muted/30 rounded-full">
                  <div 
                    className="h-full bg-red-500 rounded-full transition-all duration-200"
                    style={{ width: `${bossHealth}%` }}
                  ></div>
                </div>
              </div>
              
              <div className={`mt-2 transition-all duration-300 ${bossHealth < 30 ? 'animate-pulse text-red-400' : ''}`}>
                <Skull size={48} className={`text-red-400 ${bossHealth < 50 ? 'animate-bounce-slow' : ''}`} />
                <div className="text-xs text-center mt-1 font-semibold">Boss</div>
                <div className="text-xs text-center">HP: {bossHealth}%</div>
              </div>
            </div>
            
            {/* Player */}
            <div className="absolute bottom-10 left-10">
              <div className="flex flex-col items-center">
                <Shield size={32} className="text-primary" />
                <div className="text-xs text-center mt-1 font-semibold">You</div>
              </div>
            </div>
            
            {/* Words to type */}
            <div className="absolute bottom-40 left-0 right-0 flex justify-center">
              {words.map(word => (
                <div 
                  key={word.id}
                  className={`px-4 py-2 text-lg font-mono rounded-md ${
                    input.toLowerCase() === word.text.toLowerCase() 
                      ? 'bg-primary text-primary-foreground animate-pulse' 
                      : 'bg-muted/40'
                  } ${bossHealth < 30 ? 'animate-bounce-slow' : ''}`}
                >
                  {word.text}
                </div>
              ))}
            </div>
            
            {/* Game stats */}
            <div className="absolute top-4 left-4 right-4">
              <div className="flex justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Timer className="h-4 w-4" />
                  <span>{timeLeft}s</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-400" />
                  <span>{score}</span>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a game mode to begin</div>;
    }
  };
  
  return (
    <div className="game-container">
      {renderGame()}
      
      <div className="mt-4">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-2 rounded-md bg-muted/20 border border-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Type here..."
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                checkInput();
              }
            }}
            autoFocus
          />
          <Button 
            size="sm" 
            className="absolute right-1 top-1"
            onClick={checkInput}
          >
            Enter
          </Button>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <div>
            <span className="text-sm text-muted-foreground">Score: {score}</span>
            <span className="mx-2 text-sm text-muted-foreground">|</span>
            <span className="text-sm text-muted-foreground">Errors: {errors}</span>
          </div>
          
          {!isActive && (
            <Button onClick={() => setIsActive(true)} className="space-x-2">
              <Gamepad2 className="h-4 w-4" />
              <span>Start Game</span>
            </Button>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float {
          animation: float 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default TypeGame;
