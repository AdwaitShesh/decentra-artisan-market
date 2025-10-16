import { ethers } from 'ethers';
import { getNetworkConfig, type NetworkConfig } from './networkConfig';

// Minimal ABI for our Marketplace contract
const marketplaceABI = [
  'event Listed(address indexed nft, uint256 indexed tokenId, address indexed seller, uint256 price, address creator, uint96 royaltyBps)',
  'event Cancelled(address indexed nft, uint256 indexed tokenId, address indexed seller)',
  'event Bought(address indexed nft, uint256 indexed tokenId, address indexed buyer, uint256 price, uint256 royaltyPaid, uint256 sellerProceeds)',
  'function listItem(address nft, uint256 tokenId, uint256 price) external',
  'function cancelListing(address nft, uint256 tokenId) external',
  'function buyItem(address nft, uint256 tokenId) external payable',
  'function getListing(address nft, uint256 tokenId) external view returns (tuple(address nft,uint256 tokenId,address seller,uint256 price,address creator,uint96 royaltyBps,bool active))'
];

export type Listing = {
  nft: string;
  tokenId: bigint;
  seller: string;
  price: bigint;
  creator: string;
  royaltyBps: number;
  active: boolean;
};

export function getMarketplaceAddress(blockchain: string): string {
  const upper = blockchain.toUpperCase();
  const key = `VITE_${upper}_MARKETPLACE_ADDRESS` as keyof ImportMetaEnv;
  const fromEnv = (import.meta as any).env?.[key] as string | undefined;
  if (fromEnv && fromEnv.startsWith('0x') && fromEnv.length > 0) return fromEnv;
  
  // Check for single network setup
  const singleNetworkAddress = (import.meta as any).env?.VITE_MARKETPLACE_ADDRESS as string | undefined;
  if (singleNetworkAddress && singleNetworkAddress.startsWith('0x') && singleNetworkAddress.length > 0) {
    return singleNetworkAddress;
  }
  
  // fallback to known deployed address
  return '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
}

export async function getMarketplaceContract(blockchain: string, signer?: ethers.Signer | null) {
  if (!window.ethereum) throw new Error('MetaMask not available');
  const provider = new ethers.BrowserProvider(window.ethereum);
  const s = signer ?? (await provider.getSigner());
  const address = getMarketplaceAddress(blockchain);
  if (address === '0x0000000000000000000000000000000000000000') {
    throw new Error(`Marketplace address missing for ${blockchain}. Please deploy and set env.`);
  }
  return new ethers.Contract(address, marketplaceABI, s);
}

export async function fetchListing(blockchain: string, nftAddress: string, tokenId: bigint): Promise<Listing | null> {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(getMarketplaceAddress(blockchain), marketplaceABI, provider);
  try {
    const res = await contract.getListing(nftAddress, tokenId);
    if (!res) return null;
    return {
      nft: res.nft,
      tokenId: BigInt(res.tokenId),
      seller: res.seller,
      price: BigInt(res.price),
      creator: res.creator,
      royaltyBps: Number(res.royaltyBps),
      active: Boolean(res.active)
    };
  } catch {
    return null;
  }
}

export async function listItem(blockchain: string, nftAddress: string, tokenId: bigint, priceWei: bigint) {
  const market = await getMarketplaceContract(blockchain);
  const tx = await market.listItem(nftAddress, tokenId, priceWei);
  return await tx.wait();
}

export async function cancelListing(blockchain: string, nftAddress: string, tokenId: bigint) {
  const market = await getMarketplaceContract(blockchain);
  const tx = await market.cancelListing(nftAddress, tokenId);
  return await tx.wait();
}

export async function buyItem(blockchain: string, nftAddress: string, tokenId: bigint, priceWei: bigint) {
  const market = await getMarketplaceContract(blockchain);
  const tx = await market.buyItem(nftAddress, tokenId, { value: priceWei });
  return await tx.wait();
}

export function onBought(provider: ethers.Provider, blockchain: string, cb: (args: { nft: string; tokenId: bigint; buyer: string; price: bigint; royaltyPaid: bigint; sellerProceeds: bigint; }) => void) {
  const contract = new ethers.Contract(getMarketplaceAddress(blockchain), marketplaceABI, provider);
  contract.on('Bought', (nft: string, tokenId: bigint, buyer: string, price: bigint, royaltyPaid: bigint, sellerProceeds: bigint) => {
    cb({ nft, tokenId, buyer, price, royaltyPaid, sellerProceeds });
  });
  return () => contract.removeAllListeners('Bought');
}
