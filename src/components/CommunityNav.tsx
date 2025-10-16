import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  MessageSquare, 
  UserRound, 
  Globe
} from "lucide-react";

export function CommunityNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  
  const links = [
    {
      href: "/community/groups",
      label: "Groups",
      icon: <Users className="h-5 w-5" />
    },
    {
      href: "/community/direct-messages",
      label: "Messages",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      href: "/community/friends",
      label: "Friends",
      icon: <UserRound className="h-5 w-5" />
    },
    {
      href: "/community/feed",
      label: "Feed",
      icon: <Globe className="h-5 w-5" />
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-4 mb-6 border border-gray-800">
      <nav className="flex flex-wrap gap-2">
        {links.map((link) => {
          const isActive = currentPath === link.href;
          return (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive 
                  ? "bg-purple-600 text-white" 
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
} 