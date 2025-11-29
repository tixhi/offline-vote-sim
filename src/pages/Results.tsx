import { ResultsDashboard } from '@/components/ResultsDashboard';

const Results = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 right-20 w-96 h-96 bg-vote-success/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>
      <ResultsDashboard />
    </div>
  );
};

export default Results;
