
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Github } from 'lucide-react';
import { toast } from "sonner";
import ParticleBackground from '@/components/ParticleBackground';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !username || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!agreeToTerms) {
      toast.error('You must agree to the Terms of Service and Privacy Policy');
      return;
    }
    
    // In a real app, you would validate and send registration request here
    toast.success('Registration successful! Redirecting to login...');
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
          <h2 className="mt-6 text-3xl font-bold">Create your account</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-primary/90 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
        
        <div className="mt-8 bg-card/40 backdrop-blur-sm border border-muted/30 rounded-lg p-6 animate-fade-in">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="name" className="block mb-2">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
            
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
              <Label htmlFor="username" className="block mb-2">Username</Label>
              <Input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="block mb-2">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
            </div>
            
            <div>
              <Label htmlFor="confirm-password" className="block mb-2">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
            </div>
            
            <div className="flex items-start">
              <Checkbox 
                id="agree-terms" 
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
                className="mt-1"
              />
              <Label htmlFor="agree-terms" className="ml-2 block text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:text-primary/90 transition-colors">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-primary hover:text-primary/90 transition-colors">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            
            <div>
              <Button type="submit" className="w-full">Create Account</Button>
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
          By creating an account, you agree to our{" "}
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

export default RegisterPage;
