import { useAllApplications } from '../hooks/useAllApplications'
import { formatEther } from 'viem'

const TransparencyPage = () => {
  const { applications, isLoading, totalCount, pendingApplications, approvedApplications, rejectedApplications } = useAllApplications()

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-400 text-[10px] font-bold uppercase tracking-tight">
            <span className="material-symbols-outlined text-xs">hourglass_empty</span>
            Pending
          </span>
        )
      case 1:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-[10px] font-bold uppercase tracking-tight">
            <span className="material-symbols-outlined text-xs">check_circle</span>
            Approved
          </span>
        )
      case 2:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-bold uppercase tracking-tight">
            <span className="material-symbols-outlined text-xs">cancel</span>
            Rejected
          </span>
        )
      case 3:
        return (
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-tight">
            <span className="material-symbols-outlined text-xs">payments</span>
            Funds Released
          </span>
        )
      default:
        return null
    }
  }

  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000)
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' UTC'
    }
  }

  return (
    <div className="pt-28 pb-32 lg:pl-72 px-6 min-h-screen">
      {/* Decorative Background */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-purple-500/10 rounded-full blur-[120px] -z-10"></div>

      {/* Hero Header */}
      <header className="mb-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-headline font-bold text-white tracking-tighter mb-6 leading-none">
            Transparency <span className="text-cyan-400">Ledger</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
            A real-time, immutable record of all scholarship applications processed through the Ethereal protocol. 
            Every state change is hashed and secured on the Sepolia testnet.
          </p>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Total Entries</p>
          <h3 className="text-3xl font-headline font-bold text-cyan-400">{isLoading ? '...' : totalCount}</h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Pending</p>
          <h3 className="text-3xl font-headline font-bold text-yellow-400">{isLoading ? '...' : pendingApplications.length}</h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Approved</p>
          <h3 className="text-3xl font-headline font-bold text-green-400">{isLoading ? '...' : approvedApplications.length}</h3>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-xl border border-white/10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 mb-2">Rejected</p>
          <h3 className="text-3xl font-headline font-bold text-red-400">{isLoading ? '...' : rejectedApplications.length}</h3>
        </div>
      </section>

      {/* Ledger Table */}
      <section className="bg-slate-900/60 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <div className="p-8 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-cyan-400 text-3xl">shield_with_heart</span>
            <div>
              <h2 className="text-xl font-headline font-semibold text-white">Public Audit Log</h2>
              <p className="text-sm text-slate-400">Live decentralized data stream</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-4 block animate-spin">progress_activity</span>
              Loading blockchain data...
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center text-slate-400">
              <span className="material-symbols-outlined text-4xl mb-4 block">inbox</span>
              No applications found. Submit your first application!
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-800/50">
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-500">Timestamp</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-500">Applicant</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-500">Wallet Address</th>
                  <th className="px-8 py-4 text-[10px] uppercase tracking-widest text-slate-500 text-right">Blockchain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {applications.map((app) => {
                  const { date, time } = formatTimestamp(app.timestamp)
                  return (
                    <tr key={app.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="px-8 py-6">
                        <span className="font-headline text-sm font-medium text-white">{date}</span>
                        <span className="block text-[10px] text-slate-500">{time}</span>
                      </td>
                      <td className="px-8 py-6">
                        <span className="text-sm text-white font-medium">{app.name}</span>
                        <span className="block text-xs text-slate-400">Score: {app.academicScore.toString()}</span>
                      </td>
                      <td className="px-8 py-6">
                        {getStatusBadge(app.status)}
                      </td>
                      <td className="px-8 py-6">
                        <code className="text-xs text-slate-400 font-headline bg-slate-800/50 px-2 py-1 rounded">
                          {app.applicant.substring(0, 6)}...{app.applicant.substring(38)}
                        </code>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <a 
                          className="text-cyan-400 hover:text-cyan-300 text-xs uppercase tracking-wider flex items-center justify-end gap-1 transition-all group" 
                          href={`https://sepolia.etherscan.io/address/${app.applicant}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View on Sepolia
                          <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">open_in_new</span>
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>

        <div className="p-8 border-t border-white/10 flex items-center justify-between">
          <p className="text-xs text-slate-500 uppercase tracking-widest">
            Showing {applications.length} {applications.length === 1 ? 'entry' : 'entries'}
          </p>
        </div>
      </section>

      {/* Proof of Integrity */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-cyan-500/10 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all"></div>
          <span className="material-symbols-outlined text-4xl text-cyan-400 mb-4">verified</span>
          <h3 className="text-xl font-headline font-bold mb-2 text-white">Zero-Knowledge Integrity</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            All personal identifying information is stripped before ledger entry. Only cryptographic hashes and wallet metadata remain, 
            ensuring 100% privacy with 100% auditable truth.
          </p>
        </div>
        <div className="bg-slate-800/50 p-8 rounded-2xl border border-purple-500/10 relative overflow-hidden group">
          <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-all"></div>
          <span className="material-symbols-outlined text-4xl text-purple-400 mb-4">history_edu</span>
          <h3 className="text-xl font-headline font-bold mb-2 text-white">Audit History</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            The Ethereal Ledger is decentralized. You can download the complete historical manifest or query our GraphQL node 
            for external validation at any time.
          </p>
        </div>
      </section>
    </div>
  )
}

export default TransparencyPage
