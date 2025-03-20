const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("TransactionAgreement");

  const myContract = await MyContract.deploy();

  await myContract.waitForDeployment();

  console.log("MyContract deployed to:", myContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
