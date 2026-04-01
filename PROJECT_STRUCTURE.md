# Project Structure

Complete overview of the Blockchain-Based Transparent Scholarship System.

```
blockchain-scholarship-system/
│
├── README.md                          # Project overview and quick start
├── PROJECT_STRUCTURE.md               # This file - complete project layout
├── .gitignore                         # Git ignore rules
│
├── contracts/                         # Smart Contracts
│   └── ScholarshipSystem.sol         # Main scholarship contract (Solidity)
│
├── backend/                           # Python Flask Backend
│   ├── app.py                        # Main Flask application & API routes
│   ├── blockchain.py                 # Web3.py blockchain interaction service
│   ├── ipfs_service.py              # IPFS/Pinata integration
│   ├── config.py                     # Configuration management
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                  # Environment variables template
│   ├── .env                          # Actual environment variables (gitignored)
│   └── contract_abi.json             # Contract ABI (generated after deployment)
│
├── frontend/                          # Web Interface
│   ├── index.html                    # Main HTML page
│   ├── styles.css                    # Styling
│   └── app.js                        # JavaScript logic & Web3 integration
│
├── scripts/                           # Utility Scripts
│   ├── deploy.py                     # Smart contract deployment script
│   └── setup.sh                      # Automated setup script
│
├── tests/                             # Test Suite
│   └── test_contract.py              # Smart contract unit tests
│
└── docs/                              # Documentation
    ├── DEPLOYMENT.md                 # Deployment guide
    ├── ARCHITECTURE.md               # System architecture
    ├── API_REFERENCE.md              # API documentation
    └── SECURITY.md                   # Security guidelines
```

## Component Details

### Smart Contracts (`contracts/`)

**ScholarshipSystem.sol**
- Language: Solidity 0.8.20
- Purpose: Core business logic on blockchain
- Features:
  - Application submission and storage
  - Admin approval/rejection workflow
  - Fund management and distribution
  - Event emission for transparency
  - Access control and validation

Key Functions:
- `applyForScholarship()` - Submit application
- `approveScholarship()` - Approve application (admin)
- `rejectScholarship()` - Reject application (admin)
- `releaseFunds()` - Transfer funds to student (admin)
- `depositFunds()` - Add funds to contract
- `getApplication()` - Retrieve application details

### Backend (`backend/`)

**app.py** (Main API Server)
- Framework: Flask
- Purpose: RESTful API for frontend-blockchain interaction
- Endpoints:
  - `/health` - Health check
  - `/api/apply` - Submit application
  - `/api/applications` - Get all applications
  - `/api/applications/:id` - Get specific application
  - `/api/student/:address/applications` - Get student applications
  - `/api/approve` - Approve application
  - `/api/reject` - Reject application
  - `/api/release-funds` - Release funds
  - `/api/contract/balance` - Get contract balance
  - `/api/deposit` - Deposit funds
  - `/api/upload-document` - Upload to IPFS

**blockchain.py** (Blockchain Service)
- Library: Web3.py
- Purpose: Ethereum interaction layer
- Features:
  - Contract function calls
  - Transaction building and signing
  - Event listening
  - Balance queries
  - Gas management

**ipfs_service.py** (IPFS Service)
- Provider: Pinata
- Purpose: Decentralized document storage
- Features:
  - File upload to IPFS
  - JSON metadata upload
  - File retrieval
  - Hash generation

**config.py** (Configuration)
- Purpose: Centralized configuration management
- Contains:
  - Flask settings
  - Blockchain connection details
  - Contract addresses
  - IPFS credentials
  - Gas settings

### Frontend (`frontend/`)

**index.html** (User Interface)
- Structure: Semantic HTML5
- Sections:
  - Header with wallet connection
  - Tab navigation (Apply, Applications, Admin)
  - Application form
  - Applications list
  - Admin panel

**styles.css** (Styling)
- Framework: Pure CSS (no dependencies)
- Features:
  - Responsive design
  - Gradient backgrounds
  - Card-based layouts
  - Status badges
  - Mobile-friendly

**app.js** (Frontend Logic)
- Libraries: Web3.js
- Features:
  - MetaMask integration
  - Wallet connection
  - Form handling
  - API communication
  - Real-time updates
  - Transaction signing

### Scripts (`scripts/`)

**deploy.py** (Deployment Script)
- Purpose: Automated contract deployment
- Features:
  - Solidity compilation
  - Contract deployment to Sepolia
  - ABI generation and saving
  - Environment variable updates
  - Deployment verification

**setup.sh** (Setup Script)
- Purpose: Initial project setup
- Features:
  - Dependency installation
  - Virtual environment creation
  - Solidity compiler installation
  - Environment file creation

### Tests (`tests/`)

**test_contract.py** (Contract Tests)
- Framework: Pytest
- Coverage:
  - Deployment verification
  - Application submission
  - Duplicate prevention
  - Approval workflow
  - Rejection workflow
  - Fund release
  - Access control
  - Input validation

### Documentation (`docs/`)

