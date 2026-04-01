# 🔨 Hardhat Deployment Guide

## ✅ Setup Complete!

Hardhat is now configured and ready to deploy your smart contract.

---

## 📋 Prerequisites

Before deploying, you need:

1. **Sepolia Test ETH** (at least 0.05 ETH)
   - Get from: https://www.alchemy.com/faucets/ethereum-sepolia

2. **Infura or Alchemy API Key**
   - Infura: https://infura.io (free)
   - Alchemy: https://alchemy.com (free)

3. **MetaMask Private Key**
   - Open MetaMask
   - Click three dots → Account Details
   - Show Private Key
   - Copy it (keep it secret!)

---

## 🚀 Deployment Steps

### Step 1: Configure Environment Variables

Edit the `.env` file in the root directory:

```env
# Get from https://infura.io or https://alchemy.com
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY

# From MetaMask: Account Details → Show Private Key
ADMIN_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE

# From MetaMask: Copy Address
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE
```

**⚠️ IMPORTANT:**
- Never commit `.env` to git
- Keep your private key secret
- Use a test wallet, not your main wallet

---

### Step 2: Verify Hardhat Setup

Test that Hardhat is working:

```bash
npx hardhat compile
```

**Expected output:**
```
Compiled 1 Solidity file successfully
```

---

### Step 3: Deploy to Sepolia

Run the deployment script:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**What happens:**
1. Connects to Sepolia testnet
2. Deploys ScholarshipSystem contract
3. Waits for 5 block confirmations
4. Saves deployment info to `deployment-info.json`
5. Automatically updates `.env` files

**Expected output:**
```
🚀 Starting deployment to Sepolia testnet...

📝 Deploying contracts with account: 0x742d35Cc...
💰 Account balance: 0.5 ETH

📦 Deploying ScholarshipSystem contract...
✅ ScholarshipSystem deployed to: 0xABCD1234...
🔗 View on Etherscan: https://sepolia.etherscan.io/address/0xABCD1234...
👤 Admin address: 0x742d35Cc...

⏳ Waiting for block confirmations...
✅ Contract confirmed!

💾 Deployment info saved to: deployment-info.json

📝 Updating configuration files...
✅ Updated: backend/.env
✅ Updated: frontend-react/.env

======================================================================
🎉 DEPLOYMENT SUCCESSFUL!
======================================================================

📋 IMPORTANT INFORMATION:

Contract Address: 0xABCD1234...
Admin Address: 0x742d35Cc...
Network: Sepolia Testnet
Etherscan: https://sepolia.etherscan.io/address/0xABCD1234...
```

---

### Step 4: Deposit Test Funds (Optional)

Deposit ETH to the contract so you can test fund releases:

```bash
npx hardhat run scripts/deposit-funds.js --network sepolia
```

**This will:**
- Deposit 0.5 ETH to the contract
- Allow you to test releasing funds to students

**Expected output:**
```
💰 Depositing funds to ScholarshipSystem contract...

📝 Contract Address: 0xABCD1234...
👤 Depositing from: 0x742d35Cc...
💰 Your balance: 0.45 ETH

📤 Depositing: 0.5 ETH
⏳ Transaction sent: 0xTXHASH...
⏳ Waiting for confirmation...
✅ Deposit confirmed!

💰 Contract balance: 0.5 ETH
🔗 View on Etherscan: https://sepolia.etherscan.io/tx/0xTXHASH...

✅ Funds deposited successfully!
```

---

### Step 5: Verify Contract on Etherscan (Optional)

Make your contract source code public:

```bash
npx hardhat verify --network sepolia YOUR_CONTRACT_ADDRESS
```

Replace `YOUR_CONTRACT_ADDRESS` with the address from deployment.

**Benefits:**
- Users can read your contract code
- Adds credibility
- Easier to interact with on Etherscan

---

### Step 6: Start Backend

```bash
cd backend
python app.py
```

**Expected output:**
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

---

### Step 7: Test the Application

