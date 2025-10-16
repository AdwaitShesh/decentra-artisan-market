import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  SlidersHorizontal, 
  X, 
  Check
} from "lucide-react";

export const MarketplaceFilters = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [activePrice, setActivePrice] = useState("all");
  const [activeSale, setActiveSale] = useState("all");
  
  const priceOptions = [
    { id: "all", label: "All Prices" },
    { id: "0-1", label: "< 1 ETH" },
    { id: "1-5", label: "1 - 5 ETH" },
    { id: "5-10", label: "5 - 10 ETH" },
    { id: "10+", label: "> 10 ETH" }
  ];
  
  const saleOptions = [
    { id: "all", label: "All Items" },
    { id: "buy-now", label: "Buy Now" },
    { id: "on-auction", label: "On Auction" },
    { id: "new", label: "New" },
    { id: "has-offers", label: "Has Offers" }
  ];
  
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-gray-800 flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            <span>Filter & Sort</span>
            <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </Button>
          
          {/* Active filters indicators */}
          {(activePrice !== "all" || activeSale !== "all") && (
            <div className="flex items-center gap-2">
              {activePrice !== "all" && (
                <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {priceOptions.find(option => option.id === activePrice)?.label}
                  <button onClick={() => setActivePrice("all")} className="text-gray-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              )}
              
              {activeSale !== "all" && (
                <div className="flex items-center gap-1 bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {saleOptions.find(option => option.id === activeSale)?.label}
                  <button onClick={() => setActiveSale("all")} className="text-gray-400 hover:text-white">
                    <X size={14} />
                  </button>
                </div>
              )}
              
              <button 
                onClick={() => {
                  setActivePrice("all");
                  setActiveSale("all");
                }}
                className="text-gray-400 hover:text-white text-sm underline"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
        
        <div className="text-gray-400 text-sm">
          10,245 items
        </div>
      </div>
      
      {/* Filter panels */}
      {showFilters && (
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Price filter */}
          <div>
            <h3 className="font-semibold mb-4">Price</h3>
            <div className="space-y-2">
              {priceOptions.map((option) => (
                <button
                  key={option.id}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                    activePrice === option.id 
                      ? "bg-blue-900/30 text-blue-400" 
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                  onClick={() => setActivePrice(option.id)}
                >
                  <span>{option.label}</span>
                  {activePrice === option.id && <Check size={16} className="text-blue-400" />}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sale type filter */}
          <div>
            <h3 className="font-semibold mb-4">Sale Type</h3>
            <div className="space-y-2">
              {saleOptions.map((option) => (
                <button
                  key={option.id}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-md transition-colors ${
                    activeSale === option.id 
                      ? "bg-blue-900/30 text-blue-400" 
                      : "text-gray-300 hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveSale(option.id)}
                >
                  <span>{option.label}</span>
                  {activeSale === option.id && <Check size={16} className="text-blue-400" />}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
