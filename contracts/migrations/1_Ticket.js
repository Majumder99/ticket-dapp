//artifacts means it brings the contract
const Tickets = artifacts.require("Tickets");

module.exports = (deployer) => {
  deployer.deploy(Tickets);
};
