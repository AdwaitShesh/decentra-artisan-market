import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function GamingBanner() {
  return (
    <div className="mb-8 relative overflow-hidden rounded-2xl h-[240px]">
      {/* Background - space themed */}
      <div className="absolute inset-0 bg-[#030c24] z-0">
        {/* Stars */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[10%] left-[20%] w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-[30%] left-[40%] w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-[15%] left-[70%] w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-[60%] left-[85%] w-2 h-2 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-[75%] left-[30%] w-1 h-1 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-[45%] left-[15%] w-1.5 h-1.5 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-[50%] left-[60%] w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-[25%] left-[90%] w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-[80%] left-[75%] w-1.5 h-1.5 bg-white rounded-full opacity-80"></div>
          <div className="absolute top-[5%] left-[50%] w-1 h-1 bg-white rounded-full opacity-70"></div>
          <div className="absolute top-[40%] left-[25%] w-2 h-2 bg-white rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-[70%] left-[65%] w-1 h-1 bg-white rounded-full opacity-60"></div>
          <div className="absolute top-[20%] left-[80%] w-1.5 h-1.5 bg-white rounded-full opacity-70 animate-pulse"></div>
          
          {/* Colored stars */}
          <div className="absolute top-[65%] left-[45%] w-1.5 h-1.5 bg-teal-400 rounded-full opacity-80 animate-pulse"></div>
          <div className="absolute top-[35%] left-[75%] w-2 h-2 bg-purple-500 rounded-full opacity-70"></div>
          <div className="absolute top-[55%] left-[10%] w-1.5 h-1.5 bg-yellow-300 rounded-full opacity-80"></div>
        </div>
        
        {/* Floating game characters */}
        <div className="absolute top-[15%] left-[15%] w-16 h-16 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-500 overflow-hidden flex items-center justify-center shadow-lg">
          <img src="https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&w=70&q=80" alt="Character" className="w-12 h-12 rounded-full object-cover" />
        </div>
        
        <div className="absolute top-[55%] right-[30%] w-20 h-20 rounded-full bg-gradient-to-b from-green-300 to-green-500 overflow-hidden flex items-center justify-center shadow-lg">
          <img src="https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=90&q=80" alt="Character" className="w-16 h-16 rounded-full object-cover" />
        </div>
        
        <div className="absolute top-[25%] right-[15%] w-24 h-24 rounded-full bg-gradient-to-b from-purple-300 to-purple-600 overflow-hidden flex items-center justify-center shadow-lg">
          <img src="https://images.unsplash.com/photo-1618336753974-aae8e04506aa?auto=format&fit=crop&w=100&q=80" alt="Character" className="w-20 h-20 rounded-full object-cover" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-8 md:p-12 flex flex-col h-full justify-end">
        <div className="mb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2">
              MapleStory Universe - Reserved Name
              <CheckCircle className="h-5 w-5 text-blue-400" fill="#60a5fa" />
            </h1>
          </div>
          <p className="mt-2 text-gray-200 text-sm">by MapleStory Official</p>
        </div>
        <div className="mt-4">
          <Button 
            className="bg-white text-black hover:bg-gray-200 transition"
          >
            View collection
          </Button>
        </div>
      </div>
    </div>
  );
} 