**DEPLOYMENT.md**
- Complete deployment guide
- Step-by-step instructions
- Configuration details
- Troubleshooting tips

**ARCHITECTURE.md**
- System architecture overview
- Component interactions
- Data flow diagrams
- Technology stack details

**API_REFERENCE.md**
- Complete API documentation
- Request/response examples
- Error codes
- Usage examples

**SECURITY.md**
- Security best practices
- Vulnerability prevention
- Incident response
- Monitoring guidelines

## Technology Stack

### Blockchain Layer
- **Network**: Ethereum Sepolia Testnet
- **Smart Contract**: Solidity 0.8.20
- **Development**: Remix, Hardhat (optional)

### Backend Layer
- **Language**: Python 3.9+
- **Framework**: Flask 3.0.0
- **Blockchain Library**: Web3.py 6.11.3
- **Compiler**: py-solc-x 2.0.2

### Frontend Layer
- **HTML5**: Semantic markup
- **CSS3**: Modern styling
- **JavaScript**: ES6+
- **Web3**: Web3.js 1.8.0

### Storage Layer
- **On-Chain**: Ethereum blockchain
- **Off-Chain**: IPFS via Pinata
- **Database**: SQLite (optional)

### Infrastructure
- **RPC Provider**: Infura/Alchemy
- **Wallet**: MetaMask
- **IPFS Gateway**: Pinata

## Data Flow

### Application Submission
```
Student → Frontend Form → MetaMask Signature → Backend API
→ Web3.py → Ethereum Network → Smart Contract → Event Emission
→ Transaction Receipt → Backend → Frontend → User Notification
```

### Document Upload
```
Student → File Selection → Frontend → Backend API → IPFS Service
→ Pinata API → IPFS Network → Hash Generation → Backend
→ Frontend → Blockchain Transaction (with hash)
```

### Admin Approval
```
Admin → Admin Panel → Approve Button → Backend API → Web3.py
→ Smart Contract (onlyAdmin check) → Status Update → Event Emission
→ Transaction Receipt → Frontend Update
```

### Fund Release
```
Admin → Release Funds → Backend API → Web3.py → Smart Contract
→ Balance Check → ETH Transfer → Status Update → Event Emission
→ Student Wallet → Transaction Receipt
```

## Environment Variables

Required in `backend/.env`:

```env
# Flask Configuration
SECRET_KEY=<random-secret-key>
DEBUG=True

# Ethereum Configuration
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<project-id>
CONTRACT_ADDRESS=0x<deployed-contract-address>
ADMIN_PRIVATE_KEY=0x<admin-private-key>
ADMIN_ADDRESS=0x<admin-wallet-address>

# IPFS Configuration
PINATA_API_KEY=<pinata-api-key>
PINATA_SECRET_KEY=<pinata-secret-key>
PINATA_JWT=<pinata-jwt-token>

# Database
DATABASE_PATH=scholarship.db
```

## Dependencies

### Python (backend/requirements.txt)
```
flask==3.0.0
flask-cors==4.0.0
web3==6.11.3
python-dotenv==1.0.0
requests==2.31.0
eth-account==0.10.0
py-solc-x==2.0.2
```

### JavaScript (CDN)
```html
<script src="https://cdn.jsdelivr.net/npm/web3@1.8.0/dist/web3.min.js"></script>
```

## Quick Start Commands

```bash
# 1. Setup
chmod +x scripts/setup.sh
./scripts/setup.sh

# 2. Configure
nano backend/.env

# 3. Deploy Contract
cd scripts
python deploy.py

# 4. Start Backend
cd ../backend
python app.py

# 5. Open Frontend
# Open frontend/index.html in browser
```

## Development Workflow

1. **Local Development**
   - Use Ganache for local blockchain
   - Test contracts locally
   - Develop frontend with mock data

2. **Testnet Deployment**
   - Deploy to Sepolia
   - Test with real transactions
   - Verify all functionality

3. **Production Deployment**
   - Security audit
   - Mainnet deployment
   - Monitoring setup

## File Sizes

- Smart Contract: ~500 lines
- Backend: ~800 lines
- Frontend: ~600 lines
- Documentation: ~2000 lines
- Total: ~4000 lines of code

## Gas Estimates

- Deploy Contract: ~2.5M gas
- Apply for Scholarship: ~150K gas
- Approve Application: ~50K gas
- Release Funds: ~80K gas

## Future Enhancements

1. **Smart Contract**
   - Multi-signature admin
   - Scholarship categories
   - Recurring scholarships
   - Voting mechanism

2. **Backend**
   - JWT authentication
   - Rate limiting
   - Caching layer
   - WebSocket support

3. **Frontend**
   - React/Vue migration
   - Mobile app
   - Real-time notifications
   - Analytics dashboard

4. **Infrastructure**
   - Layer 2 integration
   - IPFS pinning service
   - CDN for frontend
   - Load balancing

## License

MIT License - See LICENSE file for details

## Support

For questions or issues:
- GitHub Issues
- Email: support@yourdomain.com
- Documentation: docs/
