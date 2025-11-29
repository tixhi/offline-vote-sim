import { Button } from '@/components/ui/button';
import { NavLink } from '@/components/NavLink';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { Vote, Blocks, BarChart3, LogOut, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const Navigation = () => {
  const { currentVoter, setCurrentVoter, blockchain, pendingVotes } = useBlockchain();

  const handleLogout = () => {
    setCurrentVoter('');
  };

  return (
    <nav className="glass-nav sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              BlockVote
            </span>
          </div>

          <div className="flex items-center gap-1">
            <NavLink
              to="/"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            >
              <Vote className="w-4 h-4 inline mr-2" />
              Vote
            </NavLink>
            
            <NavLink
              to="/blockchain"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted relative"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            >
              <Blocks className="w-4 h-4 inline mr-2" />
              Blockchain
              {pendingVotes > 0 && (
                <Badge className="ml-2 bg-vote-pending text-xs px-1.5 py-0">
                  {pendingVotes}
                </Badge>
              )}
            </NavLink>
            
            <NavLink
              to="/results"
              className="px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted"
              activeClassName="bg-primary text-primary-foreground hover:bg-primary"
            >
              <BarChart3 className="w-4 h-4 inline mr-2" />
              Results
            </NavLink>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-sm">
              <p className="text-muted-foreground">Voter ID</p>
              <p className="font-semibold">{currentVoter}</p>
            </div>
            <div className="text-sm text-right">
              <p className="text-muted-foreground">Blocks</p>
              <p className="font-semibold">{blockchain.chain.length}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
