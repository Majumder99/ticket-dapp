import React, { useState, useEffect } from "react";
import Web3 from "web3";
import Configuration from "../../contracts/build/contracts/Tickets.json";
import imm from "./image/ticket.png";

// m,dKK@;fl99

const App = () => {
  const [account, setAccount] = useState(null);
  const [address, setAddress] = useState([]);
  const CONTRACT_ADDRESS = Configuration.networks["5777"].address;
  // const CONTRACT_ADDRESS = "0x904057Ba2E403Fe73C1Cbf761983fA5472355489";
  const CONTRACT_ABI = Configuration.abi;
  // const CONTRACT_ABI = [
  //   {
  //     "inputs": [],
  //     "stateMutability": "nonpayable",
  //     "type": "constructor"
  //   },
  //   {
  //     "inputs": [],
  //     "name": "owner",
  //     "outputs": [
  //       {
  //         "internalType": "address",
  //         "name": "",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function",
  //     "constant": true
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "tickets",
  //     "outputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "price",
  //         "type": "uint256"
  //       },
  //       {
  //         "internalType": "address",
  //         "name": "owner",
  //         "type": "address"
  //       }
  //     ],
  //     "stateMutability": "view",
  //     "type": "function",
  //     "constant": true
  //   },
  //   {
  //     "inputs": [
  //       {
  //         "internalType": "uint256",
  //         "name": "ticket_number",
  //         "type": "uint256"
  //       }
  //     ],
  //     "name": "buyTicket",
  //     "outputs": [],
  //     "stateMutability": "payable",
  //     "type": "function",
  //     "payable": true
  //   }
  // ]

  const web3 = new Web3("HTTP://127.0.0.1:7545");

  const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

  const handleAccounts = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const refreshTicket = async () => {
    const d = [];
    for (let i = 0; i < 10; i++) {
      const tickets = await contract.methods.tickets(i).call();
      d.push(tickets);
    }
    setAddress(d);
  };
  const handleBuy = async (id) => {
    await contract.methods.buyTicket(id).send({
      from: account,
      value: web3.utils.toWei("1", "ether"),
    });
  };
  console.log(address);
  return (
    <>
      <button className="btn btn-primary" onClick={handleAccounts}>
        Display account
      </button>
      <dir>{account}</dir>
      <button onClick={refreshTicket}>Click for ticket</button>
      {address &&
        address.map((m) => (
          <div
            className="card"
            style={{ width: "18rem", marginTop: "2rem" }}
            key={m.owner}
          >
            <img src={imm} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{m.owner}</h5>
              <p className="card-text">{m.price}</p>
              <p className="card-text">{m.id}</p>
              <button
                className="btn btn-warning"
                onClick={() => handleBuy(m.id)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default App;
