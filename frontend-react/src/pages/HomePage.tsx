import { Button } from '@/components/ui/button'
import { FileText, CheckCircle, Wallet, Shield, Users, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import ParticlesBackground from '../components/ParticlesBackground'
import { useAllApplications } from '../hooks/useAllApplications'
import { useReadContract } from 'wagmi'
import { formatEther } from 'viem'

gsap.registerPlugin(ScrollTrigger)

const CONTRACT_ADDRESS = '0xEd3d29D7f2b3eC3708f52fa009d2E77Fb0DfAaD6'
const CONTRACT_ABI = [
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalFundsDistributed",
    "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const

const HomePage = () => {
  const heroRef = useRef(null)
  const statsRef = useRef(null)
  const featuresRef = useRef(null)
  const ctaRef = useRef(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  const { applications, totalCount, approvedApplications } = useAllApplications()
  
  const { data: totalFundsDistributed } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'totalFundsDistributed',
  })

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Set initial visibility
    gsap.set(['.hero-badge', '.hero-title', '.hero-description', '.hero-buttons'], { opacity: 1 })
    gsap.set(['.stat-card', '.feature-card', '.cta-content'], { opacity: 1 })

    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from('.hero-badge', {
        opacity: 0,
        y: -20,
        duration: 0.8,
        ease: 'power3.out'
      })

      gsap.from('.hero-title', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2,
        ease: 'power3.out'
      })

      gsap.from('.hero-description', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out'
      })

      gsap.from('.hero-buttons', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        delay: 0.6,
        ease: 'power3.out'
      })

      // Parallax effect for video
      if (videoRef.current) {
        gsap.to(videoRef.current, {
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
          y: 200,
          scale: 1.1,
          ease: 'none'
        })
      }

      // Stats cards animation with parallax
      gsap.from('.stat-card', {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      })

      // Parallax for stat cards
      gsap.utils.toArray<HTMLElement>('.stat-card').forEach((card, i) => {
        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
          y: -30 * (i + 1),
          ease: 'none'
        })
      })

      // Features animation
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: featuresRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
      })

      // CTA animation
      gsap.from('.cta-content', {
        scrollTrigger: {
          trigger: ctaRef.current,
          start: 'top 80%',
        },
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power3.out'
      })

      // Floating animation for decorative orbs
      gsap.to('.floating-orb-1', {
        y: 30,
        x: 20,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      gsap.to('.floating-orb-2', {
        y: -30,
        x: -20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    }, heroRef)

    return () => {
      ctx.revert()
      lenis.destroy()
    }
  }, [])
  return (
    <main className="relative pt-20 overflow-hidden" ref={heroRef}>
      <ParticlesBackground />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center overflow-hidden bg-slate-900">
        {/* Video Background with Parallax */}
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover"
            style={{ opacity: 0.4 }}
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Animated Gradient Mesh */}
        <div className="absolute inset-0 z-1">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/60 to-slate-900/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/20 via-purple-900/20 to-pink-900/20 animate-pulse" style={{ animationDuration: '8s' }} />
        </div>

        {/* Floating Decorative Orbs */}
        <div className="floating-orb-1 absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] z-2"></div>
        <div className="floating-orb-2 absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] z-2"></div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-label tracking-[0.2em] uppercase backdrop-blur-xl shadow-lg">
            <CheckCircle className="w-3 h-3" />
            Decentralized Trust
          </div>

          <h1 className="hero-title text-5xl md:text-8xl font-headline font-bold text-white leading-[1.1] tracking-tight drop-shadow-2xl">
            Transparent <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Scholarship System
            </span>
          </h1>

          <p className="hero-description text-xl md:text-2xl text-slate-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            Fair, Tamper-Proof, Decentralized Scholarship Distribution powered by the Ethereal Ledger blockchain.
          </p>

          <div className="hero-buttons flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/dashboard">
              <Button className="w-full sm:w-auto px-8 py-6 text-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-headline font-bold rounded-md hover:shadow-[0_0_30px_rgba(165,231,255,0.5)] transition-all duration-300 active:scale-95">
                Apply for Scholarship
              </Button>
            </Link>
            <Link to="/transparency">
              <Button variant="outline" className="w-full sm:w-auto px-8 py-6 text-lg border-slate-500/50 bg-slate-800/20 text-white font-headline font-bold rounded-md hover:bg-slate-700/30 transition-all duration-300 backdrop-blur-xl">
                View Public Ledger
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="max-w-7xl mx-auto px-6 pt-16 relative z-10 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card bg-slate-900/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 flex flex-col items-start gap-4 shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-cyan-500/20 backdrop-blur-sm flex items-center justify-center text-cyan-400 shadow-lg">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-4xl font-headline font-bold text-white mb-1">
                {totalCount || 0}
              </div>
              <div className="text-sm font-label uppercase tracking-widest text-slate-400">Total Applications</div>
            </div>
            <div className="mt-4 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-cyan-600 w-3/4 shadow-lg shadow-cyan-500/50"></div>
            </div>
          </div>

          <div className="stat-card bg-slate-900/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 flex flex-col items-start gap-4 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 backdrop-blur-sm flex items-center justify-center text-purple-400 shadow-lg">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-4xl font-headline font-bold text-white mb-1">
                {approvedApplications.length || 0}
              </div>
              <div className="text-sm font-label uppercase tracking-widest text-slate-400">Approved Scholarships</div>
            </div>
            <div className="mt-4 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 w-1/2 shadow-lg shadow-purple-500/50"></div>
            </div>
          </div>

          <div className="stat-card bg-slate-900/40 backdrop-blur-xl p-8 rounded-xl border border-white/10 flex flex-col items-start gap-4 shadow-2xl hover:shadow-pink-500/20 hover:border-pink-500/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-pink-500/20 backdrop-blur-sm flex items-center justify-center text-pink-400 shadow-lg">
              <Wallet className="w-6 h-6" />
            </div>
            <div>
              <div className="text-4xl font-headline font-bold text-white mb-1">
                {totalFundsDistributed ? parseFloat(formatEther(totalFundsDistributed)).toFixed(4) : '0.0000'} <span className="text-lg text-pink-400">ETH</span>
              </div>
              <div className="text-sm font-label uppercase tracking-widest text-slate-400">Funds Distributed</div>
            </div>
            <div className="mt-4 w-full h-1 bg-slate-700/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div className="h-full bg-gradient-to-r from-pink-400 to-pink-600 w-2/3 shadow-lg shadow-pink-500/50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="max-w-7xl mx-auto px-6 py-24 border-t border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card bg-slate-900/40 backdrop-blur-xl rounded-2xl p-10 flex flex-col items-start gap-6 border border-white/10 shadow-2xl hover:shadow-red-500/20 hover:border-red-500/30 hover:scale-105 transition-all duration-300">
            <div className="p-3 rounded-lg bg-red-500/20 text-red-400 backdrop-blur-sm shadow-lg">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-headline font-bold text-white">Immutable Records</h3>
            <p className="text-slate-400">
              Every decision is etched into the blockchain, creating an audit trail that cannot be altered by any administrator.
            </p>
          </div>

          <div className="feature-card bg-slate-900/40 backdrop-blur-xl rounded-2xl p-10 flex flex-col items-start gap-6 border border-white/10 shadow-2xl hover:shadow-purple-500/20 hover:border-purple-500/30 hover:scale-105 transition-all duration-300">
            <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 backdrop-blur-sm shadow-lg">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-headline font-bold text-white">DAO Governance</h3>
            <p className="text-slate-400">
              Stakeholders vote on scholarship criteria and funding allocations through our decentralized autonomous organization.
            </p>
          </div>

          <div className="feature-card bg-slate-900/40 backdrop-blur-xl rounded-2xl p-10 flex flex-col items-start gap-6 border border-white/10 shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/30 hover:scale-105 transition-all duration-300">
            <div className="p-3 rounded-lg bg-cyan-500/20 text-cyan-400 backdrop-blur-sm shadow-lg">
              <Eye className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-headline font-bold text-white">Real-time Transparency</h3>
            <p className="text-slate-400">
              Monitor fund flows from the treasury directly to the students' digital wallets in real-time.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="cta-content bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-[3rem] p-20 border border-white/20 shadow-2xl">
          <h2 className="text-4xl md:text-6xl font-headline font-bold mb-8 text-white">Empower Your Future Today</h2>
          <p className="text-slate-300 text-xl max-w-2xl mx-auto mb-12">
            Join thousands of students who have secured their education through the most trusted blockchain scholarship platform in the world.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/dashboard">
              <Button className="px-10 py-6 text-lg bg-gradient-to-r from-cyan-400 to-cyan-600 text-black font-headline font-bold rounded-md hover:scale-105 hover:shadow-[0_0_40px_rgba(165,231,255,0.6)] transition-all duration-300">
                Apply Now
              </Button>
            </Link>
            <Link to="/documentation">
              <Button variant="outline" className="px-10 py-6 text-lg bg-slate-800/40 backdrop-blur-xl border-slate-500/50 text-white font-headline font-bold rounded-md hover:bg-slate-700/50 hover:scale-105 transition-all duration-300">
                Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default HomePage
