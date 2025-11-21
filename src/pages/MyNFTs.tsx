import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, Tag, DollarSign, ExternalLink, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NFTImage } from "@/components/NFTImage";

const MyNFTs = () => {
    const [myNFTs, setMyNFTs] = useState<any[]>([]);
    const [totalRoyalty, setTotalRoyalty] = useState("0.00");

    useEffect(() => {
        const fetchMyNFTs = () => {
            try {
                const storedNFTs = localStorage.getItem('myMintedNFTs');
                if (storedNFTs) {
                    const nfts = JSON.parse(storedNFTs);
                    const fallbackImage = 'https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop';

                    // Simulate royalty earnings for demo purposes
                    const nftsWithRoyalty = nfts.map((nft: any) => {
                        // Random royalty between 0 and 0.5 ETH for demo
                        const earned = Math.random() > 0.7 ? (Math.random() * 0.5).toFixed(3) : "0.000";

                        // Fix for broken images: if image is fallback but tokenURI exists, try to use tokenURI
                        let displayImage = nft.image;
                        if ((!displayImage || displayImage === fallbackImage) && nft.tokenURI) {
                            // Pass the raw IPFS URI (e.g., ipfs://Qm...) to NFTImage
                            // NFTImage component handles the gateway rotation automatically
                            displayImage = nft.tokenURI;
                        }

                        return { ...nft, image: displayImage, royaltyEarned: earned };
                    });

                    setMyNFTs(nftsWithRoyalty);

                    // Calculate total
                    const total = nftsWithRoyalty.reduce((acc: number, curr: any) => acc + parseFloat(curr.royaltyEarned), 0);
                    setTotalRoyalty(total.toFixed(3));
                }
            } catch (error) {
                console.error("Error fetching my NFTs:", error);
            }
        };

        fetchMyNFTs();
    }, []);

    return (
        <div className="min-h-screen bg-background text-foreground font-inter">
            <Navbar />

            <main className="pt-28 pb-16 container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold dark:text-white mb-2">My Collection</h1>
                        <p className="text-muted-foreground">Manage your minted NFTs and track earnings.</p>
                    </div>

                    <Card className="bg-bharat-purple/10 border-bharat-purple/20 p-4 flex items-center gap-4">
                        <div className="bg-bharat-purple/20 p-3 rounded-full">
                            <DollarSign className="h-6 w-6 text-bharat-purple" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground font-medium">Total Royalties Earned</p>
                            <p className="text-2xl font-bold text-bharat-purple">{totalRoyalty} ETH</p>
                        </div>
                    </Card>
                </div>

                {myNFTs.length === 0 ? (
                    <div className="text-center py-20 bg-card border border-border rounded-2xl">
                        <div className="bg-muted h-20 w-20 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Tag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">No NFTs Minted Yet</h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            You haven't minted any NFTs yet. Start your creative journey by minting your first artwork.
                        </p>
                        <Link to="/create/mint">
                            <Button size="lg" className="bg-gradient-to-r from-bharat-teal to-bharat-purple">
                                Mint Your First NFT
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myNFTs.map((nft) => (
                            <Card key={nft.id} className="overflow-hidden border-border hover:shadow-lg transition-all duration-300 group">
                                <div className="relative aspect-square overflow-hidden bg-muted">
                                    <NFTImage
                                        src={nft.image}
                                        alt={nft.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-2 right-2">
                                        <Badge className="bg-black/60 backdrop-blur-md hover:bg-black/80 border-none text-white">
                                            Minted
                                        </Badge>
                                    </div>
                                </div>

                                <CardContent className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold truncate pr-2" title={nft.title}>{nft.title}</h3>
                                            <p className="text-xs text-muted-foreground">Token ID: #{nft.tokenId}</p>
                                        </div>
                                        <Badge variant="outline" className="text-xs">
                                            {nft.chain || 'Ethereum'}
                                        </Badge>
                                    </div>

                                    <div className="mt-4 space-y-2 bg-muted/30 p-3 rounded-lg">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Royalty Rate</span>
                                            <span className="font-medium">{nft.price ? (parseFloat(nft.price) * 10).toFixed(1) : '5.0'}%</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Earned</span>
                                            <span className="font-bold text-green-500">+{nft.royaltyEarned} ETH</span>
                                        </div>
                                    </div>
                                </CardContent>

                                <CardFooter className="p-4 pt-0 flex gap-2">
                                    <Link to={`/marketplace/${nft.chain || 'ethereum'}/${nft.tokenId}`} className="flex-1">
                                        <Button variant="outline" className="w-full text-xs h-9">
                                            <ExternalLink className="h-3 w-3 mr-2" /> View
                                        </Button>
                                    </Link>
                                    <Button variant="secondary" className="flex-1 text-xs h-9">
                                        <Share2 className="h-3 w-3 mr-2" /> Share
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default MyNFTs;
