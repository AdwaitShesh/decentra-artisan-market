import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, ArrowRight } from "lucide-react";

type PhotoNFT = {
  id: number;
  title: string;
  artist: string;
  price: string;
  ethPrice: string;
  image: string;
  volume: string;
  days: number;
};

const photoNFTs: PhotoNFT[] = [
  {
    id: 1,
    title: "Jake Inez - Limited Editions",
    artist: "Floor",
    price: "—",
    ethPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 2,
    title: "Nick Brg Editions",
    artist: "Floor",
    price: "—",
    ethPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1583083527882-4bee9aba2eea?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 3,
    title: "Collecting Hands by Arketa",
    artist: "Floor",
    price: "0.1 ETH",
    ethPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 4,
    title: "Whispers In the Snow | 250 Editions",
    artist: "Floor",
    price: "0.49 ETH",
    ethPrice: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1547499681-28dece7dba00?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 5,
    title: "Rumors of Arctic Belonging",
    artist: "Floor",
    price: "0.05 ETH",
    ethPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1579138091374-f0b4a528f701?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  }
];

export function PhotoSpotlight() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Photography spotlight</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {photoNFTs.map((nft) => (
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
                <h3 className="font-semibold text-sm text-foreground">{nft.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{nft.artist}</p>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground">{nft.volume}</span>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-sm dark:text-white">{nft.price}</span>
                    <span className="text-xs text-muted-foreground">{nft.ethPrice}</span>
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

// Additional component for trending in photography section as seen in the screenshot
export function TrendingInPhotography() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Photography</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View category
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {photoNFTs.slice(0, 5).map((nft) => (
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
                    <p className="font-medium text-sm dark:text-white">{nft.ethPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">24h volume</p>
                    <p className="text-sm dark:text-gray-300">{nft.price === "—" ? "0.02 ETH" : nft.price}</p>
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