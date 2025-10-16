import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black font-inter">
      <Navbar />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-6 dark:text-white">About BharatNFT</h1>
            
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300">
                BharatNFT is a decentralized marketplace designed specifically for artists, creators, and small businesses 
                to showcase and trade their unique digital and traditional artworks as NFTs in a secure environment.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">Our Mission</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We believe in empowering creators by providing them with tools to monetize their work while maintaining 
                ownership and control. Our platform bridges the gap between traditional art markets and blockchain 
                technology, making NFTs accessible to everyone.
              </p>
              
              <h2 className="text-2xl font-semibold mt-8 mb-4 dark:text-white">What Makes Us Different</h2>
              <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                <li>• <strong className="dark:text-white">Artist-Centric Approach:</strong> Our platform is designed with creators' needs in mind.</li>
                <li>• <strong className="dark:text-white">Patent Protection:</strong> We offer unique NFT patents to protect intellectual property.</li>
                <li>• <strong className="dark:text-white">Traditional + Digital:</strong> We support both digital and digitized traditional artwork.</li>
                <li>• <strong className="dark:text-white">Low Fees:</strong> Our commission structure is designed to benefit creators.</li>
                <li>• <strong className="dark:text-white">Community Governance:</strong> Platform decisions are made with community input.</li>
              </ul>
              
              <div className="mt-8 flex justify-center">
                <Button asChild size="lg" className="mr-4">
                  <Link to="/marketplace">Explore Marketplace</Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="dark:text-white dark:border-gray-700 dark:hover:bg-gray-800">
                  <Link to="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
