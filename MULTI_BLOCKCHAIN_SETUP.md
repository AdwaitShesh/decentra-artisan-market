# Multi-Blockchain Setup Guide

This guide explains how to set up and use the multi-blockchain NFT minting system on a single Hardhat node.

## 🎯 What We've Built

- **Multi-blockchain support** on a single Hardhat node
- **Automatic network switching** in MetaMask
- **Gas fee comparison** with recommendations
- **Enhanced UI** showing network status and costs
- **Polygon as default** (lowest gas fees)

## 🚀 Quick Start

### 1. Start Hardhat Node
```bash
cd contracts/
npx hardhat node
```
Keep this running - it provides the blockchain at `http://127.0.0.1:8545`

### 2. Deploy Contract
```bash
# In contracts/ directory
npx hardhat run scripts/deploy.js --network localhost
```
Note the deployed address (should be: `0x5FbDB2315678afecb367f032d93F642f64180aa3`)

### 3. Set Up Environment
```bash
# In project root
cp .env.example .env
```
The `.env` file is already configured with the correct contract address.

### 4. Start Frontend
```bash
# In project root
npm install
npm run dev
```

## 🌐 Supported Networks (All on Same Node)

| Network | Chain ID | Symbol | Gas Cost | Recommended |
|---------|----------|--------|----------|-------------|
| Ethereum | 1337 | ETH | High (~$15-50) | ❌ |
| **Polygon** | 1338 | MATIC | Very Low (~$0.01-0.10) | ✅ |
| Optimism | 1339 | ETH | Low (~$1-5) | ❌ |
| Arbitrum | 1340 | ETH | Low (~$1-3) | ❌ |
| **Base** | 1341 | ETH | Very Low (~$0.05-0.50) | ✅ |

## 🔧 How It Works

### Network Simulation
- **Single Hardhat Node**: All networks use `http://127.0.0.1:8545`
- **Different Chain IDs**: Each "blockchain" has a unique chain ID
- **Same Contract**: The same deployed contract works across all networks
- **Gas Simulation**: UI shows different gas costs for each network

### Automatic Network Management
1. **Selection**: Choose blockchain in the minting form
2. **Detection**: App detects if you're on the wrong network
3. **Switching**: Automatically prompts MetaMask to switch/add networks
4. **Status**: Real-time network status with gas cost indicators

## 📱 MetaMask Setup

When you select a different blockchain, the app will automatically:

1. **Try to switch** to the target network
2. **Add the network** if it doesn't exist in MetaMask
3. **Show status** with gas cost comparison

### Manual Network Addition (if needed)

**Polygon (Local) - Chain ID 1338:**
- Network Name: `Polygon (Local)`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `1338`
- Currency Symbol: `MATIC`

**Base (Local) - Chain ID 1341:**
- Network Name: `Base (Local)`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `1341`
- Currency Symbol: `ETH`

## 🎨 Using the Enhanced UI

### 1. Navigate to Create NFT
- Go to `/create/mint` or use the "Create" menu
- The form now defaults to **Polygon** (lowest gas)

### 2. Blockchain Selection
- **Enhanced dropdown** shows:
  - Network colors and symbols
  - Gas cost estimates
  - "Recommended" badges for low-gas networks
  - Real-time cost comparison

### 3. Network Status Card
- **Connection status**: Shows if you're on the correct network
- **Gas cost indicator**: Color-coded (green=low, red=high)
- **Auto-switch button**: One-click network switching
- **Success messages**: Confirms when you're on a low-gas network

### 4. Minting Process
1. **Select blockchain** (Polygon recommended)
2. **Fill form details** (artwork, metadata, etc.)
3. **Review** your NFT in the preview step
4. **Check network status** in the mint step
5. **Switch network** if prompted
6. **Mint NFT** with optimized gas costs

## 🔍 Testing Different Networks

### Test Polygon (Recommended)
1. Select "Polygon" in the blockchain dropdown
2. Notice the "Recommended" badge and "Very Low" gas indicator
3. Proceed to mint step - you'll see the network status card
4. MetaMask will prompt to add/switch to Chain ID 1338

### Test Ethereum (High Gas)
1. Select "Ethereum" in the dropdown
2. Notice the "High" gas cost warning
3. The UI will show red indicators for expensive gas

### Compare Networks
- The dropdown shows all options with gas estimates
- Green badges indicate recommended low-gas networks
- Network status card provides real-time feedback

## 🛠 Development Notes

### File Structure
```
src/
├── lib/
│   ├── networkConfig.ts     # Network configurations
│   └── nftContract.ts       # Updated with multi-network support
├── components/
│   ├── NetworkStatus.tsx    # Network status component
│   └── NFTMintForm.tsx      # Enhanced with blockchain selection
contracts/
├── hardhat.config.js        # Updated with multiple network configs
└── scripts/deploy.js        # Deployment script
```

### Key Features Added
- **Dynamic network switching** with MetaMask integration
- **Gas cost simulation** and recommendations
- **Enhanced UI components** for network selection
- **Real-time network status** monitoring
- **Automatic network addition** to MetaMask

### Environment Variables
```bash
# All networks use the same contract address
VITE_NFT_CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3

# Default chain ID (Ethereum simulation)
VITE_CHAIN_ID=1337

# Local RPC (all networks use this)
VITE_RPC_URL=http://127.0.0.1:8545
```

## 🎉 What You'll See

1. **Enhanced Blockchain Dropdown**: Shows network colors, symbols, gas costs, and recommendations
2. **Network Status Card**: Real-time connection status with gas indicators
3. **Automatic Switching**: One-click network changes in MetaMask
4. **Smart Defaults**: Polygon selected by default for lowest gas costs
5. **Visual Feedback**: Color-coded gas indicators (green=good, red=expensive)

The system now provides a complete multi-blockchain experience while running on a single local Hardhat node, making it perfect for development and testing!
