'use client';

import Link from 'next/link';
import { Shield, Trophy, UserPlus, Bot } from 'lucide-react';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cyber-darker/90 backdrop-blur-md border-b border-ethos-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Shield className="w-8 h-8 text-ethos-400 group-hover:text-ethos-300 transition-colors" />
              <div className="absolute inset-0 bg-ethos-400/20 blur-lg group-hover:bg-ethos-400/40 transition-all" />
            </div>
            <span className="font-display font-bold text-xl text-white tracking-wider">
              AGENT<span className="text-ethos-400">ETHOS</span>
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <Link
              href="/leaderboard"
              className="flex items-center gap-2 text-gray-400 hover:text-ethos-400 transition-colors"
            >
              <Trophy className="w-4 h-4" />
              <span className="hidden sm:inline">Leaderboard</span>
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 text-gray-400 hover:text-ethos-400 transition-colors"
            >
              <UserPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Register</span>
            </Link>
            <Link
              href="/lookup"
              className="flex items-center gap-2 text-gray-400 hover:text-ethos-400 transition-colors"
            >
              <Bot className="w-4 h-4" />
              <span className="hidden sm:inline">Lookup</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