1. Open: http://localhost:3000
2. Connect MetaMask
3. Submit a scholarship application
4. Approve it (as admin)
5. Release funds
6. Check Etherscan for all transactions!

---

## 📁 Files Created

After deployment, you'll have:

```
.
├── .env                        # Your configuration (DO NOT COMMIT!)
├── hardhat.config.js          # Hardhat configuration
├── deployment-info.json       # Deployment details
├── scripts/
│   ├── deploy.js             # Deployment script
│   └── deposit-funds.js      # Fund deposit script
├── artifacts/                 # Compiled contracts
└── cache/                     # Hardhat cache
```

---

## 🔍 Deployment Info

After deployment, check `deployment-info.json`:

```json
{
  "network": "sepolia",
  "contractAddress": "0xABCD1234...",
  "adminAddress": "0x742d35Cc...",
  "deploymentTime": "2024-03-31T12:00:00.000Z",
  "blockNumber": 1234567,
  "transactionHash": "0xTXHASH..."
}
```

---

## 🧪 Testing Commands

### Compile Contract
```bash
npx hardhat compile
```

### Run Tests (if you create them)
```bash
npx hardhat test
```

### Check Contract Size
```bash
npx hardhat size-contracts
```

### Run Local Node (for testing)
```bash
npx hardhat node
```

### Deploy to Local Node
```bash
npx hardhat run scripts/deploy.js --network localhost
```

---

## 🆘 Troubleshooting

### "Insufficient funds for gas"
**Solution:** Get more Sepolia ETH from faucet

### "Invalid API Key"
**Solution:** Check your Infura/Alchemy API key in `.env`

### "Private key is invalid"
**Solution:** 
- Make sure it starts with `0x`
- Copy the full key from MetaMask
- Don't include any spaces

### "Network sepolia not found"
**Solution:** Check `hardhat.config.js` has correct network configuration

### "Contract not found"
**Solution:** Run `npx hardhat compile` first

### "Transaction underpriced"
**Solution:** Gas prices might be high, wait and try again

---

## 📊 Gas Costs (Approximate)

| Operation | Gas Cost | ETH Cost (50 Gwei) |
|-----------|----------|---------------------|
| Deploy Contract | ~2,500,000 | ~0.125 ETH |
| Apply for Scholarship | ~150,000 | ~0.0075 ETH |
| Approve Application | ~50,000 | ~0.0025 ETH |
| Release Funds | ~80,000 | ~0.004 ETH |

---

## 🔐 Security Reminders

1. **Never commit `.env` to git**
   - Already in `.gitignore`
   - Contains your private key

2. **Use a test wallet**
   - Don't use your main wallet
   - Only keep test ETH in it

3. **Keep private key secure**
   - Don't share it
   - Don't paste it in public places

4. **Verify contract address**
   - Always check on Etherscan
   - Make sure it's your contract

---

## 📝 Next Steps After Deployment

1. ✅ Save contract address
2. ✅ Verify on Etherscan (optional)
3. ✅ Deposit test funds
4. ✅ Start backend server
5. ✅ Test full application flow
6. ✅ Share your success!

---

## 🎉 Success Checklist

- [ ] Hardhat installed and configured
- [ ] `.env` file configured with API keys
- [ ] Contract compiled successfully
- [ ] Contract deployed to Sepolia
- [ ] Contract address saved
- [ ] Deployment info saved
- [ ] Backend `.env` updated
- [ ] Frontend `.env` updated
- [ ] Test funds deposited
- [ ] Contract verified on Etherscan (optional)
- [ ] Backend started
- [ ] Application tested end-to-end

---

## 🔗 Useful Links

- **Hardhat Docs**: https://hardhat.org/docs
- **Sepolia Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Infura**: https://infura.io
- **Alchemy**: https://alchemy.com
- **Sepolia Etherscan**: https://sepolia.etherscan.io
- **MetaMask**: https://metamask.io

---

**You're all set! Run the deployment command and watch your contract go live! 🚀**
