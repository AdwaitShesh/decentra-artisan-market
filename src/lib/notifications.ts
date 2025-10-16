import { ethers } from 'ethers';
import { toast } from 'sonner';

export interface RoyaltyNotification {
  nftName: string;
  tokenId: string;
  royaltyAmount: string;
  buyer: string;
  timestamp: number;
  transactionHash: string;
}

export interface PurchaseNotification {
  nftName: string;
  tokenId: string;
  price: string;
  seller: string;
  timestamp: number;
  transactionHash: string;
}

// Store notifications in localStorage
const NOTIFICATIONS_KEY = 'nft_notifications';
const ROYALTY_NOTIFICATIONS_KEY = 'royalty_notifications';

export function saveRoyaltyNotification(notification: RoyaltyNotification) {
  try {
    const existing = JSON.parse(localStorage.getItem(ROYALTY_NOTIFICATIONS_KEY) || '[]');
    existing.unshift(notification);
    // Keep only last 50 notifications
    const trimmed = existing.slice(0, 50);
    localStorage.setItem(ROYALTY_NOTIFICATIONS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save royalty notification:', error);
  }
}

export function savePurchaseNotification(notification: PurchaseNotification) {
  try {
    const existing = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
    existing.unshift(notification);
    // Keep only last 50 notifications
    const trimmed = existing.slice(0, 50);
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(trimmed));
  } catch (error) {
    console.error('Failed to save purchase notification:', error);
  }
}

export function getRoyaltyNotifications(): RoyaltyNotification[] {
  try {
    return JSON.parse(localStorage.getItem(ROYALTY_NOTIFICATIONS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function getPurchaseNotifications(): PurchaseNotification[] {
  try {
    return JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function showRoyaltyNotification(
  nftName: string,
  royaltyAmount: bigint,
  buyer: string,
  transactionHash: string
) {
  const formattedAmount = ethers.formatEther(royaltyAmount);
  
  toast.success('🎉 Royalty Received!', {
    description: `You received ${formattedAmount} ETH royalty from "${nftName}"`,
    duration: 8000,
    action: {
      label: 'View Transaction',
      onClick: () => {
        window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank');
      }
    }
  });

  // Save notification for history
  saveRoyaltyNotification({
    nftName,
    tokenId: '0', // Will be updated with actual tokenId
    royaltyAmount: formattedAmount,
    buyer: buyer.slice(0, 6) + '...' + buyer.slice(-4),
    timestamp: Date.now(),
    transactionHash
  });
}

export function showPurchaseNotification(
  nftName: string,
  price: bigint,
  seller: string,
  transactionHash: string
) {
  const formattedPrice = ethers.formatEther(price);
  
  toast.success('✅ NFT Purchased!', {
    description: `You successfully purchased "${nftName}" for ${formattedPrice} ETH`,
    duration: 8000,
    action: {
      label: 'View Transaction',
      onClick: () => {
        window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank');
      }
    }
  });

  // Save notification for history
  savePurchaseNotification({
    nftName,
    tokenId: '0', // Will be updated with actual tokenId
    price: formattedPrice,
    seller: seller.slice(0, 6) + '...' + seller.slice(-4),
    timestamp: Date.now(),
    transactionHash
  });
}

// Listen for marketplace events and show notifications
export function setupMarketplaceNotifications(
  provider: ethers.Provider,
  userAddress: string,
  marketplaceAddress: string
) {
  const marketplaceABI = [
    'event Bought(address indexed nft, uint256 indexed tokenId, address indexed buyer, uint256 price, uint256 royaltyPaid, uint256 sellerProceeds)',
    'event Listed(address indexed nft, uint256 indexed tokenId, address indexed seller, uint256 price, address creator, uint96 royaltyBps)'
  ];

  const contract = new ethers.Contract(marketplaceAddress, marketplaceABI, provider);

  // Listen for purchases where user is the creator (receives royalty)
  contract.on('Bought', async (nft, tokenId, buyer, price, royaltyPaid, sellerProceeds, event) => {
    try {
      // Get NFT details to check if user is the creator
      const nftContract = new ethers.Contract(nft, [
        'function getCreator(uint256) view returns (address)',
        'function tokenURI(uint256) view returns (string)'
      ], provider);

      const creator = await nftContract.getCreator(tokenId);
      
      // If user is the creator and royalty was paid
      if (creator.toLowerCase() === userAddress.toLowerCase() && royaltyPaid > 0) {
        // Try to get NFT name from metadata
        let nftName = `Token #${tokenId}`;
        try {
          const tokenURI = await nftContract.tokenURI(tokenId);
          if (tokenURI) {
            const response = await fetch(tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/'));
            const metadata = await response.json();
            nftName = metadata.name || nftName;
          }
        } catch (error) {
          console.log('Could not fetch NFT metadata for notification');
        }

        showRoyaltyNotification(nftName, royaltyPaid, buyer, event.transactionHash);
      }
    } catch (error) {
      console.error('Error processing Bought event:', error);
    }
  });

  // Return cleanup function
  return () => {
    contract.removeAllListeners('Bought');
  };
}

// Wallet balance change notification
export function showWalletUpdateNotification(
  type: 'royalty' | 'purchase' | 'sale',
  amount: string,
  nftName?: string
) {
  const messages = {
    royalty: `💰 +${amount} ETH royalty credited to your wallet${nftName ? ` from "${nftName}"` : ''}`,
    purchase: `💸 -${amount} ETH debited for NFT purchase${nftName ? ` of "${nftName}"` : ''}`,
    sale: `💰 +${amount} ETH credited from NFT sale${nftName ? ` of "${nftName}"` : ''}`
  };

  toast.info('Wallet Updated', {
    description: messages[type],
    duration: 5000
  });
}
