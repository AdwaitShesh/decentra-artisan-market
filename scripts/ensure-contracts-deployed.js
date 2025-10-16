#!/usr/bin/env node
/**
 * Ensure contracts are deployed to all networks
 * This script checks if contracts exist and deploys them if needed
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.dirname(__dirname);
const CONTRACTS_DIR = path.join(ROOT_DIR, 'contracts');
const DEPLOYMENTS_FILE = path.join(CONTRACTS_DIR, 'deployments.json');

// Network configurations
const NETWORKS = [
  { name: 'Ethereum', port: 8545, chainId: 1337 },
  { name: 'Polygon', port: 8546, chainId: 1338 },
  { name: 'Base', port: 8547, chainId: 1341 }
];

/**
 * Check if a network is running
 */
async function isNetworkRunning(port) {
  try {
    const response = await fetch(`http://127.0.0.1:${port}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_chainId',
        params: []
      })
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}

/**
 * Check if contracts are deployed
 */
function areContractsDeployed() {
  if (!fs.existsSync(DEPLOYMENTS_FILE)) {
    return false;
  }

  try {
    const deployments = JSON.parse(fs.readFileSync(DEPLOYMENTS_FILE, 'utf8'));
    if (!Array.isArray(deployments) || deployments.length === 0) {
      return false;
    }

    // Check if all networks have deployments
    const deployedNetworks = deployments.map(d => d.network.toLowerCase());
    const requiredNetworks = NETWORKS.map(n => n.name.toLowerCase());
    
    return requiredNetworks.every(network => deployedNetworks.includes(network));
  } catch (error) {
    console.error('Error reading deployments file:', error.message);
    return false;
  }
}

/**
 * Start networks if not running
 */
async function ensureNetworksRunning() {
  console.log('🔍 Checking network status...');
  
  const networkStatus = await Promise.all(
    NETWORKS.map(async (network) => ({
      ...network,
      running: await isNetworkRunning(network.port)
    }))
  );

  const runningNetworks = networkStatus.filter(n => n.running);
  const stoppedNetworks = networkStatus.filter(n => !n.running);

  if (runningNetworks.length > 0) {
    console.log('✅ Running networks:');
    runningNetworks.forEach(n => 
      console.log(`   ${n.name}: http://127.0.0.1:${n.port} (Chain ID: ${n.chainId})`)
    );
  }

  if (stoppedNetworks.length > 0) {
    console.log('❌ Stopped networks:');
    stoppedNetworks.forEach(n => 
      console.log(`   ${n.name}: http://127.0.0.1:${n.port} (Chain ID: ${n.chainId})`)
    );
    
    console.log('\n🚀 Starting networks...');
    console.log('Please run: cd contracts && ./scripts/start-networks.sh');
    console.log('Then run this script again.');
    process.exit(1);
  }

  console.log('✅ All networks are running!');
}

/**
 * Deploy contracts to all networks
 */
function deployContracts() {
  console.log('\n📦 Deploying contracts to all networks...');
  
  try {
    execSync('node scripts/deploy-all.js', {
      cwd: CONTRACTS_DIR,
      stdio: 'inherit'
    });
    console.log('✅ Contracts deployed successfully!');
  } catch (error) {
    console.error('❌ Failed to deploy contracts:', error.message);
    process.exit(1);
  }
}

/**
 * Update environment variables
 */
function updateEnvironmentVariables() {
  console.log('\n🔧 Updating environment variables...');
  
  try {
    execSync('node update-env-from-deploy.cjs', {
      cwd: ROOT_DIR,
      stdio: 'inherit'
    });
    console.log('✅ Environment variables updated!');
  } catch (error) {
    console.error('❌ Failed to update environment variables:', error.message);
    process.exit(1);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🏗️  Ensuring contracts are deployed...\n');

  // Check if networks are running
  await ensureNetworksRunning();

  // Check if contracts are deployed
  if (areContractsDeployed()) {
    console.log('✅ Contracts are already deployed to all networks!');
    
    // Still update environment variables to ensure they're current
    updateEnvironmentVariables();
    
    console.log('\n🎉 All set! Your contracts are ready to use.');
    return;
  }

  console.log('📋 Contracts not found or incomplete. Deploying...');
  
  // Deploy contracts
  deployContracts();
  
  // Update environment variables
  updateEnvironmentVariables();
  
  console.log('\n🎉 Contract deployment complete! Your dApp is ready to use.');
  console.log('\nContract addresses have been saved to:');
  console.log(`   - ${DEPLOYMENTS_FILE}`);
  console.log(`   - ${path.join(ROOT_DIR, '.env')}`);
}

// Run the script
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Script failed:', error.message);
    process.exit(1);
  });
}

export { main, areContractsDeployed, ensureNetworksRunning };
