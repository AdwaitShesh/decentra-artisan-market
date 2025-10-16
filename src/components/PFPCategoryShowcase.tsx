import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type PFPNFT = {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
  verified?: boolean;
};

// PFP Spotlight data
const pfpSpotlightItems: PFPNFT[] = [
  {
    id: 1,
    title: "Chromie Squiggle",
    creator: "Art Blocks",
    price: "2.13 ETH",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Milady Maker",
    creator: "Remilia",
    price: "1.56 ETH",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "CryptoPunks",
    creator: "Larva Labs",
    price: "47.5 ETH",
    image: "https://images.unsplash.com/photo-1590935217156-5b1687e8355c?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Pudgy Penguins",
    creator: "Pudgy Penguins",
    price: "3.7 ETH",
    image: "https://images.unsplash.com/photo-1611488006001-eb993d4d2ec4?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Mutant Ape Yacht",
    creator: "BAYC",
    price: "8.2 ETH",
    image: "https://images.unsplash.com/photo-1626050954744-92bf034ce476?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Digital Art PFPs data
const digitalArtPFPs: PFPNFT[] = [
  {
    id: 1,
    title: "The NeoLines",
    creator: "NeoBox",
    price: "0.42 ETH",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Manic Moon",
    creator: "dFrac",
    price: "0.89 ETH",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Ape Reinvented",
    creator: "Zap Labs",
    price: "1.37 ETH",
    image: "https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Zygote #492",
    creator: "Zygote",
    price: "0.56 ETH",
    image: "https://images.unsplash.com/photo-1611605698323-b1e99cfd37ea?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Moonbirds Oddities",
    creator: "PROOF",
    price: "0.98 ETH",
    image: "https://images.unsplash.com/photo-1634983775648-9791ead437eb?auto=format&fit=crop&w=600&q=80"
  }
];

// Pixel Art PFPs data
const pixelArtPFPs: PFPNFT[] = [
  {
    id: 1,
    title: "CryptoKitties #4916",
    creator: "Dapper Labs",
    price: "0.28 ETH",
    image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "RE:GENS",
    creator: "RE:GENS",
    price: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1635360248687-e3fb94bf15af?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Animetas",
    creator: "Animetas Labs",
    price: "0.17 ETH",
    image: "https://images.unsplash.com/photo-1511075675422-c8e008f749d7?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Cryptoadz",
    creator: "GREMPLIN",
    price: "2.38 ETH",
    image: "https://images.unsplash.com/photo-1634983775855-1644085e47c5?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "BASED MILK",
    creator: "Based Labs",
    price: "0.34 ETH",
    image: "https://images.unsplash.com/photo-1624628639856-100bf817fd35?auto=format&fit=crop&w=600&q=80"
  }
];

// 3D PFPs data
const threeDPFPs: PFPNFT[] = [
  {
    id: 1,
    title: "BEANZ Official",
    creator: "Azuki",
    price: "0.78 ETH",
    image: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Meebits",
    creator: "Larva Labs",
    price: "2.89 ETH",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Yuga Pets",
    creator: "YugaLabs",
    price: "4.2 ETH",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Clonex #8651",
    creator: "RTFKT",
    price: "9.78 ETH",
    image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Kanpai Pandas",
    creator: "KANPAI",
    price: "0.43 ETH",
    image: "https://images.unsplash.com/photo-1633250299808-a25afa976189?auto=format&fit=crop&w=600&q=80"
  }
];

// Gaming PFPs data
const gamingPFPs: PFPNFT[] = [
  {
    id: 1,
    title: "77-BIT",
    creator: "77 Labs",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1623572399428-80893e40ada7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Pixel Warriors",
    creator: "PixLab",
    price: "0.12 ETH",
    image: "https://images.unsplash.com/photo-1516567727245-ad8c68f3ec93?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Decentraland",
    creator: "Decentraland",
    price: "0.18 ETH",
    image: "https://images.unsplash.com/photo-1605899435973-ca2d1a8431cf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "JRNY",
    creator: "JRNY Labs",
    price: "0.25 ETH",
    image: "https://images.unsplash.com/photo-1595769816263-9b910be24d5f?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "RKFKT Clone X",
    creator: "RTFKT",
    price: "6.8 ETH",
    image: "https://images.unsplash.com/photo-1616031677357-54ab0f21a147?auto=format&fit=crop&w=600&q=80"
  }
];

// Generative PFPs data
const generativePFPs: PFPNFT[] = [
  {
    id: 1,
    title: "Doodles",
    creator: "Doodle Labs",
    price: "3.9 ETH",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Autoglyphs",
    creator: "Larva Labs",
    price: "96.3 ETH",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Fidenza",
    creator: "Tyler Hobbs",
    price: "82.4 ETH",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "APIOM",
    creator: "APIOM",
    price: "2.98 ETH",
    image: "https://images.unsplash.com/photo-1618172193622-ae2d025f4032?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Alien Frens",
    creator: "Alien Frens",
    price: "1.48 ETH",
    image: "https://images.unsplash.com/photo-1633250299808-a25afa976189?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

export function PFPCard({ nft, size = "medium" }: { nft: PFPNFT, size?: 'small' | 'medium' | 'large' }) {
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

export function PFPCategorySection({ 
  title, 
  items, 
  viewAllLink = "#", 
  cardSize = "medium" 
}: { 
  title: string, 
  items: PFPNFT[], 
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
          <PFPCard key={item.id} nft={item} size={cardSize} />
        ))}
      </div>
    </div>
  );
}

export function PFPBanner() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden relative mb-12">
      <img 
        src="https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=1600&q=80" 
        alt="The Flower Girls" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="absolute top-4 left-4 bg-blue-500/20 p-2 rounded-md backdrop-blur-sm">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-400">
              <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M15.5 9.75C16.3284 9.75 17 9.07843 17 8.25C17 7.42157 16.3284 6.75 15.5 6.75C14.6716 6.75 14 7.42157 14 8.25C14 9.07843 14.6716 9.75 15.5 9.75Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.5 9.75C9.32843 9.75 10 9.07843 10 8.25C10 7.42157 9.32843 6.75 8.5 6.75C7.67157 6.75 7 7.42157 7 8.25C7 9.07843 7.67157 9.75 8.5 9.75Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8.4 13.3H15.6C16.1 13.3 16.5 13.7 16.5 14.2C16.5 16.69 14.49 18.7 12 18.7C9.51 18.7 7.5 16.69 7.5 14.2C7.5 13.7 7.9 13.3 8.4 13.3Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">The Flower Girls</h1>
        <p className="text-sm md:text-base text-gray-300 mt-2">by Varvara Alay <span className="inline-block bg-blue-500/30 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-2">Verified</span></p>
        <p className="text-sm text-gray-400 mt-1">Floor price: 0.59 ETH</p>
        <button className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-4 py-2 w-max transition">
          View collection
        </button>
      </div>
    </div>
  );
}

export function PFPCategoryShowcase() {
  return (
    <div className="space-y-10">
      <PFPBanner />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">PFPs spotlight</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pfpSpotlightItems.map(item => (
            <PFPCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Digital Art PFPs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {digitalArtPFPs.map(item => (
            <PFPCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Pixel Art PFPs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {pixelArtPFPs.map(item => (
            <PFPCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Gaming PFPs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {gamingPFPs.map(item => (
            <PFPCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Generative PFPs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {generativePFPs.map(item => (
            <PFPCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in 3D PFPs</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {threeDPFPs.map(item => (
            <PFPCard key={item.id} nft={item} />
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
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is a PFP NFT?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about profile picture collections</p>
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
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">How to use a PFP</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Get the most from your profile NFTs</p>
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
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">How to buy a PFP NFT</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Step by step guide to purchasing PFPs</p>
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
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">PFP communities</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">How PFPs create digital communities</p>
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
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">Avoiding PFP scams</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Security tips for PFP collectors</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 