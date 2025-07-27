const positivite = artifacts.require("Positivite");

module.exports = function (deployer) {
  deployer.deploy(positivite);
};