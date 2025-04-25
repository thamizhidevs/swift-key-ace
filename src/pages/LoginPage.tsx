
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github } from 'lucide-react';
import { toast } from "sonner";
import ParticleBackground from '@/components/ParticleBackground';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // In a real app, you would validate and send login request here
    toast.success('Login successful! Redirecting...');
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <ParticleBackground />
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center">
          <Link to="/" className="inline-block">
            <div className="font-mono font-bold text-2xl mb-2">
              SwiftKey<span className="text-primary">Ace</span>
            </div>
          </Link>
          <h2 className="mt-6 text-3xl font-bold">Sign in to your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Or{" "}
            <Link to="/register" className="text-primary hover:text-primary/90 transition-colors">
              create a new account
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6 animate-fade-in">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="email" className="block mb-2">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor="password">Password</Label>
                <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/90 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
            </div>
            
            <div className="flex items-center">
              <Checkbox 
                id="remember-me" 
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              />
              <Label htmlFor="remember-me" className="ml-2">
                Remember me
              </Label>
            </div>
            
            <div>
              <Button type="submit" className="w-full">Sign in</Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-muted"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card/40 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </Button>
            </div>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mt-6">
          By signing in, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-foreground transition-colors">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-foreground transition-colors">
            Privacy Policy
          </Link>.
        </div>
      </div>
      
      <div className="mt-8">
        <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
          ← Back to home
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
