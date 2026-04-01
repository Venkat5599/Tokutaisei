# 🚀 Hardhat Deployment - Quick Start

## ✅ Hardhat is Ready!

Everything is set up. You just need to configure your credentials and deploy.

---

## 📝 Step 1: Configure .env File (2 minutes)

Edit the `.env` file in the root directory and add your credentials:

```env
# Get from https://infura.io or https://alchemy.com
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY_HERE

# From MetaMask: Account Details → Show Private Key
# Must start with 0x and be 66 characters long
ADMIN_PRIVATE_KEY=0xYOUR_64_CHARACTER_PRIVATE_KEY_HERE

# From MetaMask: Copy Address
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE
```

### How to Get These Values:

#### A. Infura API Key
1. Go to: https://infura.io
2. Sign up (free)
3. Create new API key
4. Select "Web3 API"
5. Copy the Sepolia endpoint URL

#### B. MetaMask Private Key
1. Open MetaMask
2. Click three dots (⋮) → "Account details"
3. Click "Show private key"
4. Enter your password
5. Copy the private key (starts with 0x)

#### C. Wallet Address
1. Open MetaMask
2. Click on your account name
3. Click "Copy address"

---

## 🪙 Step 2: Get Sepolia Test ETH (2 minutes)

You need at least 0.05 ETH for deployment.

**Get free Sepolia ETH:**
1. Go to: https://www.alchemy.com/faucets/ethereum-sepolia
2. Sign in (free account)
3. Paste your wallet address
4. Click "Send Me ETH"
5. Wait 1-2 minutes

**Verify in MetaMask:**
- Switch to "Sepolia test network"
- Check balance shows > 0.05 ETH

---

## 🚀 Step 3: Deploy Contract (1 minute)

Run the deployment command:

```bash
npm run deploy
```

Or:

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

**What happens:**
1. Connects to Sepolia
2. Deploys your contract
3. Waits for confirmations
4. Saves deployment info
5. Updates `.env` files automatically

**Expected output:**
```
🚀 Starting deployment to Sepolia testnet...

📝 Deploying contracts with account: 0x742d35Cc...
💰 Account balance: 0.5 ETH

📦 Deploying ScholarshipSystem contract...
✅ ScholarshipSystem deployed to: 0xABCD1234...
🔗 View on Etherscan: https://sepolia.etherscan.io/address/0xABCD1234...

⏳ Waiting for block confirmations...
✅ Contract confirmed!

💾 Deployment info saved to: deployment-info.json

📝 Updating configuration files...
✅ Updated: backend/.env
✅ Updated: frontend-react/.env

======================================================================
🎉 DEPLOYMENT SUCCESSFUL!
======================================================================

Contract Address: 0xABCD1234...
Admin Address: 0x742d35Cc...
Etherscan: https://sepolia.etherscan.io/address/0xABCD1234...
```

---

## 💰 Step 4: Deposit Test Funds (1 minute)

Deposit ETH to the contract for testing:

```bash
npm run deposit
```

This deposits 0.5 ETH to your contract so you can test releasing funds to students.

---

## 🎯 Step 5: Start Backend (1 minute)

```bash
cd backend
python app.py
```

**Test it:**
Open: http://localhost:5000/health

Should see:
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

---

## 🎨 Step 6: Test the Application (5 minutes)

1. Open: http://localhost:3000
2. Click "Connect Wallet"
3. Connect MetaMask
4. Go to "Dashboard"
5. Fill out scholarship application
6. Submit!
7. Go to "Admin" page
8. Approve the application
9. Release funds
10. Check MetaMask - you received the funds!

---

## ✅ Success Checklist

- [ ] `.env` file configured with all 3 values
- [ ] Have at least 0.05 Sepolia ETH
- [ ] Ran `npm run deploy`
- [ ] Contract deployed successfully
- [ ] Contract address saved
- [ ] Ran `npm run deposit`
- [ ] Backend started
- [ ] Health check passes
- [ ] Frontend connects to MetaMask
- [ ] Can submit application
- [ ] Can approve application
- [ ] Can release funds

---

## 🆘 Troubleshooting

### "private key too short"
**Fix:** Make sure your private key in `.env`:
- Starts with `0x`
- Is 66 characters long (0x + 64 hex characters)
- Has no spaces or quotes

### "Insufficient funds"
**Fix:** Get more Sepolia ETH from faucet

### "Invalid API Key"
**Fix:** Check your Infura URL in `.env` is correct

### "Network sepolia not found"
**Fix:** Make sure `hardhat.config.js` exists

### "Cannot connect to blockchain"
**Fix:** Verify all values in `.env` are correct

---

## 📋 Quick Commands

```bash
# Compile contract
npm run compile

# Deploy to Sepolia
npm run deploy

# Deposit funds
npm run deposit

# Start backend
cd backend && python app.py

# Open frontend
# http://localhost:3000
```

---

## 📁 Files to Check

After deployment:
- `deployment-info.json` - Contract details
- `backend/.env` - Should have contract address
- `frontend-react/.env` - Should have contract address
- `artifacts/` - Compiled contract files

---

## 🎉 You're Ready!

Once you complete these 6 steps, your blockchain scholarship system will be fully operational!

**Total time**: ~10 minutes
**Cost**: Free (testnet)
**Difficulty**: Easy

**Let's deploy! 🚀**
