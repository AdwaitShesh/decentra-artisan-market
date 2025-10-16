import { useState, useEffect } from "react";
import { CheckCircle, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define featured collection type
type FeaturedCollection = {
  id: string;
  name: string;
  creator: string;
  description: string;
  image: string;
  floorPrice: number;
  volume: number;
  itemCount: number;
  verified: boolean;
};

// Sample featured collections data
const featuredCollections: FeaturedCollection[] = [
  {
    id: "bayc",
    name: "Bored Ape Yacht Club",
    creator: "Yuga Labs",
    description: "The Bored Ape Yacht Club is a collection of 10,000 unique Bored Ape NFTs — unique digital collectibles living on the Ethereum blockchain.",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=2069&auto=format&fit=crop",
    floorPrice: 72.5,
    volume: 1205,
    itemCount: 10000,
    verified: true
  },
  {
    id: "azuki",
    name: "Azuki",
    creator: "Chiru Labs",
    description: "Azuki starts with a collection of 10,000 avatars that give you membership access to The Garden: a corner of the internet where artists, builders, and web3 enthusiasts meet.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=2000&auto=format&fit=crop",
    floorPrice: 15.2,
    volume: 876,
    itemCount: 10000,
    verified: true
  },
  {
    id: "doodles",
    name: "Doodles",
    creator: "Doodles",
    description: "A community-driven collectibles project featuring art by Burnt Toast. Doodles come in a joyful range of colors, traits and sizes with a collection size of 10,000.",
    image: "https://images.unsplash.com/photo-1578321272698-e0dc125b92e5?q=80&w=2070&auto=format&fit=crop",
    floorPrice: 8.4,
    volume: 453,
    itemCount: 10000,
    verified: true
  }
];

export const FeaturedCollections = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 8000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, activeIndex]);
  
  const handlePrevious = () => {
    if (isTransitioning) return;
    
    setIsAutoPlaying(false);
    setDirection(-1);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveIndex((current) => (current === 0 ? featuredCollections.length - 1 : current - 1));
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };
  
  const handleNext = () => {
    if (isTransitioning) return;
    
    setIsAutoPlaying(false);
    setDirection(1);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveIndex((current) => (current === featuredCollections.length - 1 ? 0 : current + 1));
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };
  
  const handleIndicatorClick = (index: number) => {
    if (isTransitioning || index === activeIndex) return;
    
    setIsAutoPlaying(false);
    setDirection(index > activeIndex ? 1 : -1);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }, 50);
  };
  
  const activeCollection = featuredCollections[activeIndex];
  
  return (
    <div className="mb-20">
      <div className="relative h-[600px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800/40 shadow-xl">
        {/* Background image with animations */}
        <div 
          className="absolute inset-0 transition-opacity duration-500"
          style={{ 
            opacity: isTransitioning ? 0 : 1
          }}
        >
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src={activeCollection.image} 
              alt={activeCollection.name} 
              className="w-full h-full object-cover transform scale-110 animate-slow-zoom"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/40 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-end pointer-events-none">
            <div className="container mx-auto px-6 pb-16 md:max-w-4xl">
              <div 
                className="max-w-2xl space-y-8 transition-all duration-500"
                style={{ 
                  opacity: isTransitioning ? 0 : 1,
                  transform: isTransitioning ? 'translateY(20px)' : 'translateY(0)' 
                }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <p className="text-gray-300 font-medium">{activeCollection.creator}</p>
                  {activeCollection.verified && (
                    <CheckCircle size={18} className="text-indigo-400" />
                  )}
                </div>
                
                <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-indigo-200">{activeCollection.name}</h1>
                
                <p className="text-gray-300 text-lg leading-relaxed">{activeCollection.description}</p>
                
                <div className="grid grid-cols-3 gap-8 mb-8">
                  <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">Floor Price</p>
                    <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{activeCollection.floorPrice} ETH</p>
                  </div>
                  <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">Volume</p>
                    <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{activeCollection.volume} ETH</p>
                  </div>
                  <div className="bg-gray-800/40 backdrop-blur-sm p-4 rounded-xl border border-gray-700/50">
                    <p className="text-gray-400 text-sm mb-1">Items</p>
                    <p className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">{activeCollection.itemCount.toLocaleString()}</p>
                  </div>
                </div>
                
                <div className="flex gap-4 pointer-events-auto">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 rounded-xl shadow-lg shadow-purple-900/20 px-8"
                  >
                    View Collection
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-gray-700 text-white hover:bg-gray-800/50 rounded-xl px-8 group"
                  >
                    Share
                    <ExternalLink size={16} className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handlePrevious}
            className="rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800 w-12 h-12"
            disabled={isTransitioning}
          >
            <ChevronLeft size={24} />
          </Button>
        </div>
        
        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={handleNext}
            className="rounded-full bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 text-white hover:bg-gray-800 w-12 h-12"
            disabled={isTransitioning}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
        
        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-3">
          {featuredCollections.map((_, index) => (
            <button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className="group"
              disabled={isTransitioning}
            >
              <div className={`w-12 h-1 rounded-full transition-all ${
                index === activeIndex 
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500 w-16" 
                  : "bg-gray-600 group-hover:bg-gray-400"
              }`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add keyframes for slow zoom animation
const style = document.createElement('style');
style.textContent = `
@keyframes slow-zoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}
.animate-slow-zoom {
  animation: slow-zoom 20s infinite alternate ease-in-out;
}
`;
document.head.appendChild(style); 