# Transaction Failure Troubleshooting Guide

## Issue: MetaMask Shows "Transaction Likely to Fail"

When MetaMask shows that a transaction is likely to fail, it means the transaction will revert on-chain. Here are the common causes and solutions:

## Common Causes

### 1. Already Have Active Application ⚠️
**Error**: `"Already have an active application"`

**Cause**: The smart contract only allows one active application per wallet address at a time.

**Solution**:
- Wait for your current application to be reviewed (approved or rejected)
- Once rejected, you can submit a new application
- Once approved and funds released, you can submit a new application
- Check the Transparency page to see your current application status

**Prevention**: The form now checks for active applications and shows a warning message.

### 2. Invalid Academic Score
**Error**: `"Marks cannot exceed 100"`

**Cause**: Academic score must be between 0 and 100.

**Solution**:
- Enter a valid percentage score (0-100)
- Do not enter GPA values in the academic score field

### 3. Empty Required Fields
**Error**: `"Name cannot be empty"` or `"Email cannot be empty"`

**Cause**: Required fields are missing.

**Solution**:
- Fill in all required fields marked with asterisk (*)
- The form now validates before submission

### 4. Invalid Requested Amount
**Error**: `"Requested amount must be greater than 0"`

**Cause**: Requested amount is 0 or negative.

**Solution**:
- Enter a valid amount in Wei
- Example: 1000000000000000 Wei = 0.001 ETH
- Use this converter: 1 ETH = 1000000000000000000 Wei

### 5. Insufficient Gas
**Cause**: Not enough ETH in wallet for gas fees.

**Solution**:
- Get Sepolia testnet ETH from faucets:
  - https://sepoliafaucet.com/
  - https://www.alchemy.com/faucets/ethereum-sepolia
- Ensure you have at least 0.01 ETH for gas

### 6. Network Issues
**Cause**: Wrong network or RPC issues.

**Solution**:
- Ensure MetaMask is connected to Sepolia testnet
- Check that the contract address is correct: `0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6`
- Try refreshing the page

## How to Debug

### Step 1: Check Browser Console
Open browser developer tools (F12) and check the Console tab for error messages.

### Step 2: Check Form Data
Before submitting, verify:
```
✓ Name: Not empty
✓ Email: Valid email format
✓ Income: Positive number
✓ Academic Score: 0-100
✓ Requested Amount: Greater than 0 (in Wei)
✓ Documents: All required documents uploaded
```

### Step 3: Check Wallet
- Connected to Sepolia testnet
- Has sufficient ETH for gas (~0.01 ETH)
- Correct wallet address

### Step 4: Check Active Applications
- Go to Transparency page
- Search for your wallet address
- Check if you have any pending or approved applications

## Enhanced Error Messages

The application now provides detailed error messages:

### Before Submission
- Validates all required fields
- Checks academic score range (0-100)
- Validates income is positive
- Ensures requested amount is greater than 0

### During Submission
- Shows console logs for debugging
- Displays metadata upload status
- Shows blockchain submission parameters

### After Submission
- Specific error messages for each failure type
- User-friendly explanations
- Actionable solutions

## Active Application Check

The form now automatically checks if you have an active application:

```typescript
// Checks on page load and when wallet connects
- Fetches your applications from backend
- Identifies pending (status 0) or approved (status 1) applications
- Shows warning banner if active application exists
- Disables submission if active application found
```

### Warning Banner
If you have an active application, you'll see:
```
⚠️ You already have an active application. 
You cannot submit a new application until your current one is reviewed.
```

## Testing Your Application

### Test Data Example
```
Personal Information:
- Name: John Doe
- Email: john@example.com
- DOB: 2000-01-01
- Phone: +1 (555) 123-4567
- Address: 123 Main St, City, State 12345, USA

Academic Details:
- Institution: Example University
- Program: Computer Science
- Year: Junior
- GPA: 3.5
- Academic Score: 85

Financial Information:
- Income: 50000
- Requested Amount: 1000000000000000 (0.001 ETH in Wei)
- Reason: Need financial assistance for tuition

Guardian Information:
- Name: Jane Doe
- Phone: +1 (555) 987-6543
- Relation: Parent

Essays:
- Reason for Scholarship: (Write 100+ words)
- Future Goals: (Write 50+ words)

Documents:
- Upload any PDF files for testing
```

## Contract Requirements

The smart contract enforces these rules:

```solidity
require(bytes(_name).length > 0, "Name cannot be empty");
require(bytes(_email).length > 0, "Email cannot be empty");
require(_marks <= 100, "Marks cannot exceed 100");
require(_requestedAmount > 0, "Requested amount must be greater than 0");
require(!hasActiveApplication[msg.sender], "Already have an active application");
```

## Status Codes

Application statuses:
- `0` = Pending (Active)
- `1` = Approved (Active)
- `2` = Rejected (Can apply again)
- `3` = Funds Released (Can apply again)

## Quick Fixes

### If Transaction Fails:
1. Check console for specific error
2. Verify all form fields are valid
3. Check if you have active application
4. Ensure sufficient gas
5. Try again with corrected data

### If "Already Have Active Application":
1. Go to Transparency page
2. Find your application
3. Wait for admin review
4. After rejection/completion, you can apply again

### If "Marks Cannot Exceed 100":
1. Check Academic Score field in Step 2
2. Enter percentage (0-100), not GPA
3. Example: 85 (not 3.5)

### If Upload Fails:
1. Check file size (< 10MB)
2. Check file format (PDF for most, PDF/Image for some)
3. Check backend is running (http://localhost:5000)
4. Check browser console for errors

## Support

If issues persist:
1. Check all console logs
2. Verify backend is running
3. Verify contract is deployed
4. Check network connection
5. Try with different wallet address (if testing)

## Prevention

The enhanced form now prevents most errors:
- ✅ Real-time validation
- ✅ Active application check
- ✅ Detailed error messages
- ✅ Console logging for debugging
- ✅ Field-specific validation
- ✅ Warning banners
- ✅ Disabled submission when invalid
