# Deployment Guide

Complete step-by-step guide to deploy the Blockchain Scholarship System on Ethereum Sepolia testnet.

## Prerequisites

1. **Node.js & Python**
   - Node.js 16+ (for frontend dependencies)
   - Python 3.9+ (for backend)

2. **MetaMask Wallet**
   - Install MetaMask browser extension
   - Create/import wallet
   - Switch to Sepolia testnet

3. **Get Sepolia ETH**
   - Visit faucets:
     - https://sepoliafaucet.com/
     - https://www.infura.io/faucet/sepolia
   - Request test ETH (minimum 0.1 ETH recommended)

4. **Infura Account**
   - Sign up at https://infura.io/
   - Create new project
   - Copy Sepolia RPC URL

5. **Pinata Account (for IPFS)**
   - Sign up at https://pinata.cloud/
   - Get API keys from account settings

## Step 1: Clone and Setup

```bash
# Navigate to project directory
cd blockchain-scholarship-system

# Install Python dependencies
cd backend
pip install -r requirements.txt

# Install Solidity compiler
pip install py-solc-x
```

## Step 2: Configure Environment

Create `backend/.env` file:

```env
# Flask
SECRET_KEY=your-random-secret-key-here
DEBUG=True

# Ethereum Sepolia
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_PROJECT_ID
ADMIN_PRIVATE_KEY=0xYOUR_PRIVATE_KEY_HERE
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS_HERE

# IPFS Pinata
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key
PINATA_JWT=your-pinata-jwt-token

# Database
DATABASE_PATH=scholarship.db
```

**SECURITY WARNING**: Never commit `.env` file or share private keys!

## Step 3: Deploy Smart Contract

```bash
cd scripts
python deploy.py
```

Expected output:
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

## Step 4: Start Backend Server

```bash
cd backend
python app.py
```

Server starts on `http://localhost:5000`

Test health endpoint:
```bash
curl http://localhost:5000/health
```

## Step 5: Configure Frontend

Update `frontend/app.js`:

```javascript
const API_BASE_URL = 'http://localhost:5000/api';
const CONTRACT_ADDRESS = '0xYOUR_DEPLOYED_CONTRACT_ADDRESS';
```

Load contract ABI:
```javascript
// Copy content from backend/contract_abi.json
const CONTRACT_ABI = [ /* paste ABI here */ ];
```

## Step 6: Run Frontend

Open `frontend/index.html` in browser or use a local server:

```bash
# Using Python
cd frontend
python -m http.server 8000

# Or using Node.js
npx http-server -p 8000
```

Access at `http://localhost:8000`

## Step 7: Initial Setup

1. **Connect MetaMask**
   - Click "Connect MetaMask"
   - Approve connection
   - Ensure you're on Sepolia testnet

2. **Deposit Funds (Admin)**
   - Go to Admin Panel
   - Enter amount (e.g., 0.5 ETH)
   - Click "Deposit"
   - Confirm transaction in MetaMask

3. **Test Application Flow**
   - Switch to "Apply" tab
   - Fill application form
   - Submit (confirm in MetaMask)
   - Check "Applications" tab
   - Admin can approve/reject from Admin Panel

## API Endpoints

### Public Endpoints

```bash
# Get all applications
GET /api/applications

# Get specific application
GET /api/applications/{id}

# Get student's applications
GET /api/student/{address}/applications

# Submit application
POST /api/apply
{
  "studentAddress": "0x...",
  "name": "John Doe",
  "email": "john@example.com",
  "familyIncome": 25000,
  "marks": 85,
  "requestedAmount": 0.1,
  "privateKey": "0x...",
  "ipfsDocumentHash": "Qm..."
}
```

### Admin Endpoints

```bash
# Approve application
POST /api/approve
{
  "applicationId": 0
}

# Reject application
POST /api/reject
{
  "applicationId": 0,
  "reason": "Insufficient documentation"
}

# Release funds
POST /api/release-funds
{
  "applicationId": 0
}

# Deposit funds
POST /api/deposit
{
  "amount": 1.0
}

# Get contract balance
GET /api/contract/balance
```

## Testing with cURL

```bash
# Check contract balance
curl http://localhost:5000/api/contract/balance

# Get all applications
curl http://localhost:5000/api/applications

# Submit application (replace with actual values)
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentAddress": "0xYourAddress",
    "name": "Test Student",
    "email": "test@example.com",
    "familyIncome": 30000,
    "marks": 90,
    "requestedAmount": 0.05,
    "privateKey": "0xYourPrivateKey",
    "ipfsDocumentHash": ""
  }'
```

## Troubleshooting

### Contract Deployment Fails
- Check Sepolia ETH balance
- Verify Infura RPC URL
- Ensure private key is correct

### Transaction Fails
- Insufficient gas
- Contract balance too low
- Already have active application
- Not admin (for admin functions)

### MetaMask Issues
- Clear activity data
- Switch networks back and forth
- Reimport account

### IPFS Upload Fails
- Verify Pinata credentials
- Check file size limits
- Ensure internet connection

## Security Best Practices

1. **Never expose private keys**
2. **Use environment variables**
3. **Enable CORS only for trusted domains**
4. **Implement rate limiting**
5. **Add authentication for admin endpoints**
6. **Regular security audits**

## Production Deployment

For mainnet deployment:

1. Change network to Ethereum mainnet
2. Update chain ID to 1
3. Use production RPC provider
4. Implement proper authentication
5. Add monitoring and logging
6. Set up SSL/TLS
7. Use hardware wallet for admin
8. Conduct security audit

## Monitoring

View transactions on Etherscan:
```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

Monitor events:
- ApplicationSubmitted
- ApplicationReviewed
- FundsReleased
- FundsDeposited

## Support

For issues:
1. Check logs in terminal
2. Verify network connection
3. Check MetaMask console
4. Review transaction on Etherscan
