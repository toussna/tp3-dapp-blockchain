// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Parite {
    function estPair(int nombre) public pure returns (bool) {
        return nombre % 2 == 0;
    }
}
 