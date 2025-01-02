import { ethers } from "hardhat";

async function main() {
  const accessManaged = await ethers.getContractFactory("MyAccessManagedERC20");
  const AccessManaged = await accessManaged.deploy(
    "0x3aeFf32Ab803629833a677016D1d2a415DaA2e68"
  );
  await AccessManaged.waitForDeployment();
  console.log(await AccessManaged.getAddress());
}

main().catch((error) => {
  console.error(error);
});
