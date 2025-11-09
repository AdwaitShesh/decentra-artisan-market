# RPC Error Fix Guide

## 🔴 Problem: "RPC endpoint returned too many errors"

If you're seeing this error:
```
Error: could not coalesce error (error={ "code": -32002, "message": "RPC endpoint returned too many errors, retrying in 23.14 minutes. Consider using a different RPC endpoint." }
```

This means MetaMask has hit a rate limit or circuit breaker on your local RPC endpoint. This typically happens when:
- The local Hardhat node crashed or was restarted
- MetaMask made too many failed requests to the RPC endpoint
- Network configuration in MetaMask is corrupted

## ✅ Quick Fix (Automated)

Run this single command to check nodes and reset MetaMask:
```bash
npm run fix-rpc
```

This will:
1. Check if all Hardhat nodes are running
2. Restart any unhealthy nodes
3. Provide instructions to reset MetaMask networks

## 🔧 Manual Fix (Step-by-Step)

### Step 1: Check Your Hardhat Nodes

Run the node health check:
```bash
npm run check-nodes
```

This will:
- Test all RPC endpoints (ports 8545, 8546, 8547)
- Show which nodes are healthy
- Offer to restart unhealthy nodes automatically

If nodes are not running, start them:
```bash
# Start all networks
npm run contracts:start

# Or start individual networks
cd contracts
npx hardhat node --port 8545  # Ethereum
npx hardhat node --port 8546  # Polygon
npx hardhat node --port 8547  # Base
```

### Step 2: Reset MetaMask Networks

Run the MetaMask reset utility:
```bash
npm run reset-metamask
```

This will:
- Test all RPC endpoints
- Show detailed instructions for resetting MetaMask
- Generate a browser console script to re-add networks automatically

### Step 3: Reset MetaMask Account

1. Open MetaMask extension
2. Click your account icon (top right)
3. Go to **Settings → Advanced**
4. Scroll down and click **"Clear activity tab data"**
5. Click **"Reset account"** (this only clears transaction history, your funds are safe)

### Step 4: Remove Old Networks from MetaMask

1. In MetaMask, go to **Settings → Networks**
2. Find and delete these networks:
   - Ethereum (Local)
   - Polygon (Local)
   - Base (Local)
3. Click the trash icon next to each network

### Step 5: Re-add Networks

#### Option A: Automated (Recommended)

1. Copy the script from the `npm run reset-metamask` output
2. Open your browser's Developer Console (F12)
3. Paste and run the script
4. Approve each network addition in MetaMask

#### Option B: Manual

Add each network manually in MetaMask:

**Ethereum (Local)**
- Network Name: `Ethereum (Local)`
- RPC URL: `http://127.0.0.1:8545`
- Chain ID: `1337`
- Currency Symbol: `ETH`

**Polygon (Local)**
- Network Name: `Polygon (Local)`
- RPC URL: `http://127.0.0.1:8546`
- Chain ID: `1338`
- Currency Symbol: `MATIC`

**Base (Local)**
- Network Name: `Base (Local)`
- RPC URL: `http://127.0.0.1:8547`
- Chain ID: `1341`
- Currency Symbol: `ETH`

### Step 6: Deploy Contracts (if needed)

If you restarted nodes, redeploy contracts:
```bash
npm run contracts:deploy
```

This will:
- Deploy contracts to all networks
- Update your `.env` file with new contract addresses

### Step 7: Restart Your App

```bash
npm run dev
```

## 🛡️ Prevention

The following improvements have been added to prevent this error:

### 1. Automatic Retry Logic
The `nftContract.ts` now includes:
- Exponential backoff retry (3 attempts)
- Automatic detection of circuit breaker errors
- Better error messages with actionable fixes

### 2. Circuit Breaker Detection
The app now detects when MetaMask's circuit breaker is triggered and shows a banner with fix instructions.

### 3. Health Checks
Before making RPC calls, the app checks:
- If the RPC endpoint is reachable
- If the chain ID matches expectations
- If the network is responding correctly

## 🔍 Troubleshooting

### Error persists after following all steps?

1. **Check if nodes are actually running:**
   ```bash
   lsof -i :8545
   lsof -i :8546
   lsof -i :8547
   ```

2. **Check node logs:**
   ```bash
   cat logs/ethereum-node.log
   cat logs/polygon-node.log
   cat logs/base-node.log
   ```

3. **Kill all node processes and restart:**
   ```bash
   npm run contracts:stop
   killall -9 node
   npm run contracts:start
   npm run contracts:deploy
   ```

4. **Clear MetaMask completely:**
   - Settings → Advanced → Reset account
   - Settings → Advanced → Clear activity tab data
   - Remove all local networks
   - Close and reopen MetaMask
   - Re-add networks using the automated script

5. **Check for port conflicts:**
   ```bash
   # See what's using your ports
   sudo lsof -i :8545
   sudo lsof -i :8546
   sudo lsof -i :8547
   ```

### Still having issues?

1. Try using a different browser
2. Try disabling and re-enabling MetaMask extension
3. Check if your firewall is blocking localhost connections
4. Make sure you're not running other blockchain nodes on the same ports

## 📚 Related Documentation

- [METAMASK_NETWORKS_GUIDE.md](./METAMASK_NETWORKS_GUIDE.md) - Detailed MetaMask setup
- [TRUE_MULTI_NETWORK_SETUP.md](./TRUE_MULTI_NETWORK_SETUP.md) - Multi-network configuration
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Contract deployment guide

## 🎯 Quick Reference Commands

```bash
# Check node health
npm run check-nodes

# Reset MetaMask (get instructions)
npm run reset-metamask

# Full fix (check nodes + reset instructions)
npm run fix-rpc

# Start all nodes
npm run contracts:start

# Stop all nodes
npm run contracts:stop

# Deploy contracts
npm run contracts:deploy

# Start app
npm run dev

# Full restart
npm run contracts:stop && npm run contracts:start && npm run contracts:deploy && npm run dev
```

## 💡 Understanding the Error

**What is a Circuit Breaker?**
MetaMask implements a circuit breaker pattern to protect against faulty RPC endpoints. When an endpoint returns too many errors in a short period, MetaMask temporarily blocks requests to that endpoint.

**Why does this happen with local nodes?**
- Local nodes restart frequently during development
- Each restart creates a new blockchain state
- MetaMask's cached data becomes invalid
- Multiple failed requests trigger the circuit breaker

**How does the fix work?**
1. **Retry Logic**: Automatically retries failed requests with exponential backoff
2. **Circuit Breaker Detection**: Detects when MetaMask blocks requests
3. **Network Reset**: Removes corrupted network configuration
4. **Fresh Start**: Re-adds networks with clean configuration

## 🔐 Safety Notes

- Resetting MetaMask account only clears transaction history
- Your private keys and funds remain safe
- Local test networks don't contain real funds
- Always backup your seed phrase before making MetaMask changes

## 📞 Need Help?

If you're still experiencing issues after following this guide:
1. Check the console for detailed error messages
2. Review the node logs in the `logs/` directory
3. Ensure all dependencies are installed: `npm install`
4. Try with a fresh MetaMask installation in a new browser profile
