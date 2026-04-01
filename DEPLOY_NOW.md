# 🚀 DEPLOY SMART CONTRACT NOW - Step by Step

## ⚡ Quick Deployment (15 minutes)

Follow these exact steps to deploy your contract to Sepolia testnet.

---

## STEP 1: Get Sepolia Test ETH (5 min)

### Check Your Current Balance
1. Open MetaMask
2. Click network dropdown (top)
3. Select "Sepolia test network"
4. Check your balance

### If Balance is 0, Get Free ETH:

**Option A: Alchemy Faucet** (Fastest)
```
https://www.alchemy.com/faucets/ethereum-sepolia
```
1. Visit the link above
2. Sign in (free account)
3. Paste your wallet address
4. Click "Send Me ETH"
5. Wait 1-2 minutes

**Option B: Infura Faucet**
```
https://www.infura.io/faucet/sepolia
```

**Option C: Google "Sepolia faucet"** and use any available faucet

### Verify
- MetaMask should show > 0.05 ETH on Sepolia network

---

## STEP 2: Open Remix IDE (1 min)

1. Go to: **https://remix.ethereum.org**
2. Wait for the IDE to load
3. You'll see a file explorer on the left

---

## STEP 3: Create Contract File (2 min)

1. In the left sidebar, look for "File Explorer" icon
2. Click the "+" icon (Create New File)
3. Name it: **ScholarshipSystem.sol**
4. Press Enter

---

## STEP 4: Paste Contract Code (1 min)

1. The file should now be open in the editor
2. **Copy the ENTIRE contract** from `contracts/ScholarshipSystem.sol`
3. Paste it into Remix
4. Press Ctrl+S to save

**Contract is in your project at**: `contracts/ScholarshipSystem.sol`

---

## STEP 5: Compile Contract (1 min)

1. Click the **"Solidity Compiler"** icon (left sidebar, 2nd icon)
2. Select compiler version: **0.8.20** or higher
3. Click **"Compile ScholarshipSystem.sol"** button
4. Wait for green checkmark ✅

**Expected**: Green checkmark with "Compilation successful"

**If errors**: Make sure you copied the entire contract including the first line `// SPDX-License-Identifier: MIT`

---

## STEP 6: Deploy to Sepolia (3 min)

### 6.1 Open Deploy Tab
1. Click **"Deploy & Run Transactions"** icon (left sidebar, 3rd icon)

### 6.2 Configure Deployment
1. **Environment**: Select **"Injected Provider - MetaMask"**
2. MetaMask popup will appear → Click **"Connect"**
3. **Account**: Your wallet address should appear
4. **Contract**: Select **"ScholarshipSystem"** from dropdown

### 6.3 Deploy
1. Click the orange **"Deploy"** button
2. MetaMask popup appears
3. Review the transaction:
   - Network: Sepolia test network
   - Gas fee: ~0.01-0.02 ETH
4. Click **"Confirm"** in MetaMask
5. Wait 10-30 seconds for confirmation

### 6.4 Verify Deployment
- Look for green checkmark in Remix console
- You'll see "Deployed Contracts" section appear
- Contract address will be shown

---

## STEP 7: Copy Important Information (2 min)

### 7.1 Contract Address
1. In "Deployed Contracts" section, you'll see your contract
2. Click the copy icon next to the contract address
3. **SAVE THIS ADDRESS** - you'll need it!

Example: `0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb`

### 7.2 Your Wallet Address
1. Open MetaMask
2. Click on your account name
3. Click "Copy address"
4. **SAVE THIS ADDRESS**

### 7.3 Your Private Key (CAREFUL!)
1. Open MetaMask
2. Click three dots → Account details
3. Click "Show private key"
4. Enter your password
5. Click to reveal and copy
6. **SAVE THIS** (keep it secret!)

---

## STEP 8: Update Environment Files (2 min)

### 8.1 Update Backend .env

Open `backend/.env` and update these lines:

```env
# Replace with your values
CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_FROM_STEP_7
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_FROM_STEP_7
ADMIN_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_FROM_STEP_7

# Get Infura key from https://infura.io (free)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
```

### 8.2 Update Frontend .env

Open `frontend-react/.env` and update:

```env
VITE_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_FROM_STEP_7
```

---

## STEP 9: Get Infura API Key (3 min)

### 9.1 Sign Up
1. Go to: **https://infura.io**
2. Click "Sign Up" (free account)
3. Verify your email

### 9.2 Create API Key
1. Click "Create New Key"
2. Select "Web3 API"
3. Name it: "Scholarship System"
4. Click "Create"

### 9.3 Copy RPC URL
1. Click on your new API key
2. Find "Sepolia" endpoint
3. Copy the full URL (looks like: `https://sepolia.infura.io/v3/abc123...`)
4. Paste into `backend/.env` as `SEPOLIA_RPC_URL`

---

## STEP 10: Deposit Test Funds to Contract (Optional, 2 min)

To test fund release, deposit some ETH to the contract:

1. In Remix, under "Deployed Contracts"
2. Find "depositFunds" function
3. Enter value: **0.5** (in the "VALUE" field above)
4. Select "Ether" from dropdown
5. Click "depositFunds" button
6. Confirm in MetaMask

Now your contract has 0.5 ETH to distribute!

---

## STEP 11: Verify on Etherscan (1 min)

1. Go to: **https://sepolia.etherscan.io**
2. Paste your contract address in search
3. You should see:
   - Contract creation transaction
   - Your deposit transaction (if you did step 10)
   - Contract balance

---

## STEP 12: Start Backend (1 min)

```bash
cd backend
python app.py
```

**Expected output**:
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

---

## STEP 13: Test Everything! (5 min)

### 13.1 Check Backend Health
Open browser: **http://localhost:5000/health**

Should see:
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

### 13.2 Test Frontend
Open: **http://localhost:3000**

1. Connect MetaMask
2. Go to Dashboard
3. Fill out scholarship application
4. Submit!

---

## ✅ Success Checklist

- [ ] Got Sepolia ETH
- [ ] Deployed contract on Remix
- [ ] Copied contract address
- [ ] Updated backend/.env
- [ ] Updated frontend-react/.env
- [ ] Got Infura API key
- [ ] Deposited test funds to contract
- [ ] Started backend server
- [ ] Backend health check passes
- [ ] Frontend connects to MetaMask
- [ ] Can submit application

---

## 🎉 You're Done!

Your blockchain scholarship system is now fully deployed and operational!

### What You Can Do Now:
- ✅ Submit scholarship applications
- ✅ Approve/reject applications (as admin)
- ✅ Release funds to students
- ✅ View all transactions on Etherscan
- ✅ Track everything on blockchain

---

## 🆘 Troubleshooting

### "Insufficient funds" error
- Get more Sepolia ETH from faucet

### "Contract not deployed"
- Check contract address in .env files
- Make sure you copied the full address

### "Cannot connect to blockchain"
- Check Infura API key is correct
- Make sure you're using Sepolia endpoint

### Backend won't start
- Check all .env values are filled in
- Make sure contract_abi.json exists

### MetaMask not connecting
- Make sure you're on Sepolia network
- Try refreshing the page

---

## 📝 Save These Values

**Contract Address**: _________________

**Your Wallet Address**: _________________

**Infura RPC URL**: _________________

**Deployment Date**: _________________

**Etherscan Link**: https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS

---

**Need help?** Check `TESTING_GUIDE.md` for detailed testing instructions.
