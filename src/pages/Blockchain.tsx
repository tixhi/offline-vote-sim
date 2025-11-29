import { BlockchainViewer } from '@/components/BlockchainViewer';

const Blockchain = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl relative">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-40 left-1/4 w-96 h-96 bg-blockchain-node/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-blockchain-link/10 rounded-full blur-3xl" />
      </div>
      <BlockchainViewer />
    </div>
  );
};

export default Blockchain;
