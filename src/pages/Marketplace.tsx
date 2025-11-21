import { useState, useEffect, useRef } from "react";
import { ethers } from "ethers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryTabs } from "@/components/CategoryTabs";
import { ArtCategoryShowcase } from "@/components/ArtCategoryShowcase";
import { GamingCategoryShowcase } from "@/components/GamingCategoryShowcase";
import { MembershipsCategoryShowcase } from "@/components/MembershipsCategoryShowcase";
import { PFPCategoryShowcase } from "@/components/PFPCategoryShowcase";
import { PhotographyCategoryShowcase } from "@/components/PhotographyCategoryShowcase";
import { MusicCategoryShowcase } from "@/components/MusicCategoryShowcase";
import { 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Heart, 
  TrendingUp, 
  EyeIcon, 
  ChevronsLeft, 
  ChevronsRight, 
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Filter
} from "lucide-react";
import { Link } from 'react-router-dom';
import { NFTImage } from '@/components/NFTImage';
import { fetchAllNFTs, convertToMarketplaceFormat, getCachedNFTs, cacheNFTs, BlockchainNFT } from '@/lib/nftFetcher';
import { NFTDebugger } from '@/components/NFTDebugger';

// Type definitions
type TrendingCollection = {
  id: string;
  name: string;
  verified: boolean;
  avatar: string;
  volume: string;
  floorPrice: string;
  change: string;
  changePositive: boolean;
};

type NotableCollection = {
  id: string;
  name: string;
  verified: boolean;
  coverImage: string;
  floorPrice: string;
  volume: string;
};

// Mock data for trending collections
const trendingCollections: TrendingCollection[] = [
  {
    id: "1",
    name: "DeadFellaz",
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    volume: "2,030 ETH",
    floorPrice: "0.65 ETH",
    change: "2.5%",
    changePositive: true
  },
  {
    id: "2",
    name: "Milady N' ft T",
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    volume: "6,861 ETH",
    floorPrice: "0.39 ETH",
    change: "1.2%",
    changePositive: true
  },
  {
    id: "3",
    name: "Azuki Genesis",
    verified: false,
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    volume: "156 ETH",
    floorPrice: "1.18 ETH",
    change: "3.7%",
    changePositive: true
  },
  {
    id: "4",
    name: "Dungeons of Driffter",
    verified: true,
    avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    volume: "0,347 ETH",
    floorPrice: "0.873 ETH",
    change: "1.6%",
    changePositive: false
  },
  {
    id: "5",
    name: "Fantastic Pigeons",
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    volume: "0,593 ETH",
    floorPrice: "0.844 ETH",
    change: "2.1%",
    changePositive: true
  },
  {
    id: "6",
    name: "Mutant Apes",
    verified: false,
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    volume: "0,572 ETH",
    floorPrice: "0.82 ETH",
    change: "0.9%",
    changePositive: true
  },
  {
    id: "7",
    name: "The Memes by 6529",
    verified: true,
    avatar: "https://randomuser.me/api/portraits/women/35.jpg",
    volume: "0,841 ETH",
    floorPrice: "0.614 ETH",
    change: "0.6%",
    changePositive: true
  }
];

// Mock data for notable collections (horizontal display)
const notableCollections: NotableCollection[] = [
  {
    id: "1",
    name: "Doodles",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop",
    floorPrice: "3,693 ETH",
    volume: "100k ETH"
  },
  {
    id: "2",
    name: "Bored Ape Yacht Club",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1497&auto=format&fit=crop",
    floorPrice: "10,893 ETH",
    volume: "783K ETH"
  },
  {
    id: "3",
    name: "Flemings by Tyler Hobbs",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=1587&auto=format&fit=crop",
    floorPrice: "25,843 ETH",
    volume: "794 ETH"
  },
  {
    id: "4",
    name: "MGMEX",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1664&auto=format&fit=crop",
    floorPrice: "0,016 ETH",
    volume: "900 ETH"
  },
  {
    id: "5",
    name: "World of Women",
    verified: true,
    coverImage: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1664&auto=format&fit=crop",
    floorPrice: "0,423 ETH",
    volume: "899 ETH"
  }
];

