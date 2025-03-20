// hardhat.config.js

require("@nomicfoundation/hardhat-toolbox");
// If you're using other plugins, ensure they're compatible

module.exports = {
  solidity: "0.8.0",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545", // Default Hardhat Network RPC URL
      // No need to specify accounts; Hardhat provides them automatically
    },
    // Optional: Configure other networks as needed
  },
};
