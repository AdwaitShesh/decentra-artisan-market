import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Rocket, 
  CheckCircle2, 
  PenTool, 
  Wallet, 
  Database, 
  ArrowRight, 
  Image as ImageIcon,
  FileText,
  MessageCircle,
  Users,
  TrendingUp,
  ShieldCheck
} from "lucide-react";
import { ReleaseNav } from "@/components/ReleaseNav";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <ReleaseNav />
          
          {/* Hero section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">
              Start Your NFT Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-8">
              Create, sell, and showcase your digital artwork on the Bharat Artisan Market
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl py-6 px-8 text-lg">
                Create Your First NFT
              </Button>
              <Button variant="outline" className="border-gray-700 text-gray-200 hover:text-white hover:bg-gray-800 rounded-xl py-6 px-8 text-lg">
                Learn More
              </Button>
            </div>
          </div>
          
          {/* Steps Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-14 w-14 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mb-5 mx-auto">
                  <PenTool className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Create</h3>
                <p className="text-gray-400 text-center mb-5">
                  Upload your digital artwork and set properties, unlockable content, and collection details.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Support for images, videos, audio, and 3D models</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Add rich metadata and attributes</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Set royalties for secondary sales</span>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-14 w-14 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mb-5 mx-auto">
                  <Database className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Mint</h3>
                <p className="text-gray-400 text-center mb-5">
                  Mint your NFT on the blockchain with our easy-to-use and gas-efficient process.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>One-click minting with minimal gas fees</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Support for multiple blockchains</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Batch minting for collections</span>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6 hover:border-purple-500/50 transition-all duration-300">
                <div className="h-14 w-14 rounded-full bg-purple-900/30 border border-purple-500/30 flex items-center justify-center mb-5 mx-auto">
                  <Wallet className="h-7 w-7 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center">Sell</h3>
                <p className="text-gray-400 text-center mb-5">
                  List your NFTs for sale, set prices, and reach a global collector community.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Fixed price or auction listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Schedule drops for collections</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span>Instant payouts to your wallet</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Featured Artists Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-2 text-center">Featured Artists</h2>
            <p className="text-gray-400 text-center mb-10">Join our thriving community of renowned digital creators</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/* Artist 1 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition group">
                <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/44.jpg" 
                    alt="Elena Bright"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 flex items-center">
                    Elena Bright
                    <CheckCircle2 className="ml-1 h-4 w-4 text-blue-400" />
                  </h3>
                  <p className="text-sm text-gray-400">Digital Artist</p>
                  <p className="text-xs text-gray-500 mt-2">
                    "Bharat Artisan Market transformed my career as a digital artist."
                  </p>
                </div>
              </div>
              
              {/* Artist 2 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition group">
                <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/32.jpg" 
                    alt="Marcus Chen"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 flex items-center">
                    Marcus Chen
                    <CheckCircle2 className="ml-1 h-4 w-4 text-blue-400" />
                  </h3>
                  <p className="text-sm text-gray-400">3D Artist</p>
                  <p className="text-xs text-gray-500 mt-2">
                    "The platform's tools make it easy to showcase my 3D creations to collectors."
                  </p>
                </div>
              </div>
              
              {/* Artist 3 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition group">
                <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/women/65.jpg" 
                    alt="Sophia Lee"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 flex items-center">
                    Sophia Lee
                    <CheckCircle2 className="ml-1 h-4 w-4 text-blue-400" />
                  </h3>
                  <p className="text-sm text-gray-400">Pixel Artist</p>
                  <p className="text-xs text-gray-500 mt-2">
                    "I love the community engagement and support from fellow creators."
                  </p>
                </div>
              </div>
              
              {/* Artist 4 */}
              <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-gray-700 transition group">
                <div className="aspect-square bg-gradient-to-br from-purple-900/50 to-pink-900/50 overflow-hidden">
                  <img 
                    src="https://randomuser.me/api/portraits/men/68.jpg" 
                    alt="Jackson Wright"
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium mb-1 flex items-center">
                    Jackson Wright
                    <CheckCircle2 className="ml-1 h-4 w-4 text-blue-400" />
                  </h3>
                  <p className="text-sm text-gray-400">Generative Artist</p>
                  <p className="text-xs text-gray-500 mt-2">
                    "The minting process is seamless and the platform feels secure."
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Benefits Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-10 text-center">Why Choose Bharat Artisan Market</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Benefit 1 */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Secure Platform</h3>
                    <p className="text-gray-400">
                      State-of-the-art security measures to protect your NFTs and transactions from fraud and theft.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 2 */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Growth Opportunities</h3>
                    <p className="text-gray-400">
                      Exposure to a global audience of collectors, with promotional features to increase visibility.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 3 */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <FileText className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Comprehensive Analytics</h3>
                    <p className="text-gray-400">
                      Detailed insights into your sales, audience engagement, and collection performance.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div className="space-y-6">
                {/* Benefit 4 */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Supportive Community</h3>
                    <p className="text-gray-400">
                      Join a vibrant community of artists, collectors, and enthusiasts to collaborate and grow.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 5 */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Dedicated Support</h3>
                    <p className="text-gray-400">
                      24/7 customer support to help you with any questions or issues that may arise.
                    </p>
                  </div>
                </div>
                
                {/* Benefit 6 */}
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Multiple Content Types</h3>
                    <p className="text-gray-400">
                      Support for various media formats including images, videos, audio, and 3D models.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="rounded-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-pink-900/80 z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1618172193763-c511deb635ca?auto=format&fit=crop&w=1200&q=80" 
              alt="NFT Art"
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your NFT Journey?</h2>
              <p className="text-xl mb-6 max-w-2xl">
                Join thousands of creators who are already selling their artwork on Bharat Artisan Market
              </p>
              <Button className="bg-white hover:bg-gray-100 text-purple-900 rounded-xl py-6 px-8 text-lg">
                Create Your First NFT <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GetStarted; 