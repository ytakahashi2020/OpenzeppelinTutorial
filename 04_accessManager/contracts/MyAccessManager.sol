// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
import { AccessManager } from "@openzeppelin/contracts/access/manager/AccessManager.sol";

contract MyAccessManager is AccessManager {
    constructor() AccessManager(msg.sender) { 
    }
    
}