# ⚡ QUICK FIX - RPC Endpoint Error

## 🚨 Error You're Seeing
```
Error: could not coalesce error (error={ "code": -32002, "message": "RPC endpoint returned too many errors, retrying in 23.14 minutes..."
```

## 🎯 EASIEST FIX (In-App Button - NO CONSOLE NEEDED!)

1. **Look for the red error banner in the app**
2. **Click "Reset & Add Networks" button**
3. **Approve each network in MetaMask**

That's it! The app will automatically add all networks for you.

---

## 📋 Manual Fix (3 Steps - Takes 2 minutes)

### 1️⃣ Reset MetaMask Account
```
MetaMask → Settings → Advanced → Reset account
```
⚠️ This only clears transaction history. Your funds are safe!

### 2️⃣ Delete Old Networks
```
MetaMask → Settings → Networks → Delete:
  - Ethereum (Local)
  - Polygon (Local)  
  - Base (Local)
```

### 3️⃣ Use In-App Button
```
Open the app → Look for error banner → Click "Reset & Add Networks"
```
The button will automatically add all networks - just approve in MetaMask!

---

## 🔧 Alternative: Terminal Commands

```bash
npm run fix-rpc
```

Then follow the on-screen instructions.

---

## ✅ Verify It Worked

```bash
# Test all RPC endpoints
npm run reset-metamask

# Should show: "Working: 3/3" ✓
```

---

## 🔄 If Still Not Working

### Full Reset
```bash
# Stop all nodes
npm run contracts:stop

# Kill any stuck processes
killall -9 node

# Start fresh
npm run contracts:start
npm run contracts:deploy
npm run dev
```

### Then Repeat Steps 2-4 Above

---

## 📚 More Help

- **Quick Guide**: `RPC_ERROR_FIX_GUIDE.md`
- **Full Solution**: `SOLUTION_SUMMARY.md`
- **MetaMask Setup**: `METAMASK_NETWORKS_GUIDE.md`

---

## 🎓 What Happened?

MetaMask's circuit breaker was triggered because:
1. Your local Hardhat node was restarted
2. MetaMask made requests to the old (dead) node
3. Too many failures triggered the circuit breaker
4. MetaMask blocked all requests for 23+ minutes

**The fix**: Reset MetaMask's network cache and re-add networks fresh.

---

**That's it! Your RPC error should be fixed. 🎉**

**Pro Tip**: Run `npm run check-nodes` before starting work to catch issues early!
