// Network configuration for multi-blockchain support on single Hardhat node
export interface NetworkConfig {
  chainId: number;
  name: string;
  symbol: string;
  rpcUrl: string;
  fallbackRpcUrls?: string[]; // Fallback RPC endpoints
  blockExplorer?: string;
  contractAddress: string;
  gasMultiplier: number; // Simulate different gas costs
  color: string;
  // If set, this network is simulated on another underlying chain ID
  // Example: optimism/arbitrum simulated on the Ethereum local node (1337)
  simulateOnChainId?: number;
}

// TRUE MULTI-NETWORK: Each network runs on its own Hardhat node with unique chain ID
export const NETWORK_CONFIGS: Record<string, NetworkConfig> = {
  ethereum: {
    chainId: 1337,
    name: 'Ethereum (Local)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545',
    fallbackRpcUrls: ['http://localhost:8545', 'http://0.0.0.0:8545'],
    contractAddress: (import.meta as any).env?.VITE_ETHEREUM_CONTRACT_ADDRESS || (import.meta as any).env?.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    gasMultiplier: 3.0,
    color: 'bg-blue-500'
  },
  polygon: {
    chainId: 1338, // TRUE different chain ID
    name: 'Polygon (Local)',
    symbol: 'MATIC',
    rpcUrl: 'http://127.0.0.1:8546', // Different port
    fallbackRpcUrls: ['http://localhost:8546', 'http://0.0.0.0:8546'],
    contractAddress: (import.meta as any).env?.VITE_POLYGON_CONTRACT_ADDRESS || (import.meta as any).env?.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    gasMultiplier: 0.1,
    color: 'bg-purple-500'
  },
  optimism: {
    chainId: 1339, // Displayed chain ID for UI only
    name: 'Optimism (Simulated)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545', // Uses Ethereum network
    contractAddress: (import.meta as any).env?.VITE_ETHEREUM_CONTRACT_ADDRESS || (import.meta as any).env?.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    gasMultiplier: 0.5,
    color: 'bg-red-500',
    simulateOnChainId: 1337
  },
  arbitrum: {
    chainId: 1340, // Displayed chain ID for UI only
    name: 'Arbitrum (Simulated)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545', // Uses Ethereum network
    contractAddress: (import.meta as any).env?.VITE_ETHEREUM_CONTRACT_ADDRESS || (import.meta as any).env?.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    gasMultiplier: 0.3,
    color: 'bg-blue-400',
    simulateOnChainId: 1337
  },
  base: {
    chainId: 1341, // TRUE different chain ID
    name: 'Base (Local)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8547', // Different port
    fallbackRpcUrls: ['http://localhost:8547', 'http://0.0.0.0:8547'],
    contractAddress: (import.meta as any).env?.VITE_BASE_CONTRACT_ADDRESS || (import.meta as any).env?.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    gasMultiplier: 0.2,
    color: 'bg-blue-600'
  }
};

// Get network config by blockchain selection
export function getNetworkConfig(blockchain: string): NetworkConfig {
  return NETWORK_CONFIGS[blockchain] || NETWORK_CONFIGS.ethereum;
}

// Get recommended networks (lowest gas)
export function getRecommendedNetworks(): NetworkConfig[] {
  return Object.values(NETWORK_CONFIGS)
    .filter(config => config.gasMultiplier <= 0.2)
    .sort((a, b) => a.gasMultiplier - b.gasMultiplier);
}

// Resolve the effective chain ID used by MetaMask/Provider (handles simulated networks)
export function getEffectiveChainId(config: NetworkConfig): number {
  return config.simulateOnChainId ?? config.chainId;
}

// MetaMask network addition helper - each network has its own configuration (with effective chain)
export function getMetaMaskNetworkParams(blockchain: string) {
  const config = getNetworkConfig(blockchain);
  const effectiveChainId = getEffectiveChainId(config);
  return {
    chainId: `0x${effectiveChainId.toString(16)}`,
    chainName: config.name + (config.simulateOnChainId ? ' (via Hardhat Local)' : ''),
    nativeCurrency: {
      name: config.symbol,
      symbol: config.symbol,
      decimals: 18
    },
    rpcUrls: [config.rpcUrl],
    blockExplorerUrls: null
  };
}
