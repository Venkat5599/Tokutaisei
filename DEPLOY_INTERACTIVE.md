# 🎯 Interactive Deployment - Let's Do This!

## Current Status: Ready to Deploy! 🚀

---

## ✅ Pre-Deployment Checklist

Before we start, let's verify you have everything:

### 1. MetaMask Setup
- [ ] MetaMask extension installed in browser
- [ ] MetaMask wallet created
- [ ] Switched to **Sepolia Test Network**

**How to switch to Sepolia:**
1. Open MetaMask
2. Click network dropdown at top
3. Enable "Show test networks" in settings if needed
4. Select "Sepolia test network"

### 2. Sepolia Test ETH
- [ ] Have at least 0.05 Sepolia ETH

**Don't have Sepolia ETH? Get it now (takes 2 minutes):**

**FASTEST METHOD - Alchemy Faucet:**
1. Open: https://www.alchemy.com/faucets/ethereum-sepolia
2. Sign in with email (free, instant)
3. Paste your MetaMask address
4. Click "Send Me ETH"
5. Wait 1-2 minutes
6. Check MetaMask - you should see 0.5 ETH

**Alternative - Infura Faucet:**
https://www.infura.io/faucet/sepolia

---

## 🚀 DEPLOYMENT STEPS - Follow Along

### STEP 1: Open Remix IDE

1. Open a new browser tab
2. Go to: **https://remix.ethereum.org**
3. Wait for it to load (10 seconds)

**You should see:**
- File explorer on the left
- Code editor in the middle
- Tabs at the top

---

### STEP 2: Create Contract File

1. Look at the left sidebar (File Explorer)
2. You'll see a folder icon and files
3. Click the **"+"** icon (Create New File)
4. Type: **ScholarshipSystem.sol**
5. Press Enter

**The file is now created and open in the editor!**

---

### STEP 3: Copy Contract Code

**I'll show you the contract to copy:**

The contract is in your project at: `contracts/ScholarshipSystem.sol`

**To copy it:**
1. Open `contracts/ScholarshipSystem.sol` in your code editor
2. Select ALL (Ctrl+A or Cmd+A)
3. Copy (Ctrl+C or Cmd+C)
4. Go back to Remix browser tab
5. Paste into the editor (Ctrl+V or Cmd+V)
6. Press Ctrl+S to save

**The file should start with:**
```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
```

---

### STEP 4: Compile the Contract

1. Look at the left sidebar icons
2. Click the **"Solidity Compiler"** icon (2nd icon, looks like "S")
3. You'll see compiler settings
4. Make sure compiler version is **0.8.20** or higher
5. Click the big blue button: **"Compile ScholarshipSystem.sol"**
6. Wait 5-10 seconds

**Success looks like:**
- Green checkmark ✅
- "Compilation successful" message
- No red errors

**If you see errors:**
- Make sure you copied the ENTIRE contract
- Check the first line is `// SPDX-License-Identifier: MIT`
- Try selecting compiler version 0.8.20 exactly

---

### STEP 5: Deploy to Sepolia

1. Click the **"Deploy & Run Transactions"** icon (3rd icon, looks like Ethereum logo)
2. You'll see deployment settings

**Configure these settings:**

**ENVIRONMENT:**
- Click the dropdown that says "Remix VM"
- Select: **"Injected Provider - MetaMask"**
- MetaMask popup will appear
- Click **"Connect"** in MetaMask
- Select your account
- Click **"Next"** then **"Connect"**

**ACCOUNT:**
- Should now show your wallet address
- Should show your Sepolia ETH balance

**CONTRACT:**
- Dropdown should show "ScholarshipSystem"
- If not, select it

---

### STEP 6: Click Deploy!

1. You'll see an orange **"Deploy"** button
2. Click it!
3. MetaMask popup appears
4. Review the transaction:
   - Network: Sepolia test network ✅
   - Gas fee: ~0.01-0.02 ETH ✅
5. Click **"Confirm"** in MetaMask
6. Wait 10-30 seconds...

**You'll see:**
- Transaction pending in MetaMask
- Remix console shows "pending..."
- Then: Green checkmark! ✅

---

### STEP 7: Get Your Contract Address

**This is the most important step!**

1. Look at the bottom of the left sidebar
2. You'll see **"Deployed Contracts"** section
3. Your contract is listed there
4. You'll see something like: `SCHOLARSHIPSYSTEM AT 0x742d...`
5. Click the **copy icon** next to the address
6. **PASTE IT SOMEWHERE SAFE!**

**Your contract address looks like:**
```
0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb
```

**SAVE THIS ADDRESS - YOU NEED IT!**

---

### STEP 8: Verify on Etherscan

Let's make sure it worked:

1. Go to: **https://sepolia.etherscan.io**
2. Paste your contract address in the search box
3. Press Enter

**You should see:**
- Contract creation transaction
- Your address as the creator
- Transaction status: Success ✅

**Copy this Etherscan link too - it's useful!**

---

### STEP 9: Get Your Wallet Info

We need 3 pieces of information from MetaMask:

