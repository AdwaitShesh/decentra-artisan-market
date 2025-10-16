#!/bin/bash
set -euo pipefail
SCRIPT_DIR=$(cd "$(dirname "$0")" && pwd)
ROOT_DIR="$SCRIPT_DIR/.."

# Start multiple Hardhat networks for true multi-blockchain simulation

echo "🚀 Starting Multi-Blockchain Development Environment..."

# Ensure logs directory exists BEFORE redirecting output
mkdir -p logs

# Kill any existing processes on these ports
echo "🧹 Cleaning up existing processes..."
pkill -f "hardhat node" || true
sleep 1

# Helper to wait for JSON-RPC to be healthy
wait_for_rpc() {
  local port=$1
  local retries=60
  local i=0
  until curl -s --max-time 1 -H 'content-type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"eth_chainId","params":[]}' http://127.0.0.1:${port} >/dev/null; do
    sleep 0.5
    i=$((i+1))
    if [ $i -ge $retries ]; then
      echo "❌ RPC on port ${port} did not become ready"
      exit 1
    fi
  done
}

# Start Ethereum (main network) - Port 8545, Chain ID 1337
echo "🔷 Starting Ethereum Network (Port 8545, Chain ID 1337)..."
npx hardhat node --config "$ROOT_DIR/hardhat.config.js" --hostname 127.0.0.1 --port 8545 > logs/ethereum.log 2>&1 &
ETHEREUM_PID=$!
echo "Ethereum PID: $ETHEREUM_PID"
wait_for_rpc 8545

# Start Polygon Network - Port 8546, Chain ID 1338
echo "🟣 Starting Polygon Network (Port 8546, Chain ID 1338)..."
npx hardhat node --config "$ROOT_DIR/hardhat-polygon.config.js" --hostname 127.0.0.1 --port 8546 > logs/polygon.log 2>&1 &
POLYGON_PID=$!
echo "Polygon PID: $POLYGON_PID"
wait_for_rpc 8546

# Start Base Network - Port 8547, Chain ID 1341
echo "🔵 Starting Base Network (Port 8547, Chain ID 1341)..."
npx hardhat node --config "$ROOT_DIR/hardhat-base.config.js" --hostname 127.0.0.1 --port 8547 > logs/base.log 2>&1 &
BASE_PID=$!
echo "Base PID: $BASE_PID"
wait_for_rpc 8547

# Save PIDs for cleanup script
echo $ETHEREUM_PID > logs/ethereum.pid
echo $POLYGON_PID > logs/polygon.pid
echo $BASE_PID > logs/base.pid

echo ""
echo "✅ Multi-Blockchain Environment Started!"
echo ""
echo "📊 Network Status:"
echo "🔷 Ethereum: http://127.0.0.1:8545 (Chain ID: 1337)"
echo "🟣 Polygon:  http://127.0.0.1:8546 (Chain ID: 1338)"
echo "🔵 Base:     http://127.0.0.1:8547 (Chain ID: 1341)"
echo ""
echo "📝 Logs:"
echo "   Ethereum: logs/ethereum.log"
echo "   Polygon:  logs/polygon.log"
echo "   Base:     logs/base.log"
echo ""
echo "🛑 To stop all networks: ./scripts/stop-networks.sh"
echo ""

# Keep script running and monitor processes
echo "🔄 Monitoring networks... (Press Ctrl+C to stop all)"
trap 'echo "🛑 Stopping all networks..."; kill $ETHEREUM_PID $POLYGON_PID $BASE_PID 2>/dev/null || true; exit' INT

# Wait for all background processes; if any exits, show tail of its log and exit non-zero
wait -n || {
  echo "❌ One of the networks exited unexpectedly. Recent logs:";
  echo "--- Ethereum log ---"; tail -n 50 logs/ethereum.log || true;
  echo "--- Polygon log ---"; tail -n 50 logs/polygon.log || true;
  echo "--- Base log ---"; tail -n 50 logs/base.log || true;
  exit 1;
}

# If we get here, all processes ended gracefully
