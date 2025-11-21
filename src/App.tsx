import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Index from "./pages/Index";
import Marketplace from "./pages/Marketplace";
import NFTDetail from "./pages/NFTDetail";
import Artists from "./pages/Artists";
import Patents from "./pages/Patents";
import About from "./pages/About";
import Drops from "./pages/Drops";
import Stats from "./pages/Stats";
import MyNFTs from "./pages/MyNFTs";
import NotFound from "./pages/NotFound";
// Import community pages
import CommunityGroups from "./pages/community/Groups";
import DirectMessages from "./pages/community/DirectMessages";
import CommunityFriends from "./pages/community/Friends";
import CommunityFeed from "./pages/community/Feed";
// Import release pages
import ReleaseStart from "./pages/release/Start";
import ReleaseGuide from "./pages/release/Guide";
import DigitalArt from "./pages/release/DigitalArt";
// Import create pages
import ArtistInfo from "./pages/create/ArtistInfo";
import Checklist from "./pages/create/Checklist";
import CreateNFT from "./pages/create/Mint";
import Success from "./pages/create/Success";

const queryClient = new QueryClient();

const App = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Once mounted, we can access the theme
  useEffect(() => {
    setMounted(true);
  }, []);

  // Set dark mode class on document for better global styling
  useEffect(() => {
    if (mounted) {
      const isDark = resolvedTheme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);
    }
  }, [mounted, resolvedTheme]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background text-foreground antialiased transition-colors duration-300">
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/marketplace/:chain/:tokenId" element={<NFTDetail />} />
              <Route path="/artists" element={<Artists />} />
              <Route path="/patents" element={<Patents />} />
              <Route path="/about" element={<About />} />
              <Route path="/drops" element={<Drops />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/my-nfts" element={<MyNFTs />} />

              {/* Community Routes */}
              <Route path="/community/groups" element={<CommunityGroups />} />
              <Route path="/community/direct-messages" element={<DirectMessages />} />
              <Route path="/community/friends" element={<CommunityFriends />} />
              <Route path="/community/feed" element={<CommunityFeed />} />

              {/* Release Your Art Routes */}
              <Route path="/release/start" element={<ReleaseStart />} />
              <Route path="/release/guide" element={<ReleaseGuide />} />
              <Route path="/release/digital-art" element={<DigitalArt />} />

              {/* Create NFT Routes */}
              <Route path="/create/artist-info" element={<ArtistInfo />} />
              <Route path="/create/checklist" element={<Checklist />} />
              <Route path="/create/mint" element={<CreateNFT />} />
              <Route path="/create/success" element={<Success />} />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
