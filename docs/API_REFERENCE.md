# API Reference

Complete API documentation for the Blockchain Scholarship System backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Currently, admin operations require the admin private key to be configured in the backend `.env` file. In production, implement proper authentication middleware.

## Endpoints

### Health Check

#### GET /health

Check if the API and blockchain connection are working.

**Response:**
```json
{
  "status": "healthy",
  "blockchain_connected": true
}
```

---

### Applications

#### POST /api/apply

Submit a new scholarship application.

**Request Body:**
```json
{
  "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "familyIncome": 25000,
  "marks": 85,
  "requestedAmount": 0.1,
  "privateKey": "0x...",
  "ipfsDocumentHash": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
}
```

**Response (201):**
```json
{
  "message": "Application submitted successfully",
  "tx_hash": "0x1234567890abcdef...",
  "block_number": 4567890
}
```

**Errors:**
- 400: Missing required fields
- 500: Blockchain transaction failed

---

#### GET /api/applications

Get all scholarship applications.

**Response (200):**
```json
{
  "applications": [
    {
      "id": 0,
      "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      "name": "John Doe",
      "email": "john.doe@example.com",
      "familyIncome": 25000,
      "marks": 85,
      "ipfsDocumentHash": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
      "status": "Pending",
      "requestedAmount": "0.1",
      "timestamp": 1678901234,
      "rejectionReason": ""
    }
  ],
  "count": 1
}
```

---

#### GET /api/applications/:id

Get a specific application by ID.

**Parameters:**
- `id` (path): Application ID

**Response (200):**
```json
{
  "id": 0,
  "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
  "name": "John Doe",
  "email": "john.doe@example.com",
  "familyIncome": 25000,
  "marks": 85,
  "ipfsDocumentHash": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  "status": "Pending",
  "requestedAmount": "0.1",
  "timestamp": 1678901234,
  "rejectionReason": ""
}
```

**Errors:**
- 404: Application not found

---

#### GET /api/student/:address/applications

Get all applications for a specific student.

**Parameters:**
- `address` (path): Student's Ethereum address

**Response (200):**
```json
{
  "applications": [...],
  "count": 2
}
```

---

### Admin Operations

#### POST /api/approve

Approve a scholarship application (admin only).

**Request Body:**
```json
{
  "applicationId": 0
}
```

**Response (200):**
```json
{
  "message": "Application approved successfully",
  "tx_hash": "0x1234567890abcdef...",
  "block_number": 4567891
}
```

**Errors:**
- 400: Missing applicationId
- 500: Not admin or invalid status

---

#### POST /api/reject

Reject a scholarship application (admin only).

**Request Body:**
```json
{
  "applicationId": 0,
  "reason": "Insufficient documentation provided"
}
```

**Response (200):**
```json
{
  "message": "Application rejected successfully",
  "tx_hash": "0x1234567890abcdef...",
  "block_number": 4567892
}
```

**Errors:**
- 400: Missing required fields
- 500: Not admin or invalid status

---

#### POST /api/release-funds

Release funds to an approved student (admin only).

**Request Body:**
```json
{
  "applicationId": 0
}
```

**Response (200):**
```json
{
  "message": "Funds released successfully",
  "tx_hash": "0x1234567890abcdef...",
  "block_number": 4567893
}
```

**Errors:**
- 400: Missing applicationId
- 500: Not admin, invalid status, or insufficient balance

---

### Contract Management

#### GET /api/contract/balance

Get the current balance of the scholarship contract.

**Response (200):**
```json
{
  "balance": "5.5"
}
```

---

#### POST /api/deposit

Deposit funds to the scholarship contract (admin only).

**Request Body:**
```json
{
  "amount": 1.0
}
```

**Response (200):**
```json
{
  "message": "Funds deposited successfully",
  "tx_hash": "0x1234567890abcdef...",
  "block_number": 4567894
}
```

**Errors:**
- 400: Missing or invalid amount
- 500: Transaction failed

---

### IPFS Operations

#### POST /api/upload-document

Upload a document to IPFS.

**Request:**
- Content-Type: `multipart/form-data`
- Body: File upload with key `file`

**Response (200):**
```json
{
  "ipfs_hash": "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
  "url": "https://gateway.pinata.cloud/ipfs/QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG"
}
```

**Errors:**
- 400: No file provided
- 500: Upload failed

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Internal Server Error |

## Application Status Values

| Status | Description |
|--------|-------------|
| Pending | Application submitted, awaiting review |
| Approved | Application approved by admin |
| Rejected | Application rejected by admin |
| FundsReleased | Funds transferred to student |

## Example Usage

### Using cURL

```bash
# Submit application
curl -X POST http://localhost:5000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "studentAddress": "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
    "name": "John Doe",
    "email": "john@example.com",
    "familyIncome": 25000,
    "marks": 85,
    "requestedAmount": 0.1,
    "privateKey": "0x...",
    "ipfsDocumentHash": ""
  }'

# Get all applications
curl http://localhost:5000/api/applications

# Approve application
curl -X POST http://localhost:5000/api/approve \
  -H "Content-Type: application/json" \
  -d '{"applicationId": 0}'

# Upload document
curl -X POST http://localhost:5000/api/upload-document \
  -F "file=@/path/to/document.pdf"
```

### Using Python

```python
import requests

# Submit application
response = requests.post('http://localhost:5000/api/apply', json={
    'studentAddress': '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    'name': 'John Doe',
    'email': 'john@example.com',
    'familyIncome': 25000,
    'marks': 85,
    'requestedAmount': 0.1,
    'privateKey': '0x...',
    'ipfsDocumentHash': ''
})

print(response.json())

# Get applications
response = requests.get('http://localhost:5000/api/applications')
applications = response.json()['applications']
```

### Using JavaScript

```javascript
// Submit application
const response = await fetch('http://localhost:5000/api/apply', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    studentAddress: '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb',
    name: 'John Doe',
    email: 'john@example.com',
    familyIncome: 25000,
    marks: 85,
    requestedAmount: 0.1,
    privateKey: '0x...',
    ipfsDocumentHash: ''
  })
});

const result = await response.json();
console.log(result);
```

## Rate Limiting

Currently no rate limiting is implemented. For production:
- Implement rate limiting per IP
- Add authentication tokens
- Use API keys for admin operations

## CORS

CORS is enabled for all origins in development. For production:
- Restrict to specific domains
- Use environment-based configuration
- Implement proper security headers

## Error Handling

All errors follow this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

## Webhooks (Future Feature)

Plan to implement webhooks for:
- Application submitted
- Application reviewed
- Funds released
- Low contract balance alerts
