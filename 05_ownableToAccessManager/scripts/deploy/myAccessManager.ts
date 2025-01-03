import { ethers } from "hardhat";

async function main() {
  const manager = await ethers.getContractFactory("MyAccessManager");

  const Manager = await manager.deploy();

  await Manager.waitForDeployment();

  console.log(await Manager.getAddress());
}

main().catch((error) => {
  console.error(error);
});
