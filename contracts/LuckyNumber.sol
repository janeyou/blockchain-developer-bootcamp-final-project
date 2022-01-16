// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

/// @title A code generator for marathon training plans
/// @author Jane You
/// @notice You can use this contract for only the most basic plans
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.

contract LuckyNumber {
    uint256 public myNumber;
    address owner = msg.sender;

    constructor(uint256 _num) public {
        myNumber = _num;
    }

    /// @notice Generate marathon training plans
    /// @dev The generator algorithm is randomized and need to be improved
    /// @return Code in six digits
    function getMyNumber() public view returns (uint256) {
        // get the code of current marathon running plan

        return myNumber;
    }

    /// @notice Reset a new plan
    /// @dev Code in six digits
    /// @param x The code to reset a marathon training schedule
    function setMyNumber(uint256 x) public {
        // set the code of new marathon running plan

        require(msg.sender == owner, 'Not the owner!');
        require(x > 99999 && x < 1000000, 'Not in range!');
        myNumber = x;
    }
}
