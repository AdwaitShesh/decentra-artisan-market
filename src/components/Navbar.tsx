import { useState, useEffect } from "react";
import { ethers } from 'ethers';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  Search,
  Bell,
  ShoppingCart,
  User,
  Menu,
  X,
  ExternalLink,
  LogIn,
  ChevronDown,
  MessageSquare,
  PenTool,
  Users,
  Image
} from "lucide-react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isWalletConnected, setWalletConnected] = useState(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            setWalletConnected(true);
          }
        } catch (error) {
          console.error("Error checking for wallet connection:", error);
        }
      }
    };

    checkWalletConnection();

    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        setWalletConnected(true);
      } catch (error) {
        console.error("Failed to connect wallet:", error);
      }
    } else {
      alert("MetaMask is not installed. Please install it to use this feature.");
    }
  };

  const handleClickOutside = () => {
    setActiveDropdown(null);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-gray-950/90 backdrop-blur-lg shadow-lg" : "bg-gray-950 border-b border-gray-800/50"
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group mr-6">
            <div className="relative h-10 w-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30">
              <span className="text-white font-bold text-lg relative z-10">B</span>
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
            </div>
            <div className="font-bold text-xl tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">Bharat</span>
              <span className="text-pink-500">NFT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/marketplace" className="text-white font-medium hover:text-purple-400 transition-colors duration-300">
              Marketplace
            </Link>
            <Link to="/drops" className="text-gray-400 font-medium hover:text-purple-400 transition-colors duration-300">
              Drops
            </Link>

            {/* Community Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('community')}
                className="text-gray-400 font-medium hover:text-purple-400 transition-colors duration-300 flex items-center"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Community
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${activeDropdown === 'community' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'community' && (
                <div className="absolute left-0 mt-2 w-60 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50">
                  <div className="p-2 space-y-1">
                    <Link
                      to="/community/feed"
                      className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <ExternalLink size={16} className="text-purple-400" />
                      <span>Community Feed</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Release Your Art Dropdown */}
            <div className="relative group">
              <button
                onClick={() => toggleDropdown('release')}
                className="text-gray-400 font-medium hover:text-purple-400 transition-colors duration-300 flex items-center"
              >
                <PenTool className="mr-2 h-4 w-4" />
                Release Your Art
                <ChevronDown className={`ml-2 h-4 w-4 transition-transform ${activeDropdown === 'release' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'release' && (
                <div className="absolute left-0 mt-2 w-60 bg-gray-900 border border-gray-800 rounded-xl shadow-xl z-50">
                  <div className="p-2 space-y-1">
                    <Link
                      to="/release/start"
                      className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <Image size={16} className="text-purple-400" />
                      <span>Get Started</span>
                    </Link>
                    <Link
                      to="/release/guide"
                      className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <ExternalLink size={16} className="text-purple-400" />
                      <span>NFT Creation Guide</span>
                    </Link>
                    <Link
                      to="/create/mint"
                      className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors bg-gray-800/50"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <Image size={16} className="text-pink-400" />
                      <span>Mint NFT</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link to="/stats" className="text-gray-400 font-medium hover:text-purple-400 transition-colors duration-300">
              Stats
            </Link>
          </nav>

          {/* Search and Action Buttons */}
          <div className="hidden md:flex items-center">
            {/* Search */}
            <div className="relative group mr-4">
              <div className="overflow-hidden transition-all duration-300 w-10 group-hover:w-64 focus-within:w-64">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-400 transition-colors duration-200 z-10 h-10 w-10"
                >
                  <Search className="h-5 w-5" />
                </Button>
                <Input
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 bg-gray-900/70 border-gray-800 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 rounded-xl transition-all duration-200 w-full opacity-0 group-hover:opacity-100 focus:opacity-100"
                />
              </div>
            </div>

            {/* Action Buttons Group */}
            <div className="flex items-center space-x-3 mx-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl">
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <ThemeToggle />
              <div className="relative group">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl overflow-hidden">
                  <img
                    src="https://randomuser.me/api/portraits/men/44.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </Button>
                <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2 z-50">
                  <div className="p-2">
                    <Link to="/profile" className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                      <User size={16} className="text-purple-400" />
                      <span>Profile</span>
                    </Link>
                    <Link to="/settings" className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                      <ExternalLink size={16} className="text-purple-400" />
                      <span>Settings</span>
                    </Link>
                    <Link to="/my-nfts" className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors">
                      <Image size={16} className="text-purple-400" />
                      <span>My NFTs</span>
                    </Link>
                    <hr className="my-1 border-gray-800" />
                    <Button variant="ghost" className="flex items-center gap-2 w-full rounded-lg p-2 text-sm text-gray-300 hover:bg-gray-800 justify-start font-normal">
                      <LogIn size={16} className="text-purple-400" />
                      <span>Sign Out</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Create and Connect Wallet Buttons */}
            <div className="flex items-center space-x-3">
              <Link to="/create/mint">
                <Button
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300"
                >
                  Mint NFT
                </Button>
              </Link>
              {isWalletConnected ? (
                <Button disabled className="bg-green-600 text-white border-0 rounded-xl shadow-md transition-all duration-300">
                  Wallet Connected
                </Button>
              ) : (
                <Button onClick={connectWallet} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 rounded-xl shadow-md hover:shadow-purple-500/20 transition-all duration-300">
                  Connect Wallet
                </Button>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl"
            onClick={toggleMobileMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-gray-800/50 p-4 animate-in fade-in slide-in-from-top duration-300">
          <nav className="flex flex-col space-y-3 py-2">
            <Link
              to="/marketplace"
              className="text-white hover:text-purple-400 transition-colors py-3 flex items-center gap-3 px-2 rounded-lg hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Marketplace</span>
            </Link>
            <Link
              to="/drops"
              className="text-gray-400 hover:text-purple-400 transition-colors py-3 flex items-center gap-3 px-2 rounded-lg hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Drops</span>
            </Link>

            {/* Mobile Community Dropdown */}
            <div className="py-1">
              <button
                onClick={() => toggleDropdown('mobile-community')}
                className="w-full text-left text-gray-400 hover:text-purple-400 transition-colors py-3 px-2 flex items-center justify-between rounded-lg hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Community</span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === 'mobile-community' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'mobile-community' && (
                <div className="pl-10 mt-2 space-y-2 border-l border-gray-800 ml-2">
                  <Link
                    to="/community/feed"
                    className="block text-gray-400 hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Community Feed
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Release Your Art Dropdown */}
            <div className="py-1">
              <button
                onClick={() => toggleDropdown('mobile-release')}
                className="w-full text-left text-gray-400 hover:text-purple-400 transition-colors py-3 px-2 flex items-center justify-between rounded-lg hover:bg-gray-800/50"
              >
                <div className="flex items-center gap-3">
                  <PenTool className="h-5 w-5 text-purple-400" />
                  <span className="font-medium">Release Your Art</span>
                </div>
                <ChevronDown className={`h-5 w-5 transition-transform ${activeDropdown === 'mobile-release' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'mobile-release' && (
                <div className="pl-10 mt-2 space-y-2 border-l border-gray-800 ml-2">
                  <Link
                    to="/release/start"
                    className="block text-gray-400 hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                  <Link
                    to="/release/guide"
                    className="block text-gray-400 hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    NFT Creation Guide
                  </Link>
                  <Link
                    to="/create/mint"
                    className="block text-gray-400 hover:text-purple-400 transition-colors py-2 px-3 rounded-lg hover:bg-gray-800/50"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Mint NFT
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/stats"
              className="text-gray-400 hover:text-purple-400 transition-colors py-3 flex items-center gap-3 px-2 rounded-lg hover:bg-gray-800/50"
              onClick={() => setIsMenuOpen(false)}
            >
              <span className="font-medium">Stats</span>
            </Link>
          </nav>

          <hr className="my-4 border-gray-800/50" />

          <div className="space-y-4">
            <div className="relative group">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-0 text-gray-400 hover:text-purple-400 transition-colors duration-200 z-10 h-12 w-12"
                >
                  <Search className="h-6 w-6" />
                </Button>
                <Input
                  placeholder="Search..."
                  className="pl-12 bg-gray-800/70 border-gray-700 text-white focus:border-purple-500 rounded-xl py-6 w-full"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link to="/create/mint" onClick={() => setIsMenuOpen(false)}>
                <Button
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-all duration-300 h-12 text-base"
                >
                  Mint NFT
                </Button>
              </Link>

              {isWalletConnected ? (
                <Button disabled className="w-full bg-green-600 text-white border-0 rounded-xl shadow-md transition-all duration-300 h-12 text-base">
                  Wallet Connected
                </Button>
              ) : (
                <Button onClick={connectWallet} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 rounded-xl shadow-md hover:shadow-purple-500/20 transition-all duration-300 h-12 text-base">
                  Connect Wallet
                </Button>
              )}
            </div>

            <div className="flex justify-around mt-4">
              <Button variant="ghost" size="icon" className="h-12 w-12 text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl">
                <Bell className="h-6 w-6" />
              </Button>
              <Button variant="ghost" size="icon" className="h-12 w-12 text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl">
                <ShoppingCart className="h-6 w-6" />
              </Button>
              <ThemeToggle className="h-12 w-12" />
              <Button variant="ghost" size="icon" className="h-12 w-12 text-gray-400 hover:text-white hover:bg-gray-800/70 rounded-xl overflow-hidden">
                <img
                  src="https://randomuser.me/api/portraits/men/44.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-lg"
                />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