// Featured NFTs for the card grid
const featuredNFTs = [
  {
    id: "nft-1",
    image: "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop",
    title: "When Time Stands Still",
    creator: "ArtistName",
    creatorVerified: true,
    category: "art",
    price: "0.47 ETH",
    priceWei: ethers.parseEther("0.47"),
    isListed: false
  },
  {
    id: "nft-2",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1664&auto=format&fit=crop",
    title: "Letters by Olivia Rhye",
    creator: "OliviaRhye",
    creatorVerified: true,
    category: "photography",
    price: "0.24 ETH",
    priceWei: ethers.parseEther("0.24"),
    isListed: false
  },
  {
    id: "nft-3",
    image: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2076&q=80",
    title: "Mystical Pixel Life",
    creator: "CryptoArtist",
    creatorVerified: true,
    category: "gaming",
    price: "0.87 ETH",
    priceWei: ethers.parseEther("0.87"),
    isListed: false
  },
  {
    id: "nft-4",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1664&auto=format&fit=crop",
    title: "Digital Dreams",
    creator: "DigitalDreamer",
    creatorVerified: false,
    category: "art",
    price: "0.35 ETH",
    priceWei: ethers.parseEther("0.35"),
    isListed: false
  },
  {
    id: "nft-5",
    image: "https://images.unsplash.com/photo-1592488741757-4bb6830a854b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bXVzaWMlMjBwbGF5ZXJ8ZW58MHx8MHx8fDA%3D",
    title: "Harmony Beats",
    creator: "MusicMaestro",
    creatorVerified: true,
    category: "music",
    price: "0.41 ETH",
    priceWei: ethers.parseEther("0.41"),
    isListed: false
  },
  {
    id: "nft-6",
    image: "https://images.unsplash.com/photo-1608306448197-e83633f1261c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWVtYmVyc2hpcHxlbnwwfHwwfHx8MA%3D%3D",
    title: "Elite Membership Pass",
    creator: "MemberDAO",
    creatorVerified: true,
    category: "memberships",
    price: "1.21 ETH",
    priceWei: ethers.parseEther("1.21"),
    isListed: false
  },
  {
    id: "nft-7",
    image: "https://images.unsplash.com/photo-1630514969818-94aefc42ec47?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGZwfGVufDB8fDB8fHww",
    title: "Cosmic Avatar #429",
    creator: "PFPMaster",
    creatorVerified: true,
    category: "pfp",
    price: "0.66 ETH",
    priceWei: ethers.parseEther("0.66"),
    isListed: false
  },
  {
    id: "nft-8",
    image: "https://images.unsplash.com/photo-1523483882047-85b221f82b78?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9tYWlufGVufDB8fDB8fHww",
    title: "crypto.world",
    creator: "DomainKing",
    creatorVerified: true,
    category: "domains",
    price: "3.50 ETH",
    priceWei: ethers.parseEther("3.50"),
    isListed: false
  }
];

// Categories data for trends
const trendingCategories = [
  { id: 'art', name: 'Art' },
  { id: 'gaming', name: 'Gaming' },
  { id: 'memberships', name: 'Memberships' },
  { id: 'pfps', name: 'PFPs' },
  { id: 'photography', name: 'Photography' },
];

