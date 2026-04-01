# 🚀 Complete Setup Checklist

## Pre-Flight Check ✈️

Before starting, ensure you have:
- [ ] Node.js 18+ installed (`node --version`)
- [ ] Python 3.9+ installed (`python --version`)
- [ ] MetaMask browser extension installed
- [ ] Sepolia testnet ETH (get from faucet)
- [ ] Infura or Alchemy account (for RPC URL)
- [ ] Pinata account (for IPFS storage)

## 📋 Step-by-Step Setup

### Phase 1: Smart Contract Deployment

#### 1.1 Compile Contract
```bash
# Using Remix IDE (recommended for beginners)
1. Go to https://remix.ethereum.org
2. Create new file: ScholarshipSystem.sol
3. Paste contract code from contracts/ScholarshipSystem.sol
4. Click "Compile ScholarshipSystem.sol"
5. Ensure no errors

# OR using Hardhat (advanced)
npm install --save-dev hardhat
npx hardhat compile
```

#### 1.2 Deploy to Sepolia
```bash
# In Remix:
1. Go to "Deploy & Run Transactions" tab
2. Select "Injected Provider - MetaMask"
3. Ensure MetaMask is on Sepolia network
4. Click "Deploy"
5. Confirm transaction in MetaMask
6. Copy deployed contract address
```

#### 1.3 Verify Deployment
- [ ] Contract address copied
- [ ] Contract visible on Sepolia Etherscan
- [ ] Admin address is your wallet address

**Save these values:**
```
CONTRACT_ADDRESS=0x...
ADMIN_ADDRESS=0x...
ADMIN_PRIVATE_KEY=0x...
```

### Phase 2: Backend Setup

#### 2.1 Install Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

**Expected output:**
```
Successfully installed flask-3.0.0 web3-6.11.3 ...
```

#### 2.2 Create Environment File
```bash
cp .env.example .env
```

Edit `backend/.env`:
```env
SECRET_KEY=your-random-secret-key-here
DEBUG=True
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_INFURA_KEY
CONTRACT_ADDRESS=0x... # From step 1.2
ADMIN_PRIVATE_KEY=0x... # Your wallet private key
ADMIN_ADDRESS=0x... # Your wallet address
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key
PINATA_JWT=your-pinata-jwt-token
```

#### 2.3 Verify Contract ABI
- [x] File `backend/contract_abi.json` exists (already created)
- [ ] ABI matches deployed contract

#### 2.4 Test Backend Connection
```bash
python backend/app.py
```

**Expected output:**
```
 * Running on http://0.0.0.0:5000
 * Debug mode: on
```

#### 2.5 Test Health Endpoint
```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

### Phase 3: Frontend Setup

#### 3.1 Install Dependencies
```bash
cd frontend-react
npm install
```

**Expected output:**
```
added 1234 packages in 45s
```

#### 3.2 Create Environment File
```bash
cp .env.example .env
```

Edit `frontend-react/.env`:
```env
VITE_API_URL=http://localhost:5000
VITE_CONTRACT_ADDRESS=0x... # From step 1.2
VITE_NETWORK_ID=11155111
```

#### 3.3 Restart TypeScript Server
In VS Code:
1. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
2. Type: "TypeScript: Restart TS Server"
3. Press Enter

#### 3.4 Verify No Errors
```bash
npx tsc --noEmit
```

**Expected output:**
```
(no output = success)
```

#### 3.5 Start Development Server
```bash
npm run dev
```

**Expected output:**
```
VITE v5.0.8  ready in 1234 ms
➜  Local:   http://localhost:3000/
```

### Phase 4: Testing

#### 4.1 Test Frontend
- [ ] Open http://localhost:3000
- [ ] Landing page loads with "Ethereal Ledger" title
- [ ] Navigation works
- [ ] No console errors

#### 4.2 Test Wallet Connection
- [ ] Click "Connect Wallet" button
- [ ] MetaMask popup appears
- [ ] After connecting, wallet address shows in navbar
- [ ] Network is Sepolia (11155111)

#### 4.3 Test Application Submission
1. Navigate to Dashboard
2. Fill out scholarship application form:
   - Name: Test Student
   - Email: test@example.com
   - Family Income: 50000
   - Marks: 85
   - Requested Amount: 0.1 ETH
3. Click "Submit Application"
4. Confirm transaction in MetaMask
5. Wait for confirmation
6. Check that application appears in list

#### 4.4 Test Admin Functions
1. Navigate to Admin page
2. See pending applications
3. Click "Approve" on test application
4. Confirm transaction in MetaMask
5. Verify status changes to "Approved"

#### 4.5 Test Transparency Page
- [ ] Navigate to Transparency page
- [ ] See all applications listed
- [ ] Transaction hashes are clickable
- [ ] Links open Sepolia Etherscan

### Phase 5: Production Preparation

#### 5.1 Security Checklist
- [ ] Change SECRET_KEY to random value
- [ ] Never commit .env files to git
- [ ] Use HTTPS in production
- [ ] Add rate limiting (optional)
- [ ] Add input validation (validators.py provided)
- [ ] Review smart contract security

#### 5.2 Performance Optimization
- [ ] Build frontend for production: `npm run build`
- [ ] Test production build: `npm run preview`
- [ ] Optimize images and assets
- [ ] Enable caching

#### 5.3 Monitoring Setup
- [ ] Set up error logging
- [ ] Monitor gas prices
- [ ] Track contract events
- [ ] Set up alerts for failed transactions

## 🐛 Troubleshooting

### Issue: Backend won't start
**Error**: `FileNotFoundError: contract_abi.json`
**Solution**: File already created at `backend/contract_abi.json`

### Issue: "Cannot connect to Ethereum network"
**Solution**: 
1. Check SEPOLIA_RPC_URL in .env
2. Verify Infura/Alchemy API key is valid
3. Test RPC URL: `curl https://sepolia.infura.io/v3/YOUR_KEY`

