
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Keyboard, RotateCcw, Share2 } from "lucide-react";

interface ResultsDisplayProps {
  wpm: number;
  accuracy: number;
  errors: number;
  onRetry: () => void;
  onShare?: () => void;
}

const ResultsDisplay = ({ wpm, accuracy, errors, onRetry, onShare }: ResultsDisplayProps) => {
  // Determine performance level
  const getPerformanceLevel = (wpm: number): string => {
    if (wpm < 30) return "Beginner";
    if (wpm < 50) return "Intermediate";
    if (wpm < 70) return "Advanced";
    if (wpm < 90) return "Expert";
    return "Master";
  };
  
  const performanceLevel = getPerformanceLevel(wpm);
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-1">Your Results</h2>
        <p className="text-muted-foreground">Performance level: {performanceLevel}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
          <CardHeader className="relative">
            <CardTitle className="text-center">WPM</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-bold text-center">{wpm}</div>
            <p className="text-xs text-muted-foreground text-center mt-1">Words Per Minute</p>
            <Progress value={Math.min((wpm / 120) * 100, 100)} className="mt-4 h-2" />
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-accent/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent"></div>
          <CardHeader className="relative">
            <CardTitle className="text-center">Accuracy</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-bold text-center">{accuracy}%</div>
            <p className="text-xs text-muted-foreground text-center mt-1">Correct Characters</p>
            <Progress value={accuracy} className="mt-4 h-2" />
          </CardContent>
        </Card>
        
        <Card className="bg-card/50 backdrop-blur-sm border-destructive/20 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-destructive/10 to-transparent"></div>
          <CardHeader className="relative">
            <CardTitle className="text-center">Errors</CardTitle>
          </CardHeader>
          <CardContent className="relative">
            <div className="text-4xl font-bold text-center">{errors}</div>
            <p className="text-xs text-muted-foreground text-center mt-1">Incorrect Characters</p>
            <Progress value={Math.min((errors / 50) * 100, 100)} className="mt-4 h-2" />
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center space-x-4 mt-8">
        <Button 
          onClick={onRetry}
          variant="outline"
          className="space-x-2"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        
        <Button className="space-x-2">
          <Keyboard className="h-4 w-4" />
          <span>New Test</span>
        </Button>
        
        {onShare && (
          <Button 
            variant="secondary"
            onClick={onShare}
            className="space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share Results</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResultsDisplay;
