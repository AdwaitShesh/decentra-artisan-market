import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Users, 
  Plus, 
  MessageSquare, 
  Smile, 
  Image as ImageIcon,
  Send,
  MoreHorizontal,
  Phone,
  Video,
  Info,
  ChevronRight
} from "lucide-react";
import { CommunityNav } from "@/components/CommunityNav";

// Dummy data for contacts
const contacts = [
  {
    id: "1",
    name: "Alice Johnson",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    status: "online",
    lastMessage: "Did you see the new drop?",
    timestamp: "12:45 PM",
    unread: 2
  },
  {
    id: "2",
    name: "Bob Smith",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    status: "online",
    lastMessage: "I'll bid on your collection tomorrow!",
    timestamp: "10:22 AM",
    unread: 0
  },
  {
    id: "3",
    name: "Charlie Williams",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    status: "offline",
    lastMessage: "Let me know when you mint the new pieces",
    timestamp: "Yesterday",
    unread: 0
  },
  {
    id: "4",
    name: "Diana Taylor",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    status: "online",
    lastMessage: "The artwork is amazing",
    timestamp: "Yesterday",
    unread: 1
  },
  {
    id: "5",
    name: "Ethan Brown",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    status: "offline",
    lastMessage: "Can you help me with setting up my collection?",
    timestamp: "2 days ago",
    unread: 0
  },
  {
    id: "6",
    name: "Fiona Garcia",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    status: "online",
    lastMessage: "I shared your profile with my network",
    timestamp: "2 days ago",
    unread: 0
  },
  {
    id: "7",
    name: "George Martinez",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    status: "offline",
    lastMessage: "Let's collaborate on the next drop",
    timestamp: "3 days ago",
    unread: 0
  }
];

// Dummy messages for the current chat
const currentMessages = [
  {
    id: "1",
    sender: "Alice Johnson",
    isSelf: false,
    message: "Hey there! Did you see the new drop from Beeple?",
    timestamp: "12:42 PM"
  },
  {
    id: "2",
    sender: "You",
    isSelf: true,
    message: "No, I haven't checked it out yet. Is it on OpenSea?",
    timestamp: "12:43 PM"
  },
  {
    id: "3",
    sender: "Alice Johnson",
    isSelf: false,
    message: "It's on our marketplace actually! Here's a preview:",
    timestamp: "12:44 PM"
  },
  {
    id: "4",
    sender: "Alice Johnson",
    isSelf: false,
    nftPreview: {
      image: "https://images.unsplash.com/photo-1634986666676-ec9f8b5686a4?auto=format&fit=crop&w=600&q=80",
      title: "Quantum Artifacts #231",
      price: "3.45 ETH"
    },
    timestamp: "12:44 PM"
  },
  {
    id: "5",
    sender: "You",
    isSelf: true,
    message: "That looks incredible! I love the colors and composition.",
    timestamp: "12:45 PM"
  },
  {
    id: "6",
    sender: "Alice Johnson",
    isSelf: false,
    message: "Right? It's part of a limited collection. There are only 100 pieces total.",
    timestamp: "12:45 PM"
  }
];

// Suggested contacts to message
const suggestedContacts = [
  {
    id: "s1",
    name: "Hannah Lee",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    title: "Digital Artist",
    mutualFriends: 12
  },
  {
    id: "s2",
    name: "Ivan Petrov",
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
    title: "NFT Collector",
    mutualFriends: 8
  },
  {
    id: "s3",
    name: "Jennifer Wong",
    avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    title: "Crypto Enthusiast",
    mutualFriends: 5
  }
];

