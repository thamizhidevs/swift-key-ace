
import Layout from '@/components/Layout';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Trophy,
  Keyboard,
  Medal,
  Timer,
  ChevronUp,
  ChevronDown,
  Calendar
} from 'lucide-react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ParticleBackground from '@/components/ParticleBackground';

// Mock leaderboard data
const leaderboardData = [
  { id: 1, username: "typingmaster", wpm: 145, accuracy: 98, tests: 352, avatar: "TM" },
  { id: 2, username: "speedster", wpm: 139, accuracy: 97, tests: 281, avatar: "SP" },
  { id: 3, username: "keywarrior", wpm: 132, accuracy: 98, tests: 195, avatar: "KW" },
  { id: 4, username: "SwiftFingers", wpm: 128, accuracy: 96, tests: 423, avatar: "SF" },
  { id: 5, username: "KeyboardNinja", wpm: 125, accuracy: 99, tests: 312, avatar: "KN" },
  { id: 6, username: "TypeTitan", wpm: 120, accuracy: 97, tests: 178, avatar: "TT" },
  { id: 7, username: "CodeJammer", wpm: 118, accuracy: 95, tests: 267, avatar: "CJ" },
  { id: 8, username: "RapidTapper", wpm: 116, accuracy: 94, tests: 156, avatar: "RT" },
  { id: 9, username: "keysProdigy", wpm: 113, accuracy: 96, tests: 201, avatar: "kP" },
  { id: 10, username: "TypingWhiz", wpm: 110, accuracy: 98, tests: 189, avatar: "TW" },
  { id: 11, username: "FlashFingers", wpm: 108, accuracy: 93, tests: 145, avatar: "FF" },
  { id: 12, username: "SpeedTyper", wpm: 107, accuracy: 95, tests: 234, avatar: "ST" }
];

const LeaderboardPage = () => {
  const [sortBy, setSortBy] = useState<"wpm" | "accuracy" | "tests">("wpm");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [timeRange, setTimeRange] = useState("all-time");
  
  const toggleSortDirection = () => {
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };
  
  // Sort the leaderboard data
  const sortedData = [...leaderboardData].sort((a, b) => {
    if (sortDirection === "asc") {
      return a[sortBy] - b[sortBy];
    } else {
      return b[sortBy] - a[sortBy];
    }
  });
  
  return (
    <Layout>
      <ParticleBackground />
      
      <div className="container max-w-4xl py-10 px-4 md:py-16 md:px-6">
        <div className="space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="h-12 w-12 text-amber-400 animate-glow-pulse" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Leaderboard</h1>
            <p className="text-muted-foreground">
              See how you stack up against the fastest typists in the world.
            </p>
          </div>
          
          {/* Leaderboard Filters */}
          <div className="bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-medium text-lg mb-1">Leaderboard Rankings</h3>
                <p className="text-sm text-muted-foreground">
                  See top typists ranked by speed, accuracy, or number of tests
                </p>
              </div>
              
              <div className="flex gap-3">
                <Select 
                  value={timeRange} 
                  onValueChange={setTimeRange}
                >
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Time Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Today</SelectItem>
                    <SelectItem value="weekly">This Week</SelectItem>
                    <SelectItem value="monthly">This Month</SelectItem>
                    <SelectItem value="all-time">All Time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="mt-6">
              <Tabs defaultValue="wpm" onValueChange={(v) => setSortBy(v as any)}>
                <TabsList className="grid grid-cols-3">
                  <TabsTrigger value="wpm" className="flex items-center space-x-2">
                    <Keyboard className="h-4 w-4" />
                    <span>WPM</span>
                  </TabsTrigger>
                  <TabsTrigger value="accuracy" className="flex items-center space-x-2">
                    <Timer className="h-4 w-4" />
                    <span>Accuracy</span>
                  </TabsTrigger>
                  <TabsTrigger value="tests" className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Tests</span>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="wpm">
                  <div className="mt-4">
                    <LeaderboardTable 
                      data={sortedData} 
                      sortBy="wpm"
                      sortDirection={sortDirection}
                      toggleSortDirection={toggleSortDirection}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="accuracy">
                  <div className="mt-4">
                    <LeaderboardTable 
                      data={sortedData} 
                      sortBy="accuracy"
                      sortDirection={sortDirection}
                      toggleSortDirection={toggleSortDirection}
                    />
                  </div>
                </TabsContent>
                
                <TabsContent value="tests">
                  <div className="mt-4">
                    <LeaderboardTable 
                      data={sortedData} 
                      sortBy="tests"
                      sortDirection={sortDirection}
                      toggleSortDirection={toggleSortDirection}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Your Ranking */}
          <div className="bg-card/30 backdrop-blur-sm border border-muted/20 rounded-lg p-6">
            <h3 className="font-medium text-lg mb-4">Your Ranking</h3>
            
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <span className="text-sm font-medium">?</span>
              </div>
              
              <div className="text-center">
                <p className="text-muted-foreground">Sign in to see your leaderboard position</p>
                <div className="mt-4">
                  <Button asChild>
                    <a href="/login">Login / Register</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

interface LeaderboardTableProps {
  data: typeof leaderboardData;
  sortBy: "wpm" | "accuracy" | "tests";
  sortDirection: "asc" | "desc";
  toggleSortDirection: () => void;
}

const LeaderboardTable = ({ 
  data, 
  sortBy,
  sortDirection,
  toggleSortDirection
}: LeaderboardTableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase border-b border-muted/30">
          <tr>
            <th className="px-4 py-3 text-left">Rank</th>
            <th className="px-4 py-3 text-left">User</th>
            <th className="px-4 py-3 text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 hover:bg-transparent hover:text-primary font-normal"
                onClick={toggleSortDirection}
              >
                WPM
                {sortBy === "wpm" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="h-3 w-3 ml-1" /> : 
                    <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </Button>
            </th>
            <th className="px-4 py-3 text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 hover:bg-transparent hover:text-primary font-normal"
                onClick={toggleSortDirection}
              >
                Accuracy
                {sortBy === "accuracy" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="h-3 w-3 ml-1" /> : 
                    <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </Button>
            </th>
            <th className="px-4 py-3 text-right">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-auto p-0 hover:bg-transparent hover:text-primary font-normal"
                onClick={toggleSortDirection}
              >
                Tests
                {sortBy === "tests" && (
                  sortDirection === "asc" ? 
                    <ChevronUp className="h-3 w-3 ml-1" /> : 
                    <ChevronDown className="h-3 w-3 ml-1" />
                )}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((user, index) => (
            <tr 
              key={user.id} 
              className="border-b border-muted/10 hover:bg-muted/5 transition-colors duration-200"
            >
              <td className="px-4 py-3 flex items-center">
                {index === 0 && <Medal className="h-4 w-4 text-amber-400 mr-1.5" />}
                {index === 1 && <Medal className="h-4 w-4 text-gray-300 mr-1.5" />}
                {index === 2 && <Medal className="h-4 w-4 text-amber-700 mr-1.5" />}
                {index > 2 && <span className="text-muted-foreground w-5.5 ml-0.5">{index + 1}</span>}
              </td>
              <td className="px-4 py-3 flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-accent/30 flex items-center justify-center">
                  <span className="text-xs">{user.avatar}</span>
                </div>
                <span>{user.username}</span>
              </td>
              <td className="px-4 py-3 text-right font-mono">
                {user.wpm} <span className="text-muted-foreground text-xs">wpm</span>
              </td>
              <td className="px-4 py-3 text-right font-mono">
                {user.accuracy}%
              </td>
              <td className="px-4 py-3 text-right font-mono">
                {user.tests}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderboardPage;
