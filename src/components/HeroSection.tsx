import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Compass, Palette, ShieldCheck, Image, Zap, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section className="pt-28 pb-16 px-4 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bharat-purple/10 border border-bharat-purple/20 text-bharat-purple text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4" />
              <span>Next Gen NFT Marketplace</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-poppins leading-tight dark:text-white">
              Empower Your
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-bharat-teal to-bharat-purple block mt-2">
                Creative Journey
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 md:pr-12 leading-relaxed">
              A decentralized, artist-centric NFT marketplace that empowers creators,
              artists, and small businesses to mint, showcase, and trade their work
              in a secure environment.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-gradient-to-r from-bharat-teal to-bharat-purple hover:opacity-90 transition text-lg h-12 px-8 shadow-lg shadow-bharat-purple/25"
                asChild
              >
                <Link to="/marketplace">
                  Explore Marketplace
                  <Compass className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" className="h-12 text-lg px-8 border-2 hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
                <Link to="/release/digital-art">
                  Start Creating
                  <Palette className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-bharat-teal/10 group-hover:bg-bharat-teal/20 transition-colors">
                  <Palette className="text-bharat-teal h-5 w-5" />
                </div>
                <span className="font-medium dark:text-gray-200">Artist-Friendly</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-bharat-purple/10 group-hover:bg-bharat-purple/20 transition-colors">
                  <ShieldCheck className="text-bharat-purple h-5 w-5" />
                </div>
                <span className="font-medium dark:text-gray-200">Secure Contracts</span>
              </div>
              <div className="flex items-center gap-3 group">
                <div className="p-2 rounded-lg bg-bharat-saffron/10 group-hover:bg-bharat-saffron/20 transition-colors">
                  <Image className="text-bharat-saffron h-5 w-5" />
                </div>
                <span className="font-medium dark:text-gray-200">NFT Patents</span>
              </div>
            </div>
          </motion.div>

          <div className="relative perspective-1000">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-bharat-purple/30 to-bharat-teal/30 rounded-full blur-[100px] -z-10 animate-pulse-slow"></div>

            <motion.div
              initial={{ opacity: 0, y: 50, rotateY: -10 }}
              animate={{ opacity: 1, y: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, type: "spring" }}
              className="relative z-10 mx-auto w-full max-w-md"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Main Card */}
              <div className="relative bg-white/10 dark:bg-black/40 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-3xl p-4 shadow-2xl">
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
                  <img
                    src="/assets/nft/hero-main.png"
                    alt="Cosmic Resonance NFT"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />

                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Content inside card */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-2xl font-bold mb-1">Cosmic Resonance</h3>
                    <p className="text-white/80 text-sm mb-4">by @StellarArtist</p>

                    <div className="flex items-center justify-between bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10">
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">Current Bid</p>
                        <p className="text-white font-bold text-lg">2.45 ETH</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-xs uppercase tracking-wider">Ending In</p>
                        <p className="text-white font-bold text-lg">12h 43m</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Recent Activity</p>
                    <p className="font-bold dark:text-white">+12.5% Growth</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 overflow-hidden">
                      <img src="/assets/nft/avatar-pfp.jpg" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-300 overflow-hidden">
                      <img src="/assets/nft/character-art.jpg" alt="User" className="w-full h-full object-cover" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-400 overflow-hidden">
                      <img src="/assets/nft/membership-badge.jpg" alt="User" className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div>
                    <p className="font-bold dark:text-white">10k+ Users</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Joined this week</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
