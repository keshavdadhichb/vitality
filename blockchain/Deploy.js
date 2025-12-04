const hre = require("hardhat");

async function main() {
  console.log("----------------------------------------------------");
  console.log("🔒 Deploying BankAuditLedger to the Blockchain...");
  console.log("----------------------------------------------------");

  // Get the ContractFactory
  const BankAuditLedger = await hre.ethers.getContractFactory("BankAuditLedger");

  // Deploy
  const auditLedger = await BankAuditLedger.deploy();

  // Wait for deployment to finish
  await auditLedger.waitForDeployment();

  const address = await auditLedger.getAddress();

  console.log(`✅ Success! Smart Contract deployed to: ${address}`);
  console.log("----------------------------------------------------");
  console.log("👉 Copy this address into your Python backend configuration.");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});