const SettingsPage = () => {
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
        <a className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-300 hover:bg-slate-800/80 transition-all ease-in-out duration-300" href="/documents">
          <span className="material-symbols-outlined">description</span>
          <span>My Documents</span>
        </a>
        <a className="flex items-center gap-3 px-4 py-3 bg-cyan-500/10 text-cyan-400 border-r-4 border-cyan-500 transition-all ease-in-out duration-300" href="/settings">
          <span className="material-symbols-outlined">settings</span>
          <span>Settings</span>
        </a>
      </aside>

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 p-6 md:p-12 max-w-7xl mx-auto">
        <header className="mb-12">
          <h1 className="font-headline text-5xl font-bold tracking-tight text-white mb-2">
            Settings
          </h1>
          <p className="text-slate-400 max-w-2xl">
            Manage your account preferences and blockchain settings
          </p>
        </header>

        <div className="space-y-6">
          {/* Profile Settings */}
          <section className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-8 border border-white/10">
            <h2 className="font-headline text-2xl font-bold text-white mb-6">Profile Settings</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Display Name
                  </label>
                  <input
                    className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white"
                    placeholder="Your name"
                    type="text"
                    defaultValue="Scholar User"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-slate-800/50 border-none focus:ring-0 focus:bg-slate-700/50 border-b-2 border-transparent focus:border-cyan-400 transition-all p-4 rounded-t-lg text-white"
                    placeholder="your@email.com"
                    type="email"
                    defaultValue="scholar@example.com"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Wallet Settings */}
          <section className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-8 border border-white/10">
            <h2 className="font-headline text-2xl font-bold text-white mb-6">Wallet Settings</h2>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-bold text-white mb-1">Connected Wallet</p>
                  <code className="text-sm text-cyan-400">0x1E00...B089B7</code>
                </div>
                <button className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all">
                  Disconnect
                </button>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-bold text-white mb-1">Network</p>
                  <p className="text-sm text-slate-400">Sepolia Testnet</p>
                </div>
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-8 border border-white/10">
            <h2 className="font-headline text-2xl font-bold text-white mb-6">Notifications</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-bold text-white mb-1">Application Updates</p>
                  <p className="text-sm text-slate-400">Get notified about application status changes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-bold text-white mb-1">Transaction Alerts</p>
                  <p className="text-sm text-slate-400">Receive alerts for blockchain transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div>
                  <p className="font-bold text-white mb-1">Email Notifications</p>
                  <p className="text-sm text-slate-400">Send notifications to your email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </div>
          </section>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-cyan-600 text-slate-900 font-bold rounded-lg hover:shadow-[0_0_20px_rgba(71,214,255,0.3)] transition-all">
              Save Changes
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
