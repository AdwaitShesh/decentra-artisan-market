import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  UserRound,
  CheckCircle2,
  UserPlus,
  MessagesSquare,
  CheckCheck,
  X,
  Clock,
  Filter,
  ChevronDown,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  User,
  Shield
} from "lucide-react";
import { CommunityNav } from "@/components/CommunityNav";

// Friend categories for tabs
const friendCategories = [
  { id: "all", name: "All Friends", count: 37 },
  { id: "collectors", name: "Collectors", count: 14 },
  { id: "artists", name: "Artists", count: 9 },
  { id: "recent", name: "Recently Added", count: 8 },
  { id: "pending", name: "Pending", count: 5 }
];

// Friends data
type Friend = {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline";
  type: "collector" | "artist" | "both";
  verified?: boolean;
  mutualFriends: number;
  recentActivity?: string;
  lastActive?: string;
  pending?: boolean;
};

const friendsData: Friend[] = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "online",
    type: "artist",
    verified: true,
    mutualFriends: 15,
    recentActivity: "Listed 3 new items"
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "online",
    type: "collector",
    mutualFriends: 7,
    recentActivity: "Purchased 'Cosmic Voyage #42'"
  },
  {
    id: "3",
    name: "Charlie Williams",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    status: "offline",
    type: "both",
    verified: true,
    mutualFriends: 3,
    lastActive: "3 hours ago"
  },
  {
    id: "4",
    name: "Diana Taylor",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "online",
    type: "artist",
    mutualFriends: 9,
    recentActivity: "Created a new collection"
  },
  {
    id: "5",
    name: "Ethan Brown",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "offline",
    type: "collector",
    mutualFriends: 2,
    lastActive: "1 day ago"
  },
  {
    id: "6",
    name: "Fiona Garcia",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    status: "online",
    type: "artist",
    verified: true,
    mutualFriends: 11,
    recentActivity: "Started a live auction"
  },
  {
    id: "7",
    name: "George Martinez",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    status: "offline",
    type: "collector",
    mutualFriends: 4,
    lastActive: "2 days ago"
  },
  {
    id: "8",
    name: "Hannah Lee",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    status: "online",
    type: "both",
    mutualFriends: 6,
    recentActivity: "Minted a new NFT"
  }
];

// Pending friend requests
const pendingFriends: Friend[] = [
  {
    id: "p1",
    name: "Ivan Petrov",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    status: "online",
    type: "collector",
    mutualFriends: 8,
    pending: true
  },
  {
    id: "p2",
    name: "Jennifer Wong",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    status: "offline",
    type: "artist",
    mutualFriends: 5,
    pending: true,
    lastActive: "5 hours ago"
  },
  {
    id: "p3",
    name: "Kevin Moore",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    status: "online",
    type: "both",
    mutualFriends: 3,
    pending: true
  },
  {
    id: "p4",
    name: "Laura Wilson",
    avatar: "https://randomuser.me/api/portraits/women/54.jpg",
    status: "offline",
    type: "collector",
    mutualFriends: 9,
    pending: true,
    lastActive: "2 days ago"
  },
  {
    id: "p5",
    name: "Michael Davis",
    avatar: "https://randomuser.me/api/portraits/men/42.jpg",
    status: "online",
    type: "artist",
    verified: true,
    mutualFriends: 14,
    pending: true
  }
];

// Friend suggestions
const friendSuggestions = [
  {
    id: "s1",
    name: "Olivia Parker",
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
    type: "artist",
    verified: true,
    followers: "12.5K",
    mutualFriends: 7
  },
  {
    id: "s2",
    name: "Paul Robinson",
    avatar: "https://randomuser.me/api/portraits/men/18.jpg",
    type: "collector",
    nftCount: 146,
    mutualFriends: 4
  },
  {
    id: "s3",
    name: "Rachel Kim",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
    type: "both",
    verified: true,
    followers: "28.9K",
    mutualFriends: 11
  },
  {
    id: "s4",
    name: "Samuel Carter",
    avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    type: "artist",
    followers: "3.2K",
    mutualFriends: 2
  }
];

