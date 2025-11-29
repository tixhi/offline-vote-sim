import { VotingInterface } from '@/components/VotingInterface';

const Voting = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="mb-8 text-center space-y-2">
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Presidential Election 2024
        </h1>
        <p className="text-muted-foreground text-lg">
          Cast your vote securely on the blockchain
        </p>
      </div>
      
      <VotingInterface />
    </div>
  );
};

export default Voting;