const Marketplace = () => {
  const [activeTab, setActiveTab] = useState("trending");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("desc");
  const [nfts, setNfts] = useState<any[]>([]);
  const [blockchainNFTs, setBlockchainNFTs] = useState<BlockchainNFT[]>([]);
  const [isLoadingNFTs, setIsLoadingNFTs] = useState(false);
  const [isPurchasing, setIsPurchasing] = useState<string | null>(null);
  
  const mainRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Filter NFTs by category
    fetchNFTsByCategory(category);
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle NFT purchase
  const handleBuyNFT = async (nft: any) => {
    if (isPurchasing) return; // Prevent multiple simultaneous purchases
    
    try {
      setIsPurchasing(nft.id);
      
      // Check if MetaMask is available
      if (!window.ethereum) {
        alert('Please install MetaMask to purchase NFTs');
        return;
      }

      // Connect to MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      
      // Get user's address
      const userAddress = await signer.getAddress();
      
      // For blockchain NFTs, use marketplace contract
      if (nft.tokenId && nft.chain) {
        // Use the marketplace address from memory
        const marketplaceAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
        
        // If NFT is listed in marketplace, buy through marketplace
        if (nft.isListed) {
          const marketplaceABI = [
            'function buyItem(address nft, uint256 tokenId) external payable'
          ];
          
          const marketplace = new ethers.Contract(marketplaceAddress, marketplaceABI, signer);
          const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'; // NFT contract address
          
          const tx = await marketplace.buyItem(contractAddress, nft.tokenId, {
            value: nft.priceWei
          });
          
          console.log('Purchase transaction sent:', tx.hash);
          await tx.wait();
          console.log('Purchase completed!');
        } else {
          // For demo purposes, simulate a direct purchase
          console.log(`Simulating purchase of ${nft.title} for ${nft.price}`);
          
          // Simulate transaction delay
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      } else {
        // For featured NFTs (demo), simulate purchase
        console.log(`Simulating purchase of ${nft.title} for ${nft.price}`);
        
        // Simulate transaction delay
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
      
      // Show success message
      alert(`Successfully purchased ${nft.title} for ${nft.price}!`);
      
      // Optional: Update NFT ownership in local state
      // This would typically be handled by listening to blockchain events
      
    } catch (error: any) {
      console.error('Purchase failed:', error);
      
      if (error.code === 4001) {
        alert('Transaction was cancelled by user');
      } else if (error.code === -32603) {
        alert('Transaction failed. Please check your wallet balance and try again.');
      } else {
        alert(`Purchase failed: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setIsPurchasing(null);
    }
  };

  // Fetch blockchain NFTs and combine with featured NFTs
  const fetchNFTsByCategory = async (category: string) => {
    console.log(`Fetching NFTs for category: ${category}`);
    
    // Combine blockchain NFTs with featured NFTs
    const blockchainFormatted = blockchainNFTs.map(convertToMarketplaceFormat);
    const allNFTs = [...blockchainFormatted, ...featuredNFTs];
    
    // Sort NFTs: newly minted first (by tokenId descending), then by mintTimestamp
    const sortedNFTs = allNFTs.sort((a, b) => {
      // First priority: newly minted NFTs (higher token ID = newer)
      if (a.tokenId && b.tokenId) {
        const tokenIdA = parseInt(a.tokenId);
        const tokenIdB = parseInt(b.tokenId);
        if (tokenIdA !== tokenIdB) {
          return tokenIdB - tokenIdA; // Higher token ID first
        }
      }
      
      // Second priority: mint timestamp (newer first)
      const timestampA = a.mintTimestamp || 0;
      const timestampB = b.mintTimestamp || 0;
      return timestampB - timestampA;
    });
    
    if (category === 'all') {
      setNfts(sortedNFTs);
    } else {
      const filteredNFTs = sortedNFTs.filter(nft => {
        if (category === 'art') return nft.category === 'art' || !nft.category;
        return nft.category === category;
      });
      setNfts(filteredNFTs);
    }
  };

  // Load blockchain NFTs
  const loadBlockchainNFTs = async () => {
    setIsLoadingNFTs(true);
    try {
      // Try to get cached NFTs first
      const cached = getCachedNFTs();
      if (cached && cached.length > 0) {
        setBlockchainNFTs(cached);
        console.log(`Loaded ${cached.length} NFTs from cache`);
      } else {
        // Fetch from blockchain
        console.log('Fetching NFTs from blockchain...');
        const fetchedNFTs = await fetchAllNFTs();
        setBlockchainNFTs(fetchedNFTs);
        
        // Cache the results
        if (fetchedNFTs.length > 0) {
          cacheNFTs(fetchedNFTs, 5); // Cache for 5 minutes
          console.log(`Fetched and cached ${fetchedNFTs.length} NFTs from blockchain`);
        }
      }
    } catch (error) {
      console.error('Error loading blockchain NFTs:', error);
    } finally {
      setIsLoadingNFTs(false);
    }
  };
  
  // Initialize with blockchain NFTs
  useEffect(() => {
    loadBlockchainNFTs();
  }, []);

  // Update NFTs when blockchain NFTs change
  useEffect(() => {
    fetchNFTsByCategory(activeCategory);
  }, [blockchainNFTs, activeCategory]);

  // Listen for newly minted NFTs
  useEffect(() => {
    const checkForNewNFTs = () => {
      const newlyMintedNFT = localStorage.getItem('newlyMintedNFT');
      if (newlyMintedNFT) {
        try {
          const nftData = JSON.parse(newlyMintedNFT);
          
          // Update current category to match the newly minted NFT if not in 'all'
          if (activeCategory !== 'all' && activeCategory !== nftData.category) {
            setActiveCategory('all');
          }
          
          // Add the new NFT to the existing list (at the beginning)
          setNfts(prevNfts => {
            // Check if NFT with same ID already exists
            const exists = prevNfts.some(nft => nft.id === nftData.id);
            if (exists) {
              return prevNfts;
            }
            // Add new NFT at the beginning with current timestamp
            const newNftWithTimestamp = {
              ...nftData,
              mintTimestamp: Date.now()
            };
            return [newNftWithTimestamp, ...prevNfts];
          });
          
          // Show a notification or alert that an NFT was added
          console.log("New NFT added to marketplace:", nftData);
          
          // Clear the localStorage and immediately refresh blockchain NFTs
          localStorage.removeItem('newlyMintedNFT');
          localStorage.removeItem('nftCache'); // Clear cache to force refresh
          loadBlockchainNFTs(); // Refresh immediately
        } catch (error) {
          console.error('Error parsing newly minted NFT:', error);
        }
      }
    };
    
    // Check immediately and then set up interval
    checkForNewNFTs();
    
    // Check more frequently (every 2 seconds instead of 5)
    const interval = setInterval(checkForNewNFTs, 2000);
    
    return () => clearInterval(interval);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main ref={mainRef} className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

          {/* Category specific content */}
          <div className="mt-8">
            {activeCategory === "art" && <ArtCategoryShowcase />}
            {activeCategory === "gaming" && <GamingCategoryShowcase />}
            {activeCategory === "memberships" && <MembershipsCategoryShowcase />}
            {activeCategory === "pfps" && <PFPCategoryShowcase />}
            {activeCategory === "photography" && <PhotographyCategoryShowcase />}
            {activeCategory === "music" && <MusicCategoryShowcase />}
          </div>
          
          {/* All section content */}
          {activeCategory === "all" && (
            <>
              {/* Loading indicator */}
              {isLoadingNFTs && (
                <div className="mt-8 flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading NFTs from blockchain...</p>
                    <p className="text-gray-500 text-sm mt-1">This may take a few moments</p>
                  </div>
                </div>
              )}


              {/* Featured NFT Cards */}
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {nfts.map((nft) => (
                  <div key={nft.id} className="relative group rounded-lg overflow-hidden bg-gray-800/30 border border-gray-700/50 cursor-pointer transition-all hover:border-gray-500 hover:shadow-lg hover:shadow-primary/20">
                    <div className="aspect-square">
                      <NFTImage
                        src={nft.image}
                        alt={nft.title}
                        className="object-cover w-full h-full"
                        showLoader={true}
                      />
                    </div>
                    <div className="absolute top-2 right-2">
                      <button className="flex items-center justify-center h-8 w-8 rounded-full bg-black/50 hover:bg-black/70 transition-colors">
                        <Heart className="h-4 w-4 text-white/70 hover:text-white/90" />
                      </button>
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-medium text-primary">
                          {nft.category && (
                            <span className="capitalize">{nft.category}</span>
                          )}
                        </p>
                        {nft.tokenId && (
                          <p className="text-xs text-muted-foreground">
                            #{nft.tokenId.toString().padStart(4, '0')}
                          </p>
                        )}
                      </div>
                      <h3 className="font-semibold mt-1 line-clamp-1">{nft.title}</h3>
                      <div className="flex items-center mt-1 mb-1">
                        <p className="text-xs text-muted-foreground">Created by</p>
                        <p className="text-xs font-medium ml-1 truncate">{nft.creator}</p>
                        {nft.creatorVerified && (
                          <CheckCircle className="h-3 w-3 ml-0.5 text-primary" />
                        )}
                      </div>
                      
                      {/* Additional metadata */}
                      {(nft.royalty || nft.editions) && (
                        <div className="flex items-center gap-2 mt-1 mb-2">
                          {nft.royalty && (
                            <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-0.5 rounded-full">
                              {nft.royalty}% royalty
                            </span>
                          )}
                          {nft.editions && (
                            <span className="text-xs bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full">
                              {nft.editions.minted}/{nft.editions.total} minted
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="mt-2 space-y-2">
                        {/* Price Display */}
                        <div className="flex justify-between items-center">
                          {nft.price ? (
                            <p className="text-sm font-medium text-green-400">{nft.price}</p>
                          ) : (
                            <p className="text-sm text-gray-400">Not for sale</p>
                          )}
                          {nft.tokenId && (
                            <span className="text-xs text-gray-500">#{nft.tokenId}</span>
                          )}
                        </div>
                        
                        {/* Action Buttons */}
                        {nft.tokenId ? (
                          <div className="flex gap-1">
                            <Link
                              to={`/marketplace/${nft.chain || 'ethereum'}/${nft.tokenId}`}
                              className="flex-1 text-center text-xs bg-primary/10 text-primary hover:bg-primary/20 px-2 py-1.5 rounded transition-colors"
                            >
                              View Details
                            </Link>
                            <button
                              onClick={() => handleBuyNFT(nft)}
                              disabled={isPurchasing === nft.id}
                              className={`flex-1 text-center text-xs px-2 py-1.5 rounded transition-colors font-medium ${
                                isPurchasing === nft.id
                                  ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed'
                                  : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                              }`}
                            >
                              {isPurchasing === nft.id ? 'Purchasing...' : 'Buy Now'}
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-1">
                            <button
                              disabled
                              className="flex-1 text-center text-xs bg-primary/10 text-primary/50 px-2 py-1.5 rounded cursor-not-allowed"
                            >
                              View Details
                            </button>
                            <button
                              onClick={() => handleBuyNFT(nft)}
                              disabled={isPurchasing === nft.id}
                              className={`flex-1 text-center text-xs px-2 py-1.5 rounded transition-colors font-medium ${
                                isPurchasing === nft.id
                                  ? 'bg-gray-500/10 text-gray-500 cursor-not-allowed'
                                  : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'
                              }`}
                            >
                              {isPurchasing === nft.id ? 'Purchasing...' : 'Buy Now'}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Trending Section */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-4">
                    <button 
                      className={`font-medium ${activeTab === 'trending' ? 'text-white' : 'text-gray-400'}`}
                      onClick={() => handleTabChange('trending')}
                    >
                      Trending
                    </button>
                    <button 
                      className={`font-medium ${activeTab === 'top' ? 'text-white' : 'text-gray-400'}`}
                      onClick={() => handleTabChange('top')}
                    >
                      Top
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <div className="bg-gray-800 rounded flex items-center px-3 py-1.5">
                      <span className="text-gray-400 text-sm mr-2">24h</span>
                      <ChevronDown size={16} className="text-gray-400" />
                    </div>
                    
                    <button 
                      className="bg-gray-800 rounded p-1.5"
                      onClick={toggleSortOrder}
                    >
                      {sortOrder === 'desc' ? (
                        <TrendingUp size={16} className="text-gray-400" />
                      ) : (
                        <ChevronUp size={16} className="text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
                
                {/* Trending Collections Table */}
                <div className="bg-gray-800/50 rounded-lg border border-gray-700">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700 text-left text-xs text-gray-400">
                        <th className="py-3 pl-4">#</th>
                        <th className="py-3">Collection</th>
                        <th className="py-3">Volume</th>
                        <th className="py-3">Floor Price</th>
                        <th className="py-3 pr-4">24h %</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trendingCollections.map((collection, index) => (
                        <tr key={collection.id} className="border-b border-gray-700/50 hover:bg-gray-700/20 cursor-pointer">
                          <td className="py-3 pl-4 text-gray-400">{index + 1}</td>
                          <td>
                            <div className="flex items-center py-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                                <img 
                                  src={collection.avatar}
                                  alt={collection.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex items-center">
                                <span className="font-medium">{collection.name}</span>
                                {collection.verified && (
                                  <CheckCircle size={14} className="ml-1 text-blue-400" />
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 font-medium">{collection.volume}</td>
                          <td className="py-3 font-medium">{collection.floorPrice}</td>
                          <td className={`py-3 pr-4 font-medium ${collection.changePositive ? 'text-green-400' : 'text-red-400'} flex items-center`}>
                            {collection.changePositive ? (
                              <TrendingUp size={14} className="mr-1" />
                            ) : (
                              <ChevronDown size={14} className="mr-1" />
                            )}
                            {collection.change}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {/* Pagination */}
                  <div className="flex justify-between items-center p-4 border-t border-gray-700">
                    <div className="flex items-center">
                      <button className="flex items-center text-gray-400 hover:text-white transition">
                        <ChevronLeft size={16} className="mr-1" />
                        <span className="text-sm">Previous</span>
                      </button>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button className="w-8 h-8 rounded-md flex items-center justify-center bg-gray-700 text-white">1</button>
                      <button className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition">2</button>
                      <button className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition">3</button>
                      <span className="text-gray-400">...</span>
                      <button className="w-8 h-8 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white transition">10</button>
                    </div>
                    <div className="flex items-center">
                      <button className="flex items-center text-gray-400 hover:text-white transition">
                        <span className="text-sm">Next</span>
                        <ChevronRight size={16} className="ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notable Collections */}
              <div className="mt-12">
                <h2 className="text-xl font-bold mb-4">Notable collections</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {notableCollections.map((collection) => (
                    <div key={collection.id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition cursor-pointer">
                      <div className="aspect-square">
                        <img 
                          src={collection.coverImage}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <div className="flex items-center mb-2">
                          <h3 className="font-medium text-sm">{collection.name}</h3>
                          {collection.verified && (
                            <CheckCircle size={12} className="ml-1 text-blue-400" />
                          )}
                        </div>
                        <div className="flex flex-col space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Floor</span>
                            <span className="font-medium">{collection.floorPrice}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Volume</span>
                            <span className="font-medium">{collection.volume}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Trending in Art Section */}
              <div className="mt-12">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Trending in Art</h2>
                  <a href="#" className="text-sm text-gray-400 hover:text-white flex items-center">
                    View category <ArrowRight size={14} className="ml-1" />
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {/* Sample art NFTs - simplified for the implementation */}
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={`art-${index}`} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition cursor-pointer">
                      <div className="aspect-square bg-gray-700">
                        <img 
                          src={`https://source.unsplash.com/random/300x300?art=${index}`}
                          alt={`Art NFT ${index}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm">Art NFT #{index + 1}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-xs text-gray-400">by Artist{index}</span>
                          <CheckCircle size={12} className="ml-1 text-blue-400" />
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="text-xs text-gray-400">Price</span>
                          <span className="text-sm font-medium">0.{index + 1} ETH</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
          
          {/* NFT Grid - shown for other categories */}
          {activeCategory !== "all" && activeCategory !== "art" && activeCategory !== "gaming" && activeCategory !== "memberships" && activeCategory !== "pfps" && activeCategory !== "photography" && activeCategory !== "music" && (
            <div className="my-8">
              <h2 className="text-2xl font-bold mb-6">
                {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} NFTs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {/* Placeholder content for other categories */}
                {Array.from({ length: 8 }).map((_, index) => (
                  <div key={`${activeCategory}-${index}`} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-gray-600 transition cursor-pointer">
                    <div className="aspect-square bg-gray-700">
                      <img 
                        src={`https://source.unsplash.com/random/300x300?${activeCategory}=${index}`}
                        alt={`${activeCategory} NFT ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm">{activeCategory} #{index + 1}</h3>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-gray-400">by Creator{index}</span>
                        <CheckCircle size={12} className="ml-1 text-blue-400" />
                      </div>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="text-xs text-gray-400">Price</span>
                        <span className="text-sm font-medium">0.{index + 1} ETH</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
