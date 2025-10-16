import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  Plus, 
  Hash, 
  Settings, 
  MessageSquare, 
  MoreVertical, 
  Send,
  ArrowRight
} from "lucide-react";
import { CommunityNav } from "@/components/CommunityNav";

// Dummy data for chat groups
const chatGroups = [
  {
    id: "1",
    name: "NFT Creators",
    members: 2456,
    icon: "🎨",
    unread: true
  },
  {
    id: "2",
    name: "Crypto Art Collectors",
    members: 1872,
    icon: "💎",
    unread: false
  },
  {
    id: "3",
    name: "Digital Artists United",
    members: 3251,
    icon: "🖌️",
    unread: true
  },
  {
    id: "4",
    name: "Blockchain Enthusiasts",
    members: 5602,
    icon: "🔗",
    unread: false
  },
  {
    id: "5",
    name: "Metaverse Explorers",
    members: 1234,
    icon: "🌐",
    unread: true
  },
  {
    id: "6",
    name: "Gaming NFTs",
    members: 2789,
    icon: "🎮",
    unread: false
  },
  {
    id: "7",
    name: "Music NFT Creators",
    members: 1453,
    icon: "🎵",
    unread: false
  },
  {
    id: "8",
    name: "Photography NFTs",
    members: 1982,
    icon: "📷",
    unread: true
  }
];

// Dummy messages for the selected group
const groupMessages = [
  {
    id: "1",
    sender: "Alice",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    message: "Just minted my new collection! Check it out on the marketplace.",
    timestamp: "11:23 AM",
    nft: {
      image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80",
      title: "Neo Cubism #42"
    }
  },
  {
    id: "2",
    sender: "Bob",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    message: "That looks amazing! Love the colors and the composition.",
    timestamp: "11:25 AM"
  },
  {
    id: "3",
    sender: "Charlie",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    message: "I've been working on something similar. The NFT market for abstract art is really heating up!",
    timestamp: "11:28 AM"
  },
  {
    id: "4",
    sender: "Diana",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    message: "Has anyone tried the new minting feature on Bharat? It's super efficient with gas fees.",
    timestamp: "11:30 AM"
  },
  {
    id: "5",
    sender: "Alice",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    message: "Yes, I used it for this collection. Gas was only about 0.002 ETH per NFT!",
    timestamp: "11:32 AM"
  }
];

// Popular topics in groups
const popularTopics = [
  { id: "1", name: "Digital Art Trends", posts: 412 },
  { id: "2", name: "NFT Pricing Strategies", posts: 289 },
  { id: "3", name: "Collection Launches", posts: 256 },
  { id: "4", name: "Marketplace Updates", posts: 178 }
];

const CommunityGroups = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CommunityNav />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar - Groups list */}
            <div className="w-full md:w-80 lg:w-96 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="mr-2 h-5 w-5 text-purple-500" /> 
                  Community Groups
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search groups..." 
                    className="pl-10 bg-gray-800 border-gray-700 text-white w-full rounded-lg"
                  />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-800/50">
                <span className="text-sm font-medium">Your Groups</span>
                <Button variant="ghost" size="sm" className="h-8 text-xs text-purple-400 hover:text-purple-300 hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-1" /> Join New
                </Button>
              </div>
              
              <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                {chatGroups.map((group) => (
                  <div 
                    key={group.id}
                    className="flex items-center gap-3 p-3 hover:bg-gray-800/50 cursor-pointer transition"
                  >
                    <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                      {group.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{group.name}</h3>
                        {group.unread && (
                          <span className="h-2 w-2 rounded-full bg-purple-500"></span>
                        )}
                      </div>
                      <p className="text-xs text-gray-400">{group.members.toLocaleString()} members</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 border-t border-gray-800 bg-gray-800/30">
                <h3 className="font-medium mb-3">Popular Topics</h3>
                <div className="space-y-2">
                  {popularTopics.map((topic) => (
                    <div 
                      key={topic.id}
                      className="flex items-center gap-2 text-sm hover:bg-gray-800/50 p-2 rounded-lg cursor-pointer"
                    >
                      <Hash className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-300">{topic.name}</span>
                      <span className="text-xs text-gray-500 ml-auto">{topic.posts} posts</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Main chat area */}
            <div className="flex-1 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-xl">
                    🎨
                  </div>
                  <div>
                    <h2 className="font-semibold">NFT Creators</h2>
                    <p className="text-xs text-gray-400">2,456 members • 142 online</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Search className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/30">
                {groupMessages.map((message) => (
                  <div key={message.id} className="flex gap-3">
                    <div className="h-8 w-8 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={message.avatar} 
                        alt={message.sender} 
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{message.sender}</span>
                        <span className="text-xs text-gray-500">{message.timestamp}</span>
                      </div>
                      <p className="text-gray-300 mt-1">{message.message}</p>
                      
                      {/* NFT preview if available */}
                      {message.nft && (
                        <div className="mt-2 bg-gray-800 rounded-lg p-2 inline-block">
                          <div className="flex items-center gap-3">
                            <div className="h-16 w-16 rounded-md overflow-hidden">
                              <img 
                                src={message.nft.image}
                                alt={message.nft.title}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-sm font-medium">{message.nft.title}</p>
                              <Button variant="ghost" size="sm" className="text-xs text-purple-400 hover:text-purple-300 p-0 h-auto mt-1">
                                View on marketplace <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-3 border-t border-gray-800 bg-gray-800/30">
                <div className="flex gap-2">
                  <Input 
                    placeholder="Type a message..." 
                    className="bg-gray-800 border-gray-700 text-white rounded-lg"
                  />
                  <Button className="bg-purple-600 hover:bg-purple-700 rounded-lg">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended Groups Section */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Recommended Groups</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Example recommended groups */}
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={i}
                  className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition"
                >
                  <div className="h-32 overflow-hidden bg-gradient-to-r from-purple-900 to-indigo-900">
                    {/* Group banner could go here */}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-xl transform -translate-y-8 border-4 border-gray-900">
                        {["🌟", "🚀", "🎭", "🎲"][i-1]}
                      </div>
                      <h3 className="font-semibold">
                        {["Emerging Artists", "NFT Launch Strategies", "Creative Showcase", "Collectors Circle"][i-1]}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                      {[
                        "A community for up-and-coming digital artists to share work and get feedback.",
                        "Learn how to successfully launch your NFT collections from experts.",
                        "Share your art and creative process with fellow artists.",
                        "Connect with other NFT collectors to discuss trends and opportunities."
                      ][i-1]}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        {[3241, 1802, 2756, 1493][i-1].toLocaleString()} members
                      </span>
                      <Button variant="outline" size="sm" className="h-8 text-xs border-purple-500 text-purple-400 hover:bg-purple-500/10">
                        Join
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="border-gray-700 text-gray-400 hover:text-white hover:bg-gray-800">
                View All Groups
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CommunityGroups; 