import { ethers } from "hardhat";

async function main() {
  const JANUARY_IN_SECONDS = 60 * 60 * 24 * 31; // 31 day(2678400)
  const DAY_2025_1_1 = 1735689600; // 2025/01/01
  const vesting = await ethers.getContractFactory("CustomVestingWallet");

  const Vesting = await vesting.deploy(
    "0xBc62697F318A7A19A7167b78e1d570FF80829277",
    DAY_2025_1_1,
    JANUARY_IN_SECONDS
  );

  await Vesting.waitForDeployment();

  console.log(await Vesting.getAddress());
}

main().catch((error) => {
  console.error(error);
});
