# Sample API Requests

This document provides ready-to-use examples for testing the Blockchain Scholarship System API.

## Setup

Replace these placeholders with your actual values:
- `YOUR_STUDENT_ADDRESS` - Student's Ethereum address
- `YOUR_PRIVATE_KEY` - Student's private key (for testing only)
- `YOUR_CONTRACT_ADDRESS` - Deployed contract address
- `APPLICATION_ID` - Application ID (starts from 0)

## Health Check

```bash
curl http://localhost:5000/health
```

Expected Response:
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

## Student Operations

### 1. Submit Scholarship Application

```bash
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "name": "Alice Johnson",
    "email": "alice.johnson@university.edu",
    "familyIncome": 28000,
    "marks": 92,
    "requestedAmount": 0.15,
    "privateKey": "0xYOUR_PRIVATE_KEY_HERE",
    "ipfsDocumentHash": ""
  }'
```

### 2. Get All Applications

```bash
curl http://localhost:5000/api/applications
```

### 3. Get Specific Application

```bash
curl http://localhost:5000/api/applications/0
```

### 4. Get Student's Applications

```bash
curl http://localhost:5000/api/student/0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb/applications
```

## Admin Operations

### 5. Approve Application

```bash
curl -X POST http://localhost:5000/api/approve \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": 0
  }'
```

### 6. Reject Application

```bash
curl -X POST http://localhost:5000/api/reject \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": 1,
    "reason": "Incomplete documentation. Please provide income certificate and academic transcripts."
  }'
```

### 7. Release Funds

```bash
curl -X POST http://localhost:5000/api/release-funds \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": 0
  }'
```

### 8. Deposit Funds to Contract

```bash
curl -X POST http://localhost:5000/api/deposit \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 2.0
  }'
```

### 9. Get Contract Balance

```bash
curl http://localhost:5000/api/contract/balance
```

## IPFS Operations

### 10. Upload Document

```bash
curl -X POST http://localhost:5000/api/upload-document \
  -F "file=@/path/to/income_certificate.pdf"
```

## Python Examples

### Submit Application

```python
import requests

url = "http://localhost:5000/api/apply"
data = {
    "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "name": "Bob Smith",
    "email": "bob.smith@college.edu",
    "familyIncome": 22000,
    "marks": 88,
    "requestedAmount": 0.12,
    "privateKey": "0xYOUR_PRIVATE_KEY",
    "ipfsDocumentHash": ""
}

response = requests.post(url, json=data)
print(response.json())
```

### Get All Applications

```python
import requests

response = requests.get("http://localhost:5000/api/applications")
applications = response.json()

for app in applications['applications']:
    print(f"ID: {app['id']}, Name: {app['name']}, Status: {app['status']}")
```

### Approve Application

```python
import requests

url = "http://localhost:5000/api/approve"
data = {"applicationId": 0}

response = requests.post(url, json=data)
print(response.json())
```

## JavaScript Examples

### Submit Application

```javascript
const submitApplication = async () => {
  const response = await fetch('http://localhost:5000/api/apply', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      studentAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
      name: 'Carol Davis',
      email: 'carol.davis@school.edu',
      familyIncome: 30000,
      marks: 95,
      requestedAmount: 0.2,
      privateKey: '0xYOUR_PRIVATE_KEY',
      ipfsDocumentHash: ''
    })
  });
  
  const result = await response.json();
  console.log(result);
};

submitApplication();
```

### Get Applications

```javascript
const getApplications = async () => {
  const response = await fetch('http://localhost:5000/api/applications');
  const data = await response.json();
  
  data.applications.forEach(app => {
    console.log(`${app.name} - ${app.status}`);
  });
};

getApplications();
```

## Test Scenarios

### Scenario 1: Complete Application Flow

```bash
# Step 1: Submit application
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "name": "Test Student",
    "email": "test@example.com",
    "familyIncome": 25000,
    "marks": 85,
    "requestedAmount": 0.1,
    "privateKey": "0xYOUR_PRIVATE_KEY",
    "ipfsDocumentHash": ""
  }'

# Step 2: Verify application created
curl http://localhost:5000/api/applications/0

# Step 3: Approve application
curl -X POST http://localhost:5000/api/approve \
  -H "Content-Type: application/json" \
  -d '{"applicationId": 0}'

# Step 4: Release funds
curl -X POST http://localhost:5000/api/release-funds \
  -H "Content-Type: application/json" \
  -d '{"applicationId": 0}'

# Step 5: Verify final status
curl http://localhost:5000/api/applications/0
```

### Scenario 2: Rejection Flow

