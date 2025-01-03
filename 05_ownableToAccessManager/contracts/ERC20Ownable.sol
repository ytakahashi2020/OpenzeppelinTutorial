// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
contract ERC20Ownable is ERC20, Ownable {
    constructor() ERC20("test", "TT") Ownable(_msgSender()){}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

}