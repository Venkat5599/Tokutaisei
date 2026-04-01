# Security Guidelines

## Smart Contract Security

### Access Control

1. **Admin-Only Functions**
   ```solidity
   modifier onlyAdmin() {
       require(msg.sender == admin, "Only admin can perform this action");
       _;
   }
   ```
   - All approval, rejection, and fund release functions are admin-only
   - Admin address is set in constructor
   - Admin can be transferred to new address

2. **State Validation**
   - Applications must be in correct status before state changes
   - Duplicate applications prevented via `hasActiveApplication` mapping
   - Input validation on all parameters

3. **Reentrancy Protection**
   - State updates before external calls
   - Use of `.call()` with proper success checks
   - No recursive calls possible

### Input Validation

```solidity
require(bytes(_name).length > 0, "Name cannot be empty");
require(_marks <= 100, "Marks cannot exceed 100");
require(_requestedAmount > 0, "Requested amount must be greater than 0");
require(!hasActiveApplication[msg.sender], "Already have an active application");
```

### Gas Optimization

1. **Storage Optimization**
   - Packed structs to minimize storage slots
   - Use of mappings over arrays where possible
   - Events for historical data instead of storage

2. **Function Optimization**
   - View functions for read operations (no gas cost)
   - Minimal loops in contract code
   - Batch operations where applicable

## Backend Security

### Environment Variables

**NEVER commit sensitive data:**
```bash
# Bad - NEVER DO THIS
ADMIN_PRIVATE_KEY=0x1234567890abcdef...

# Good - Use .env file (in .gitignore)
# Load from environment
```

### Private Key Management

1. **Development**
   - Use test accounts only
   - Never use mainnet keys in development
   - Rotate keys regularly

2. **Production**
   - Use hardware wallets (Ledger, Trezor)
   - Implement key management service (AWS KMS, HashiCorp Vault)
   - Multi-signature wallets for admin operations

### API Security

1. **Authentication**
   ```python
   # Implement JWT authentication
   from flask_jwt_extended import jwt_required
   
   @app.route('/api/approve', methods=['POST'])
   @jwt_required()
   def approve_application():
       # Admin verification
       pass
   ```

2. **Rate Limiting**
   ```python
   from flask_limiter import Limiter
   
   limiter = Limiter(app, key_func=get_remote_address)
   
   @app.route('/api/apply')
   @limiter.limit("5 per minute")
   def apply():
       pass
   ```

3. **Input Validation**
   ```python
   from flask import request
   from werkzeug.exceptions import BadRequest
   
   def validate_address(address):
       if not Web3.is_address(address):
           raise BadRequest("Invalid Ethereum address")
   ```

### CORS Configuration

```python
# Development
CORS(app)

# Production
CORS(app, resources={
    r"/api/*": {
        "origins": ["https://yourdomain.com"],
        "methods": ["GET", "POST"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```

## Frontend Security

### MetaMask Integration

1. **Never Request Private Keys**
   ```javascript
   // Bad - NEVER DO THIS
   const privateKey = prompt("Enter private key");
   
   // Good - Let MetaMask sign
   const signature = await ethereum.request({
       method: 'personal_sign',
       params: [message, account]
   });
   ```

2. **Verify Network**
   ```javascript
   const chainId = await ethereum.request({ method: 'eth_chainId' });
   if (chainId !== '0xaa36a7') { // Sepolia
       alert('Please switch to Sepolia testnet');
       return;
   }
   ```

3. **Transaction Verification**
   ```javascript
   // Show transaction details before signing
   const tx = {
       from: account,
       to: contractAddress,
       data: encodedData,
       gas: estimatedGas
   };
   
   // User reviews in MetaMask before signing
   const txHash = await ethereum.request({
       method: 'eth_sendTransaction',
       params: [tx]
   });
   ```

### XSS Prevention

```javascript
// Sanitize user input
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Use textContent instead of innerHTML
element.textContent = userInput;
```

