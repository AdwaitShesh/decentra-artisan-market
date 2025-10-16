import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type PFPNFT = {
  id: number;
  title: string;
  creator?: string;
  price: string;
  floorPrice?: string;
  volume?: string;
  image: string;
  verified?: boolean;
};

// PFP spotlight data
const pfpSpotlightItems: PFPNFT[] = [
  {
    id: 1,
    title: "Official WoWverse",
    creator: "WoWverse",
    price: "0.69 ETH",
    floorPrice: "0.9 ETH",
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Shrapnel Operators Guild",
    creator: "Shrapnel",
    price: "0.057 ETH",
    floorPrice: "0.058 ETH",
    image: "https://images.unsplash.com/photo-1635072947371-a215ffb365e7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Superplastic's Crypto Janky",
    creator: "Superplastic",
    price: "0.0029 ETH",
    floorPrice: "0.0029 ETH",
    image: "https://images.unsplash.com/photo-1637611331620-51149c7ceb94?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Sleepy Beats",
    creator: "Sleepy Beats",
    price: "0.079 ETH",
    floorPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "HarmonyCrew",
    creator: "Harmony",
    price: "0.24 ETH",
    floorPrice: "0.25 ETH",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=600&q=80"
  }
];

// Pixel Art PFPs data
const pixelArtPFPsItems: PFPNFT[] = [
  {
    id: 1,
    title: "CryptoPunks v1",
    creator: "Larva Labs",
    price: "74.5 ETH",
    floorPrice: "75.0 ETH",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "8-Degenz",
    creator: "8-Degenz",
    price: "0.095 ETH",
    floorPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1633177317976-3f9bc45e1d1d?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Cryptobots",
    creator: "Cryptobots",
    price: "0.075 ETH",
    floorPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1633269540827-728aabbb7646?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "BASED MINDS",
    creator: "BASED MINDS",
    price: "0.028 ETH",
    floorPrice: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1633333539566-28dec2ebed13?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Checkered City Art",
    creator: "ChxArt",
    price: "0.058 ETH",
    floorPrice: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1636622433525-127afdf3662d?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Generative PFPs data
const generativePFPsItems: PFPNFT[] = [
  {
    id: 1,
    title: "Pepes World Club",
    creator: "Pepe's World",
    price: "0.027 ETH",
    floorPrice: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1634979149798-e9562a6c7559?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "CryptoBlot",
    creator: "CryptoBlot Labs",
    price: "0.059 ETH",
    floorPrice: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Apeiron",
    creator: "Apeiron",
    price: "0.025 ETH",
    floorPrice: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1642432136569-3a368e883b59?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Aura Alice",
    creator: "Alice Labs",
    price: "3.03 ETH",
    floorPrice: "3.05 ETH",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Retro Byte NFT Club",
    creator: "RetroBytes",
    price: "0.025 ETH",
    floorPrice: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1637858868799-7f26a0640eb6?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// 3D PFPs data
const threeDPFPsItems: PFPNFT[] = [
  {
    id: 1,
    title: "APES GONE CRAZY",
    creator: "ApeMaster",
    price: "0.35 ETH",
    floorPrice: "0.36 ETH",
    image: "https://images.unsplash.com/photo-1608085575984-d2d8564b566e?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Bosco Punks",
    creator: "Bosco World",
    price: "0.05 ETH",
    floorPrice: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Mankind",
    creator: "Mankind",
    price: "0.005 ETH",
    floorPrice: "0.01 ETH",
    image: "https://images.unsplash.com/photo-1637861665558-15c7e8701f93?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Planet XOLO Heroes",
    creator: "Planet XOLO",
    price: "0.29 ETH",
    floorPrice: "0.3 ETH",
    image: "https://images.unsplash.com/photo-1617611088000-4019c728f520?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Eternalz X",
    creator: "Eternalz",
    price: "0.075 ETH",
    floorPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1617791160330-bf933baa2275?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// PFP Spotlight component
export function PFPSpotlight() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">PFPs spotlight</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pfpSpotlightItems.map((item) => (
          <Card key={item.id} className="group overflow-hidden border-0 bg-card hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full aspect-square object-cover object-center"
                />
                {item.verified && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
                {item.creator && <p className="text-xs text-muted-foreground mb-2">{item.creator}</p>}
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floorPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Price</p>
                    <p className="text-sm dark:text-gray-300">{item.price}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Trending in Pixel Art PFPs component
export function TrendingInPixelArtPFPs() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Pixel Art PFPs</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pixelArtPFPsItems.map((item) => renderNFTCard(item))}
      </div>
    </div>
  );
}

// Trending in Generative PFPs component
export function TrendingInGenerativePFPs() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Generative PFPs</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {generativePFPsItems.map((item) => renderNFTCard(item))}
      </div>
    </div>
  );
}

// Trending in 3D PFPs component
export function TrendingIn3DPFPs() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in 3D PFPs</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {threeDPFPsItems.map((item) => renderNFTCard(item))}
      </div>
    </div>
  );
}

// Helper function to render NFT cards
function renderNFTCard(item: PFPNFT) {
  return (
    <Card key={item.id} className="group overflow-hidden border-0 bg-card hover:shadow-md transition-all duration-300">
      <CardContent className="p-0">
        <div className="relative">
          <img 
            src={item.image} 
            alt={item.title}
            className="w-full aspect-square object-cover object-center"
          />
          {item.verified && (
            <span className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
          {item.creator && <p className="text-xs text-muted-foreground mb-2">{item.creator}</p>}
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-muted-foreground">Floor</p>
              <p className="font-medium text-sm dark:text-white">{item.floorPrice}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Price</p>
              <p className="text-sm dark:text-gray-300">{item.price}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 