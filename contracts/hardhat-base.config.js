require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1341, // Base simulation
      port: 8547,    // Different port
      accounts: {
        mnemonic: "test test test test test test test test test test test junk"
      }
    },
    localhost: {
      url: "http://127.0.0.1:8547",
      chainId: 1341
    }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache-base",
    artifacts: "./artifacts-base"
  }
};
