# Avoiding Common Attacks

1. Integer Overflow and Underflow [SWC-101]

Prevented inheriting SafeMath.sol from OpenZeppelin Library.

2. Reentrancy Attack [SWC-107]

Prevented by inheriting the ReentrancyGuard.sol from the OpenZeppelin Library.

3. Denial of Service Attacks (DOS) [SWC-113][SWC-128]

Prevented implementing the Withdrawal Pattern. (Confirm)
