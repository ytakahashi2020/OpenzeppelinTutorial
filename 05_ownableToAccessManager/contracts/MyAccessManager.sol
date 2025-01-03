// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { AccessManager } from "@openzeppelin/contracts/access/manager/AccessManager.sol";

contract MyAccessManager is AccessManager {
    constructor() AccessManager(msg.sender){}
}