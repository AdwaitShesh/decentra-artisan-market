#!/usr/bin/env node

/**
 * MetaMask Network Reset Utility
 * 
 * This script helps fix RPC endpoint errors by:
 * 1. Detecting MetaMask circuit breaker issues
 * 2. Providing instructions to reset MetaMask networks
 * 3. Re-adding networks with fresh configuration
 * 4. Testing RPC endpoint connectivity
 */

const NETWORK_CONFIGS = {
  ethereum: {
    chainId: 1337,
    name: 'Ethereum (Local)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8545',
    port: 8545
  },
  polygon: {
    chainId: 1338,
    name: 'Polygon (Local)',
    symbol: 'MATIC',
    rpcUrl: 'http://127.0.0.1:8546',
    port: 8546
  },
  base: {
    chainId: 1341,
    name: 'Base (Local)',
    symbol: 'ETH',
    rpcUrl: 'http://127.0.0.1:8547',
    port: 8547
  }
};

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
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

async function testRPCEndpoint(network) {
  log(`Testing ${network.name} at ${network.rpcUrl}...`, colors.blue);
  
  try {
    const response = await fetch(network.rpcUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'eth_chainId',
        params: []
      }),
      signal: AbortSignal.timeout(3000)
    });

    if (!response.ok) {
      log(`  ✗ HTTP ${response.status}: ${response.statusText}`, colors.red);
      return false;
    }

    const data = await response.json();
    
    if (data.error) {
      log(`  ✗ RPC Error: ${data.error.message || JSON.stringify(data.error)}`, colors.red);
      return false;
    }

    const chainId = parseInt(data.result, 16);
    
    if (chainId === network.chainId || chainId === 1337) {
      log(`  ✓ Connected! Chain ID: ${chainId}`, colors.green);
      return true;
    } else {
      log(`  ⚠ Warning: Expected chain ID ${network.chainId}, got ${chainId}`, colors.yellow);
      return true; // Still connected, just different chain
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      log(`  ✗ Timeout: No response after 3 seconds`, colors.red);
    } else if (error.code === 'ECONNREFUSED') {
      log(`  ✗ Connection refused: Node not running on port ${network.port}`, colors.red);
    } else {
      log(`  ✗ Error: ${error.message}`, colors.red);
    }
    return false;
  }
}

async function testAllNetworks() {
  logHeader('Testing RPC Endpoints');
  
  const results = {};
  for (const [key, network] of Object.entries(NETWORK_CONFIGS)) {
    results[key] = await testRPCEndpoint(network);
  }
  
  console.log('\n' + '-'.repeat(60));
  log('Summary:', colors.bright);
  
  const working = Object.entries(results).filter(([_, status]) => status);
  const failing = Object.entries(results).filter(([_, status]) => !status);
  
  log(`  Working: ${working.length}/${Object.keys(results).length}`, 
      working.length === Object.keys(results).length ? colors.green : colors.yellow);
  
  if (failing.length > 0) {
    log(`  Failing: ${failing.map(([key]) => key).join(', ')}`, colors.red);
  }
  
  return results;
}

function printMetaMaskResetInstructions() {
  logHeader('MetaMask Network Reset Instructions');
  
  log('If you\'re experiencing RPC errors, follow these steps:', colors.bright);
  console.log();
  
  log('Step 1: Reset MetaMask Account', colors.yellow);
  console.log('  1. Open MetaMask extension');
  console.log('  2. Click on your account icon (top right)');
  console.log('  3. Go to Settings → Advanced');
  console.log('  4. Scroll down and click "Clear activity tab data"');
  console.log('  5. Click "Reset account" (this only clears transaction history)');
  console.log();
  
  log('Step 2: Remove Old Networks', colors.yellow);
  console.log('  1. In MetaMask, go to Settings → Networks');
  console.log('  2. Find and delete these networks:');
  console.log('     - Ethereum (Local)');
  console.log('     - Polygon (Local)');
  console.log('     - Base (Local)');
  console.log('  3. Click the trash icon next to each network');
  console.log();
  
  log('Step 3: Re-add Networks', colors.yellow);
  console.log('  Option A: Use the app (Recommended)');
  console.log('    1. Start your local Hardhat nodes (see below)');
  console.log('    2. Open the app and try to mint an NFT');
  console.log('    3. MetaMask will prompt you to add the network');
  console.log('    4. Click "Approve" to add the network');
  console.log();
  console.log('  Option B: Add manually');
  console.log('    1. In MetaMask, go to Settings → Networks → Add Network');
  console.log('    2. Add each network with these details:');
  console.log();
  
  Object.entries(NETWORK_CONFIGS).forEach(([key, network]) => {
    console.log(`    ${network.name}:`);
    console.log(`      Network Name: ${network.name}`);
    console.log(`      RPC URL: ${network.rpcUrl}`);
    console.log(`      Chain ID: ${network.chainId}`);
    console.log(`      Currency Symbol: ${network.symbol}`);
    console.log();
  });
}

