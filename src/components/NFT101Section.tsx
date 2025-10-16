import { Button } from "@/components/ui/button";
import { Book, Shield, Wallet, Layers } from "lucide-react";

const educationItems = [
  {
    id: 1,
    title: "What is an NFT?",
    description: "Learn the basics of non-fungible tokens and how they work on the blockchain.",
    icon: <Layers className="h-8 w-8 text-blue-500" />,
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?q=80&w=1664&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Setting up a Wallet",
    description: "Get started with MetaMask or other wallets to buy and store your NFTs securely.",
    icon: <Wallet className="h-8 w-8 text-green-500" />,
    image: "https://images.unsplash.com/photo-1640340434583-9d95557a924d?q=80&w=1664&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Safety & Security",
    description: "Protect yourself from scams and ensure your digital assets remain secure.",
    icon: <Shield className="h-8 w-8 text-purple-500" />,
    image: "https://images.unsplash.com/photo-1639322537231-2f206e06af84?q=80&w=1664&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "NFT User Guide",
    description: "A comprehensive guide to buying, selling, and creating NFTs on our platform.",
    icon: <Book className="h-8 w-8 text-orange-500" />,
    image: "https://images.unsplash.com/photo-1639322537504-6427a16b0a28?q=80&w=1664&auto=format&fit=crop",
  }
];

export const NFT101Section = () => {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">NFT 101</h2>
          <p className="text-gray-400 mt-1">Get comfortable with the basics</p>
        </div>
        <Button 
          variant="outline" 
          className="text-white border-gray-700 hover:bg-gray-800"
        >
          Learn More
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {educationItems.map((item) => (
          <div 
            key={item.id} 
            className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02]"
          >
            <div className="relative aspect-video">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5">
              <div className="mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 