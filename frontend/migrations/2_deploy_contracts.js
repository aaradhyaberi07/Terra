var Notice = artifacts.require("../contracts/Notice.sol");
var Insurance = artifacts.require("../contracts/Insurance.sol");
var supplychain = artifacts.require("../contracts/SupplyChain.sol");
var Coin = artifacts.require("../contracts/TerraCoin.sol");
var erc20 = artifacts.require("../contracts/ERC20.sol");

module.exports = function (deployer) {
	deployer.deploy(Notice);
	deployer.deploy(Insurance);
	deployer.deploy(supplychain);
	deployer.deploy(erc20);
	deployer.deploy(Coin);
};
