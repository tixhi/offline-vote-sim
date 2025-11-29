import { useBlockchain } from '@/contexts/BlockchainContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Box, Link2, Clock, Hash } from 'lucide-react';
import { format } from 'date-fns';

export const BlockchainViewer = () => {
  const { blockchain } = useBlockchain();

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold">Blockchain Explorer</h2>
        <p className="text-muted-foreground">
          View all blocks in the immutable chain
        </p>
      </div>

      <div className="grid gap-4">
        {blockchain.chain.map((block, index) => (
          <div key={block.index} className="relative">
            {index !== blockchain.chain.length - 1 && (
              <div className="absolute left-8 top-full w-0.5 h-4 bg-blockchain-link -z-10" />
            )}
            
            <Card className="shadow-block hover:shadow-card transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blockchain-node/20 blur-lg" />
                      <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                        <Box className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        Block #{block.index}
                        {block.index === 0 && (
                          <Badge variant="secondary" className="text-xs">
                            Genesis
                          </Badge>
                        )}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {format(block.timestamp, 'PPpp')}
                      </CardDescription>
                    </div>
                  </div>
                  
                  <Badge className="bg-vote-success/10 text-vote-success border-vote-success/20">
                    {block.data.votes.length} Vote{block.data.votes.length !== 1 ? 's' : ''}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <Hash className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-muted-foreground mb-1">Hash</p>
                      <code className="block text-xs bg-muted p-2 rounded break-all font-mono">
                        {block.hash}
                      </code>
                    </div>
                  </div>
                  
                  {block.index > 0 && (
                    <div className="flex items-start gap-2">
                      <Link2 className="w-4 h-4 text-blockchain-link mt-0.5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-muted-foreground mb-1">Previous Hash</p>
                        <code className="block text-xs bg-muted p-2 rounded break-all font-mono">
                          {block.previousHash}
                        </code>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <p className="text-muted-foreground mb-1">Nonce</p>
                      <p className="font-semibold font-mono">{block.nonce}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground mb-1">Election</p>
                      <p className="font-semibold truncate">{block.data.election}</p>
                    </div>
                  </div>
                </div>

                {block.data.votes.length > 0 && (
                  <div className="pt-4 border-t space-y-2">
                    <p className="text-sm font-semibold">Votes in this block:</p>
                    <div className="space-y-2">
                      {block.data.votes.map((vote, voteIndex) => (
                        <div
                          key={voteIndex}
                          className="text-xs bg-muted/50 p-2 rounded flex items-center justify-between"
                        >
                          <span className="text-muted-foreground">
                            Voter: {vote.voterId}
                          </span>
                          <span className="font-mono">
                            {format(vote.timestamp, 'HH:mm:ss')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-vote-success animate-pulse" />
            <span className="font-semibold">
              Chain is valid: {blockchain.isChainValid() ? '✓ Verified' : '✗ Corrupted'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
