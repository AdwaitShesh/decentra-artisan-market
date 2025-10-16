import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ArtBanner() {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl">
      {/* Background with colorful abstract art */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=1400&q=80" 
          alt="Colorful abstract art" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between min-h-[200px] pt-24">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Winds of Yawanawa by Yawanawa and Refik Anadol
              <CheckCircle className="h-5 w-5 text-blue-400" fill="#60a5fa" />
            </h1>
          </div>
          <p className="mt-2 text-gray-200 text-sm">by Yawanawa • created on May 9, 2023</p>
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