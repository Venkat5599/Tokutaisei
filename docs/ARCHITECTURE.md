# System Architecture

## Overview

The Blockchain Scholarship System is a decentralized application (DApp) that ensures transparent and corruption-free scholarship distribution using Ethereum blockchain.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Frontend                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Apply UI   │  │ Applications │  │  Admin Panel │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         │                  │                  │             │
│         └──────────────────┴──────────────────┘             │
│                           │                                  │
│                      Web3.js / MetaMask                     │
└───────────────────────────┼──────────────────────────────────┘
                            │
┌───────────────────────────┼──────────────────────────────────┐
│                    Backend (Flask API)                       │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              REST API Endpoints                       │  │
│  │  /apply  /approve  /reject  /release-funds           │  │
│  └──────────────────────────────────────────────────────┘  │
│         │                                    │               │
│  ┌──────▼──────┐                    ┌───────▼────────┐     │
│  │  Web3.py    │                    │  IPFS Service  │     │
│  │  Service    │                    │   (Pinata)     │     │
│  └──────┬──────┘                    └────────────────┘     │
└─────────┼───────────────────────────────────────────────────┘
          │
┌─────────▼─────────────────────────────────────────────────┐
│              Ethereum Sepolia Testnet                      │
│  ┌────────────────────────────────────────────────────┐   │
│  │         ScholarshipSystem Smart Contract           │   │
│  │                                                     │   │
│  │  • Application Storage                             │   │
│  │  • Access Control (Admin/Student)                  │   │
│  │  • Fund Management                                 │   │
│  │  • Event Emission                                  │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
          │
┌─────────▼─────────────────────────────────────────────────┐
│                    IPFS Network                            │
│  • Document Storage (Income Proof, Certificates)          │
│  • Decentralized & Immutable                              │
└────────────────────────────────────────────────────────────┘
```

## Components

### 1. Smart Contract Layer

**ScholarshipSystem.sol**
- Written in Solidity 0.8.20
- Deployed on Ethereum Sepolia testnet
- Handles all business logic on-chain

Key Features:
- Application submission and storage
- Role-based access control (admin only for approvals)
- Fund management and distribution
- Event emission for transparency
- Duplicate application prevention

State Variables:
```solidity
- admin: address
- applicationCounter: uint256
- applications: mapping(uint256 => Application)
- studentApplications: mapping(address => uint256[])
- hasActiveApplication: mapping(address => bool)
```

### 2. Backend Layer

**Python Flask API**
- RESTful API design
- Web3.py for blockchain interaction
- IPFS integration via Pinata
- Request validation and error handling

Services:
- `blockchain.py`: Web3 interaction service
- `ipfs_service.py`: Document upload/retrieval
- `config.py`: Configuration management
- `app.py`: API routes and controllers

### 3. Frontend Layer

**Web Interface**
- Pure HTML/CSS/JavaScript
- Web3.js for MetaMask integration
- Responsive design
- Real-time blockchain interaction

Pages:
- Apply: Student application form
- Applications: View all applications
- Admin Panel: Approve/reject/release funds

### 4. Storage Layer

**On-Chain Storage**
- Application metadata
- Status and timestamps
- Fund amounts
- Rejection reasons

**Off-Chain Storage (IPFS)**
- Supporting documents
- Income proofs
- Academic certificates
- Large files

## Data Flow

### Application Submission Flow

```
1. Student fills form → Frontend
2. Document uploaded → IPFS (Pinata)
3. IPFS hash returned
4. Form data + IPFS hash → Backend API
5. Backend validates data
6. Web3.py builds transaction
7. Transaction signed with private key
8. Transaction sent to Sepolia
9. Smart contract validates and stores
10. Event emitted: ApplicationSubmitted
11. Transaction receipt → Backend
12. Success response → Frontend
```

### Approval Flow

```
1. Admin clicks "Approve" → Frontend
2. Request sent → Backend API
3. Backend verifies admin credentials
4. Web3.py builds approval transaction
5. Transaction signed with admin key
6. Smart contract validates admin
7. Status updated to "Approved"
8. Event emitted: ApplicationReviewed
9. Success response → Frontend
```

### Fund Release Flow

```
1. Admin clicks "Release Funds" → Frontend
2. Request sent → Backend API
3. Backend verifies admin and status
4. Web3.py builds fund transfer transaction
5. Smart contract validates:
   - Admin caller
   - Approved status
   - Sufficient balance
6. ETH transferred to student
7. Status updated to "FundsReleased"
8. Event emitted: FundsReleased
9. Success response → Frontend
```

## Security Architecture

### Smart Contract Security

1. **Access Control**
   - `onlyAdmin` modifier for sensitive functions
   - Address validation

2. **State Validation**
   - Status checks before state changes
   - Duplicate prevention

3. **Reentrancy Protection**
   - State updates before external calls
   - Use of `.call()` with proper checks

4. **Input Validation**
   - `require()` statements
   - Boundary checks

### Backend Security

1. **Environment Variables**
   - Sensitive data in .env
   - Never committed to version control

2. **Request Validation**
   - Input sanitization
   - Type checking

3. **Error Handling**
   - Try-catch blocks
   - Proper error messages

### Frontend Security

1. **MetaMask Integration**
   - User signs transactions
   - Private keys never exposed

2. **CORS Configuration**
   - Restricted origins in production

3. **Input Validation**
   - Client-side validation
   - XSS prevention

## Gas Optimization

1. **Storage Optimization**
   - Packed structs
   - Minimal on-chain storage

2. **Function Optimization**
   - View functions for reads
   - Batch operations where possible

3. **Event Usage**
   - Events instead of storage for logs
   - Indexed parameters for filtering

## Scalability Considerations

### Current Limitations
- Gas costs for on-chain storage
- Transaction confirmation time
- Network congestion

### Future Improvements
1. **Layer 2 Solutions**
   - Polygon, Arbitrum, Optimism
   - Lower gas fees
   - Faster transactions

2. **IPFS Optimization**
   - Pinning services
   - CDN integration
   - Caching strategies

3. **Backend Optimization**
   - Database caching
   - Redis for session management
   - Load balancing

## Event Architecture

Events emitted by smart contract:

```solidity
ApplicationSubmitted(
    applicationId,
    student,
    name,
    requestedAmount,
    timestamp
)

ApplicationReviewed(
    applicationId,
    status,
    reviewer,
    timestamp
)

FundsReleased(
    applicationId,
    student,
    amount,
    timestamp
)

FundsDeposited(
    depositor,
    amount,
    timestamp
)
```

These events enable:
- Transaction history
- Audit trails
- Real-time notifications
- Analytics and reporting

## Technology Stack Summary

| Layer | Technology | Purpose |
|-------|-----------|---------|
| Blockchain | Ethereum Sepolia | Decentralized ledger |
| Smart Contract | Solidity 0.8.20 | Business logic |
| Backend | Python Flask | API server |
| Blockchain Library | Web3.py | Ethereum interaction |
| Storage | IPFS (Pinata) | Document storage |
| Frontend | HTML/CSS/JS | User interface |
| Wallet | MetaMask | Transaction signing |
| RPC Provider | Infura | Blockchain access |

## Deployment Architecture

### Development
- Local blockchain (Ganache) optional
- Sepolia testnet for testing
- Local Flask server
- File-based serving for frontend

### Production
- Ethereum mainnet
- Cloud hosting (AWS/GCP/Azure)
- Load balancer
- CDN for frontend
- SSL/TLS encryption
- Monitoring and logging
