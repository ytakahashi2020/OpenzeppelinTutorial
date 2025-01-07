// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/utils/cryptography/EIP712.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract SimpleEIP712Example is EIP712 {
    // Define a struct for the message
    using ECDSA for bytes32;

    struct SimpleStruct {
        string message;
        uint256 value;
    }

    bytes32 private constant MESSAGE_TYPEHASH = keccak256(
        "SimpleStruct(string message,uint256 value)"
    );

    constructor() EIP712("SimpleEIP712Example", "1") {}

    // Verify the signature
    function verify(
        address signer,
        SimpleStruct calldata request,
        bytes calldata signature
    ) external view returns (bool) {

        bytes32 structHash = keccak256(abi.encode(
                MESSAGE_TYPEHASH,
                keccak256(bytes(request.message)),
                request.value
        ));

        bytes32 digest =  _hashTypedDataV4(structHash);
  
        return digest.recover(signature) == signer;
    }
}