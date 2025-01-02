import { ethers } from "hardhat";

async function main() {
  const accessManager = await ethers.getContractFactory("MyAccessManager");

  const AccessManager = await accessManager.deploy();

  await AccessManager.waitForDeployment();

  console.log(await AccessManager.getAddress());
}

main().catch((error) => {
  console.log(error);
});
