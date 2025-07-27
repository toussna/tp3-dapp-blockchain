const rectangle = artifacts.require("Rectangle");

module.exports = function (deployer) {
  deployer.deploy(rectangle, 0, 0, 5, 4);
};