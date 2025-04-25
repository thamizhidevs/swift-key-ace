
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from "@/components/ui/button";
import { 
  Keyboard,
  BookOpen,
  Trophy,
  ArrowRight,
  Clock,
  Target,
  Users,
  ScrollText
} from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import ParticleBackground from '@/components/ParticleBackground';

const Index = () => {
  const navigate = useNavigate();
  const [userCount, setUserCount] = useState(2549);
  const [testsToday, setTestsToday] = useState(876);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Keyboard animation letters
  const keyboardLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  return (
    <Layout>
      {/* Background particles */}
      <ParticleBackground />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className={`space-y-6 ${isLoaded ? 'animate-slide-in' : 'opacity-0'}`}>
              <div className="inline-flex items-center space-x-2 bg-muted/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>
                <span>{userCount.toLocaleString()} users online right now</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Level up your <span className="text-primary">typing speed</span> and accuracy
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground">
                Test your typing skills, track your progress, and compare with others on the global leaderboard.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => navigate('/test')}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow"
                >
                  <Keyboard className="h-5 w-5 mr-2" />
                  Start Typing Test
                </Button>
                
                <Button 
                  onClick={() => navigate('/practice')}
                  variant="outline"
                  size="lg"
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Practice Mode
                </Button>
              </div>
            </div>
            
            {/* Hero Visual - Keyboard Illustration */}
            <div className={`relative ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.3s' }}>
              <div className="bg-card/30 backdrop-blur-md border border-primary/10 rounded-xl p-6 shadow-lg">
                {/* Animated keyboard keys */}
                <div className="grid grid-cols-10 gap-2 max-w-md mx-auto">
                  {keyboardLetters.map((letter, index) => (
                    <div
                      key={letter}
                      className="keyboard-key flex items-center justify-center h-12 w-full"
                      style={{ 
                        animationDelay: `${index * 0.05}s`,
                        animation: isLoaded ? 'key-press 0.6s ease-in-out infinite' : 'none',
                        animationPlayState: index % 3 === 0 ? 'running' : 'paused'
                      }}
                    >
                      {letter}
                    </div>
                  ))}
                </div>
                
                {/* Typing metrics display */}
                <div className="mt-8 flex justify-between">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">75</div>
                    <div className="text-xs text-muted-foreground">WPM</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">98%</div>
                    <div className="text-xs text-muted-foreground">ACCURACY</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-2xl font-bold text-destructive">3</div>
                    <div className="text-xs text-muted-foreground">ERRORS</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 h-20 w-20 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -left-8 h-24 w-24 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose SwiftKeyAce?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform offers a comprehensive set of tools to help you improve your typing skills and track your progress.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className={`bg-card/50 backdrop-blur-sm border-muted/30 hover:border-primary/30 transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Timed Tests</h3>
                  <p className="text-muted-foreground text-sm">
                    Take timed typing tests to measure your speed and accuracy under pressure.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`bg-card/50 backdrop-blur-sm border-muted/30 hover:border-primary/30 transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.5s' }}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Practice Mode</h3>
                  <p className="text-muted-foreground text-sm">
                    Improve specific skills with focused practice sessions at your own pace.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`bg-card/50 backdrop-blur-sm border-muted/30 hover:border-primary/30 transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.6s' }}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Trophy className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Leaderboard</h3>
                  <p className="text-muted-foreground text-sm">
                    Compete with other users and see where you stand on the global leaderboard.
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`bg-card/50 backdrop-blur-sm border-muted/30 hover:border-primary/30 transition-all duration-300 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.7s' }}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <ScrollText className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Stats Tracking</h3>
                  <p className="text-muted-foreground text-sm">
                    Track your progress over time with detailed statistics and insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-16 px-4 md:px-6 bg-muted/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className={`stat-card ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
              <Users className="h-6 w-6 text-primary mb-2" />
              <div className="text-3xl font-bold">{userCount.toLocaleString()}</div>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            
            <div className={`stat-card ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.9s' }}>
              <Keyboard className="h-6 w-6 text-primary mb-2" />
              <div className="text-3xl font-bold">{testsToday.toLocaleString()}</div>
              <p className="text-muted-foreground">Tests Today</p>
            </div>
            
            <div className={`stat-card ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '1s' }}>
              <Trophy className="h-6 w-6 text-primary mb-2" />
              <div className="text-3xl font-bold">120 WPM</div>
              <p className="text-muted-foreground">Top Speed</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card/40 backdrop-blur-sm border border-primary/20 rounded-xl p-8 md:p-12 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 h-32 w-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 h-40 w-40 bg-accent/20 rounded-full blur-2xl"></div>
            
            <h2 className="text-3xl font-bold mb-4 relative z-10">Ready to improve your typing?</h2>
            <p className="text-muted-foreground max-w-xl mx-auto mb-8 relative z-10">
              Start with a quick test to assess your current typing speed and accuracy, then practice regularly to see your progress.
            </p>
            
            <Button 
              onClick={() => navigate('/test')}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground btn-glow relative z-10"
            >
              Start Typing Test
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
