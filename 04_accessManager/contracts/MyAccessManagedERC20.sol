// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { AccessManaged } from "@openzeppelin/contracts/access/manager/AccessManaged.sol";
import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyAccessManagedERC20 is ERC20, AccessManaged {
    constructor(address initialAuthority) ERC20("test", "TT") AccessManaged(initialAuthority){}

    function mint(address to, uint256 amount) public restricted {
        _mint(to, amount);
    }

}