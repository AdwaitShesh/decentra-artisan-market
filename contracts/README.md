# Decentra Artisan NFT Smart Contract

This directory contains the smart contracts for the Decentra Artisan Market NFT platform.

## Contract Overview

The `DecentraArtisanNFT` contract is an ERC721 token with metadata storage capabilities. It allows for:

- Minting new NFTs with metadata URIs
- Setting royalty percentages for creators
- Tracking NFT creators
- Managing base URIs for token metadata

## Setup and Installation

1. Install dependencies:
```bash
npm install
```

2. Compile the contracts:
```bash
npx hardhat compile
```

3. Run tests:
```bash
npx hardhat test
```

4. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network <network-name>
```

## Contract Functions

### `mintNFT(address to, string tokenURI, uint256 royaltyPercentage)`
Mints a new NFT and assigns it to the specified address.

- `to`: The address that will own the minted NFT
- `tokenURI`: The token URI of the minted NFT
- `royaltyPercentage`: The royalty percentage in basis points (e.g., 250 = 2.5%)

### `setBaseURI(string baseURI)`
Sets the base URI for all token IDs. Only callable by the contract owner.

### `getCreator(uint256 tokenId)`
Returns the creator of a specific token.

### `getRoyalty(uint256 tokenId)`
Returns the royalty percentage for a specific token.

## Integration with Frontend

To integrate this contract with the frontend:

1. Deploy the contract to your desired network
2. Update the contract address in your frontend code
3. Use ethers.js or web3.js to interact with the contract

Example frontend integration:

```javascript
import { ethers } from 'ethers';
import DecentraArtisanNFT from './artifacts/contracts/DecentraArtisanNFT.sol/DecentraArtisanNFT.json';

// Connect to the contract
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const nftContract = new ethers.Contract(contractAddress, DecentraArtisanNFT.abi, signer);

// Mint a new NFT
async function mintNFT(to, tokenURI, royaltyPercentage) {
  try {
    const tx = await nftContract.mintNFT(to, tokenURI, royaltyPercentage);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.error('Error minting NFT:', error);
    throw error;
  }
}

// Get token information
async function getTokenInfo(tokenId) {
  try {
    const owner = await nftContract.ownerOf(tokenId);
    const tokenURI = await nftContract.tokenURI(tokenId);
    const creator = await nftContract.getCreator(tokenId);
    const royalty = await nftContract.getRoyalty(tokenId);
    
    return { owner, tokenURI, creator, royalty };
  } catch (error) {
    console.error('Error getting token info:', error);
    throw error;
  }
}
```

## License

MIT
