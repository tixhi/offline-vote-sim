import { VotingInterface } from '@/components/VotingInterface';

const Voting = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
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
