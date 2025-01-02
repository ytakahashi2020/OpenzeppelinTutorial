// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";


contract MyContract is Ownable {
    uint256 public number;

    constructor() Ownable(_msgSender()) {
        number = 0;
    }

    function setNumber(uint256 newNumber) public onlyOwner {
        number = newNumber;
    }
}