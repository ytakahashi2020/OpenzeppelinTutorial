import { ethers } from "hardhat";

async function main() {
  const ownable = await ethers.getContractAt(
    "ERC20Ownable",
    "0x005A524953cd3e71eFa7160472269E77b25f03cA"
  );

  const testSigner = await ethers.getSigner(
    "0xBc62697F318A7A19A7167b78e1d570FF80829277"
  );
  const manager = await ethers.getContractAt(
    "MyAccessManager",
    "0x108A7C78a1e7DFE4f4f11A1f4Be5dFE6B97Fa67F"
  );

  const data = ownable.interface.encodeFunctionData("mint", [
    "0xBc62697F318A7A19A7167b78e1d570FF80829277",
    1000,
  ]);

  await manager
    .connect(testSigner)
    .execute("0x005A524953cd3e71eFa7160472269E77b25f03cA", data);
}

main().catch((error) => {
  console.error(error);
});
