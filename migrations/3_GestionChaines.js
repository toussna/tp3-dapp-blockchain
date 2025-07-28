const gestionCh = artifacts.require("GestionChaines");

module.exports = function (deployer) {
  deployer.deploy(gestionCh);
}; 