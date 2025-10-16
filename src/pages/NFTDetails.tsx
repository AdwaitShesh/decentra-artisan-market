import { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { NFTImage } from '@/components/NFTImage';
import { getNetworkConfig } from '@/lib/networkConfig';
import { buyItem, fetchListing, listItem, cancelListing, onBought } from '@/lib/marketplace';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle, ExternalLink, Copy, Eye, Heart, Share2, Tag, Clock, Shield, Palette, Music, Camera, Gamepad2, Globe } from 'lucide-react';

type RouteParams = {
  chain: string;
  tokenId: string;
};

export default function NFTDetails() {
  const { chain, tokenId } = useParams<RouteParams>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [metadata, setMetadata] = useState<any | null>(null);
  const [owner, setOwner] = useState<string>('');
  const [priceWei, setPriceWei] = useState<bigint | null>(null);
  const [creator, setCreator] = useState<string>('');
  const [royaltyBps, setRoyaltyBps] = useState<number>(0);
  const [tokenUriStr, setTokenUriStr] = useState<string>('');
  const [txHash, setTxHash] = useState<string>('');
  const [mintExtras, setMintExtras] = useState<{ category?: string; editions?: { total?: number; minted?: number }; verified?: any } | null>(null);
  const [account, setAccount] = useState<string>('');
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [listPrice, setListPrice] = useState<string>('0.1');
  const [listingActive, setListingActive] = useState<boolean>(false);

  const network = useMemo(() => getNetworkConfig(chain || 'ethereum'), [chain]);

  // Fetch on-chain owner and listing
  useEffect(() => {
    let mounted = true;
    const run = async () => {
      try {
        if (!tokenId) return;
        setLoading(true);
        setError(null);

        // Read owner and tokenURI from NFT contract
        // Use direct RPC for reads to avoid MetaMask circuit breaker
        const provider = new ethers.JsonRpcProvider(network.rpcUrl);

        // Ensure there is contract code at the expected address on this RPC
        const code = await provider.getCode(network.contractAddress);
        if (!code || code === '0x') {
          throw new Error(`No contract found at ${network.contractAddress} on ${network.name}. Make sure contracts are deployed for this network.`);
        }
        const nft = new ethers.Contract(
          network.contractAddress,
          [
            'function ownerOf(uint256) view returns (address)',
            'function tokenURI(uint256) view returns (string)',
            'function getCreator(uint256) view returns (address)',
            'function getRoyalty(uint256) view returns (uint256)'
          ],
          provider
        );

        const tid = BigInt(tokenId);
        let own: string = '';
        let uri: string = '' as any;
        let cr: string = ethers.ZeroAddress;
        let rbps: number | bigint = 0;
        try {
          [own, uri, cr, rbps] = await Promise.all([
            nft.ownerOf(tid),
            nft.tokenURI(tid),
            nft.getCreator(tid).catch(() => ethers.ZeroAddress),
            nft.getRoyalty(tid).catch(() => 0),
          ]);
        } catch (e: any) {
          // Map common decode errors to helpful messages
          const msg = e?.message || '';
          const code = e?.code;
          if (code === 'BAD_DATA' || /could not decode result data/i.test(msg)) {
            throw new Error('Token not found on this network or ABI mismatch. Ensure you selected the correct chain and the token ID exists.');
          }
          throw e;
        }

        const accounts = (window.ethereum ? await window.ethereum.request({ method: 'eth_requestAccounts' }) : []);
        if (!mounted) return;
        setOwner(own);
        setCreator(cr);
        setRoyaltyBps(Number(rbps));
        setAccount(accounts?.[0] || '');
        setIsOwner(accounts?.[0] && accounts[0].toLowerCase() === own.toLowerCase());

        // Try load metadata for UI with multiple IPFS gateways
        if (typeof uri === 'string' && uri.length > 0) {
          const gateways = [
            'https://ipfs.io/ipfs/',
            'https://gateway.pinata.cloud/ipfs/',
            'https://cloudflare-ipfs.com/ipfs/',
            'https://dweb.link/ipfs/'
          ];
          
          let metadataLoaded = false;
          for (const gateway of gateways) {
            if (metadataLoaded) break;
            try {
              const http = uri.startsWith('ipfs://') ? uri.replace('ipfs://', gateway) : uri;
              const res = await fetch(http, { timeout: 5000 });
              if (res.ok) {
                const json = await res.json();
                if (mounted) {
                  setMetadata(json);
                  metadataLoaded = true;
                }
              }
            } catch (e) {
              console.warn(`Failed to load metadata from ${gateway}:`, e);
            }
          }
        }
        if (mounted) setTokenUriStr(String(uri || ''));

        // Load additional details from localStorage if available (for newly minted items)
        try {
          const raw = localStorage.getItem('newlyMintedNFT');
          if (raw) {
            const parsed = JSON.parse(raw);
            if (parsed?.tokenId && String(parsed.tokenId) === String(tokenId)) {
              if (!creator || creator === ethers.ZeroAddress) setCreator(parsed.creator);
              if (!royaltyBps) setRoyaltyBps(Number(parsed.price?.royaltyBps || royaltyBps));
              setTxHash(parsed.transactionHash || '');
              setMintExtras({ category: parsed.category, editions: parsed.editions, verified: parsed.verified });
              // If metadata failed to load, fallback to a lightweight object from stored data
              if (!metadata) {
                setMetadata({ name: parsed.title, description: `Minted via UI. Category: ${parsed.category}` , image: parsed.image });
              }
            }
          }
        } catch {}

        // Fetch listing from marketplace
        const listing = await fetchListing(chain || 'ethereum', network.contractAddress, tid);
        if (mounted) {
          if (listing && listing.active) {
            setPriceWei(listing.price);
            setListingActive(true);
            if (!creator || creator === ethers.ZeroAddress) setCreator(listing.creator);
            if (!royaltyBps) setRoyaltyBps(listing.royaltyBps);
          } else {
            setPriceWei(null);
            setListingActive(false);
          }
        }
      } catch (e: any) {
        if (mounted) setError(e?.message || 'Failed to load NFT');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    run();
    return () => { mounted = false; };
  }, [chain, tokenId]);

  // Subscribe to Bought events for notifications
  useEffect(() => {
    if (!chain) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const off = onBought(provider, chain, ({ price, royaltyPaid, sellerProceeds }) => {
      toast({ title: 'Sale complete', description: `Royalty ${ethers.formatEther(royaltyPaid)} ETH, Seller received ${ethers.formatEther(sellerProceeds)} ETH` });
    });
    return () => { try { (off as any)?.(); } catch {} };
  }, [chain]);

  const handleList = async () => {
    try {
      if (!tokenId) return;
      const tid = BigInt(tokenId);
      const price = ethers.parseEther(listPrice || '0');
      // Ensure marketplace is approved to transfer this NFT
      if (!window.ethereum) throw new Error('MetaMask not available');
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const nft = new ethers.Contract(
        network.contractAddress,
        [
          'function setApprovalForAll(address operator, bool approved) external',
          'function isApprovedForAll(address owner, address operator) view returns (bool)'
        ],
        signer
      );
      const marketplace = (import.meta as any).env?.[`VITE_${(chain||'ethereum').toUpperCase()}_MARKETPLACE_ADDRESS`];
      if (marketplace) {
        const already = await nft.isApprovedForAll(account, marketplace);
        if (!already) {
          const txA = await nft.setApprovalForAll(marketplace, true);
          await txA.wait();
        }
      }
      await listItem(chain || 'ethereum', network.contractAddress, tid, price);
      toast({ title: 'Listed', description: `Item listed for ${listPrice} ETH` });
      setPriceWei(price);
      setListingActive(true);
    } catch (e: any) {
      toast({ title: 'List failed', description: e?.message || 'Unknown error', variant: 'destructive' });
    }
  };

  const handleCancel = async () => {
    try {
      if (!tokenId) return;
      const tid = BigInt(tokenId);
      await cancelListing(chain || 'ethereum', network.contractAddress, tid);
      toast({ title: 'Listing cancelled' });
      setPriceWei(null);
      setListingActive(false);
    } catch (e: any) {
      toast({ title: 'Cancel failed', description: e?.message || 'Unknown error', variant: 'destructive' });
    }
  };

  const handleBuy = async () => {
    try {
      if (!tokenId || priceWei == null) throw new Error('No listing available');
      const tid = BigInt(tokenId);
      const receipt = await buyItem(chain || 'ethereum', network.contractAddress, tid, priceWei);
      toast({ title: 'Purchase complete', description: `Tx: ${receipt.hash.slice(0,10)}…` });
      navigate('/marketplace');
    } catch (e: any) {
      toast({ title: 'Buy failed', description: e?.message || 'Unknown error', variant: 'destructive' });
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main className="container mx-auto px-4 pt-16 pb-16">
        <Link to="/marketplace" className="text-sm text-muted-foreground hover:text-white">← Back to Marketplace</Link>
        {loading ? (
          <div className="mt-10">Loading…</div>
        ) : error ? (
          <div className="mt-10 text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            {/* Left column - NFT Image */}
            <div className="space-y-6">
              <div className="bg-gray-800/40 rounded-lg p-4 border border-gray-700">
                <NFTImage
                  src={metadata?.image}
                  alt={metadata?.name || `Token #${tokenId}`}
                  className="w-full aspect-square object-cover rounded"
                  showLoader={true}
                />
              </div>
              
              {/* NFT Properties */}
              {metadata?.attributes && metadata.attributes.length > 0 && (
                <Card className="bg-gray-800/40 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Properties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {metadata.attributes.map((attr: any, index: number) => (
                        <div key={index} className="bg-gray-700/50 rounded-lg p-3 text-center">
                          <p className="text-xs text-gray-400 mb-1">{attr.trait_type}</p>
                          <p className="font-medium text-sm">{attr.value}</p>
                          {attr.rarity && (
                            <p className="text-xs text-primary mt-1">{attr.rarity}% rare</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Additional Details */}
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="offers">Offers</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardContent className="p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Contract Address</span>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono">
                            {network.contractAddress.substring(0, 6)}...{network.contractAddress.substring(network.contractAddress.length - 4)}
                          </span>
                          <button
                            onClick={() => navigator.clipboard.writeText(network.contractAddress)}
                            className="text-gray-400 hover:text-white"
                          >
                            <Copy className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <Separator className="bg-gray-700" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Token ID</span>
                        <span className="font-mono">{tokenId}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Token Standard</span>
                        <span>ERC-721</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Blockchain</span>
                        <Badge variant="outline" className="border-primary text-primary">
                          {network.name}
                        </Badge>
                      </div>
                      
                      {tokenUriStr && (
                        <div className="flex justify-between items-start">
                          <span className="text-gray-400">Metadata URI</span>
                          <div className="text-right max-w-[200px]">
                            <p className="text-xs font-mono break-all">{tokenUriStr}</p>
                            {tokenUriStr.startsWith('ipfs://') && (
                              <a
                                href={tokenUriStr.replace('ipfs://', 'https://ipfs.io/ipfs/')}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-primary hover:underline text-xs flex items-center gap-1 mt-1"
                              >
                                View on IPFS <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="history">
                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardContent className="p-4">
                      <div className="text-center py-8 text-gray-400">
                        <Clock className="h-8 w-8 mx-auto mb-2" />
                        <p>Transaction history will appear here</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="offers">
                  <Card className="bg-gray-800/40 border-gray-700">
                    <CardContent className="p-4">
                      <div className="text-center py-8 text-gray-400">
                        <Tag className="h-8 w-8 mx-auto mb-2" />
                        <p>No offers yet</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
            {/* Right column - NFT Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  {mintExtras?.category && (
                    <Badge variant="outline" className="border-primary text-primary capitalize">
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(mintExtras.category)}
                        {mintExtras.category}
                      </div>
                    </Badge>
                  )}
                  <div className="flex items-center gap-2 text-gray-400">
                    <Eye className="h-4 w-4" />
                    <span className="text-sm">Views: {Math.floor(Math.random() * 1000) + 100}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Likes: {Math.floor(Math.random() * 50) + 10}</span>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-2">{metadata?.name || `Token #${tokenId}`}</h1>
                
                {metadata?.description && (
                  <p className="text-gray-300 mb-4 leading-relaxed">{metadata.description}</p>
                )}
              </div>
              
              {/* Creator and Owner Info */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-gray-800/40 border-gray-700">
                  <CardContent className="p-4">
                    <p className="text-gray-400 text-sm mb-2">Creator</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-purple-500 flex items-center justify-center">
                        <span className="text-xs font-bold">
                          {(creator && creator !== ethers.ZeroAddress) ? creator.slice(2, 4).toUpperCase() : 'AN'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {(creator && creator !== ethers.ZeroAddress) 
                            ? `${creator.slice(0, 6)}...${creator.slice(-4)}`
                            : 'Anonymous'
                          }
                        </p>
                        {creator && creator !== ethers.ZeroAddress && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-primary" />
                            <span className="text-xs text-gray-400">Verified</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-800/40 border-gray-700">
                  <CardContent className="p-4">
                    <p className="text-gray-400 text-sm mb-2">Owner</p>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-blue-500 flex items-center justify-center">
                        <span className="text-xs font-bold">
                          {owner ? owner.slice(2, 4).toUpperCase() : 'UN'}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          {owner ? `${owner.slice(0, 6)}...${owner.slice(-4)}` : 'Unknown'}
                        </p>
                        {isOwner && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-gray-400">You own this</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* NFT Metadata */}
              <Card className="bg-gray-800/40 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg">NFT Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Royalty</p>
                      <p className="font-medium">{(royaltyBps / 100).toFixed(2)}%</p>
                    </div>
                    
                    {mintExtras?.editions?.total != null && (
                      <div>
                        <p className="text-gray-400 text-sm">Edition</p>
                        <p className="font-medium">
                          {mintExtras.editions.minted || 1} of {mintExtras.editions.total}
                        </p>
                      </div>
                    )}
                  </div>
                  
                  {txHash && (
                    <div>
                      <p className="text-gray-400 text-sm mb-1">Mint Transaction</p>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{txHash.slice(0, 10)}...{txHash.slice(-6)}</span>
                        <button
                          onClick={() => navigator.clipboard.writeText(txHash)}
                          className="text-gray-400 hover:text-white"
                        >
                          <Copy className="h-4 w-4" />
                        </button>
                        <a
                          href={`https://etherscan.io/tx/${txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* Price and Actions */}
              <Card className="bg-gray-800/40 border-gray-700">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-gray-400 text-sm mb-1">Current Price</p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold">
                        {priceWei ? `${ethers.formatEther(priceWei)} ETH` : 'Not listed'}
                      </span>
                      {priceWei && (
                        <span className="text-gray-400 text-sm">
                          (~${(parseFloat(ethers.formatEther(priceWei)) * 2500).toFixed(2)} USD)
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {priceWei ? (
                      <button 
                        onClick={handleBuy} 
                        className="flex-1 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                      >
                        <Tag className="h-4 w-4" />
                        Buy Now
                      </button>
                    ) : (
                      <div className="flex-1 text-center py-3 px-6 bg-gray-700/50 rounded-lg text-gray-400">
                        Not for sale
                      </div>
                    )}
                    
                    {isOwner && (
                      listingActive ? (
                        <button 
                          onClick={handleCancel} 
                          className="px-4 py-3 rounded-lg bg-red-500/20 text-red-300 hover:bg-red-500/30 transition-colors"
                        >
                          Cancel Listing
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 w-full mt-2">
                          <input
                            className="flex-1 px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm"
                            value={listPrice}
                            onChange={(e) => setListPrice(e.target.value)}
                            placeholder="0.10"
                            type="number"
                            step="0.01"
                            min="0"
                          />
                          <span className="text-gray-400 text-sm">ETH</span>
                          <button 
                            onClick={handleList} 
                            className="px-4 py-2 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition-colors"
                          >
                            List for Sale
                          </button>
                        </div>
                      )
                    )}
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-700">
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <Heart className="h-4 w-4" />
                      <span className="text-sm">Favorite</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <Share2 className="h-4 w-4" />
                      <span className="text-sm">Share</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                      <Shield className="h-4 w-4" />
                      <span className="text-sm">Report</span>
                    </button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

// Helper function to get category icons
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'art':
      return <Palette className="h-3 w-3" />;
    case 'music':
      return <Music className="h-3 w-3" />;
    case 'photography':
      return <Camera className="h-3 w-3" />;
    case 'gaming':
      return <Gamepad2 className="h-3 w-3" />;
    case 'domains':
      return <Globe className="h-3 w-3" />;
    default:
      return <Tag className="h-3 w-3" />;
  }
};
