// const MyToken = artifacts.require("MyToken.sol");

// module.exports = function(deployer) {
//   const _name = 'MyToken';
//   const _symbol = 'MTK';
 

//    deployer.deploy(MyToken, _name, _symbol);
//   };

const MyToken = artifacts.require("MyToken");
const MyCrowdsale = artifacts.require("MyCrowdsale");

module.exports = async function (deployer, network, accounts) {
 await deployer.deploy(MyToken, 'My Token', 'MTK', '10000000000000000000000');
 const token = await MyToken.deployed();
// sets the "rate" 1 ETH/MTK
// assigns ETH paid for MTK to account 9
 await deployer.deploy(MyCrowdsale, 1, accounts[9], token.address);
 const crowdsale = await MyCrowdsale.deployed();

 token.transfer(crowdsale.address, await token.totalSupply())
};
