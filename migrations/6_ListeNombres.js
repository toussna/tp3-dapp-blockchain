const ListeNombres = artifacts.require("ListeNombres");

module.exports = function (deployer) {
  deployer.deploy(ListeNombres);
}; 