### Issue: Frontend shows TypeScript errors
**Solution**:
1. Run `npm install` in frontend-react
2. Restart TypeScript server in VS Code
3. Close and reopen VS Code

### Issue: MetaMask not connecting
**Solution**:
1. Ensure MetaMask is on Sepolia network
2. Clear browser cache
3. Try different browser
4. Check console for errors

### Issue: Transaction fails with "insufficient funds"
**Solution**:
1. Get Sepolia ETH from faucet: https://sepoliafaucet.com
2. Ensure you have at least 0.1 ETH for gas
3. Check gas price settings

### Issue: IPFS upload fails
**Solution**:
1. Verify Pinata credentials in .env
2. Check Pinata dashboard for API limits
3. Test with smaller file first

## 📊 Verification Checklist

### Backend ✅
- [ ] Python dependencies installed
- [ ] .env file configured
- [ ] Backend starts without errors
- [ ] Health endpoint returns success
- [ ] Can connect to Sepolia
- [ ] Contract ABI loaded

### Frontend ✅
- [ ] npm dependencies installed
- [ ] .env file configured
- [ ] No TypeScript errors
- [ ] Dev server starts
- [ ] Page loads in browser
- [ ] No console errors

### Smart Contract ✅
- [ ] Deployed to Sepolia
- [ ] Contract address saved
- [ ] Verified on Etherscan (optional)
- [ ] Admin functions work
- [ ] Can receive ETH

### Integration ✅
- [ ] Frontend connects to backend
- [ ] Backend connects to blockchain
- [ ] MetaMask connects to frontend
- [ ] Can submit application
- [ ] Can approve application
- [ ] Can release funds
- [ ] Events are logged

## 🎉 Success Criteria

Your system is fully operational when:

1. ✅ Backend health check returns `blockchain_connected: true`
2. ✅ Frontend loads without errors
3. ✅ MetaMask connects successfully
4. ✅ Can submit scholarship application
5. ✅ Admin can approve/reject applications
6. ✅ Funds can be released to students
7. ✅ All transactions visible on Etherscan
8. ✅ Transparency page shows all applications

## 📞 Support

If you encounter issues:

1. Check `BUG_REPORT_AND_FIXES.md` for known issues
2. Review error messages in console/terminal
3. Check browser console for frontend errors
4. Check backend logs for API errors
5. Verify all environment variables are set
6. Ensure you're on Sepolia testnet

## 🚀 Quick Start Commands

```bash
# Terminal 1: Backend
cd backend
python app.py

# Terminal 2: Frontend
cd frontend-react
npm run dev

# Browser
# Open http://localhost:3000
# Connect MetaMask
# Start using the app!
```

## 📝 Notes

- Keep your private keys secure
- Never share your .env files
- Use testnet for development
- Test thoroughly before mainnet deployment
- Monitor gas prices
- Keep backups of important data

---

**Estimated Setup Time**: 30-45 minutes
**Difficulty**: Intermediate
**Prerequisites**: Basic blockchain knowledge, command line familiarity
