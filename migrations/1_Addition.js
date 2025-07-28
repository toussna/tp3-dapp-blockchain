const Addition = artifacts.require("Addition");

module.exports = async function (deployer) {
    await deployer.deploy(Addition);
    const additionInstance = await Addition.deployed();
    
    await additionInstance.setNombres(5, 3);
};
 