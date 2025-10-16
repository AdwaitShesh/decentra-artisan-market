import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoNFT = {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
  verified?: boolean;
};

// Photography Spotlight data
const photographySpotlightItems: PhotoNFT[] = [
  {
    id: 1,
    title: "Jade Dust - Limited Editions",
    creator: "Phil Clarkson",
    price: "0.65 ETH",
    image: "https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Nick Brandt Editions",
    creator: "Nick Brandt",
    price: "0.87 ETH",
    image: "https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Walking Hands by Antonia",
    creator: "Antonia",
    price: "0.165 ETH",
    image: "https://images.unsplash.com/photo-1614715838608-dd527c46231d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Whispers In The Snow",
    creator: "Ellen Jewett",
    price: "0.24 ETH",
    image: "https://images.unsplash.com/photo-1604537529428-15bcbeecfe4d?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Rumors of Arctic Belonging",
    creator: "Kiliii Yuyan",
    price: "0.85 ETH",
    image: "https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Nature Photography data
const naturePhotographyItems: PhotoNFT[] = [
  {
    id: 1,
    title: "Justin Airanzo - Snow Series #12",
    creator: "Justin Airanzo",
    price: "0.27 ETH",
    image: "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Atlas by Justin Aversano",
    creator: "Justin Aversano",
    price: "0.55 ETH",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Cath Simard Editions",
    creator: "Cath Simard",
    price: "0.20 ETH",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Above It All",
    creator: "Ben Staley",
    price: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Doppelgänger",
    creator: "Justin Peters",
    price: "0.12 ETH",
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Portrait Photography data
const portraitPhotographyItems: PhotoNFT[] = [
  {
    id: 1,
    title: "The Lovely Astronaut",
    creator: "Max Yang",
    price: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1583468982228-19f19164aee1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Fourteenth Century Star",
    creator: "Linda Wallace",
    price: "0.05 ETH",
    image: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "InnerDAO",
    creator: "DAO Studios",
    price: "0.04 ETH",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Kaleidoscope #45",
    creator: "Prism Pictures",
    price: "0.11 ETH",
    image: "https://images.unsplash.com/photo-1501631239978-c0bee51bd8af?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Golden Hour Portraits",
    creator: "Luca Morris",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1502323777036-f29e3972f5ea?auto=format&fit=crop&w=600&q=80"
  }
];

// Street Photography data
const streetPhotographyItems: PhotoNFT[] = [
  {
    id: 1,
    title: "Urban Reflections #7",
    creator: "Urban Archive",
    price: "0.18 ETH",
    image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Tokyo Streets at Night",
    creator: "Akira Takizawa",
    price: "0.32 ETH",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "New York Minute",
    creator: "Midtown Media",
    price: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "London Rain",
    creator: "Thames Collective",
    price: "0.24 ETH",
    image: "https://images.unsplash.com/photo-1517394834181-95ed159986c7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Underground Passages",
    creator: "Metro Vision",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1506836467174-27f1042aa48c?auto=format&fit=crop&w=600&q=80"
  }
];

// Landscape Photography data
const landscapePhotographyItems: PhotoNFT[] = [
  {
    id: 1,
    title: "Iceland's Veins",
    creator: "Nordic Visions",
    price: "0.45 ETH",
    image: "https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Desert Chronicles",
    creator: "Terra Gallery",
    price: "0.21 ETH",
    image: "https://images.unsplash.com/photo-1547235236-c8a555ac0316?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "The Ancient Forest",
    creator: "Sylvan Art",
    price: "0.35 ETH",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Coastal Dreams",
    creator: "Ocean Lens",
    price: "0.19 ETH",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Mountain Majesty",
    creator: "Alpine Images",
    price: "0.28 ETH",
    image: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?auto=format&fit=crop&w=600&q=80"
  }
];

export function PhotoCard({ nft, size = "medium" }: { nft: PhotoNFT, size?: 'small' | 'medium' | 'large' }) {
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
            <p className="text-xs text-muted-foreground dark:text-gray-400">by {nft.creator}</p>
          </div>
          <p className="text-xs font-semibold text-foreground dark:text-white">{nft.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function PhotographyCategorySection({ 
  title, 
  items, 
  viewAllLink = "#", 
  cardSize = "medium" 
}: { 
  title: string, 
  items: PhotoNFT[], 
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
          <PhotoCard key={item.id} nft={item} size={cardSize} />
        ))}
      </div>
    </div>
  );
}

export function PhotographyBanner() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden relative mb-12">
      <img 
        src="https://images.unsplash.com/photo-1474649107449-ea4f014b7e9f?auto=format&fit=crop&w=1600&q=80" 
        alt="Rumors of Arctic Belonging" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="absolute top-4 left-4 bg-teal-500/20 p-2 rounded-md backdrop-blur-sm">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-teal-400">
              <path d="M15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M17.5 7.5H17.51" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Rumors of Arctic Belonging</h1>
        <p className="text-sm md:text-base text-gray-300 mt-2">by Kiliii Yuyan <span className="inline-block bg-blue-500/30 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-2">Verified</span></p>
        <p className="text-sm text-gray-400 mt-1">Floor price: 0.85 ETH</p>
        <button className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-4 py-2 w-max transition">
          View collection
        </button>
      </div>
    </div>
  );
}

export function PhotographyCategoryShowcase() {
  return (
    <div className="space-y-10">
      <PhotographyBanner />
      
      <PhotographyCategorySection title="Photography spotlight" items={photographySpotlightItems} />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Nature Photography</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {naturePhotographyItems.map(item => (
            <PhotoCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Portrait Photography</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {portraitPhotographyItems.map(item => (
            <PhotoCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Street Photography</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {streetPhotographyItems.map(item => (
            <PhotoCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Landscape Photography</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {landscapePhotographyItems.map(item => (
            <PhotoCard key={item.id} nft={item} />
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
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What are photography NFTs?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about photography on the blockchain</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                  <path d="M21 7.5V6.75C21 5.78392 21 5.30087 20.8978 4.91343C20.6204 3.91362 19.8366 3.12977 18.8368 2.85235C18.4493 2.75018 17.9663 2.75018 17 2.75018H7C6.03371 2.75018 5.55056 2.75018 5.16312 2.85235C4.16332 3.12977 3.37947 3.91362 3.10205 4.91343C3 5.30087 3 5.78392 3 6.75V17.25C3 18.2161 3 18.6991 3.10205 19.0866C3.37947 20.0864 4.16332 20.8702 5.16312 21.1476C5.55056 21.2498 6.03371 21.2498 7 21.2498H9M16 13.75H12.75C11.7835 13.75 11.3003 13.75 10.9128 13.8522C9.913 14.1296 9.12916 14.9134 8.85173 15.9132C8.74968 16.3007 8.74968 16.7837 8.74968 17.75V21H16M16 13.75V17.75M16 21V17.75M16 17.75H21V13.75H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is an NFT?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Understand non-fungible tokens</p>
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
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about the minting process</p>
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
              <p className="text-sm text-muted-foreground dark:text-gray-400">Security tips for NFT collectors</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 