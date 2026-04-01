export interface Application {
  id: number
  studentAddress: string
  name: string
  email: string
  familyIncome: number
  marks: number
  ipfsDocumentHash: string
  status: 'Pending' | 'Approved' | 'Rejected' | 'FundsReleased'
  requestedAmount: string
  timestamp: number
  rejectionReason: string
}

export interface ContractMethods {
  applyForScholarship: (
    name: string,
    email: string,
    familyIncome: number,
    marks: number,
    ipfsHash: string,
    requestedAmount: string
  ) => any
  approveScholarship: (applicationId: number) => any
  rejectScholarship: (applicationId: number, reason: string) => any
  releaseFunds: (applicationId: number) => any
  getApplication: (applicationId: number) => any
  getContractBalance: () => any
}

declare global {
  interface Window {
    ethereum?: any
  }
}
