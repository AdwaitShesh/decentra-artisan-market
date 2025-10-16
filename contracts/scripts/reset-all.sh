#!/usr/bin/env bash
set -euo pipefail
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR="$SCRIPT_DIR/.."         # contracts/
PROJECT_ROOT=$(cd "$ROOT_DIR/.." && pwd)  # repo root

addr="${1:-}"
amount="${2:-100}"

if [[ -z "$addr" ]]; then
  echo "Usage: ./scripts/reset-all.sh <recipientAddress> [fundAmountETH]"
  echo "Example: ./scripts/reset-all.sh 0xYourMetaMaskAccount 500"
  exit 1
fi

# 1) Stop any running networks
if [[ -f "$SCRIPT_DIR/stop-networks.sh" ]]; then
  echo "🛑 Stopping any existing networks..."
  "$SCRIPT_DIR/stop-networks.sh" || true
fi

# 2) Start fresh networks directly (no monitoring loop)
echo "🚀 Starting fresh multi-network nodes..."

# Ensure logs dir exists
mkdir -p "$SCRIPT_DIR/logs"

echo "🔷 Starting Ethereum (8545, 1337)"
(cd "$ROOT_DIR" && npx hardhat node --config "$ROOT_DIR/hardhat.config.js" --hostname 127.0.0.1 --port 8545) > "$SCRIPT_DIR/logs/ethereum.log" 2>&1 &
ETH_PID=$!

echo "🟣 Starting Polygon (8546, 1338)"
(cd "$ROOT_DIR" && npx hardhat node --config "$ROOT_DIR/hardhat-polygon.config.js" --hostname 127.0.0.1 --port 8546) > "$SCRIPT_DIR/logs/polygon.log" 2>&1 &
POLY_PID=$!

echo "🔵 Starting Base (8547, 1341)"
(cd "$ROOT_DIR" && npx hardhat node --config "$ROOT_DIR/hardhat-base.config.js" --hostname 127.0.0.1 --port 8547) > "$SCRIPT_DIR/logs/base.log" 2>&1 &
BASE_PID=$!

# 3) Health checks for all RPCs
check_rpc() {
  local port=$1
  local expect=$2
  local retries=100
  local i=0
  while true; do
    if out=$(curl -s --max-time 1 -H 'content-type: application/json' \
      -d '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}' \
      http://127.0.0.1:${port}); then
      cid=$(echo "$out" | sed -n 's/.*"result":"\(0x[0-9a-fA-F]\+\)".*/\1/p')
      if [[ "$cid" == "$expect" ]]; then
        echo "✅ Port ${port} healthy (chainId ${cid})"
        return 0
      fi
    fi
    i=$((i+1))
    if [[ $i -ge $retries ]]; then
      echo "❌ RPC on ${port} did not become healthy"
      return 1
    fi
    sleep 0.5
  done
}

check_rpc 8545 0x539
check_rpc 8546 0x53a
check_rpc 8547 0x53d

# 4) Deploy contracts to all networks
echo "📦 Deploying contracts on all networks..."
(cd "$ROOT_DIR" && node "$SCRIPT_DIR/deploy-all.js")

# 5) Fund recipient on all networks
echo "💰 Funding $addr with ${amount} ETH on all networks..."
(cd "$ROOT_DIR" && node "$SCRIPT_DIR/fund-account.js" "$addr" "$amount")

# 6) Mint a test NFT on each network
echo "🖼  Minting a test NFT on each network to verify end-to-end..."
(cd "$ROOT_DIR" && node "$SCRIPT_DIR/mint-test.js" "$addr" "ipfs://reset-all-test" "Reset Script" 1)

# 7) Print .env guidance from deployments.json
DEPLOY_FILE="$ROOT_DIR/deployments.json"
ENV_LINES=$(DEPLOY_FILE="$DEPLOY_FILE" node -e '
  const fs=require("fs");
  const f=process.env.DEPLOY_FILE;
  if(!f) { throw new Error("DEPLOY_FILE env not set"); }
  const raw=JSON.parse(fs.readFileSync(f,"utf8"));
  let eth, mEth, poly, mPoly, base, mBase;
  if (Array.isArray(raw)) {
    for (const d of raw) {
      if (!d || !d.network) continue;
      const n = String(d.network).toLowerCase();
      if (n === "ethereum") { eth=d.contractAddress; mEth=d.marketplaceAddress; }
      if (n === "polygon") { poly=d.contractAddress; mPoly=d.marketplaceAddress; }
      if (n === "base") { base=d.contractAddress; mBase=d.marketplaceAddress; }
    }
  } else {
    eth=(raw.ethereum?.DecentraArtisanNFT)||raw.ethereum; 
    mEth=(raw.ethereum?.Marketplace)||raw.Marketplace;
    poly=(raw.polygon?.DecentraArtisanNFT)||raw.polygon; 
    mPoly=(raw.polygon?.Marketplace)||raw.Marketplace;
    base=(raw.base?.DecentraArtisanNFT)||raw.base; 
    mBase=(raw.base?.Marketplace)||raw.Marketplace;
  }
  if (eth) console.log(`VITE_ETHEREUM_CONTRACT_ADDRESS=${eth}`);
  if (mEth) console.log(`VITE_ETHEREUM_MARKETPLACE_ADDRESS=${mEth}`);
  if (poly) console.log(`VITE_POLYGON_CONTRACT_ADDRESS=${poly}`);
  if (mPoly) console.log(`VITE_POLYGON_MARKETPLACE_ADDRESS=${mPoly}`);
  if (base) console.log(`VITE_BASE_CONTRACT_ADDRESS=${base}`);
  if (mBase) console.log(`VITE_BASE_MARKETPLACE_ADDRESS=${mBase}`);
' )

cat <<EOF

==============================
✅ Reset complete
==============================
Paste these into your project .env (root):
$ENV_LINES

MetaMask steps (one-time if stuck):
- Remove local networks, then from the app re-select each network to re-add via wallet_addEthereumChain.
- Or add manually:
  * Ethereum (Local): http://127.0.0.1:8545, chainId 1337, symbol ETH
  * Polygon  (Local): http://127.0.0.1:8546, chainId 1338, symbol MATIC
  * Base     (Local): http://127.0.0.1:8547, chainId 1341, symbol ETH

A test NFT has been minted on each network to ${addr}. Open the UI and verify in the Activity tab and NFT list.
EOF

# 8) Update project .env with latest addresses
(cd "$PROJECT_ROOT" && node "./update-env-from-deploy.cjs") || true

# 9) Leave the nodes running; provide PIDs for convenience
echo "Node PIDs: ETH=$ETH_PID POLY=$POLY_PID BASE=$BASE_PID"
