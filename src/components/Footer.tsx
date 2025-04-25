
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t border-border bg-background mt-auto py-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* App Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="font-mono font-bold text-xl">SwiftKey<span className="text-primary">Ace</span></span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Level up your typing speed and accuracy with our interactive typing tests and practice sessions.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/test" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Typing Test
                </Link>
              </li>
              <li>
                <Link to="/practice" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Practice Mode
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/daily-test" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Daily Test
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Help / FAQs
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-muted-foreground hover:text-primary transition-colors text-sm cursor-pointer"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          
          {/* Connect */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Connect</h3>
            <div className="flex space-x-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/70 transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/70 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/70 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-full flex items-center justify-center bg-muted hover:bg-muted/70 transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} SwiftKeyAce. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              GitHub
            </a>
            <span className="text-border">•</span>
            <Link 
              to="/privacy" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Privacy
            </Link>
            <span className="text-border">•</span>
            <Link 
              to="/terms" 
              className="text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
