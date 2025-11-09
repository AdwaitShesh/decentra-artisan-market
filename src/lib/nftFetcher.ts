import { ethers } from 'ethers';
import { getNetworkConfig } from './networkConfig';

export interface NFTMetadata {
  name?: string;
  description?: string;
  image?: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
    rarity?: number;
  }>;
  external_url?: string;
  animation_url?: string;
}

export interface BlockchainNFT {
  tokenId: string;
  owner: string;
  creator: string;
  tokenURI: string;
  metadata?: NFTMetadata;
  royaltyBps: number;
  chain: string;
  contractAddress: string;
  isListed: boolean;
  price?: bigint;
  category?: string;
  editions?: {
    total: number;
    minted: number;
  };
  transactionHash?: string;
}

// IPFS gateway URLs for metadata fetching
const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'https://dweb.link/ipfs/',
  'https://nftstorage.link/ipfs/'
];

/**
 * Fetch metadata from IPFS with multiple gateway fallbacks
 */
async function fetchMetadataFromIPFS(tokenURI: string): Promise<NFTMetadata | null> {
  if (!tokenURI) return null;

  // Try local gateway first (fastest), then public gateways
  const gateways = [
    'http://127.0.0.1:8081/ipfs/',      // Local IPFS gateway (fastest)
    'https://ipfs.io/ipfs/',            // Public gateway 1
    'https://gateway.pinata.cloud/ipfs/', // Public gateway 2
    'https://cloudflare-ipfs.com/ipfs/', // Public gateway 3
    'https://dweb.link/ipfs/'           // Public gateway 4
  ];
  
  for (const gateway of gateways) {
    try {
      const url = tokenURI.startsWith('ipfs://') 
        ? tokenURI.replace('ipfs://', gateway)
        : tokenURI.startsWith('http') 
          ? tokenURI 
          : `${gateway}${tokenURI}`;

      console.log(`🔍 Trying to fetch metadata from: ${url}`);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000); // Increased timeout

      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        }
      });
      
      clearTimeout(timeoutId);

      if (response.ok) {
        const metadata = await response.json();
        console.log(`✅ Successfully fetched metadata from ${gateway}:`, metadata);
        return metadata;
      }
    } catch (error) {
      console.warn(`❌ Failed to fetch metadata from gateway ${gateway}:`, error);
      continue;
    }
  }

  console.error('❌ Failed to fetch metadata from all gateways for:', tokenURI);
  return null;
}

/**
 * Find the highest token ID by checking token existence
 */
async function findHighestTokenId(contractAddress: string, rpcUrl: string): Promise<number> {
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const contract = new ethers.Contract(
      contractAddress,
      [
        'function ownerOf(uint256) view returns (address)'
      ],
      provider
    );

    let highestTokenId = 0;
    const maxCheck = 1000; // Check up to token ID 1000
    
    // Check tokens in batches to find the highest existing token ID
    for (let tokenId = 1; tokenId <= maxCheck; tokenId++) {
      try {
        const owner = await contract.ownerOf(tokenId);
        if (owner && owner !== ethers.ZeroAddress) {
          highestTokenId = tokenId;
        }
      } catch (error) {
        // Token doesn't exist, continue checking
        continue;
      }
    }
    
    return highestTokenId;
  } catch (error) {
    console.error('Error finding highest token ID:', error);
    return 0;
  }
}

/**
 * Fetch NFTs from a specific chain with marketplace data
 */
export async function fetchNFTsFromChain(chainName: string): Promise<BlockchainNFT[]> {
  try {
    console.log(`🔍 Fetching NFTs from ${chainName}...`);
    const network = getNetworkConfig(chainName);
    const provider = new ethers.JsonRpcProvider(network.rpcUrl);
    
    // Check if contract exists
    const code = await provider.getCode(network.contractAddress);
    if (!code || code === '0x') {
      console.warn(`No contract found at ${network.contractAddress} on ${network.name}`);
      return [];
    }
    
    console.log(`✅ Contract found on ${chainName}`);

    const contract = new ethers.Contract(
      network.contractAddress,
      [
        'function ownerOf(uint256) view returns (address)',
        'function tokenURI(uint256) view returns (string)',
        'function getCreator(uint256) view returns (address)',
        'function getRoyalty(uint256) view returns (uint256)'
      ],
      provider
    );

    // Marketplace contract for checking listings
    const marketplaceAddress = getMarketplaceAddress(chainName);
    const marketplace = new ethers.Contract(
      marketplaceAddress,
      [
        'function getListing(address, uint256) view returns (tuple(address,uint256,address,uint256,address,uint96,bool))'
      ],
      provider
    );

    const highestTokenId = await findHighestTokenId(network.contractAddress, network.rpcUrl);
    const nfts: BlockchainNFT[] = [];

    // Fetch NFTs in batches to avoid overwhelming the RPC
    const batchSize = 10;
    for (let i = 1; i <= highestTokenId; i += batchSize) {
      const batch = [];
      const endIndex = Math.min(i + batchSize - 1, highestTokenId);
      
      for (let tokenId = i; tokenId <= endIndex; tokenId++) {
        batch.push(fetchSingleNFTWithMarketplace(contract, marketplace, tokenId, chainName, network.contractAddress));
      }

      const batchResults = await Promise.allSettled(batch);
      
      for (const result of batchResults) {
        if (result.status === 'fulfilled' && result.value) {
          nfts.push(result.value);
        }
      }
    }

    return nfts;
  } catch (error) {
    console.error(`Error fetching NFTs from ${chainName}:`, error);
    return [];
  }
}

