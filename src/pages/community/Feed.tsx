import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Image as ImageIcon, 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal,
  Bookmark,
  CheckCircle,
  TrendingUp,
  ChevronRight,
  Repeat,
  Sparkles
} from "lucide-react";
import { CommunityNav } from "@/components/CommunityNav";
import { NFTImage } from "@/components/NFTImage";

// Post data type
export type Post = {
  id: string;
  author: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  timestamp: string;
  content: string;
  image?: string;
  nft?: {
    title: string;
    price: string;
    collection: string;
  };
  likes: number;
  comments: { id: string; author: string; text: string; }[];
  shares: number;
  liked?: boolean;
  saved?: boolean;
};

// Feed posts data
const feedPosts: Post[] = [
  {
    id: "post-1",
    author: {
      name: "Alice Johnson",
      avatar: "https://randomuser.me/api/portraits/women/12.jpg",
      verified: true
    },
    timestamp: "2 hours ago",
    content: "Just minted my new collection 'Abstract Dimensions'! Check it out on the marketplace and let me know what you think. Limited edition of 50 pieces.",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80",
    nft: {
      title: "Abstract Dimensions #1",
      price: "0.85 ETH",
      collection: "Abstract Dimensions"
    },
    likes: 127,
    comments: [
      { id: 'c1', author: 'Diana', text: 'This is amazing!' },
      { id: 'c2', author: 'Bob', text: 'I love the colors!' },
    ],
    shares: 15,
    liked: true
  },
  {
    id: "post-2",
    author: {
      name: "Bob Smith",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    timestamp: "4 hours ago",
    content: "I'm impressed by the quality of NFTs on this platform! Just purchased this amazing piece from @DianaT's new collection.",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    likes: 89,
    comments: [],
    shares: 5
  },
  {
    id: "post-3",
    author: {
      name: "Charlie Williams",
      avatar: "https://randomuser.me/api/portraits/men/44.jpg",
      verified: true
    },
    timestamp: "Yesterday",
    content: "I've just launched a free tutorial series on creating generative art for NFTs. Looking forward to seeing what you all create!",
    likes: 215,
    comments: [],
    shares: 76,
    saved: true
  },
  {
    id: "post-4",
    author: {
      name: "Diana Taylor",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
      verified: true
    },
    timestamp: "Yesterday",
    content: "Super excited to announce my collaboration with @CharlieW on an exclusive generative art collection dropping next week. Here's a sneak peek!",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80",
    nft: {
      title: "Genesis Collaboration",
      price: "2.5 ETH (Reserve)",
      collection: "Genesis"
    },
    likes: 342,
    comments: [],
    shares: 112
  },
  {
    id: "post-5",
    author: {
      name: "Eva Williams",
      avatar: "https://randomuser.me/api/portraits/women/48.jpg",
    },
    timestamp: "1 day ago",
    content: "Exploring the intersection of AI and art. What are your thoughts on AI-generated NFTs?",
    likes: 150,
    comments: [],
    shares: 30
  },
  {
    id: "post-6",
    author: {
      name: "Frank Brown",
      avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    },
    timestamp: "1 day ago",
    content: "Just learned about the new NFT standard on this platform. Excited to see how it will change the game!",
    likes: 50,
    comments: [],
    shares: 10
  },
  {
    id: "post-7",
    author: {
      name: "Grace Davis",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
      verified: true
    },
    timestamp: "2 days ago",
    content: "My new NFT collection 'Galactic Dreams' is live on the marketplace! Check it out and let me know what you think.",
    image: "https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=600&q=80",
    nft: {
      title: "Galactic Dreams #1",
      price: "1.2 ETH",
      collection: "Galactic Dreams"
    },
    likes: 200,
    comments: [],
    shares: 50
  },
  {
    id: "post-8",
    author: {
      name: "Hannah Lee",
      avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    },
    timestamp: "2 days ago",
    content: "Just discovered an amazing NFT artist on this platform. Check out their work and show some love!",
    likes: 100,
    comments: [],
    shares: 20
  },
  {
    id: "post-9",
    author: {
      name: "Isaac Kim",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      verified: true
    },
    timestamp: "3 days ago",
    content: "Excited to announce my new NFT collection 'Neon City' dropping next month! Stay tuned for more updates.",
    image: "https://images.unsplash.com/photo-1638803040283-7a5ffd48dad5?auto=format&fit=crop&w=600&q=80",
    nft: {
      title: "Neon City #1",
      price: "1.5 ETH",
      collection: "Neon City"
    },
    likes: 250,
    comments: [],
    shares: 60
  },
  {
    id: "post-10",
    author: {
      name: "Julia Martin",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    timestamp: "3 days ago",
    content: "Just learned about the benefits of NFTs for artists. Excited to see how this technology will change the art world!",
    likes: 120,
    comments: [],
    shares: 30
  }
];

// Trending topics
const trendingTopics = [
  { id: "1", name: "Generative Art", posts: 1423 },
  { id: "2", name: "NFT Royalties", posts: 958 },
  { id: "3", name: "Upcoming Drops", posts: 782 },
  { id: "4", name: "Photography NFTs", posts: 613 },
  { id: "5", name: "Music NFTs", posts: 547 }
];

// Suggested accounts
const suggestedAccounts = [
  {
    id: "1",
    name: "Ethan Brown",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    bio: "Digital Artist | Creator of Cosmic Series",
    verified: true
  },
  {
    id: "2",
    name: "Fiona Garcia",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "NFT Collector | Crypto Enthusiast",
    verified: false
  },
  {
    id: "3",
    name: "George Martinez",
    avatar: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Abstract Artist | Blockchain Developer",
    verified: true
  }
];

const CommunityFeed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [accounts, setAccounts] = useState(suggestedAccounts.map(acc => ({ ...acc, isFollowing: false })));
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    try {
      // Get posts shared by the user from localStorage
      const storedPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
      
      // Create a set of IDs from the stored posts to avoid duplicates from the hardcoded list
      const storedPostIds = new Set(storedPosts.map(p => p.id));

      // Filter out hardcoded posts that might already be in localStorage
      const uniqueFeedPosts = feedPosts.filter(p => !storedPostIds.has(p.id));

      // Combine the stored posts (which are prepended) and the unique hardcoded posts
      setPosts([...storedPosts, ...uniqueFeedPosts]);

    } catch (error) {
      console.error('Failed to load community posts from localStorage', error);
      // Fallback to just the hardcoded posts if localStorage is corrupt
      setPosts(feedPosts);
    }
  }, []);
  
  const toggleLike = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const liked = !post.liked;
        return {
          ...post,
          liked,
          likes: liked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };
  
  const toggleFollow = (accountId: string) => {
    setAccounts(accounts.map(acc => 
      acc.id === accountId ? { ...acc, isFollowing: !acc.isFollowing } : acc
    ));
  };

  const addComment = (postId: string) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { id: `${Date.now()}`, author: 'You', text: newComment }],
        };
      }
      return post;
    }));

    setNewComment('');
  };

  const toggleSave = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          saved: !post.saved
        };
      }
      return post;
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CommunityNav />
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main feed */}
            <div className="lg:w-2/3">
              {/* Create post */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src="https://randomuser.me/api/portraits/men/44.jpg"
                      alt="Your profile"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <Input 
                    placeholder="Share your thoughts or creations..." 
                    className="bg-gray-800 border-gray-700 text-white rounded-lg"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                      <ImageIcon className="h-4 w-4 mr-2" /> Photo/Video
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                      <Sparkles className="h-4 w-4 mr-2" /> NFT
                    </Button>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700">Post</Button>
                </div>
              </div>
              
              {/* Feed Posts */}
              <div className="space-y-6">
                {posts.map((post) => (
                  <div 
                    key={post.id}
                    className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden"
                  >
                    {/* Post header */}
                    <div className="p-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                          <img 
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{post.author.name}</h3>
                            {post.author.verified && (
                              <CheckCircle size={14} className="ml-1 text-blue-400" />
                            )}
                          </div>
                          <p className="text-xs text-gray-400">{post.timestamp}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    {/* Post content */}
                    <div className="px-4 pb-3">
                      <p className="text-gray-200 mb-3">{post.content}</p>
                      
                      {post.image && (
                        <div className="rounded-lg overflow-hidden mb-3">
                          <NFTImage 
                            src={post.image}
                            alt="Post content"
                            className="w-full h-auto object-cover"
                            showLoader={true}
                          />
                        </div>
                      )}
                      
                      {post.nft && (
                        <div className="bg-gray-800/70 rounded-lg p-3 mb-3 flex items-center justify-between">
                          <div>
                            <p className="font-medium">{post.nft.title}</p>
                            <p className="text-sm text-gray-400">{post.nft.collection}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{post.nft.price}</p>
                            <Button variant="link" size="sm" className="h-6 p-0 text-purple-400">
                              View on Marketplace
                            </Button>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    {/* Post actions */}
                    <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
                      <div className="flex items-center gap-6">
                        <button 
                          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400"
                          onClick={() => toggleLike(post.id)}
                        >
                          <Heart className={`h-4 w-4 ${post.liked ? 'fill-purple-500 text-purple-500' : ''}`} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400">
                          <MessageSquare className="h-4 w-4" />
                          <span>{post.comments.length}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-purple-400">
                          <Share2 className="h-4 w-4" />
                          <span>{post.shares}</span>
                        </button>
                      </div>
                      
                      <button 
                        className="text-gray-400 hover:text-purple-400"
                        onClick={() => toggleSave(post.id)}
                      >
                        <Bookmark className={`h-4 w-4 ${post.saved ? 'fill-purple-500 text-purple-500' : ''}`} />
                      </button>
                    </div>

                    {/* Comments Section */}
                    <div className="mt-4">
                      {Array.isArray(post.comments) && post.comments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-2 mt-2">
                          <p className="text-sm"><span className="font-semibold">{comment.author}</span>: {comment.text}</p>
                        </div>
                      ))}
                      <div className="flex items-center gap-2 mt-2">
                        <Input 
                          placeholder="Add a comment..." 
                          className="bg-gray-800 border-gray-700 text-white rounded-lg" 
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                        />
                        <Button size="sm" className="bg-purple-600 hover:bg-purple-700" onClick={() => addComment(post.id)}>Post</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Right sidebar */}
            <div className="lg:w-1/3 space-y-6">
              {/* Trending Topics */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                  <h2 className="font-semibold flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5 text-purple-500" /> 
                    Trending in Community
                  </h2>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-purple-400 hover:text-purple-300 hover:bg-gray-800">
                    See All
                  </Button>
                </div>
                <div className="p-2">
                  {trendingTopics.map((topic, index) => (
                    <div 
                      key={topic.id}
                      className="flex items-center p-2 hover:bg-gray-800/50 rounded-lg cursor-pointer transition"
                    >
                      <span className="text-gray-500 text-sm mr-3">#{index + 1}</span>
                      <div className="flex-1">
                        <p className="font-medium">{topic.name}</p>
                        <p className="text-xs text-gray-400">{topic.posts} posts</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-500" />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Suggested Accounts */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="font-semibold">Suggested Accounts</h2>
                </div>
                <div className="p-2">
                  {accounts.map((account) => (
                    <div 
                      key={account.id}
                      className="flex items-center gap-3 p-2 hover:bg-gray-800/50 rounded-lg cursor-pointer transition"
                    >
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img 
                          src={account.avatar}
                          alt={account.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center">
                          <h3 className="font-medium truncate">{account.name}</h3>
                          {account.verified && (
                            <CheckCircle size={12} className="ml-1 flex-shrink-0 text-blue-400" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{account.bio}</p>
                      </div>
                      <Button 
                        variant={account.isFollowing ? "secondary" : "outline"} 
                        size="sm" 
                        className={`h-8 text-xs ${account.isFollowing ? "bg-gray-700 text-white" : "border-purple-500 text-purple-400 hover:bg-purple-500/10"}`}
                        onClick={() => toggleFollow(account.id)}
                      >
                        {account.isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-gray-800">
                  <Button variant="ghost" size="sm" className="w-full text-purple-400 hover:text-purple-300 hover:bg-gray-800">
                    Show More
                  </Button>
                </div>
              </div>
              
              {/* Community Events */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800">
                  <h2 className="font-semibold">Upcoming Events</h2>
                </div>
                <div className="p-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="h-14 w-14 bg-purple-900/50 rounded-lg flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-bold">MAY</span>
                        <span className="text-lg font-bold">15</span>
                      </div>
                      <div>
                        <h3 className="font-medium">NFT Creation Workshop</h3>
                        <p className="text-xs text-gray-400 mt-1">Join top creators for a live workshop on creating compelling NFT art</p>
                        <Button variant="link" size="sm" className="h-6 p-0 text-purple-400 mt-1">
                          Join Event
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="h-14 w-14 bg-indigo-900/50 rounded-lg flex flex-col items-center justify-center text-center">
                        <span className="text-sm font-bold">MAY</span>
                        <span className="text-lg font-bold">22</span>
                      </div>
                      <div>
                        <h3 className="font-medium">Collector's AMA Session</h3>
                        <p className="text-xs text-gray-400 mt-1">Q&A with prominent NFT collectors about market trends</p>
                        <Button variant="link" size="sm" className="h-6 p-0 text-purple-400 mt-1">
                          RSVP
                        </Button>
                      </div>
                    </div>
                  </div>
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

export default CommunityFeed;