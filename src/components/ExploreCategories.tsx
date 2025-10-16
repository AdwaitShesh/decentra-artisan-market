import { Palette, Gamepad2, Award, Users, Camera, Music, Ghost } from "lucide-react";

interface ExploreCategoriesProps {
  onCategoryClick: (category: string) => void;
}

const categories = [
  {
    id: "art",
    name: "Art",
    icon: <Palette className="h-6 w-6" />,
    color: "bg-blue-500/10",
    textColor: "text-blue-500",
    description: "Explore digital art, drawings, paintings and more",
  },
  {
    id: "gaming",
    name: "Gaming",
    icon: <Gamepad2 className="h-6 w-6" />,
    color: "bg-purple-500/10",
    textColor: "text-purple-500",
    description: "Game assets, virtual worlds and playable items",
  },
  {
    id: "memberships",
    name: "Memberships",
    icon: <Award className="h-6 w-6" />,
    color: "bg-amber-500/10",
    textColor: "text-amber-500",
    description: "Exclusive access to communities and benefits",
  },
  {
    id: "pfps",
    name: "PFPs",
    icon: <Users className="h-6 w-6" />,
    color: "bg-green-500/10",
    textColor: "text-green-500",
    description: "Profile pictures and identity collections",
  },
  {
    id: "photography",
    name: "Photography",
    icon: <Camera className="h-6 w-6" />,
    color: "bg-rose-500/10",
    textColor: "text-rose-500",
    description: "Digital photography, photo art and photojournalism",
  },
  {
    id: "music",
    name: "Music",
    icon: <Music className="h-6 w-6" />,
    color: "bg-indigo-500/10",
    textColor: "text-indigo-500",
    description: "Music, sounds, beats and audio experiences",
  },
  {
    id: "collectibles",
    name: "Collectibles",
    icon: <Ghost className="h-6 w-6" />,
    color: "bg-orange-500/10",
    textColor: "text-orange-500",
    description: "Curated items and rare digital collectibles",
  }
];

export const ExploreCategories = ({ onCategoryClick }: ExploreCategoriesProps) => {
  return (
    <div className="mb-16">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Explore Categories</h2>
        <p className="text-gray-400 mt-1">Browse NFTs by category</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div 
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className="bg-gray-900 rounded-lg p-6 cursor-pointer hover:bg-gray-800 transition-colors duration-300"
          >
            <div className={`${category.color} ${category.textColor} rounded-full w-12 h-12 flex items-center justify-center mb-4`}>
              {category.icon}
            </div>
            <h3 className="font-semibold text-xl mb-2">{category.name}</h3>
            <p className="text-gray-400 text-sm">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 