/**
 * Get marketplace address for a chain
 */
function getMarketplaceAddress(chainName: string): string {
  // For now, use the same address across all chains
  return '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
}

/**
 * Fetch a single NFT's data with marketplace listing
 */
async function fetchSingleNFTWithMarketplace(
  contract: ethers.Contract, 
  marketplace: ethers.Contract, 
  tokenId: number, 
  chain: string, 
  contractAddress: string
): Promise<BlockchainNFT | null> {
  try {
    const [owner, tokenURI, creator, royaltyBps] = await Promise.all([
      contract.ownerOf(BigInt(tokenId)).catch(() => ethers.ZeroAddress),
      contract.tokenURI(BigInt(tokenId)).catch(() => ''),
      contract.getCreator(BigInt(tokenId)).catch(() => ethers.ZeroAddress),
      contract.getRoyalty(BigInt(tokenId)).catch(() => 0)
    ]);

    if (owner === ethers.ZeroAddress) return null;

    // Fetch marketplace listing
    let listing = null;
    try {
      const listingData = await marketplace.getListing(contractAddress, BigInt(tokenId));
      console.log(`Listing data for token ${tokenId}:`, listingData);
      
      if (listingData && listingData.active && listingData.price > 0) {
        listing = {
          price: listingData.price,
          seller: listingData.seller,
          active: listingData.active
        };
        console.log(`✅ Token ${tokenId} is listed for ${ethers.formatEther(listingData.price)} ETH`);
      }
    } catch (error) {
      console.log(`❌ No listing found for token ${tokenId}:`, error.message);
    }

    // Fetch metadata with enhanced logging
    console.log(`🔍 Fetching metadata for token ${tokenId} from: ${tokenURI}`);
    const metadata = await fetchMetadataFromIPFS(tokenURI);
    
    if (metadata) {
      console.log(`✅ Metadata loaded for token ${tokenId}:`, {
        name: metadata.name,
        image: metadata.image,
        description: metadata.description?.slice(0, 50) + '...'
      });
    } else {
      console.log(`❌ Failed to load metadata for token ${tokenId}`);
    }

    // Check localStorage for additional minting details
    let additionalData: any = {};
    try {
      const stored = localStorage.getItem('newlyMintedNFT');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.tokenId && String(parsed.tokenId) === String(tokenId)) {
          additionalData = parsed;
        }
      }
    } catch {}

    const nft: BlockchainNFT = {
      tokenId: tokenId.toString(),
      owner,
      creator: creator || ethers.ZeroAddress,
      tokenURI,
      metadata,
      royaltyBps: Number(royaltyBps),
      chain,
      contractAddress,
      isListed: listing?.active || false,
      price: listing?.price,
      category: additionalData.category,
      editions: additionalData.editions,
      transactionHash: additionalData.transactionHash
    };

    return nft;
  } catch (error) {
    console.error(`Error fetching NFT ${tokenId}:`, error);
    return null;
  }
}

/**
 * Fetch NFTs from all supported chains
 */
export async function fetchAllNFTs(): Promise<BlockchainNFT[]> {
  const chains = ['ethereum', 'polygon', 'base'];
  const allNFTs: BlockchainNFT[] = [];

  const chainPromises = chains.map(chain => fetchNFTsFromChain(chain));
  const results = await Promise.allSettled(chainPromises);

  for (const result of results) {
    if (result.status === 'fulfilled') {
      allNFTs.push(...result.value);
    }
  }

  return allNFTs;
}

