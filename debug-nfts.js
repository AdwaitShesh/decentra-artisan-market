// Debug script to test NFT fetching
import { ethers } from 'ethers';

// Network configurations
const networks = {
  ethereum: {
    name: 'Ethereum',
    rpcUrl: 'http://127.0.0.1:8545',
    contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  },
  polygon: {
    name: 'Polygon',
    rpcUrl: 'http://127.0.0.1:8546', 
    contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  },
  base: {
    name: 'Base',
    rpcUrl: 'http://127.0.0.1:8547',
    contractAddress: '0x5FbDB2315678afecb367f032d93F642f64180aa3'
  }
};

async function checkNetwork(networkName, config) {
  console.log(`\n🔍 Checking ${networkName}...`);
  
  try {
    const provider = new ethers.JsonRpcProvider(config.rpcUrl);
    
    // Check if network is accessible
    const chainId = await provider.getNetwork();
    console.log(`✅ Network accessible - Chain ID: ${chainId.chainId}`);
    
    // Check if contract exists
    const code = await provider.getCode(config.contractAddress);
    if (!code || code === '0x') {
      console.log(`❌ No contract found at ${config.contractAddress}`);
      return { network: networkName, accessible: true, contractExists: false, totalSupply: 0 };
    }
    
    console.log(`✅ Contract exists at ${config.contractAddress}`);
    
    // Create contract instance
    const contract = new ethers.Contract(
      config.contractAddress,
      [
        'function totalSupply() view returns (uint256)',
        'function nextTokenId() view returns (uint256)',
        'function ownerOf(uint256) view returns (address)',
        'function tokenURI(uint256) view returns (string)'
      ],
      provider
    );
    
    // Find highest token ID by checking ownership
    let highestTokenId = 0;
    const maxCheck = 20; // Check up to token ID 20
    
    for (let tokenId = 1; tokenId <= maxCheck; tokenId++) {
      try {
        const owner = await contract.ownerOf(tokenId);
        if (owner && owner !== ethers.ZeroAddress) {
          highestTokenId = tokenId;
          console.log(`✅ Token ${tokenId} exists - Owner: ${owner}`);
        }
      } catch (e) {
        // Token doesn't exist, continue
        break; // Stop at first non-existent token
      }
    }
    
    console.log(`✅ Highest Token ID: ${highestTokenId}`);
    
    // If there are NFTs, try to fetch the first one's metadata
    if (highestTokenId > 0) {
      try {
        const tokenURI = await contract.tokenURI(1);
        console.log(`✅ Token 1 - URI: ${tokenURI}`);
      } catch (e) {
        console.log(`❌ Could not fetch token 1 URI: ${e.message}`);
      }
    }
    
    return {
      network: networkName,
      accessible: true,
      contractExists: true,
      totalSupply: highestTokenId,
      rpcUrl: config.rpcUrl,
      contractAddress: config.contractAddress
    };
    
  } catch (error) {
    console.log(`❌ Network error: ${error.message}`);
    return { network: networkName, accessible: false, error: error.message };
  }
}

async function main() {
  console.log('🚀 NFT Debug Script');
  console.log('==================');
  
  const results = [];
  
  for (const [networkName, config] of Object.entries(networks)) {
    const result = await checkNetwork(networkName, config);
    results.push(result);
  }
  
  console.log('\n📊 Summary:');
  console.log('===========');
  
  let totalNFTs = 0;
  for (const result of results) {
    if (result.accessible && result.contractExists) {
      console.log(`${result.network}: ${result.totalSupply} NFTs`);
      totalNFTs += result.totalSupply;
    } else {
      console.log(`${result.network}: Not accessible or no contract`);
    }
  }
  
  console.log(`\nTotal NFTs across all networks: ${totalNFTs}`);
  
  if (totalNFTs === 0) {
    console.log('\n💡 Suggestions:');
    console.log('- Make sure you have minted at least one NFT');
    console.log('- Check that the blockchain networks are running');
    console.log('- Verify that contracts are deployed to all networks');
    console.log('- Run: npm run contracts:ensure');
  }
}

main().catch(console.error);
