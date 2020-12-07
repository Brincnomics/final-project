pragma solidity ^0.5.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/ownership/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";

 /**
 * @title MyToken
 * @dev Very simple ERC20 Token example, where all tokens are pre-assigned to the creator.
 * Note they can later distribute these tokens as they wish using `transfer` and other
 * `ERC20` functions.
 * Constructor code is only run when the contract is created
 * "decimals" can be excluded from the contructor parameters
 * strings are reference types which are stored
 * The keyword "public" makes variables accessible from other contracts
 * The variables totalSupply and balances are represented by a _mint function
 * The contract will mint 1000 tokens and transfer too the owner/admin account
 */

contract MyToken is Context, ERC20, ERC20Detailed, Pausable, Ownable {
   // constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) public { 
     //   _mint(msg.sender, 1000);
   // }

    constructor(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) public ERC20Detailed(name, symbol, 18) {
        _mint(_msgSender(), initialSupply);
    }
}