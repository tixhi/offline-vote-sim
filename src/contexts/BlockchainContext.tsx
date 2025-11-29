import React, { createContext, useContext, useState, useEffect } from 'react';
import { Blockchain, Vote } from '@/lib/blockchain';

export interface Candidate {
  id: string;
  name: string;
  party: string;
  description: string;
}

interface BlockchainContextType {
  blockchain: Blockchain;
  candidates: Candidate[];
  currentVoter: string | null;
  setCurrentVoter: (id: string) => void;
  castVote: (candidateId: string) => Promise<void>;
  hasVoted: boolean;
  pendingVotes: number;
  mineBlock: () => void;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

const defaultCandidates: Candidate[] = [
  {
    id: 'candidate-1',
    name: 'Sarah Johnson',
    party: 'Progressive Alliance',
    description: 'Focusing on education reform and renewable energy initiatives'
  },
  {
    id: 'candidate-2',
    name: 'Michael Chen',
    party: 'Economic Growth Party',
    description: 'Championing small business development and job creation'
  },
  {
    id: 'candidate-3',
    name: 'Dr. Emily Rodriguez',
    party: 'Healthcare First',
    description: 'Dedicated to universal healthcare access and medical innovation'
  },
  {
    id: 'candidate-4',
    name: 'James Anderson',
    party: 'Environmental Coalition',
    description: 'Fighting climate change through sustainable policies'
  }
];

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [blockchain] = useState(() => new Blockchain('Presidential Election 2024'));
  const [candidates] = useState<Candidate[]>(defaultCandidates);
  const [currentVoter, setCurrentVoter] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [pendingVotes, setPendingVotes] = useState(0);

  useEffect(() => {
    if (currentVoter) {
      setHasVoted(blockchain.hasVoted(currentVoter));
    }
  }, [currentVoter, blockchain]);

  const castVote = async (candidateId: string): Promise<void> => {
    if (!currentVoter) {
      throw new Error('No voter ID set');
    }

    if (hasVoted) {
      throw new Error('You have already voted');
    }

    const vote: Vote = {
      candidateId,
      voterId: currentVoter,
      timestamp: Date.now()
    };

    blockchain.addVote(vote);
    setPendingVotes(blockchain.pendingVotes.length);
    
    // Auto-mine after 3 votes or wait 5 seconds
    if (blockchain.pendingVotes.length >= 3) {
      setTimeout(() => {
        blockchain.minePendingVotes();
        setPendingVotes(0);
        setHasVoted(true);
      }, 1000);
    } else {
      setTimeout(() => {
        if (blockchain.pendingVotes.length > 0) {
          blockchain.minePendingVotes();
          setPendingVotes(0);
          setHasVoted(true);
        }
      }, 5000);
    }
  };

  const mineBlock = () => {
    if (blockchain.pendingVotes.length > 0) {
      blockchain.minePendingVotes();
      setPendingVotes(0);
      if (currentVoter) {
        setHasVoted(blockchain.hasVoted(currentVoter));
      }
    }
  };

  return (
    <BlockchainContext.Provider
      value={{
        blockchain,
        candidates,
        currentVoter,
        setCurrentVoter,
        castVote,
        hasVoted,
        pendingVotes,
        mineBlock
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
};

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (context === undefined) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};
