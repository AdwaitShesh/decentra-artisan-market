#!/usr/bin/env node
/*
  Update the project .env with addresses from contracts/deployments.json.
  Works under a project root with package.json type: module because this is CJS.
*/
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DEPLOY_PATH = path.join(ROOT, 'contracts', 'deployments.json');
const ENV_PATH = path.join(ROOT, '.env');

function parseEnv(content) {
  const lines = content.split(/\r?\n/);
  const map = new Map();
  for (const line of lines) {
    const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m) map.set(m[1], m[2]);
  }
  return { lines, map };
}

function upsert(map, key, value) {
  if (value == null) return;
  map.set(key, value);
}

(function main() {
  if (!fs.existsSync(DEPLOY_PATH)) {
    console.error(`deployments.json not found at ${DEPLOY_PATH}`);
    process.exit(1);
  }
  const raw = JSON.parse(fs.readFileSync(DEPLOY_PATH, 'utf8'));
  let eth=null, mEth=null, poly=null, mPoly=null, base=null, mBase=null;
  if (Array.isArray(raw)) {
    for (const d of raw) {
      if (!d || !d.network) continue;
      const n = d.network.toLowerCase();
      if (n === 'ethereum') { eth = d.contractAddress; mEth = d.marketplaceAddress; }
      if (n === 'polygon') { poly = d.contractAddress; mPoly = d.marketplaceAddress; }
      if (n === 'base') { base = d.contractAddress; mBase = d.marketplaceAddress; }
    }
  } else {
    eth = (raw.ethereum && (raw.ethereum.DecentraArtisanNFT || raw.ethereum)) || null;
    mEth = (raw.ethereum && raw.ethereum.Marketplace) || null;
    poly = (raw.polygon && (raw.polygon.DecentraArtisanNFT || raw.polygon)) || null;
    mPoly = (raw.polygon && raw.polygon.Marketplace) || null;
    base = (raw.base && (raw.base.DecentraArtisanNFT || raw.base)) || null;
    mBase = (raw.base && raw.base.Marketplace) || null;
  }

  let envContent = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf8') : '';
  const { map } = parseEnv(envContent);

  upsert(map, 'VITE_ETHEREUM_CONTRACT_ADDRESS', eth);
  upsert(map, 'VITE_ETHEREUM_MARKETPLACE_ADDRESS', mEth);
  upsert(map, 'VITE_POLYGON_CONTRACT_ADDRESS', poly);
  upsert(map, 'VITE_POLYGON_MARKETPLACE_ADDRESS', mPoly);
  upsert(map, 'VITE_BASE_CONTRACT_ADDRESS', base);
  upsert(map, 'VITE_BASE_MARKETPLACE_ADDRESS', mBase);

  const out = Array.from(map.entries()).map(([k,v])=>`${k}=${v}`).join('\n') + '\n';
  fs.writeFileSync(ENV_PATH, out, 'utf8');
  console.log(`✅ Updated ${ENV_PATH} with latest deployment addresses.`);
})();
