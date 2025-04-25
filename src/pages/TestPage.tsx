import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import TypingText from '@/components/typing/TypingText';
import ResultsDisplay from '@/components/typing/ResultsDisplay';
import KeyboardVisualizer from '@/components/typing/KeyboardVisualizer';
import LevelSelector, { LevelType } from '@/components/typing/LevelSelector';
import { getRandomTypingText } from '@/utils/typingTexts';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  Keyboard,
  PlayCircle,
  RotateCcw,
  Settings,
  Moon,
  Sun,
  Clock
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import ParticleBackground from '@/components/ParticleBackground';

interface TestResults {
  wpm: number;
  accuracy: number;
  errors: number;
}

const TestPage = () => {
  const [typingText, setTypingText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [testDuration, setTestDuration] = useState<number>(60);
  const [currentKey, setCurrentKey] = useState('');
  const [currentLevel, setCurrentLevel] = useState<LevelType>('letters');
  const [isDarkMode, setIsDarkMode] = useState(true);
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);
  
  useEffect(() => {
    setTypingText(getRandomTypingText());
  }, []);
  
  const handleStartTest = () => {
    setIsActive(true);
    setIsComplete(false);
    setResults(null);
    setTypingText(getRandomTypingText());
    
    toast.info(`${testDuration} second test started. Good luck!`);
  };
  
  const handleRestartTest = () => {
    setIsActive(false);
    setIsComplete(false);
    setResults(null);
    setTimeout(() => {
      handleStartTest();
    }, 300);
  };
  
  const handleTestComplete = (stats: TestResults) => {
    setIsActive(false);
    setIsComplete(true);
    setResults(stats);
    
    toast.success(`Test complete! ${stats.wpm} WPM with ${stats.accuracy}% accuracy`);
  };
  
  const handleShareResults = () => {
    if (!results) return;
    
    const shareText = `I just scored ${results.wpm} WPM with ${results.accuracy}% accuracy on SwiftKeyAce typing test! Try to beat my score! #SwiftKeyAce #TypingTest`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My SwiftKeyAce Typing Test Results',
        text: shareText,
        url: window.location.href,
      })
      .then(() => toast.info('Shared successfully'))
      .catch((error) => console.log('Error sharing:', error));
    } else {
      navigator.clipboard.writeText(shareText)
        .then(() => toast.info('Results copied to clipboard!'))
        .catch(() => toast.error('Failed to copy results'));
    }
  };
  
  const handleKeyPress = (key: string) => {
    setCurrentKey(key);
  };
  
  const getTextForLevel = (level: LevelType): string => {
    switch (level) {
      case 'letters':
        return 'asdfjkl; asdfjkl; asdfjkl; asdfjkl;';
      case 'words':
        return 'the quick brown fox jumps over the lazy dog';
      case 'game':
        return 'Type as fast as you can: "Race against time!"';
      default:
        return getRandomTypingText();
    }
  };
  
  const handleLevelChange = (level: LevelType) => {
    setCurrentLevel(level);
    setTypingText(getTextForLevel(level));
    setIsActive(false);
    setIsComplete(false);
    setResults(null);
  };

  return (
    <Layout>
      <ParticleBackground />
      
      <div className="container max-w-4xl py-10 px-4 md:py-16 md:px-6">
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <div className="text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Typing Test</h1>
              <p className="text-muted-foreground">
                Test your typing speed and accuracy with our interactive typing test.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </div>
          
          <LevelSelector
            currentLevel={currentLevel}
            onLevelChange={handleLevelChange}
          />
          
          {!isActive && !isComplete && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6 animate-fade-in">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Test Duration</h3>
                    <p className="text-sm text-muted-foreground">Select how long you want to type</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Select 
                    value={testDuration.toString()} 
                    onValueChange={(value) => setTestDuration(parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Seconds</SelectItem>
                      <SelectItem value="60">1 Minute</SelectItem>
                      <SelectItem value="120">2 Minutes</SelectItem>
                      <SelectItem value="300">5 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={handleStartTest}
                    className="space-x-2"
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>Start Test</span>
                  </Button>
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <Settings className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <h3 className="font-medium">Advanced Settings</h3>
                    <p className="text-sm text-muted-foreground">Customize your test experience</p>
                  </div>
                </div>
                
                <Button variant="outline">
                  Configure
                </Button>
              </div>
            </div>
          )}
          
          {(isActive || (!isActive && !isComplete)) && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6">
              <TypingText 
                text={typingText}
                isActive={isActive}
                onComplete={handleTestComplete}
                duration={testDuration}
                onKeyPress={handleKeyPress}
              />
              
              <KeyboardVisualizer currentKey={currentKey} />
              
              {!isActive && !isComplete && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={handleStartTest}
                    size="lg"
                    className="space-x-2 btn-glow"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Start Test</span>
                  </Button>
                </div>
              )}
              
              {isActive && (
                <div className="flex justify-center mt-8">
                  <Button 
                    onClick={() => setIsActive(false)}
                    variant="outline"
                    className="space-x-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Cancel</span>
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {isComplete && results && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6">
              <ResultsDisplay 
                wpm={results.wpm}
                accuracy={results.accuracy}
                errors={results.errors}
                onRetry={handleRestartTest}
                onShare={handleShareResults}
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Posture</h3>
              <p className="text-sm text-muted-foreground">
                Sit up straight with your feet flat on the floor. Keep your elbows bent at a 90-degree angle.
              </p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Finger Position</h3>
              <p className="text-sm text-muted-foreground">
                Place your fingers on the home row keys (ASDF for left hand, JKL; for right hand).
              </p>
            </div>
            
            <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-4">
              <h3 className="font-medium text-lg mb-2">Focus</h3>
              <p className="text-sm text-muted-foreground">
                Look at the screen, not your keyboard. This builds muscle memory and improves speed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TestPage;
