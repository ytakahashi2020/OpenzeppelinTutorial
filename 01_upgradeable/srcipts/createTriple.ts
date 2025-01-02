import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";

async function main() {
  const Triple: ContractFactory = await ethers.getContractFactory("Triple");

  const triple = await upgrades.deployProxy(Triple, {
    kind: "transparent",
  });

  await triple.waitForDeployment();

  console.log(`proxy address is ${await triple.getAddress()}`);
}
main().catch((error) => {
  console.error(error);
});
