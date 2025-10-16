# MetaMask Multi-Network Setup Guide

## 🌐 **Add All Networks to MetaMask**

You need to add these 3 networks to MetaMask for the true multi-blockchain experience:

### **1. Ethereum (Local) - Chain ID 1337**
- **Network Name**: `Ethereum (Local)`
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `1337`
- **Currency Symbol**: `ETH`

### **2. Polygon (Local) - Chain ID 1338**
- **Network Name**: `Polygon (Local)`  
- **RPC URL**: `http://127.0.0.1:8546`
- **Chain ID**: `1338`
- **Currency Symbol**: `MATIC`

### **3. Base (Local) - Chain ID 1341**
- **Network Name**: `Base (Local)`
- **RPC URL**: `http://127.0.0.1:8547`
- **Chain ID**: `1341`
- **Currency Symbol**: `ETH`

## 🔧 **How to Add Networks Manually:**

1. **Open MetaMask**
2. **Click the network dropdown** (top center)
3. **Click "Add network"**
4. **Click "Add a network manually"**
5. **Fill in the details** for each network above
6. **Click "Save"**

## 🚀 **Automatic Network Addition:**

The app will automatically prompt you to add networks when you:
1. Select a blockchain in the NFT minting form
2. The app detects you're on the wrong network
3. Click "Switch to [Network Name]" button

## 🎯 **How It Works:**

- **Select "Ethereum"** → App switches to Chain ID 1337
- **Select "Polygon"** → App switches to Chain ID 1338  
- **Select "Base"** → App switches to Chain ID 1341

Each network has its own:
- ✅ **Unique Chain ID**
- ✅ **Separate RPC URL** (different port)
- ✅ **Individual Contract Address**
- ✅ **Different Gas Cost Simulation**

## 🔍 **Current Issue Fix:**

If you see "Wrong Network" error:
1. **Check which blockchain** you selected in the dropdown
2. **Look at the Chain ID** it expects
3. **Let the app automatically switch** or manually switch in MetaMask
4. **Each blockchain selection** should match its corresponding Chain ID

Your true multi-blockchain setup is now ready! 🎉
