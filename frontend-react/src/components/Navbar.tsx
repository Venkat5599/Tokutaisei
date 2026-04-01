import { Link } from 'react-router-dom'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-slate-900/60 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-cyan-900/20">
      <div className="flex justify-between items-center px-8 h-20">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-600 bg-clip-text text-transparent font-headline tracking-tight">
          Ethereal Ledger
        </Link>

        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
          <Link to="/" className="text-cyan-400 border-b-2 border-cyan-400 pb-1 transition-all duration-300">
            Home
          </Link>
          <Link to="/dashboard" className="text-slate-400 hover:text-slate-200 transition-colors duration-300">
            Dashboard
          </Link>
          <Link to="/transparency" className="text-slate-400 hover:text-slate-200 transition-colors duration-300">
            Transparency
          </Link>
          <Link to="/documentation" className="text-slate-400 hover:text-slate-200 transition-colors duration-300">
            Documentation
          </Link>
        </div>

        {/* RainbowKit Connect Button */}
        <ConnectButton />
      </div>
    </nav>
  )
}
