
import Layout from '@/components/Layout';
import ParticleBackground from '@/components/ParticleBackground';
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Trophy } from 'lucide-react';

const DailyTestPage = () => {
  return (
    <Layout>
      <ParticleBackground />
      
      <div className="container max-w-4xl py-10 px-4 md:py-16 md:px-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Calendar className="h-12 w-12 text-primary animate-glow-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Daily Typing Test</h1>
            <p className="text-muted-foreground">
              A new challenge every day. Complete the daily test to earn badges and climb the leaderboard.
            </p>
          </div>
          
          {/* Daily Challenge */}
          <div className="bg-card/40 backdrop-blur-sm border border-primary/20 rounded-lg p-8 text-center relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 h-32 w-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 right-0 h-40 w-40 bg-accent/20 rounded-full blur-2xl"></div>
            
            <div className="relative space-y-6">
              <h2 className="text-2xl font-bold">Today's Challenge</h2>
              
              <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
                <div className="text-center">
                  <Clock className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="text-xl font-medium">1 minute</p>
                </div>
                
                <div className="text-center">
                  <Trophy className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Current Leader</p>
                  <p className="text-xl font-medium">typingmaster (145 WPM)</p>
                </div>
                
                <div className="text-center">
                  <Calendar className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Resets In</p>
                  <p className="text-xl font-medium">8 hours 42 minutes</p>
                </div>
              </div>
              
              <Button size="lg" className="btn-glow">
                Start Daily Test
              </Button>
              
              <p className="text-sm text-muted-foreground">
                You haven't attempted today's challenge yet
              </p>
            </div>
          </div>
          
          {/* Daily Test Explanation */}
          <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-6">
            <h3 className="font-medium text-xl mb-4">About Daily Tests</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h4 className="font-medium">New Test Every Day</h4>
                <p className="text-sm text-muted-foreground">
                  Each day, a new typing test is available for all users. The test has a fixed duration
                  and content, ensuring fair competition.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Daily Leaderboard</h4>
                <p className="text-sm text-muted-foreground">
                  Your score will be added to the daily leaderboard, which resets every day at midnight UTC.
                  See how you stack up against other typists!
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Earn Badges</h4>
                <p className="text-sm text-muted-foreground">
                  Complete daily tests to earn special badges. Streak badges are awarded for completing
                  tests on consecutive days.
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Track Improvement</h4>
                <p className="text-sm text-muted-foreground">
                  Compare your daily test results over time to see how you're improving.
                  Daily tests are a great way to track your progress.
                </p>
              </div>
            </div>
          </div>
          
          {/* Coming Soon */}
          <div className="bg-card/30 backdrop-blur-sm border-accent/20 border rounded-lg p-6 text-center">
            <h3 className="font-medium text-xl mb-2">Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              We're working on more exciting features for daily tests:
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">Daily Challenges</h4>
                <p className="text-sm text-muted-foreground">
                  Special typing challenges with unique scoring criteria.
                </p>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">Friend Competitions</h4>
                <p className="text-sm text-muted-foreground">
                  Challenge your friends to beat your daily test score.
                </p>
              </div>
              
              <div className="bg-muted/20 rounded-lg p-4">
                <h4 className="font-medium">Themed Tests</h4>
                <p className="text-sm text-muted-foreground">
                  Special tests based on topics, holidays, or events.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DailyTestPage;
