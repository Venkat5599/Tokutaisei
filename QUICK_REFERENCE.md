# Quick Reference Card

## 🚀 Quick Start Commands

```bash
# Setup
./scripts/setup.sh

# Deploy Contract
cd scripts && python deploy.py

# Start Backend
cd backend && python app.py

# Start Frontend
cd frontend && python -m http.server 8000
```

## 📁 Key Files

| File | Purpose |
|------|---------|
| `contracts/ScholarshipSystem.sol` | Smart contract |
| `backend/app.py` | API server |
| `backend/blockchain.py` | Web3 integration |
| `frontend/index.html` | Web interface |
| `scripts/deploy.py` | Deployment script |
| `backend/.env` | Configuration |

## 🔑 Environment Variables

```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
CONTRACT_ADDRESS=0x...
ADMIN_PRIVATE_KEY=0x...
ADMIN_ADDRESS=0x...
PINATA_JWT=your-jwt-token
```

## 🌐 API Endpoints

```bash
# Public
POST /api/apply                    # Submit application
GET  /api/applications             # Get all applications
GET  /api/applications/:id         # Get specific application

# Admin
POST /api/approve                  # Approve application
POST /api/reject                   # Reject application
POST /api/release-funds            # Release funds
POST /api/deposit                  # Deposit funds
GET  /api/contract/balance         # Get balance
```

## 💰 Gas Costs

| Operation | Gas | Cost @ 50 Gwei |
|-----------|-----|----------------|
| Deploy | 2.5M | ~0.125 ETH |
| Apply | 150K | ~0.0075 ETH |
| Approve | 50K | ~0.0025 ETH |
| Release | 80K | ~0.004 ETH |

## 🔐 Smart Contract Functions

```solidity
// Student
applyForScholarship(name, email, income, marks, ipfsHash, amount)
getApplication(applicationId)
getStudentApplications(studentAddress)

// Admin
approveScholarship(applicationId)
rejectScholarship(applicationId, reason)
releaseFunds(applicationId)
depositFunds() payable
getContractBalance()
```

## 📊 Application Status

| Status | Description |
|--------|-------------|
| Pending | Awaiting review |
| Approved | Approved by admin |
| Rejected | Rejected by admin |
| FundsReleased | Funds transferred |

## 🛠️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Connection failed | Check RPC URL |
| Insufficient funds | Get Sepolia ETH |
| Transaction failed | Check gas settings |
| MetaMask not detected | Install extension |

## 🔗 Important Links

- **Sepolia Faucet**: https://sepoliafaucet.com/
- **Infura**: https://infura.io/
- **Pinata**: https://pinata.cloud/
- **Etherscan**: https://sepolia.etherscan.io/

## 📚 Documentation

| Document | Purpose |
|----------|---------|
| `README.md` | Project overview |
| `GETTING_STARTED.md` | Setup guide |
| `docs/DEPLOYMENT.md` | Deployment steps |
| `docs/API_REFERENCE.md` | API docs |
| `docs/SECURITY.md` | Security guide |
| `SUMMARY.md` | Complete summary |

## 🧪 Testing

```bash
# Run tests
cd tests
pytest test_contract.py -v

# Test API
curl http://localhost:5000/health

# Test application
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{"studentAddress":"0x...","name":"Test",...}'
```

## 📦 Dependencies

```bash
# Python
flask==3.0.0
web3==6.11.3
python-dotenv==1.0.0

# JavaScript
Web3.js 1.8.0 (CDN)
```

## 🎯 Workflow

```
1. Student applies → 2. Admin reviews → 3. Admin approves/rejects
→ 4. If approved, admin releases funds → 5. Student receives ETH
```

## ⚡ Performance

- Application submission: ~15 seconds
- Approval/Rejection: ~10 seconds
- Fund release: ~12 seconds
- Document upload: ~5 seconds

## 🔒 Security Checklist

- [ ] Private keys in .env (not committed)
- [ ] CORS configured for production
- [ ] Input validation enabled
- [ ] MetaMask signature verification
- [ ] Network validation (Sepolia)
- [ ] Gas limits set appropriately

## 📱 Frontend Tabs

1. **Apply** - Submit scholarship application
2. **Applications** - View all applications
3. **Admin Panel** - Approve/reject/release funds

## 🎨 Status Colors

- 🟡 Pending - Yellow
- 🟢 Approved - Green
- 🔴 Rejected - Red
- 🔵 FundsReleased - Blue

## 💡 Tips

1. Always test on Sepolia first
2. Keep transaction hashes
3. Monitor gas prices
4. Backup private keys securely
5. Use test accounts for development

## 🆘 Emergency Commands

```bash
# Check contract on Etherscan
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS

# Check wallet balance
curl -X POST https://sepolia.infura.io/v3/YOUR_KEY \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0xYOUR_ADDRESS","latest"],"id":1}'

# Restart backend
pkill -f "python app.py"
cd backend && python app.py
```

## 📞 Support

- Documentation: `docs/` folder
- Issues: GitHub Issues
- Email: support@yourdomain.com

---

**Keep this card handy for quick reference!** 🚀
