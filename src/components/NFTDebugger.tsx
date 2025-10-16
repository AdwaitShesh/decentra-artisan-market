import React, { useState, useEffect } from 'react';
import { fetchAllNFTs, BlockchainNFT } from '@/lib/nftFetcher';
import { Button } from '@/components/ui/button';

export const NFTDebugger: React.FC = () => {
  const [nfts, setNfts] = useState<BlockchainNFT[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
    console.log(message);
  };

  const fetchNFTs = async () => {
    setLoading(true);
    setError(null);
    setLogs([]);
    
    try {
      addLog('🔍 Starting NFT fetch...');
      
      // Clear cache first
      localStorage.removeItem('nftCache');
      addLog('🗑️ Cleared NFT cache');
      
      const fetchedNFTs = await fetchAllNFTs();
      addLog(`✅ Fetched ${fetchedNFTs.length} NFTs from blockchain`);
      
      setNfts(fetchedNFTs);
      
      if (fetchedNFTs.length === 0) {
        addLog('⚠️ No NFTs found. Check if contracts are deployed and NFTs are minted.');
      }
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      addLog(`❌ Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const clearCache = () => {
    localStorage.removeItem('nftCache');
    localStorage.removeItem('newlyMintedNFT');
    addLog('🗑️ Cleared all NFT-related cache');
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg border border-gray-700 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">NFT Debugger</h2>
      
      <div className="flex gap-4 mb-4">
        <Button onClick={fetchNFTs} disabled={loading}>
          {loading ? 'Fetching...' : 'Fetch NFTs'}
        </Button>
        <Button onClick={clearCache} variant="outline">
          Clear Cache
        </Button>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500 rounded p-4 mb-4">
          <h3 className="font-semibold text-red-400">Error:</h3>
          <p className="text-red-300">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Logs */}
        <div>
          <h3 className="font-semibold mb-2">Debug Logs:</h3>
          <div className="bg-gray-900 rounded p-3 h-64 overflow-y-auto text-sm font-mono">
            {logs.length === 0 ? (
              <p className="text-gray-500">No logs yet. Click "Fetch NFTs" to start.</p>
            ) : (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* NFT Results */}
        <div>
          <h3 className="font-semibold mb-2">Fetched NFTs ({nfts.length}):</h3>
          <div className="bg-gray-900 rounded p-3 h-64 overflow-y-auto text-sm">
            {nfts.length === 0 ? (
              <p className="text-gray-500">No NFTs fetched yet.</p>
            ) : (
              nfts.map((nft, index) => (
                <div key={index} className="mb-3 p-2 bg-gray-800 rounded">
                  <div><strong>Chain:</strong> {nft.chain}</div>
                  <div><strong>Token ID:</strong> {nft.tokenId}</div>
                  <div><strong>Owner:</strong> {nft.owner.slice(0, 10)}...</div>
                  <div><strong>Creator:</strong> {nft.creator.slice(0, 10)}...</div>
                  <div><strong>Token URI:</strong> {nft.tokenURI}</div>
                  <div><strong>Metadata:</strong> {nft.metadata ? 'Loaded' : 'Not loaded'}</div>
                  {nft.metadata && (
                    <div><strong>Name:</strong> {nft.metadata.name || 'No name'}</div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Environment Info */}
      <div className="mt-6 p-4 bg-gray-900 rounded">
        <h3 className="font-semibold mb-2">Environment Info:</h3>
        <div className="text-sm space-y-1">
          <div><strong>Contract Address:</strong> {import.meta.env?.VITE_NFT_CONTRACT_ADDRESS || 'Not set'}</div>
          <div><strong>IPFS API URL:</strong> {import.meta.env?.VITE_IPFS_API_URL || 'Not set'}</div>
          <div><strong>IPFS Gateway:</strong> {import.meta.env?.VITE_IPFS_GATEWAY || 'Not set'}</div>
          <div><strong>Cache Status:</strong> {localStorage.getItem('nftCache') ? 'Has cached data' : 'No cache'}</div>
        </div>
      </div>
    </div>
  );
};
