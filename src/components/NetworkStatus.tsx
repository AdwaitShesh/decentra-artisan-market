import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Zap, AlertTriangle, CheckCircle, Wifi } from 'lucide-react';
import { getNetworkConfig, getMetaMaskNetworkParams } from '@/lib/networkConfig';
import type { NetworkConfig } from '@/lib/networkConfig';

interface NetworkStatusProps {
  selectedBlockchain: string;
  currentNetwork?: NetworkConfig | null;
  onNetworkSwitch?: () => void;
}

export function NetworkStatus({ selectedBlockchain, currentNetwork, onNetworkSwitch }: NetworkStatusProps) {
  const [isSwitching, setIsSwitching] = useState(false);
  const targetNetwork = getNetworkConfig(selectedBlockchain);
  
  // Check if we're on the correct network for the selected blockchain
  const isCorrectNetwork = currentNetwork?.chainId === targetNetwork.chainId;
  
  const handleSwitchNetwork = async () => {
    if (!window.ethereum) return;
    
    setIsSwitching(true);
    try {
      // Try to switch network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetNetwork.chainId.toString(16)}` }]
      });
    } catch (switchError: any) {
      // If network doesn't exist, add it
      if (switchError.code === 4902) {
        try {
          const networkParams = getMetaMaskNetworkParams(selectedBlockchain);
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [networkParams]
          });
        } catch (addError) {
          console.error('Failed to add network:', addError);
        }
      } else {
        console.error('Failed to switch network:', switchError);
      }
    } finally {
      setIsSwitching(false);
      onNetworkSwitch?.();
    }
  };

  const getGasColor = (gasMultiplier: number) => {
    if (gasMultiplier <= 0.2) return 'text-green-600';
    if (gasMultiplier <= 0.5) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getGasLabel = (gasMultiplier: number) => {
    if (gasMultiplier <= 0.2) return 'Very Low';
    if (gasMultiplier <= 0.5) return 'Low';
    if (gasMultiplier <= 1.0) return 'Medium';
    return 'High';
  };

  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Wifi className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Network Status</span>
          </div>
          {isCorrectNetwork ? (
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="h-3 w-3 mr-1" />
              Connected
            </Badge>
          ) : (
            <Badge variant="destructive">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Wrong Network
            </Badge>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Selected:</span>
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${targetNetwork.color}`}></div>
              <span className="font-medium">{targetNetwork.name}</span>
              <span className="text-xs text-muted-foreground">({targetNetwork.symbol})</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Gas Cost:</span>
            <div className="flex items-center space-x-1">
              <Zap className={`h-3 w-3 ${getGasColor(targetNetwork.gasMultiplier)}`} />
              <span className={`font-medium ${getGasColor(targetNetwork.gasMultiplier)}`}>
                {getGasLabel(targetNetwork.gasMultiplier)}
              </span>
            </div>
          </div>

          {currentNetwork && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Current:</span>
              <span className="font-medium">
                {currentNetwork.name} (ID: {currentNetwork.chainId})
              </span>
            </div>
          )}
        </div>

        {!isCorrectNetwork && (
          <div className="mt-3">
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                Please switch to {targetNetwork.name} (Chain ID: {targetNetwork.chainId}).
              </AlertDescription>
            </Alert>
            <NetworkStatus 
              selectedBlockchain={selectedBlockchain}
              currentNetwork={currentNetwork}
              onNetworkSwitch={async () => {
                // Try to switch network using the hook's function
                if (handleSwitchNetwork) {
                  try {
                    await handleSwitchNetwork();
                  } catch (error) {
                    console.error('Network switch failed:', error);
                  }
                }
              }}
            />
            <Button 
              onClick={handleSwitchNetwork}
              disabled={isSwitching}
              className="w-full mt-2"
              size="sm"
            >
              {isSwitching ? 'Switching...' : `Switch to ${targetNetwork.name}`}
            </Button>
          </div>
        )}

        {isCorrectNetwork && (
          <div className="mt-3">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-sm text-green-800">
                ✅ Connected to {targetNetwork.name}! Gas fees: {getGasLabel(targetNetwork.gasMultiplier).toLowerCase()}.
              </AlertDescription>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
