import { ContractTransactionResponse } from "ethers";
import { ethers } from "hardhat";
import { MyAccessManager } from "../../typechain-types";

async function main() {
  const manager: MyAccessManager = await ethers.getContractAt(
    "MyAccessManager",
    "0x3aeFf32Ab803629833a677016D1d2a415DaA2e68"
  );

  const MINTER = 42n;

  await manager.labelRole(MINTER, "MINTER");

  const userAddress = "0xBc62697F318A7A19A7167b78e1d570FF80829277";

  console.log("Granting MINTER role to:", userAddress);
  const reslut: ContractTransactionResponse = await manager.grantRole(
    MINTER,
    userAddress,
    0
  );

  const receipt = await reslut.wait();

  console.log(receipt?.hash);
}

main().catch((error) => {
  console.error(error);
});
