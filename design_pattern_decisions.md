1. Circuit Breaker
Circuit Breakers are design patterns that allow contract functionality to be stopped. This would be desirable in situations where there is a live contract where a bug has been detected. Implemented inheriting Pausable.sol from the OpenZeppelin Library. The modifier, whenNotPaused() is used in order to freeze all functions by calling the pause() functions in case of a bug or other issue. 

2. Fail Early Fail Loud

The ERC20.sol inherited contract has a conditional checks, require(account != address(0, to see if the transaction intended to transfer funds and not create a new contract. Implemented using the require() function to check for conditions required for execution at the beginning of the function body to throw an exception if the condition is not met.

3. Restricting Access
Access has been restricted for other contracts’ access to the state by making state variables private of the inherited through ERC20.sol contract: _balances, _allowances, _totalSupply, _name, _symbol, _decimals.

Imported the Ownable contract module which provides a basic access control mechanism, where there is an account (an owner) that can be granted exclusive access to specific functions. This module is used through inheritance. It will make available the modifier onlyOwner, which can be applied to your functions to restrict their use to the owner.

4. Auto Deprecation
Was not used as there is no immediate need for any of the contracts used in MyToken to expire after a certain period of time. This could be implemented later if a fund raising event were to be launched with a fixed period.

5. Mortal
Was not employed as there is no need to permanently destroy the contract and remove it from the blockchain at anytime in the future.

6. Push over Pull Payments (Withdrawal Pattern)
Revisit this with Security Tools / Common Attacks: --> next section
