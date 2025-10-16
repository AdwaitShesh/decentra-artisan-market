# Contract Deployment Guide

This guide explains how to deploy and manage smart contracts for the Decentra Artisan Market across multiple blockchain networks.

## Quick Start

### Option 1: Automated Deployment (Recommended)
```bash
# Ensure contracts are deployed and start the app
npm run dev:full
```

### Option 2: Manual Steps
```bash
# 1. Start all blockchain networks
npm run contracts:start

# 2. Deploy contracts to all networks
npm run contracts:deploy

# 3. Start the development server
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run contracts:start` | Start all local blockchain networks (Ethereum, Polygon, Base) |
| `npm run contracts:stop` | Stop all running blockchain networks |
| `npm run contracts:deploy` | Deploy contracts to all networks and update environment variables |
| `npm run contracts:ensure` | Check if contracts are deployed, deploy if needed |
| `npm run dev:full` | Ensure contracts are deployed and start the development server |

## Network Configuration

The project runs three local blockchain networks:

| Network | Port | Chain ID | RPC URL |
|---------|------|----------|---------|
| Ethereum | 8545 | 1337 | http://127.0.0.1:8545 |
| Polygon | 8546 | 1338 | http://127.0.0.1:8546 |
| Base | 8547 | 1341 | http://127.0.0.1:8547 |

## Contract Addresses

After deployment, contract addresses are automatically saved to:
- `contracts/deployments.json` - Full deployment details
- `.env` - Environment variables for the frontend

### Environment Variables
```bash
VITE_ETHEREUM_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_ETHEREUM_MARKETPLACE_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
VITE_POLYGON_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_POLYGON_MARKETPLACE_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
VITE_BASE_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
VITE_BASE_MARKETPLACE_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
```

## Troubleshooting

### "No contract found at address" Error

This error occurs when:
1. Blockchain networks are not running
2. Contracts are not deployed to the target network
3. Environment variables are outdated

**Solution:**
```bash
# Run the automated fix
npm run contracts:ensure
```

### Networks Not Starting

If networks fail to start:
1. Check if ports 8545, 8546, 8547 are available
2. Kill any existing Hardhat processes:
   ```bash
   pkill -f "hardhat node"
   ```
3. Restart networks:
   ```bash
   npm run contracts:start
   ```

### Deployment Failures

If contract deployment fails:
1. Ensure all networks are running
2. Check network connectivity:
   ```bash
   curl -X POST -H "Content-Type: application/json" \
     --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}' \
     http://127.0.0.1:8545
   ```
3. Redeploy contracts:
   ```bash
   npm run contracts:deploy
   ```

## Manual Deployment Steps

### 1. Start Networks
```bash
cd contracts
./scripts/start-networks.sh
```

### 2. Deploy Contracts
```bash
cd contracts
node scripts/deploy-all.js
```

### 3. Update Environment Variables
```bash
node update-env-from-deploy.cjs
```

## File Structure

```
contracts/
├── contracts/
│   ├── DecentraArtisanNFT.sol    # Main NFT contract
│   └── Marketplace.sol           # Marketplace contract
├── scripts/
│   ├── start-networks.sh         # Start all networks
│   ├── stop-networks.sh          # Stop all networks
│   └── deploy-all.js             # Deploy to all networks
├── hardhat.config.js             # Ethereum config
├── hardhat-polygon.config.js     # Polygon config
├── hardhat-base.config.js        # Base config
└── deployments.json              # Deployment addresses

scripts/
└── ensure-contracts-deployed.js  # Automated deployment checker

update-env-from-deploy.cjs        # Environment variable updater
.env                              # Environment variables
```

## Development Workflow

1. **First Time Setup:**
   ```bash
   npm install
   npm run contracts:start
   npm run contracts:deploy
   ```

2. **Daily Development:**
   ```bash
   npm run dev:full
   ```

3. **Reset Everything:**
   ```bash
   npm run contracts:stop
   npm run contracts:start
   npm run contracts:deploy
   ```

## MetaMask Configuration

To interact with the local networks in MetaMask:

1. **Add Custom Networks:**
   - Network Name: Ethereum Local
   - RPC URL: http://127.0.0.1:8545
   - Chain ID: 1337
   - Currency Symbol: ETH

2. **Import Test Account:**
   - Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`
   - This account has test ETH on all networks

## Production Deployment

For production deployment to real networks:

1. Update `hardhat.config.js` with mainnet configurations
2. Set up proper private keys and API keys
3. Deploy using: `npx hardhat run scripts/deploy.js --network mainnet`

## Security Notes

- Never commit private keys to version control
- Use environment variables for sensitive data
- Test thoroughly on testnets before mainnet deployment
- Consider using a hardware wallet for production deployments
