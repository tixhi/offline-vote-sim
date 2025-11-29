import CryptoJS from 'crypto-js';

export interface Vote {
  candidateId: string;
  voterId: string;
  timestamp: number;
}

export interface BlockData {
  votes: Vote[];
  election: string;
}

export class Block {
  index: number;
  timestamp: number;
  data: BlockData;
  previousHash: string;
  hash: string;
  nonce: number;

  constructor(index: number, timestamp: number, data: BlockData, previousHash: string = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash(): string {
    return CryptoJS.SHA256(
      this.index +
      this.previousHash +
      this.timestamp +
      JSON.stringify(this.data) +
      this.nonce
    ).toString();
  }

  mineBlock(difficulty: number): void {
    const target = Array(difficulty + 1).join('0');
    
    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
  }
}

export class Blockchain {
  chain: Block[];
  difficulty: number;
  pendingVotes: Vote[];
  currentElection: string;

  constructor(electionName: string = 'General Election 2024') {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 2; // Low difficulty for demo purposes
    this.pendingVotes = [];
    this.currentElection = electionName;
  }

  createGenesisBlock(): Block {
    return new Block(0, Date.now(), { votes: [], election: 'Genesis Block' }, '0');
  }

  getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addVote(vote: Vote): void {
    this.pendingVotes.push(vote);
  }

  minePendingVotes(): Block | null {
    if (this.pendingVotes.length === 0) {
      return null;
    }

    const block = new Block(
      this.chain.length,
      Date.now(),
      {
        votes: [...this.pendingVotes],
        election: this.currentElection
      },
      this.getLatestBlock().hash
    );

    block.mineBlock(this.difficulty);
    this.chain.push(block);
    this.pendingVotes = [];
    
    return block;
  }

  isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }

  getAllVotes(): Vote[] {
    const votes: Vote[] = [];
    for (const block of this.chain) {
      votes.push(...block.data.votes);
    }
    return votes;
  }

  getVoteCount(): Map<string, number> {
    const voteCount = new Map<string, number>();
    const allVotes = this.getAllVotes();

    for (const vote of allVotes) {
      voteCount.set(vote.candidateId, (voteCount.get(vote.candidateId) || 0) + 1);
    }

    return voteCount;
  }

  hasVoted(voterId: string): boolean {
    const allVotes = this.getAllVotes();
    return allVotes.some(vote => vote.voterId === voterId);
  }
}