```bash
# Step 1: Submit application
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "name": "Another Student",
    "email": "another@example.com",
    "familyIncome": 50000,
    "marks": 65,
    "requestedAmount": 0.05,
    "privateKey": "0xYOUR_PRIVATE_KEY",
    "ipfsDocumentHash": ""
  }'

# Step 2: Reject application
curl -X POST http://localhost:5000/api/reject \
  -H "Content-Type: application/json" \
  -d '{
    "applicationId": 1,
    "reason": "Family income exceeds threshold"
  }'

# Step 3: Verify rejection
curl http://localhost:5000/api/applications/1
```

### Scenario 3: Multiple Applications

```bash
# Submit multiple applications
for i in {1..5}; do
  curl -X POST http://localhost:5000/api/apply \
    -H "Content-Type: application/json" \
    -d "{
      \"studentAddress\": \"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb\",
      \"name\": \"Student $i\",
      \"email\": \"student$i@example.com\",
      \"familyIncome\": $((20000 + i * 1000)),
      \"marks\": $((80 + i)),
      \"requestedAmount\": 0.1,
      \"privateKey\": \"0xYOUR_PRIVATE_KEY\",
      \"ipfsDocumentHash\": \"\"
    }"
  sleep 2
done

# Get all applications
curl http://localhost:5000/api/applications
```

## Sample Test Data

### High Merit Student
```json
{
  "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "Emma Wilson",
  "email": "emma.wilson@university.edu",
  "familyIncome": 18000,
  "marks": 98,
  "requestedAmount": 0.25,
  "privateKey": "0xYOUR_PRIVATE_KEY",
  "ipfsDocumentHash": "QmTest123"
}
```

### Low Income Student
```json
{
  "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "David Martinez",
  "email": "david.martinez@college.edu",
  "familyIncome": 12000,
  "marks": 82,
  "requestedAmount": 0.18,
  "privateKey": "0xYOUR_PRIVATE_KEY",
  "ipfsDocumentHash": "QmTest456"
}
```

### Average Student
```json
{
  "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "Sarah Johnson",
  "email": "sarah.johnson@school.edu",
  "familyIncome": 35000,
  "marks": 75,
  "requestedAmount": 0.08,
  "privateKey": "0xYOUR_PRIVATE_KEY",
  "ipfsDocumentHash": "QmTest789"
}
```

## Expected Responses

### Successful Application Submission
```json
{
  "message": "Application submitted successfully",
  "tx_hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "block_number": 4567890
}
```

### Application Details
```json
{
  "id": 0,
  "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "Alice Johnson",
  "email": "alice.johnson@university.edu",
  "familyIncome": 28000,
  "marks": 92,
  "ipfsDocumentHash": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  "status": "Pending",
  "requestedAmount": "0.15",
  "timestamp": 1678901234,
  "rejectionReason": ""
}
```

### Error Response
```json
{
  "error": "Missing field: studentAddress"
}
```

## Postman Collection

Import this JSON into Postman for easy testing:

```json
{
  "info": {
    "name": "Blockchain Scholarship System",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Submit Application",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"studentAddress\": \"0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb\",\n  \"name\": \"Test Student\",\n  \"email\": \"test@example.com\",\n  \"familyIncome\": 25000,\n  \"marks\": 85,\n  \"requestedAmount\": 0.1,\n  \"privateKey\": \"0xYOUR_PRIVATE_KEY\",\n  \"ipfsDocumentHash\": \"\"\n}"
        },
        "url": {"raw": "http://localhost:5000/api/apply"}
      }
    },
    {
      "name": "Get All Applications",
      "request": {
        "method": "GET",
        "url": {"raw": "http://localhost:5000/api/applications"}
      }
    },
    {
      "name": "Approve Application",
      "request": {
        "method": "POST",
        "header": [{"key": "Content-Type", "value": "application/json"}],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"applicationId\": 0\n}"
        },
        "url": {"raw": "http://localhost:5000/api/approve"}
      }
    }
  ]
}
```

## Troubleshooting

### Error: "Failed to connect to Ethereum network"
- Check SEPOLIA_RPC_URL in .env
- Verify Infura/Alchemy API key
- Test connection: `curl https://sepolia.infura.io/v3/YOUR_KEY`

### Error: "Insufficient funds"
- Get Sepolia ETH from faucets
- Check wallet balance
- Verify contract has sufficient balance for fund release

### Error: "Already have an active application"
- Wait for current application to be processed
- Check application status
- Only one active application per address allowed

## Rate Limiting

Be mindful of:
- Infura: 100,000 requests/day (free tier)
- Pinata: 1GB storage (free tier)
- Sepolia: Network congestion during peak times

## Best Practices

1. Always check transaction receipt before proceeding
2. Wait for block confirmation (1-2 blocks recommended)
3. Handle errors gracefully
4. Log all transactions for audit
5. Test on Sepolia before mainnet deployment
