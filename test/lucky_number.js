const LuckyNumber = artifacts.require('LuckyNumber');

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('LuckyNumber', function (accounts) {
  describe('Initial deployment', async () => {
    it('should assert true', async function () {
      await LuckyNumber.deployed();
      return assert.isTrue(true);
    });

    it("was deployed and it's intial value is 0", async () => {
      // get subject
      const myInstance = await LuckyNumber.deployed();
      // verify it starts with zero
      const myNumber = await myInstance.getMyNumber.call();
      assert.equal(myNumber, 0, `Initial state should be zero`);
    });
  });

  describe('Functionality', () => {
    it('should store the code 666888', async () => {
      // get subject
      const myInstance = await LuckyNumber.deployed();

      // change the subject
      await myInstance.setMyNumber(666888, { from: accounts[0] });

      // verify we changed the subject
      const myNumber = await myInstance.getMyNumber.call();
      assert.equal(myNumber, 666888, `${myNumber} was not stored!`);
    });
    it('should be a six digital number', async () => {
      // get subject
      const myInstance = await LuckyNumber.deployed();

      // change the subject
      await myInstance.setMyNumber(123123, { from: accounts[0] });

      // verify we changed the subject
      const myNumber = await myInstance.getMyNumber.call();
      assert.equal(myNumber, 123123, `${myNumber} was not in range!`);
    });
  });

  describe('Owner verification', () => {
    it('should not let someone else change the variable', async () => {
      const [owner, badJoe] = accounts;
      const myInstance = await LuckyNumber.new(666888, { from: owner });

      try {
        await myInstance.setMyNumber(9876, { from: badJoe });
      } catch (err) {
        console.log('not the owner, so no change code!');
      }
      const balance = await web3.eth.getBalance(accounts[3]);
      console.log(balance);

      const myNumber = await myInstance.getMyNumber.call();
      assert.equal(myNumber, 666888, 'Code was not changed!');
    });
  });
});
