import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Bell, ExternalLink, Twitter, Instagram, Globe } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

// Mock Data for Drops
const heroDrop = {
    id: "hero-1",
    title: "Cyberpunk Chronicles: The Awakening",
    creator: "NeonGlitch Studios",
    description: "A collection of 10,000 unique cyberpunk avatars living on the Ethereum blockchain. Each avatar grants access to the exclusive Neon City metaverse.",
    image: "/assets/nft/drops-hero.jpg",
    date: "Nov 25, 2025",
    time: "09:00 PM IST",
    price: "0.08 ETH",
    items: 10000
};

const upcomingDrops = [
    {
        id: "drop-1",
        title: "Ethereal Spirits",
        creator: "AuraArt",
        image: "/assets/nft/drop-1.jpg",
        date: "Nov 28, 2025",
        time: "06:00 PM IST",
        price: "0.05 ETH"
    },
    {
        id: "drop-2",
        title: "Abstract Minds",
        creator: "PixelMaster",
        image: "/assets/nft/drop-2.jpg",
        date: "Dec 01, 2025",
        time: "12:00 PM IST",
        price: "0.12 ETH"
    },
    {
        id: "drop-3",
        title: "Cosmic Voyagers",
        creator: "SpaceCadet",
        image: "/assets/nft/drop-3.jpg",
        date: "Dec 05, 2025",
        time: "08:00 PM IST",
        price: "0.09 ETH"
    }
];

const pastDrops = [
    {
        id: "past-1",
        title: "Ancient Relics",
        creator: "HistoryBuff",
        image: "/assets/nft/drop-past-1.jpg",
        soldOut: true
    },
    {
        id: "past-2",
        title: "Digital Flora",
        creator: "NatureTech",
        image: "/assets/nft/drop-past-2.jpg",
        soldOut: true
    }
];

const Drops = () => {
    const handleRemindMe = (dropTitle: string) => {
        toast.success("Reminder Set!", {
            description: `We'll notify you before ${dropTitle} goes live.`,
        });
    };

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <Navbar />

            <main className="pt-28 pb-16">
                {/* Hero Section */}
                <section className="container mx-auto px-4 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="relative rounded-3xl overflow-hidden h-[60vh] md:h-[70vh] shadow-2xl"
                    >
                        <img
                            src={heroDrop.image}
                            alt={heroDrop.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                            <div className="max-w-3xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <Badge className="bg-bharat-purple hover:bg-bharat-purple/90 text-white px-3 py-1 text-sm">
                                        Featured Drop
                                    </Badge>
                                    <span className="text-white/80 font-medium flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                                        <Calendar className="h-4 w-4" /> {heroDrop.date}
                                    </span>
                                </div>

                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                                    {heroDrop.title}
                                </h1>
                                <p className="text-xl text-white/90 mb-8 font-medium">
                                    by {heroDrop.creator}
                                </p>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Button size="lg" className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8">
                                        View Drop
                                    </Button>
                                    <Button
                                        size="lg"
                                        variant="outline"
                                        className="bg-transparent border-white text-white hover:bg-white/10 font-bold text-lg px-8"
                                        onClick={() => handleRemindMe(heroDrop.title)}
                                    >
                                        <Bell className="mr-2 h-5 w-5" /> Remind Me
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Upcoming Drops */}
                <section className="container mx-auto px-4 mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold dark:text-white">Upcoming Drops</h2>
                        <Button variant="ghost" className="text-bharat-purple hover:text-bharat-purple/80">
                            View All <ExternalLink className="ml-2 h-4 w-4" />
                        </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {upcomingDrops.map((drop, index) => (
                            <motion.div
                                key={drop.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={drop.image}
                                        alt={drop.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <Button
                                            size="icon"
                                            variant="secondary"
                                            className="rounded-full bg-white/20 backdrop-blur-md hover:bg-white/40 text-white border border-white/20"
                                            onClick={() => handleRemindMe(drop.title)}
                                        >
                                            <Bell className="h-5 w-5" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-xl font-bold mb-1 group-hover:text-bharat-purple transition-colors">{drop.title}</h3>
                                            <p className="text-muted-foreground text-sm">by {drop.creator}</p>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Date</span>
                                            <span className="font-semibold flex items-center gap-1 mt-1">
                                                <Calendar className="h-3 w-3 text-bharat-teal" /> {drop.date}
                                            </span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">Price</span>
                                            <span className="font-semibold text-bharat-purple mt-1">{drop.price}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Past Drops */}
                <section className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-8 dark:text-white">Past Drops</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {pastDrops.map((drop) => (
                            <div key={drop.id} className="group rounded-xl overflow-hidden border border-border bg-card opacity-80 hover:opacity-100 transition-opacity">
                                <div className="relative aspect-square">
                                    <img
                                        src={drop.image}
                                        alt={drop.title}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span className="bg-black/80 text-white px-4 py-2 rounded-full font-bold border border-white/20">
                                            SOLD OUT
                                        </span>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold truncate">{drop.title}</h3>
                                    <p className="text-sm text-muted-foreground truncate">by {drop.creator}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Newsletter / Alert Section */}
                <section className="container mx-auto px-4 mt-24">
                    <div className="bg-gradient-to-r from-bharat-purple/10 to-bharat-teal/10 rounded-3xl p-8 md:p-12 text-center border border-bharat-purple/20">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Never Miss a Drop</h2>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                            Subscribe to our newsletter to get early access to upcoming drops, exclusive artist interviews, and market insights.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                            <Button className="h-12 px-8 bg-bharat-purple hover:bg-bharat-purple/90">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default Drops;
