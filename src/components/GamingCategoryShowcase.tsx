import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, EyeIcon, ArrowRight, ChevronDown, ExternalLink, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type GameNFT = {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
  verified?: boolean;
};

// Gaming Spotlight data
const gamingSpotlightItems: GameNFT[] = [
  {
    id: 1,
    title: "CAPTAINZ",
    creator: "Memeland",
    price: "4.53 ETH",
    image: "https://images.unsplash.com/photo-1633442430921-d0db0e9b3b5a?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Legends Never Die X",
    creator: "RTFKT",
    price: "2.89 ETH",
    image: "https://images.unsplash.com/photo-1611532736637-d7b6c04f0f91?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Gutter Clone Pass",
    creator: "Gutter Cat Gang",
    price: "1.72 ETH",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Blitmap",
    creator: "Blitmap",
    price: "0.68 ETH",
    image: "https://images.unsplash.com/photo-1598550473359-be7e018f2899?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Parallel Alpha",
    creator: "Parallel",
    price: "0.89 ETH",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=600&q=80"
  }
];

// Virtual Worlds data
const virtualWorldsItems: GameNFT[] = [
  {
    id: 1,
    title: "LLVIZ WORLDS",
    creator: "LLVIZ Studio",
    price: "0.49 ETH",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Arcade - Land Lab 3",
    creator: "The Sandbox",
    price: "0.44 ETH",
    image: "https://images.unsplash.com/photo-1632857832992-f0108f2c4a09?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Otherside - The Realm of Abandon",
    creator: "Otherside",
    price: "0.47 ETH",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "NetVRk",
    creator: "NetVRk",
    price: "0.29 ETH",
    image: "https://images.unsplash.com/photo-1627163439134-7a8c47e08208?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Wilder World",
    creator: "Wilder World",
    price: "0.33 ETH",
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// MMORPG data
const mmorpgItems: GameNFT[] = [
  {
    id: 1,
    title: "The Sewer",
    creator: "UncleGames",
    price: "0.69 ETH",
    image: "https://images.unsplash.com/photo-1642132652867-6826de47c5df?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Embersword #15",
    creator: "Embersword",
    price: "0.62 ETH",
    image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Pixel Nation",
    creator: "Pixel Wizards",
    price: "0.19 ETH",
    image: "https://images.unsplash.com/photo-1614885733893-ca4c24ad2f4d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Crypto & Conquest: World 3",
    creator: "C&C",
    price: "0.87 ETH",
    image: "https://images.unsplash.com/photo-1622979135798-a7a555d2c424?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Genesis Creatures",
    creator: "Illuvium",
    price: "1.24 ETH",
    image: "https://images.unsplash.com/photo-1616031677357-54ab0f21a147?auto=format&fit=crop&w=600&q=80"
  }
];

// Adventure Games data
const adventureGamesItems: GameNFT[] = [
  {
    id: 1,
    title: "Blood Realm",
    creator: "Dark Labs",
    price: "1.65 ETH",
    image: "https://images.unsplash.com/photo-1605806616949-59450419c3c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Mystics - Journey Home",
    creator: "Nifty Legends",
    price: "1.25 ETH",
    image: "https://images.unsplash.com/photo-1609096458733-3c7891aa2ed1?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Phantom the Wanderer",
    creator: "Phantom Studios",
    price: "0.76 ETH",
    image: "https://images.unsplash.com/photo-1601987177651-8edfe6c20009?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Highland Arcana",
    creator: "Highland Games",
    price: "1.09 ETH",
    image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Astro-Adventure NFT Pass",
    creator: "Cosmic Guild",
    price: "0.29 ETH",
    image: "https://images.unsplash.com/photo-1573580945434-66a9ba24215c?auto=format&fit=crop&w=600&q=80"
  }
];

// Strategy Games data
const strategyGamesItems: GameNFT[] = [
  {
    id: 1,
    title: "Fantasy Planet V",
    creator: "GodGames",
    price: "0.35 ETH", 
    image: "https://images.unsplash.com/photo-1624887007752-33e067773991?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Fraction Chiefs",
    creator: "PixelWarriors",
    price: "0.46 ETH",
    image: "https://images.unsplash.com/photo-1623572399428-80893e40ada7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "MechWar - The Beta Stratagem",
    creator: "Ironforge",
    price: "0.52 ETH",
    image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Overlord",
    creator: "Overlord Games",
    price: "0.29 ETH",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Influence Zero",
    creator: "ZeroStudios",
    price: "0.18 ETH",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80"
  }
];

// 3D Games data
const threeDGamesItems: GameNFT[] = [
  {
    id: 1,
    title: "Cryptocube #5",
    creator: "CubeWorld",
    price: "0.25 ETH",
    image: "https://images.unsplash.com/photo-1603481546238-487240415921?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Neonis",
    creator: "Neo Games",
    price: "0.58 ETH",
    image: "https://images.unsplash.com/photo-1602501457808-f31deadc956a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "1313 Elevator Island",
    creator: "RetroDigital",
    price: "0.35 ETH",
    image: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "KUBIK GO",
    creator: "KUBIK Studios",
    price: "0.07 ETH",
    image: "https://images.unsplash.com/photo-163579485688-3be29052a9ed?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Atlas of Metis",
    creator: "Metis",
    price: "0.28 ETH",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Fighting Games data
const fightingGamesItems: GameNFT[] = [
  {
    id: 1,
    title: "RITM. Shinobi",
    creator: "RITM Studios",
    price: "0.24 ETH",
    image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Star Warrior Restoration X",
    creator: "DigiWarriors",
    price: "0.69 ETH",
    image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Rumble Beast",
    creator: "Beast Studios",
    price: "0.41 ETH",
    image: "https://images.unsplash.com/photo-1624088643819-67327f904a1b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "CLASH FC",
    creator: "CLASH Labs",
    price: "0.65 ETH",
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "RISE OF THE RED SUN: Arc II",
    creator: "Red Sun Games",
    price: "0.48 ETH",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

export function GameNFTCard({ nft, size = "medium" }: { nft: GameNFT, size?: 'small' | 'medium' | 'large' }) {
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

export function GameCategorySection({ 
  title, 
  items, 
  viewAllLink = "#", 
  cardSize = "medium" 
}: { 
  title: string, 
  items: GameNFT[], 
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
          <GameNFTCard key={item.id} nft={item} size={cardSize} />
        ))}
      </div>
    </div>
  );
}

export function GamingBanner() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden relative mb-12">
      <img 
        src="https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1600&q=80" 
        alt="Parallel Avatars" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="absolute top-4 left-4 bg-green-500/20 p-2 rounded-md backdrop-blur-sm">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-400">
              <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 9L15 11M15 11L13 13M15 11H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Parallel Avatars</h1>
        <p className="text-sm md:text-base text-gray-300 mt-2">by Parallel Studios <span className="inline-block bg-blue-500/30 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-2">Verified</span></p>
        <p className="text-sm text-gray-400 mt-1">Floor price: 0.75 ETH</p>
        <button className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-4 py-2 w-max transition">
          View collection
        </button>
      </div>
    </div>
  );
}

export function GamingCategoryShowcase() {
  return (
    <div className="space-y-10">
      <GamingBanner />
      
      <GameCategorySection title="Gaming Spotlight" items={gamingSpotlightItems} />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Virtual Worlds</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {virtualWorldsItems.map(item => (
            <GameNFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in MMORPG</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {mmorpgItems.map(item => (
            <GameNFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Adventure Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {adventureGamesItems.map(item => (
            <GameNFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Strategy Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {strategyGamesItems.map(item => (
            <GameNFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in 3D Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {threeDGamesItems.map(item => (
            <GameNFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Fighting</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {fightingGamesItems.map(item => (
            <GameNFTCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
    </div>
  );
} 