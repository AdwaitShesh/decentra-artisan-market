import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { CategoryItem } from "./CategoryData";

interface CategorySectionProps {
  title: string;
  items: CategoryItem[];
  categoryId: string;
  onCategoryClick: (category: string) => void;
}

export const CategorySection = ({
  title,
  items,
  categoryId,
  onCategoryClick,
}: CategorySectionProps) => {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-500">{title}</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"></div>
        </div>
        <Button 
          variant="ghost" 
          onClick={() => onCategoryClick(categoryId)}
          className="text-white border-gray-700 hover:bg-gray-800/50 px-6 rounded-xl group"
        >
          <span>View All</span>
          <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, i) => (
          <div 
            key={item.id} 
            className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/10 border border-gray-800/50 group hover:-translate-y-1"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.3s ease',
              transitionDelay: `${i * 0.05}s`
            }}
          >
            <div className="relative aspect-square overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1 mb-2">
                <h3 className="font-semibold text-lg truncate">{item.name}</h3>
                {item.verified && (
                  <CheckCircle size={16} className="text-indigo-400 flex-shrink-0" />
                )}
              </div>
              <p className="text-gray-400 text-sm mb-4">{item.artist}</p>
              <div className="flex justify-between mt-3 pt-3 border-t border-gray-800/50">
                <div>
                  <p className="text-xs text-gray-500">Floor</p>
                  <p className="font-medium text-white">{item.floorPrice} ETH</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Price</p>
                  <p className="font-medium text-white">{item.price} ETH</p>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          </div>
        ))}
      </div>
    </div>
  );
}; 