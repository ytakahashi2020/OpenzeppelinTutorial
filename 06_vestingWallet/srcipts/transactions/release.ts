import { ethers } from "hardhat";

async function main() {
  const beneficiary = await ethers.getSigner(
    "0xBc62697F318A7A19A7167b78e1d570FF80829277"
  );
  const vesting = await ethers.getContractAt(
    "CustomVestingWallet",
    "0x8854b06672956Afd0052fB2625b15D6D6b946911",
    beneficiary
  );

  await vesting["release(address)"](
    "0xE6e5C36C345386e2734ef4873d32827675f1eA6d"
  );
}
main().catch((error) => {
  console.error(error);
});
