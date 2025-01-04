// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;


import "@openzeppelin/contracts/finance/VestingWallet.sol";

contract CustomVestingWallet is VestingWallet {
    constructor(
        address beneficiaryAddress,  
        uint64 startTimestamp,      
        uint64 durationSeconds
    )
        VestingWallet(
            beneficiaryAddress, 
            startTimestamp, 
            durationSeconds
        )
    {}
}