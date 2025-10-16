require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    hardhat: {
      chainId: 1337
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337
    },
    // Simulated networks for multi-blockchain support (all use same local node)
    polygon_local: {
      url: "http://127.0.0.1:8545",
      chainId: 1338,
      accounts: "remote" // Use the same accounts as hardhat node
    },
    optimism_local: {
      url: "http://127.0.0.1:8545",
      chainId: 1339,
      accounts: "remote"
    },
    arbitrum_local: {
      url: "http://127.0.0.1:8545",
      chainId: 1340,
      accounts: "remote"
    },
    base_local: {
      url: "http://127.0.0.1:8545",
      chainId: 1341,
      accounts: "remote"
    },
    // Add other networks as needed
    // sepolia: {
    //   url: `https://sepolia.infura.io/v3/${INFURA_API_KEY}`,
    //   accounts: [PRIVATE_KEY]
    // }
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  }
};
