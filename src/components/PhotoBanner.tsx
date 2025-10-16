import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PhotoBanner() {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1583356322882-85559b782ded?auto=format&fit=crop&w=1920&q=80"
          alt="Photography collection"
          className="w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between min-h-[240px]">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-800">
              <img 
                src="https://images.unsplash.com/photo-1583356322882-85559b782ded?auto=format&fit=crop&w=120&q=80" 
                alt="Photography NFTs" 
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Editions x Teexels
              <CheckCircle className="h-5 w-5 text-blue-400" fill="#60a5fa" />
            </h1>
          </div>
          <p className="mt-2 text-gray-300 text-sm">by Teexels</p>
          <p className="mt-4 text-gray-300 text-sm">9 items · 0.00024 ETH</p>
        </div>
        <Button 
          className="bg-white text-black hover:bg-gray-200 transition"
        >
          View collection
        </Button>
      </div>
    </div>
  );
} 