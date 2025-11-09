#!/bin/bash

# Test RPC Endpoints Script
# Checks if local blockchain nodes are responding correctly

echo "🔍 Testing Local RPC Endpoints..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m'

test_endpoint() {
    local port=$1
    local name=$2
    local expected_chain_id=$3
    
    echo -e "${YELLOW}Testing $name (port $port)...${NC}"
    
    # Test 1: Basic connectivity
    local response=$(curl -s -X POST http://localhost:$port \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
        --max-time 5)
    
    if [ -z "$response" ]; then
        echo -e "${RED}  ✗ No response from endpoint${NC}"
        return 1
    fi
    
    if echo "$response" | grep -q "error"; then
        echo -e "${RED}  ✗ Error response:${NC}"
        echo "    $response"
        return 1
    fi
    
    # Extract chain ID
    local chain_id=$(echo "$response" | grep -o '"result":"[^"]*"' | cut -d'"' -f4)
    local chain_id_decimal=$((chain_id))
    
    if [ "$chain_id_decimal" -eq "$expected_chain_id" ]; then
        echo -e "${GREEN}  ✓ Chain ID: $chain_id_decimal (correct)${NC}"
    else
        echo -e "${RED}  ✗ Chain ID: $chain_id_decimal (expected $expected_chain_id)${NC}"
        return 1
    fi
    
    # Test 2: Block number
    local block_response=$(curl -s -X POST http://localhost:$port \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}' \
        --max-time 5)
    
    if echo "$block_response" | grep -q "result"; then
        local block_num=$(echo "$block_response" | grep -o '"result":"[^"]*"' | cut -d'"' -f4)
        echo -e "${GREEN}  ✓ Block number: $block_num${NC}"
    else
        echo -e "${RED}  ✗ Failed to get block number${NC}"
        return 1
    fi
    
    # Test 3: Network version
    local net_response=$(curl -s -X POST http://localhost:$port \
        -H "Content-Type: application/json" \
        -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}' \
        --max-time 5)
    
    if echo "$net_response" | grep -q "result"; then
        local net_version=$(echo "$net_response" | grep -o '"result":"[^"]*"' | cut -d'"' -f4)
        echo -e "${GREEN}  ✓ Network version: $net_version${NC}"
    else
        echo -e "${YELLOW}  ? Could not get network version${NC}"
    fi
    
    echo ""
    return 0
}

# Test all endpoints
test_endpoint 8545 "Ethereum" 1337
ETHEREUM_STATUS=$?

test_endpoint 8546 "Polygon" 1338
POLYGON_STATUS=$?

test_endpoint 8547 "Base" 1341
BASE_STATUS=$?

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Summary:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ $ETHEREUM_STATUS -eq 0 ]; then
    echo -e "${GREEN}✓ Ethereum (8545) - Healthy${NC}"
else
    echo -e "${RED}✗ Ethereum (8545) - Failed${NC}"
fi

if [ $POLYGON_STATUS -eq 0 ]; then
    echo -e "${GREEN}✓ Polygon (8546) - Healthy${NC}"
else
    echo -e "${RED}✗ Polygon (8546) - Failed${NC}"
fi

if [ $BASE_STATUS -eq 0 ]; then
    echo -e "${GREEN}✓ Base (8547) - Healthy${NC}"
else
    echo -e "${RED}✗ Base (8547) - Failed${NC}"
fi

echo ""

if [ $ETHEREUM_STATUS -eq 0 ] && [ $POLYGON_STATUS -eq 0 ] && [ $BASE_STATUS -eq 0 ]; then
    echo -e "${GREEN}✅ All RPC endpoints are healthy!${NC}"
    echo ""
    echo "You can now:"
    echo "1. Clear MetaMask cache and remove old networks"
    echo "2. Open your app and let it add networks automatically"
    exit 0
else
    echo -e "${RED}⚠️  Some RPC endpoints have issues!${NC}"
    echo ""
    echo "Try running: ./scripts/reset-nodes.sh"
    exit 1
fi
