import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, EyeIcon, ArrowRight, ChevronDown, ExternalLink, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type ArtNFT = {
  id: number;
  title: string;
  artist: string;
  price: string;
  image: string;
  verified?: boolean;
};

// Art Spotlight data
const artSpotlightItems: ArtNFT[] = [
  {
    id: 1,
    title: "Multiple Neural Networks",
    artist: "Digital Syntax",
    price: "0.82 ETH",
    image: "https://images.unsplash.com/photo-1541702467897-41397f7b143b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Sunrise by TenaK artist",
    artist: "TenaK Artist",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Ethereal Landscapes - 2023",
    artist: "Crypto Atelier",
    price: "0.063 ETH",
    image: "https://images.unsplash.com/photo-1519611103964-90f61a50d3e6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Red Thing",
    artist: "AI Thing",
    price: "0.083 ETH",
    image: "https://images.unsplash.com/photo-1633286673955-b3b7fb533711?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Cerebral art v2.0",
    artist: "cerebral.eth",
    price: "0.039 ETH", 
    image: "https://images.unsplash.com/photo-1608501267744-79bd55729eba?auto=format&fit=crop&w=600&q=80"
  }
];

// Digital Art trending data
const digitalArtItems: ArtNFT[] = [
  {
    id: 1,
    title: "Machine Neural Networks",
    artist: "Digital Syntax",
    price: "0.42 ETH",
    image: "https://images.unsplash.com/photo-1546453667-8a8d2d07bc20?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Textures by TenaK artist",
    artist: "TenaK",
    price: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1547499681-28dece7dba00?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Ethereal Landscapes - 2023",
    artist: "Crypto Atelier",
    price: "0.063 ETH",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "The Mars",
    artist: "Future Labs",
    price: "0.04 ETH",
    image: "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Abstract Art v3.0",
    artist: "AI Artisans",
    price: "0.05 ETH",
    image: "https://images.unsplash.com/photo-1573096108468-702f6014ef28?auto=format&fit=crop&w=600&q=80"
  }
];

