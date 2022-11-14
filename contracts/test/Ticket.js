const assert = require("assert");
const Tickets = artifacts.require("Tickets");

contract("Tickets", (accounts) => {
  const BUYER = accounts[1];
  const TICKET_ID = 0;

  it("should allower a user to buy a ticket", async () => {
    const instance = await Tickets.deployed();
    const originalTicket = await instance.tickets(TICKET_ID);
    await instance.buyTicket(TICKET_ID, {
      from: BUYER,
      value: originalTicket.price,
    });
    const updatedTicket = await instance.tickets(TICKET_ID);
    assert.equal(
      updatedTicket.owner,
      BUYER,
      "The buyer should now own this ticket"
    );
  });
});
