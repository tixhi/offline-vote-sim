import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useBlockchain } from '@/contexts/BlockchainContext';
import { toast } from 'sonner';
import { Check, User, CheckCircle2, AlertCircle } from 'lucide-react';

export const VotingInterface = () => {
  const { candidates, castVote, hasVoted, pendingVotes } = useBlockchain();
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVote = async () => {
    if (!selectedCandidate) {
      toast.error('Please select a candidate');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await castVote(selectedCandidate);
      toast.success('Vote cast successfully! Your vote is being added to the blockchain.', {
        description: 'Block will be mined shortly...'
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to cast vote');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasVoted) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md shadow-card">
          <CardContent className="pt-6 text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 rounded-full bg-vote-success/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-vote-success" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-display font-bold mb-2">Vote Recorded</h3>
              <p className="text-muted-foreground">
                Your vote has been securely recorded on the blockchain and cannot be changed.
              </p>
            </div>
            <div className="p-3 bg-muted rounded-lg text-sm space-y-1">
              <p className="font-semibold">✓ Encrypted with SHA-256</p>
              <p className="font-semibold">✓ Immutably stored</p>
              <p className="font-semibold">✓ Anonymously verified</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingVotes > 0 && (
        <div className="bg-vote-pending/10 border border-vote-pending/20 rounded-lg p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-vote-pending flex-shrink-0" />
          <div className="flex-1">
            <p className="font-semibold text-foreground">Vote Pending</p>
            <p className="text-sm text-muted-foreground">
              {pendingVotes} vote(s) waiting to be mined into a block...
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {candidates.map((candidate) => (
          <Card
            key={candidate.id}
            className={`cursor-pointer transition-all shadow-card hover:shadow-block ${
              selectedCandidate === candidate.id
                ? 'ring-2 ring-primary border-primary'
                : 'hover:border-primary/50'
            }`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{candidate.name}</CardTitle>
                    <Badge variant="secondary" className="mt-1">
                      {candidate.party}
                    </Badge>
                  </div>
                </div>
                {selectedCandidate === candidate.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-in zoom-in">
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed">
                {candidate.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button
          onClick={handleVote}
          disabled={!selectedCandidate || isSubmitting}
          className="w-full max-w-md h-12 gradient-primary text-primary-foreground hover:opacity-90 transition-opacity"
          size="lg"
        >
          {isSubmitting ? 'Casting Vote...' : 'Cast Your Vote'}
        </Button>
      </div>
    </div>
  );
};
