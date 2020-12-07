# My-Token-Crowdsale

> Consensys Academy's 2020 Developer Bootcamp Final Project.  
> The Project is a simple implementation of ERC-20 token crowdsale 

Smart contract have been written and deployed to allow a User to buy ERC-20 tokens, MyToken ("MTK") from the owner's contract from a webpage using a metamask wallet. 


[Demo](https://youtu.be/shsTfzgBVUo	)

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
* [About](#about)

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

## Running the project with local test network (ganache-cli)

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
  - Create a .secret file cointaining the menomic.
  - Get some test ether from a [Ropsten's faucet](https://faucet.dimensions.network/).
  - Signup [Infura](https://infura.io/).
  - Create a new project.
  - Copy the Ropsten URL into truffle-config.js.
  - Uncomment the following lines in truffle-config.js:
    ```
    // const HDWalletProvider = require("@truffle/hdwallet-provider");
    // const infuraKey = '...';
    // const infuraURL = 'https://Ropsten.infura.io/...';

    // const fs = require('fs');
    // const mnemonic = fs.readFileSync(".secret").toString().trim();
    ```
  - Install Truffle HD Wallet Provider:
    ```sh
    $ npm install @truffle/hdwallet-provider
    ```
  - Deploy the smart contract using Truffle & Infura with the following command:
    ```sh
    $ truffle migrate --network Ropsten
    ```

   The Project's smart contracts have been deployed on [Ropsten](https://Ropsten.etherscan.io/address/0x527903D7938Fba0b2A88b55244b0eafb28047ff6).  
   The ABIs are available to test the project on Ropsten's Network.  

Using the DApp
==============
  Installations for front end
  - npx create-react-app client
  - cd client
  - npm install ethers react-bootstrap bootstrap
  Install [Ganache GUI](https://www.trufflesuite.com/ganache).
  - Select the the Square-Wrist (Ethereum) Workspace on the Ganache GUI which is set to port 8545
  - Import the Ganache GUI mnemonic (seed phrase) found at the top of the list of addresses into MetaMask's import account option. 
  - Set a custom RPC with the settings from Ganache: HTTP://127.0.0.1:8545). 
 
  - Deploy the smart contracts to Ganache GUI:
    ```
    $ truffle migrate
    ```
  - Move to client directory on the project:
    ```
    $ cd client
    ```
  - Install dependencies:
    ```
    $ yarn install
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
    # final-project
