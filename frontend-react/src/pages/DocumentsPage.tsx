const DocumentsPage = () => {
  return (
    <div className="flex pt-20 pb-24 lg:pb-0">
      {/* Side Navigation */}
      <aside className="h-screen w-64 fixed left-0 top-0 pt-24 bg-slate-900 bg-slate-800/50 hidden lg:flex flex-col gap-2 p-4 font-headline font-medium z-40">
        <div className="mb-8 px-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-700 overflow-hidden flex items-center justify-center text-cyan-400 font-bold">
              S
            </div>
            <div>
              <div className="text-cyan-400 text-sm font-bold">Scholar Dashboard</div>
              <div className="text-slate-500 text-xs">Verified Node</div>
            </div>
          </div>
        </div>

        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-all ease-in-out duration-300" href="/dashboard">
          <span className="material-symbols-outlined">assignment</span>
          <span>Applications</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-500 transition-all ease-in-out duration-300" href="/documents">
          <span className="material-symbols-outlined">description</span>
          <span>My Documents</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-all ease-in-out duration-300" href="/settings">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white mb-2">
            My Documents
          </h1>
          <p className="text-slate-400 max-w-2xl">
            View and manage all your uploaded documents stored on IPFS
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Document Card 1 */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-cyan-400 text-2xl">description</span>
              </div>
              <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">Verified</span>
            </div>
            <h3 className="font-headline font-bold text-white mb-1">Academic Transcript</h3>
            <p className="text-sm text-slate-400 mb-4">Uploaded on Oct 24, 2023</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="material-symbols-outlined text-sm">hub</span>
              <code className="truncate">QmX7...9abc</code>
            </div>
          </div>

          {/* Document Card 2 */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-400 text-2xl">badge</span>
              </div>
              <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">Verified</span>
            </div>
            <h3 className="font-headline font-bold text-white mb-1">Identity Proof</h3>
            <p className="text-sm text-slate-400 mb-4">Uploaded on Oct 20, 2023</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="material-symbols-outlined text-sm">hub</span>
              <code className="truncate">QmY8...4def</code>
            </div>
          </div>

          {/* Document Card 3 */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-orange-400 text-2xl">attach_money</span>
              </div>
              <span className="text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded-full">Pending</span>
            </div>
            <h3 className="font-headline font-bold text-white mb-1">Income Certificate</h3>
            <p className="text-sm text-slate-400 mb-4">Uploaded on Oct 25, 2023</p>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="material-symbols-outlined text-sm">hub</span>
              <code className="truncate">QmZ9...7ghi</code>
            </div>
          </div>

          {/* Upload New Document Card */}
          <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-6 border-2 border-dashed border-slate-600/30 hover:border-cyan-400/50 transition-all cursor-pointer group">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-12 h-12 rounded-lg bg-slate-800/50 flex items-center justify-center mb-4 group-hover:bg-cyan-500/10 transition-all">
                <span className="material-symbols-outlined text-slate-400 group-hover:text-cyan-400 text-2xl">add</span>
              </div>
              <h3 className="font-headline font-bold text-white mb-1">Upload New</h3>
              <p className="text-sm text-slate-400">Add more documents</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DocumentsPage