### CSRF Protection

```python
from flask_wtf.csrf import CSRFProtect

csrf = CSRFProtect(app)
```

## IPFS Security

### Document Upload

1. **File Type Validation**
   ```javascript
   const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
   if (!allowedTypes.includes(file.type)) {
       alert('Invalid file type');
       return;
   }
   ```

2. **File Size Limits**
   ```javascript
   const maxSize = 10 * 1024 * 1024; // 10MB
   if (file.size > maxSize) {
       alert('File too large');
       return;
   }
   ```

3. **Virus Scanning**
   - Implement virus scanning before upload
   - Use services like VirusTotal API
   - Quarantine suspicious files

### Privacy Considerations

1. **Sensitive Data**
   - Encrypt documents before IPFS upload
   - Use private IPFS networks for sensitive data
   - Implement access control for document retrieval

2. **PII Protection**
   - Minimize personal information on-chain
   - Hash sensitive data
   - Comply with GDPR/privacy regulations

## Deployment Security

### Smart Contract Deployment

1. **Audit Before Deployment**
   - Code review by multiple developers
   - Use automated tools (Slither, Mythril)
   - Professional audit for mainnet

2. **Testnet Testing**
   - Thorough testing on Sepolia
   - Simulate all scenarios
   - Test edge cases and failures

3. **Deployment Checklist**
   - [ ] Code audited
   - [ ] Tests passing
   - [ ] Gas optimization verified
   - [ ] Admin address correct
   - [ ] Backup deployment plan
   - [ ] Monitoring setup

### Backend Deployment

1. **Server Hardening**
   ```bash
   # Update system
   sudo apt update && sudo apt upgrade
   
   # Configure firewall
   sudo ufw allow 22
   sudo ufw allow 80
   sudo ufw allow 443
   sudo ufw enable
   
   # Disable root login
   sudo nano /etc/ssh/sshd_config
   # Set: PermitRootLogin no
   ```

2. **SSL/TLS**
   ```bash
   # Use Let's Encrypt
   sudo certbot --nginx -d yourdomain.com
   ```

3. **Environment Isolation**
   ```bash
   # Use Docker
   docker-compose up -d
   
   # Or systemd service
   sudo systemctl enable scholarship-api
   ```

## Monitoring & Incident Response

### Logging

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)

@app.route('/api/apply', methods=['POST'])
def apply():
    logger.info(f"Application submitted by {request.json.get('studentAddress')}")
    # ...
```

### Monitoring

1. **Contract Events**
   - Monitor all emitted events
   - Alert on suspicious activity
   - Track gas usage

2. **API Monitoring**
   - Request rate tracking
   - Error rate monitoring
   - Response time tracking

3. **Balance Monitoring**
   ```python
   def check_contract_balance():
       balance = blockchain.get_contract_balance()
       if balance['balance'] < 0.1:
           send_alert("Low contract balance")
   ```

### Incident Response

1. **Emergency Procedures**
   - Pause contract functionality (if implemented)
   - Backup data immediately
   - Notify stakeholders
   - Document incident

2. **Recovery Plan**
   - Database backups
   - Contract upgrade path
   - Communication plan
   - Post-mortem analysis

## Security Checklist

### Pre-Deployment
- [ ] Smart contract audited
- [ ] All tests passing
- [ ] Private keys secured
- [ ] Environment variables configured
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Input validation in place
- [ ] Error handling comprehensive

### Post-Deployment
- [ ] Monitoring active
- [ ] Logging configured
- [ ] Backup procedures tested
- [ ] Incident response plan ready
- [ ] Documentation complete
- [ ] Team trained on security procedures

## Vulnerability Reporting

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email: security@yourdomain.com
3. Include:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Resources

- [Ethereum Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Web3 Security Tools](https://github.com/Consensys/smart-contract-best-practices)
- [Solidity Security Considerations](https://docs.soliditylang.org/en/latest/security-considerations.html)
