import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PFPBanner() {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl">
      {/* Background with blue sky and clouds */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1517483000871-1dbf64a6e1c6?auto=format&fit=crop&w=1400&q=80" 
          alt="Sky with clouds" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between min-h-[200px] pt-24">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="h-12 w-12 rounded-full bg-pink-500 flex items-center justify-center mr-2 border-2 border-white">
              <img 
                src="https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&w=60&q=80" 
                alt="Cool Cats"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Cool Cats
              <CheckCircle className="h-5 w-5 text-blue-400" fill="#60a5fa" />
            </h1>
          </div>
          <p className="mt-2 text-gray-200 text-sm">by CoolCatsNFT • Created Jun 28, 2021</p>
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