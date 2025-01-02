import { ContractFactory } from "ethers";
import { ethers, upgrades } from "hardhat";

async function main() {
  const TripleV2: ContractFactory = await ethers.getContractFactory("TripleV2");

  const tripleV2 = await upgrades.upgradeProxy(
    "0xb8E7DCEf9C49651ABc1b3D274111C5d59f463119",
    TripleV2
  );

  await tripleV2.waitForDeployment();

  console.log(`proxy address is ${await tripleV2.getAddress()}`);
}
main().catch((error) => {
  console.error(error);
});
