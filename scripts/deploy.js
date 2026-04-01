const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {
  console.log("🚀 Starting deployment to Sepolia testnet...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("📝 Deploying contracts with account:", deployer.address);

  // Check balance
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log("💰 Account balance:", hre.ethers.formatEther(balance), "ETH\n");

  if (balance < hre.ethers.parseEther("0.01")) {
    console.log("⚠️  WARNING: Low balance! You need at least 0.01 ETH for deployment.");
    console.log("Get Sepolia ETH from: https://www.alchemy.com/faucets/ethereum-sepolia\n");
  }

  // Deploy ScholarshipSystem contract
  console.log("📦 Deploying ScholarshipSystem contract...");
  const ScholarshipSystem = await hre.ethers.getContractFactory("ScholarshipSystem");
  const scholarshipSystem = await ScholarshipSystem.deploy();

  await scholarshipSystem.waitForDeployment();
  const contractAddress = await scholarshipSystem.getAddress();

  console.log("✅ ScholarshipSystem deployed to:", contractAddress);
  console.log("🔗 View on Etherscan: https://sepolia.etherscan.io/address/" + contractAddress);
  console.log("👤 Admin address:", deployer.address);
  console.log("\n⏳ Waiting for block confirmations...");

  // Wait for 5 block confirmations
  await scholarshipSystem.deploymentTransaction().wait(5);
  console.log("✅ Contract confirmed!\n");

  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    adminAddress: deployer.address,
    deploymentTime: new Date().toISOString(),
    blockNumber: await hre.ethers.provider.getBlockNumber(),
    transactionHash: scholarshipSystem.deploymentTransaction().hash
  };

  // Save to JSON file
  const deploymentPath = path.join(__dirname, "../deployment-info.json");
  fs.writeFileSync(deploymentPath, JSON.stringify(deploymentInfo, null, 2));
  console.log("💾 Deployment info saved to: deployment-info.json\n");

  // Update backend .env file
  console.log("📝 Updating configuration files...");
  updateEnvFile("backend/.env", contractAddress, deployer.address);
  updateEnvFile("frontend-react/.env", contractAddress, deployer.address);

  console.log("\n" + "=".repeat(70));
  console.log("🎉 DEPLOYMENT SUCCESSFUL!");
  console.log("=".repeat(70));
  console.log("\n📋 IMPORTANT INFORMATION:\n");
  console.log("Contract Address:", contractAddress);
  console.log("Admin Address:", deployer.address);
  console.log("Network: Sepolia Testnet");
  console.log("Etherscan:", "https://sepolia.etherscan.io/address/" + contractAddress);
  console.log("\n📝 NEXT STEPS:\n");
  console.log("1. Verify your contract on Etherscan (optional):");
  console.log("   npx hardhat verify --network sepolia", contractAddress);
  console.log("\n2. Deposit test funds to contract:");
  console.log("   npm run deposit");
  console.log("\n3. Start the backend:");
  console.log("   cd backend && python app.py");
  console.log("\n4. Test the application:");
  console.log("   Open http://localhost:3000");
  console.log("\n" + "=".repeat(70) + "\n");
}

function updateEnvFile(filePath, contractAddress, adminAddress) {
  try {
    if (fs.existsSync(filePath)) {
      let envContent = fs.readFileSync(filePath, "utf8");
      
      // Update contract address
      if (envContent.includes("CONTRACT_ADDRESS=")) {
        envContent = envContent.replace(
          /CONTRACT_ADDRESS=.*/,
          `CONTRACT_ADDRESS=${contractAddress}`
        );
      } else if (envContent.includes("VITE_CONTRACT_ADDRESS=")) {
        envContent = envContent.replace(
          /VITE_CONTRACT_ADDRESS=.*/,
          `VITE_CONTRACT_ADDRESS=${contractAddress}`
        );
      }
      
      // Update admin address (backend only)
      if (filePath.includes("backend") && envContent.includes("ADMIN_ADDRESS=")) {
        envContent = envContent.replace(
          /ADMIN_ADDRESS=.*/,
          `ADMIN_ADDRESS=${adminAddress}`
        );
      }
      
      fs.writeFileSync(filePath, envContent);
      console.log("✅ Updated:", filePath);
    } else {
      console.log("⚠️  File not found:", filePath);
    }
  } catch (error) {
    console.log("⚠️  Could not update", filePath, "- please update manually");
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("\n❌ Deployment failed:");
    console.error(error);
    process.exit(1);
  });
