import { useState } from 'react'
import { Code, BookOpen, Shield, Layers, Zap, FileText, GitBranch, Database } from 'lucide-react'

const DocumentationPage = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BookOpen },
    { id: 'architecture', label: 'Architecture', icon: Layers },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'api', label: 'API Reference', icon: Code },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'deployment', label: 'Deployment', icon: GitBranch },
    { id: 'data', label: 'Data Flow', icon: Database },
    { id: 'guides', label: 'Guides', icon: FileText },
  ]

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4 bg-cyan-500/10 px-6 py-3 rounded-full border border-cyan-500/20">
            <BookOpen className="w-6 h-6 text-cyan-400" />
            <span className="text-cyan-400 font-bold tracking-wider">DOCUMENTATION</span>
          </div>
          <h1 className="font-headline text-6xl font-bold tracking-tight text-white mb-4">
            Complete Project Documentation
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Everything you need to know about the Blockchain-Based Transparent Scholarship System
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex gap-2 min-w-max bg-slate-900/60 backdrop-blur-xl p-2 rounded-xl border border-white/10">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-cyan-500 text-black'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* Content */}
        <div className="bg-slate-900/60 backdrop-blur-xl rounded-xl p-8 border border-white/10">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Project Overview</h2>
                <p className="text-slate-300 text-lg mb-4">
                  A complete, production-ready blockchain-based scholarship management system built on Ethereum that ensures 100% transparency, zero corruption, and automated fund distribution.
                </p>
                <p className="text-slate-300 mb-4">
                  This system revolutionizes scholarship distribution by leveraging blockchain technology to create a completely transparent, corruption-free platform. Unlike traditional systems that rely on centralized databases and manual processes, our solution uses smart contracts to automate decision-making while maintaining an immutable record of all transactions.
                </p>
              </div>

              <div className="bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg p-6 border border-red-500/20">
                <h3 className="text-2xl font-bold text-red-400 mb-4">The Problem: Traditional Scholarship Systems</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Lack of Transparency</div>
                        <div className="text-slate-400">Decisions made behind closed doors with no public record or accountability</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Corruption & Favoritism</div>
                        <div className="text-slate-400">Manual processes allow for bias, bribery, and unfair advantages</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Processing Delays</div>
                        <div className="text-slate-400">Paper-based applications and manual reviews cause weeks of delays</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">No Accountability</div>
                        <div className="text-slate-400">Once decisions are made, there's no way to verify fairness or appeal</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Fund Mismanagement</div>
                        <div className="text-slate-400">No real-time tracking of scholarship funds or distributions</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Limited Access</div>
                        <div className="text-slate-400">Geographic and institutional barriers prevent equal opportunity</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Data Manipulation</div>
                        <div className="text-slate-400">Centralized databases can be altered, deleted, or hacked</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-red-400 mt-1">✗</span>
                      <div>
                        <div className="font-bold">Trust Issues</div>
                        <div className="text-slate-400">Students and donors have no way to verify the process integrity</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500/10 to-cyan-500/10 rounded-lg p-6 border border-green-500/20">
                <h3 className="text-2xl font-bold text-green-400 mb-4">Our Solution: Blockchain-Powered Transparency</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Complete Transparency</div>
                        <div className="text-slate-400">Every application, decision, and fund transfer recorded on blockchain</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Zero Corruption</div>
                        <div className="text-slate-400">Smart contracts execute automatically based on predefined rules</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Instant Processing</div>
                        <div className="text-slate-400">Automated workflows reduce processing time from weeks to minutes</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Full Accountability</div>
                        <div className="text-slate-400">Immutable blockchain records provide complete audit trail</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3 text-slate-300 text-sm">
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Real-Time Tracking</div>
                        <div className="text-slate-400">Anyone can verify fund balances and distributions instantly</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Global Access</div>
                        <div className="text-slate-400">Anyone with internet and a wallet can apply from anywhere</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Tamper-Proof</div>
                        <div className="text-slate-400">Blockchain ensures data cannot be altered or deleted</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Cryptographic Trust</div>
                        <div className="text-slate-400">Mathematical proof replaces institutional trust</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Technology Stack</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-cyan-500/20">
                    <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined">link</span>
                      Blockchain Layer
                    </h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div><span className="text-slate-500">Network:</span> Ethereum Sepolia</div>
                      <div><span className="text-slate-500">Language:</span> Solidity 0.8.20</div>
                      <div><span className="text-slate-500">Framework:</span> Hardhat 2.22.0</div>
                      <div><span className="text-slate-500">RPC:</span> Alchemy/Infura</div>
                      <div><span className="text-slate-500">Wallet:</span> MetaMask</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-purple-500/20">
                    <h4 className="text-purple-400 font-bold mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined">dns</span>
                      Backend Layer
                    </h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div><span className="text-slate-500">Framework:</span> Python Flask 3.0</div>
                      <div><span className="text-slate-500">Web3:</span> Web3.py 6.11.3</div>
                      <div><span className="text-slate-500">Storage:</span> IPFS (Pinata)</div>
                      <div><span className="text-slate-500">Config:</span> python-dotenv</div>
                      <div><span className="text-slate-500">CORS:</span> Flask-CORS</div>
                    </div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 border border-pink-500/20">
                    <h4 className="text-pink-400 font-bold mb-3 flex items-center gap-2">
                      <span className="material-symbols-outlined">web</span>
                      Frontend Layer
                    </h4>
                    <div className="space-y-2 text-sm text-slate-300">
                      <div><span className="text-slate-500">Framework:</span> React 18 + TypeScript</div>
                      <div><span className="text-slate-500">Styling:</span> Tailwind CSS</div>
                      <div><span className="text-slate-500">Web3:</span> RainbowKit + Wagmi</div>
                      <div><span className="text-slate-500">UI:</span> shadcn/ui</div>
                      <div><span className="text-slate-500">Animation:</span> GSAP</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Project Statistics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-white/10">
                    <div className="text-3xl font-bold text-cyan-400 mb-1">7,600+</div>
                    <div className="text-sm text-slate-400">Lines of Code</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-white/10">
                    <div className="text-3xl font-bold text-purple-400 mb-1">50+</div>
                    <div className="text-sm text-slate-400">Features</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-white/10">
                    <div className="text-3xl font-bold text-pink-400 mb-1">11</div>
                    <div className="text-sm text-slate-400">API Endpoints</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-4 text-center border border-white/10">
                    <div className="text-3xl font-bold text-green-400 mb-1">100%</div>
                    <div className="text-sm text-slate-400">Transparent</div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Key Innovations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-cyan-400 font-bold mb-2">1. Multi-Step Application Process</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• 7 comprehensive steps</li>
                      <li>• 40+ data points collected</li>
                      <li>• Progressive validation</li>
                      <li>• Real-time feedback</li>
                      <li>• Automatic metadata compilation</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-purple-400 font-bold mb-2">2. Hybrid Storage Architecture</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• Essential data on-chain</li>
                      <li>• Comprehensive metadata on IPFS</li>
                      <li>• Document storage decentralized</li>
                      <li>• Hash-based integrity</li>
                      <li>• Privacy-preserving design</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-pink-400 font-bold mb-2">3. Smart Contract Automation</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• Automatic eligibility checking</li>
                      <li>• Rule-based execution</li>
                      <li>• Instant fund distribution</li>
                      <li>• Event-driven notifications</li>
                      <li>• Gas-optimized operations</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-green-400 font-bold mb-2">4. Role-Based Access Control</h4>
                    <ul className="space-y-1 text-slate-300 text-sm">
                      <li>• Student role: Apply and track</li>
                      <li>• Admin role: Review and approve</li>
                      <li>• Public role: View and verify</li>
                      <li>• Cryptographic authentication</li>
                      <li>• Wallet-based permissions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Architecture Tab */}
          {activeTab === 'architecture' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">System Architecture</h2>
                <p className="text-slate-300 text-lg mb-6">
                  The system follows a layered architecture with clear separation of concerns.
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6 border border-white/10 overflow-x-auto">
                <pre className="text-cyan-400 text-sm font-mono">
{`┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer (React)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Dashboard   │  │ Transparency │  │  Admin Panel │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                    RainbowKit + Wagmi                        │
└───────────────────────────┬─────────────────────────────────┘
                            │
┌───────────────────────────┴─────────────────────────────────┐
│                  Backend Layer (Flask API)                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         REST API Endpoints (11 routes)               │   │
│  └──────────────────────────────────────────────────────┘   │
│         │                                    │                │
│  ┌──────▼──────┐                    ┌───────▼────────┐      │
│  │  Web3.py    │                    │  IPFS Service  │      │
│  │  Service    │                    │   (Pinata)     │      │
│  └──────┬──────┘                    └────────────────┘      │
└─────────┼───────────────────────────────────────────────────┘
          │
┌─────────▼─────────────────────────────────────────────────┐
│              Ethereum Sepolia Testnet                      │
│  ┌────────────────────────────────────────────────────┐   │
│  │      ScholarshipSystem Smart Contract             │   │
│  │  • Application Storage                             │   │
│  │  • Access Control                                  │   │
│  │  • Fund Management                                 │   │
│  │  • Event Emission                                  │   │
│  └────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────┘
          │
┌─────────▼─────────────────────────────────────────────────┐
│                    IPFS Network                            │
│  • Document Storage (Metadata, Documents)                 │
│  • Decentralized & Immutable                              │
└────────────────────────────────────────────────────────────┘`}
                </pre>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-cyan-400 mb-3">Smart Contract Layer</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Written in Solidity 0.8.20</li>
                    <li>• Deployed on Sepolia testnet</li>
                    <li>• Gas-optimized implementation</li>
                    <li>• Role-based access control</li>
                    <li>• Event-driven architecture</li>
                    <li>• Comprehensive validation</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">Backend Layer</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Python Flask REST API</li>
                    <li>• Web3.py for blockchain interaction</li>
                    <li>• IPFS integration via Pinata</li>
                    <li>• Request validation</li>
                    <li>• Error handling</li>
                    <li>• Transaction management</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-pink-400 mb-3">Frontend Layer</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• React 18 + TypeScript</li>
                    <li>• RainbowKit wallet connection</li>
                    <li>• Wagmi hooks for Web3</li>
                    <li>• Tailwind CSS styling</li>
                    <li>• Responsive design</li>
                    <li>• Real-time updates</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-green-400 mb-3">Storage Layer</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• On-chain: Essential data</li>
                    <li>• IPFS: Documents & metadata</li>
                    <li>• Immutable records</li>
                    <li>• Decentralized storage</li>
                    <li>• Content addressing</li>
                    <li>• Pinning service</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Features Tab */}
          {activeTab === 'features' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Complete Feature List</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Over 50 features implemented for a complete scholarship management system.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-lg p-6 border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">school</span>
                    Student Features
                  </h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>✓ Multi-step application form (7 steps)</li>
                    <li>✓ 40+ comprehensive fields</li>
                    <li>✓ Document upload to IPFS</li>
                    <li>✓ Real-time status tracking</li>
                    <li>✓ Application history</li>
                    <li>✓ Direct fund receipt</li>
                    <li>✓ Transparent rejection reasons</li>
                    <li>✓ One active application limit</li>
                    <li>✓ Essay submissions (500+ words)</li>
                    <li>✓ Academic record upload</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">admin_panel_settings</span>
                    Admin Features
                  </h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>✓ Review all applications</li>
                    <li>✓ View complete metadata from IPFS</li>
                    <li>✓ Approve/reject with reasons</li>
                    <li>✓ Automated fund release</li>
                    <li>✓ Contract balance monitoring</li>
                    <li>✓ Deposit funds to pool</li>
                    <li>✓ Transaction history</li>
                    <li>✓ Admin rights transfer</li>
                    <li>✓ Wallet-based access control</li>
                    <li>✓ Real-time statistics</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-pink-500/10 to-pink-500/5 rounded-lg p-6 border border-pink-500/20">
                  <h3 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">security</span>
                    Security Features
                  </h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>✓ Role-based access control</li>
                    <li>✓ Input validation</li>
                    <li>✓ Reentrancy protection</li>
                    <li>✓ Safe math operations</li>
                    <li>✓ Address validation</li>
                    <li>✓ Status verification</li>
                    <li>✓ Private key encryption</li>
                    <li>✓ CORS configuration</li>
                    <li>✓ XSS prevention</li>
                    <li>✓ Transaction verification</li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-6 border border-green-500/20">
                  <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined">visibility</span>
                    Transparency Features
                  </h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>✓ All decisions on blockchain</li>
                    <li>✓ Immutable audit trail</li>
                    <li>✓ Public verification</li>
                    <li>✓ Event emission</li>
                    <li>✓ Transaction history</li>
                    <li>✓ Etherscan integration</li>
                    <li>✓ Real-time updates</li>
                    <li>✓ Complete data access</li>
                    <li>✓ Timestamp recording</li>
                    <li>✓ Fund tracking</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Performance Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400 mb-1">~15s</div>
                    <div className="text-sm text-slate-400">Application Submit</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-1">~10s</div>
                    <div className="text-sm text-slate-400">Approval/Rejection</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-400 mb-1">~12s</div>
                    <div className="text-sm text-slate-400">Fund Release</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-1">~5s</div>
                    <div className="text-sm text-slate-400">Document Upload</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Tab */}
          {activeTab === 'api' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">API Reference</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Complete REST API documentation with 11 endpoints for blockchain interaction.
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-4 border border-cyan-500/20">
                <div className="flex items-center gap-2 text-cyan-400 mb-2">
                  <Code className="w-5 h-5" />
                  <span className="font-bold">Base URL:</span>
                </div>
                <code className="text-white">http://localhost:5000/api</code>
              </div>

              <div className="space-y-4">
                {/* Application Endpoints */}
                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-bold">POST</span>
                    <code className="text-cyan-400">/api/upload-metadata</code>
                  </div>
                  <p className="text-slate-300 mb-3">Upload application metadata JSON to IPFS</p>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300 overflow-x-auto">
{`{
  "metadata": {
    "personalInfo": {...},
    "academicInfo": {...},
    "financialInfo": {...},
    "guardianInfo": {...},
    "essays": {...},
    "documents": {...}
  },
  "name": "student-name-application"
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm font-bold">GET</span>
                    <code className="text-cyan-400">/api/applications</code>
                  </div>
                  <p className="text-slate-300 mb-3">Get all scholarship applications</p>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300 overflow-x-auto">
{`Response: {
  "applications": [...],
  "count": 10
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-bold">POST</span>
                    <code className="text-cyan-400">/api/approve</code>
                  </div>
                  <p className="text-slate-300 mb-3">Approve scholarship application (admin only)</p>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300 overflow-x-auto">
{`Request: {
  "applicationId": 0
}

Response: {
  "message": "Application approved",
  "tx_hash": "0x...",
  "block_number": 12345
}`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-bold">POST</span>
                    <code className="text-cyan-400">/api/release-funds</code>
                  </div>
                  <p className="text-slate-300 mb-3">Release funds to approved student (admin only)</p>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300 overflow-x-auto">
{`Request: {
  "applicationId": 0
}

Response: {
  "message": "Funds released",
  "tx_hash": "0x...",
  "block_number": 12346
}`}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Status Codes</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div><span className="text-green-400 font-bold">200</span> <span className="text-slate-300">Success</span></div>
                  <div><span className="text-green-400 font-bold">201</span> <span className="text-slate-300">Created</span></div>
                  <div><span className="text-yellow-400 font-bold">400</span> <span className="text-slate-300">Bad Request</span></div>
                  <div><span className="text-red-400 font-bold">500</span> <span className="text-slate-300">Server Error</span></div>
                </div>
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Security Architecture</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Multi-layered security approach ensuring safe and secure operations.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-red-500/10 to-red-500/5 rounded-lg p-6 border border-red-500/20">
                  <h3 className="text-xl font-bold text-red-400 mb-4">Smart Contract Security</h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Access Control</div>
                        <div className="text-slate-400">onlyAdmin modifier for sensitive operations</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">State Validation</div>
                        <div className="text-slate-400">Status checks before state changes</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Reentrancy Protection</div>
                        <div className="text-slate-400">State updates before external calls</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Input Validation</div>
                        <div className="text-slate-400">Comprehensive require() statements</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 rounded-lg p-6 border border-orange-500/20">
                  <h3 className="text-xl font-bold text-orange-400 mb-4">Backend Security</h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Environment Variables</div>
                        <div className="text-slate-400">Sensitive data in .env files</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Request Validation</div>
                        <div className="text-slate-400">Input sanitization and type checking</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Error Handling</div>
                        <div className="text-slate-400">Try-catch blocks with proper messages</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">CORS Configuration</div>
                        <div className="text-slate-400">Restricted origins in production</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 rounded-lg p-6 border border-yellow-500/20">
                  <h3 className="text-xl font-bold text-yellow-400 mb-4">Frontend Security</h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Wallet Integration</div>
                        <div className="text-slate-400">User signs transactions, keys never exposed</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">XSS Prevention</div>
                        <div className="text-slate-400">Input sanitization and escaping</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Network Validation</div>
                        <div className="text-slate-400">Verify correct network before transactions</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Transaction Verification</div>
                        <div className="text-slate-400">Confirm transaction success</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg p-6 border border-green-500/20">
                  <h3 className="text-xl font-bold text-green-400 mb-4">Data Security</h3>
                  <ul className="space-y-3 text-slate-300 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Minimal On-Chain PII</div>
                        <div className="text-slate-400">Only essential data on blockchain</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">IPFS Storage</div>
                        <div className="text-slate-400">Sensitive documents off-chain</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Immutable Records</div>
                        <div className="text-slate-400">Blockchain ensures data integrity</div>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      <div>
                        <div className="font-bold">Access Control</div>
                        <div className="text-slate-400">Role-based permissions</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-red-500/10 rounded-lg p-6 border border-red-500/20">
                <h3 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Best Practices
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
                  <div>• Never commit private keys to version control</div>
                  <div>• Use environment variables for sensitive data</div>
                  <div>• Validate all user inputs</div>
                  <div>• Implement rate limiting in production</div>
                  <div>• Use HTTPS in production</div>
                  <div>• Regular security audits</div>
                  <div>• Keep dependencies updated</div>
                  <div>• Monitor for suspicious activity</div>
                </div>
              </div>
            </div>
          )}

          {/* Deployment Tab */}
          {activeTab === 'deployment' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Deployment Guide</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Step-by-step guide to deploy the complete system.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-cyan-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold">1</div>
                    <h3 className="text-xl font-bold text-white">Prerequisites</h3>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300">
{`• Python 3.9+
• Node.js 18+
• MetaMask wallet
• Sepolia testnet ETH
• Alchemy/Infura account
• Pinata account (optional)`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-purple-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-black font-bold">2</div>
                    <h3 className="text-xl font-bold text-white">Install Dependencies</h3>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300">
{`# Backend
cd backend
pip install -r requirements.txt

# Frontend
cd frontend-react
npm install`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-pink-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-black font-bold">3</div>
                    <h3 className="text-xl font-bold text-white">Configure Environment</h3>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300">
{`# Create .env files
cp backend/.env.example backend/.env
cp frontend-react/.env.example frontend-react/.env

# Edit with your credentials
ALCHEMY_RPC_URL=your_alchemy_url
ADMIN_PRIVATE_KEY=your_private_key
PINATA_JWT=your_pinata_jwt`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-green-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold">4</div>
                    <h3 className="text-xl font-bold text-white">Deploy Smart Contract</h3>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300">
{`# Using Hardhat
npx hardhat run scripts/deploy.js --network sepolia

# Contract deployed at: 0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-yellow-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold">5</div>
                    <h3 className="text-xl font-bold text-white">Start Services</h3>
                  </div>
                  <div className="bg-slate-900/50 rounded p-4">
                    <pre className="text-sm text-slate-300">
{`# Start backend (Terminal 1)
cd backend
python app.py
# Running on http://localhost:5000

# Start frontend (Terminal 2)
cd frontend-react
npm run dev
# Running on http://localhost:3000`}
                    </pre>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-blue-500/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-black font-bold">6</div>
                    <h3 className="text-xl font-bold text-white">Test the System</h3>
                  </div>
                  <div className="space-y-2 text-slate-300 text-sm">
                    <div>1. Connect MetaMask to Sepolia</div>
                    <div>2. Visit http://localhost:3000</div>
                    <div>3. Submit a test application</div>
                    <div>4. Approve as admin</div>
                    <div>5. Release funds</div>
                    <div>6. Verify on Etherscan</div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Contract Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Network:</span>
                    <span className="text-white">Sepolia Testnet</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Contract:</span>
                    <code className="text-cyan-400">0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6</code>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Admin:</span>
                    <code className="text-purple-400">0x1E0048D83ba01D823dc852cfabeb94fC76B089B7</code>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Data Flow Tab */}
          {activeTab === 'data' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Data Flow & Process</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Understanding how data flows through the system.
                </p>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Application Submission Flow</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 bg-cyan-500/10 rounded-lg p-4 border border-cyan-500/20">
                    <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-black font-bold flex-shrink-0">1</div>
                    <div>
                      <div className="font-bold text-cyan-400 mb-1">Student Fills Form</div>
                      <div className="text-slate-300 text-sm">Complete 7-step application with 40+ fields</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                    <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-black font-bold flex-shrink-0">2</div>
                    <div>
                      <div className="font-bold text-purple-400 mb-1">Documents Upload</div>
                      <div className="text-slate-300 text-sm">Upload transcript, income proof, ID to IPFS</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-pink-500/10 rounded-lg p-4 border border-pink-500/20">
                    <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-black font-bold flex-shrink-0">3</div>
                    <div>
                      <div className="font-bold text-pink-400 mb-1">Metadata Creation</div>
                      <div className="text-slate-300 text-sm">Compile all data into JSON metadata</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-green-500/10 rounded-lg p-4 border border-green-500/20">
                    <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-black font-bold flex-shrink-0">4</div>
                    <div>
                      <div className="font-bold text-green-400 mb-1">IPFS Upload</div>
                      <div className="text-slate-300 text-sm">Upload metadata JSON to IPFS, get hash</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-blue-500/10 rounded-lg p-4 border border-blue-500/20">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-black font-bold flex-shrink-0">5</div>
                    <div>
                      <div className="font-bold text-blue-400 mb-1">Blockchain Submit</div>
                      <div className="text-slate-300 text-sm">Submit essential data + metadata hash on-chain</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-black font-bold flex-shrink-0">6</div>
                    <div>
                      <div className="font-bold text-yellow-400 mb-1">Transaction Confirm</div>
                      <div className="text-slate-300 text-sm">Wait for block confirmation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-orange-500/10 rounded-lg p-4 border border-orange-500/20">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-black font-bold flex-shrink-0">7</div>
                    <div>
                      <div className="font-bold text-orange-400 mb-1">Event Emission</div>
                      <div className="text-slate-300 text-sm">ApplicationSubmitted event emitted</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">On-Chain Data</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Student wallet address</li>
                    <li>• Name</li>
                    <li>• Email</li>
                    <li>• Family income</li>
                    <li>• Academic score</li>
                    <li>• Requested amount</li>
                    <li>• Metadata IPFS hash</li>
                    <li>• Application status</li>
                    <li>• Timestamp</li>
                    <li>• Rejection reason (if any)</li>
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">Off-Chain Data (IPFS)</h3>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>• Complete personal information</li>
                    <li>• Detailed academic records</li>
                    <li>• Financial details</li>
                    <li>• Guardian information</li>
                    <li>• Essays and statements</li>
                    <li>• Document IPFS hashes</li>
                    <li>• Transcript file</li>
                    <li>• Income proof file</li>
                    <li>• ID proof file</li>
                    <li>• Recommendation letters</li>
                  </ul>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Admin Review Flow</h3>
                <div className="space-y-3 text-slate-300">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span>Admin views pending applications on dashboard</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                    <span>Fetches complete metadata from IPFS using hash</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-pink-400"></div>
                    <span>Reviews all 40+ fields and documents</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-400"></div>
                    <span>Makes decision: Approve or Reject</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                    <span>Transaction submitted to blockchain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                    <span>Status updated on-chain immutably</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                    <span>ApplicationReviewed event emitted</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Guides Tab */}
          {activeTab === 'guides' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Quick Start Guides</h2>
                <p className="text-slate-300 text-lg mb-6">
                  Step-by-step guides for common tasks.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 rounded-lg p-6 border border-cyan-500/20">
                  <h3 className="text-xl font-bold text-cyan-400 mb-4">For Students</h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div>
                      <div className="font-bold text-white mb-1">1. Connect Wallet</div>
                      <div>Click "Connect Wallet" and select MetaMask</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">2. Fill Application</div>
                      <div>Complete all 7 steps with accurate information</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">3. Upload Documents</div>
                      <div>Upload transcript, income proof, and ID</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">4. Review & Submit</div>
                      <div>Check all details and submit to blockchain</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">5. Track Status</div>
                      <div>View your application on Transparency page</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg p-6 border border-purple-500/20">
                  <h3 className="text-xl font-bold text-purple-400 mb-4">For Admins</h3>
                  <div className="space-y-3 text-sm text-slate-300">
                    <div>
                      <div className="font-bold text-white mb-1">1. Access Admin Panel</div>
                      <div>Navigate to /admin with admin wallet</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">2. Review Applications</div>
                      <div>View all pending applications and details</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">3. Check Documents</div>
                      <div>Review uploaded documents on IPFS</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">4. Make Decision</div>
                      <div>Approve or reject with reason</div>
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">5. Release Funds</div>
                      <div>For approved applications, release funds</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-800/50 rounded-lg p-6 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-4">Common Issues & Solutions</h3>
                <div className="space-y-4">
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="font-bold text-yellow-400 mb-2">Transaction Fails</div>
                    <div className="text-slate-300 text-sm">
                      • Check if you have active application<br/>
                      • Verify academic score is 0-100<br/>
                      • Ensure sufficient gas in wallet<br/>
                      • Confirm you're on Sepolia network
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="font-bold text-yellow-400 mb-2">Document Upload Fails</div>
                    <div className="text-slate-300 text-sm">
                      • Check file size (max 10MB)<br/>
                      • Verify file format (PDF/Image)<br/>
                      • Ensure backend is running<br/>
                      • Check browser console for errors
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="font-bold text-yellow-400 mb-2">Wallet Not Connecting</div>
                    <div className="text-slate-300 text-sm">
                      • Install MetaMask extension<br/>
                      • Switch to Sepolia network<br/>
                      • Refresh the page<br/>
                      • Clear browser cache
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-lg p-6 border border-cyan-500/20">
                <h3 className="text-2xl font-bold text-white mb-4">Useful Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <a href="https://sepoliafaucet.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Sepolia Faucet
                  </a>
                  <a href="https://sepolia.etherscan.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Sepolia Etherscan
                  </a>
                  <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    MetaMask
                  </a>
                  <a href="https://www.alchemy.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300">
                    <span className="material-symbols-outlined text-sm">open_in_new</span>
                    Alchemy
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DocumentationPage
