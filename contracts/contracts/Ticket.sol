//SPDX-License-Identifier: MIT
pragma solidity >= 0.4.0;

uint constant Total_ticket = 10;

contract Tickets{
    address public owner = msg.sender;
    struct Ticket{
        uint price;
        address owner;
    }

    Ticket[Total_ticket] public tickets;
    constructor(){
        for (uint i = 0; i < Total_ticket; i++) {
            tickets[i].price = 1 ether;
            tickets[i].owner = address(0x0);
        }
    }

    function buyTicket(uint ticket_number) external payable{
        require(ticket_number < Total_ticket && ticket_number >= 0, "ticket is not here");
        require(tickets[ticket_number].owner == address(0x0), "address is not 0x0");
        require(msg.value >= tickets[ticket_number].price, "value is less than the price");
        tickets[ticket_number].owner = msg.sender;
    }
}