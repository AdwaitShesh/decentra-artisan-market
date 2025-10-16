import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, X } from "lucide-react";

// This is a placeholder component for wallet connection
// In a real implementation, this would integrate with Web3 libraries like ethers.js or web3.js

export function WalletConnect({ children }: { children?: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Mock function to simulate connecting a wallet
  const connectWallet = (walletType: string) => {
    // This would be replaced with actual wallet connection logic
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).substr(2, 40);
      setWalletAddress(mockAddress);
      setIsConnected(true);
      setIsDialogOpen(false);
    }, 1000);
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button className="bg-gradient-to-r from-bharat-teal to-bharat-purple hover:opacity-90 transition">
            {isConnected ? (
              <span>
                {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
              </span>
            ) : (
              <>
                <Wallet className="mr-2 h-4 w-4" /> Connect Wallet
              </>
            )}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{isConnected ? "Your Wallet" : "Connect Wallet"}</DialogTitle>
        </DialogHeader>
        {isConnected ? (
          <div className="py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-medium">Connected Address:</p>
                <p className="text-sm text-gray-500 font-mono">{walletAddress}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={disconnectWallet}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="p-3 border border-gray-200 rounded-lg text-center">
                <p className="text-xs text-gray-500">ETH Balance</p>
                <p className="font-medium">3.45 ETH</p>
              </div>
              <div className="p-3 border border-gray-200 rounded-lg text-center">
                <p className="text-xs text-gray-500">NFTs Owned</p>
                <p className="font-medium">12</p>
              </div>
            </div>
            <Button className="w-full" onClick={() => setIsDialogOpen(false)}>
              Return to Marketplace
            </Button>
          </div>
        ) : (
          <div className="py-6">
            <p className="text-gray-500 mb-6">
              Connect with one of our available wallet providers or create a new one.
            </p>
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-between h-14 px-6"
                onClick={() => connectWallet("metamask")}
              >
                <span>MetaMask</span>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                  alt="MetaMask"
                  className="h-6 w-6"
                />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between h-14 px-6"
                onClick={() => connectWallet("walletconnect")}
              >
                <span>WalletConnect</span>
                <img
                  src="https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.jpg"
                  alt="WalletConnect"
                  className="h-6 w-auto"
                />
              </Button>
              <Button
                variant="outline"
                className="w-full justify-between h-14 px-6"
                onClick={() => connectWallet("coinbase")}
              >
                <span>Coinbase Wallet</span>
                <img
                  src="https://altcoinsbox.com/wp-content/uploads/2023/01/coinbase-wallet-logo.png"
                  alt="Coinbase Wallet"
                  className="h-6 w-auto"
                />
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
