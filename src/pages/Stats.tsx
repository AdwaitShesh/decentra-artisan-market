import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowUpRight, ChevronDown, Filter, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Mock Data for Top Collections
const topCollections = [
    {
        id: 1,
        name: "Bored Ape Yacht Club",
        image: "/assets/nft/collection-2.jpg",
        volume: "1,240 ETH",
        change: "+12.5%",
        floor: "12.5 ETH",
        sales: 145,
        positive: true
    },
    {
        id: 2,
        name: "CryptoPunks",
        image: "/assets/nft/collection-1.jpg",
        volume: "980 ETH",
        change: "-5.2%",
        floor: "45.0 ETH",
        sales: 89,
        positive: false
    },
    {
        id: 3,
        name: "Azuki",
        image: "/assets/nft/collection-3.jpg",
        volume: "850 ETH",
        change: "+8.4%",
        floor: "5.2 ETH",
        sales: 210,
        positive: true
    },
    {
        id: 4,
        name: "Doodles",
        image: "/assets/nft/hero-main.png",
        volume: "620 ETH",
        change: "+2.1%",
        floor: "2.8 ETH",
        sales: 156,
        positive: true
    },
    {
        id: 5,
        name: "Clone X",
        image: "/assets/nft/hero-right.png",
        volume: "540 ETH",
        change: "-1.5%",
        floor: "3.1 ETH",
        sales: 112,
        positive: false
    },
    {
        id: 6,
        name: "Moonbirds",
        image: "/assets/nft/hero-left.png",
        volume: "410 ETH",
        change: "+0.8%",
        floor: "1.5 ETH",
        sales: 98,
        positive: true
    }
];

const Stats = () => {
    const [mintedNFTs, setMintedNFTs] = useState<any[]>([]);

    useEffect(() => {
        // Fetch locally minted NFTs to add to the stats
        const fetchLocalNFTs = () => {
            try {
                const storedNFTs = localStorage.getItem('createdNFT');
                if (storedNFTs) {
                    const nft = JSON.parse(storedNFTs);
                    // Create a mock collection entry for the user's minted NFT
                    const userDrop = {
                        id: 99,
                        name: nft.name || "My Collection",
                        image: nft.image || "/assets/nft/abstract-art.png",
                        volume: "0.05 ETH", // Simulated volume
                        change: "+100%",
                        floor: "0.05 ETH", // Simulated floor based on mint
                        sales: 1,
                        positive: true,
                        isLocal: true
                    };
                    setMintedNFTs([userDrop]);
                }
            } catch (error) {
                console.error("Error fetching local NFTs:", error);
            }
        };

        fetchLocalNFTs();
    }, []);

    // Combine mock data with local data
    const allCollections = [...mintedNFTs, ...topCollections];

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <Navbar />

            <main className="pt-28 pb-16 container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl md:text-4xl font-bold dark:text-white">Collection Stats</h1>

                    <div className="flex gap-2">
                        <Button variant="outline" className="gap-2">
                            Last 24h <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" className="gap-2">
                            All Chains <ChevronDown className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="trending" className="w-full">
                    <TabsList className="mb-8 bg-muted/50 p-1">
                        <TabsTrigger value="trending" className="px-6">Trending</TabsTrigger>
                        <TabsTrigger value="top" className="px-6">Top</TabsTrigger>
                        <TabsTrigger value="watchlist" className="px-6">Watchlist</TabsTrigger>
                    </TabsList>

                    <TabsContent value="trending" className="space-y-4">
                        <div className="rounded-xl border border-border bg-card overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-border bg-muted/30 text-muted-foreground text-sm">
                                            <th className="p-4 font-medium w-16">#</th>
                                            <th className="p-4 font-medium">Collection</th>
                                            <th className="p-4 font-medium text-right">Floor Price</th>
                                            <th className="p-4 font-medium text-right">Volume</th>
                                            <th className="p-4 font-medium text-right">Change</th>
                                            <th className="p-4 font-medium text-right">Sales</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {allCollections.map((collection, index) => (
                                            <tr
                                                key={collection.id}
                                                className={`border-b border-border/50 hover:bg-muted/50 transition-colors ${collection.isLocal ? 'bg-bharat-purple/5' : ''}`}
                                            >
                                                <td className="p-4 font-medium text-muted-foreground">{index + 1}</td>
                                                <td className="p-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="h-12 w-12 rounded-xl overflow-hidden bg-muted">
                                                            <img
                                                                src={collection.image}
                                                                alt={collection.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-bold flex items-center gap-2">
                                                                {collection.name}
                                                                {collection.isLocal && (
                                                                    <span className="text-[10px] bg-bharat-purple text-white px-1.5 py-0.5 rounded-full">NEW</span>
                                                                )}
                                                            </div>
                                                            {collection.isLocal && (
                                                                <div className="text-xs text-muted-foreground">Your Drop</div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4 text-right font-medium">{collection.floor}</td>
                                                <td className="p-4 text-right font-medium">{collection.volume}</td>
                                                <td className={`p-4 text-right font-medium ${collection.positive ? 'text-green-500' : 'text-red-500'}`}>
                                                    {collection.change}
                                                </td>
                                                <td className="p-4 text-right font-medium">{collection.sales}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="top">
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-muted-foreground text-lg mb-4">Top collections data is loading...</p>
                            <Button variant="outline">Refresh Data</Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="watchlist">
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <p className="text-muted-foreground text-lg mb-4">Connect wallet to view your watchlist</p>
                            <Button className="bg-bharat-purple hover:bg-bharat-purple/90">Connect Wallet</Button>
                        </div>
                    </TabsContent>
                </Tabs>
            </main>

            <Footer />
        </div>
    );
};

export default Stats;
