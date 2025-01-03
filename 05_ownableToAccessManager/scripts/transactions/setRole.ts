import { ethers } from "hardhat";

async function main() {
  const manager = await ethers.getContractAt(
    "MyAccessManager",
    "0x108A7C78a1e7DFE4f4f11A1f4Be5dFE6B97Fa67F"
  );

  //   set EOA Account to MINTER Role

  const MINTER = 42n;

  const response = await manager.grantRole(
    MINTER,
    "0xBc62697F318A7A19A7167b78e1d570FF80829277",
    0n
  );

  await response.wait();

  //  set mint function manager to MINTER Role

  const selector = ethers.id("mint(address,uint256)").slice(0, 10);
  console.log(selector);

  const response2 = await manager.setTargetFunctionRole(
    "0x005A524953cd3e71eFa7160472269E77b25f03cA",
    [selector],
    MINTER
  );

  await response2.wait();
}

main().catch((error) => {
  console.error(error);
});
