import { useState, useEffect } from 'react'
import { useScholarshipContract } from '../hooks/useScholarshipContract'
import { useAccount } from 'wagmi'
import { MultiStepForm } from '../components/MultiStepForm'

interface FormData {
  name: string; email: string; dateOfBirth: string; phone: string; address: string; city: string; state: string; zipCode: string; country: string;
  institution: string; program: string; yearOfStudy: string; expectedGraduation: string; gpa: string; previousEducation: string; achievements: string;
  income: string; requestedAmount: string; dependents: string; employmentStatus: string; otherAid: string; monthlyExpenses: string; reasonForNeed: string;
  guardianName: string; guardianPhone: string; guardianEmail: string; guardianRelation: string; guardianOccupation: string;
  reasonForScholarship: string; futureGoals: string; extracurriculars: string; communityService: string;
  academicScore: string;
}

const DashboardPage = () => {
  const { address } = useAccount()
  const { submitApplication, isPending } = useScholarshipContract()
  
  const [currentStep, setCurrentStep] = useState(1)
  const [hasActiveApp, setHasActiveApp] = useState(false)
  const [checkingActiveApp, setCheckingActiveApp] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '', email: '', dateOfBirth: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '',
    institution: '', program: '', yearOfStudy: '', expectedGraduation: '', gpa: '', previousEducation: '', achievements: '',
    income: '', requestedAmount: '', dependents: '', employmentStatus: '', otherAid: '', monthlyExpenses: '', reasonForNeed: '',
    guardianName: '', guardianPhone: '', guardianEmail: '', guardianRelation: '', guardianOccupation: '',
    reasonForScholarship: '', futureGoals: '', extracurriculars: '', communityService: '',
    academicScore: ''
  })
  
  const [documents, setDocuments] = useState<{ transcript: File | null; incomeProof: File | null; idProof: File | null; recommendation: File | null }>({
    transcript: null, incomeProof: null, idProof: null, recommendation: null
  })
  
  const [uploadedHashes, setUploadedHashes] = useState<{ transcript: string; incomeProof: string; idProof: string; recommendation: string }>({
    transcript: '', incomeProof: '', idProof: '', recommendation: ''
  })
  
  const [uploading, setUploading] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  // Check if user has active application
  const checkActiveApplication = async () => {
    if (!address) return
    
    setCheckingActiveApp(true)
    try {
      const response = await fetch(`http://localhost:5000/api/student/${address}/applications`)
      const data = await response.json()
      
      if (response.ok && data.applications) {
        // Check if any application is pending or approved (active)
        const activeApp = data.applications.find((app: any) => app.status === 0 || app.status === 1)
        setHasActiveApp(!!activeApp)
      }
    } catch (error) {
      console.error('Error checking active application:', error)
    } finally {
      setCheckingActiveApp(false)
    }
  }

  // Check on mount and when address changes
  useEffect(() => {
    checkActiveApplication()
  }, [address])

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = async (file: File, type: keyof typeof documents) => {
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const response = await fetch('http://localhost:5000/api/upload-document', { method: 'POST', body: formData })
      const data = await response.json()
      if (response.ok) {
        setUploadedHashes(prev => ({ ...prev, [type]: data.ipfs_hash }))
        setDocuments(prev => ({ ...prev, [type]: file }))
      } else {
        alert(`Failed to upload ${type}: ${data.error || 'Unknown error'}`)
      }
    } catch (error) {
      alert(`Error uploading ${type}: ${error instanceof Error ? error.message : 'Network error'}`)
    } finally {
      setUploading(false)
    }
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: return !!(formData.name && formData.email && formData.dateOfBirth && formData.phone && formData.address && formData.city && formData.state && formData.zipCode && formData.country)
      case 2: return !!(formData.institution && formData.program && formData.yearOfStudy && formData.gpa && formData.academicScore)
      case 3: return !!(formData.income && formData.requestedAmount && formData.reasonForNeed)
      case 4: return !!(formData.guardianName && formData.guardianPhone && formData.guardianRelation)
      case 5: return !!(formData.reasonForScholarship && formData.futureGoals)
      case 6: return !!(uploadedHashes.transcript && uploadedHashes.incomeProof && uploadedHashes.idProof)
      case 7: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7))
    } else {
      alert('Please fill in all required fields before proceeding.')
    }
  }

  const handlePrev = () => setCurrentStep(prev => Math.max(prev - 1, 1))

  const handleSubmit = async () => {
    if (!address) {
      alert('Please connect your wallet first')
      return
    }

    // Validate data before submission
    if (!formData.name || !formData.email || !formData.income || !formData.academicScore || !formData.requestedAmount) {
      alert('Please fill in all required fields')
      return
    }

    // Validate academic score
    const score = parseInt(formData.academicScore)
    if (isNaN(score) || score < 0 || score > 100) {
      alert('Academic score must be between 0 and 100')
      return
    }

    // Validate income
    const income = parseInt(formData.income)
    if (isNaN(income) || income < 0) {
      alert('Please enter a valid income amount')
      return
    }

    // Validate requested amount (must be in Wei)
    const requestedAmount = formData.requestedAmount
    if (!requestedAmount || requestedAmount === '0') {
      alert('Please enter a valid requested amount in Wei')
      return
    }

    try {
      console.log('Creating metadata...')
      const metadata = {
        personalInfo: { name: formData.name, email: formData.email, dateOfBirth: formData.dateOfBirth, phone: formData.phone, address: formData.address, city: formData.city, state: formData.state, zipCode: formData.zipCode, country: formData.country },
        academicInfo: { institution: formData.institution, program: formData.program, yearOfStudy: formData.yearOfStudy, expectedGraduation: formData.expectedGraduation, gpa: formData.gpa, previousEducation: formData.previousEducation, achievements: formData.achievements, academicScore: formData.academicScore },
        financialInfo: { income: formData.income, requestedAmount: formData.requestedAmount, dependents: formData.dependents, employmentStatus: formData.employmentStatus, otherAid: formData.otherAid, monthlyExpenses: formData.monthlyExpenses, reasonForNeed: formData.reasonForNeed },
        guardianInfo: { name: formData.guardianName, phone: formData.guardianPhone, email: formData.guardianEmail, relation: formData.guardianRelation, occupation: formData.guardianOccupation },
        essays: { reasonForScholarship: formData.reasonForScholarship, futureGoals: formData.futureGoals, extracurriculars: formData.extracurriculars, communityService: formData.communityService },
        documents: { transcript: uploadedHashes.transcript, incomeProof: uploadedHashes.incomeProof, idProof: uploadedHashes.idProof, recommendation: uploadedHashes.recommendation }
      }

      console.log('Uploading metadata to IPFS...')
      const metadataResponse = await fetch('http://localhost:5000/api/upload-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ metadata, name: `${formData.name}-application` })
      })
      const metadataData = await metadataResponse.json()
      
      if (!metadataResponse.ok) {
        throw new Error(metadataData.error || 'Failed to upload metadata')
      }

      console.log('Metadata uploaded:', metadataData.ipfs_hash)
      console.log('Submitting to blockchain with:', {
        name: formData.name,
        email: formData.email,
        income: income,
        academicScore: score,
        ipfsHash: metadataData.ipfs_hash,
        requestedAmount: requestedAmount
      })

      await submitApplication(
        formData.name,
        formData.email,
        income,
        score,
        metadataData.ipfs_hash,
        parseInt(requestedAmount)
      )
      
      setSubmitStatus('success')
      setCurrentStep(1)
      setFormData({ name: '', email: '', dateOfBirth: '', phone: '', address: '', city: '', state: '', zipCode: '', country: '', institution: '', program: '', yearOfStudy: '', expectedGraduation: '', gpa: '', previousEducation: '', achievements: '', income: '', requestedAmount: '', dependents: '', employmentStatus: '', otherAid: '', monthlyExpenses: '', reasonForNeed: '', guardianName: '', guardianPhone: '', guardianEmail: '', guardianRelation: '', guardianOccupation: '', reasonForScholarship: '', futureGoals: '', extracurriculars: '', communityService: '', academicScore: '' })
      setDocuments({ transcript: null, incomeProof: null, idProof: null, recommendation: null })
      setUploadedHashes({ transcript: '', incomeProof: '', idProof: '', recommendation: '' })
    } catch (error: any) {
      console.error('Submission error:', error)
      
      // Parse error message
      let errorMessage = 'Error submitting application. '
      
      if (error.message) {
        if (error.message.includes('Already have an active application')) {
          errorMessage = 'You already have an active application. Please wait for it to be reviewed or rejected before submitting a new one.'
        } else if (error.message.includes('Marks cannot exceed 100')) {
          errorMessage = 'Academic score cannot exceed 100. Please check your input.'
        } else if (error.message.includes('Name cannot be empty')) {
          errorMessage = 'Name is required. Please fill in your name.'
        } else if (error.message.includes('Email cannot be empty')) {
          errorMessage = 'Email is required. Please fill in your email.'
        } else if (error.message.includes('Requested amount must be greater than 0')) {
          errorMessage = 'Requested amount must be greater than 0 Wei.'
        } else if (error.message.includes('User rejected')) {
          errorMessage = 'Transaction was rejected. Please try again.'
        } else {
          errorMessage += error.message
        }
      }
      
      alert(errorMessage)
      setSubmitStatus('error')
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Full Legal Name *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Enter your full name" type="text" value={formData.name} onChange={(e) => updateFormData('name', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Email Address *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="your.email@example.com" type="email" value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Date of Birth *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" type="date" value={formData.dateOfBirth} onChange={(e) => updateFormData('dateOfBirth', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Phone Number *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="+1 (555) 123-4567" type="tel" value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} required /></div>
              <div className="space-y-2 md:col-span-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Street Address *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="123 Main Street" type="text" value={formData.address} onChange={(e) => updateFormData('address', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">City *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="City" type="text" value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">State/Province *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="State" type="text" value={formData.state} onChange={(e) => updateFormData('state', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">ZIP/Postal Code *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="12345" type="text" value={formData.zipCode} onChange={(e) => updateFormData('zipCode', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Country *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Country" type="text" value={formData.country} onChange={(e) => updateFormData('country', e.target.value)} required /></div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Academic Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Institution Name *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="University/College Name" type="text" value={formData.institution} onChange={(e) => updateFormData('institution', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Program/Major *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Computer Science" type="text" value={formData.program} onChange={(e) => updateFormData('program', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Year of Study *</label><select className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" value={formData.yearOfStudy} onChange={(e) => updateFormData('yearOfStudy', e.target.value)} required><option value="">Select Year</option><option value="Freshman">Freshman</option><option value="Sophomore">Sophomore</option><option value="Junior">Junior</option><option value="Senior">Senior</option><option value="Graduate">Graduate</option></select></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Expected Graduation</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" type="month" value={formData.expectedGraduation} onChange={(e) => updateFormData('expectedGraduation', e.target.value)} /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Current GPA *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="3.5" type="number" step="0.01" max="4.0" value={formData.gpa} onChange={(e) => updateFormData('gpa', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Academic Score (%) *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="85" type="number" max="100" value={formData.academicScore} onChange={(e) => updateFormData('academicScore', e.target.value)} required /></div>
              <div className="space-y-2 md:col-span-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Previous Education</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="High school, previous degrees..." rows={3} value={formData.previousEducation} onChange={(e) => updateFormData('previousEducation', e.target.value)} /></div>
              <div className="space-y-2 md:col-span-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Academic Achievements</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Awards, honors, dean's list..." rows={3} value={formData.achievements} onChange={(e) => updateFormData('achievements', e.target.value)} /></div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Financial Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Annual Household Income ($) *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="50000" type="number" value={formData.income} onChange={(e) => updateFormData('income', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Requested Amount (Wei) *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="1000000000000000" type="number" value={formData.requestedAmount} onChange={(e) => updateFormData('requestedAmount', e.target.value)} required /><p className="text-xs text-slate-500 mt-1">1 ETH = 1000000000000000000 Wei</p></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Number of Dependents</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="3" type="number" value={formData.dependents} onChange={(e) => updateFormData('dependents', e.target.value)} /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Employment Status</label><select className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" value={formData.employmentStatus} onChange={(e) => updateFormData('employmentStatus', e.target.value)}><option value="">Select Status</option><option value="Unemployed">Unemployed</option><option value="Part-time">Part-time</option><option value="Full-time">Full-time</option></select></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Other Financial Aid ($)</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="5000" type="number" value={formData.otherAid} onChange={(e) => updateFormData('otherAid', e.target.value)} /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Monthly Expenses ($)</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="2000" type="number" value={formData.monthlyExpenses} onChange={(e) => updateFormData('monthlyExpenses', e.target.value)} /></div>
              <div className="space-y-2 md:col-span-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Reason for Financial Need *</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Explain your financial situation..." rows={4} value={formData.reasonForNeed} onChange={(e) => updateFormData('reasonForNeed', e.target.value)} required /></div>
            </div>
          </div>
        )
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Guardian Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Guardian Name *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Parent/Guardian Name" type="text" value={formData.guardianName} onChange={(e) => updateFormData('guardianName', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Guardian Phone *</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="+1 (555) 123-4567" type="tel" value={formData.guardianPhone} onChange={(e) => updateFormData('guardianPhone', e.target.value)} required /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Guardian Email</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="guardian@example.com" type="email" value={formData.guardianEmail} onChange={(e) => updateFormData('guardianEmail', e.target.value)} /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Relationship *</label><select className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" value={formData.guardianRelation} onChange={(e) => updateFormData('guardianRelation', e.target.value)} required><option value="">Select Relationship</option><option value="Parent">Parent</option><option value="Legal Guardian">Legal Guardian</option><option value="Grandparent">Grandparent</option><option value="Other">Other</option></select></div>
              <div className="space-y-2 md:col-span-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Guardian Occupation</label><input className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Occupation" type="text" value={formData.guardianOccupation} onChange={(e) => updateFormData('guardianOccupation', e.target.value)} /></div>
            </div>
          </div>
        )
      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Essays & Statements</h2>
            <div className="space-y-6">
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Why Do You Deserve This Scholarship? * (500 words)</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Explain why you deserve this scholarship..." rows={6} value={formData.reasonForScholarship} onChange={(e) => updateFormData('reasonForScholarship', e.target.value)} required /><p className="text-xs text-slate-500">{formData.reasonForScholarship.split(' ').filter(w => w).length} / 500 words</p></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Future Goals & Career Aspirations * (300 words)</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Describe your future goals..." rows={5} value={formData.futureGoals} onChange={(e) => updateFormData('futureGoals', e.target.value)} required /><p className="text-xs text-slate-500">{formData.futureGoals.split(' ').filter(w => w).length} / 300 words</p></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Extracurricular Activities</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Clubs, sports, leadership roles..." rows={4} value={formData.extracurriculars} onChange={(e) => updateFormData('extracurriculars', e.target.value)} /></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Community Service & Volunteer Work</label><textarea className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white" placeholder="Volunteer activities, community involvement..." rows={4} value={formData.communityService} onChange={(e) => updateFormData('communityService', e.target.value)} /></div>
            </div>
          </div>
        )
      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Document Uploads</h2>
            <div className="space-y-6">
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Academic Transcript *</label><div className="border-2 border-dashed border-slate-600/30 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-colors bg-slate-800/30"><input type="file" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'transcript')} className="hidden" id="transcript-upload" accept=".pdf" /><label htmlFor="transcript-upload" className="cursor-pointer"><span className="material-symbols-outlined text-3xl text-slate-400 mb-2 block">description</span><p className="text-white font-medium">{documents.transcript ? documents.transcript.name : 'Upload Transcript (PDF)'}</p>{uploadedHashes.transcript && <div className="mt-2 inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-xs text-green-400"><span className="material-symbols-outlined text-sm">check_circle</span>Uploaded</div>}</label></div></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Income Proof *</label><div className="border-2 border-dashed border-slate-600/30 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-colors bg-slate-800/30"><input type="file" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'incomeProof')} className="hidden" id="income-upload" accept=".pdf,.jpg,.png" /><label htmlFor="income-upload" className="cursor-pointer"><span className="material-symbols-outlined text-3xl text-slate-400 mb-2 block">receipt_long</span><p className="text-white font-medium">{documents.incomeProof ? documents.incomeProof.name : 'Upload Income Proof (PDF/Image)'}</p>{uploadedHashes.incomeProof && <div className="mt-2 inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-xs text-green-400"><span className="material-symbols-outlined text-sm">check_circle</span>Uploaded</div>}</label></div></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">ID Proof *</label><div className="border-2 border-dashed border-slate-600/30 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-colors bg-slate-800/30"><input type="file" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'idProof')} className="hidden" id="id-upload" accept=".pdf,.jpg,.png" /><label htmlFor="id-upload" className="cursor-pointer"><span className="material-symbols-outlined text-3xl text-slate-400 mb-2 block">badge</span><p className="text-white font-medium">{documents.idProof ? documents.idProof.name : 'Upload ID (PDF/Image)'}</p>{uploadedHashes.idProof && <div className="mt-2 inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-xs text-green-400"><span className="material-symbols-outlined text-sm">check_circle</span>Uploaded</div>}</label></div></div>
              <div className="space-y-2"><label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Recommendation Letter (Optional)</label><div className="border-2 border-dashed border-slate-600/30 rounded-xl p-8 text-center hover:border-cyan-400/50 transition-colors bg-slate-800/30"><input type="file" onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'recommendation')} className="hidden" id="rec-upload" accept=".pdf" /><label htmlFor="rec-upload" className="cursor-pointer"><span className="material-symbols-outlined text-3xl text-slate-400 mb-2 block">mail</span><p className="text-white font-medium">{documents.recommendation ? documents.recommendation.name : 'Upload Recommendation (PDF)'}</p>{uploadedHashes.recommendation && <div className="mt-2 inline-flex items-center gap-2 bg-green-500/10 px-3 py-1 rounded-full text-xs text-green-400"><span className="material-symbols-outlined text-sm">check_circle</span>Uploaded</div>}</label></div></div>
              {uploading && <p className="text-cyan-400 text-center">Uploading to IPFS...</p>}
            </div>
          </div>
        )
      case 7:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4">Review & Submit</h2>
            <div className="space-y-4 bg-slate-800/30 rounded-xl p-6">
              <div className="border-b border-slate-700 pb-4"><h3 className="text-cyan-400 font-bold mb-2">Personal Information</h3><p className="text-sm text-slate-300">Name: {formData.name}</p><p className="text-sm text-slate-300">Email: {formData.email}</p><p className="text-sm text-slate-300">Phone: {formData.phone}</p><p className="text-sm text-slate-300">Address: {formData.address}, {formData.city}, {formData.state} {formData.zipCode}, {formData.country}</p></div>
              <div className="border-b border-slate-700 pb-4"><h3 className="text-cyan-400 font-bold mb-2">Academic Details</h3><p className="text-sm text-slate-300">Institution: {formData.institution}</p><p className="text-sm text-slate-300">Program: {formData.program}</p><p className="text-sm text-slate-300">Year: {formData.yearOfStudy}</p><p className="text-sm text-slate-300">GPA: {formData.gpa}</p><p className="text-sm text-slate-300">Academic Score: {formData.academicScore}%</p></div>
              <div className="border-b border-slate-700 pb-4"><h3 className="text-cyan-400 font-bold mb-2">Financial Information</h3><p className="text-sm text-slate-300">Annual Income: ${formData.income}</p><p className="text-sm text-slate-300">Requested Amount: {formData.requestedAmount} Wei</p></div>
              <div className="border-b border-slate-700 pb-4"><h3 className="text-cyan-400 font-bold mb-2">Guardian Information</h3><p className="text-sm text-slate-300">Name: {formData.guardianName}</p><p className="text-sm text-slate-300">Phone: {formData.guardianPhone}</p><p className="text-sm text-slate-300">Relationship: {formData.guardianRelation}</p></div>
              <div className="border-b border-slate-700 pb-4"><h3 className="text-cyan-400 font-bold mb-2">Documents</h3><p className="text-sm text-slate-300">✓ Transcript: {uploadedHashes.transcript.substring(0, 15)}...</p><p className="text-sm text-slate-300">✓ Income Proof: {uploadedHashes.incomeProof.substring(0, 15)}...</p><p className="text-sm text-slate-300">✓ ID Proof: {uploadedHashes.idProof.substring(0, 15)}...</p>{uploadedHashes.recommendation && <p className="text-sm text-slate-300">✓ Recommendation: {uploadedHashes.recommendation.substring(0, 15)}...</p>}</div>
              <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4"><p className="text-sm text-cyan-400">By submitting this application, you confirm that all information provided is accurate and complete. Your application will be recorded on the blockchain and cannot be modified after submission.</p></div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="flex pt-20 pb-24 lg:pb-0">
      <aside className="h-screen w-64 fixed left-0 top-0 pt-24 bg-slate-900 bg-slate-800/50 hidden lg:flex flex-col gap-2 p-4 font-headline font-medium z-40">
        <div className="mb-8 px-4"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-cyan-400 font-bold">S</div><div><div className="text-cyan-400 text-sm font-bold">Scholar Dashboard</div><div className="text-slate-500 text-xs">Verified Node</div></div></div></div>
        <a className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-500 transition-all ease-in-out duration-300" href="/dashboard"><span className="material-symbols-outlined">assignment</span><span>Applications</span></a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-all ease-in-out duration-300" href="/documents"><span className="material-symbols-outlined">description</span><span>My Documents</span></a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-all ease-in-out duration-300" href="/settings"><span className="material-symbols-outlined">settings</span><span>Settings</span></a>
      </aside>

      <main className="flex-1 lg:ml-64 p-6 md:p-12 max-w-7xl mx-auto">
        <header className="mb-12"><h1 className="font-headline text-5xl font-bold tracking-tight text-white mb-2">New Scholarship Application</h1><p className="text-slate-400 max-w-2xl">Complete all steps to submit your comprehensive scholarship application. All data is securely stored on IPFS and blockchain.</p></header>

        {hasActiveApp && (
          <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg text-yellow-400">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              <span>You already have an active application. You cannot submit a new application until your current one is reviewed.</span>
            </div>
          </div>
        )}

        {submitStatus === 'success' && <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">Application submitted successfully! Check the Transparency page to view your application.</div>}
        {submitStatus === 'error' && <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">Error submitting application. Please try again.</div>}

        <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-8 border border-white/10">
          <MultiStepForm currentStep={currentStep} totalSteps={7} onNext={handleNext} onPrev={handlePrev} onSubmit={handleSubmit} isLastStep={currentStep === 7} isFirstStep={currentStep === 1} canProceed={validateStep(currentStep) && !hasActiveApp} />
          <div className="mt-8">{renderStep()}</div>
        </div>

        <section className="mt-8 bg-slate-800/50 rounded-xl p-6 border border-white/10"><div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"><div><h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Network Status</h3><div className="flex items-center gap-2 text-cyan-400"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span><span className="font-headline text-sm">Sepolia Connected</span></div></div><div className="flex-1 md:text-right"><h3 className="text-xs font-bold tracking-widest text-slate-400 uppercase mb-2">Contract Address</h3><code className="bg-slate-900/50 px-4 py-2 rounded text-purple-400 font-headline text-sm break-all">0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6</code></div></div></section>
      </main>

      <div className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-8 pt-4 bg-slate-900/80 backdrop-blur-lg border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 rounded-t-2xl">
        <a className="flex flex-col items-center justify-center text-slate-500 active:bg-slate-800 scale-110 duration-300 ease-out" href="/"><span className="material-symbols-outlined">home</span><span className="text-[10px] uppercase tracking-widest mt-1">Home</span></a>
        <a className="flex flex-col items-center justify-center text-cyan-400 bg-cyan-500/10 rounded-xl px-4 py-1 active:bg-slate-800 scale-110 duration-300 ease-out" href="/dashboard"><span className="material-symbols-outlined">dashboard</span><span className="text-[10px] uppercase tracking-widest mt-1">Dash</span></a>
        <a className="flex flex-col items-center justify-center text-slate-500 active:bg-slate-800 scale-110 duration-300 ease-out" href="/transparency"><span className="material-symbols-outlined">account_balance_wallet</span><span className="text-[10px] uppercase tracking-widest mt-1">Vault</span></a>
      </div>
    </div>
  )
}

export default DashboardPage
