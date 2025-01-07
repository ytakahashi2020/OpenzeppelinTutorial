import { ethers } from "hardhat";

async function main() {
  // コントラクトインスタンス
  const contract = await ethers.getContractAt(
    "SimpleEIP712Example",
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  );

  const signer = (await ethers.getSigners())[0];

  const provider = ethers.provider;

  const domain = {
    name: "SimpleEIP712Example",
    version: "1",
    chainId: (await provider.getNetwork()).chainId,
    verifyingContract: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  };

  const types = {
    SimpleStruct: [
      { name: "message", type: "string" },
      { name: "value", type: "uint256" },
    ],
  };

  // メッセージデータ
  const message = {
    message: "Hello, EIP-712!",
    value: 42,
  };

  // EIP-712署名を生成
  const signature = await signer.signTypedData(domain, types, message);
  console.log("Signature:", signature);

  // スマートコントラクトで署名を検証
  const recoveredAddress = await contract.verify(signer, message, signature);
  console.log("Recovered Address:", recoveredAddress);
  console.log("Expected Address:", await signer.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
