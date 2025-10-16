const { execSync } = require('child_process');
const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Path to the deployments file
const deploymentsFilePath = path.join(__dirname, '../deployments.json');
const rootDir = path.join(__dirname, '../../');

// Network configurations from your setup
const networks = [
    { name: 'Ethereum (Local)', rpcUrl: 'http://127.0.0.1:8545' },
    { name: 'Polygon (Local)', rpcUrl: 'http://127.0.0.1:8546' },
    { name: 'Base (Local)', rpcUrl: 'http://127.0.0.1:8547' },
];

async function checkContract(provider, address, name) {
    if (!address) {
        console.log(`🟡 Address for ${name} is missing. Deployment needed.`);
        return false;
    }
    try {
        const code = await provider.getCode(address);
        if (code === '0x') {
            console.log(`🔴 Contract ${name} not found at ${address}. Deployment needed.`);
            return false;
        }
        console.log(`✅ Contract ${name} found at ${address}.`);
        return true;
    } catch (error) {
        console.log(`🟡 Could not check contract ${name} at ${address}. Assuming deployment is needed. Error: ${error.message}`);
        return false;
    }
}

async function main() {
    console.log('🔍 Checking if contracts are deployed on local networks...');

    let deployments = [];
    if (fs.existsSync(deploymentsFilePath)) {
        try {
            deployments = JSON.parse(fs.readFileSync(deploymentsFilePath, 'utf8'));
        } catch (e) {
            console.log('📜 deployments.json is corrupted. A full deployment is required.');
        }
    } else {
        console.log('📜 deployments.json not found. A full deployment is required.');
    }

    let allContractsDeployed = true;

    for (const network of networks) {
        console.log(`\n--- Checking ${network.name} ---`);
        const provider = new ethers.JsonRpcProvider(network.rpcUrl);
        
        try {
            await provider.getBlockNumber();
        } catch (e) {
            console.error(`❌ Cannot connect to ${network.name} at ${network.rpcUrl}. Please ensure the network is running via './start-networks.sh'.`);
            allContractsDeployed = false; // Treat as a failure to prevent deployment attempts on a down network
            continue; 
        }

        const networkDeployment = deployments.find(d => d.rpcUrl === network.rpcUrl);

        const nftAddress = networkDeployment?.contractAddress;
        const marketplaceAddress = networkDeployment?.marketplaceAddress;

        const isNftDeployed = await checkContract(provider, nftAddress, 'DecentraArtisanNFT');
        const isMarketplaceDeployed = await checkContract(provider, marketplaceAddress, 'Marketplace');

        if (!isNftDeployed || !isMarketplaceDeployed) {
            allContractsDeployed = false;
        }
    }

    if (allContractsDeployed) {
        console.log('\n✅ All contracts are already deployed and up-to-date. No action needed.');
    } else {
        console.log('\n⚠️ One or more contracts are missing or networks are down. Attempting to redeploy all contracts...');
        try {
            execSync('node scripts/deploy-all.js', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
            console.log('✅ Contracts have been successfully redeployed.');

            console.log('🔄 Updating .env file with new addresses...');
            execSync('node update-env-from-deploy.cjs', { stdio: 'inherit', cwd: rootDir });

        } catch (error) {
            console.error('\n❌ Deployment failed. Please ensure your local networks are running correctly.');
            process.exit(1);
        }
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