const DirectMessages = () => {
  const [activeContact, setActiveContact] = useState("1"); // Alice is active by default
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CommunityNav />
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left sidebar - Contacts list */}
            <div className="w-full md:w-80 lg:w-96 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
              {/* Header with search */}
              <div className="p-4 border-b border-gray-800">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <MessageSquare className="mr-2 h-5 w-5 text-purple-500" /> 
                  Direct Messages
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search messages..." 
                    className="pl-10 bg-gray-800 border-gray-700 text-white w-full rounded-lg"
                  />
                </div>
              </div>
              
              {/* Contacts list */}
              <div className="overflow-y-auto max-h-[calc(100vh-400px)]">
                {contacts.map((contact) => (
                  <div 
                    key={contact.id}
                    className={`flex items-center gap-3 p-3 hover:bg-gray-800/50 cursor-pointer transition ${
                      activeContact === contact.id ? 'bg-gray-800/70' : ''
                    }`}
                    onClick={() => setActiveContact(contact.id)}
                  >
                    <div className="relative">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={contact.avatar} 
                          alt={contact.name}
                          className="h-full w-full object-cover" 
                        />
                      </div>
                      <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-gray-900 ${
                        contact.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{contact.name}</h3>
                        <span className="text-xs text-gray-500">{contact.timestamp}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400 truncate">{contact.lastMessage}</p>
                        {contact.unread > 0 && (
                          <span className="h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center text-xs font-medium">
                            {contact.unread}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* New message button */}
              <div className="p-4 border-t border-gray-800 bg-gray-800/30">
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Plus className="h-4 w-4 mr-2" /> New Message
                </Button>
              </div>
            </div>
            
            {/* Chat area */}
            <div className="flex-1 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">
              {/* Chat header */}
              <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={contacts.find(c => c.id === activeContact)?.avatar}
                      alt={contacts.find(c => c.id === activeContact)?.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-semibold">{contacts.find(c => c.id === activeContact)?.name}</h2>
                    <p className="text-xs text-gray-400">
                      {contacts.find(c => c.id === activeContact)?.status === 'online' ? 'Online' : 'Offline'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Chat messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-950/30">
                {currentMessages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.isSelf ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[70%] ${message.isSelf ? 'order-1' : 'order-none'}`}>
                      {!message.isSelf && (
                        <div className="flex items-center gap-2 mb-1">
                          <div className="h-6 w-6 rounded-full overflow-hidden">
                            <img 
                              src={contacts.find(c => c.id === activeContact)?.avatar}
                              alt={message.sender}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <span className="text-sm font-medium">{message.sender}</span>
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                      )}
                      
                      {message.message && (
                        <div className={`rounded-2xl p-3 ${
                          message.isSelf 
                            ? 'bg-purple-600 text-white rounded-tr-none' 
                            : 'bg-gray-800 text-gray-200 rounded-tl-none'
                        }`}>
                          <p>{message.message}</p>
                        </div>
                      )}
                      
                      {message.nftPreview && (
                        <div className={`rounded-2xl p-3 ${
                          message.isSelf 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-800 text-gray-200'
                        }`}>
                          <div className="rounded-lg overflow-hidden mb-2">
                            <img 
                              src={message.nftPreview.image}
                              alt={message.nftPreview.title}
                              className="w-full object-cover"
                            />
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">{message.nftPreview.title}</span>
                            <span className="text-sm">{message.nftPreview.price}</span>
                          </div>
                          <Button variant="outline" size="sm" className="mt-2 w-full bg-black/20 border-white/20 hover:bg-black/30">
                            View on Marketplace
                          </Button>
                        </div>
                      )}
                      
                      {message.isSelf && (
                        <div className="flex justify-end mt-1">
                          <span className="text-xs text-gray-500">{message.timestamp}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="p-3 border-t border-gray-800 bg-gray-800/30">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <Plus className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    className="bg-gray-800 border-gray-700 text-white rounded-lg"
                  />
                  <Button className="h-10 w-10 p-0 bg-purple-600 hover:bg-purple-700 rounded-lg">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Suggested Contacts */}
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Suggested Contacts</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {suggestedContacts.map((contact) => (
                <div 
                  key={contact.id}
                  className="bg-gray-900 rounded-xl border border-gray-800 p-4 flex items-center gap-4 hover:border-gray-700 transition"
                >
                  <div className="h-14 w-14 rounded-full overflow-hidden">
                    <img 
                      src={contact.avatar}
                      alt={contact.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{contact.name}</h3>
                    <p className="text-sm text-gray-400">{contact.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{contact.mutualFriends} mutual connections</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-9 border-purple-500 text-purple-400 hover:bg-purple-500/10">
                    Message
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          {/* Recent Activity */}
          <div className="mt-8 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="font-semibold">Recent Activity</h2>
              <Button variant="ghost" size="sm" className="text-xs text-purple-400 hover:text-purple-300 hover:bg-gray-800">
                View All <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            <div className="p-4">
              <div className="space-y-4">
                {/* Activity items */}
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/women/22.jpg"
                      alt="Jennifer"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Jennifer Wong</span> 
                      <span className="text-gray-400"> sent you a friend request</span>
                    </p>
                    <p className="text-xs text-gray-500">2 hours ago</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="h-8 border-purple-500 text-purple-400 hover:bg-purple-500/10">
                      Accept
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 text-gray-400 hover:text-white">
                      Decline
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/men/67.jpg"
                      alt="Ivan"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Ivan Petrov</span> 
                      <span className="text-gray-400"> mentioned you in NFT Collectors group</span>
                    </p>
                    <p className="text-xs text-gray-500">5 hours ago</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/women/12.jpg"
                      alt="Alice"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">Alice Johnson</span> 
                      <span className="text-gray-400"> shared an NFT with you</span>
                    </p>
                    <p className="text-xs text-gray-500">Yesterday</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
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

export default DirectMessages; 