import { useState, useEffect } from 'react'
import { useReadContract } from 'wagmi'

const CONTRACT_ADDRESS = '0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6'

const CONTRACT_ABI = [
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
  }
] as const

export interface Application {
  id: number
  applicant: string
  name: string
  email: string
  income: bigint
  academicScore: bigint
  ipfsHash: string
  status: number // 0: Pending, 1: Approved, 2: Rejected, 3: FundsReleased
  requestedAmount: bigint
  timestamp: bigint
  rejectionReason: string
}

export function useAllApplications() {
  const [applications, setApplications] = useState<Application[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const { data: count } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'applicationCounter',
  })

  useEffect(() => {
    async function fetchApplications() {
      if (!count) {
        setIsLoading(false)
        return
      }

      const totalCount = Number(count)
      const apps: Application[] = []

      // Fetch all applications
      for (let i = 0; i < totalCount; i++) {
        try {
          const response = await fetch(`http://localhost:5000/api/application/${i}`)
          if (response.ok) {
            const data = await response.json()
            // Map backend response to frontend format
            apps.push({
              id: i,
              applicant: data.studentAddress,
              name: data.name,
              email: data.email,
              income: BigInt(data.familyIncome),
              academicScore: BigInt(data.marks),
              ipfsHash: data.ipfsDocumentHash,
              status: Number(data.status), // Already an integer from backend
              requestedAmount: BigInt(data.requestedAmount), // Already in Wei as string
              timestamp: BigInt(data.timestamp),
              rejectionReason: data.rejectionReason || ''
            })
          }
        } catch (error) {
          console.error(`Error fetching application ${i}:`, error)
        }
      }

      setApplications(apps)
      setIsLoading(false)
    }

    fetchApplications()
  }, [count])

  const pendingApplications = applications.filter(app => app.status === 0)
  const approvedApplications = applications.filter(app => app.status === 1)
  const rejectedApplications = applications.filter(app => app.status === 2)
  const fundsReleasedApplications = applications.filter(app => app.status === 3)

  return {
    applications,
    pendingApplications,
    approvedApplications,
    rejectedApplications,
    fundsReleasedApplications,
    isLoading,
    totalCount: applications.length,
  }
}
