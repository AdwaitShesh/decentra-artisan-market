import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, EyeIcon, ArrowRight, ChevronDown, ExternalLink, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

type MembershipNFT = {
  id: number;
  title: string;
  creator: string;
  price: string;
  image: string;
  verified?: boolean;
};

// Memberships Spotlight data
const membershipsSpotlightItems: MembershipNFT[] = [
  {
    id: 1,
    title: "VaynerSports Pass VIP",
    creator: "VaynerSports",
    price: "0.29 ETH",
    image: "https://images.unsplash.com/photo-1519326682918-b1b339fd6a7e?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "ETHLETES",
    creator: "ETHLETES Club",
    price: "0.55 ETH",
    image: "https://images.unsplash.com/photo-1560953973-784d04a37b1d?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Crypto Bull Society",
    creator: "CBS",
    price: "0.07 ETH",
    image: "https://images.unsplash.com/photo-1639322537228-f710d846310a?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "Fluffy Pandas",
    creator: "PandaDAO",
    price: "0.28 ETH",
    image: "https://images.unsplash.com/photo-15674501339-28i83e734099?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Access Mint Pass",
    creator: "Access Club",
    price: "0.8 ETH",
    image: "https://images.unsplash.com/photo-1622737133809-d95047b9e673?auto=format&fit=crop&w=600&q=80"
  }
];

