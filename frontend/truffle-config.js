const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config(); // Load .env file
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 8545, // Standard Ethereum port
      network_id: "5777", // Any network (default: none)
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://matic-mumbai.chainstacklabs.com/
`
        ),
      // 			provider: () =>
      // 				new HDWalletProvider({
      // 					mnemonic: {
      // 						phrase: process.env.MNEMONIC,
      // 					},
      // 					providerOrUrl: `wss://rpc-mumbai.maticvigil.com/ws/v1/37afa3c0f15de362d23f8bf6ea44ac3bec8befb8

      // `,
      // 				}),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
    kovan: {
      provider: function () {
        return new HDWalletProvider(
          process.env.MNEMONIC,
          "wss://kovan.infura.io/ws/v3/bf37e2f9ca134e03aa86fd97d3fba695"
        );
      },
      network_id: 42,
      gas: 4500000,
      gasPrice: 10000000000,
    },
  },
  contracts_directory: "./contracts/",
  compilers: {
    solc: {
      version: "0.8.11", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    },
  },
};
