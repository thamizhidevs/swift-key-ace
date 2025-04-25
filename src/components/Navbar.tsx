
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Keyboard, 
  BookOpen, 
  Trophy, 
  Calendar, 
  FileText, 
  ChevronDown, 
  User,
  Clock, 
  Settings,
  LogOut 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// For demo purposes, we'll assume the user is not logged in initially
const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  // Helper function to determine if a link is active
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Keyboard className="h-8 w-8 text-primary animate-glow-pulse" />
              <span className="absolute -right-1 -top-1 h-3 w-3 bg-accent rounded-full"></span>
            </div>
            <span className="font-mono font-bold text-xl">SwiftKey<span className="text-primary">Ace</span></span>
          </Link>
          
          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link 
              to="/test" 
              className={`navbar-item flex items-center space-x-2 ${isActive('/test') ? 'active' : ''}`}
            >
              <Keyboard className="h-4 w-4" />
              <span>Typing Test</span>
            </Link>
            
            <Link 
              to="/practice" 
              className={`navbar-item flex items-center space-x-2 ${isActive('/practice') ? 'active' : ''}`}
            >
              <BookOpen className="h-4 w-4" />
              <span>Practice</span>
            </Link>
            
            <Link 
              to="/leaderboard" 
              className={`navbar-item flex items-center space-x-2 ${isActive('/leaderboard') ? 'active' : ''}`}
            >
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </Link>
            
            <Link 
              to="/daily-test" 
              className={`navbar-item flex items-center space-x-2 ${isActive('/daily-test') ? 'active' : ''}`}
            >
              <Calendar className="h-4 w-4" />
              <span>Daily Test</span>
            </Link>
            
            <Link 
              to="/custom-test" 
              className={`navbar-item flex items-center space-x-2 ${isActive('/custom-test') ? 'active' : ''}`}
            >
              <FileText className="h-4 w-4" />
              <span>Custom Test</span>
            </Link>
          </nav>
          
          {/* User Menu or Login/Register */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-sm font-medium text-accent-foreground">JD</span>
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="flex items-center space-x-2 w-full cursor-pointer">
                      <User className="h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/history" className="flex items-center space-x-2 w-full cursor-pointer">
                      <Clock className="h-4 w-4" />
                      <span>History</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center space-x-2 w-full cursor-pointer">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    className="flex items-center space-x-2 text-destructive cursor-pointer"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Button 
                  variant="ghost" 
                  asChild 
                  className="hover:bg-muted/20"
                >
                  <Link to="/login">Login</Link>
                </Button>
                <Button 
                  variant="default" 
                  asChild 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button - To be expanded in a real implementation */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
