# ⚡ Deployment Quick Reference Card

## 🎯 Your Mission: Deploy Smart Contract in 15 Minutes

---

## 📋 Quick Steps

1. **Get Sepolia ETH** → https://www.alchemy.com/faucets/ethereum-sepolia
2. **Open Remix** → https://remix.ethereum.org
3. **Create file** → ScholarshipSystem.sol
4. **Copy contract** → From `contracts/ScholarshipSystem.sol`
5. **Compile** → Solidity 0.8.20
6. **Deploy** → Injected Provider (MetaMask)
7. **Copy address** → Save contract address
8. **Update .env files** → Add contract address
9. **Get Infura key** → https://infura.io
10. **Start backend** → `python backend/app.py`
11. **Test** → http://localhost:3000

---

## 🔑 What You Need to Save

```
CONTRACT_ADDRESS=0x...
ADMIN_ADDRESS=0x...
ADMIN_PRIVATE_KEY=0x...
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/...
```

---

## 📝 Update These Files

### backend/.env
```env
CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
ADMIN_ADDRESS=0xYOUR_WALLET_ADDRESS
ADMIN_PRIVATE_KEY=0xYOUR_PRIVATE_KEY
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
```

### frontend-react/.env
```env
VITE_CONTRACT_ADDRESS=0xYOUR_CONTRACT_ADDRESS
```

---

## 🚀 Start Commands

```bash
# Terminal 1 - Backend
cd backend
python app.py

# Terminal 2 - Frontend (already running)
# http://localhost:3000
```

---

## ✅ Verification

- [ ] Contract on Etherscan: https://sepolia.etherscan.io/address/YOUR_ADDRESS
- [ ] Backend health: http://localhost:5000/health
- [ ] Frontend: http://localhost:3000
- [ ] MetaMask connected
- [ ] Can submit application

---

## 🆘 Quick Fixes

**No Sepolia ETH?**
→ Use faucet: https://www.alchemy.com/faucets/ethereum-sepolia

**Compilation error?**
→ Check Solidity version is 0.8.20+

**Deployment failed?**
→ Make sure MetaMask is on Sepolia network

**Backend won't start?**
→ Check all .env values are filled

**Can't submit application?**
→ Verify contract address in both .env files

---

## 📞 Resources

- **Full Guide**: `DEPLOY_NOW.md`
- **Testing Guide**: `TESTING_GUIDE.md`
- **Troubleshooting**: `COMPLETE_AUDIT_REPORT.md`
- **Remix IDE**: https://remix.ethereum.org
- **Sepolia Faucet**: https://www.alchemy.com/faucets/ethereum-sepolia
- **Infura**: https://infura.io
- **Etherscan**: https://sepolia.etherscan.io

---

**Time Estimate**: 15 minutes
**Difficulty**: Easy
**Cost**: Free (testnet)

**Let's deploy! 🚀**
