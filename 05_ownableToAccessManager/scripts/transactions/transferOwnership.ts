import { ethers } from "hardhat";

async function main() {
  const ownable = await ethers.getContractAt(
    "ERC20Ownable",
    "0x005A524953cd3e71eFa7160472269E77b25f03cA"
  );

  await ownable.transferOwnership("0x108A7C78a1e7DFE4f4f11A1f4Be5dFE6B97Fa67F");
}

main().catch((error) => {
  console.error(error);
});
