# Getting Started with Blockchain Scholarship System

This guide will help you get the system up and running in under 30 minutes.

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- [ ] Python 3.9 or higher installed
- [ ] MetaMask browser extension installed
- [ ] Infura or Alchemy account created
- [ ] Pinata account created (for IPFS)
- [ ] Basic understanding of Ethereum and smart contracts

## 🎯 Step-by-Step Setup

### Step 1: Get Testnet ETH (5 minutes)

1. Install MetaMask from https://metamask.io/
2. Create a new wallet or import existing one
3. Switch to Sepolia testnet:
   - Click network dropdown
   - Select "Show test networks"
   - Choose "Sepolia"
4. Get free testnet ETH:
   - Visit https://sepoliafaucet.com/
   - Or https://www.infura.io/faucet/sepolia
   - Enter your wallet address
   - Wait for ETH to arrive (usually 1-2 minutes)

### Step 2: Get API Keys (10 minutes)

#### Infura Setup
1. Go to https://infura.io/
2. Sign up for free account
3. Create new project
4. Copy the Sepolia RPC URL:
   ```
   https://sepolia.infura.io/v3/YOUR_PROJECT_ID
   ```

#### Pinata Setup
1. Go to https://pinata.cloud/
2. Sign up for free account
3. Go to API Keys section
4. Create new key with admin permissions
5. Save:
   - API Key
   - API Secret
   - JWT Token

### Step 3: Clone and Install (5 minutes)

```bash
# Clone the repository
git clone <repository-url>
cd blockchain-scholarship-system

# Make setup script executable
chmod +x scripts/setup.sh

# Run automated setup
./scripts/setup.sh
```

The setup script will:
- Create Python virtual environment
- Install all dependencies
- Install Solidity compiler
- Create .env template

### Step 4: Configure Environment (3 minutes)

Edit `backend/.env`:

```bash
cd backend
nano .env  # or use your preferred editor
```

Fill in these values:

```env
# Generate a random secret key
SECRET_KEY=your-random-secret-key-here-make-it-long-and-random

# From Infura
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID

# From MetaMask (Account Details > Export Private Key)
ADMIN_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE

# From Pinata
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key
PINATA_JWT=your-pinata-jwt-token

# Leave as is
DEBUG=True
DATABASE_PATH=scholarship.db
```

**⚠️ SECURITY WARNING**: Never commit the .env file or share your private keys!

### Step 5: Deploy Smart Contract (5 minutes)

```bash
cd scripts
python deploy.py
```

You should see output like:

```
Installing Solidity compiler...
Reading contract source...
Compiling contract...
Connecting to Sepolia...
Connected! Chain ID: 11155111
Deployer address: 0x...
Deployer balance: 0.5 ETH
Building deployment transaction...
Signing transaction...
Sending transaction...
Transaction hash: 0x...
Waiting for confirmation...

============================================================
Contract deployed successfully!
Contract address: 0x1234567890abcdef...
Block number: 4567890
Gas used: 2456789
============================================================

View on Etherscan: https://sepolia.etherscan.io/address/0x...
```

The script automatically:
- Compiles the Solidity contract
- Deploys to Sepolia testnet
- Saves ABI to `backend/contract_abi.json`
- Updates `backend/.env` with contract address

### Step 6: Start Backend Server (1 minute)

```bash
cd ../backend
python app.py
```

You should see:

```
 * Running on http://127.0.0.1:5000
 * Debug mode: on
```

Test the server:

```bash
# In a new terminal
curl http://localhost:5000/health
```

Expected response:
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

### Step 7: Configure Frontend (2 minutes)

Edit `frontend/app.js`:

```javascript
// Line 2-3: Update these values
const API_BASE_URL = 'http://localhost:5000/api';
const CONTRACT_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS';  // From deploy.py output
```

Load the contract ABI:

```javascript
// Copy content from backend/contract_abi.json
// Paste into the CONTRACT_ABI array on line 9
const CONTRACT_ABI = [ /* paste ABI here */ ];
```

### Step 8: Open Frontend (1 minute)

Option 1: Direct file access
```bash
# Simply open in browser
open frontend/index.html  # macOS
xdg-open frontend/index.html  # Linux
start frontend/index.html  # Windows
```

Option 2: Local server (recommended)
```bash
cd frontend
python -m http.server 8000
# Open http://localhost:8000 in browser
```

