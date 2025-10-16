import { useState, useEffect } from 'react';
import { ImageIcon, AlertCircle } from 'lucide-react';

interface NFTImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackSrc?: string;
  showLoader?: boolean;
}

// IPFS gateway URLs in order of preference (public first for better CORS support)
const IPFS_GATEWAYS = [
  'https://ipfs.io/ipfs/',
  'https://gateway.pinata.cloud/ipfs/',
  'https://cloudflare-ipfs.com/ipfs/',
  'http://127.0.0.1:8081/ipfs/',  // Local IPFS gateway as fallback
  'https://dweb.link/ipfs/'
];

export const NFTImage = ({ 
  src, 
  alt, 
  className = '', 
  fallbackSrc = 'https://images.unsplash.com/photo-1614812513172-567d2fe96a75?q=80&w=1470&auto=format&fit=crop',
  showLoader = true 
}: NFTImageProps) => {
  const [currentSrc, setCurrentSrc] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [gatewayIndex, setGatewayIndex] = useState(0);

  // Convert IPFS URL to HTTP gateway URL
  const convertIPFSUrl = (url: string, gatewayIndex: number = 0): string => {
    if (!url) return fallbackSrc;
    
    // If it's already an HTTP URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // Handle IPFS URLs
    if (url.startsWith('ipfs://')) {
      const hash = url.replace('ipfs://', '');
      return `${IPFS_GATEWAYS[gatewayIndex]}${hash}`;
    }
    
    // Handle raw IPFS hashes
    if (url.match(/^Qm[1-9A-HJ-NP-Za-km-z]{44}$/) || url.match(/^baf[0-9a-z]{56}$/)) {
      return `${IPFS_GATEWAYS[gatewayIndex]}${url}`;
    }
    
    return url || fallbackSrc;
  };

  // Initialize image source
  useEffect(() => {
    if (src) {
      setCurrentSrc(convertIPFSUrl(src, 0));
      setGatewayIndex(0);
      setIsLoading(true);
      setHasError(false);
    } else {
      setCurrentSrc(fallbackSrc);
      setIsLoading(false);
      setHasError(false);
    }
  }, [src, fallbackSrc]);

  // Handle image load error - try next IPFS gateway
  const handleError = () => {
    if (src && src.startsWith('ipfs://') && gatewayIndex < IPFS_GATEWAYS.length - 1) {
      const nextIndex = gatewayIndex + 1;
      setGatewayIndex(nextIndex);
      setCurrentSrc(convertIPFSUrl(src, nextIndex));
      setIsLoading(true);
    } else if (currentSrc !== fallbackSrc) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      // All options exhausted
      setIsLoading(false);
      setHasError(true);
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-800 text-gray-400 ${className}`}>
        <div className="text-center">
          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
          <p className="text-sm">Image not available</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && showLoader && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-gray-400">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
            <p className="text-sm">Loading image...</p>
          </div>
        </div>
      )}
      
      <img
        src={currentSrc}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading="lazy"
      />
      
      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && src?.startsWith('ipfs://') && (
        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
          Gateway {gatewayIndex + 1}/{IPFS_GATEWAYS.length}
        </div>
      )}
    </div>
  );
};

export default NFTImage;
