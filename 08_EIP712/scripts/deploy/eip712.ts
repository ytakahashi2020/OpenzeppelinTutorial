import { ethers } from "hardhat";

async function main() {
  const test = await ethers.getContractFactory("SimpleEIP712Example");

  const Test = await test.deploy();

  await Test.waitForDeployment();

  console.log(await Test.getAddress());
}

main().catch((error) => {
  console.error(error);
});
