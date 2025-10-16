// Debug NFT images - run this in browser console
console.log('🔍 Debugging NFT images...');

// Check what's in the current NFT data
const nftCache = localStorage.getItem('nftCache');
if (nftCache) {
    const cached = JSON.parse(nftCache);
    console.log('📦 Cached NFTs:', cached.nfts);
    
    cached.nfts.forEach((nft, index) => {
        console.log(`NFT ${index + 1}:`, {
            tokenId: nft.tokenId,
            tokenURI: nft.tokenURI,
            metadata: nft.metadata,
            imageUrl: nft.metadata?.image
        });
        
        // Test if the image URL is accessible
        if (nft.metadata?.image) {
            const img = new Image();
            img.onload = () => console.log(`✅ Image ${index + 1} loads successfully:`, nft.metadata.image);
            img.onerror = () => console.log(`❌ Image ${index + 1} failed to load:`, nft.metadata.image);
            img.src = nft.metadata.image;
        }
    });
} else {
    console.log('📦 No cached NFTs found');
}

// Clear cache and force refresh
console.log('🔄 Clearing cache and refreshing...');
localStorage.removeItem('nftCache');
localStorage.removeItem('newlyMintedNFT');

// Trigger a page refresh after a short delay
setTimeout(() => {
    window.location.reload();
}, 1000);