### Step 9: Connect MetaMask (1 minute)

1. Click "Connect MetaMask" button
2. Approve connection in MetaMask popup
3. Ensure you're on Sepolia testnet
4. Your address and balance should appear

### Step 10: Test the System (5 minutes)

#### As Admin: Deposit Funds

1. Go to "Admin Panel" tab
2. Enter amount (e.g., 1.0 ETH)
3. Click "Deposit"
4. Confirm transaction in MetaMask
5. Wait for confirmation
6. Contract balance should update

#### As Student: Submit Application

1. Go to "Apply" tab
2. Fill in the form:
   - Name: John Doe
   - Email: john@example.com
   - Family Income: 25000
   - Marks: 85
   - Requested Amount: 0.1
3. Optionally upload a document
4. Click "Submit Application"
5. Confirm transaction in MetaMask
6. Wait for confirmation

#### As Admin: Review Application

1. Go to "Admin Panel" tab
2. See pending application
3. Click "Approve" or "Reject"
4. Confirm transaction in MetaMask
5. If approved, click "Release Funds"
6. Confirm transaction in MetaMask

#### Verify on Blockchain

1. Go to "Applications" tab
2. See all applications with status
3. Click Etherscan link to view on blockchain
4. Verify transaction details

## 🎉 Success!

You now have a fully functional blockchain scholarship system!

## 📚 Next Steps

### Learn More
- Read [ARCHITECTURE.md](docs/ARCHITECTURE.md) to understand the system
- Check [API_REFERENCE.md](docs/API_REFERENCE.md) for API details
- Review [SECURITY.md](docs/SECURITY.md) for best practices

### Customize
- Modify smart contract for your needs
- Add custom validation rules
- Implement additional features
- Style the frontend

### Deploy to Production
- Get security audit
- Deploy to Ethereum mainnet
- Set up proper hosting
- Implement monitoring

## 🐛 Troubleshooting

### "Failed to connect to Ethereum network"
**Solution**: Check your SEPOLIA_RPC_URL in .env file

### "Insufficient funds for gas"
**Solution**: Get more Sepolia ETH from faucets

### "Transaction failed"
**Solution**: 
- Check gas settings
- Verify contract address
- Ensure you're on Sepolia network

### "MetaMask not detected"
**Solution**: 
- Install MetaMask extension
- Refresh the page
- Check browser compatibility

### "Contract deployment failed"
**Solution**:
- Verify you have enough Sepolia ETH (at least 0.1 ETH)
- Check Infura API key is valid
- Ensure private key is correct

### "IPFS upload failed"
**Solution**:
- Verify Pinata credentials
- Check file size (max 10MB)
- Ensure internet connection

## 💡 Tips

1. **Save Transaction Hashes**: Keep a record of important transactions
2. **Monitor Gas Prices**: Use https://sepolia.etherscan.io/gastracker
3. **Test Thoroughly**: Try all scenarios before production
4. **Backup Keys**: Store private keys securely
5. **Use Test Accounts**: Never use mainnet keys for testing

## 📞 Getting Help

If you're stuck:

1. Check the [docs/](docs/) folder for detailed guides
2. Review [SAMPLE_REQUESTS.md](docs/SAMPLE_REQUESTS.md) for API examples
3. Look at browser console for errors
4. Check backend logs for issues
5. Verify transactions on Etherscan

## 🚀 Quick Commands Reference

```bash
# Start backend
cd backend && python app.py

# Deploy contract
cd scripts && python deploy.py

# Run tests
cd tests && pytest test_contract.py

# Start frontend server
cd frontend && python -m http.server 8000

# Check contract on Etherscan
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Backend server running without errors
- [ ] Frontend loads in browser
- [ ] MetaMask connects successfully
- [ ] Can submit application
- [ ] Can view applications
- [ ] Admin can approve/reject
- [ ] Funds can be released
- [ ] Transactions visible on Etherscan

## 🎓 Understanding the Flow

```
1. Student submits application
   ↓
2. Application stored on blockchain
   ↓
3. Admin reviews application
   ↓
4. Admin approves/rejects
   ↓
5. If approved, admin releases funds
   ↓
6. ETH transferred to student wallet
   ↓
7. All steps recorded on blockchain
```

## 🌟 You're Ready!

Congratulations! You've successfully set up a blockchain-based scholarship system. This is a production-ready foundation that you can customize and extend for your specific needs.

Happy coding! 🚀
