import {
  ContractTransactionReceipt,
  ContractTransactionResponse,
} from "ethers";
import { ethers } from "hardhat";

async function main() {
  const manager = await ethers.getContractAt(
    "MyAccessManager",
    "0x3aeFf32Ab803629833a677016D1d2a415DaA2e68"
  );

  const mintSelector = ethers.id("mint(address,uint256)").slice(0, 10); // 0x40c10f19
  console.log(mintSelector);

  const result: ContractTransactionResponse =
    await manager.setTargetFunctionRole(
      "0x08786b717dB43B637fF835503d4D558dAD235F56",
      [mintSelector],
      42n
    );
  const receipt: ContractTransactionReceipt | null = await result.wait();

  console.log(receipt?.hash);
}

main().catch((error) => {
  console.error(error);
});
