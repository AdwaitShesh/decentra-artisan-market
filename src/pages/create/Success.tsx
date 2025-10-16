import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CreateNav } from "@/components/CreateNav";
import { 
  CheckCircle2,
  Share2,
  Eye,
  ShoppingBag,
  ArrowRight,
  ExternalLink,
  Copy,
  Users
} from "lucide-react";

const Success = () => {
  const [nftData, setNftData] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    // Retrieve created NFT data from local storage
    const storedNFT = localStorage.getItem('createdNFT');
    if (storedNFT) {
      setNftData(JSON.parse(storedNFT));
    }
  }, []);
  
  // Generate a fake transaction hash for display purposes
  const transactionHash = "0x7d9c4b1cc5df78e1e4d25b9d9f99e43687f888d58b97bc9e1feeabe2c692c265";
  
  const handleCopyTxHash = () => {
    navigator.clipboard.writeText(transactionHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  // Format timestamp for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <CreateNav currentStep={4} />
          
          <div className="max-w-4xl mx-auto">
            <div className="mb-12 text-center">
              <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-green-900/20 border border-green-500/30 mb-6">
                <CheckCircle2 className="h-12 w-12 text-green-500" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                NFT Created Successfully!
              </h1>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Your NFT has been minted and is now available on the blockchain. You can view it in the marketplace or share it with others.
              </p>
            </div>
            
            {nftData && (
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* NFT Preview */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 flex flex-col">
                  <h2 className="text-xl font-bold mb-4">Your NFT</h2>
                  <div className="bg-gray-800 rounded-lg overflow-hidden flex-1 flex items-center justify-center p-4">
                    {nftData.fileType === 'image' ? (
                      <img 
                        src={nftData.previewUrl} 
                        alt={nftData.title} 
                        className="max-w-full max-h-full object-contain rounded-md"
                      />
                    ) : nftData.fileType === 'video' ? (
                      <video 
                        src={nftData.previewUrl} 
                        controls 
                        className="max-w-full max-h-full object-contain rounded-md"
                      />
                    ) : nftData.fileType === 'audio' ? (
                      <div className="text-center w-full">
                        <div className="bg-purple-900/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">🎵</span>
                        </div>
                        <audio src={nftData.previewUrl} controls className="w-full" />
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="bg-purple-900/30 rounded-full h-24 w-24 flex items-center justify-center mx-auto mb-4">
                          <span className="text-4xl">🎭</span>
                        </div>
                        <p className="text-gray-400">NFT Preview</p>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* NFT Details */}
                <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                  <h2 className="text-xl font-bold mb-4">NFT Details</h2>
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Title</p>
                      <p className="font-medium">{nftData.title}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Creator</p>
                      <p className="font-medium">{nftData.artist?.name || "Anonymous Artist"}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Price</p>
                      <p className="font-medium">{nftData.price} {nftData.blockchainInfo?.symbol || "ETH"}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Royalty</p>
                      <p className="font-medium">{nftData.royalty}%</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Blockchain</p>
                      <p className="font-medium flex items-center">
                        {nftData.blockchainInfo?.name || "Unknown"}
                        {nftData.blockchainInfo?.recommended && (
                          <span className="ml-2 text-xs px-2 py-0.5 bg-green-900/50 text-green-400 rounded-full">
                            Lowest Fees
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Network Fee: {nftData.blockchainInfo?.averageFee || "Unknown"}
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Created</p>
                      <p className="font-medium">{formatDate(nftData.createdAt)}</p>
                    </div>
                    
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Transaction</p>
                      <div className="flex items-center">
                        <code className="font-mono text-xs bg-gray-800 p-2 rounded mr-2 flex-1 overflow-hidden truncate">
                          {transactionHash}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
                          onClick={handleCopyTxHash}
                        >
                          {copied ? <CheckCircle2 className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                    
                    {nftData.tags && nftData.tags.length > 0 && (
                      <div>
                        <p className="text-gray-400 text-sm mb-2">Tags</p>
                        <div className="flex flex-wrap gap-2">
                          {nftData.tags.map((tag: string, index: number) => (
                            <span 
                              key={index} 
                              className="bg-gray-800 text-gray-200 px-3 py-1 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              <Button 
                className="flex-1 bg-purple-600 hover:bg-purple-700 h-auto py-4"
              >
                <Eye className="mr-2 h-5 w-5" />
                View in Marketplace
              </Button>
              
              <Button 
                className="flex-1 bg-blue-600 hover:bg-blue-700 h-auto py-4"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share NFT
              </Button>
              
              <Button 
                className="flex-1 bg-green-600 hover:bg-green-700 h-auto py-4"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Manage Listing
              </Button>
              
              <Link to="/create/artist-info" className="flex-1">
                <Button 
                  className="w-full bg-gray-800 hover:bg-gray-700 h-auto py-4"
                >
                  Create Another NFT
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            {/* What's Next Section */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h2 className="text-xl font-bold mb-6">What's Next?</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Share2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg">Promote Your NFT</h3>
                  <p className="text-gray-400 text-sm">
                    Share your NFT on social media to increase visibility and attract potential buyers.
                  </p>
                  <Button variant="link" className="text-purple-400 px-0 h-auto">
                    Learn More <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-blue-900/30 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <ShoppingBag className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg">Create a Collection</h3>
                  <p className="text-gray-400 text-sm">
                    Group your NFTs into collections to establish your brand and increase visibility.
                  </p>
                  <Button variant="link" className="text-blue-400 px-0 h-auto">
                    Learn More <ExternalLink className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div className="h-12 w-12 rounded-lg bg-green-900/30 border border-green-500/30 flex items-center justify-center text-green-400">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="font-medium text-lg">Join the Community</h3>
                  <p className="text-gray-400 text-sm">
                    Connect with other creators and collectors in our community to network and learn.
                  </p>
                  <Button variant="link" className="text-green-400 px-0 h-auto">
                    Join Now <ExternalLink className="ml-1 h-3 w-3" />
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

export default Success; 