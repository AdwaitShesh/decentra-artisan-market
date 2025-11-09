#!/usr/bin/env node

/**
 * Contract Initialization Diagnostic Tool
 * 
 * This script helps diagnose why contract initialization is failing
 */

const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logHeader(message) {
  console.log('\n' + '='.repeat(60));
  log(message, colors.bright + colors.cyan);
  console.log('='.repeat(60) + '\n');
}

async function checkNode(name, rpcUrl, expectedChainId) {
  log(`Checking ${name}...`, colors.blue);
  
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    // Check connection
    const network = await provider.getNetwork();
    const chainId = Number(network.chainId);
    
    log(`  ✓ Connected to network`, colors.green);
    log(`  Chain ID: ${chainId}`, colors.cyan);
    
    if (chainId !== expectedChainId && chainId !== 1337) {
      log(`  ⚠ Warning: Expected chain ID ${expectedChainId}, got ${chainId}`, colors.yellow);
    }
    
    // Check block number
    const blockNumber = await provider.getBlockNumber();
    log(`  Block number: ${blockNumber}`, colors.cyan);
    
    // Check if node is mining
    if (blockNumber === 0) {
      log(`  ⚠ Warning: No blocks mined yet`, colors.yellow);
    }
    
    return { success: true, chainId, blockNumber };
  } catch (error) {
    log(`  ✗ Failed: ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

async function checkContract(name, rpcUrl, contractAddress) {
  log(`\nChecking contract at ${contractAddress}...`, colors.blue);
  
  try {
    const provider = new ethers.JsonRpcProvider(rpcUrl);
    
    // Check if address is valid
    if (!ethers.isAddress(contractAddress)) {
      log(`  ✗ Invalid address format`, colors.red);
      return { success: false, error: 'Invalid address' };
    }
    
    log(`  ✓ Address format is valid`, colors.green);
    
    // Check if contract exists
    const code = await provider.getCode(contractAddress);
    
    if (code === '0x') {
      log(`  ✗ No contract deployed at this address`, colors.red);
      log(`  → Run: npm run contracts:deploy`, colors.yellow);
      return { success: false, error: 'No contract deployed' };
    }
    
    log(`  ✓ Contract code found (${code.length} bytes)`, colors.green);
    
    // Try to get contract name (if it has a name function)
    try {
      const contract = new ethers.Contract(
        contractAddress,
        ['function name() view returns (string)'],
        provider
      );
      const name = await contract.name();
      log(`  Contract name: ${name}`, colors.cyan);
    } catch (e) {
      log(`  (Could not read contract name)`, colors.yellow);
    }
    
    return { success: true, codeLength: code.length };
  } catch (error) {
    log(`  ✗ Failed: ${error.message}`, colors.red);
    return { success: false, error: error.message };
  }
}

async function main() {
  logHeader('Contract Initialization Diagnostic Tool');
  
  // Load .env file
  let envVars = {};
  try {
    const envPath = path.join(__dirname, '..', '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      envContent.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split('=');
        if (key && valueParts.length > 0) {
          envVars[key.trim()] = valueParts.join('=').trim();
        }
      });
      log('✓ Loaded .env file', colors.green);
    } else {
      log('⚠ No .env file found', colors.yellow);
    }
  } catch (error) {
    log(`⚠ Could not load .env: ${error.message}`, colors.yellow);
  }
  
  // Network configurations
  const networks = {
    ethereum: {
      name: 'Ethereum (Local)',
      rpcUrl: 'http://127.0.0.1:8545',
      chainId: 1337,
      contractAddress: envVars.VITE_ETHEREUM_CONTRACT_ADDRESS || envVars.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    },
    polygon: {
      name: 'Polygon (Local)',
      rpcUrl: 'http://127.0.0.1:8546',
      chainId: 1338,
      contractAddress: envVars.VITE_POLYGON_CONTRACT_ADDRESS || envVars.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    },
    base: {
      name: 'Base (Local)',
      rpcUrl: 'http://127.0.0.1:8547',
      chainId: 1341,
      contractAddress: envVars.VITE_BASE_CONTRACT_ADDRESS || envVars.VITE_NFT_CONTRACT_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3'
    }
  };
  
  // Check each network
  logHeader('Step 1: Checking Network Connectivity');
  
  const nodeResults = {};
  for (const [key, network] of Object.entries(networks)) {
    nodeResults[key] = await checkNode(network.name, network.rpcUrl, network.chainId);
  }
  
  // Check contracts
  logHeader('Step 2: Checking Contract Deployments');
  
  const contractResults = {};
  for (const [key, network] of Object.entries(networks)) {
    if (nodeResults[key].success) {
      contractResults[key] = await checkContract(
        network.name,
        network.rpcUrl,
        network.contractAddress
      );
    } else {
      log(`\nSkipping ${network.name} contract check (node not accessible)`, colors.yellow);
      contractResults[key] = { success: false, error: 'Node not accessible' };
    }
  }
  
  // Summary
  logHeader('Summary');
  
  const workingNodes = Object.values(nodeResults).filter(r => r.success).length;
  const workingContracts = Object.values(contractResults).filter(r => r.success).length;
  
  log(`Nodes: ${workingNodes}/${Object.keys(networks).length} working`, 
      workingNodes === Object.keys(networks).length ? colors.green : colors.red);
  log(`Contracts: ${workingContracts}/${Object.keys(networks).length} deployed`,
      workingContracts === Object.keys(networks).length ? colors.green : colors.red);
  
  console.log('\n' + '-'.repeat(60));
  
  // Recommendations
  if (workingNodes < Object.keys(networks).length) {
    log('\n⚠ Some nodes are not running!', colors.yellow);
    log('Fix: npm run contracts:start', colors.cyan);
  }
  
  if (workingContracts < workingNodes) {
    log('\n⚠ Some contracts are not deployed!', colors.yellow);
    log('Fix: npm run contracts:deploy', colors.cyan);
  }
  
  if (workingNodes === Object.keys(networks).length && workingContracts === workingNodes) {
    log('\n✅ All systems operational!', colors.green);
    log('If you still have issues:', colors.cyan);
    log('  1. Check MetaMask is unlocked', colors.cyan);
    log('  2. Reset MetaMask networks: npm run reset-metamask', colors.cyan);
    log('  3. Check browser console for errors (F12)', colors.cyan);
  }
  
  console.log('\n' + '='.repeat(60) + '\n');
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
