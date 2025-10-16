#!/bin/bash

# Setup script for Decentra Artisan Market environment
echo "Setting up environment configuration..."

# Create .env file with IPFS configuration
cat > .env << 'EOF'
# Vite environment variables for Decentra Artisan Market
# IPFS Configuration
VITE_IPFS_API_URL=http://127.0.0.1:5001
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/

# NFT Contract Configuration (Single Network Setup)
VITE_NFT_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# Development Configuration
NODE_ENV=development
EOF

echo "✅ Created .env file with IPFS configuration"
echo "📍 IPFS API URL: http://127.0.0.1:5001"
echo "🌐 IPFS Gateway: https://ipfs.io/ipfs/"
echo ""
echo "🔧 IPFS daemon is configured with CORS for:"
echo "   - http://localhost:8080 (Vite dev server)"
echo "   - http://127.0.0.1:8080"
echo "   - http://localhost:3000"
echo "   - http://127.0.0.1:3000"
echo ""
echo "🚀 You can now restart your Vite dev server to test IPFS connectivity!"
