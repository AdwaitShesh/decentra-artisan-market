#!/bin/bash

# Reset Local Blockchain Nodes Script
# This script kills existing nodes and starts fresh ones

echo "🔄 Resetting Local Blockchain Nodes..."
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}Checking port $port...${NC}"
    if check_port $port; then
        echo -e "${RED}Killing process on port $port${NC}"
        lsof -ti:$port | xargs kill -9 2>/dev/null
        sleep 1
        if check_port $port; then
            echo -e "${RED}Failed to kill process on port $port${NC}"
            return 1
        else
            echo -e "${GREEN}✓ Port $port is now free${NC}"
            return 0
        fi
    else
        echo -e "${GREEN}✓ Port $port is already free${NC}"
        return 0
    fi
}

# Step 1: Kill existing processes
echo "Step 1: Killing existing node processes..."
kill_port 8545
kill_port 8546
kill_port 8547
echo ""

# Step 2: Wait a moment
echo "Step 2: Waiting for ports to be released..."
sleep 2
echo ""

# Step 3: Verify ports are free
echo "Step 3: Verifying ports are free..."
all_free=true
for port in 8545 8546 8547; do
    if check_port $port; then
        echo -e "${RED}✗ Port $port is still in use!${NC}"
        all_free=false
    else
        echo -e "${GREEN}✓ Port $port is free${NC}"
    fi
done
echo ""

if [ "$all_free" = false ]; then
    echo -e "${RED}Some ports are still in use. Please manually kill the processes.${NC}"
    echo "Run: lsof -i :8545 -i :8546 -i :8547"
    exit 1
fi

# Step 4: Start new nodes
echo "Step 4: Starting fresh blockchain nodes..."
cd contracts || exit 1

echo -e "${YELLOW}Starting Ethereum node on port 8545...${NC}"
npm run node:ethereum > ../logs/ethereum-node.log 2>&1 &
ETHEREUM_PID=$!
sleep 2

echo -e "${YELLOW}Starting Polygon node on port 8546...${NC}"
npm run node:polygon > ../logs/polygon-node.log 2>&1 &
POLYGON_PID=$!
sleep 2

echo -e "${YELLOW}Starting Base node on port 8547...${NC}"
npm run node:base > ../logs/base-node.log 2>&1 &
BASE_PID=$!
sleep 2

echo ""

# Step 5: Verify nodes are running
echo "Step 5: Verifying nodes are responding..."
sleep 3

test_rpc() {
    local port=$1
    local name=$2
    local response=$(curl -s -X POST http://localhost:$port \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
        --max-time 5)
    
    if [ -z "$response" ]; then
        echo -e "${RED}✗ $name (port $port) - No response${NC}"
        return 1
    elif echo "$response" | grep -q "error"; then
        echo -e "${RED}✗ $name (port $port) - Error response${NC}"
        echo "  Response: $response"
        return 1
    elif echo "$response" | grep -q "result"; then
        local chain_id=$(echo "$response" | grep -o '"result":"[^"]*"' | cut -d'"' -f4)
        echo -e "${GREEN}✓ $name (port $port) - Chain ID: $chain_id${NC}"
        return 0
    else
        echo -e "${YELLOW}? $name (port $port) - Unexpected response${NC}"
        echo "  Response: $response"
        return 1
    fi
}

test_rpc 8545 "Ethereum"
test_rpc 8546 "Polygon"
test_rpc 8547 "Base"

echo ""
echo -e "${GREEN}✅ Node reset complete!${NC}"
echo ""
echo "Node PIDs:"
echo "  Ethereum: $ETHEREUM_PID"
echo "  Polygon:  $POLYGON_PID"
echo "  Base:     $BASE_PID"
echo ""
echo "Logs are available in:"
echo "  logs/ethereum-node.log"
echo "  logs/polygon-node.log"
echo "  logs/base-node.log"
echo ""
echo -e "${YELLOW}Next steps:${NC}"
echo "1. Clear MetaMask cache (Settings → Advanced → Clear activity tab data)"
echo "2. Remove all local networks from MetaMask (Settings → Networks)"
echo "3. Close and reopen your browser"
echo "4. Open the app and let it add networks automatically"
echo ""
echo "To stop nodes later, run:"
echo "  kill $ETHEREUM_PID $POLYGON_PID $BASE_PID"
