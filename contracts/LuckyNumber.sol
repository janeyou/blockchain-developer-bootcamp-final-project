// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract LuckyNumber {
    uint256 public myNumber;
    address owner = msg.sender;

    constructor(uint256 _num) public {
        myNumber = _num;
    }

    function getMyNumber() public view returns (uint256) {
        return myNumber;
    }

    function setMyNumber(uint256 x) public {
        require(msg.sender == owner, 'Not the owner!');
        require(x > 999 && x < 10000, 'Not in range!');
        myNumber = x;
    }
}
