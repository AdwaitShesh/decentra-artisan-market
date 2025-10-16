import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

type ArtNFT = {
  id: number;
  title: string;
  artist?: string;
  price: string;
  floorPrice?: string;
  volume?: string;
  image: string;
  verified?: boolean;
};

// Art Spotlight data
const artSpotlightItems: ArtNFT[] = [
  {
    id: 1,
    title: "Miladyium: Neural Genesis",
    artist: "Milady Maker",
    price: "0.42 ETH",
    floorPrice: "0.5 ETH",
    image: "https://images.unsplash.com/photo-1541702467897-41397f7b143b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Sunrise by TenaK",
    artist: "TenaK",
    price: "0.09 ETH",
    floorPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Ethereum Landscapes - 2023",
    artist: "Crypto Atelier",
    price: "0.06 ETH",
    floorPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1519611103964-90f61a50d3e6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "The Mars",
    artist: "Future Labs",
    price: "0.04 ETH",
    floorPrice: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1633286673955-b3b7fb533711?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Artificial Art v2",
    artist: "AI Artisans",
    price: "0.05 ETH",
    floorPrice: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1608501267744-79bd55729eba?auto=format&fit=crop&w=600&q=80"
  }
];

// Digital Art trending data
const digitalArtItems: ArtNFT[] = [
  {
    id: 1,
    title: "Machine Neural Networks",
    artist: "Digital Syntax",
    price: "0.42 ETH",
    floorPrice: "0.5 ETH",
    image: "https://images.unsplash.com/photo-1546453667-8a8d2d07bc20?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Textures by TenaK artist",
    artist: "TenaK",
    price: "0.08 ETH",
    floorPrice: "0.1 ETH",
    image: "https://images.unsplash.com/photo-1547499681-28dece7dba00?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Ethereum Landscapes - 2023",
    artist: "Crypto Atelier",
    price: "0.06 ETH",
    floorPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "The Mars",
    artist: "Future Labs",
    price: "0.04 ETH",
    floorPrice: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Abstract Art v3.0",
    artist: "AI Artisans",
    price: "0.05 ETH",
    floorPrice: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1573096108468-702f6014ef28?auto=format&fit=crop&w=600&q=80"
  }
];

// Pixel Art trending data
const pixelArtItems: ArtNFT[] = [
  {
    id: 1,
    title: "Bare Pixel (2019) - RARE",
    artist: "Pixelated",
    price: "1.05 ETH",
    floorPrice: "1.5 ETH",
    image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Qoobz",
    artist: "8-Bit Creations",
    price: "0.12 ETH",
    floorPrice: "0.15 ETH",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "Jester's World Editions",
    artist: "Pixel Punk",
    price: "0.09 ETH",
    floorPrice: "0.14 ETH",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Pixeldust",
    artist: "Bit by Bit",
    price: "0.22 ETH",
    floorPrice: "0.24 ETH",
    image: "https://images.unsplash.com/photo-1605106702842-01a887a31122?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "CryptyPaws",
    artist: "8-Bit Labs",
    price: "0.07 ETH",
    floorPrice: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1633532482964-3c26fee9f35b?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Abstract Art trending data
const abstractArtItems: ArtNFT[] = [
  {
    id: 1,
    title: "vfx by kami",
    artist: "Kami",
    price: "1.79 ETH",
    floorPrice: "1.8 ETH",
    image: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Axis Network",
    artist: "Geometric Art",
    price: "1.1 ETH",
    floorPrice: "1.1 ETH",
    image: "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    title: "EphemeraLab by Scrail",
    artist: "Scrail Collective",
    price: "0.06 ETH",
    floorPrice: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Page's Ties",
    artist: "Digital Tapestry",
    price: "0.04 ETH",
    floorPrice: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1549490349-b73f9351fdce?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "ANOMALY BLUNT by Vincenzo",
    artist: "Vincenzo Labs",
    price: "0.05 ETH",
    floorPrice: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Art Spotlight component
export function ArtSpotlight() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Art spotlight</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {artSpotlightItems.map((item) => (
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
                {item.artist && <p className="text-xs text-muted-foreground mb-2">{item.artist}</p>}
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

// Trending in Digital Art component
export function TrendingInDigitalArt() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Digital Art</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {digitalArtItems.map((item) => (
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
                {item.artist && <p className="text-xs text-muted-foreground mb-2">{item.artist}</p>}
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

// Trending in Pixel Art component
export function TrendingInPixelArt() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Pixel Art</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {pixelArtItems.map((item) => (
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
                {item.artist && <p className="text-xs text-muted-foreground mb-2">{item.artist}</p>}
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

// Trending in Abstract Art component
export function TrendingInAbstractArt() {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-foreground dark:text-white">Trending in Abstract Art</h2>
        <button className="text-sm text-primary dark:text-blue-400 flex items-center gap-1 font-medium">
          View all
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {abstractArtItems.map((item) => (
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
                {item.artist && <p className="text-xs text-muted-foreground mb-2">{item.artist}</p>}
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