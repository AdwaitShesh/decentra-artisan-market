require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1338, // Polygon simulation
      port: 8546,    // Different port
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      }
    },
    localhost: {
      url: "http://127.0.0.1:8546",
      chainId: 1338
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache-polygon",
    artifacts: "./artifacts-polygon"
  }
};
