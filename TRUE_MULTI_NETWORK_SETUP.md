# True Multi-Network Setup Guide

Now you have **TWO OPTIONS** for running your multi-blockchain NFT marketplace:

## 🎯 **Option 1: UI Simulation (Current - Recommended for Development)**

**What it does:**
- Single Hardhat node (Chain ID 1337)
- UI shows different blockchain names and gas costs
- All transactions go to the same contract
- Easy setup, perfect for development

**How to use:**
```bash
# Current setup - just run your existing Hardhat node
cd contracts/
npx hardhat node

# In another terminal
npm run dev
```

## 🚀 **Option 2: True Multi-Network (Advanced - Real Network Switching)**

**What it does:**
- Multiple Hardhat nodes with different chain IDs
- Real network switching in MetaMask
- Separate contracts on each network
- True multi-blockchain experience

### **Setup True Multi-Network:**

#### 1. **Start Multiple Networks**
```bash
cd contracts/

# Create logs directory
mkdir -p logs

# Start all networks (this will run 3 Hardhat nodes)
./scripts/start-networks.sh
```

This starts:
- 🔷 **Ethereum**: `http://127.0.0.1:8545` (Chain ID: 1337)
- 🟣 **Polygon**: `http://127.0.0.1:8546` (Chain ID: 1338)  
- 🔵 **Base**: `http://127.0.0.1:8547` (Chain ID: 1341)

#### 2. **Deploy Contracts to All Networks**
```bash
# In another terminal, while networks are running
cd contracts/
node scripts/deploy-all.js
```

This will:
- Deploy contracts to all 3 networks
- Save addresses to `deployments.json`
- Show environment variables to copy

#### 3. **Update Environment Variables**
Copy the contract addresses from the deployment output to your `.env` file:

```bash
# Copy .env.example to .env
cp .env.example .env

# Edit .env and uncomment/set the individual contract addresses:
VITE_ETHEREUM_CONTRACT_ADDRESS=0x...
VITE_POLYGON_CONTRACT_ADDRESS=0x...
VITE_BASE_CONTRACT_ADDRESS=0x...
```

#### 4. **Start Frontend**
```bash
# In project root
npm run dev
```

#### 5. **Add Networks to MetaMask**

The app will automatically prompt you to add networks, but you can add them manually:

**Ethereum (Local):**
- Network Name: `Ethereum (Local)`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `1337`
- Currency: `ETH`

**Polygon (Local):**
- Network Name: `Polygon (Local)`
- RPC URL: `http://127.0.0.1:8546`
- Chain ID: `1338`
- Currency: `MATIC`

**Base (Local):**
- Network Name: `Base (Local)`
- RPC URL: `http://127.0.0.1:8547`
- Chain ID: `1341`
- Currency: `ETH`

#### 6. **Test Multi-Network**
1. Go to `/create/mint`
2. Select different blockchains from dropdown
3. Watch MetaMask automatically switch networks
4. Each network will have its own contract and transactions

#### 7. **Stop Networks**
```bash
cd contracts/
./scripts/stop-networks.sh
```

## 🔍 **Comparison**

| Feature | UI Simulation | True Multi-Network |
|---------|---------------|-------------------|
| **Setup Complexity** | ⭐ Easy | ⭐⭐⭐ Advanced |
| **Resource Usage** | Low (1 node) | High (3 nodes) |
| **Network Switching** | UI only | Real MetaMask switching |
| **Contract Addresses** | Same contract | Different contracts |
| **Development Speed** | Fast | Slower |
| **Realism** | Medium | High |
| **Perfect for** | Development/Testing | Demo/Production-like |

## 🎨 **What You'll Experience**

### **UI Simulation (Option 1):**
- Select "Polygon" → Shows MATIC symbol, low gas costs
- Select "Base" → Shows ETH symbol, very low gas costs  
- All transactions go to same Hardhat network (1337)
- Fast and simple

### **True Multi-Network (Option 2):**
- Select "Polygon" → MetaMask switches to Chain ID 1338
- Select "Base" → MetaMask switches to Chain ID 1341
- Each network has its own contract and state
- Real multi-blockchain experience

## 🚀 **Recommendation**

**For Development:** Use **Option 1** (UI Simulation) - it's faster and easier to work with.

**For Demos/Production-like Testing:** Use **Option 2** (True Multi-Network) - it provides the full multi-blockchain experience.

## 🛠 **Current Status**

Your code now supports **BOTH** options! The system will:
- Use UI simulation if you run a single Hardhat node
- Use true multi-network if you run multiple nodes and set individual contract addresses

**Try Option 2 now** if you want to see real network switching in action! 🎉
