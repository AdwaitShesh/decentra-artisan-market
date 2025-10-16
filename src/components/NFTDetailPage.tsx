import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Share2, Flag, Eye, ArrowLeftRight, Shield, Clock } from "lucide-react";

// This is a template component for an NFT detail page
// It would be used like: <NFTDetailPage nft={nftData} />

export function NFTDetailPage({ nft = sampleNFT }) {
  return (
    <div className="min-h-screen bg-white font-inter">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - NFT Image */}
            <div>
              <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md bg-white">
                <img 
                  src={nft.image} 
                  alt={nft.title}
                  className="w-full aspect-square object-cover"
                />
              </div>
              
              <div className="mt-6">
                <Tabs defaultValue="details">
                  <TabsList className="w-full">
                    <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    <TabsTrigger value="history" className="flex-1">History</TabsTrigger>
                    <TabsTrigger value="offers" className="flex-1">Offers</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="details" className="p-4 border border-gray-100 rounded-lg mt-4">
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Contract Address</span>
                        <span className="text-sm font-mono">{nft.contractAddress.substring(0, 6)}...{nft.contractAddress.substring(nft.contractAddress.length - 4)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Token ID</span>
                        <span>{nft.tokenId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Token Standard</span>
                        <span>{nft.tokenStandard}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Blockchain</span>
                        <span>{nft.blockchain}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Creation Date</span>
                        <span>{nft.creationDate}</span>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="p-4 border border-gray-100 rounded-lg mt-4">
                    <div className="space-y-4">
                      {nft.history.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                            <ArrowLeftRight className="h-4 w-4" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <span className="font-medium">{item.type}</span>
                              <span className="text-gray-500">{item.date}</span>
                            </div>
                            <div className="mt-1 text-sm text-gray-600">
                              {item.description}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="offers" className="p-4 border border-gray-100 rounded-lg mt-4">
                    <div className="text-center py-8 text-gray-500">
                      No offers yet
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            {/* Right column - NFT Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="border-bharat-teal text-bharat-teal">
                  {nft.category}
                </Badge>
                <div className="flex items-center gap-2 text-gray-500">
                  <Eye className="h-4 w-4" />
                  <span>{nft.views} views</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500">
                  <Heart className="h-4 w-4" />
                  <span>{nft.favorites} favorites</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{nft.title}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={nft.creator.avatar} alt={nft.creator.name} />
                    <AvatarFallback>{nft.creator.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-sm text-gray-500">Creator</span>
                    <p className="font-medium text-sm">{nft.creator.name}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={nft.owner.avatar} alt={nft.owner.name} />
                    <AvatarFallback>{nft.owner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-sm text-gray-500">Owner</span>
                    <p className="font-medium text-sm">{nft.owner.name}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Description</h2>
                <p className="text-gray-600">
                  {nft.description}
                </p>
              </div>
              
              <div className="p-6 border border-gray-200 rounded-xl bg-gray-50 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <span className="text-sm text-gray-500">Current Price</span>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">{nft.price.amount}</span>
                      <span className="text-sm text-gray-500">(${nft.price.usd})</span>
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {nft.auction ? `Ends in ${nft.auction.timeLeft}` : "Fixed Price"}
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button className="bg-gradient-to-r from-bharat-teal to-bharat-purple hover:opacity-90 transition flex-1 h-12">
                    {nft.auction ? "Place Bid" : "Buy Now"}
                  </Button>
                  <Button variant="outline" className="h-12">
                    Make Offer
                  </Button>
                </div>
                
                <div className="flex items-center justify-center gap-4 mt-4 text-gray-500">
                  <button className="flex items-center gap-1 hover:text-gray-700 transition">
                    <Heart className="h-4 w-4" />
                    <span>Favorite</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700 transition">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-700 transition">
                    <Flag className="h-4 w-4" />
                    <span>Report</span>
                  </button>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-2">Artist's Story</h2>
                <div className="p-6 border border-gray-200 rounded-xl">
                  <p className="text-gray-600">
                    {nft.artistStory}
                  </p>
                </div>
              </div>
              
              <div>
                <h2 className="text-lg font-semibold mb-2">NFT Properties</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {nft.properties.map((prop, index) => (
                    <div key={index} className="p-3 border border-gray-200 rounded-lg bg-gray-50 text-center">
                      <p className="text-xs text-gray-500 mb-1">{prop.trait_type}</p>
                      <p className="font-medium">{prop.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Sample data for demonstration
const sampleNFT = {
  id: 1,
  title: "Ethereal Whispers",
  description: "A mesmerizing digital artwork inspired by the ethereal landscapes of ancient Indian mythology. This piece captures the delicate balance between reality and the divine, showcasing the artist's unique perspective on traditional stories.",
  image: "https://images.unsplash.com/photo-1633218388467-539babe5f280?auto=format&fit=crop&w=1080&q=80",
  category: "Digital Art",
  views: 3248,
  favorites: 182,
  creator: {
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  owner: {
    name: "Vikram Mehta",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  price: {
    amount: "0.85 ETH",
    usd: "2,856.43"
  },
  auction: null,
  contractAddress: "0x495f947276749Ce646f68AC8c248420045cb7b5e",
  tokenId: "84457899642897442175467856341535",
  tokenStandard: "ERC-721",
  blockchain: "Ethereum",
  creationDate: "Apr 15, 2023",
  artistStory: "I created 'Ethereal Whispers' during a transformative journey through rural India. The vibrant colors and spiritual motifs were inspired by the ancient temple art I encountered in Karnataka. This piece represents my interpretation of the timeless stories that have been passed down through generations, now reimagined in a digital medium that bridges traditional aesthetics with modern technology.",
  properties: [
    {
      trait_type: "Style",
      value: "Surrealism"
    },
    {
      trait_type: "Medium",
      value: "Digital Painting"
    },
    {
      trait_type: "Color Palette",
      value: "Vibrant"
    },
    {
      trait_type: "Mood",
      value: "Ethereal"
    },
    {
      trait_type: "Inspiration",
      value: "Mythology"
    },
    {
      trait_type: "Region",
      value: "South Asia"
    }
  ],
  history: [
    {
      type: "Minted",
      date: "Apr 15, 2023",
      description: "Minted by Priya Sharma"
    },
    {
      type: "Listed",
      date: "Apr 16, 2023",
      description: "Listed for 0.85 ETH by Priya Sharma"
    },
    {
      type: "Transfer",
      date: "May 03, 2023",
      description: "Transferred to Vikram Mehta for 0.85 ETH"
    }
  ]
};
