import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MembershipBanner() {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl">
      {/* Background with gradient */}
      <div className="absolute inset-0 z-0">
        <div className="grid grid-cols-4 h-full w-full">
          <div className="bg-purple-900"></div>
          <div className="bg-blue-600"></div>
          <div className="bg-orange-500"></div>
          <div className="bg-green-500"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between min-h-[200px]">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-white flex items-center justify-center">
              <span className="text-purple-900 text-3xl font-bold">Z</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              ZenCommunity
              <CheckCircle className="h-5 w-5 text-blue-400" fill="#60a5fa" />
            </h1>
          </div>
          <p className="mt-2 text-gray-200 text-sm">Official membership collection</p>
          <p className="mt-4 text-gray-200 text-sm">Exclusive membership NFTs for the Zen Community</p>
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