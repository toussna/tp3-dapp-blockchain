// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Payment {
    address public recipient;

    constructor(address _recipient) {
        recipient = _recipient;
    }

    function receivePayment() public payable {
        require(msg.value > 0, "Montant nul interdit");
    }

    function withdraw() public {
        require(msg.sender == recipient, "Acces refuse");
        payable(recipient).transfer(address(this).balance);
    }
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}