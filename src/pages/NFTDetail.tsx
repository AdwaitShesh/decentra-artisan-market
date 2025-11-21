import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NFTImage } from '@/components/NFTImage';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { fetchNFTsFromChain } from '@/lib/nftFetcher';
import { listItem, buyItem, fetchListing, getMarketplaceAddress } from '@/lib/marketplace';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useNFTContract } from '@/lib/nftContract';
import { ethers } from 'ethers';
import { Heart, Share2, User, Wallet, Eye, TrendingUp, MessageSquare } from 'lucide-react';
import { toast } from 'sonner';
import { Post } from './community/Feed';

interface NFTDetailData {
  tokenId: string;
  name: string;
  description: string;
  image: string;
  creator: string;
  owner: string;
  price?: string;
  royalty: string;
  attributes: Array<{ trait_type: string; value: string | number; }>;
  chain: string;
  contractAddress: string;
  isListed: boolean;
  priceWei?: bigint;
}

const NFTDetail = () => {
  const { chain, tokenId } = useParams<{ chain: string; tokenId: string }>();
  const navigate = useNavigate();
  const { account, approve, getApproved } = useNFTContract(chain || 'ethereum');
  
  const [nft, setNft] = useState<NFTDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState(false);
  const [listing, setListing] = useState(false);
  const [listPrice, setListPrice] = useState('');
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const fetchNFTDetail = async () => {
      if (!chain || !tokenId) return;
      
      try {
        setLoading(true);
        const nfts = await fetchNFTsFromChain(chain);
        const foundNft = nfts.find(n => n.tokenId === tokenId);
        
        if (!foundNft) return;

        let listing = null;
        try {
          listing = await fetchListing(chain, foundNft.contractAddress, BigInt(tokenId));
        } catch (error) {
          console.log('NFT not listed for sale');
        }

        const nftData: NFTDetailData = {
          tokenId: foundNft.tokenId,
          name: foundNft.metadata?.name || `Token #${foundNft.tokenId}`,
          description: foundNft.metadata?.description || 'No description available',
          image: foundNft.metadata?.image || '',
          creator: foundNft.creator,
          owner: foundNft.owner,
          royalty: ((foundNft.royaltyBps || 0) / 100).toFixed(2),
          attributes: foundNft.metadata?.attributes || [],
          chain: foundNft.chain,
          contractAddress: foundNft.contractAddress,
          isListed: listing?.active || false,
          priceWei: listing?.price,
          price: listing?.price ? `${ethers.formatEther(listing.price)} ETH` : undefined
        };

        setNft(nftData);
      } catch (error) {
        console.error('Error fetching NFT details:', error);
        toast.error('Failed to load NFT details');
      } finally {
        setLoading(false);
      }
    };

    fetchNFTDetail();
  }, [chain, tokenId]);

  const handleBuyNow = async () => {
    if (!nft || !nft.isListed || !nft.priceWei || !account) {
      toast.error('Cannot purchase this NFT');
      return;
    }

    try {
      setBuying(true);
      toast.info('Processing purchase...');

      await buyItem(nft.chain, nft.contractAddress, BigInt(nft.tokenId), nft.priceWei);

      const royaltyAmount = (nft.priceWei * BigInt(Math.floor(parseFloat(nft.royalty) * 100))) / BigInt(10000);
      
      toast.success('NFT purchased successfully!');

      if (nft.creator.toLowerCase() !== account.toLowerCase() && royaltyAmount > 0) {
        toast.info(`Royalty Payment: ${ethers.formatEther(royaltyAmount)} ETH sent to creator`);
      }

      setNft(prev => prev ? { ...prev, owner: account, isListed: false, price: undefined } : null);
    } catch (error) {
      toast.error('Purchase failed');
    } finally {
      setBuying(false);
    }
  };

  const handleListForSale = async () => {
    if (!nft || !isOwner || !listPrice) return;

    try {
      setListing(true);
      
      // 1. Approve the marketplace to manage the NFT
      toast.info('Approving marketplace...');
      const marketplaceAddress = getMarketplaceAddress(nft.chain);
      await approve(marketplaceAddress, BigInt(nft.tokenId));
      
      // 2. Verify the approval
      toast.info('Verifying approval...');
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds for blockchain to sync
      const approvedAddress = await getApproved(BigInt(nft.tokenId));
      if (approvedAddress.toLowerCase() !== marketplaceAddress.toLowerCase()) {
        throw new Error('Marketplace approval failed.');
      }

      // 3. List the NFT on the marketplace
      toast.info('Listing NFT for sale...');
      const priceInWei = ethers.parseEther(listPrice);
      await listItem(nft.chain, nft.contractAddress, BigInt(nft.tokenId), priceInWei);

      toast.success('NFT listed successfully!');
      setNft(prev => prev ? { ...prev, isListed: true, price: `${listPrice} ETH`, priceWei: priceInWei } : null);
    } catch (error) {
      toast.error('Failed to list NFT');
    } finally {
      setListing(false);
    }
  };

  const handleShareToCommunity = () => {
    if (!nft) return;

    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: {
        name: account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Anonymous',
        avatar: 'https://randomuser.me/api/portraits/men/44.jpg', // Placeholder avatar
        verified: true,
      },
      timestamp: new Date().toISOString(),
      content: `Check out this amazing NFT: ${nft.name}`,
      image: nft.image,
      nft: {
        title: nft.name,
        price: nft.price || 'Not for sale',
        collection: nft.chain,
      },
      likes: 0,
      comments: [],
      shares: 0,
    };

    try {
      const existingPosts = JSON.parse(localStorage.getItem('communityPosts') || '[]');
      localStorage.setItem('communityPosts', JSON.stringify([newPost, ...existingPosts]));
      toast.success('NFT shared to community feed!');
    } catch (error) {
      toast.error('Failed to share NFT to community');
    }
  };


  const isOwner = account && nft && account.toLowerCase() === nft.owner.toLowerCase();
  const isCreator = account && nft && account.toLowerCase() === nft.creator.toLowerCase();

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <div className="pt-16 pb-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!nft) {
    return (
      <div className="min-h-screen bg-background text-white">
        <Navbar />
        <div className="pt-16 pb-16 text-center">
          <h2 className="text-xl font-semibold mb-4">NFT Not Found</h2>
          <Button onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      
      <main className="pt-16 pb-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
                <NFTImage src={nft.image} alt={nft.name} className="w-full h-full object-cover" />
                
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button size="sm" variant="secondary" onClick={() => setLiked(!liked)}>
                    <Heart className={`h-4 w-4 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button size="sm" variant="secondary">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>

                <div className="absolute bottom-4 left-4">
                  <Badge variant="secondary" className="capitalize">{nft.chain}</Badge>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Eye className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                  <div className="text-sm font-medium">156</div>
                  <div className="text-xs text-gray-400">Views</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <Heart className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                  <div className="text-sm font-medium">23</div>
                  <div className="text-xs text-gray-400">Favorites</div>
                </div>
                <div className="text-center p-3 bg-gray-800/50 rounded-lg">
                  <TrendingUp className="h-5 w-5 mx-auto mb-1 text-gray-400" />
                  <div className="text-sm font-medium">{nft.royalty}%</div>
                  <div className="text-xs text-gray-400">Royalty</div>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">{nft.name}</h1>
                <div className="flex items-center space-x-2 text-sm mb-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Created by</span>
                  <span className="font-medium">{nft.creator.slice(0, 6)}...{nft.creator.slice(-4)}</span>
                  {isCreator && <Badge variant="outline" className="text-xs">You</Badge>}
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Wallet className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-400">Owned by</span>
                  <span className="font-medium">{nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}</span>
                  {isOwner && <Badge variant="outline" className="text-xs">You</Badge>}
                </div>
              </div>

              {/* Price and Buy Section - Always show for testing */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  {nft.isListed && nft.price ? (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-gray-400">Current Price</p>
                        <p className="text-2xl font-bold">{nft.price}</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        <Button 
                          className="flex-1" 
                          size="lg"
                          onClick={handleBuyNow}
                          disabled={buying || isOwner}
                        >
                          {buying ? 'Processing...' : 'Buy Now'}
                        </Button>
                        <Button variant="outline" size="lg">
                          Make Offer
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mb-4">
                        <p className="text-sm text-gray-400">Status</p>
                        <p className="text-lg font-medium text-yellow-400">Not Listed for Sale</p>
                        <p className="text-xs text-gray-500 mt-1">This NFT is not currently available for purchase</p>
                      </div>
                      
                      <div className="flex space-x-3">
                        {isOwner && (
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="flex-1" size="lg">List for Sale</Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>List Your NFT for Sale</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <Input 
                                  type="text" 
                                  placeholder="Enter price in ETH" 
                                  value={listPrice} 
                                  onChange={(e) => setListPrice(e.target.value)} 
                                />
                                <Button onClick={handleListForSale} disabled={listing}>
                                  {listing ? 'Listing...' : 'List NFT'}
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        )}
                        <Button variant="outline" size="lg">
                          Make Offer
                        </Button>
                      </div>
                      
                      {/* Debug info for development */}
                      {process.env.NODE_ENV === 'development' && (
                        <div className="mt-4 p-3 bg-gray-900/50 rounded text-xs">
                          <p><strong>Debug:</strong></p>
                          <p>Listed: {nft.isListed ? 'Yes' : 'No'}</p>
                          <p>Price: {nft.price || 'None'}</p>
                          <p>Token ID: {nft.tokenId}</p>
                          <p>Chain: {nft.chain}</p>
                        </div>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Community Actions */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Community Actions</h3>
                  <Button variant="secondary" size="lg" onClick={handleShareToCommunity} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Share to Community Feed
                  </Button>
                </CardContent>
              </Card>

              {/* Description */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-300">{nft.description}</p>
                </CardContent>
              </Card>

              {/* Attributes */}
              {nft.attributes.length > 0 && (
                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-4">Attributes</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {nft.attributes.map((attr, index) => (
                        <div key={index} className="bg-gray-700/50 p-3 rounded-lg text-center">
                          <div className="text-xs text-gray-400 uppercase">{attr.trait_type}</div>
                          <div className="font-medium">{attr.value}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Details */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Token ID</span>
                      <span>#{nft.tokenId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Blockchain</span>
                      <span className="capitalize">{nft.chain}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Creator Royalty</span>
                      <span>{nft.royalty}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NFTDetail;
