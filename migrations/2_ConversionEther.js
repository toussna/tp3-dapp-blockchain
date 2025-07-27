const Conversion = artifacts.require("ConversionEther");

module.exports = function (deployer) {
  deployer.deploy(Conversion);
};