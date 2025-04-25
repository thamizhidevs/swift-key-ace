
import { useState } from 'react';
import Layout from '@/components/Layout';
import TypingText from '@/components/typing/TypingText';
import ResultsDisplay from '@/components/typing/ResultsDisplay';
import { getTypingTextByDifficulty } from '@/utils/typingTexts';
import { Button } from "@/components/ui/button";
import { PlayCircle, FileText, BrainCircuit } from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { toast } from "sonner";
import ParticleBackground from '@/components/ParticleBackground';
import { Textarea } from "@/components/ui/textarea";

interface TestResults {
  wpm: number;
  accuracy: number;
  errors: number;
}

const PracticePage = () => {
  const [typingText, setTypingText] = useState(getTypingTextByDifficulty('easy'));
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [customText, setCustomText] = useState('');
  
  // Handle practice start
  const handleStartPractice = () => {
    setIsActive(true);
    setIsComplete(false);
    setResults(null);
    
    toast.info(`Practice session started. No time limit. Take your time!`);
  };
  
  // Handle practice restart
  const handleRestartPractice = () => {
    setIsActive(false);
    setIsComplete(false);
    setResults(null);
    setTimeout(() => {
      handleStartPractice();
    }, 300);
  };
  
  // Handle practice completion
  const handlePracticeComplete = (stats: TestResults) => {
    setIsActive(false);
    setIsComplete(true);
    setResults(stats);
    
    // Show toast with results
    toast.success(`Practice complete! ${stats.wpm} WPM with ${stats.accuracy}% accuracy`);
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty: 'easy' | 'medium' | 'hard') => {
    setDifficulty(newDifficulty);
    setTypingText(getTypingTextByDifficulty(newDifficulty));
    
    if (isActive) {
      setIsActive(false);
      setIsComplete(false);
      setResults(null);
    }
  };
  
  // Handle custom text submission
  const handleCustomTextSubmit = () => {
    if (customText.trim().length < 10) {
      toast.error('Please enter at least 10 characters for your custom text');
      return;
    }
    
    setTypingText(customText);
    setIsActive(false);
    setIsComplete(false);
    setResults(null);
  };
  
  return (
    <Layout>
      <ParticleBackground />
      
      <div className="container max-w-4xl py-10 px-4 md:py-16 md:px-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Practice Mode</h1>
            <p className="text-muted-foreground">
              Improve your typing skills at your own pace without time pressure.
            </p>
          </div>
          
          {/* Practice Settings */}
          {!isActive && !isComplete && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6 animate-fade-in">
              <Tabs defaultValue="standard" className="w-full">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="standard" className="flex items-center space-x-2">
                    <BrainCircuit className="h-4 w-4" />
                    <span>Standard Practice</span>
                  </TabsTrigger>
                  <TabsTrigger value="custom" className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>Custom Text</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="standard">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">Select Difficulty</h3>
                      
                      <div className="flex space-x-3">
                        <Button 
                          variant={difficulty === 'easy' ? 'default' : 'outline'} 
                          onClick={() => handleDifficultyChange('easy')}
                          size="sm"
                        >
                          Easy
                        </Button>
                        <Button 
                          variant={difficulty === 'medium' ? 'default' : 'outline'} 
                          onClick={() => handleDifficultyChange('medium')}
                          size="sm"
                        >
                          Medium
                        </Button>
                        <Button 
                          variant={difficulty === 'hard' ? 'default' : 'outline'} 
                          onClick={() => handleDifficultyChange('hard')}
                          size="sm"
                        >
                          Hard
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        onClick={handleStartPractice}
                        className="space-x-2"
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>Start Practice</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="custom">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Enter Your Custom Text</h3>
                      <Textarea
                        value={customText}
                        onChange={(e) => setCustomText(e.target.value)}
                        placeholder="Type or paste your text here..."
                        className="min-h-[120px]"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        Enter the text you want to practice typing.
                      </p>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button 
                        onClick={handleCustomTextSubmit}
                        variant="outline"
                        className="space-x-2"
                      >
                        <FileText className="h-4 w-4" />
                        <span>Use This Text</span>
                      </Button>
                      
                      <Button 
                        onClick={handleStartPractice}
                        className="space-x-2"
                        disabled={customText.trim().length < 10}
                      >
                        <PlayCircle className="h-4 w-4" />
                        <span>Start Practice</span>
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
          
          {/* Practice Area */}
          {(isActive || isComplete) && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6">
              {isActive && (
                <TypingText 
                  text={typingText}
                  isActive={isActive}
                  onComplete={handlePracticeComplete}
                  duration={999} // Very long duration as this is practice mode
                />
              )}
              
              {isComplete && results && (
                <ResultsDisplay 
                  wpm={results.wpm}
                  accuracy={results.accuracy}
                  errors={results.errors}
                  onRetry={handleRestartPractice}
                />
              )}
            </div>
          )}
          
          {/* Practice Tips */}
          <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-6">
            <h3 className="font-medium text-xl mb-4">Practice Tips</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">Focus on Accuracy First</h4>
                <p className="text-sm text-muted-foreground">
                  It's better to type slowly and accurately than to rush and make errors.
                  Speed will come naturally as you build muscle memory.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Regular Practice</h4>
                <p className="text-sm text-muted-foreground">
                  Frequent short practice sessions are more effective than occasional long ones.
                  Try to practice for at least 15 minutes every day.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Touch Typing</h4>
                <p className="text-sm text-muted-foreground">
                  Learn to type without looking at the keyboard. Each finger should have its own
                  designated keys to press.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Track Progress</h4>
                <p className="text-sm text-muted-foreground">
                  Keep track of your WPM and accuracy over time to see your improvement
                  and identify areas that need more work.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
