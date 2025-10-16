import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Palette, ShieldCheck, Image } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-28 pb-16 px-4 md:pt-36 md:pb-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight dark:text-white">
              Empower Your
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-bharat-teal to-bharat-purple block">
                Creative Journey
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 md:pr-12">
              A decentralized, artist-centric NFT marketplace that empowers creators, 
              artists, and small businesses to mint, showcase, and trade their work 
              in a secure environment.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-gradient-to-r from-bharat-teal to-bharat-purple hover:opacity-90 transition text-lg h-12 px-6" 
                asChild
              >
                <Link to="/marketplace">
                  Explore Marketplace
                  <Compass className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="h-12 text-lg">
                Start Creating
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-2">
                <Palette className="text-bharat-teal h-5 w-5" />
                <span className="font-medium dark:text-gray-200">Artist-Friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="text-bharat-purple h-5 w-5" />
                <span className="font-medium dark:text-gray-200">Secure Contracts</span>
              </div>
              <div className="flex items-center gap-2">
                <Image className="text-bharat-saffron h-5 w-5" />
                <span className="font-medium dark:text-gray-200">NFT Patents</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <div className="w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-bharat-teal to-bharat-purple rounded-2xl shadow-xl rotate-3 animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=640&q=80" 
                  alt="Digital Art"
                  className="w-full h-full object-cover rounded-2xl opacity-90 mix-blend-overlay"
                />
              </div>
              <div className="absolute -bottom-12 -left-12 w-48 h-48 md:w-56 md:h-56 bg-gradient-to-br from-bharat-blue to-bharat-saffron rounded-2xl shadow-xl -rotate-6 animate-float" style={{ animationDelay: "1s" }}>
                <img 
                  src="https://images.unsplash.com/photo-1561214115-f2f134cc4912?auto=format&fit=crop&w=480&q=80" 
                  alt="Traditional Art"
                  className="w-full h-full object-cover rounded-2xl opacity-90 mix-blend-overlay"
                />
              </div>
              <div className="absolute -top-8 -right-8 w-36 h-36 md:w-44 md:h-44 bg-gradient-to-br from-bharat-purple to-bharat-saffron rounded-2xl shadow-xl rotate-12 animate-float" style={{ animationDelay: "2s" }}>
                <img 
                  src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?auto=format&fit=crop&w=360&q=80" 
                  alt="Handcrafted Art"
                  className="w-full h-full object-cover rounded-2xl opacity-90 mix-blend-overlay"
                />
              </div>
            </div>
            <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-bharat-purple/20 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
