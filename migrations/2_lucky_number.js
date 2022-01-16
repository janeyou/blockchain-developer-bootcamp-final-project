const LuckyNumber = artifacts.require('LuckyNumber');
module.exports = function (deployer) {
  deployer.deploy(LuckyNumber, 0);
};