const CommunityFriends = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter friends based on active category and search query
  const filteredFriends = () => {
    let filtered = [...friendsData];
    
    if (activeCategory === "collectors") {
      filtered = filtered.filter(friend => friend.type === "collector" || friend.type === "both");
    } else if (activeCategory === "artists") {
      filtered = filtered.filter(friend => friend.type === "artist" || friend.type === "both");
    } else if (activeCategory === "recent") {
      // Simulating "recent" by taking first 8 friends
      filtered = filtered.slice(0, 8);
    } else if (activeCategory === "pending") {
      return pendingFriends;
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(friend => friend.name.toLowerCase().includes(query));
    }
    
    return filtered;
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CommunityNav />
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <UserRound className="mr-2 h-6 w-6 text-purple-500" />
              Friends
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search friends..." 
                  className="pl-10 bg-gray-800 border-gray-700 text-white w-52 md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <UserPlus className="mr-2 h-4 w-4" />
                Add Friend
              </Button>
            </div>
          </div>
          
          {/* Friend Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Friends */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 mb-1">Total Friends</p>
                  <p className="text-3xl font-bold text-purple-400">28</p>
                  <p className="text-sm text-gray-400 mt-1">+5 new this month</p>
                </div>
                <div className="h-14 w-14 bg-purple-900/20 border border-purple-500/30 rounded-full flex items-center justify-center">
                  <UserRound className="h-7 w-7 text-purple-400" />
                </div>
              </div>
            </div>
            
            {/* Pending Requests */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 mb-1">Pending Requests</p>
                  <p className="text-3xl font-bold text-yellow-400">5</p>
                  <p className="text-sm text-gray-400 mt-1">3 sent, 2 received</p>
                </div>
                <div className="h-14 w-14 bg-yellow-900/20 border border-yellow-500/30 rounded-full flex items-center justify-center">
                  <UserPlus className="h-7 w-7 text-yellow-400" />
                </div>
              </div>
            </div>
            
            {/* Friend Activity */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-gray-400 mb-1">Friend Activity</p>
                  <p className="text-3xl font-bold text-green-400">128</p>
                  <p className="text-sm text-gray-400 mt-1">Total interactions with friends this week</p>
                </div>
                <div className="h-14 w-14 bg-green-900/20 border border-green-500/30 rounded-full flex items-center justify-center">
                  <MessagesSquare className="h-7 w-7 text-green-400" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Friend Categories */}
          <div className="flex overflow-x-auto hide-scrollbar py-2 mb-6 border-b border-gray-800">
            {friendCategories.map((category) => (
              <button 
                key={category.id}
                className={`px-4 py-2 mr-4 flex items-center ${
                  activeCategory === category.id 
                    ? 'text-white border-b-2 border-purple-500' 
                    : 'text-gray-400 hover:text-white'
                } transition`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span>{category.name}</span>
                <span className="ml-2 bg-gray-800 text-gray-400 text-xs rounded-full px-2 py-0.5">
                  {category.count}
                </span>
              </button>
            ))}
            
            <div className="ml-auto">
              <Button variant="outline" size="sm" className="h-9 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
                <Filter className="h-3.5 w-3.5 mr-2" /> Filter <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
          
          {/* Friends Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFriends().map((friend) => (
              <div 
                key={friend.id}
                className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={friend.avatar}
                          alt={friend.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${
                        friend.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-semibold">{friend.name}</h3>
                        {friend.verified && (
                          <CheckCircle size={14} className="ml-1 text-blue-400" />
                        )}
                      </div>
                      <p className="text-xs text-gray-400">
                        {friend.type === 'artist' ? 'Artist' : friend.type === 'collector' ? 'Collector' : 'Artist & Collector'}
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {friend.mutualFriends} mutual {friend.mutualFriends === 1 ? 'friend' : 'friends'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {friend.pending ? (
                      <div className="flex space-x-1">
                        <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500/50 hover:bg-green-500/10 rounded-lg">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500/50 hover:bg-red-500/10 rounded-lg">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-1">
                  <div className="text-xs text-gray-400">
                    {friend.status === 'online' ? (
                      <span className="flex items-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-500 mr-1"></span> Online
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" /> {friend.lastActive}
                      </span>
                    )}
                  </div>
                  
                  {friend.recentActivity && (
                    <div className="text-xs text-gray-400">
                      {friend.recentActivity}
                    </div>
                  )}
                </div>
                
                {!friend.pending && (
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1 bg-gray-800 hover:bg-gray-700 text-white text-xs h-9">
                      <MessagesSquare className="h-3.5 w-3.5 mr-1.5" /> Message
                    </Button>
                    <Button variant="outline" className="flex-1 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 text-xs h-9">
                      <User className="h-3.5 w-3.5 mr-1.5" /> View Profile
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Friend Suggestions */}
          {activeCategory !== "pending" && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <UserPlus className="mr-2 h-5 w-5 text-purple-500" /> 
                People You May Know
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {friendSuggestions.map((suggestion) => (
                  <div 
                    key={suggestion.id}
                    className="bg-gray-900 rounded-xl border border-gray-800 p-4 hover:border-gray-700 transition"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-12 w-12 rounded-full overflow-hidden">
                        <img 
                          src={suggestion.avatar}
                          alt={suggestion.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-semibold">{suggestion.name}</h3>
                          {suggestion.verified && (
                            <CheckCircle size={14} className="ml-1 text-blue-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400">
                          {suggestion.type === 'artist' ? 'Artist' : suggestion.type === 'collector' ? 'Collector' : 'Artist & Collector'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                      <span>{suggestion.mutualFriends} mutual {suggestion.mutualFriends === 1 ? 'friend' : 'friends'}</span>
                      {suggestion.followers && <span>{suggestion.followers} followers</span>}
                      {suggestion.nftCount && <span>{suggestion.nftCount} NFTs</span>}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs h-9">
                        <UserPlus className="h-3.5 w-3.5 mr-1.5" /> Add Friend
                      </Button>
                      <Button variant="outline" size="icon" className="h-9 w-9 border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Community Insights */}
          <div className="mt-12 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800">
              <h2 className="font-semibold flex items-center">
                <Shield className="mr-2 h-5 w-5 text-purple-500" /> 
                Community Insights
              </h2>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Network Growth</h3>
                  <p className="text-3xl font-bold text-purple-400">+26%</p>
                  <p className="text-sm text-gray-400 mt-1">Your network has grown 26% in the last month</p>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Most Active Friends</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/12.jpg" alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/33.jpg" alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="h-8 w-8 rounded-full overflow-hidden">
                      <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="" className="h-full w-full object-cover" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/50 rounded-lg p-4">
                  <h3 className="text-lg font-medium mb-2">Friend Interactions</h3>
                  <p className="text-3xl font-bold text-green-400">128</p>
                  <p className="text-sm text-gray-400 mt-1">Total interactions with friends this week</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityFriends; 