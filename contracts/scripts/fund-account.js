#!/usr/bin/env node
/*
  Fund a given address on all local networks (Ethereum 8545, Polygon 8546, Base 8547)
  Usage:
    node scripts/fund-account.js <address> [amountEther]
  Defaults:
    amountEther = 100
*/
const { ethers } = require('ethers');

async function fundOn(port, address, amountEther) {
  const url = `http://127.0.0.1:${port}`;
  const provider = new ethers.JsonRpcProvider(url);
  const wallet = await provider.getSigner(0);
  const value = ethers.parseEther(amountEther);
  const tx = await wallet.sendTransaction({ to: address, value });
  const r = await tx.wait();
  console.log(`✅ Funded ${address} with ${amountEther} ETH on ${url} in block ${r.blockNumber}`);
}

(async () => {
  const address = process.argv[2];
  const amount = process.argv[3] || '100';
  if (!address) {
    console.error('Usage: node scripts/fund-account.js <address> [amountEther]');
    process.exit(1);
  }
  for (const port of [8545, 8546, 8547]) {
    try {
      await fundOn(port, address, amount);
    } catch (e) {
      console.warn(`⚠️ Failed to fund on port ${port}:`, e.message || e);
    }
  }
})();
