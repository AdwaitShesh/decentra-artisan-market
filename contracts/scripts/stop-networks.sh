#!/bin/bash

echo "🛑 Stopping Multi-Blockchain Development Environment..."

# Kill processes by PID if files exist
if [ -f logs/ethereum.pid ]; then
    ETHEREUM_PID=$(cat logs/ethereum.pid)
    kill $ETHEREUM_PID 2>/dev/null && echo "🔷 Stopped Ethereum network (PID: $ETHEREUM_PID)"
    rm logs/ethereum.pid
fi

if [ -f logs/polygon.pid ]; then
    POLYGON_PID=$(cat logs/polygon.pid)
    kill $POLYGON_PID 2>/dev/null && echo "🟣 Stopped Polygon network (PID: $POLYGON_PID)"
    rm logs/polygon.pid
fi

if [ -f logs/base.pid ]; then
    BASE_PID=$(cat logs/base.pid)
    kill $BASE_PID 2>/dev/null && echo "🔵 Stopped Base network (PID: $BASE_PID)"
    rm logs/base.pid
fi

# Fallback: kill any remaining hardhat processes
pkill -f "hardhat node" 2>/dev/null

echo "✅ All networks stopped!"
