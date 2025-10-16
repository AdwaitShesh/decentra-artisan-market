// Deploy contracts to all networks and save addresses
const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function deployToNetwork(networkName, rpcUrl, chainId) {
  console.log(`\n🚀 Deploying to ${networkName} (Chain ID: ${chainId})...`);
  
  try {
    // Create a custom provider for this network
    const provider = new hre.ethers.JsonRpcProvider(rpcUrl);
    
    // Get the first account from the provider
    const accounts = await provider.listAccounts();
    if (accounts.length === 0) {
      throw new Error(`No accounts available on ${networkName}`);
    }
    
    const deployer = accounts[0];
    console.log(`Deploying with account: ${deployer.address}`);

    // Get contract factories
    const DecentraArtisanNFT = await hre.ethers.getContractFactory("DecentraArtisanNFT");
    const Marketplace = await hre.ethers.getContractFactory("Marketplace");
    
    // Deploy with the custom provider
    const signer = await provider.getSigner(deployer.address);
    const nft = await DecentraArtisanNFT.connect(signer).deploy();
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log(`✅ ${networkName} - DecentraArtisanNFT deployed to: ${nftAddress}`);

    const market = await Marketplace.connect(signer).deploy();
    await market.waitForDeployment();
    const marketAddress = await market.getAddress();
    console.log(`✅ ${networkName} - Marketplace deployed to: ${marketAddress}`);
    
    return {
      network: networkName,
      chainId: chainId,
      rpcUrl: rpcUrl,
      contractAddress: nftAddress,
      marketplaceAddress: marketAddress,
      deployerAddress: deployer.address
    };
    
  } catch (error) {
    console.error(`❌ Failed to deploy to ${networkName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("🌐 Multi-Network Contract Deployment");
  console.log("=====================================");
  // Ensure artifacts are available
  await hre.run('compile');

  const networks = [
    { name: "Ethereum", rpcUrl: "http://127.0.0.1:8545", chainId: 1337 },
    { name: "Polygon", rpcUrl: "http://127.0.0.1:8546", chainId: 1338 },
    { name: "Base", rpcUrl: "http://127.0.0.1:8547", chainId: 1341 }
  ];

  const deployments = [];

  for (const network of networks) {
    const result = await deployToNetwork(network.name, network.rpcUrl, network.chainId);
    if (result) {
      deployments.push(result);
    }
  }

  // Save deployment addresses to a file
  const deploymentsFile = path.join(__dirname, "../deployments.json");
  fs.writeFileSync(deploymentsFile, JSON.stringify(deployments, null, 2));

  console.log("\n📋 Deployment Summary:");
  console.log("======================");
  deployments.forEach(deployment => {
    console.log(`${deployment.network}: ${deployment.contractAddress}`);
  });

  console.log(`\n💾 Deployment details saved to: ${deploymentsFile}`);
  
  // Generate environment variables
  console.log("\n🔧 Environment Variables for Frontend:");
  console.log("=====================================");
  deployments.forEach(deployment => {
    const envVarNFT = `VITE_${deployment.network.toUpperCase()}_CONTRACT_ADDRESS=${deployment.contractAddress}`;
    const envVarMarket = `VITE_${deployment.network.toUpperCase()}_MARKETPLACE_ADDRESS=${deployment.marketplaceAddress}`;
    console.log(envVarNFT);
    console.log(envVarMarket);
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