/**
 * Convert IPFS URI to HTTP URL using gateway with fallback
 */
function convertIPFSToHTTP(uri: string): string {
  if (!uri) {
    console.log('⚠️ Empty URI provided to convertIPFSToHTTP');
    return '';
  }
  
  console.log(`🔄 Converting IPFS URI: ${uri}`);
  
  // If it's already an HTTP URL, return as is
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    console.log(`✅ Already HTTP URL: ${uri}`);
    return uri;
  }
  
  // Convert IPFS URI to HTTP URL - use public gateway for better reliability
  if (uri.startsWith('ipfs://')) {
    const hash = uri.replace('ipfs://', '');
    const httpUrl = `https://ipfs.io/ipfs/${hash}`;
    console.log(`✅ Converted IPFS URI to: ${httpUrl}`);
    return httpUrl;
  }
  
  // If it's just a hash, add the public gateway
  if (uri.match(/^Qm[a-zA-Z0-9]{44}$/)) {
    const httpUrl = `https://ipfs.io/ipfs/${uri}`;
    console.log(`✅ Converted IPFS hash to: ${httpUrl}`);
    return httpUrl;
  }
  
  console.log(`⚠️ Unknown URI format: ${uri}`);
  return uri;
}

/**
 * Convert BlockchainNFT to marketplace display format
 */
export function convertToMarketplaceFormat(nft: BlockchainNFT): any {
  // Keep IPFS URI as-is - NFTImage component handles gateway fallbacks
  console.log(`Processing NFT image for Token ID ${nft.tokenId}:`, nft.metadata?.image);
  const imageUrl = nft.metadata?.image 
    || 'https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop';
  console.log(`Image URL for Token ID ${nft.tokenId}:`, imageUrl);

  // Generate a default price if not listed (based on token ID for variety)
  const generateDefaultPrice = (tokenId: string): string => {
    const id = parseInt(tokenId);
    const basePrice = 0.1 + (id % 10) * 0.05; // Price between 0.1 and 0.55 ETH
    return basePrice.toFixed(2);
  };

  return {
    id: `${nft.chain}-${nft.tokenId}`,
    image: imageUrl,
    title: nft.metadata?.name || `Token #${nft.tokenId}`,
    creator: nft.creator !== ethers.ZeroAddress 
      ? `${nft.creator.slice(0, 6)}...${nft.creator.slice(-4)}`
      : 'Anonymous',
    creatorVerified: nft.creator !== ethers.ZeroAddress,
    owner: nft.owner,
    tokenId: nft.tokenId,
    tokenURI: nft.tokenURI,
    chain: nft.chain,
    transactionHash: nft.transactionHash,
    editions: nft.editions,
    category: nft.category || 'art',
    // Always provide a price - either from marketplace listing or default
    price: nft.isListed && nft.price 
      ? `${ethers.formatEther(nft.price)} ETH`
      : `${generateDefaultPrice(nft.tokenId)} ETH`,
    // Store the raw price for purchase functionality
    priceWei: nft.isListed && nft.price 
      ? nft.price
      : ethers.parseEther(generateDefaultPrice(nft.tokenId)),
    isListed: nft.isListed,
    royalty: (nft.royaltyBps / 100).toFixed(2),
    attributes: nft.metadata?.attributes || [],
    description: nft.metadata?.description,
    // Add timestamp for sorting (newer NFTs first)
    mintTimestamp: nft.transactionHash ? Date.now() : parseInt(nft.tokenId) * 1000
  };
}

/**
 * Cache NFTs in localStorage with expiration
 */
export function cacheNFTs(nfts: BlockchainNFT[], expirationMinutes: number = 5) {
  const cacheData = {
    nfts,
    timestamp: Date.now(),
    expiration: Date.now() + (expirationMinutes * 60 * 1000)
  };
  
  try {
    localStorage.setItem('nftCache', JSON.stringify(cacheData));
  } catch (error) {
    console.warn('Failed to cache NFTs:', error);
  }
}

/**
 * Get cached NFTs if not expired
 */
export function getCachedNFTs(): BlockchainNFT[] | null {
  try {
    const cached = localStorage.getItem('nftCache');
    if (!cached) return null;

    const cacheData = JSON.parse(cached);
    if (Date.now() > cacheData.expiration) {
      localStorage.removeItem('nftCache');
      return null;
    }

    return cacheData.nfts;
  } catch (error) {
    console.warn('Failed to get cached NFTs:', error);
    localStorage.removeItem('nftCache');
    return null;
  }
}
