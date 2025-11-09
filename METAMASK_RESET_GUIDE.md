# MetaMask Reset & Network Setup Guide

## Problem
Error: `RPC endpoint returned too many errors, retrying in 2.81 minutes`

This is MetaMask's circuit breaker protection kicking in due to too many failed RPC requests.

## Solution: Reset MetaMask Networks

### Step 1: Clear MetaMask Cache & Remove Networks

1. **Open MetaMask** in your browser
2. Click the **three dots** (⋮) in the top right
3. Go to **Settings** → **Advanced**
4. Scroll down and click **"Clear activity tab data"**
5. Click **"Clear"** to confirm

### Step 2: Remove All Local Networks

1. In MetaMask, go to **Settings** → **Networks**
2. Remove ALL local networks (any network using localhost or 127.0.0.1):
   - Ethereum (Local) - Chain ID 1337
   - Polygon (Local) - Chain ID 1338
   - Optimism (Local) - Chain ID 1339
   - Arbitrum (Local) - Chain ID 1340
   - Base (Local) - Chain ID 1341

**For each network:**
- Click on the network name
- Scroll down and click **"Delete"**
- Confirm deletion

### Step 3: Restart MetaMask

1. **Close** your browser completely (not just the tab)
2. **Reopen** your browser
3. **Open MetaMask** again

### Step 4: Verify Local Nodes Are Running

Before adding networks back, make sure your local blockchain nodes are running:

```bash
# Check if nodes are running on the correct ports
curl -X POST http://localhost:8545 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
curl -X POST http://localhost:8546 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
curl -X POST http://localhost:8547 -H "Content-Type: application/json" -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```

If these fail, start your local nodes first!

### Step 5: Add Networks Through the App

**DO NOT manually add networks in MetaMask!** Instead:

1. Open your NFT marketplace app
2. Go to the **"Create NFT"** page
3. Select a blockchain from the dropdown (e.g., Polygon)
4. The app will **automatically prompt MetaMask** to add the network
5. Click **"Approve"** in the MetaMask popup
6. Repeat for each blockchain you want to use

### Step 6: Alternative - Manual Network Addition (If Needed)

If the automatic method doesn't work, add networks manually with these EXACT settings:

#### Ethereum (Local)
- **Network Name**: Ethereum (Local)
- **RPC URL**: http://localhost:8545
- **Chain ID**: 1337
- **Currency Symbol**: ETH

#### Polygon (Local)
- **Network Name**: Polygon (Local)
- **RPC URL**: http://localhost:8546
- **Chain ID**: 1338
- **Currency Symbol**: MATIC

#### Optimism (Local)
- **Network Name**: Optimism (Local)
- **RPC URL**: http://localhost:8545
- **Chain ID**: 1339
- **Currency Symbol**: ETH

#### Arbitrum (Local)
- **Network Name**: Arbitrum (Local)
- **RPC URL**: http://localhost:8545
- **Chain ID**: 1340
- **Currency Symbol**: ETH

#### Base (Local)
- **Network Name**: Base (Local)
- **RPC URL**: http://localhost:8547
- **Chain ID**: 1341
- **Currency Symbol**: ETH

## Additional Troubleshooting

### If Circuit Breaker Persists

1. **Wait**: MetaMask's circuit breaker has a cooldown period (2-3 minutes)
2. **Clear Browser Cache**: 
   - Chrome: Settings → Privacy → Clear browsing data
   - Select "Cached images and files"
   - Click "Clear data"

3. **Reset MetaMask Completely** (LAST RESORT):
   - ⚠️ **WARNING**: This will remove all accounts! Make sure you have your seed phrase!
   - Settings → Advanced → Reset Account
   - Re-import your accounts using seed phrase

### If RPC Endpoints Are Down

```bash
# Restart your local Hardhat nodes
cd contracts

# Kill any existing processes on the ports
lsof -ti:8545 | xargs kill -9
lsof -ti:8546 | xargs kill -9
lsof -ti:8547 | xargs kill -9

# Start fresh nodes
npm run node:ethereum &
npm run node:polygon &
npm run node:base &
```

### Check Node Health

```bash
# Test each RPC endpoint
curl -X POST http://localhost:8545 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}'

curl -X POST http://localhost:8546 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}'

curl -X POST http://localhost:8547 \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"net_version","params":[],"id":1}'
```

## Prevention Tips

1. **Always start local nodes BEFORE opening the app**
2. **Don't rapidly switch networks** - give MetaMask time to process
3. **Use the app's network switcher** instead of manually switching in MetaMask
4. **If you see errors, wait a moment** before retrying
5. **Keep browser console open** to see what's happening

## Quick Recovery Steps (Summary)

1. ✅ Clear MetaMask activity data
2. ✅ Delete all local networks from MetaMask
3. ✅ Close and reopen browser
4. ✅ Verify local nodes are running
5. ✅ Let the app add networks automatically
6. ✅ Test minting on one network first

## Need More Help?

If issues persist:
1. Check the browser console for detailed errors
2. Check MetaMask's activity log (Settings → Activity)
3. Verify contract addresses match your deployed contracts
4. Ensure you're using the correct account in MetaMask