**A. Your Wallet Address:**
1. Open MetaMask
2. Click on your account name at top
3. Click "Copy address"
4. Save it: `0xYOUR_WALLET_ADDRESS`

**B. Your Private Key (KEEP SECRET!):**
1. Open MetaMask
2. Click three dots (⋮) → "Account details"
3. Click "Show private key"
4. Enter your MetaMask password
5. Click to reveal
6. Copy it
7. Save it: `0xYOUR_PRIVATE_KEY`

**⚠️ NEVER share your private key with anyone!**

---

### STEP 10: Get Infura API Key

1. Go to: **https://infura.io**
2. Click "Sign Up" (free account)
3. Verify your email
4. Click "Create New Key"
5. Select "Web3 API"
6. Name: "Scholarship System"
7. Click "Create"
8. Click on your new key
9. Find the **Sepolia** endpoint
10. Copy the full URL

**It looks like:**
```
https://sepolia.infura.io/v3/abc123def456...
```

**Save this URL!**

---

### STEP 11: Update Backend .env File

Now let's configure the backend!

Open the file: `backend/.env`

Replace these values with YOUR values:

```env
SECRET_KEY=dev-secret-key-for-testing-only
DEBUG=True

# PASTE YOUR VALUES HERE:
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY_HERE
CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_FROM_STEP_7
ADMIN_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_FROM_STEP_9
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_FROM_STEP_9

# Optional (for IPFS document storage)
PINATA_API_KEY=
PINATA_SECRET_KEY=
PINATA_JWT=

DATABASE_PATH=scholarship.db
```

**Save the file!**

---

### STEP 12: Update Frontend .env File

Open the file: `frontend-react/.env`

Replace with YOUR contract address:

```env
VITE_API_URL=http://localhost:5000
VITE_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS_FROM_STEP_7
VITE_NETWORK_ID=11155111
```

**Save the file!**

---

### STEP 13: Deposit Test Funds (Optional but Recommended)

Let's add some ETH to the contract so you can test fund releases:

**In Remix:**
1. Under "Deployed Contracts", expand your contract
2. Find the "depositFunds" function (red button)
3. At the top, find the "VALUE" input field
4. Enter: **0.5**
5. Select "Ether" from the dropdown next to it
6. Click the red "depositFunds" button
7. Confirm in MetaMask

**Now your contract has 0.5 ETH to distribute to students!**

---

### STEP 14: Start the Backend

Open a terminal and run:

```bash
cd backend
python app.py
```

**You should see:**
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
WARNING: This is a development server.
```

**Leave this terminal running!**

---

### STEP 15: Test the Health Endpoint

Open a browser and go to:
```
http://localhost:5000/health
```

**You should see:**
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

**If you see this, YOU'RE DONE! 🎉**

---

### STEP 16: Test the Full Application

1. Go to: **http://localhost:3000**
2. Click "Connect Wallet"
3. Connect MetaMask
4. Go to "Dashboard"
5. Fill out the scholarship application form
6. Click "Submit Application"
7. Confirm in MetaMask
8. Wait for confirmation
9. Go to "Admin" page
10. See your application
11. Click "Approve"
12. Confirm in MetaMask
13. Click "Release Funds"
14. Confirm in MetaMask
15. Check MetaMask - you should receive the funds!

---

## 🎉 SUCCESS CHECKLIST

- [ ] Contract deployed on Sepolia
- [ ] Contract address saved
- [ ] Etherscan shows contract
- [ ] backend/.env updated
- [ ] frontend-react/.env updated
- [ ] Backend started successfully
- [ ] Health check returns "blockchain_connected": true
- [ ] Frontend connects to MetaMask
- [ ] Can submit application
- [ ] Can approve application
- [ ] Can release funds

---

## 📝 Your Deployment Info

**Fill this out as you go:**

```
Contract Address: _________________________________

Wallet Address: _________________________________

Infura RPC URL: _________________________________

Etherscan Link: https://sepolia.etherscan.io/address/___________

Deployment Date: _________________________________

Contract Balance: _________ ETH
```

---

## 🆘 Troubleshooting

**"Insufficient funds for gas"**
→ Get more Sepolia ETH from faucet

**"Contract not found"**
→ Double-check contract address in .env files

**"Cannot connect to blockchain"**
→ Verify Infura API key is correct

**Backend error: "FileNotFoundError: contract_abi.json"**
→ The file exists at `backend/contract_abi.json` - check the path

**"Transaction failed"**
→ Make sure you're on Sepolia network in MetaMask

---

## 🎯 What to Do After Deployment

1. **Test all features:**
   - Submit application
   - Approve application
   - Reject application
   - Release funds
   - View transparency ledger

2. **Check Etherscan:**
   - View all transactions
   - See contract interactions
   - Verify events

3. **Share your success:**
   - Take screenshots
   - Show the transparency ledger
   - Demonstrate the full flow

---

**You're doing great! Follow each step carefully and you'll have a working blockchain scholarship system in 15 minutes! 🚀**

**Need help? I'm here to assist with any step!**
