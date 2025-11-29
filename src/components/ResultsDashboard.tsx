import { useBlockchain } from '@/contexts/BlockchainContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Vote, TrendingUp } from 'lucide-react';

export const ResultsDashboard = () => {
  const { blockchain, candidates } = useBlockchain();
  
  const voteCount = blockchain.getVoteCount();
  const totalVotes = blockchain.getAllVotes().length;
  
  const resultsWithCandidates = candidates.map(candidate => ({
    ...candidate,
    votes: voteCount.get(candidate.id) || 0,
    percentage: totalVotes > 0 ? ((voteCount.get(candidate.id) || 0) / totalVotes) * 100 : 0
  })).sort((a, b) => b.votes - a.votes);

  const winner = resultsWithCandidates[0];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-display font-bold">Election Results</h2>
        <p className="text-muted-foreground">
          Real-time results from the blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Total Votes Cast</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Vote className="w-6 h-6 text-primary" />
              {totalVotes}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Blocks Mined</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-accent" />
              {blockchain.chain.length - 1}
            </CardTitle>
          </CardHeader>
        </Card>

        <Card className="shadow-card">
          <CardHeader className="pb-3">
            <CardDescription>Voter Turnout</CardDescription>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Users className="w-6 h-6 text-vote-success" />
              {totalVotes}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {totalVotes > 0 && (
        <Card className="shadow-block gradient-primary text-primary-foreground">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8" />
              <div>
                <CardTitle className="text-2xl">Current Leader</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  {winner.votes} votes ({winner.percentage.toFixed(1)}%)
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-2xl font-display font-bold">{winner.name}</p>
              <Badge className="bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30">
                {winner.party}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h3 className="text-xl font-display font-bold">All Candidates</h3>
        {resultsWithCandidates.map((candidate, index) => (
          <Card key={candidate.id} className="shadow-card">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl font-display font-bold text-muted-foreground">
                        #{index + 1}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-lg">{candidate.name}</h4>
                        <p className="text-sm text-muted-foreground">{candidate.party}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-display font-bold text-primary">
                      {candidate.votes}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {candidate.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Progress value={candidate.percentage} className="h-3" />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{candidate.votes} votes</span>
                    <span>{totalVotes - candidate.votes} remaining</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {totalVotes === 0 && (
        <Card className="shadow-card">
          <CardContent className="pt-6 text-center text-muted-foreground">
            <Vote className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No votes have been cast yet. Start voting to see results!</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
