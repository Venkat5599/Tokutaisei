import { Link } from 'react-router-dom'
import { Globe, Mail } from 'lucide-react'

export const Footer = () => {
  return (
    <footer className="bg-slate-950 py-8 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <div className="flex items-center gap-6">
            <span className="font-headline text-cyan-400">Ethereal Ledger</span>
            <span>© 2024</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="hover:text-cyan-400 transition-colors">
              Scholarships
            </Link>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Whitepaper
            </a>
            <a href="#" className="hover:text-cyan-400 transition-colors">
              Privacy
            </a>
          </div>
          <span className="text-xs">Built with Ethereum</span>
        </div>
      </div>
    </footer>
  )
}
