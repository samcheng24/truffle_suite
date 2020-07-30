const MyContract = artifacts.require("./MyContract.sol");

module.exports = function (deployer) {
  // Use deployer to state migration tasks.
  deployer.deploy(MyContract, "Starting message");
};