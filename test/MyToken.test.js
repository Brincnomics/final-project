// test/MyToken.test.js
// SPDX-License-Identifier: MIT

const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert, constants } = require('@openzeppelin/test-helpers');

// Load compiled artifacts
const MyToken = artifacts.require('MyToken');

// Start test block
contract('MyToken', function ([ creator, other ]) {

  const name = 'MyToken';
  const symbol = "MTK";
  const decimals = '18';
  const totalSupply = new BN('10000000000000000000000');

  beforeEach(async function () {
    this.token = await MyToken.new(name, symbol, totalSupply, { from: creator });
  });

  it('retrieve returns a value previously stored', async function () {
    // Use large integer comparisons
    expect(await this.token.totalSupply()).to.be.bignumber.equal(totalSupply);
  });

  it('has a name', async function () {
    expect(await this.token.name()).to.be.equal(name);
  });

  it('has a symbol', async function () {
    expect(await this.token.symbol()).to.be.equal(symbol);
  });

  it('assigns the initial total supply to the creator', async function () {
    expect(await this.token.balanceOf(creator)).to.be.bignumber.equal(totalSupply);
  });

  it ('has correct decimals', async function(){
    expect(await this.token.decimals()).to.be.bignumber.equal(decimals);
  })    
});
