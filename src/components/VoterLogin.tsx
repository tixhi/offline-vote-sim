import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Vote } from 'lucide-react';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { toast } from 'sonner';

export const VoterLogin = () => {
  const [voterId, setVoterId] = useState('');
  const { setCurrentVoter } = useBlockchain();

  const handleLogin = () => {
    if (!voterId.trim()) {
      toast.error('Please enter a Voter ID');
      return;
    }
    
    setCurrentVoter(voterId);
    toast.success('Logged in successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="absolute inset-0 gradient-primary blur-xl opacity-50 animate-pulse-slow" />
              <Shield className="relative w-16 h-16 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            BlockVote
          </h1>
          <p className="text-muted-foreground">Secure Blockchain Voting System</p>
        </div>

        <Card className="glass-card shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="w-5 h-5 text-primary" />
              Voter Authentication
            </CardTitle>
            <CardDescription>
              Enter your unique Voter ID to access the voting portal
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Input
                placeholder="Enter your Voter ID (e.g., VOTER-001)"
                value={voterId}
                onChange={(e) => setVoterId(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="h-12"
              />
              <p className="text-xs text-muted-foreground">
                Demo IDs: VOTER-001, VOTER-002, VOTER-003
              </p>
            </div>
            
            <Button 
              onClick={handleLogin}
              className="w-full h-12 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Access Voting Portal
            </Button>

            <div className="pt-4 border-t space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Blockchain Status</span>
                <span className="flex items-center gap-1 text-vote-success">
                  <span className="w-2 h-2 rounded-full bg-vote-success animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Security Level</span>
                <span className="text-primary font-semibold">SHA-256 Encrypted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>🔒 All votes are encrypted and stored on an immutable blockchain</p>
        </div>
      </div>
    </div>
  );
};
