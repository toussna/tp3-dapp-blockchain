const Payment = artifacts.require("Payment");

module.exports = function (deployer, network, accounts) {
  // accounts[1] est le destinataire autorisé à retirer
  deployer.deploy(Payment, accounts[1]);
};
 