'use client';
import Link from 'next/link';
import { Bot, Zap, Shield, ArrowRight, Palette, UserPlus, LogIn } from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#050505] text-white min-h-screen font-sans selection:bg-blue-500">
      {/* Header Updated for Login */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
          <Bot className="text-blue-500" /> CHATFLOW
        </div>
        <Link 
          href="/login" 
          className="flex items-center gap-2 bg-white/5 border border-white/10 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/10 transition-all"
        >
          <LogIn size={16} /> Login
        </Link>
      </nav>

      {/* Hero Section Updated for SignUp */}
      <main className="max-w-7xl mx-auto px-6 pt-20 pb-32 text-center md:text-left flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest">
            <Zap size={12} /> Beta Access Now Live
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
            Your Customer <br /> Support, <span className="text-blue-500">Automated.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Create, customize, and deploy AI-powered chatbot widgets to any website in minutes. Fully isolated, fully responsive.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/signup" 
              className="group flex items-center justify-center gap-2 bg-blue-600 px-8 py-4 rounded-2xl font-bold hover:bg-blue-500 transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]"
            >
              <UserPlus size={18} /> Get Started Free <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard" className="flex items-center justify-center px-8 py-4 rounded-2xl font-bold border border-white/10 hover:bg-white/5 transition-all">
              Go to Dashboard
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
            <Shield className="text-blue-500" size={32} />
            <h3 className="font-bold text-xl">Fully Isolated</h3>
            <p className="text-gray-500 text-sm">Styles are sandboxed so they never clash with your host website.</p>
          </div>
          <div className="p-8 rounded-[2rem] bg-white/5 border border-white/10 space-y-4">
            <Palette className="text-purple-500" size={32} />
            <h3 className="font-bold text-xl">Custom Branding</h3>
            <p className="text-gray-500 text-sm">Match your bot's colors and voice to your brand identity perfectly.</p>
          </div>
        </div>
      </main>

      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-sm">
        © 2026 ChatFlow Platform • Assignment 3 for Delta4 Infotech
      </footer>
    </div>
  );
}