function printNodeStartInstructions(failingNetworks) {
  logHeader('Start Local Hardhat Nodes');
  
  log('Some RPC endpoints are not responding. Start the nodes:', colors.bright);
  console.log();
  
  if (failingNetworks.includes('ethereum')) {
    log('Ethereum (Port 8545):', colors.yellow);
    console.log('  cd contracts && npx hardhat node --port 8545');
    console.log();
  }
  
  if (failingNetworks.includes('polygon')) {
    log('Polygon (Port 8546):', colors.yellow);
    console.log('  cd contracts && npx hardhat node --port 8546');
    console.log();
  }
  
  if (failingNetworks.includes('base')) {
    log('Base (Port 8547):', colors.yellow);
    console.log('  cd contracts && npx hardhat node --port 8547');
    console.log();
  }
  
  log('Or start all networks at once:', colors.green);
  console.log('  cd contracts && ./scripts/start-networks.sh');
  console.log();
  
  log('After starting nodes, deploy contracts:', colors.green);
  console.log('  cd contracts && node scripts/deploy-all.js');
  console.log();
}

function generateMetaMaskScript() {
  logHeader('Automated MetaMask Network Addition');
  
  log('Copy and paste this into your browser console while on your app:', colors.bright);
  console.log();
  
  const script = `
// MetaMask Network Addition Script
(async () => {
  if (!window.ethereum) {
    console.error('MetaMask not found!');
    return;
  }
  
  const networks = ${JSON.stringify(NETWORK_CONFIGS, null, 2)};
  
  for (const [key, network] of Object.entries(networks)) {
    try {
      console.log(\`Adding \${network.name}...\`);
      
      // Try to switch first
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: \`0x\${network.chainId.toString(16)}\` }]
        });
        console.log(\`✓ Switched to \${network.name}\`);
      } catch (switchError) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: \`0x\${network.chainId.toString(16)}\`,
              chainName: network.name,
              nativeCurrency: {
                name: network.symbol,
                symbol: network.symbol,
                decimals: 18
              },
              rpcUrls: [network.rpcUrl],
              blockExplorerUrls: null
            }]
          });
          console.log(\`✓ Added \${network.name}\`);
        } else {
          throw switchError;
        }
      }
      
      // Wait a bit between networks
      await new Promise(r => setTimeout(r, 1000));
      
    } catch (error) {
      console.error(\`✗ Failed to add \${network.name}:\`, error.message);
    }
  }
  
  console.log('Done! All networks processed.');
})();
`;
  
  log(script, colors.cyan);
  console.log();
}

async function main() {
  console.clear();
  
  logHeader('🔧 MetaMask Network Reset & RPC Fix Utility');
  
  log('This tool will help you fix RPC endpoint errors.', colors.bright);
  console.log();
  
  // Test all networks
  const results = await testAllNetworks();
  
  const failingNetworks = Object.entries(results)
    .filter(([_, status]) => !status)
    .map(([key]) => key);
  
  // If any networks are failing, show node start instructions
  if (failingNetworks.length > 0) {
    printNodeStartInstructions(failingNetworks);
  }
  
  // Always show MetaMask reset instructions
  printMetaMaskResetInstructions();
  
  // Show automated script
  generateMetaMaskScript();
  
  logHeader('Quick Fix Summary');
  
  if (failingNetworks.length > 0) {
    log('⚠ Action Required:', colors.yellow);
    console.log('  1. Start the missing Hardhat nodes (see above)');
    console.log('  2. Reset MetaMask account (Settings → Advanced → Reset)');
    console.log('  3. Remove old networks from MetaMask');
    console.log('  4. Use the browser console script to re-add networks');
  } else {
    log('✓ All RPC endpoints are working!', colors.green);
    console.log('  If you still have errors:');
    console.log('  1. Reset MetaMask account (Settings → Advanced → Reset)');
    console.log('  2. Remove and re-add networks using the script above');
  }
  
  console.log();
  log('Need more help? Check the documentation:', colors.blue);
  console.log('  - METAMASK_NETWORKS_GUIDE.md');
  console.log('  - TRUE_MULTI_NETWORK_SETUP.md');
  console.log();
}

// Run the script
main().catch(error => {
  log(`\nFatal error: ${error.message}`, colors.red);
  console.error(error);
  process.exit(1);
});
