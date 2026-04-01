import { Link, useLocation } from 'react-router-dom'
import { Home, LayoutDashboard, Eye, BookOpen } from 'lucide-react'

export const MobileNav = () => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <div className="lg:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-6 pb-8 pt-4 bg-slate-900/80 backdrop-blur-lg border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-50 rounded-t-2xl">
      <Link
        to="/"
        className={`flex flex-col items-center justify-center ${
          isActive('/')
            ? 'text-cyan-400 bg-cyan-500/10 rounded-xl px-4 py-1 scale-110'
            : 'text-slate-500'
        } transition-all duration-300`}
      >
        <Home className="w-6 h-6" />
        <span className="text-[10px] font-body uppercase tracking-widest mt-1">Home</span>
      </Link>

      <Link
        to="/dashboard"
        className={`flex flex-col items-center justify-center ${
          isActive('/dashboard')
            ? 'text-cyan-400 bg-cyan-500/10 rounded-xl px-4 py-1 scale-110'
            : 'text-slate-500'
        } transition-all duration-300`}
      >
        <LayoutDashboard className="w-6 h-6" />
        <span className="text-[10px] font-body uppercase tracking-widest mt-1">Dash</span>
      </Link>

      <Link
        to="/transparency"
        className={`flex flex-col items-center justify-center ${
          isActive('/transparency')
            ? 'text-cyan-400 bg-cyan-500/10 rounded-xl px-4 py-1 scale-110'
            : 'text-slate-500'
        } transition-all duration-300`}
      >
        <Eye className="w-6 h-6" />
        <span className="text-[10px] font-body uppercase tracking-widest mt-1">Vault</span>
      </Link>

      <Link
        to="/documentation"
        className={`flex flex-col items-center justify-center ${
          isActive('/documentation')
            ? 'text-cyan-400 bg-cyan-500/10 rounded-xl px-4 py-1 scale-110'
            : 'text-slate-500'
        } transition-all duration-300`}
      >
        <BookOpen className="w-6 h-6" />
        <span className="text-[10px] font-body uppercase tracking-widest mt-1">Docs</span>
      </Link>
    </div>
  )
}
