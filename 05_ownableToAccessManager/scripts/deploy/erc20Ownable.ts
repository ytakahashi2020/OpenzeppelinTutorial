import { ethers } from "hardhat";

async function main() {
  const ownable = await ethers.getContractFactory("ERC20Ownable");

  const Ownable = await ownable.deploy();

  await Ownable.waitForDeployment();

  console.log(await Ownable.getAddress());
}

main().catch((error) => {
  console.error(error);
});
