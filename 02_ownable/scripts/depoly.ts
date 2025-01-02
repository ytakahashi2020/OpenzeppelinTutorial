import { ethers } from "hardhat";

async function main() {
  const MyContract = await ethers.getContractFactory("MyContract");

  const contract = await MyContract.deploy();

  await contract.waitForDeployment();

  console.log(await contract.getAddress());
}
main();
