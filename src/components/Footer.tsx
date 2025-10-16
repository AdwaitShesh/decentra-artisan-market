import { Link } from "react-router-dom";
import {
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  ArrowRight,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600"></div>
              <span className="text-xl font-bold">Bharat</span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-md">
              Bharat is the world's first and largest NFT marketplace for artisans and creators. Buy, sell, and discover exclusive digital items.
            </p>
            
            {/* Social icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          {/* Marketplace */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Marketplace</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors">
                  All NFTs
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=art" className="text-gray-400 hover:text-white transition-colors">
                  Art
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=music" className="text-gray-400 hover:text-white transition-colors">
                  Music
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=photography" className="text-gray-400 hover:text-white transition-colors">
                  Photography
                </Link>
              </li>
              <li>
                <Link to="/marketplace?category=memberships" className="text-gray-400 hover:text-white transition-colors">
                  Memberships
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Account</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/profile" className="text-gray-400 hover:text-white transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-400 hover:text-white transition-colors">
                  Favorites
                </Link>
              </li>
              <li>
                <Link to="/watchlist" className="text-gray-400 hover:text-white transition-colors">
                  Watchlist
                </Link>
              </li>
              <li>
                <Link to="/my-collections" className="text-gray-400 hover:text-white transition-colors">
                  My Collections
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-400 hover:text-white transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/help-center" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/platform-status" className="text-gray-400 hover:text-white transition-colors">
                  Platform Status
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/newsletter" className="text-gray-400 hover:text-white transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="mt-16 border-t border-gray-800 pt-8">
          <div className="max-w-md">
            <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="text-gray-400 mb-4">Get the latest Bharat updates and NFT drops directly to your inbox.</p>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-900 border-gray-700 text-white focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Copyright and links */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between gap-4">
          <p className="text-gray-400">© 2023 Bharat. All rights reserved.</p>
          <div className="flex flex-wrap gap-6">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
