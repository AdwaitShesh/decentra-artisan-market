import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type MusicNFT = {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
  verified?: boolean;
};

// Music Spotlight data
const musicSpotlightItems: MusicNFT[] = [
  {
    id: 1,
    title: "Moonshot by Visible Object",
    creator: "Visible Object",
    price: "0.11 ETH",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Producers",
    creator: "Sound.xyz",
    price: "0.02 ETH",
    image: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "PIXELATED by Sammy Allen",
    creator: "Sammy Allen",
    price: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Snoop Dogg - B.O.D.R",
    creator: "Snoop Dogg",
    price: "0.02 ETH",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "The Farmacy Farmers",
    creator: "Farmacy Collective",
    price: "0.01 ETH",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Electronic Music data
const electronicMusicItems: MusicNFT[] = [
  {
    id: 1,
    title: "LATASHA",
    creator: "LATASHA",
    price: "0.29 ETH",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Blocktones",
    creator: "BlockTone Labs",
    price: "0.001 ETH",
    image: "https://images.unsplash.com/photo-1547355253-ff0740f6e8c1?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Love Letters by Josh Savage",
    creator: "Josh Savage",
    price: "0.02 ETH",
    image: "https://images.unsplash.com/photo-1513829596324-4bb2800c5efb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "RVLTD Genesis",
    creator: "RVLTD",
    price: "0.05 ETH",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "The Pixie Girls NFT",
    creator: "Pixie Collective",
    price: "0.02 ETH",
    image: "https://images.unsplash.com/photo-1551506448-074afa034c05?auto=format&fit=crop&w=600&q=80"
  }
];

// Hip Hop data
const hipHopMusicItems: MusicNFT[] = [
  {
    id: 1,
    title: "NVIR$E by WaipsMusic",
    creator: "WaipsMusic",
    price: "0.01 ETH",
    image: "https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Gala Music Collection",
    creator: "Gala Music",
    price: "0.001 ETH",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "omgkirby Genesis",
    creator: "omgkirby",
    price: "0.001 ETH",
    image: "https://images.unsplash.com/photo-1557787163-1635e2efb160?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "MUSIC APES",
    creator: "ApeBeats",
    price: "0.001 ETH",
    image: "https://images.unsplash.com/photo-1485579149621-3123dd979885?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Lyric Loot",
    creator: "Lyrical Labs",
    price: "0.05 ETH",
    image: "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Indie Music data
const indieMusicItems: MusicNFT[] = [
  {
    id: 1,
    title: "Harmony Collective",
    creator: "Harmony Labs",
    price: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Acoustic Sessions",
    creator: "Indie Vibes",
    price: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Vinyl Dreams",
    creator: "Analog Studios",
    price: "0.045 ETH",
    image: "https://images.unsplash.com/photo-1575472782454-759352b72098?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Basement Tapes",
    creator: "Garage Band Collective",
    price: "0.022 ETH",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Festival Memories",
    creator: "Live Music DAO",
    price: "0.016 ETH",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=600&q=80"
  }
];

// Classical Music data
const classicalMusicItems: MusicNFT[] = [
  {
    id: 1,
    title: "Symphony No. 5",
    creator: "Classical Archive",
    price: "0.125 ETH",
    image: "https://images.unsplash.com/photo-1507838153414-b4b713384a76?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Piano Sonatas Collection",
    creator: "VirtualConcert",
    price: "0.085 ETH",
    image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "String Quartet in G",
    creator: "Chamber Music Society",
    price: "0.073 ETH",
    image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "The Four Seasons",
    creator: "Orchestra DAO",
    price: "0.105 ETH",
    image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Opera Highlights",
    creator: "Aria Collection",
    price: "0.092 ETH",
    image: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=600&q=80"
  }
];

export function MusicCard({ nft, size = "medium" }: { nft: MusicNFT, size?: 'small' | 'medium' | 'large' }) {
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

export function MusicCategorySection({ 
  title, 
  items, 
  viewAllLink = "#", 
  cardSize = "medium" 
}: { 
  title: string, 
  items: MusicNFT[], 
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
          <MusicCard key={item.id} nft={item} size={cardSize} />
        ))}
      </div>
    </div>
  );
}

export function MusicBanner() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden relative mb-12">
      <img 
        src="https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&w=1600&q=80" 
        alt="FLUF World" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="absolute top-4 left-4 bg-purple-500/20 p-2 rounded-md backdrop-blur-sm">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
              <path d="M8.5 16.5V7.5C8.5 6.88 9.17 6.5 9.66 6.88L16.73 11.38C17.14 11.69 17.14 12.31 16.73 12.62L9.66 17.12C9.17 17.5 8.5 17.12 8.5 16.5Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">FLUF World</h1>
        <p className="text-sm md:text-base text-gray-300 mt-2">by FLUF World <span className="inline-block bg-blue-500/30 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-2">Verified</span></p>
        <p className="text-sm text-gray-400 mt-1">Floor price: 0.1099709 ETH</p>
        <button className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-4 py-2 w-max transition">
          View collection
        </button>
      </div>
    </div>
  );
}

export function MusicCategoryShowcase() {
  return (
    <div className="space-y-10">
      <MusicBanner />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Music spotlight</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {musicSpotlightItems.map(item => (
            <MusicCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Electronic Music</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {electronicMusicItems.map(item => (
            <MusicCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Hip Hop</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {hipHopMusicItems.map(item => (
            <MusicCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Indie Music</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {indieMusicItems.map(item => (
            <MusicCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Classical Music</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {classicalMusicItems.map(item => (
            <MusicCard key={item.id} nft={item} />
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
            <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-indigo-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-indigo-600">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 16V12M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What are music NFTs?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about music on the blockchain</p>
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
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">How to buy an NFT</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Step by step guide to purchasing NFTs</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-pink-100 dark:bg-pink-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-pink-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-600">
                  <path d="M14.5 7L19.5 12L14.5 17M9.5 7L4.5 12L9.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is minting?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about the minting process</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-green-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">Music royalties on blockchain</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">How music NFTs empower artists</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
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