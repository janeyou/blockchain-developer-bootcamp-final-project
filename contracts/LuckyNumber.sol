// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract LuckyNumber {
    uint256 public myNumber;
    address owner = msg.sender;

    constructor(uint256 _num) public {
        myNumber = _num;
    }

    function getMyNumber() public view returns (uint256) {
        // get the code of current marathon running plan

        return myNumber;
    }

    function setMyNumber(uint256 x) public {
        // set the code of new marathon running plan

        require(msg.sender == owner, 'Not the owner!');
        require(x > 99999 && x < 1000000, 'Not in range!');
        myNumber = x;
    }
}
