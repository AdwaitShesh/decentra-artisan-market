import { Link } from "react-router-dom";
import { 
  Home, 
  ShoppingBag, 
  Users, 
  Image, 
  Music, 
  GalleryHorizontalEnd,
  Users2,
  Settings
} from "lucide-react";

type SidebarItem = {
  id: string;
  name: string;
  path: string;
  icon: React.ReactNode;
};

const sidebarItems: SidebarItem[] = [
  {
    id: "all",
    name: "All",
    path: "/marketplace",
    icon: <Home className="w-5 h-5" />
  },
  {
    id: "gaming",
    name: "Gaming",
    path: "/marketplace/gaming",
    icon: <ShoppingBag className="w-5 h-5" />
  },
  {
    id: "memberships",
    name: "Memberships",
    path: "/marketplace/memberships",
    icon: <Users2 className="w-5 h-5" />
  },
  {
    id: "pfps",
    name: "PFPs",
    path: "/marketplace/pfps",
    icon: <Users className="w-5 h-5" />
  },
  {
    id: "photography",
    name: "Photography",
    path: "/marketplace/photography",
    icon: <Image className="w-5 h-5" />
  },
  {
    id: "music",
    name: "Music",
    path: "/marketplace/music",
    icon: <Music className="w-5 h-5" />
  },
  {
    id: "art",
    name: "Art",
    path: "/marketplace/art",
    icon: <GalleryHorizontalEnd className="w-5 h-5" />
  }
];

interface SidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function Sidebar({ activeCategory, onCategoryChange }: SidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-16 lg:w-64 bg-gray-900 border-r border-gray-800 hidden md:block">
      <div className="py-20">
        <div className="space-y-2 px-3">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onCategoryChange(item.id)}
              className={`flex items-center w-full px-3 py-2.5 rounded-lg font-medium transition-colors ${
                activeCategory === item.id 
                ? "bg-gray-800 text-white" 
                : "text-gray-400 hover:text-white hover:bg-gray-800/50"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  {item.icon}
                  <span className="hidden lg:block truncate">{item.name}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 px-3">
        <button className="flex items-center w-full px-3 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800/50 transition-colors">
          <div className="flex items-center space-x-3">
            <Settings className="w-5 h-5" />
            <span className="hidden lg:block">Settings</span>
          </div>
        </button>
      </div>
    </div>
  );
} 