import { useState, useEffect } from "react";
import { CheckCircle, Heart, EyeIcon, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NFTGridProps {
  category?: string;
}

type NFTItem = {
  id: string;
  name: string;
  creator: {
    name: string;
    verified: boolean;
    avatar?: string;
  };
  image: string;
  price: number;
  currency: string;
  likes: number;
  views: number;
  isLiked?: boolean;
  isPurchasable?: boolean;
  isBiddable?: boolean;
  description?: string;
};

// Sample NFT data - in a real app, this would come from an API
const nftItems: NFTItem[] = [
  {
    id: "nft-1",
    name: "Cosmic Perspective #217",
    creator: {
      name: "DigitalDreamer",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=600&auto=format&fit=crop&q=60",
    price: 0.85,
    currency: "ETH",
    likes: 142,
    views: 876,
    isPurchasable: true,
    description: "A cosmic journey through the outer realms of digital art, exploring the connection between space and human consciousness."
  },
  {
    id: "nft-2",
    name: "Abstract Flow #42",
    creator: {
      name: "ArtistCollective",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    image: "https://images.unsplash.com/photo-1633280275148-bb869a6e2e84?w=600&auto=format&fit=crop&q=60",
    price: 1.25,
    currency: "ETH",
    likes: 89,
    views: 654,
    isPurchasable: true,
    description: "Fluid forms and vibrant colors merge to create a mesmerizing abstract piece that evokes emotion through movement."
  },
  {
    id: "nft-3",
    name: "Neon Dreams",
    creator: {
      name: "CyberCreator",
      verified: false,
      avatar: "https://randomuser.me/api/portraits/men/22.jpg"
    },
    image: "https://images.unsplash.com/photo-1585023572793-b0d9cf6af600?w=600&auto=format&fit=crop&q=60",
    price: 0.5,
    currency: "ETH",
    likes: 56,
    views: 432,
    isBiddable: true,
    description: "A cyberpunk-inspired digital painting featuring neon-lit urban landscapes and futuristic elements."
  },
  {
    id: "nft-4",
    name: "Digital Landscape #7",
    creator: {
      name: "NatureDigital",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    image: "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?w=600&auto=format&fit=crop&q=60",
    price: 1.75,
    currency: "ETH",
    likes: 213,
    views: 1254,
    isPurchasable: true,
    description: "A serene digital landscape that blends natural elements with algorithmic patterns, creating a peaceful yet dynamic scene."
  },
  {
    id: "nft-5",
    name: "Future City",
    creator: {
      name: "UrbanArtist",
      verified: false,
      avatar: "https://randomuser.me/api/portraits/men/54.jpg"
    },
    image: "https://images.unsplash.com/photo-1575172088809-370e3703f1bc?w=600&auto=format&fit=crop&q=60",
    price: 0.95,
    currency: "ETH",
    likes: 78,
    views: 650,
    isBiddable: true,
    description: "A vision of tomorrow's metropolis, blending architecture with technology in a vibrant cityscape."
  },
  {
    id: "nft-6",
    name: "Glitch Effect #12",
    creator: {
      name: "GlitchMaster",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    image: "https://images.unsplash.com/photo-1496674205429-924b32acd6a2?w=600&auto=format&fit=crop&q=60",
    price: 0.65,
    currency: "ETH",
    likes: 32,
    views: 280,
    isPurchasable: true,
    description: "An exploration of digital errors and distortion, turning technological glitches into artistic expression."
  },
  {
    id: "nft-7",
    name: "Liquid Motion",
    creator: {
      name: "FluidArtist",
      verified: true,
      avatar: "https://randomuser.me/api/portraits/men/75.jpg"
    },
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&auto=format&fit=crop&q=60",
    price: 2.5,
    currency: "ETH",
    likes: 176,
    views: 894,
    isPurchasable: true,
    description: "A mesmerizing series capturing the beauty of liquid movement, frozen in time as digital art."
  },
  {
    id: "nft-8",
    name: "Geometric Harmony",
    creator: {
      name: "GeoDesigner",
      verified: false,
      avatar: "https://randomuser.me/api/portraits/women/35.jpg"
    },
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&auto=format&fit=crop&q=60",
    price: 1.1,
    currency: "ETH",
    likes: 94,
    views: 716,
    isBiddable: true,
    description: "A perfect balance of geometric shapes and patterns creating a harmonious composition with depth and dimension."
  }
];

export const NFTGrid = ({ category }: NFTGridProps) => {
  const [likedNFTs, setLikedNFTs] = useState<Record<string, boolean>>({});
  const [hoveredNFT, setHoveredNFT] = useState<string | null>(null);
  const [items, setItems] = useState<NFTItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate loading data from API based on category
    setTimeout(() => {
      setItems(nftItems);
      setIsLoaded(true);
    }, 500);
  }, [category]);
  
  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedNFTs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Optional: Add a simple class-based animation if anime.js is not available
    if (e.currentTarget) {
      e.currentTarget.classList.add('scale-effect');
      setTimeout(() => {
        e.currentTarget.classList.remove('scale-effect');
      }, 300);
    }
  };
  
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}>
        {items.map((nft) => (
          <div 
            key={nft.id} 
            className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:shadow-xl hover:shadow-purple-900/10 group transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setHoveredNFT(nft.id)}
            onMouseLeave={() => setHoveredNFT(null)}
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={nft.image} 
                alt={nft.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              
              {/* Overlay gradient on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              {/* Interaction buttons */}
              <div className="absolute top-3 right-3 flex space-x-2">
                <button 
                  className={`p-2 rounded-full backdrop-blur-md ${
                    likedNFTs[nft.id] 
                      ? 'bg-red-500/80 text-white shadow-lg shadow-red-500/20' 
                      : 'bg-black/50 text-white hover:bg-black/70'
                  } transition-all duration-300`}
                  onClick={(e) => toggleLike(nft.id, e)}
                >
                  <Heart 
                    size={18} 
                    fill={likedNFTs[nft.id] ? "white" : "none"} 
                    className={likedNFTs[nft.id] ? "animate-pulse" : ""}
                  />
                </button>
                <div 
                  className="p-2 rounded-full backdrop-blur-md bg-black/50 text-white flex items-center gap-1 text-xs"
                >
                  <EyeIcon size={16} />
                  <span>{nft.views}</span>
                </div>
              </div>
              
              {/* Quick action button on hover */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Button 
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 rounded-full shadow-lg shadow-purple-900/20 px-6 py-2 text-sm font-medium"
                >
                  {nft.isPurchasable ? (
                    <>
                      <Tag size={16} className="mr-2" />
                      Buy Now
                    </>
                  ) : nft.isBiddable ? (
                    <>
                      <Tag size={16} className="mr-2" />
                      Place Bid
                    </>
                  ) : (
                    <>
                      <EyeIcon size={16} className="mr-2" />
                      View Details
                    </>
                  )}
                </Button>
              </div>
            </div>
            
            <div className="p-5">
              {/* Creator info */}
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-700">
                  <img 
                    src={nft.creator.avatar} 
                    alt={nft.creator.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1">
                    <p className="text-gray-400 text-xs">By {nft.creator.name}</p>
                    {nft.creator.verified && (
                      <CheckCircle size={12} className="text-indigo-400" />
                    )}
                  </div>
                </div>
              </div>
              
              {/* NFT name and description */}
              <h3 className="font-semibold text-lg mb-1 truncate">{nft.name}</h3>
              
              {hoveredNFT === nft.id ? (
                <p 
                  className="text-gray-400 text-sm h-12 overflow-hidden transition-opacity duration-300"
                  style={{ opacity: 1 }}
                >
                  {nft.description?.substring(0, 80)}
                  {nft.description && nft.description.length > 80 ? '...' : ''}
                </p>
              ) : (
                <div className="h-12">
                  <p className="text-gray-400 text-sm mb-3 opacity-60">
                    {nft.views} views • {nft.likes + (likedNFTs[nft.id] ? 1 : 0)} likes
                  </p>
                </div>
              )}
              
              {/* Price and action info */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-800/50">
                <div>
                  <p className="text-xs text-gray-500">Current Price</p>
                  <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    {nft.price} {nft.currency}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">
                    {nft.isPurchasable ? 'Buy Now' : nft.isBiddable ? 'Auction' : 'View'} 
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {!isLoaded && (
        <div className="flex justify-center items-center h-64">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-purple-500 animate-spin"></div>
            <div className="absolute inset-1 rounded-full border-l-2 border-indigo-400 animate-spin animation-delay-500"></div>
          </div>
        </div>
      )}

      <style jsx>{`
        .scale-effect {
          animation: scale-pulse 0.3s ease-in-out;
        }
        
        @keyframes scale-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

// TypeScript interface for anime.js if needed
declare global {
  interface Window {
    anime: any;
  }
}
