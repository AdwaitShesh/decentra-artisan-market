// This script demonstrates how to interact with the DecentraArtisanNFT contract
const hre = require("hardhat");

async function main() {
  // Get the contract address (replace with your deployed contract address)
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  
  // Get the contract
  const DecentraArtisanNFT = await hre.ethers.getContractFactory("DecentraArtisanNFT");
  const nftContract = await DecentraArtisanNFT.attach(contractAddress);
  
  // Get signers
  const [owner, addr1] = await hre.ethers.getSigners();
  
  console.log("Interacting with DecentraArtisanNFT at:", contractAddress);
  
  // Example: Mint a new NFT
  console.log("\nMinting a new NFT...");
  const tokenURI = "ipfs://QmTest123";
  const royaltyPercentage = 250; // 2.5%
  
  const mintTx = await nftContract.mintNFT(addr1.address, tokenURI, royaltyPercentage);
  const mintReceipt = await mintTx.wait();
  
  // Get the token ID from the event
  const event = mintReceipt.logs.find(log => log.fragment && log.fragment.name === 'NFTMinted');
  const tokenId = event.args.tokenId;
  
  console.log(`NFT minted with ID: ${tokenId}`);
  
  // Example: Get token information
  console.log("\nGetting token information...");
  const ownerOfToken = await nftContract.ownerOf(tokenId);
  const tokenURIResult = await nftContract.tokenURI(tokenId);
  const creator = await nftContract.getCreator(tokenId);
  const royalty = await nftContract.getRoyalty(tokenId);
  
  console.log(`Owner: ${ownerOfToken}`);
  console.log(`Token URI: ${tokenURIResult}`);
  console.log(`Creator: ${creator}`);
  console.log(`Royalty: ${royalty} basis points (${royalty/100}%)`);
  
  // Example: Set base URI (only owner can do this)
  console.log("\nSetting base URI...");
  const baseURI = "https://api.decentra-artisan.com/metadata/";
  await nftContract.setBaseURI(baseURI);
  console.log(`Base URI set to: ${baseURI}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
}); 