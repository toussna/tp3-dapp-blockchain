// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Positivite {
    function estPositif(int nombre) public pure returns (bool) {
        return nombre >= 0;
    }
}
