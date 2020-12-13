# My-Token-Crowdsale

> Consensys Academy's 2020 Developer Bootcamp Final Project.  
> The Project is a simple implementation of ERC-20 token crowdsale 

Smart contract have been written and deployed to allow a User to buy ERC-20 tokens, MyToken ("MTK") from the owner's contract from a webpage using a metamask wallet. 


[Demo](https://https://youtu.be/aDbYbEyk648)

<!-- ## Links

- [Depoyed Addresses on Ropsten](deployed_addresses.txt)
- [Design Pattern Decisions](design_pattern_decisions.md)
- [Avoiding Common Attacks](avoiding_common_attacks.md)
- [Use a Library or Extend a Contract] (safemath.sol) -->


## Sections
* [Setup](#setup)
* [Testing](#testing)
* [Deploy](#deploy)
* [Using the DApp](#using-the-dapp)

Setup
=====

Clone this GitHub repository.

## Steps to compile and deploy

  - Global dependencies
    - Truffle & Ganache:
    ```sh
    $ npm install -g truffle ganache-cli
    ```
  - Local dependencies  
    - OpenZeppelin Contracts:
    ```sh
    $ npm install @openzeppelin/contracts
    ```

## Running the project on a local test network (ganache-cli)

   - Start ganache-cli with the following command:
     ```sh
     $ ganache-cli
     ```
   - Compile the smart contract using Truffle with the following command:
     ```sh
     $ truffle compile
     ```
   - Deploy the smart contracts using Truffle & Ganache with the following command:
     ```sh
     $ truffle migrate
     ```
   - Test the smart contracts using Truffle & Ganache with the following command:
     ```sh
     $ truffle test
     ```
Testing
======
## Testing the smart contracts - 5 tests
    ✓ Retrieve returns a value previously stored
    ✓ MyToken has a name 
    ✓ MyToken has a symbol 
    ✓ Initial total supply is correctly assigned to the creator
    ✓ MyToken has correct decimals

Deploy     
======
## Deploying on Ropsten's Testnet
  - Get an Ethereum Account on Metamask.
  - On the landing page, click “Get Chrome Extension.”
  - Create a .env file cointaining the menomic.
  - Get some test ether from a [Ropsten's faucet](https://faucet.dimensions.network/).
  - Signup [Infura](https://infura.io/).
  - Create a new project.
  - Copy the Ropsten URL into truffle-config.js.
  - Insert or uncomment the following lines in truffle-config.js:
    ```
  compilers: {
  solc: {
    version: "0.5.5",    // Fetch exact version from solc-bin (default: truffle's version)
   },
  },
  networks: {
    //
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },

    //For testing insert/uncomment the following:
    ropsten: {
      provider: () =>
        new HDWalletProvider(
        process.env.MNEMONIC,
        `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`
        ),
        network_id: 3, // Ropsten's id
        gas: 5500000, // Ropsten has a lower block limit than mainnet
        confirmations: 2, // # of confs to wait between deployments. (default: 0)
        timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
        skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
      }
  - Install Truffle HD Wallet Provider:
    ```sh
    $ npm install @truffle/hdwallet-provider
    ```
  - Deploy the smart contract using Truffle & Infura with the following command:
    ```sh
    $ truffle migrate --network Ropsten
    ```

   The Project's wallet contract address has been deployed on [Ropsten](https://ropsten.etherscan.io/address/0x14e25ab1f217f4196b7e3b116fe93418b206d5ad).  
  
Using the DApp
==============
  Installations for front end
  - npx create-react-app client
  - cd client
  - npm install ethers react-bootstrap bootstrap
  Installation for [Ganache GUI](https://www.trufflesuite.com/ganache).
  - Select the the Square-Wrist (Ethereum) Workspace on the Ganache GUI which is set to port 8545
  - Import the Ganache GUI mnemonic (seed phrase) found at the top of the list of addresses into MetaMask's import account option. 
  - Set a custom RPC with the settings from Ganache: HTTP://127.0.0.1:8545). 
  - Truffe-config.js should be changed with the following settings:
    interacting and launching the front end comment out lines 96-107 above and insert the following:
      const path = require("path");
      module.exports = {
      contracts_build_directory: path.join(__dirname, "client/src/contracts"),
      ```
 
  - Deploy the smart contracts to Ganache GUI:
    ```
    $ truffle migrate
    ```
  - Move to client directory on the project:
    ```
    $ cd client
    ```
  - Start the Local Web Server:
    ```sh
    $ npm run start
    ```
  - Interacting with the User Interface:
    - User will be prompted to provide Metamask wallet password
    - Once the password is accurately provided, the use can now purchase MTK tokens with their Ganache test ether
    - Once the transaction passes the following meesage will appear at the top of the page: Blockchain event notification: transaction of # MTK from wallet address 1 to wallet address 2. 
    - The webpage will display the new amount of MTK tokens held by the User wallet.

    - Done.  
  
