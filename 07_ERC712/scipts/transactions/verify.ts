import { ethers } from "hardhat";

async function main() {
  const provider = ethers.provider;

  const signer = (await ethers.getSigners())[0];
  const verifier = await ethers.getContractAt(
    "ERC712Verifier",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const domain = {
    name: "Simple",
    version: "1",
    chainId: (await provider.getNetwork()).chainId,
    verifyingContract: await verifier.getAddress(),
  };

  const types = {
    SimpleStruct: [
      { name: "message", type: "string" },
      { name: "value", type: "uint256" },
    ],
  };

  const message = {
    message: "hello!",
    value: 42,
  };

  const signature = await signer.signTypedData(domain, types, message);

  const recoveredAddress = await verifier.verify(
    message.message,
    message.value,
    signature
  );

  console.log(`recoveredAddress is ${recoveredAddress}`);
  console.log(`signer is ${signer.address}`);
}

main().catch((error) => {
  console.error(error);
});
