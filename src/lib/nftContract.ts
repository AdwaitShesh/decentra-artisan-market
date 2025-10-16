  // Helpers to map MetaMask circuit-breaker errors to a stable, actionable message
  const isCircuitBreakerError = (err: any): boolean => {
    const code = typeof err?.code === 'number' ? err.code : undefined;
    const msg = (err?.message || '').toString();
    return code === -32603 || /circuit\s*breaker|BrokenCircuitError/i.test(msg);
  };

  const mapCircuitBreaker = (original: any): Error => {
    // Persist a hint so the UI can surface guidance if needed
    try { localStorage.setItem('lastMetaMaskCircuitBreaker', new Date().toISOString()); } catch {}
    return new Error(
      'MetaMask circuit breaker is preventing requests on this network. Fix: In MetaMask, remove the local network (Settings → Networks), then re-add it from this app (Network selector) or manually. Ensure your local nodes are running (ports 8545/8546/8547).'
    );
  };

import { ethers } from 'ethers';
import { useState, useEffect } from 'react';
import { getNetworkConfig, getMetaMaskNetworkParams, NETWORK_CONFIGS, getEffectiveChainId, type NetworkConfig } from './networkConfig';
import { uploadFileToIPFS } from './ipfs'; // Import the IPFS upload function

// Contract ABI - this would be imported from your artifacts after compilation
const contractABI = [
  "function mintNFT(address to, string tokenURI, uint256 royaltyPercentage, string creatorName, uint256 editions, string category) public returns (uint256)",
  "function mintEdition(address to, uint256 tokenId) public returns (uint256)",
  "function ownerOf(uint256 tokenId) public view returns (address)",
  "function tokenURI(uint256 tokenId) public view returns (string)",
  "function getCreator(uint256 tokenId) public view returns (address)",
  "function getCreatorName(uint256 tokenId) public view returns (string)",
  "function getRoyalty(uint256 tokenId) public view returns (uint256)",
  "function getEditionInfo(uint256 tokenId) public view returns (uint256 editionNumber, uint256 totalEditions)",
  "function setBaseURI(string baseURI) public",
  "function verifyCompliance(uint256 tokenId, bool status) public",
  "function verifyIPRights(uint256 tokenId, bool status) public",
  "function verifyCategory(uint256 tokenId, string category, bool status) public",
  "function updateCategory(uint256 tokenId, string newCategory) public",
  "function getCategory(uint256 tokenId) public view returns (string)",
  "function getCategoryStatus(uint256 tokenId) public view returns (bool)",
  "function isFullyVerified(uint256 tokenId) public view returns (bool)",
  "function getComplianceStatus(uint256 tokenId) public view returns (bool)",
  "function getIPRightsStatus(uint256 tokenId) public view returns (bool)",
  "event NFTMinted(address indexed creator, uint256 indexed tokenId, string tokenURI, string creatorName, string category)",
  "event EditionMinted(uint256 indexed tokenId, uint256 editionNumber, uint256 totalEditions)",
  "event RoyaltySet(uint256 indexed tokenId, uint256 royaltyPercentage)",
  "event ComplianceVerified(uint256 indexed tokenId, bool status)",
  "event IPRightsVerified(uint256 indexed tokenId, bool status)",
  "event CategorySet(uint256 indexed tokenId, string category)",
  "event CategoryVerified(uint256 indexed tokenId, string category, bool status)",
  "function approve(address to, uint256 tokenId) public",
  "function getApproved(uint256 tokenId) public view returns (address)"
];

// Default contract address - can be overridden by network config
const DEFAULT_CONTRACT_ADDRESS = (import.meta as any).env?.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3';

// Add a type declaration for the window object with ethereum property
declare global {
  interface Window {
    ethereum?: any;
  }
}

