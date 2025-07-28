// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

abstract contract Forme {
    uint public x;
    uint public y;
 
    constructor(uint _x, uint _y) {
        x = _x;
        y = _y;
    }

    function deplacerForme(uint dx, uint dy) public {
        x += dx;
        y += dy;
    }

    function afficheXY() public view returns (uint, uint) {
        return (x, y);
    }

    function afficheInfos() public pure virtual returns (string memory);

    function surface() public view virtual returns (uint);
}
