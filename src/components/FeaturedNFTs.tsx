import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart } from "lucide-react";

// Mock data for featured NFTs
const featuredNFTs = [
  {
    id: 1,
    title: "Ethereal Whispers",
    artist: "Priya Sharma",
    price: "0.85 ETH",
    image: "https://images.unsplash.com/photo-1633218388467-539babe5f280?auto=format&fit=crop&w=720&q=80",
    category: "Digital Art"
  },
  {
    id: 2,
    title: "Heritage Echo",
    artist: "Rahul Mehta",
    price: "1.2 ETH",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=720&q=80",
    category: "Traditional"
  },
  {
    id: 3,
    title: "Quantum Dreams",
    artist: "Anika Patel",
    price: "0.65 ETH",
    image: "https://images.unsplash.com/photo-1618172193622-ae2d025f2c95?auto=format&fit=crop&w=720&q=80",
    category: "Animation"
  },
  {
    id: 4,
    title: "Cosmic Resonance",
    artist: "Vikram Singh",
    price: "2.1 ETH",
    image: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?auto=format&fit=crop&w=720&q=80",
    category: "Photography"
  }
];

export function FeaturedNFTs() {
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-black">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold font-poppins dark:text-white">Featured Artworks</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 max-w-2xl">
              Discover unique digital creations from emerging artists and established creators
            </p>
          </div>
          <Button variant="ghost" className="mt-4 md:mt-0 dark:text-gray-200 dark:hover:text-white dark:hover:bg-gray-800">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredNFTs.map((nft) => (
            <Card key={nft.id} className="group overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 dark:bg-gray-900 dark:shadow-gray-900/30">
              <CardContent className="p-0">
                <div className="relative">
                  <img 
                    src={nft.image} 
                    alt={nft.title}
                    className="w-full aspect-square object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <Badge className="absolute top-3 left-3 bg-white/80 dark:bg-black/80 backdrop-blur-sm text-black dark:text-white hover:bg-white/90 dark:hover:bg-black/90">
                    {nft.category}
                  </Badge>
                  <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center hover:bg-white/90 dark:hover:bg-black/90 transition">
                    <Heart className="h-4 w-4 text-gray-700 dark:text-white" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg dark:text-white">{nft.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">by {nft.artist}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Current Price</p>
                      <p className="font-semibold text-bharat-purple dark:text-bharat-teal">{nft.price}</p>
                    </div>
                    <Button variant="outline" size="sm" className="rounded-full dark:text-white dark:border-gray-700 dark:hover:bg-gray-800">
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
