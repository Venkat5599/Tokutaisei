import { useAllApplications } from '../hooks/useAllApplications'
import { useScholarshipContract } from '../hooks/useScholarshipContract'
import { useState } from 'react'

const AdminPage = () => {
  const { applications, pendingApplications, approvedApplications, rejectedApplications, isLoading } = useAllApplications()
  const { isAdmin, approveApplication, rejectApplication, releaseFunds, depositFunds, isPending, CONTRACT_ADDRESS } = useScholarshipContract()
  const [processingId, setProcessingId] = useState<number | null>(null)

  const handleApprove = async (id: number) => {
    setProcessingId(id)
    try {
      await approveApplication(id)
      alert('Application approved successfully!')
    } catch (error) {
      console.error('Error approving:', error)
      alert('Error approving application')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReject = async (id: number) => {
    const reason = prompt('Enter rejection reason:')
    if (!reason) {
      alert('Rejection reason is required')
      return
    }
    
    setProcessingId(id)
    try {
      await rejectApplication(id, reason)
      alert('Application rejected successfully!')
    } catch (error) {
      console.error('Error rejecting:', error)
      alert('Error rejecting application')
    } finally {
      setProcessingId(null)
    }
  }

  const handleReleaseFunds = async (id: number) => {
    setProcessingId(id)
    try {
      await releaseFunds(id)
      alert('Funds released successfully!')
    } catch (error) {
      console.error('Error releasing funds:', error)
      alert('Error releasing funds')
    } finally {
      setProcessingId(null)
    }
  }

  const handleDeposit = async () => {
    const amount = prompt('Enter amount in ETH to deposit:')
    if (!amount) return
    
    try {
      await depositFunds(amount)
      alert('Funds deposited successfully!')
    } catch (error) {
      console.error('Error depositing:', error)
      alert('Error depositing funds')
    }
  }

  if (!isAdmin) {
    return (
      <div className="pt-28 pb-32 px-6 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-6xl text-red-400 mb-4 block">block</span>
          <h1 className="text-3xl font-headline font-bold text-white mb-2">Access Denied</h1>
          <p className="text-slate-400">You must be an admin to access this page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-28 pb-32 px-6 min-h-screen">
      {/* Decorative Background */}
      <div className="fixed top-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-red-500/10 rounded-full blur-[120px] -z-10"></div>

      {/* Header */}
      <header className="mb-12">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold text-white tracking-tighter mb-4 leading-none">
              Admin <span className="text-orange-400">Control Panel</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl">
              Manage scholarship applications, approve funding, and monitor system health
            </p>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Pending Review</p>
            <span className="material-symbols-outlined text-yellow-400 text-xl">pending_actions</span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-yellow-400">{isLoading ? '...' : pendingApplications.length}</h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Approved</p>
            <span className="material-symbols-outlined text-green-400 text-xl">check_circle</span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-green-400">{isLoading ? '...' : approvedApplications.length}</h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Rejected</p>
            <span className="material-symbols-outlined text-red-400 text-xl">cancel</span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-red-400">{isLoading ? '...' : rejectedApplications.length}</h3>
        </div>
        <div className="bg-gradient-to-br from-orange-900/20 to-slate-800/50 p-6 rounded-xl border border-orange-500/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-orange-300">Total Apps</p>
            <span className="material-symbols-outlined text-orange-400 text-xl">account_balance</span>
          </div>
          <h3 className="text-3xl font-headline font-bold text-orange-400">{isLoading ? '...' : applications.length}</h3>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Applications List */}
        <div className="xl:col-span-2">
          <section className="bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-orange-400 text-2xl">assignment</span>
                <div>
                  <h2 className="text-xl font-headline font-semibold text-white">Pending Applications</h2>
                  <p className="text-sm text-slate-400">Review and take action</p>
                </div>
              </div>
            </div>

            <div className="divide-y divide-white/5">
              {isLoading ? (
                <div className="p-12 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-4 block animate-spin">progress_activity</span>
                  Loading applications...
                </div>
              ) : pendingApplications.length === 0 ? (
                <div className="p-12 text-center text-slate-400">
                  <span className="material-symbols-outlined text-4xl mb-4 block">inbox</span>
                  No pending applications
                </div>
              ) : (
                pendingApplications.map((app) => (
                  <div key={app.id} className="p-6 hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-slate-700 flex items-center justify-center text-cyan-400 font-bold">
                          {app.name.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-headline font-bold text-white mb-1">{app.name}</h3>
                          <p className="text-sm text-slate-400 mb-2">
                            Applied on {new Date(Number(app.timestamp) * 1000).toLocaleDateString()}
                          </p>
                          <div className="flex items-center gap-4 text-xs">
                            <span className="flex items-center gap-1 text-slate-400">
                              <span className="material-symbols-outlined text-sm">school</span>
                              Score: {app.academicScore.toString()}
                            </span>
                            <span className="flex items-center gap-1 text-slate-400">
                              <span className="material-symbols-outlined text-sm">attach_money</span>
                              Income: ${app.income.toString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-xs font-bold uppercase">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleApprove(app.id)}
                        disabled={processingId === app.id || isPending}
                        className="flex-1 px-4 py-2 bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        {processingId === app.id ? 'Processing...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(app.id)}
                        disabled={processingId === app.id || isPending}
                        className="flex-1 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all font-medium text-sm flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">cancel</span>
                        {processingId === app.id ? 'Processing...' : 'Reject'}
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Approved Applications */}
          {approvedApplications.length > 0 && (
            <section className="mt-8 bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-headline font-semibold text-white flex items-center gap-2">
                  <span className="material-symbols-outlined text-green-400">check_circle</span>
                  Approved Applications
                </h2>
              </div>
              <div className="divide-y divide-white/5">
                {approvedApplications.map((app) => (
                  <div key={app.id} className="p-6 hover:bg-slate-800/30 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-headline font-bold text-white">{app.name}</h3>
                        <p className="text-sm text-slate-400">Score: {app.academicScore.toString()}</p>
                      </div>
                      <button
                        onClick={() => handleReleaseFunds(app.id)}
                        disabled={processingId === app.id || isPending}
                        className="px-4 py-2 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-50"
                      >
                        <span className="material-symbols-outlined text-sm">payments</span>
                        {processingId === app.id ? 'Processing...' : 'Release Funds'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          {/* Quick Actions */}
          <section className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-white/10">
            <h3 className="font-headline text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400">bolt</span>
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button
                onClick={handleDeposit}
                disabled={isPending}
                className="w-full px-4 py-3 bg-orange-500/10 text-orange-400 rounded-lg hover:bg-orange-500/20 transition-all font-medium text-sm flex items-center gap-2 disabled:opacity-50"
              >
                <span className="material-symbols-outlined">add_circle</span>
                Deposit Funds
              </button>
            </div>
          </section>

          {/* Contract Info */}
          <section className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-orange-500/20">
            <h3 className="font-headline text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400">contract</span>
              Smart Contract
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Contract Address</p>
                <code className="text-xs text-orange-400 font-headline break-all">{CONTRACT_ADDRESS}</code>
              </div>
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">Network</p>
                <p className="text-white">Sepolia Testnet</p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </div>
  )
}

export default AdminPage
