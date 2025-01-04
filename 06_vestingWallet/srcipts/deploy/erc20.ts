import { ethers } from "hardhat";

async function main() {
  const Erc20 = await ethers.getContractFactory("ERC20Ownable");

  const erc20 = await Erc20.deploy();

  await erc20.waitForDeployment();

  console.log(await erc20.getAddress());
}

main().catch((error) => {
  console.error(error);
});
