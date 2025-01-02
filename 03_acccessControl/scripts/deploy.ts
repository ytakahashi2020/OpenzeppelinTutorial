import { ethers } from "hardhat";

async function main() {
  const Contract = await ethers.getContractFactory(
    "AccessControlERC20MintMissing"
  );

  const contract = await Contract.deploy();

  await contract.waitForDeployment();

  console.log(await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
});
