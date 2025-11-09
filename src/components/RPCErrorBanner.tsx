import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { AlertCircle, Terminal, RefreshCw, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { NetworkResetButton } from '@/components/NetworkResetButton';

interface RPCErrorBannerProps {
  error?: string;
  onDismiss?: () => void;
  onRetry?: () => void;
}

export function RPCErrorBanner({ error, onDismiss, onRetry }: RPCErrorBannerProps) {
  const [showDetails, setShowDetails] = useState(false);

  // Check if this is an RPC/circuit breaker error
  const isRPCError = error && (
    /RPC endpoint/i.test(error) ||
    /circuit breaker/i.test(error) ||
    /too many errors/i.test(error) ||
    /retrying in.*minutes/i.test(error) ||
    /-32002/.test(error) ||
    /-32603/.test(error)
  );

  if (!isRPCError) return null;

  return (
    <>
      <Alert variant="destructive" className="mb-4 border-2">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="text-lg font-bold">RPC Endpoint Error Detected</AlertTitle>
        <AlertDescription className="mt-2">
          <p className="mb-3">
            MetaMask's circuit breaker has been triggered. This happens when the RPC endpoint 
            returns too many errors. Follow these steps to fix:
          </p>
          
          <div className="space-y-2 mb-4 text-sm bg-destructive/10 p-3 rounded-md">
            <div className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">1.</span>
              <span>Reset MetaMask: Settings → Advanced → Reset Account</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">2.</span>
              <span>Remove old networks: Settings → Networks → Delete local networks</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold min-w-[20px]">3.</span>
              <span className="font-semibold text-primary">Click "Reset & Add Networks" button below</span>
            </div>
          </div>

          <div className="mb-4">
            <NetworkResetButton />
          </div>

          <div className="flex flex-wrap gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Terminal className="h-4 w-4 mr-2" />
                  Alternative: Terminal Commands
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Terminal Commands</DialogTitle>
                  <DialogDescription>
                    Alternative method using terminal commands
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-md">
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium mb-2">Check if nodes are running:</p>
                        <code className="text-xs bg-black/50 p-2 rounded block">npm run check-nodes</code>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Get reset instructions:</p>
                        <code className="text-xs bg-black/50 p-2 rounded block">npm run reset-metamask</code>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-2">Full automated fix:</p>
                        <code className="text-xs bg-black/50 p-2 rounded block">npm run fix-rpc</code>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <p className="font-medium">Steps:</p>
                    <ol className="list-decimal list-inside space-y-1 ml-2">
                      <li>Open a terminal in your project directory</li>
                      <li>Run <code className="bg-muted px-1 rounded">npm run fix-rpc</code></li>
                      <li>Follow the on-screen instructions</li>
                      <li>Reset MetaMask account (Settings → Advanced → Reset)</li>
                      <li>Delete old networks from MetaMask</li>
                      <li>Use the "Reset & Add Networks" button above</li>
                    </ol>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Detailed Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Complete RPC Error Fix Guide</DialogTitle>
                  <DialogDescription>
                    Step-by-step instructions to resolve RPC endpoint errors
                  </DialogDescription>
                </DialogHeader>
                
                <div className="space-y-6 text-sm">
                  <section>
                    <h3 className="font-bold text-base mb-2">🔍 What Happened?</h3>
                    <p className="text-muted-foreground">
                      MetaMask detected too many failed requests to your local RPC endpoint and 
                      activated its circuit breaker protection. This typically happens when:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1 text-muted-foreground">
                      <li>Local Hardhat nodes were restarted</li>
                      <li>Network configuration became corrupted</li>
                      <li>Too many rapid requests were made</li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="font-bold text-base mb-2">🛠️ Terminal Commands</h3>
                    <div className="space-y-2">
                      <div className="bg-muted p-3 rounded">
                        <p className="font-medium mb-1">Check node health:</p>
                        <code className="text-xs">npm run check-nodes</code>
                      </div>
                      <div className="bg-muted p-3 rounded">
                        <p className="font-medium mb-1">Get reset instructions:</p>
                        <code className="text-xs">npm run reset-metamask</code>
                      </div>
                      <div className="bg-muted p-3 rounded">
                        <p className="font-medium mb-1">Full automated fix:</p>
                        <code className="text-xs">npm run fix-rpc</code>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h3 className="font-bold text-base mb-2">🔄 MetaMask Reset Steps</h3>
                    <ol className="list-decimal list-inside space-y-2 ml-2">
                      <li>
                        <span className="font-medium">Reset Account:</span>
                        <p className="ml-6 text-muted-foreground">
                          MetaMask → Settings → Advanced → "Reset account"
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Remove Networks:</span>
                        <p className="ml-6 text-muted-foreground">
                          Settings → Networks → Delete "Ethereum (Local)", "Polygon (Local)", "Base (Local)"
                        </p>
                      </li>
                      <li>
                        <span className="font-medium">Re-add Networks:</span>
                        <p className="ml-6 text-muted-foreground">
                          Use the automated script (see "Show Fix Script" button)
                        </p>
                      </li>
                    </ol>
                  </section>

                  <section>
                    <h3 className="font-bold text-base mb-2">📚 Documentation</h3>
                    <p className="text-muted-foreground">
                      For more detailed information, check:
                    </p>
                    <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                      <li><code>RPC_ERROR_FIX_GUIDE.md</code></li>
                      <li><code>METAMASK_NETWORKS_GUIDE.md</code></li>
                      <li><code>TRUE_MULTI_NETWORK_SETUP.md</code></li>
                    </ul>
                  </section>
                </div>
              </DialogContent>
            </Dialog>

            {onRetry && (
              <Button variant="outline" size="sm" onClick={onRetry}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            )}

            {onDismiss && (
              <Button variant="ghost" size="sm" onClick={onDismiss}>
                Dismiss
              </Button>
            )}
          </div>
        </AlertDescription>
      </Alert>
    </>
  );
}
