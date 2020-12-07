pragma solidity ^0.5.0;

import "@openzeppelin/contracts/crowdsale/Crowdsale.sol";

/**
 * @title MyCrowdsale
 * @dev This is an example of a fully fledged crowdsale.
 */
contract MyCrowdsale is Crowdsale {
    constructor (
        uint256 rate,
        address payable wallet,
        IERC20 token
    )
        public
        Crowdsale(rate, wallet, token)
    {
    }
}