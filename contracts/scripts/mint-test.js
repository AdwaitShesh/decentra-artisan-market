#!/usr/bin/env node
/*
  Mint a test NFT on each local network using the deployed contract.
  Usage:
    node scripts/mint-test.js <recipientAddress> [tokenURI] [creatorName] [editions]
  Defaults:
    tokenURI = ipfs://test-metadata
    creatorName = Test Creator
    editions = 1
*/
const fs = require('fs');
const path = require('path');
const { ethers } = require('ethers');

const DEPLOY_FILE = path.join(__dirname, '..', 'deployments.json');

function loadDeployments() {
  if (!fs.existsSync(DEPLOY_FILE)) {
    throw new Error(`deployments.json not found at ${DEPLOY_FILE}. Run: node scripts/deploy-all.js`);
  }
  const raw = JSON.parse(fs.readFileSync(DEPLOY_FILE, 'utf-8'));
  // Support array shape produced by deploy-all.js
  if (Array.isArray(raw)) {
    const map = {};
    for (const d of raw) {
      if (!d || !d.network) continue;
      map[d.network.toLowerCase()] = d.contractAddress;
    }
    return map;
  }
  // Or object shape with network keys
  return raw;
}

// Minimal ABI covering functions we need
const ABI = [
  "function mintNFT(address to, string tokenURI, uint256 royaltyPercentage, string creatorName, uint256 editions, string category) public returns (uint256)",
  "event NFTMinted(address indexed creator, uint256 indexed tokenId, string tokenURI, string creatorName, string category)",
  "function ownerOf(uint256 tokenId) public view returns (address)"
];

async function mintOn(port, contractAddress, to, tokenURI, creatorName, editions) {
  const url = `http://127.0.0.1:${port}`;
  const provider = new ethers.JsonRpcProvider(url);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, ABI, signer);

  const royaltyBps = 250; // 2.5%
  const category = 'art';

  const tx = await contract.mintNFT(to, tokenURI, royaltyBps, creatorName, editions, category);
  const receipt = await tx.wait();

  let mintedTokenId = null;
  for (const log of receipt.logs) {
    try {
      const parsed = contract.interface.parseLog({ topics: log.topics, data: log.data });
      if (parsed && parsed.name === 'NFTMinted') {
        mintedTokenId = parsed.args[1];
        break;
      }
    } catch (_) {}
  }
  console.log(`✅ Minted on ${url} tx=${receipt.hash} tokenId=${mintedTokenId ?? 'unknown'}`);
  return { receipt, tokenId: mintedTokenId };
}

(async () => {
  try {
    const to = process.argv[2];
    const tokenURI = process.argv[3] || 'ipfs://test-metadata';
    const creatorName = process.argv[4] || 'Test Creator';
    const editions = parseInt(process.argv[5] || '1', 10);

    if (!to) {
      console.error('Usage: node scripts/mint-test.js <recipientAddress> [tokenURI] [creatorName] [editions]');
      process.exit(1);
    }

    const deployments = loadDeployments();
    // Handle both map and nested shapes
    const ethAddress = deployments.ethereum?.DecentraArtisanNFT || deployments.ethereum || deployments["ethereum"] || deployments["Ethereum"];
    const polyAddress = deployments.polygon?.DecentraArtisanNFT || deployments.polygon || deployments["polygon"] || deployments["Polygon"];
    const baseAddress = deployments.base?.DecentraArtisanNFT || deployments.base || deployments["base"] || deployments["Base"];

    const results = [];

    if (ethAddress) results.push(await mintOn(8545, ethAddress, to, tokenURI, creatorName, editions));
    if (polyAddress) results.push(await mintOn(8546, polyAddress, to, tokenURI, creatorName, editions));
    if (baseAddress) results.push(await mintOn(8547, baseAddress, to, tokenURI, creatorName, editions));

    console.log('\nSummary:');
    results.forEach((r, i) => console.log(`  #${i + 1} tokenId=${r.tokenId ?? 'unknown'} block=${r.receipt.blockNumber}`));
  } catch (e) {
    console.error('❌ Mint test failed:', e.message || e);
    process.exit(1);
  }
})();
