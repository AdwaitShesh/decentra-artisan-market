import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  FileImage, 
  PenLine, 
  Info,
  Lightbulb,
  ChevronRight,
  BookMarked,
  ListChecks,
  Video
} from "lucide-react";
import { ReleaseNav } from "@/components/ReleaseNav";

const NFTCreationGuide = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-4">
          <ReleaseNav />
          
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              NFT Creation Guide
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Learn how to create, mint, and sell your digital artwork as NFTs on Bharat Artisan Market
            </p>
          </div>
          
          {/* Table of Contents */}
          <div className="mb-16 bg-gray-900 rounded-xl border border-gray-800 p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <BookMarked className="mr-2 h-6 w-6 text-purple-400" />
              Table of Contents
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <a href="#intro" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Introduction to NFTs</span>
                </a>
                <a href="#preparation" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Preparing Your Digital Artwork</span>
                </a>
                <a href="#wallet" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Setting Up Your Wallet</span>
                </a>
                <a href="#minting" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Minting Your NFT</span>
                </a>
              </div>
              <div className="space-y-3">
                <a href="#listing" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Listing Your NFT for Sale</span>
                </a>
                <a href="#promotion" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Promoting Your NFT</span>
                </a>
                <a href="#community" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Engaging with the Community</span>
                </a>
                <a href="#advanced" className="flex items-center text-gray-200 hover:text-purple-400 transition">
                  <ChevronRight className="h-4 w-4 mr-2" />
                  <span>Advanced Techniques</span>
                </a>
              </div>
            </div>
          </div>
          
          {/* Introduction Section */}
          <div id="intro" className="mb-16 scroll-mt-24">
            <div className="flex items-center mb-6">
              <Info className="h-7 w-7 text-purple-500 mr-3" />
              <h2 className="text-3xl font-bold">Introduction to NFTs</h2>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">What are NFTs?</h3>
                  <p className="text-gray-300 mb-4">
                    Non-Fungible Tokens (NFTs) are unique digital assets stored on a blockchain. Unlike cryptocurrencies such as Bitcoin or Ethereum, NFTs are not mutually interchangeable, making each one unique.
                  </p>
                  <p className="text-gray-300 mb-4">
                    NFTs represent ownership of a specific digital item - whether it's artwork, music, videos, or other forms of digital content. This technology allows creators to sell their work directly to collectors, with proof of authenticity and ownership.
                  </p>
                  <div className="flex items-start mb-4">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                    <p className="text-gray-300">
                      <span className="font-semibold text-yellow-400">Pro Tip:</span> Before creating your first NFT, spend time exploring existing collections to understand the market and find your niche.
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Why Create NFTs?</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">1</span>
                      </div>
                      <p><span className="font-semibold">Direct sales to collectors</span> - Bypass traditional gatekeepers and sell directly to your audience</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">2</span>
                      </div>
                      <p><span className="font-semibold">Ongoing royalties</span> - Earn a percentage from secondary sales whenever your NFT changes hands</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">3</span>
                      </div>
                      <p><span className="font-semibold">Proof of authenticity</span> - Blockchain technology ensures your work cannot be counterfeited</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">4</span>
                      </div>
                      <p><span className="font-semibold">New creative possibilities</span> - Explore digital formats, programmable art, and interactive experiences</p>
                    </li>
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-purple-900/50 border border-purple-500/50 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                        <span className="text-purple-400 text-sm font-bold">5</span>
                      </div>
                      <p><span className="font-semibold">Global reach</span> - Connect with collectors and enthusiasts worldwide</p>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-800 pt-6">
                <div className="flex items-center mb-4">
                  <Video className="h-5 w-5 text-purple-400 mr-2" />
                  <h4 className="text-lg font-semibold">Featured Video: Understanding NFTs</h4>
                </div>
                <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                  <div className="text-gray-400">Video player placeholder - "What are NFTs and How Do They Work?"</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preparing Your Digital Artwork */}
          <div id="preparation" className="mb-16 scroll-mt-24">
            <div className="flex items-center mb-6">
              <FileImage className="h-7 w-7 text-purple-500 mr-3" />
              <h2 className="text-3xl font-bold">Preparing Your Digital Artwork</h2>
            </div>
            
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Supported File Formats</h3>
                  <p className="text-gray-300 mb-4">
                    Bharat Artisan Market supports a wide range of file formats for different types of digital art:
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Images</h4>
                      <p className="text-gray-400 text-sm">PNG, JPG, GIF, SVG</p>
                      <p className="text-gray-400 text-sm mt-1">Max size: 100MB</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Videos</h4>
                      <p className="text-gray-400 text-sm">MP4, WEBM</p>
                      <p className="text-gray-400 text-sm mt-1">Max size: 30MB</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Audio</h4>
                      <p className="text-gray-400 text-sm">MP3, WAV, OGG</p>
                      <p className="text-gray-400 text-sm mt-1">Max size: 30MB</p>
                    </div>
                    <div className="bg-gray-800 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">3D Models</h4>
                      <p className="text-gray-400 text-sm">GLB, GLTF</p>
                      <p className="text-gray-400 text-sm mt-1">Max size: 100MB</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-4">Best Practices</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <ListChecks className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Resolution</h4>
                        <p className="text-gray-300 text-sm">Use high-resolution images (at least 1500x1500 pixels) for the best display quality.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ListChecks className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Color Profile</h4>
                        <p className="text-gray-300 text-sm">Save your files in sRGB color profile for consistent display across devices.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ListChecks className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Metadata</h4>
                        <p className="text-gray-300 text-sm">Prepare a detailed description, title, and relevant tags to increase discoverability.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ListChecks className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Originality</h4>
                        <p className="text-gray-300 text-sm">Ensure your work is original. NFTs should not contain copyrighted material you don't own.</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <ListChecks className="h-5 w-5 text-purple-400 mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h4 className="font-semibold">Preview Images</h4>
                        <p className="text-gray-300 text-sm">For audio or 3D NFTs, create an attractive cover image to represent your work in the marketplace.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 border-t border-gray-800 pt-6">
                <div className="flex items-start">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0 mt-1" />
                  <p className="text-gray-300">
                    <span className="font-semibold text-yellow-400">Pro Tip:</span> Consider creating a cohesive collection rather than individual pieces. Collections with a unified theme or style often attract more attention and can command higher prices.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Guide Sections Teaser */}
          <div className="mb-16">
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <h3 className="text-xl font-bold mb-4">Continue Your NFT Creation Journey</h3>
              <p className="text-gray-300 mb-6">
                This guide continues with detailed instructions for:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div id="wallet" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-800/70 transition cursor-pointer">
                  <h4 className="font-semibold mb-2">Setting Up Your Wallet</h4>
                  <p className="text-gray-400 text-sm">Learn how to set up a cryptocurrency wallet to create and sell NFTs.</p>
                </div>
                <div id="minting" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-800/70 transition cursor-pointer">
                  <h4 className="font-semibold mb-2">Minting Your NFT</h4>
                  <p className="text-gray-400 text-sm">Step-by-step guide to mint your digital artwork as an NFT.</p>
                </div>
                <div id="listing" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-800/70 transition cursor-pointer">
                  <h4 className="font-semibold mb-2">Listing for Sale</h4>
                  <p className="text-gray-400 text-sm">How to price your NFT and list it on the marketplace.</p>
                </div>
                <div id="promotion" className="bg-gray-800 p-4 rounded-lg hover:bg-gray-800/70 transition cursor-pointer">
                  <h4 className="font-semibold mb-2">Promotion Strategies</h4>
                  <p className="text-gray-400 text-sm">Effective ways to promote your NFT to potential collectors.</p>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl px-6 py-3">
                  Create Your First NFT Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div id="faq" className="mb-16">
            <div className="flex items-center mb-6">
              <BookOpen className="h-7 w-7 text-purple-500 mr-3" />
              <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-2">What is gas and how does it affect NFT creation?</h3>
                <p className="text-gray-300">
                  Gas refers to the fee required to perform a transaction on the Ethereum blockchain. When you mint an NFT, you're creating a new entry on the blockchain, which requires computational resources. Gas fees vary based on network congestion. Bharat Artisan Market offers gas optimization features and supports multiple blockchains to help reduce these costs.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-2">How do royalties work for secondary sales?</h3>
                <p className="text-gray-300">
                  When setting up your NFT, you can specify a royalty percentage (typically 5-10%) that you'll receive from all future sales of that NFT. Whenever someone resells your work on a marketplace that supports royalties, you'll automatically receive that percentage of the sale price, providing ongoing income from your creation.
                </p>
              </div>
              
              <div className="bg-gray-900 rounded-xl border border-gray-800 p-6">
                <h3 className="text-xl font-bold mb-2">Can I mint the same artwork on multiple platforms?</h3>
                <p className="text-gray-300">
                  While technically possible, minting the same artwork as NFTs on multiple platforms is generally discouraged as it can dilute the value of your work. Collectors typically value uniqueness and scarcity. If you want to reach different audiences, consider creating platform-specific collections or variations of your artwork.
                </p>
              </div>
            </div>
          </div>
          
          {/* Guide Navigation */}
          <div className="flex justify-between items-center">
            <div></div>
            <Button className="bg-gray-800 hover:bg-gray-700 text-white">
              Next: Setting Up Your Wallet <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NFTCreationGuide; 