// Pixel Art trending data
const pixelArtItems: ArtNFT[] = [
  {
    id: 1,
    title: "Bare Pixel (2019) - RARE",
    artist: "Pixelated",
    price: "1.05 ETH",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Qoobz",
    artist: "8-Bit Creations",
    price: "0.12 ETH",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Jester's World Editions",
    artist: "Pixel Punk",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Pixeldust",
    artist: "Bit by Bit",
    price: "0.22 ETH",
    image: "https://images.unsplash.com/photo-1605106702842-01a887a31122?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "CryptyPaws",
    artist: "8-Bit Labs",
    price: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1633532482964-3c26fee9f35b?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Abstract Art trending data
const abstractArtItems: ArtNFT[] = [
  {
    id: 1,
    title: "vfx by kami",
    artist: "Kami",
    price: "1.79 ETH",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Axis Network",
    artist: "Geometric Art",
    price: "1.1 ETH",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "EphemeraLab by Scrail",
    artist: "Scrail Collective",
    price: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Rocks Gallery",
    artist: "Digital Tapestry",
    price: "0.73 ETH",
    image: "https://images.unsplash.com/photo-1549490349-b73f9351fdce?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "IDENTITY by park",
    artist: "Park Labs",
    price: "0.059 ETH",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// 3D Art trending data
const threeDartItems: ArtNFT[] = [
  {
    id: 1,
    title: "Complex Realities 1.0",
    artist: "VR Genesis",
    price: "1.09 ETH",
    image: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Agora: The Eternal Marketplace",
    artist: "3D Collective",
    price: "1.0 ETH",
    image: "https://images.unsplash.com/photo-1625204614387-6ee9ed761596?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Plaque's Lair",
    artist: "Virtual Dreams",
    price: "0.089 ETH",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "HUMANS + AI ART by Star Syndicate",
    artist: "Star Syndicate",
    price: "0.065 ETH",
    image: "https://images.unsplash.com/photo-1634838080334-32ea92505654?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Rigidly Strange",
    artist: "Meta Studios",
    price: "0.29 ETH",
    image: "https://images.unsplash.com/photo-1547891654-e66ed7ebb968?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

export function NFTCard({ nft, size = "medium" }: { nft: ArtNFT, size?: 'small' | 'medium' | 'large' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden group transition-all duration-300 rounded-xl cursor-pointer",
        "bg-card border-gray-800 hover:border-gray-700 dark:bg-black dark:border-gray-800 dark:hover:border-gray-700"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className={cn(
          "overflow-hidden",
          size === 'small' ? "h-36" : size === 'medium' ? "h-44" : "h-52"
        )}>
          <img 
            src={nft.image} 
            alt={nft.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <div className="bg-black/60 p-1.5 rounded-md backdrop-blur-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm text-foreground dark:text-white truncate">{nft.title}</h3>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground dark:text-gray-400">by {nft.artist}</p>
          </div>
          <p className="text-xs font-semibold text-foreground dark:text-white">{nft.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function ArtCategorySection({ 
  title, 
  items, 
  viewAllLink = "#", 
  cardSize = "medium" 
}: { 
  title: string, 
  items: ArtNFT[], 
  viewAllLink?: string,
  cardSize?: 'small' | 'medium' | 'large'
}) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground dark:text-white">{title}</h2>
        <a href={viewAllLink} className="text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white flex items-center">
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map(item => (
          <NFTCard key={item.id} nft={item} size={cardSize} />
        ))}
      </div>
    </div>
  );
}

export function ArtBanner() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden relative mb-12">
      <img 
        src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=1600&q=80" 
        alt="Fields by Erik Swahn" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="absolute top-4 left-4 bg-purple-500/20 p-2 rounded-md backdrop-blur-sm">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
              <path d="M2 12.5C2 7.80558 2 5.45837 3.61396 4.02532C3.85977 3.81181 4.12572 3.62235 4.40812 3.45806C6.03968 2.5 8.40708 2.5 13.1429 2.5H14.5C18.0899 2.5 19.8849 2.5 20.9335 3.55292C22 4.60584 22 6.33851 22 9.80385V14.1962C22 17.6615 22 19.3942 20.9335 20.4471C19.8849 21.5 18.0899 21.5 14.5 21.5H13.1429C8.40708 21.5 6.03968 21.5 4.40812 20.5419C4.12572 20.3776 3.85977 20.1882 3.61396 19.9747C2 18.5416 2 16.1944 2 11.5V12.5Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M14 8.5H17M14 12H17M8 16L10.5 13.5M10.5 13.5L8 11M10.5 13.5H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Fields by Erik Swahn</h1>
        <p className="text-sm md:text-base text-gray-300 mt-2">by Trad Life Studios <span className="inline-block bg-blue-500/30 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-2">Verified</span></p>
        <p className="text-sm text-gray-400 mt-1">Floor price: 7.3 ETH</p>
        <button className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-4 py-2 w-max transition">
          View collection
        </button>
      </div>
    </div>
  );
}

export function ArtCategoryShowcase() {
  return (
    <div className="space-y-10">
      <ArtBanner />
      
      <ArtCategorySection title="Art Spotlight" items={artSpotlightItems} />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Digital Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {digitalArtItems.map(item => (
            <NFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Pixel Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pixelArtItems.map(item => (
            <NFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Abstract Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {abstractArtItems.map(item => (
            <NFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in 3D Art</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {threeDartItems.map(item => (
            <NFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      {/* NFT 101 Section */}
      <div className="mt-16 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground dark:text-white">NFT 101</h2>
          <a href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white flex items-center">
            Learn more <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is an NFT?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn the basics of non-fungible tokens</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M21 7.5V6.75C21 5.78392 21 5.30087 20.8978 4.91343C20.6204 3.91362 19.8366 3.12977 18.8368 2.85235C18.4493 2.75018 17.9663 2.75018 17 2.75018H7C6.03371 2.75018 5.55056 2.75018 5.16312 2.85235C4.16332 3.12977 3.37947 3.91362 3.10205 4.91343C3 5.30087 3 5.78392 3 6.75V17.25C3 18.2161 3 18.6991 3.10205 19.0866C3.37947 20.0864 4.16332 20.8702 5.16312 21.1476C5.55056 21.2498 6.03371 21.2498 7 21.2498H9M16 13.75H12.75C11.7835 13.75 11.3003 13.75 10.9128 13.8522C9.913 14.1296 9.12916 14.9134 8.85173 15.9132C8.74968 16.3007 8.74968 16.7837 8.74968 17.75V21H16M16 13.75V17.75M16 21V17.75M16 17.75H21V13.75H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is an NFT?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Discover the technology behind NFTs</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-green-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                  <path d="M14.5 7L19.5 12L14.5 17M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">How to buy an NFT</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Step by step guide to purchasing NFTs</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-orange-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-600">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is minting?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about creating and minting NFTs</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-red-100 dark:bg-red-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-red-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                  <path d="M12 16V16.01M12 7V13M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">How to stay protected in web3</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Security tips for the NFT ecosystem</p>
            </div>
          </Card>
        </div>
      </div>
      
      {/* Explore Categories */}
      <div className="mt-16 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground dark:text-white">Explore Categories</h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="aspect-square">
              <img src="https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=300&q=80" alt="Art" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-foreground dark:text-white">Art</h3>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="aspect-square">
              <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=300&q=80" alt="Gaming" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-foreground dark:text-white">Gaming</h3>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="aspect-square">
              <img src="https://images.unsplash.com/photo-1642516303688-5f6c5134ba69?auto=format&fit=crop&w=300&q=80" alt="Memberships" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-foreground dark:text-white">Memberships</h3>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="aspect-square">
              <img src="https://images.unsplash.com/photo-1645672255150-138d825be159?auto=format&fit=crop&w=300&q=80" alt="Music" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-foreground dark:text-white">Music</h3>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="aspect-square">
              <img src="https://images.unsplash.com/photo-1454923634634-bd1614719a7b?auto=format&fit=crop&w=300&q=80" alt="PFPs" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-foreground dark:text-white">PFPs</h3>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="aspect-square">
              <img src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=300&q=80" alt="Photography" className="w-full h-full object-cover" />
            </div>
            <div className="p-3 text-center">
              <h3 className="font-medium text-foreground dark:text-white">Photography</h3>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 