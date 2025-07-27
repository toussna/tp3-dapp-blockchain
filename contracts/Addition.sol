// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Addition {
    uint public nombre1;
    uint public nombre2;

    function setNombres(uint a, uint b) public {
        nombre1 = a;
        nombre2 = b;
    }

    function addition1() public view returns (uint) {
        return nombre1 + nombre2;
    }

    function addition2(uint a, uint b) public pure returns (uint) {
        return a + b;
    }
}
