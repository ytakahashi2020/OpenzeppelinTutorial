import { ethers } from "hardhat";

async function main() {
  const erc20 = await ethers.getContractAt(
    "ERC20Ownable",
    "0xE6e5C36C345386e2734ef4873d32827675f1eA6d"
  );

  await erc20.mint("0x8854b06672956Afd0052fB2625b15D6D6b946911", 10000n);
}

main().catch((error) => {
  console.error(error);
});
