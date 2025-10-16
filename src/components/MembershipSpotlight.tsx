import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type MembershipNFT = {
  id: number;
  title: string;
  artist?: string;
  price: string;
  floorPrice: string;
  image: string;
  volume: string;
  days: number;
  verified: boolean;
};

const membershipNFTs: MembershipNFT[] = [
  {
    id: 1,
    title: "Vapverse Sports Pass",
    artist: "Official VPS",
    price: "< 0.01 ETH",
    floorPrice: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1587614313085-5da51cebd8ac?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7,
    verified: true
  },
  {
    id: 2,
    title: "ETHLIFE",
    artist: "Official",
    price: "0.1 ETH",
    floorPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7,
    verified: true
  },
  {
    id: 3,
    title: "Crypto Hub Society",
    artist: "Hub",
    price: "0.01 ETH",
    floorPrice: "0.01 ETH",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7,
    verified: true
  },
  {
    id: 4,
    title: "Fluffy Pandas",
    artist: "Panda Club",
    price: "0.01 ETH",
    floorPrice: "0.03 ETH",
    image: "https://images.unsplash.com/photo-1621155346337-1d19b5b01a73?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7,
    verified: true
  },
  {
    id: 5,
    title: "Artimis Meta Pass",
    artist: "Meta",
    price: "0.14 ETH",
    floorPrice: "0.16 ETH",
    image: "https://images.unsplash.com/photo-1635622786376-68331a966e6d?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7,
    verified: false
  }
];

export function MembershipSpotlight() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Memberships spotlight</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {membershipNFTs.map((nft) => (
          <Card key={nft.id} className="group overflow-hidden border-0 bg-card hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={nft.image} 
                  alt={nft.title}
                  className="w-full aspect-square object-cover object-center"
                />
                {nft.verified && (
                  <span className="absolute top-2 right-2 bg-blue-500 text-white p-1 rounded-full w-5 h-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                      <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground">{nft.title}</h3>
                {nft.artist && <p className="text-xs text-muted-foreground mb-2">{nft.artist}</p>}
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{nft.volume}</span>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm dark:text-white">{nft.price}</span>
                    <span className="text-xs text-muted-foreground">{nft.floorPrice}</span>
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

// Trending in Memberships section as seen in the screenshot
export function TrendingInMemberships() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Memberships</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View category
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {membershipNFTs.slice(0, 5).map((nft) => (
          <Card key={nft.id} className="group overflow-hidden border-0 bg-card hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={nft.image} 
                  alt={nft.title}
                  className="w-full aspect-square object-cover object-center"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">{nft.title}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{nft.floorPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">24h volume</p>
                    <p className="text-sm dark:text-gray-300">{nft.price}</p>
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

// Based on the screenshot, let's also add a Gaming Memberships trending section
export function TrendingInGamingMemberships() {
  const gamingMemberships = [
    {
      id: 1,
      title: "Rarity Bears",
      price: "15.10 WETH",
      floorPrice: "0.06 ETH",
      image: "https://images.unsplash.com/photo-1591432227488-ba3507fbf641?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Neo Tokyo Citizens",
      price: "0.71 WETH",
      floorPrice: "3.06 ETH",
      image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "JRNY Club",
      price: "0.38 ETH",
      floorPrice: "0.01 ETH",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Neo Tokyo Outer Citizens",
      price: "0.03 ETH",
      floorPrice: "0.01 ETH",
      image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Neo Tokyo Samurai Wells",
      price: "0.08 ETH",
      floorPrice: "0.06 ETH",
      image: "https://images.unsplash.com/photo-1599420186946-7b6fb4e297f0?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Gaming Memberships</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {gamingMemberships.map((item) => (
          <Card key={item.id} className="group overflow-hidden border-0 bg-card hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full aspect-square object-cover object-center"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floorPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">24h volume</p>
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

// Art Memberships section as shown in the screenshot
export function TrendingInArtMemberships() {
  const artMemberships = [
    {
      id: 1,
      title: "Tz World Founders",
      price: "0.54 ETH",
      floorPrice: "2 ETH",
      image: "https://images.unsplash.com/photo-1579547621706-1a9c79d5c9f1?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 2,
      title: "Funball",
      price: "1.29 ETH",
      floorPrice: "2 ETH",
      image: "https://images.unsplash.com/photo-1519087623074-920ed3b3d4f2?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 3,
      title: "official Genesis Pass",
      price: "0.44 ETH",
      floorPrice: "2 ETH",
      image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 4,
      title: "Living on the Internet",
      price: "< 0.01 ETH",
      floorPrice: "2 ETH",
      image: "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: 5,
      title: "Ousters",
      price: "0.06 ETH",
      floorPrice: "0.05 ETH",
      image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=600&q=80"
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Art Memberships</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {artMemberships.map((item) => (
          <Card key={item.id} className="group overflow-hidden border-0 bg-card hover:shadow-md transition-all duration-300">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full aspect-square object-cover object-center"
                />
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-sm text-foreground truncate">{item.title}</h3>
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floorPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">24h volume</p>
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