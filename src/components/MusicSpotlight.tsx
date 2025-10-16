import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRight } from "lucide-react";

type MusicNFT = {
  id: number;
  title: string;
  artist: string;
  price: string;
  ethPrice: string;
  image: string;
  volume: string;
  days: number;
};

const musicNFTs: MusicNFT[] = [
  {
    id: 1,
    title: "LATASHA",
    artist: "Fluid",
    price: "0.29 ETH",
    ethPrice: "0 ETH",
    image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 2,
    title: "Blocktones",
    artist: "Fluid",
    price: "0 ETH",
    ethPrice: "0 ETH",
    image: "https://images.unsplash.com/photo-1558584673-c834fb1cc3ca?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 3,
    title: "Love Letters by Josh Savage",
    artist: "Fluid",
    price: "0.02 ETH",
    ethPrice: "0 ETH",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 4,
    title: "RVLTD Genesis",
    artist: "Fluid",
    price: "0.05 ETH",
    ethPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1557682250-62937d0a228f?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  },
  {
    id: 5,
    title: "The Pixie Girls NFT",
    artist: "Fluid",
    price: "0.02 ETH",
    ethPrice: "0 ETH", 
    image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=600&q=80",
    volume: "7 day volume",
    days: 7
  }
];

export function MusicSpotlight() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Music spotlight</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {musicNFTs.map((nft) => (
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