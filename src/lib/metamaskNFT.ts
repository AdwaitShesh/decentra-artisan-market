import { ethers } from 'ethers';

/**
 * Adds an NFT to MetaMask wallet
 * This uses the wallet_watchAsset RPC method to suggest adding the NFT to the user's wallet
 */
export async function addNFTToMetaMask(
    contractAddress: string,
    tokenId: string | number | bigint,
    imageUrl?: string
): Promise<boolean> {
    if (!window.ethereum) {
        console.error('MetaMask is not installed');
        return false;
    }

    try {
        const tokenIdString = tokenId.toString();

        // Request to add the NFT to MetaMask
        const wasAdded = await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
                type: 'ERC721',
                options: {
                    address: contractAddress,
                    tokenId: tokenIdString,
                    // Optional: provide image URL for better UX
                    ...(imageUrl && { image: imageUrl })
                },
            },
        });

        if (wasAdded) {
            console.log('NFT successfully added to MetaMask!');
            return true;
        } else {
            console.log('User declined to add NFT to MetaMask');
            return false;
        }
    } catch (error) {
        console.error('Error adding NFT to MetaMask:', error);
        return false;
    }
}

/**
 * Converts IPFS URI to HTTP gateway URL for MetaMask display
 */
export function ipfsToHttp(ipfsUri: string): string {
    if (!ipfsUri) return '';

    // If it's already an HTTP URL, return as is
    if (ipfsUri.startsWith('http://') || ipfsUri.startsWith('https://')) {
        return ipfsUri;
    }

    // Convert ipfs:// to HTTP gateway
    if (ipfsUri.startsWith('ipfs://')) {
        const cid = ipfsUri.replace('ipfs://', '');
        return `https://ipfs.io/ipfs/${cid}`;
    }

    // If it's just a CID
    if (ipfsUri.startsWith('Qm') || ipfsUri.startsWith('bafy')) {
        return `https://ipfs.io/ipfs/${ipfsUri}`;
    }

    return ipfsUri;
}

/**
 * Fetches NFT metadata from IPFS and returns the image URL
 */
export async function getNFTImageUrl(tokenURI: string): Promise<string | null> {
    try {
        const metadataUrl = ipfsToHttp(tokenURI);
        const response = await fetch(metadataUrl);
        const metadata = await response.json();

        if (metadata.image) {
            return ipfsToHttp(metadata.image);
        }

        return null;
    } catch (error) {
        console.error('Error fetching NFT metadata:', error);
        return null;
    }
}

// Extend Window interface for TypeScript
declare global {
    interface Window {
        ethereum?: any;
    }
}
