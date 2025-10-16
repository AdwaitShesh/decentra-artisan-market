const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("DecentraArtisanNFT", function () {
  let decentraArtisanNFT;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    const DecentraArtisanNFT = await ethers.getContractFactory("DecentraArtisanNFT");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

    // Deploy a new contract before each test
    decentraArtisanNFT = await DecentraArtisanNFT.deploy();
    await decentraArtisanNFT.waitForDeployment();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await decentraArtisanNFT.owner()).to.equal(owner.address);
    });

    it("Should assign the name and symbol correctly", async function () {
      expect(await decentraArtisanNFT.name()).to.equal("Decentra Artisan NFT");
      expect(await decentraArtisanNFT.symbol()).to.equal("DART");
    });
  });

  describe("Minting", function () {
    it("Should mint a new NFT with correct metadata", async function () {
      const tokenURI = "ipfs://QmTest123";
      const royaltyPercentage = 250; // 2.5%

      // Mint NFT
      const tx = await decentraArtisanNFT.mintNFT(addr1.address, tokenURI, royaltyPercentage);
      const receipt = await tx.wait();
      
      // Get the token ID from the event
      const event = receipt.logs.find(log => log.fragment && log.fragment.name === 'NFTMinted');
      const tokenId = event.args.tokenId;

      // Check token ownership
      expect(await decentraArtisanNFT.ownerOf(tokenId)).to.equal(addr1.address);
      
      // Check token URI
      expect(await decentraArtisanNFT.tokenURI(tokenId)).to.equal(tokenURI);
      
      // Check creator
      expect(await decentraArtisanNFT.getCreator(tokenId)).to.equal(owner.address);
      
      // Check royalty
      expect(await decentraArtisanNFT.getRoyalty(tokenId)).to.equal(royaltyPercentage);
    });

    it("Should not allow royalty percentage over 10%", async function () {
      const tokenURI = "ipfs://QmTest123";
      const royaltyPercentage = 1100; // 11%

      await expect(
        decentraArtisanNFT.mintNFT(addr1.address, tokenURI, royaltyPercentage)
      ).to.be.revertedWith("Royalty percentage cannot exceed 10%");
    });
  });

  describe("Base URI", function () {
    it("Should allow owner to set base URI", async function () {
      const baseURI = "https://api.decentra-artisan.com/metadata/";
      await decentraArtisanNFT.setBaseURI(baseURI);
      
      // Mint an NFT
      const tokenURI = "token1.json";
      const royaltyPercentage = 250;
      const tx = await decentraArtisanNFT.mintNFT(addr1.address, tokenURI, royaltyPercentage);
      const receipt = await tx.wait();
      
      // Get the token ID from the event
      const event = receipt.logs.find(log => log.fragment && log.fragment.name === 'NFTMinted');
      const tokenId = event.args.tokenId;
      
      // Check that the full token URI includes the base URI
      const expectedFullURI = baseURI + tokenURI;
      expect(await decentraArtisanNFT.tokenURI(tokenId)).to.equal(expectedFullURI);
    });

    it("Should not allow non-owner to set base URI", async function () {
      const baseURI = "https://api.decentra-artisan.com/metadata/";
      await expect(
        decentraArtisanNFT.connect(addr1).setBaseURI(baseURI)
      ).to.be.revertedWithCustomError(decentraArtisanNFT, "OwnableUnauthorizedAccount");
    });
  });

  describe("Token Information", function () {
    it("Should return correct creator and royalty information", async function () {
      const tokenURI = "ipfs://QmTest123";
      const royaltyPercentage = 250; // 2.5%

      // Mint NFT
      const tx = await decentraArtisanNFT.mintNFT(addr1.address, tokenURI, royaltyPercentage);
      const receipt = await tx.wait();
      
      // Get the token ID from the event
      const event = receipt.logs.find(log => log.fragment && log.fragment.name === 'NFTMinted');
      const tokenId = event.args.tokenId;

      // Check creator
      expect(await decentraArtisanNFT.getCreator(tokenId)).to.equal(owner.address);
      
      // Check royalty
      expect(await decentraArtisanNFT.getRoyalty(tokenId)).to.equal(royaltyPercentage);
    });

    it("Should revert when querying non-existent token", async function () {
      const nonExistentTokenId = 999;
      await expect(
        decentraArtisanNFT.getCreator(nonExistentTokenId)
      ).to.be.revertedWith("Token does not exist");
      
      await expect(
        decentraArtisanNFT.getRoyalty(nonExistentTokenId)
      ).to.be.revertedWith("Token does not exist");
    });
  });
}); 