// Gaming Memberships data
const gamingMembershipsItems: MembershipNFT[] = [
  {
    id: 1,
    title: "New Tokyo Genesis",
    creator: "Tokyo Collective",
    price: "4.0 ETH",
    image: "https://images.unsplash.com/photo-1579202673506-ca3ce28943ef?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Smol Brains",
    creator: "Smol Labs",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "Neo Tokyo Admin Cards",
    creator: "Neo Tokyo",
    price: "3.5 ETH",
    image: "https://images.unsplash.com/photo-1506259091721-347e791bab0f?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 4,
    title: "ONI Club",
    creator: "ONI Labs",
    price: "0.4 ETH",
    image: "https://images.unsplash.com/photo-1555680201-86f1a7c44488?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Neo Tokyo Special Motos",
    creator: "Neo Tokyo",
    price: "0.09 ETH",
    image: "https://images.unsplash.com/photo-1624006930503-5fedd04dd9ed?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// General Memberships data
const generalMembershipsItems: MembershipNFT[] = [
  {
    id: 1,
    title: "Phaver",
    creator: "Phaver Social",
    price: "0.06 ETH",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "LinkDAO",
    creator: "LinkDAO",
    price: "0.08 ETH",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "DGMV",
    creator: "DGMV Labs",
    price: "1.07 ETH",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Genesis Puff Pass",
    creator: "Genesis DAO",
    price: "0.6 ETH",
    image: "https://images.unsplash.com/photo-1617396900799-f4ec2b43c7ae?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "The 333 Club",
    creator: "333 Club",
    price: "0.42 ETH",
    image: "https://images.unsplash.com/photo-1635322966219-b75ed372eb01?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

// Art Memberships data
const artMembershipsItems: MembershipNFT[] = [
  {
    id: 1,
    title: "Zi World Founders",
    creator: "Zi World",
    price: "0.54 ETH",
    image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 2,
    title: "Funkoff",
    creator: "Funk Labs",
    price: "1.34 ETH",
    image: "https://images.unsplash.com/photo-1584389776945-f7544292e3f6?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 3,
    title: "eShape Genesis Pass",
    creator: "eShape",
    price: "0.4 ETH",
    image: "https://images.unsplash.com/photo-1619170743049-46df262d8ee4?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    title: "Living on the Internet",
    creator: "Digital Nomads",
    price: "0.2 ETH",
    image: "https://images.unsplash.com/photo-1582642020915-44cf2453fa59?auto=format&fit=crop&w=600&q=80",
    verified: true
  },
  {
    id: 5,
    title: "Grailers",
    creator: "Grail DAO",
    price: "0.18 ETH",
    image: "https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?auto=format&fit=crop&w=600&q=80",
    verified: true
  }
];

export function MembershipCard({ nft, size = "medium" }: { nft: MembershipNFT, size?: 'small' | 'medium' | 'large' }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Card 
      className={cn(
        "overflow-hidden group transition-all duration-300 rounded-xl cursor-pointer",
        "bg-card border-gray-800 hover:border-gray-700 dark:bg-black dark:border-gray-800 dark:hover:border-gray-700"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        <div className={cn(
          "overflow-hidden",
          size === 'small' ? "h-36" : size === 'medium' ? "h-44" : "h-52"
        )}>
          <img 
            src={nft.image} 
            alt={nft.title} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute top-2 right-2 flex space-x-1">
          <div className="bg-black/60 p-1.5 rounded-md backdrop-blur-sm">
            <Heart className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>
      <CardContent className="p-3">
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-sm text-foreground dark:text-white truncate">{nft.title}</h3>
        </div>
        <div className="flex justify-between items-center mt-1">
          <div className="flex items-center">
            <p className="text-xs text-muted-foreground dark:text-gray-400">by {nft.creator}</p>
          </div>
          <p className="text-xs font-semibold text-foreground dark:text-white">{nft.price}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export function MembershipCategorySection({ 
  title, 
  items, 
  viewAllLink = "#", 
  cardSize = "medium" 
}: { 
  title: string, 
  items: MembershipNFT[], 
  viewAllLink?: string,
  cardSize?: 'small' | 'medium' | 'large'
}) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-foreground dark:text-white">{title}</h2>
        <a href={viewAllLink} className="text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white flex items-center">
          View all <ChevronRight className="h-4 w-4 ml-1" />
        </a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {items.map(item => (
          <MembershipCard key={item.id} nft={item} size={cardSize} />
        ))}
      </div>
    </div>
  );
}

export function MembershipsBanner() {
  return (
    <div className="w-full h-[300px] rounded-xl overflow-hidden relative mb-12">
      <img 
        src="https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80" 
        alt="ATEM Membership Cards" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent flex flex-col justify-end p-8">
        <div className="absolute top-4 left-4 bg-pink-500/20 p-2 rounded-md backdrop-blur-sm">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-pink-400">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">ATEM Membership Cards</h1>
        <p className="text-sm md:text-base text-gray-300 mt-2">by ATEM <span className="inline-block bg-blue-500/30 text-blue-300 text-xs px-1.5 py-0.5 rounded ml-2">Verified</span></p>
        <p className="text-sm text-gray-400 mt-1">Floor price: 0.35 ETH</p>
        <button className="mt-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white rounded-lg px-4 py-2 w-max transition">
          View collection
        </button>
      </div>
    </div>
  );
}

export function MembershipsCategoryShowcase() {
  return (
    <div className="space-y-10">
      <MembershipsBanner />
      
      <MembershipCategorySection title="Memberships Spotlight" items={membershipsSpotlightItems} />
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Gaming Memberships</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {gamingMembershipsItems.map(item => (
            <MembershipCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Memberships</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {generalMembershipsItems.map(item => (
            <MembershipCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground dark:text-white mb-4">Trending in Art Memberships</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {artMembershipsItems.map(item => (
            <MembershipCard key={item.id} nft={item} />
          ))}
        </div>
      </div>
      
      {/* NFT 101 Section - Membership specific questions */}
      <div className="mt-16 mb-10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-foreground dark:text-white">NFT 101</h2>
          <a href="#" className="text-sm text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-white flex items-center">
            Learn more <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-purple-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-600">
                  <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M7 11V7C7 5.93913 7.42143 4.92172 8.17157 4.17157C8.92172 3.42143 9.93913 3 11 3H13C14.0609 3 15.0783 3.42143 15.8284 4.17157C16.5786 4.92172 17 5.93913 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">What is an NFT membership?</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Learn about membership tokens</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-blue-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
                  <path d="M16 8L12 4V7C6.47715 7 2 11.4772 2 17C2 18.1 2.20235 19.1557 2.17344 20C4.28673 17.1255 6.98953 15 12 15V18L16 14L12 10L16 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.8266 20C19.7784 18.0891 22 15.0891 22 11.5C22 6.80558 18.1944 3 13.5 3C12.1792 3 10.9307 3.2922 9.82007 3.8112" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">How to use NFT memberships</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Unlock benefits with your NFTs</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-green-100 dark:bg-green-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-green-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-600">
                  <path d="M16 10.95C16.61 10.31 17 9.44 17 8.5C17 5.91 14.09 4 11.5 4C8.91 4 6 5.91 6 8.5C6 10 7 11.5 8 12L6 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 18C9 19.1046 9.89543 20 11 20C12.1046 20 13 19.1046 13 18C13 16.8954 12.1046 16 11 16C9.89543 16 9 16.8954 9 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">Creating a Membership DAO</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Build your own membership community</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-orange-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-600">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">Membership utilities</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Explore ways to add value to members</p>
            </div>
          </Card>
          
          <Card className="overflow-hidden border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-black hover:border-gray-300 dark:hover:border-gray-700 transition-all cursor-pointer group">
            <div className="p-4 bg-red-100 dark:bg-red-900/20 h-48 flex items-center justify-center">
              <div className="w-24 h-24 bg-red-500/30 rounded-full flex items-center justify-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-red-600">
                  <path d="M12 16V16.01M12 7V13M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-base text-foreground dark:text-white mb-1">Membership token best practices</h3>
              <p className="text-sm text-muted-foreground dark:text-gray-400">Security tips for membership NFTs</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 