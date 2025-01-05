// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract ERC712Verifier {
    using ECDSA for bytes32;

    bytes32 public constant SIMPLE_TYPE_HASH = keccak256(
        "SimpleStruct(string message,uint256 value)"
    );

    bytes32 public constant EIP712_DOMAIN_TYPE_HASH = keccak256(
        "EIP712Domain(string name,string version,uint256 chainId,address verifyingContract)"
    );

    bytes32 public immutable DOMAIN_SELECTOR;

    constructor() {
        DOMAIN_SELECTOR = keccak256(
            abi.encode(
                EIP712_DOMAIN_TYPE_HASH,
                keccak256(bytes("Simple")),
                keccak256(bytes("1")),
                block.chainid,
                address(this)
            )
        );
    }

    function verify(
        string memory message,
        uint256 value,
        bytes memory signature
    ) public view returns(address) {
        bytes32 structHash = keccak256(
            abi.encode(
                SIMPLE_TYPE_HASH,
                keccak256(bytes(message)),
                value
            )
        );

        bytes32 digest = keccak256(
            abi.encodePacked("\x19\x01", DOMAIN_SELECTOR,structHash)
        );

        return digest.recover(signature);
    }

}