import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther } from 'viem'

const CONTRACT_ADDRESS = '0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6'

const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "string","name": "_name","type": "string"},
      {"internalType": "string","name": "_email","type": "string"},
      {"internalType": "uint256","name": "_familyIncome","type": "uint256"},
      {"internalType": "uint256","name": "_marks","type": "uint256"},
      {"internalType": "string","name": "_ipfsDocumentHash","type": "string"},
      {"internalType": "uint256","name": "_requestedAmount","type": "uint256"}
    ],
    "name": "applyForScholarship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_applicationId","type": "uint256"}],
    "name": "approveScholarship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {"internalType": "uint256","name": "_applicationId","type": "uint256"},
      {"internalType": "string","name": "_reason","type": "string"}
    ],
    "name": "rejectScholarship",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "_applicationId","type": "uint256"}],
    "name": "releaseFunds",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "depositFunds",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "applicationCounter",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "name": "applications",
    "outputs": [
      {"internalType": "address","name": "studentAddress","type": "address"},
      {"internalType": "string","name": "name","type": "string"},
      {"internalType": "string","name": "email","type": "string"},
      {"internalType": "uint256","name": "familyIncome","type": "uint256"},
      {"internalType": "uint256","name": "marks","type": "uint256"},
      {"internalType": "string","name": "ipfsDocumentHash","type": "string"},
      {"internalType": "enum ScholarshipSystem.ApplicationStatus","name": "status","type": "uint8"},
      {"internalType": "uint256","name": "requestedAmount","type": "uint256"},
      {"internalType": "uint256","name": "timestamp","type": "uint256"},
      {"internalType": "string","name": "rejectionReason","type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{"internalType": "address","name": "","type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address","name": "","type": "address"}],
    "name": "hasActiveApplication",
    "outputs": [{"internalType": "bool","name": "","type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

export function useScholarshipContract() {
  const { address } = useAccount()
  const { writeContract, data: hash, isPending, error } = useWriteContract()

  // Read contract balance
  const { data: contractBalance } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'applicationCounter',
  })

  // Read admin address
  const { data: adminAddress } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'admin',
  })

  // Submit application
  const submitApplication = async (
    name: string, 
    email: string,
    income: number, 
    academicScore: number, 
    ipfsHash: string,
    requestedAmount: number
  ) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'applyForScholarship',
      args: [name, email, BigInt(income), BigInt(academicScore), ipfsHash, BigInt(requestedAmount)],
    })
  }

  // Approve application
  const approveApplication = async (applicationId: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'approveScholarship',
      args: [BigInt(applicationId)],
    })
  }

  // Reject application
  const rejectApplication = async (applicationId: number, reason: string) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'rejectScholarship',
      args: [BigInt(applicationId), reason],
    })
  }

  // Release funds
  const releaseFunds = async (applicationId: number) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'releaseFunds',
      args: [BigInt(applicationId)],
    })
  }

  // Deposit funds
  const depositFunds = async (amount: string) => {
    return writeContract({
      address: CONTRACT_ADDRESS,
      abi: CONTRACT_ABI,
      functionName: 'depositFunds',
      value: parseEther(amount),
    })
  }

  // Get application details
  const { data: applicationData } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'applications',
    args: [BigInt(0)], // This will be dynamic
  })

  const isAdmin = address && adminAddress && address.toLowerCase() === adminAddress.toLowerCase()

  return {
    address,
    isAdmin,
    adminAddress,
    contractBalance,
    submitApplication,
    approveApplication,
    rejectApplication,
    releaseFunds,
    depositFunds,
    isPending,
    hash,
    error,
    CONTRACT_ADDRESS,
  }
}

// Hook to get all applications
export function useApplications() {
  const { data: count } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'applicationCounter',
  })

  return {
    applicationCount: count ? Number(count) : 0,
  }
}

// Hook to get specific application
export function useApplication(id: number) {
  const { data, isLoading, error } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'applications',
    args: [BigInt(id)],
  })

  return {
    application: data,
    isLoading,
    error,
  }
}
