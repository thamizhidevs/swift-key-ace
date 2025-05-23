
import { useState, useEffect, useRef } from 'react';

interface TypingTextProps {
  text: string;
  isActive: boolean;
  onComplete: (stats: { wpm: number; accuracy: number; errors: number }) => void;
  duration?: number;
  onKeyPress?: (key: string) => void;
}

interface CharacterState {
  char: string;
  state: 'current' | 'correct' | 'incorrect' | 'untyped';
}

const TypingText = ({ text, isActive, onComplete, duration = 60, onKeyPress }: TypingTextProps) => {
  const [characters, setCharacters] = useState<CharacterState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [errors, setErrors] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  
  const typingBoxRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const chars = text.split('').map((char, index) => ({
      char,
      state: index === 0 ? 'current' as const : 'untyped' as const,
    }));
    setCharacters(chars);
    setCurrentIndex(0);
    setErrors(0);
    setStartTime(null);
    setTimeLeft(duration);
  }, [text, duration]);
  
  useEffect(() => {
    let timerId: number | undefined;
    
    if (isActive && startTime && timeLeft > 0) {
      timerId = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerId);
            
            const endTime = Date.now();
            const timeElapsed = (endTime - startTime) / 1000;
            const wordsTyped = currentIndex / 5;
            const wpm = Math.round((wordsTyped / timeElapsed) * 60);
            const correctChars = characters.filter(c => c.state === 'correct').length;
            const totalTypedChars = correctChars + errors;
            const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 0;
            
            onComplete({ wpm, accuracy, errors });
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [isActive, startTime, timeLeft, currentIndex, characters, errors, onComplete]);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isActive || timeLeft === 0) return;
      
      if (onKeyPress) {
        onKeyPress(e.key);
      }
      
      if (startTime === null) {
        setStartTime(Date.now());
      }
      
      if (e.ctrlKey || e.altKey || e.metaKey || e.key.startsWith('F')) return;
      
      if (e.key.length === 1 || e.key === 'Backspace' || e.key === 'Space') {
        e.preventDefault();
      }
      
      if (e.key === 'Backspace' && currentIndex > 0) {
        const newCharacters = [...characters];
        newCharacters[currentIndex].state = 'untyped';
        newCharacters[currentIndex - 1].state = 'current';
        setCharacters(newCharacters);
        setCurrentIndex(currentIndex - 1);
      } else if (e.key.length === 1) {
        const newCharacters = [...characters];
        const isCorrect = e.key === characters[currentIndex].char;
        
        newCharacters[currentIndex].state = isCorrect ? 'correct' : 'incorrect';
        
        if (currentIndex < characters.length - 1) {
          newCharacters[currentIndex + 1].state = 'current';
        }
        
        setCharacters(newCharacters);
        setCurrentIndex(currentIndex + 1);
        
        if (!isCorrect) {
          setErrors(errors + 1);
        }
        
        if (currentIndex === characters.length - 1) {
          const endTime = Date.now();
          const timeElapsed = (endTime - startTime!) / 1000;
          const wordsTyped = characters.length / 5;
          const wpm = Math.round((wordsTyped / timeElapsed) * 60);
          const correctChars = newCharacters.filter(c => c.state === 'correct').length;
          const totalTypedChars = correctChars + errors + (isCorrect ? 0 : 1);
          const accuracy = totalTypedChars > 0 ? Math.round((correctChars / totalTypedChars) * 100) : 0;
          
          onComplete({ wpm, accuracy, errors: errors + (isCorrect ? 0 : 1) });
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [characters, currentIndex, errors, isActive, onComplete, startTime, timeLeft, onKeyPress]);
  
  useEffect(() => {
    if (typingBoxRef.current) {
      const currentChar = typingBoxRef.current.querySelector('.current-char');
      if (currentChar) {
        currentChar.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentIndex]);
  
  return (
    <div className="relative">
      <div className="absolute -top-10 right-0">
        <span className="font-mono text-lg">{timeLeft}s</span>
      </div>
      
      <div 
        ref={typingBoxRef}
        className={`typing-text bg-muted/20 rounded-lg p-6 my-4 text-left max-h-60 overflow-y-auto ${!isActive ? 'opacity-70' : ''}`}
        tabIndex={0}
      >
        {characters.map((char, index) => {
          let className = '';
          
          switch (char.state) {
            case 'correct':
              className = 'correct-char';
              break;
            case 'incorrect':
              className = 'incorrect-char';
              break;
            case 'current':
              className = 'current-char';
              break;
            default:
              className = '';
          }
          
          return (
            <span key={index} className={className}>
              {char.char === ' ' ? '\u00A0' : char.char}
              {char.state === 'current' && <span className="typing-cursor"></span>}
            </span>
          );
        })}
      </div>
      
      {isActive && (
        <p className="text-muted-foreground text-sm mt-2">
          Click on the text and start typing.
        </p>
      )}
    </div>
  );
};

export default TypingText;
