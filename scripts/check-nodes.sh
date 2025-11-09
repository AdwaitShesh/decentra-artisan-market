#!/bin/bash

# Check and Restart Hardhat Nodes Script
# This script checks if local Hardhat nodes are running and restarts them if needed

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Node configurations
declare -A NODES=(
    ["ethereum"]="8545:1337"
    ["polygon"]="8546:1338"
    ["base"]="8547:1341"
)

echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║     Hardhat Node Health Check & Auto-Restart Utility      ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

# Function to check if a port is in use
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null 2>&1 ; then
        return 0
    else
        return 1
    fi
}

# Function to test RPC endpoint
test_rpc() {
    local port=$1
    local expected_chain_id=$2
    local url="http://127.0.0.1:$port"
    
    # Try to get chain ID
    response=$(curl -s -X POST \
        -H "Content-Type: application/json" \
        --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
        --max-time 3 \
        "$url" 2>/dev/null)
    
    if [ $? -ne 0 ]; then
        return 1
    fi
    
    # Check if response contains result
    if echo "$response" | grep -q '"result"'; then
        chain_id=$(echo "$response" | grep -o '"result":"0x[^"]*"' | cut -d'"' -f4)
        chain_id_dec=$((16#${chain_id#0x}))
        
        if [ "$chain_id_dec" -eq "$expected_chain_id" ] || [ "$chain_id_dec" -eq 1337 ]; then
            return 0
        fi
    fi
    
    return 1
}

# Function to kill process on port
kill_port() {
    local port=$1
    echo -e "${YELLOW}  Killing existing process on port $port...${NC}"
    lsof -ti:$port | xargs kill -9 2>/dev/null || true
    sleep 1
}

# Function to start node
start_node() {
    local network=$1
    local port=$2
    local chain_id=$3
    
    echo -e "${BLUE}  Starting $network node on port $port...${NC}"
    
    cd contracts
    
    # Start node in background
    nohup npx hardhat node --port $port --network hardhat > "../logs/${network}-node.log" 2>&1 &
    local pid=$!
    
    cd ..
    
    echo -e "${GREEN}  Started with PID: $pid${NC}"
    echo "$pid" > "logs/${network}-node.pid"
    
    # Wait for node to be ready
    echo -e "${YELLOW}  Waiting for node to be ready...${NC}"
    for i in {1..30}; do
        sleep 1
        if test_rpc $port $chain_id; then
            echo -e "${GREEN}  ✓ Node is ready!${NC}"
            return 0
        fi
        echo -n "."
    done
    
    echo ""
    echo -e "${RED}  ✗ Node failed to start properly${NC}"
    return 1
}

# Create logs directory if it doesn't exist
mkdir -p logs

echo -e "${BLUE}Checking Hardhat nodes...${NC}"
echo ""

# Track status
all_healthy=true
needs_restart=()

# Check each node
for network in "${!NODES[@]}"; do
    IFS=':' read -r port chain_id <<< "${NODES[$network]}"
    
    echo -e "${CYAN}━━━ $network (Port: $port, Chain ID: $chain_id) ━━━${NC}"
    
    if check_port $port; then
        echo -e "${GREEN}  ✓ Port is in use${NC}"
        
        if test_rpc $port $chain_id; then
            echo -e "${GREEN}  ✓ RPC endpoint is responding correctly${NC}"
            echo -e "${GREEN}  ✓ Status: HEALTHY${NC}"
        else
            echo -e "${RED}  ✗ RPC endpoint not responding or wrong chain ID${NC}"
            echo -e "${YELLOW}  ⚠ Status: UNHEALTHY - Needs restart${NC}"
            all_healthy=false
            needs_restart+=("$network:$port:$chain_id")
        fi
    else
        echo -e "${RED}  ✗ Port is not in use${NC}"
        echo -e "${YELLOW}  ⚠ Status: NOT RUNNING${NC}"
        all_healthy=false
        needs_restart+=("$network:$port:$chain_id")
    fi
    
    echo ""
done

# Summary
echo -e "${CYAN}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║                         SUMMARY                            ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""

if [ "$all_healthy" = true ]; then
    echo -e "${GREEN}✓ All nodes are healthy and running!${NC}"
    echo ""
    echo -e "${BLUE}Node Status:${NC}"
    for network in "${!NODES[@]}"; do
        IFS=':' read -r port chain_id <<< "${NODES[$network]}"
        echo -e "  ${GREEN}✓${NC} $network: http://127.0.0.1:$port (Chain ID: $chain_id)"
    done
    echo ""
    exit 0
else
    echo -e "${YELLOW}⚠ Some nodes need attention${NC}"
    echo ""
    
    if [ ${#needs_restart[@]} -gt 0 ]; then
        echo -e "${YELLOW}Nodes that need restart:${NC}"
        for item in "${needs_restart[@]}"; do
            IFS=':' read -r network port chain_id <<< "$item"
            echo -e "  ${RED}✗${NC} $network (port $port)"
        done
        echo ""
        
        read -p "$(echo -e ${YELLOW}Do you want to restart unhealthy nodes? [y/N]:${NC} )" -n 1 -r
        echo ""
        
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            echo ""
            echo -e "${BLUE}Restarting nodes...${NC}"
            echo ""
            
            for item in "${needs_restart[@]}"; do
                IFS=':' read -r network port chain_id <<< "$item"
                
                echo -e "${CYAN}━━━ Restarting $network ━━━${NC}"
                
                # Kill existing process if any
                if check_port $port; then
                    kill_port $port
                fi
                
                # Start the node
                if start_node $network $port $chain_id; then
                    echo -e "${GREEN}✓ $network restarted successfully${NC}"
                else
                    echo -e "${RED}✗ Failed to restart $network${NC}"
                fi
                
                echo ""
            done
            
            echo -e "${GREEN}Restart process completed!${NC}"
            echo ""
            echo -e "${BLUE}Next steps:${NC}"
            echo "  1. Deploy contracts: cd contracts && node scripts/deploy-all.js"
            echo "  2. Update .env file with new contract addresses"
            echo "  3. Restart your frontend: npm run dev"
            echo ""
        else
            echo ""
            echo -e "${YELLOW}Skipping restart. To manually start nodes:${NC}"
            echo ""
            for item in "${needs_restart[@]}"; do
                IFS=':' read -r network port chain_id <<< "$item"
                echo "  cd contracts && npx hardhat node --port $port"
            done
            echo ""
        fi
    fi
    
    exit 1
fi
