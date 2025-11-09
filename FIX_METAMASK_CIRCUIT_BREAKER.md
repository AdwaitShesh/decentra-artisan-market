# 🔧 Fix MetaMask Circuit Breaker Error

## ✅ Your RPC Nodes Are Healthy!

Good news! I've tested your local blockchain nodes and they're all responding correctly:
- ✓ Ethereum (port 8545) - Chain ID 1337
- ✓ Polygon (port 8546) - Chain ID 1338  
- ✓ Base (port 8547) - Chain ID 1341

The issue is with **MetaMask's circuit breaker** blocking requests due to previous errors.

---

## 🚀 Quick Fix (Follow These Steps)

### Step 1: Clear MetaMask Cache ⚡

1. Open **MetaMask** extension
2. Click the **three dots (⋮)** in top right corner
3. Go to **Settings** → **Advanced**
4. Scroll down to find **"Clear activity tab data"**
5. Click **"Clear"** button
6. Confirm by clicking **"Clear"** again

### Step 2: Remove All Local Networks 🗑️

1. In MetaMask, go to **Settings** → **Networks**
2. Look for networks with these names:
   - Ethereum (Local)
   - Polygon (Local)
   - Optimism (Local)
   - Arbitrum (Local)
   - Base (Local)

3. **For EACH network:**
   - Click on the network name
   - Scroll to the bottom
   - Click **"Delete"** button
   - Confirm deletion

**Important:** Delete ALL local networks (any using localhost or 127.0.0.1)

### Step 3: Restart Browser 🔄

1. **Close your browser completely** (all windows)
2. Wait 5 seconds
3. **Reopen your browser**
4. Open MetaMask to verify it's working

### Step 4: Let the App Add Networks Automatically ✨

**DO NOT manually add networks!** Instead:

1. Open your NFT marketplace app: `npm run dev`
2. Navigate to **"Create NFT"** page
3. In the blockchain dropdown, select **"Polygon"** (recommended)
4. MetaMask will popup asking to **"Add Network"**
5. Click **"Approve"** in MetaMask
6. Wait for network to be added and switched
7. Repeat for other blockchains as needed

---

## 🛠️ Alternative: Reset Everything

If the quick fix doesn't work, use the reset script:

```bash
# This will kill and restart all local nodes
./scripts/reset-nodes.sh
```

Then follow Steps 1-4 above.

---

## 📋 Manual Network Configuration (Last Resort)

If automatic addition fails, add networks manually with these **EXACT** settings:

### Ethereum (Local)
```
Network Name: Ethereum (Local)
RPC URL: http://localhost:8545
Chain ID: 1337
Currency Symbol: ETH
```

### Polygon (Local)
```
Network Name: Polygon (Local)
RPC URL: http://localhost:8546
Chain ID: 1338
Currency Symbol: MATIC
```

### Base (Local)
```
Network Name: Base (Local)
RPC URL: http://localhost:8547
Chain ID: 1341
Currency Symbol: ETH
```

---

## 🔍 Verify Everything Works

After completing the steps above:

1. **Test RPC endpoints:**
   ```bash
   ./scripts/test-rpc.sh
   ```

2. **Open the app:**
   ```bash
   npm run dev
   ```

3. **Try to mint an NFT:**
   - Go to "Create NFT" page
   - Select Polygon network
   - Fill in NFT details
   - Click "Mint NFT"

---

## ❓ Why Did This Happen?

MetaMask has a **circuit breaker** protection that activates when:
- Too many RPC requests fail in a short time
- Network connection is unstable
- Local nodes restart while MetaMask is connected
- Rapid network switching

The circuit breaker **temporarily blocks** requests to protect your wallet.

---

## 🛡️ Prevention Tips

1. **Always start nodes BEFORE opening the app**
   ```bash
   # Check if nodes are running
   ./scripts/test-rpc.sh
   ```

2. **Don't rapidly switch networks** - give MetaMask 2-3 seconds between switches

3. **Use the app's network selector** instead of manually switching in MetaMask

4. **If you see errors, wait 30 seconds** before retrying

5. **Restart nodes cleanly** when needed:
   ```bash
   ./scripts/reset-nodes.sh
   ```

---

## 🆘 Still Having Issues?

### Check Browser Console

1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Look for errors containing:
   - "circuit breaker"
   - "RPC endpoint"
   - "UNKNOWN_ERROR"

### Check MetaMask Activity

1. MetaMask → Settings → Activity
2. Look for failed transactions
3. Note which network they're on

### Nuclear Option: Reset MetaMask Account

⚠️ **WARNING: Only do this if nothing else works!**

1. Make sure you have your **seed phrase** saved!
2. MetaMask → Settings → Advanced
3. Click **"Reset Account"**
4. Confirm reset
5. Re-import your account using seed phrase
6. Follow Steps 1-4 from the Quick Fix section

---

## 📊 Quick Checklist

- [ ] Cleared MetaMask activity data
- [ ] Deleted all local networks from MetaMask
- [ ] Closed and reopened browser
- [ ] Verified nodes are running (`./scripts/test-rpc.sh`)
- [ ] Let app add networks automatically
- [ ] Successfully minted a test NFT

---

## 🎯 Expected Result

After following these steps:
- ✅ No more circuit breaker errors
- ✅ Networks switch smoothly
- ✅ NFT minting works without delays
- ✅ Clear status messages in the app

---

## 📞 Need More Help?

If you're still experiencing issues:

1. Run diagnostics:
   ```bash
   ./scripts/test-rpc.sh
   ```

2. Check node logs:
   ```bash
   tail -f logs/ethereum-node.log
   tail -f logs/polygon-node.log
   tail -f logs/base-node.log
   ```

3. Verify contract deployments:
   ```bash
   cd contracts
   npm run deploy:all
   ```

---

**Good luck! 🚀**
