
import { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  PlayCircle, 
  Save,
  Clock,
  Edit, 
  FileUp,
} from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ParticleBackground from '@/components/ParticleBackground';
import TypingText from '@/components/typing/TypingText';
import ResultsDisplay from '@/components/typing/ResultsDisplay';
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TestResults {
  wpm: number;
  accuracy: number;
  errors: number;
}

const CustomTestPage = () => {
  const [customText, setCustomText] = useState('');
  const [testTitle, setTestTitle] = useState('');
  const [testDuration, setTestDuration] = useState<number>(60);
  const [isActive, setIsActive] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  
  // Handle start test
  const handleStartTest = () => {
    if (customText.trim().length < 20) {
      toast.error('Please enter at least 20 characters for the test');
      return;
    }
    
    setIsActive(true);
    setIsComplete(false);
    setResults(null);
    
    toast.info(`Custom test started! ${testDuration} second challenge.`);
  };
  
  // Handle restart test
  const handleRestartTest = () => {
    setIsActive(false);
    setIsComplete(false);
    setResults(null);
    setTimeout(() => {
      handleStartTest();
    }, 300);
  };
  
  // Handle test complete
  const handleTestComplete = (stats: TestResults) => {
    setIsActive(false);
    setIsComplete(true);
    setResults(stats);
    
    // Show toast with results
    toast.success(`Test complete! ${stats.wpm} WPM with ${stats.accuracy}% accuracy`);
  };
  
  // Handle save test
  const handleSaveTest = () => {
    if (!testTitle || customText.trim().length < 20) {
      toast.error('Please enter a title and at least 20 characters of text');
      return;
    }
    
    toast.success('Custom test saved successfully!');
  };
  
  return (
    <Layout>
      <ParticleBackground />
      
      <div className="container max-w-4xl py-10 px-4 md:py-16 md:px-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-primary animate-glow-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Custom Typing Test</h1>
            <p className="text-muted-foreground">
              Create a personalized typing test with your own text content.
            </p>
          </div>
          
          {/* Test Creation */}
          {!isActive && !isComplete && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6 animate-fade-in">
              <div className="space-y-6">
                <div>
                  <Label htmlFor="title" className="mb-2 block">Test Title</Label>
                  <Input 
                    id="title"
                    value={testTitle}
                    onChange={(e) => setTestTitle(e.target.value)}
                    placeholder="Give your test a name..."
                  />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="text">Test Content</Label>
                    <div className="text-sm text-muted-foreground">
                      {customText.length} characters / {Math.round(customText.length / 5)} words
                    </div>
                  </div>
                  <Textarea
                    id="text"
                    value={customText}
                    onChange={(e) => setCustomText(e.target.value)}
                    placeholder="Enter the text for your custom typing test here..."
                    className="min-h-[200px]"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Add the text you want to practice or test typing speed with.
                  </p>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <h3 className="font-medium">Test Duration</h3>
                      <p className="text-sm text-muted-foreground">How long should the test run?</p>
                    </div>
                  </div>
                  
                  <Select 
                    value={testDuration.toString()} 
                    onValueChange={(value) => setTestDuration(parseInt(value))}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 Seconds</SelectItem>
                      <SelectItem value="60">1 Minute</SelectItem>
                      <SelectItem value="120">2 Minutes</SelectItem>
                      <SelectItem value="300">5 Minutes</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" className="flex items-center space-x-2">
                      <FileUp className="h-4 w-4" />
                      <span>Upload Text File</span>
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="flex items-center space-x-2"
                      onClick={handleSaveTest}
                    >
                      <Save className="h-4 w-4" />
                      <span>Save Test</span>
                    </Button>
                  </div>
                  
                  <Button 
                    onClick={handleStartTest}
                    className="flex items-center space-x-2"
                    disabled={customText.trim().length < 20}
                  >
                    <PlayCircle className="h-4 w-4" />
                    <span>Start Test</span>
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Test Area */}
          {(isActive || isComplete) && (
            <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6">
              {/* Test title */}
              {testTitle && (
                <div className="mb-6 pb-4 border-b border-muted/20">
                  <h2 className="text-xl font-medium">{testTitle}</h2>
                  <p className="text-sm text-muted-foreground">Custom Typing Test</p>
                </div>
              )}
              
              {isActive && (
                <TypingText 
                  text={customText}
                  isActive={isActive}
                  onComplete={handleTestComplete}
                  duration={testDuration}
                />
              )}
              
              {isComplete && results && (
                <ResultsDisplay 
                  wpm={results.wpm}
                  accuracy={results.accuracy}
                  errors={results.errors}
                  onRetry={handleRestartTest}
                />
              )}
              
              {/* Return to edit button */}
              {isComplete && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setIsActive(false);
                      setIsComplete(false);
                      setResults(null);
                    }}
                    className="flex items-center space-x-2"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit Test</span>
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Suggestions */}
          <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-6">
            <h3 className="font-medium text-xl mb-4">Test Text Suggestions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">For Skill Development</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Programming code snippets</li>
                  <li>Tongue twisters for accuracy</li>
                  <li>Text with specific punctuation to practice</li>
                  <li>Number and symbol heavy content</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">For Practical Practice</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Email drafts you write frequently</li>
                  <li>Documentation from your work</li>
                  <li>Academic papers or research</li>
                  <li>Creative writing or poetry</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CustomTestPage;
