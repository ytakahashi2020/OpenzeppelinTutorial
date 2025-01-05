import { ethers } from "hardhat";

async function main() {
  const Verifier = await ethers.getContractFactory("ERC712Verifier");

  const verifier = await Verifier.deploy();

  await verifier.waitForDeployment();

  console.log(await verifier.getAddress());
}

main().catch((error) => {
  console.error(error);
});
