const hre = require("hardhat");

async function main() {

  const vendingMachine = await hre.ethers.deployContract("VendingMachine3")

  await vendingMachine.waitForDeployment();

  console.log(
    `Vending Machine Deployed To: ${vendingMachine.target}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
