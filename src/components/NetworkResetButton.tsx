import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NETWORK_CONFIGS = {
  ethereum: {
    chainId: 1337,
    name: 'Ethereum (Local)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545',
  },
  polygon: {
    chainId: 1338,
    name: 'Polygon (Local)',
    symbol: 'MATIC',
    rpcUrl: 'http://127.0.0.1:8546',
  },
  base: {
    chainId: 1341,
    name: 'Base (Local)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8547',
  },
};

interface NetworkStatus {
  name: string;
  status: 'pending' | 'success' | 'error' | 'skipped';
  message?: string;
}

export function NetworkResetButton() {
  const [isResetting, setIsResetting] = useState(false);
  const [networkStatuses, setNetworkStatuses] = useState<NetworkStatus[]>([]);
  const { toast } = useToast();

  const addNetwork = async (key: string, network: typeof NETWORK_CONFIGS.ethereum) => {
    try {
      // First, try to switch to the network
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${network.chainId.toString(16)}` }],
        });
        return { success: true, message: 'Already exists, switched successfully' };
      } catch (switchError: any) {
        // If network doesn't exist (error 4902), add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${network.chainId.toString(16)}`,
                chainName: network.name,
                nativeCurrency: {
                  name: network.symbol,
                  symbol: network.symbol,
                  decimals: 18,
                },
                rpcUrls: [network.rpcUrl],
                blockExplorerUrls: null,
              },
            ],
          });
          return { success: true, message: 'Added successfully' };
        } else if (switchError.code === 4001) {
          return { success: false, message: 'User rejected' };
        } else {
          throw switchError;
        }
      }
    } catch (error: any) {
      console.error(`Failed to add ${network.name}:`, error);
      return { success: false, message: error.message || 'Unknown error' };
    }
  };

  const resetNetworks = async () => {
    if (!window.ethereum) {
      toast({
        title: 'MetaMask Not Found',
        description: 'Please install MetaMask extension',
        variant: 'destructive',
      });
      return;
    }

    setIsResetting(true);
    setNetworkStatuses([]);

    // Use setTimeout to prevent UI blocking
    setTimeout(async () => {
      const statuses: NetworkStatus[] = [];

      try {
        for (const [key, network] of Object.entries(NETWORK_CONFIGS)) {
          // Update status to pending
          const pendingStatus: NetworkStatus = {
            name: network.name,
            status: 'pending',
          };
          setNetworkStatuses((prev) => [...prev, pendingStatus]);

          // Wait a bit for UI update
          await new Promise((r) => setTimeout(r, 200));

          // Try to add the network
          const result = await addNetwork(key, network);

          // Update status
          const finalStatus: NetworkStatus = {
            name: network.name,
            status: result.success ? 'success' : 'error',
            message: result.message,
          };
          statuses.push(finalStatus);
          
          // Update with final status
          setNetworkStatuses((prev) => {
            const updated = [...prev];
            const index = updated.findIndex(s => s.name === network.name);
            if (index !== -1) {
              updated[index] = finalStatus;
            }
            return updated;
          });

          // Wait between networks to prevent overwhelming MetaMask
          await new Promise((r) => setTimeout(r, 800));
        }

        // Show summary toast
        const successCount = statuses.filter((s) => s.status === 'success').length;
        const errorCount = statuses.filter((s) => s.status === 'error').length;

        if (errorCount === 0) {
          toast({
            title: 'Networks Reset Complete!',
            description: `Successfully configured ${successCount} networks. Please refresh the page.`,
          });
          
          // Refresh page after 2 seconds
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast({
            title: 'Partial Success',
            description: `${successCount} succeeded, ${errorCount} failed. Check the status below.`,
            variant: 'destructive',
          });
        }
      } catch (error: any) {
        console.error('Error resetting networks:', error);
        toast({
          title: 'Error',
          description: error.message || 'Failed to reset networks',
          variant: 'destructive',
        });
      } finally {
        setIsResetting(false);
      }
    }, 100);
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={resetNetworks}
        disabled={isResetting}
        variant="default"
        className="w-full"
      >
        {isResetting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Resetting Networks...
          </>
        ) : (
          <>
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset & Add Networks
          </>
        )}
      </Button>

      {networkStatuses.length > 0 && (
        <div className="space-y-2">
          {networkStatuses.map((status, index) => (
            <Alert
              key={index}
              variant={status.status === 'error' ? 'destructive' : 'default'}
              className="py-2"
            >
              <div className="flex items-center gap-2">
                {status.status === 'pending' && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {status.status === 'success' && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
                {status.status === 'error' && (
                  <XCircle className="h-4 w-4 text-red-500" />
                )}
                <AlertDescription className="flex-1">
                  <span className="font-medium">{status.name}</span>
                  {status.message && (
                    <span className="text-xs ml-2 text-muted-foreground">
                      - {status.message}
                    </span>
                  )}
                </AlertDescription>
              </div>
            </Alert>
          ))}
        </div>
      )}
    </div>
  );
}