// Hook for interacting with the NFT contract
export function useNFTContract(selectedBlockchain: string = 'ethereum') {
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentNetwork, setCurrentNetwork] = useState<NetworkConfig | null>(null);
  const [isSwitchingNetwork, setIsSwitchingNetwork] = useState<boolean>(false);

  // Initialize contract and connect wallet
  useEffect(() => {
    const initContract = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get network configuration for selected blockchain
        const networkConfig = getNetworkConfig(selectedBlockchain);
        setCurrentNetwork(networkConfig);

        // Check if MetaMask is installed
        if (!window.ethereum) {
          throw new Error('MetaMask is not installed');
        }

        // Request account access (map circuit breaker errors)
        let accounts: string[] = [];
        try {
          accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (e) {
          if (isCircuitBreakerError(e)) throw mapCircuitBreaker(e);
          throw e;
        }
        setAccount(accounts[0]);

        // Create provider and signer
        const provider = new ethers.BrowserProvider(window.ethereum);
        
        // Check current network and switch if needed
        await switchToNetwork(networkConfig, selectedBlockchain);
        
        // Recreate provider after potential network switch
        const updatedProvider = new ethers.BrowserProvider(window.ethereum);
        const signer = await updatedProvider.getSigner();

        // Create contract instance with network-specific address
        const contractAddress = networkConfig.contractAddress || DEFAULT_CONTRACT_ADDRESS;
        const nftContract = new ethers.Contract(contractAddress, contractABI, signer);
        setContract(nftContract);
        setIsLoading(false);
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'An unknown error occurred';
        setError(msg);
        setIsLoading(false);
      }
    };

    initContract();

    // Listen for account and network changes
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        setAccount(accounts[0]);
      };
      
      const handleChainChanged = async (chainId: string) => {
        const newChainId = parseInt(chainId, 16);
        console.log('Network changed to:', newChainId);
        
        // Update current network state without reloading (match by effective chain id)
        const matchingNetwork = Object.values(NETWORK_CONFIGS).find((config: NetworkConfig) => getEffectiveChainId(config) === newChainId);
        if (matchingNetwork) {
          setCurrentNetwork(matchingNetwork);
          console.log(`✅ Network updated to: ${matchingNetwork.name}`);
          try {
            // Small delay to let MetaMask finish internal switch
            await new Promise(r => setTimeout(r, 300));
            // Refresh account, provider, signer, and contract
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            setAccount(accounts?.[0] ?? null);
            const updatedProvider = new ethers.BrowserProvider(window.ethereum);
            const signer = await updatedProvider.getSigner();
            const contractAddress = matchingNetwork.contractAddress || DEFAULT_CONTRACT_ADDRESS;
            const newContract = new ethers.Contract(contractAddress, contractABI, signer);
            setContract(newContract);
          } catch (e) {
            console.warn('Failed to reinitialize contract after chain change:', e);
          }
        }
      };
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [selectedBlockchain]); // Re-run when blockchain selection changes
  
  // Helper function to switch networks
  const switchToNetwork = async (networkConfig: NetworkConfig, blockchain: string) => {
    try {
      setIsSwitchingNetwork(true);
      const provider = new ethers.BrowserProvider(window.ethereum);
      let network: { chainId: bigint };
      try {
        network = await provider.getNetwork();
      } catch (e) {
        if (isCircuitBreakerError(e)) throw mapCircuitBreaker(e);
        throw e;
      }
      const currentChainId = Number(network.chainId);
      const effectiveChainId = getEffectiveChainId(networkConfig);

      // Quick RPC health check with timeout to avoid MetaMask retries (esp. Polygon)
      try {
        const controller = new AbortController();
        const t = setTimeout(() => controller.abort(), 1200);
        await fetch(networkConfig.rpcUrl, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'eth_chainId', params: [] }),
          signal: controller.signal,
        }).then(r => r.json());
        clearTimeout(t);
      } catch (e) {
        throw new Error(`RPC not reachable at ${networkConfig.rpcUrl}. Make sure the node is running.`);
      }

      if (currentChainId !== effectiveChainId) {
        console.log(`🔄 Switching from Chain ID ${currentChainId} to ${effectiveChainId} (${networkConfig.name})`);
        
        try {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: `0x${effectiveChainId.toString(16)}` }]
            });
          } catch (se) {
            if (isCircuitBreakerError(se)) throw mapCircuitBreaker(se);
            throw se;
          }
        
          // Wait a bit for the switch to complete
          await new Promise(resolve => setTimeout(resolve, 1000));
        
        } catch (switchError: any) {
          if (switchError.code === 4902) {
            console.log(`📡 Adding new network: ${networkConfig.name}`);
            const networkParams = getMetaMaskNetworkParams(blockchain);
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [networkParams]
              });
            } catch (ae) {
              if (isCircuitBreakerError(ae)) throw mapCircuitBreaker(ae);
              throw ae;
            }
            
            // Wait a bit for the addition to complete
            await new Promise(resolve => setTimeout(resolve, 1500));
          } else {
            throw switchError;
          }
        }
      } else {
        console.log(`✅ Already connected to ${networkConfig.name} (Effective Chain ID: ${effectiveChainId})`);
      }
    } catch (error) {
      console.warn('Network switch failed:', error);
      // Provide clearer, actionable errors for common cases
      try {
        const err: any = error;
        const message: string = (err?.message || '').toString();
        const code: number | undefined = typeof err?.code === 'number' ? err.code : undefined;

        // MetaMask circuit breaker (-32603) or message mentions breaker
        const isCircuitBreaker =
          code === -32603 || /circuit\s*breaker|BrokenCircuitError/i.test(message);

        if (isCircuitBreaker) {
          throw new Error(
            'MetaMask circuit breaker was triggered for this network. Fix: remove the local network from MetaMask (Settings > Networks > Polygon (Local)), then re-add it from the app or manually. Ensure your local node is running at the configured RPC and try again.'
          );
        }

        // RPC not reachable hint
        if (/RPC not reachable/i.test(message) || /Failed to fetch/i.test(message)) {
          throw new Error(
            message + ' Tip: start your local Hardhat node for this network and verify eth_chainId responds at the RPC URL.'
          );
        }

        // Default: rethrow original error message
        throw new Error(message || 'Network switch failed');
      } catch (mapped) {
        throw mapped;
      }
    } finally {
      setIsSwitchingNetwork(false);
    }
  };

  // Mint a new NFT
  const mintNFT = async (
    to: string, 
    imageURI: string, // This is now the image URI
    name: string,
    description: string,
    royaltyPercentage: number, 
    creatorName: string, 
    editions: number = 1,
    category: string = 'art'
  ) => {
    if (!contract) throw new Error('Contract not initialized');
    if (isSwitchingNetwork) throw new Error('Please wait, switching network...');
    // Ensure provider is on the expected network before minting
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      let chainId: bigint;
      try {
        ({ chainId } = await provider.getNetwork());
      } catch (e) {
        if (isCircuitBreakerError(e)) throw mapCircuitBreaker(e);
        throw e;
      }
      const expected = currentNetwork ? getEffectiveChainId(currentNetwork) : undefined;
      if (expected !== undefined && Number(chainId) !== expected) {
        throw new Error(`Wrong network. Expected chain ID ${expected}, got ${Number(chainId)}.`);
      }
    } catch (e) {
      throw e instanceof Error ? e : new Error('Failed to verify network before minting');
    }
    
    try {
      // 1. Create metadata object
      const metadata = {
        name,
        description,
        image: imageURI,
        attributes: [
          { trait_type: 'Category', value: category },
          { trait_type: 'Editions', value: editions },
        ],
      };

      // 2. Upload metadata to IPFS
      const metadataBlob = new Blob([JSON.stringify(metadata)], { type: 'application/json' });
      const metadataFile = new File([metadataBlob], 'metadata.json');
      const { cid: metadataCID } = await uploadFileToIPFS(metadataFile);
      const finalTokenURI = `ipfs://${metadataCID}`;

      console.log('Final Token URI (Metadata CID):', finalTokenURI);

      const tx = await contract.mintNFT(to, finalTokenURI, royaltyPercentage, creatorName, editions, category);
      console.log("Transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Transaction confirmed in block:", receipt.blockNumber);
      
      // Attempt multiple approaches to find the NFTMinted event
      
      // Method 1: Look for the event directly in the logs
      let parsedLog = null;
      for (const log of receipt.logs) {
        try {
          // Skip logs that aren't from our contract
          const contractAddress = currentNetwork?.contractAddress || DEFAULT_CONTRACT_ADDRESS;
          if (log.address.toLowerCase() !== contractAddress.toLowerCase()) {
            continue;
          }
          
          // Try to parse the log
          const parsed = contract.interface.parseLog({
            topics: log.topics,
            data: log.data
          });
          
          // Check if this is our NFTMinted event
          if (parsed && parsed.name === 'NFTMinted') {
            parsedLog = parsed;
            console.log("Found NFTMinted event in logs (Method 1)");
            break;
          }
        } catch (e) {
          // Continue to next log if parsing fails
          continue;
        }
      }
      
      // Method 2: If we couldn't find it in the logs, try to manually decode the event
      if (!parsedLog) {
        console.log("Method 1 failed, trying Method 2...");
        for (const log of receipt.logs) {
          // Skip logs that aren't from our contract
          const contractAddress = currentNetwork?.contractAddress || DEFAULT_CONTRACT_ADDRESS;
          if (log.address.toLowerCase() !== contractAddress.toLowerCase()) {
            continue;
          }
          
          // Updated signature for NFTMinted with creator name
          const NFTMintedSignature = '0x5f0fda84a9c6a9f8c65cd469e75f09b7642b22b2051f8a80256b8a9581429872';
          
          if (log.topics[0].toLowerCase() === NFTMintedSignature.toLowerCase()) {
            // This is our event, manually decode it
            const creator = ethers.getAddress('0x' + log.topics[1].slice(26)); // First indexed param
            const tokenId = BigInt(log.topics[2]); // Second indexed param
            
            console.log("Found NFTMinted event signature match (Method 2)");
            return {
              tokenId,
              creator,
              creatorName, // Use the input creatorName
              tokenURI: finalTokenURI, // Use the input tokenURI since it's harder to extract from data
              category,
              transactionHash: receipt.hash
            };
          }
        }
      }
      
      // Method 3: If still not found, use simpler approach with topic signature
      if (!parsedLog) {
        console.log("Method 2 failed, trying Method 3...");
        const transferEventTopic = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
        
        for (const log of receipt.logs) {
          if (log.topics[0].toLowerCase() === transferEventTopic.toLowerCase()) {
            // Found a Transfer event, which is often emitted with NFT minting
            const to = ethers.getAddress('0x' + log.topics[2].slice(26));
            const tokenId = BigInt(log.topics[3] || log.data);
            
            console.log("Found Transfer event (Method 3)");
            return {
              tokenId,
              creator: ethers.getAddress(receipt.from), // Use tx sender as creator
              creatorName, // Use the input creatorName
              tokenURI: finalTokenURI, // Use the input tokenURI
              category,
              transactionHash: receipt.hash
            };
          }
        }
      }
      
      // If we found the event through Method 1, return its data
      if (parsedLog) {
        return {
          tokenId: parsedLog.args[1], // tokenId is the second argument
          creator: parsedLog.args[0], // creator is the first argument
          creatorName: parsedLog.args[3] || creatorName, // creatorName is the fourth argument
          tokenURI: parsedLog.args[2] || finalTokenURI, // tokenURI is the third argument
          category: parsedLog.args[4] || category, // category is the fifth argument
          transactionHash: receipt.hash
        };
      }
      
      // If all methods failed but the transaction succeeded, return basic info
      console.log("All methods failed but transaction succeeded, returning basic info");
      return {
        tokenId: 0n, // We don't know the token ID
        creator: ethers.getAddress(receipt.from),
        creatorName,
        tokenURI: finalTokenURI,
        category,
        transactionHash: receipt.hash
      };
      
    } catch (err) {
      console.error("Error in mintNFT:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to mint NFT');
    }
  };

  // Mint an additional edition of an existing NFT
  const mintEdition = async (to: string, tokenId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    if (isSwitchingNetwork) throw new Error('Please wait, switching network...');
    
    try {
      const tx = await contract.mintEdition(to, tokenId);
      console.log("Edition transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Edition transaction confirmed in block:", receipt.blockNumber);
      
      // Extract edition info from event or return a fallback
      for (const log of receipt.logs) {
        try {
          const contractAddress = currentNetwork?.contractAddress || DEFAULT_CONTRACT_ADDRESS;
          if (log.address.toLowerCase() !== contractAddress.toLowerCase()) {
            continue;
          }
          
          const parsed = contract.interface.parseLog({
            topics: log.topics,
            data: log.data
          });
          
          if (parsed && parsed.name === 'EditionMinted') {
            return {
              tokenId: BigInt(parsed.args[0]),
              editionNumber: parsed.args[1],
              totalEditions: parsed.args[2],
              transactionHash: receipt.hash
            };
          }
        } catch (e) {
          continue;
        }
      }
      
      // Fallback if event parsing fails
      return {
        tokenId: BigInt(tokenId),
        editionNumber: 0, // Unknown
        totalEditions: 0, // Unknown
        transactionHash: receipt.hash
      };
    } catch (err) {
      console.error("Error in mintEdition:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to mint edition');
    }
  };

  // Get token information
  const getTokenInfo = async (tokenId: number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      const owner = await contract.ownerOf(tokenId);
      const tokenURI = await contract.tokenURI(tokenId);
      const creator = await contract.getCreator(tokenId);
      const creatorName = await contract.getCreatorName(tokenId);
      const royalty = await contract.getRoyalty(tokenId);
      const [editionNumber, totalEditions] = await contract.getEditionInfo(tokenId);
      
      return {
        tokenId,
        owner,
        tokenURI,
        creator,
        creatorName,
        royalty,
        editionNumber,
        totalEditions
      };
    } catch (err) {
      console.error("Error fetching token info:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to fetch token info');
    }
  };

  // Set base URI (only owner)
  const setBaseURI = async (baseURI: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      const tx = await contract.setBaseURI(baseURI);
      await tx.wait();
      return true;
    } catch (err) {
      throw new Error(err instanceof Error ? err.message : 'Failed to set base URI');
    }
  };

  // Add new verification functions
  const verifyCompliance = async (tokenId: bigint | number, status: boolean) => {
    if (!contract) throw new Error('Contract not initialized');
    if (isSwitchingNetwork) throw new Error('Please wait, switching network...');
    
    try {
      const tx = await contract.verifyCompliance(tokenId, status);
      console.log("Compliance verification transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Compliance verification confirmed in block:", receipt.blockNumber);
      
      return {
        tokenId,
        status,
        transactionHash: receipt.hash
      };
    } catch (err) {
      console.error("Error in verifyCompliance:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to verify compliance');
    }
  };
  
  const verifyIPRights = async (tokenId: bigint | number, status: boolean) => {
    if (!contract) throw new Error('Contract not initialized');
    if (isSwitchingNetwork) throw new Error('Please wait, switching network...');
    
    try {
      const tx = await contract.verifyIPRights(tokenId, status);
      console.log("IP Rights verification transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("IP Rights verification confirmed in block:", receipt.blockNumber);
      
      return {
        tokenId,
        status,
        transactionHash: receipt.hash
      };
    } catch (err) {
      console.error("Error in verifyIPRights:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to verify IP rights');
    }
  };
  
  const isNFTFullyVerified = async (tokenId: bigint | number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      const isVerified = await contract.isFullyVerified(tokenId);
      return isVerified;
    } catch (err) {
      console.error("Error in isNFTFullyVerified:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to check verification status');
    }
  };

  // Verify category-specific requirements
  const verifyCategory = async (tokenId: bigint | number, category: string, status: boolean) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      const tx = await contract.verifyCategory(tokenId, category, status);
      console.log("Category verification transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Category verification confirmed in block:", receipt.blockNumber);
      
      return {
        tokenId,
        category,
        status,
        transactionHash: receipt.hash
      };
    } catch (err) {
      console.error("Error in verifyCategory:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to verify category requirements');
    }
  };

  // Update NFT category
  const updateCategory = async (tokenId: bigint | number, newCategory: string) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      const tx = await contract.updateCategory(tokenId, newCategory);
      console.log("Update category transaction sent:", tx.hash);
      const receipt = await tx.wait();
      console.log("Category updated in block:", receipt.blockNumber);
      
      return {
        tokenId,
        category: newCategory,
        transactionHash: receipt.hash
      };
    } catch (err) {
      console.error("Error in updateCategory:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to update category');
    }
  };

  // Get NFT category information
  const getCategoryInfo = async (tokenId: bigint | number) => {
    if (!contract) throw new Error('Contract not initialized');
    
    try {
      const category = await contract.getCategory(tokenId);
      const isVerified = await contract.getCategoryStatus(tokenId);
      
      return {
        tokenId,
        category,
        isVerified
      };
    } catch (err) {
      console.error("Error in getCategoryInfo:", err);
      throw new Error(err instanceof Error ? err.message : 'Failed to get category information');
    }
  };

  const approve = async (to: string, tokenId: bigint) => {
    if (!contract) throw new Error('Contract not initialized');
    const tx = await contract.approve(to, tokenId);
    return await tx.wait();
  };

  const getApproved = async (tokenId: bigint) => {
    if (!contract) throw new Error('Contract not initialized');
    return await contract.getApproved(tokenId);
  };

  return {
    contract,
    account,
    isLoading,
    error,
    currentNetwork,
    switchToNetwork: (blockchain: string) => {
      const networkConfig = getNetworkConfig(blockchain);
      return switchToNetwork(networkConfig, blockchain);
    },
    mintNFT,
    mintEdition,
    getTokenInfo,
    setBaseURI,
    verifyCompliance,
    verifyIPRights,
    verifyCategory,
    updateCategory,
    getCategoryInfo,
    isNFTFullyVerified,
    approve,
    getApproved
  };
}

// Example usage in a React component:
/*
import { useNFTContract } from '@/lib/nftContract';

function NFTMintComponent() {
  const { mintNFT, isLoading, error } = useNFTContract();
  const [mintStatus, setMintStatus] = useState<string>('');

  const handleMint = async () => {
    try {
      setMintStatus('Minting...');
      const result = await mintNFT(
        '0xRecipientAddress',
        'ipfs://QmYourMetadataHash',
        250, // 2.5% royalty
        'John Doe',
        1, // 1 edition
        'art'
      );
      setMintStatus(`Minted NFT with ID: ${result.tokenId}`);
    } catch (err) {
      setMintStatus(`Error: ${err.message}`);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <button onClick={handleMint}>Mint NFT</button>
      {mintStatus && <p>{mintStatus}</p>}
    </div>
  );
}
*/ 