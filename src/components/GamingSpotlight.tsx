import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type GamingSpotlightItem = {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  price: string;
  volume: string;
  floor: string;
  verified?: boolean;
};

const spotlightItems: GamingSpotlightItem[] = [
  {
    id: 1,
    title: "CAPTAINZ",
    subtitle: "By Memeland",
    image: "https://images.unsplash.com/photo-1561357747-a5532f5f947c?auto=format&fit=crop&w=600&q=80",
    price: "4.97 ETH",
    volume: "179 ETH",
    floor: "4.97 ETH"
  },
  {
    id: 2,
    title: "Adventure Quests by Kraken",
    subtitle: "Kraken Games",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    price: "7.00 ETH",
    volume: "210 ETH",
    floor: "7.00 ETH",
    verified: true
  },
  {
    id: 3,
    title: "Mutant Ape Yacht Club",
    subtitle: "MAYC",
    image: "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=600&q=80",
    price: "11.5 ETH",
    volume: "190 ETH",
    floor: "11.5 ETH",
    verified: true
  },
  {
    id: 4,
    title: "Cyber Samurai",
    subtitle: "Neon Art",
    image: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=600&q=80",
    price: "0.55 ETH",
    volume: "25 ETH",
    floor: "0.55 ETH"
  },
  {
    id: 5,
    title: "Pixel Universe",
    subtitle: "Pixel Labs",
    image: "https://images.unsplash.com/photo-1615639164213-aab04da93c7c?auto=format&fit=crop&w=600&q=80",
    price: "0.65 ETH",
    volume: "30 ETH",
    floor: "0.65 ETH",
    verified: true
  }
];

export function GamingSpotlight() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Gaming spotlight</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {spotlightItems.map((item) => (
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
                <h3 className="font-semibold text-sm text-foreground">{item.title}</h3>
                {item.subtitle && <p className="text-xs text-muted-foreground mb-2">{item.subtitle}</p>}
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-sm dark:text-gray-300">{item.volume}</p>
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

// Create the Trending in Virtual Worlds section as shown in the screenshot
export function TrendingInVirtualWorlds() {
  const virtualWorldItems = [
    {
      id: 1,
      title: "Voxels Worlds",
      image: "https://images.unsplash.com/photo-1596499029793-5602eaef5132?auto=format&fit=crop&w=600&q=80",
      price: "0.65 ETH",
      volume: "$5.01M",
      floor: "0.65 ETH",
      verified: true
    },
    {
      id: 2,
      title: "Meebits - Fast Land",
      image: "https://images.unsplash.com/photo-1518128958364-65859d70aa41?auto=format&fit=crop&w=600&q=80",
      price: "4.28 ETH",
      volume: "$4.07M",
      floor: "4.28 ETH",
      verified: true
    },
    {
      id: 3,
      title: "Decentraland Wearables",
      image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&w=600&q=80",
      price: "0.02 ETH",
      volume: "$3.7M",
      floor: "0.02 ETH",
      verified: true
    },
    {
      id: 4,
      title: "The Memes of Immortals",
      image: "https://images.unsplash.com/photo-1566936440121-453d75effa6e?auto=format&fit=crop&w=600&q=80",
      price: "0.09 ETH",
      volume: "$2.9M",
      floor: "0.09 ETH",
      verified: true
    },
    {
      id: 5,
      title: "MetaKnight | Citadel",
      image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
      price: "0.08 ETH",
      volume: "$1.3M",
      floor: "0.08 ETH"
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Virtual Worlds</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {virtualWorldItems.map((item) => (
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
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-sm dark:text-gray-300">{item.volume}</p>
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

// Create the Trending in Sports section as shown in the screenshot
export function TrendingInSports() {
  const sportsItems = [
    {
      id: 1,
      title: "Fantasy Premier",
      image: "https://images.unsplash.com/photo-1543326727-cf6c39e8f84c?auto=format&fit=crop&w=600&q=80",
      price: "0.56 ETH",
      volume: "$1.1M",
      floor: "0.56 ETH",
      verified: true
    },
    {
      id: 2,
      title: "Soccer Kings League",
      image: "https://images.unsplash.com/photo-1511426420268-a3b96a21e0e9?auto=format&fit=crop&w=600&q=80",
      price: "0.12 ETH",
      volume: "$980K",
      floor: "0.12 ETH"
    },
    {
      id: 3,
      title: "Fantasy Cards",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?auto=format&fit=crop&w=600&q=80",
      price: "0.03 ETH",
      volume: "$560K",
      floor: "0.03 ETH",
      verified: true
    },
    {
      id: 4,
      title: "UFC Digital Tokens",
      image: "https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?auto=format&fit=crop&w=600&q=80",
      price: "1.30 ETH",
      volume: "$401K",
      floor: "1.30 ETH",
      verified: true
    },
    {
      id: 5,
      title: "NHL Moments",
      image: "https://images.unsplash.com/photo-1580138750600-98ae7e756a7e?auto=format&fit=crop&w=600&q=80",
      price: "2.60 ETH",
      volume: "$366K",
      floor: "2.60 ETH",
      verified: true
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Sports</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {sportsItems.map((item) => (
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
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-sm dark:text-gray-300">{item.volume}</p>
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

// Create the MMORPG Trading section
export function TrendingInMMORPG() {
  const mmorpgItems = [
    {
      id: 1,
      title: "The Aether",
      image: "https://images.unsplash.com/photo-1592035659284-3b39971c1107?auto=format&fit=crop&w=600&q=80",
      price: "0.029 ETH",
      volume: "$190K",
      floor: "0.029 ETH",
      verified: true
    },
    {
      id: 2,
      title: "Solstices",
      image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=600&q=80",
      price: "0.095 ETH",
      volume: "$180K",
      floor: "0.095 ETH"
    },
    {
      id: 3,
      title: "Trader's Fortress",
      image: "https://images.unsplash.com/photo-1605379399843-5870eea9b74e?auto=format&fit=crop&w=600&q=80",
      price: "0.31 ETH",
      volume: "$142K",
      floor: "0.31 ETH",
      verified: true
    },
    {
      id: 4,
      title: "Epoch's Embrace",
      image: "https://images.unsplash.com/photo-1605106702734-205df224ecce?auto=format&fit=crop&w=600&q=80",
      price: "0.35 ETH",
      volume: "$138K",
      floor: "0.35 ETH"
    },
    {
      id: 5,
      title: "Dragon's Chronicle",
      image: "https://images.unsplash.com/photo-1507499739999-097f9693f278?auto=format&fit=crop&w=600&q=80",
      price: "0.25 ETH",
      volume: "$122K",
      floor: "0.25 ETH",
      verified: true
    }
  ];

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in MMORPG</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {mmorpgItems.map((item) => (
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
                <div className="mt-2 flex justify-between items-center">
                  <div>
                    <p className="text-xs text-muted-foreground">Floor</p>
                    <p className="font-medium text-sm dark:text-white">{item.floor}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Volume</p>
                    <p className="text-sm dark:text-gray-300">{item.volume}</p>
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