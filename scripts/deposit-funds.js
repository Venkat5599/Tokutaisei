const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("💰 Depositing funds to ScholarshipSystem contract...\n");

  // Load deployment info
  const deploymentPath = path.join(__dirname, "../deployment-info.json");
  if (!fs.existsSync(deploymentPath)) {
    console.error("❌ deployment-info.json not found. Please deploy the contract first.");
    process.exit(1);
  }

  const deploymentInfo = JSON.parse(fs.readFileSync(deploymentPath, "utf8"));
  const contractAddress = deploymentInfo.contractAddress;

  console.log("📝 Contract Address:", contractAddress);

  // Get signer
  const [signer] = await hre.ethers.getSigners();
  console.log("👤 Depositing from:", signer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(signer.address);
  console.log("💰 Your balance:", hre.ethers.formatEther(balance), "ETH\n");

  // Get contract instance
  const ScholarshipSystem = await hre.ethers.getContractFactory("ScholarshipSystem");
  const contract = ScholarshipSystem.attach(contractAddress);

  // Deposit amount (0.05 ETH - smaller amount)
  const depositAmount = hre.ethers.parseEther("0.05");
  console.log("📤 Depositing:", hre.ethers.formatEther(depositAmount), "ETH");

  // Send deposit transaction
  const tx = await contract.depositFunds({ value: depositAmount });
  console.log("⏳ Transaction sent:", tx.hash);
  console.log("⏳ Waiting for confirmation...");

  await tx.wait();
  console.log("✅ Deposit confirmed!\n");

  // Check contract balance
  const contractBalance = await contract.getContractBalance();
  console.log("💰 Contract balance:", hre.ethers.formatEther(contractBalance), "ETH");
  console.log("🔗 View on Etherscan: https://sepolia.etherscan.io/tx/" + tx.hash);
  console.log("\n✅ Funds deposited successfully!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deposit failed:");
    console.error(error);
    process.exit(1);
  });
