import { CheckCircle, TrendingUp, TrendingDown } from "lucide-react";

type NotableCollection = {
  id: string;
  name: string;
  image: string;
  floorPrice: number;
  volume: number;
  change: number;
  owners: number;
  items: number;
  verified?: boolean;
};

const notableCollections: NotableCollection[] = [
  {
    id: "bored-ape",
    name: "Bored Ape Yacht Club",
    image: "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop",
    floorPrice: 72.5,
    volume: 1205,
    change: 3.2,
    owners: 6400,
    items: 10000,
    verified: true
  },
  {
    id: "cryptopunks",
    name: "CryptoPunks",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?q=80&w=1497&auto=format&fit=crop",
    floorPrice: 68.3,
    volume: 976,
    change: -1.8,
    owners: 3956,
    items: 10000,
    verified: true
  },
  {
    id: "doodles",
    name: "Doodles",
    image: "https://images.unsplash.com/photo-1629752187687-3d3c7ea3a21b?q=80&w=1587&auto=format&fit=crop",
    floorPrice: 8.4,
    volume: 453,
    change: 5.6,
    owners: 5213,
    items: 10000,
    verified: true
  },
  {
    id: "azuki",
    name: "Azuki",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1664&auto=format&fit=crop",
    floorPrice: 15.2,
    volume: 876,
    change: 2.1,
    owners: 5890,
    items: 10000,
    verified: true
  },
  {
    id: "clone-x",
    name: "Clone X",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?q=80&w=1664&auto=format&fit=crop",
    floorPrice: 5.9,
    volume: 321,
    change: -0.8,
    owners: 4532,
    items: 20000,
    verified: true
  },
  {
    id: "moonbirds",
    name: "Moonbirds",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?q=80&w=1664&auto=format&fit=crop",
    floorPrice: 9.8,
    volume: 543,
    change: 4.3,
    owners: 6789,
    items: 10000,
    verified: true
  }
];

export const NotableCollections = () => {
  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Notable Collections</h2>
        <p className="text-gray-400 mt-1">Top collections with the highest volume</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notableCollections.map((collection) => (
          <div 
            key={collection.id} 
            className="bg-gray-900 rounded-lg overflow-hidden transition-transform duration-300 hover:transform hover:scale-[1.02]"
          >
            <div className="relative h-32">
              <img 
                src={collection.image} 
                alt={collection.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-1">
                  <h3 className="font-semibold text-lg text-white">{collection.name}</h3>
                  {collection.verified && (
                    <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="p-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Floor Price</p>
                <p className="font-medium">{collection.floorPrice} ETH</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">24h Volume</p>
                <p className="font-medium">{collection.volume} ETH</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">24h Change</p>
                <div className={`flex items-center ${collection.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {collection.change >= 0 ? (
                    <TrendingUp size={14} className="mr-1" />
                  ) : (
                    <TrendingDown size={14} className="mr-1" />
                  )}
                  <p className="font-medium">{Math.abs(collection.change)}%</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Owners</p>
                <p className="font-medium">{collection.owners.toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 