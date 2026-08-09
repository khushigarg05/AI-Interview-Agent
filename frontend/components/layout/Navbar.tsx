'use client';

import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-slate-800 bg-[#111827] sticky top-0 z-40 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-3.5 flex items-center justify-between">

        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#007A63] to-teal-400 flex items-center justify-center text-white font-black text-sm shadow-md group-hover:scale-105 transition-transform">
            IQ
          </div>

          <div className="flex flex-col">
            <span className="text-white font-bold text-base tracking-tight leading-tight">
              The Interview IQ
            </span>
            <span className="text-[10px] text-teal-400 font-semibold tracking-wider uppercase">
              Autonomous AI Interviewer
            </span>
          </div>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-semibold">
          <Link
            href="/"
            className="text-slate-300 hover:text-white transition-colors"
          >
            Candidate Hub
          </Link>

          <Link
            href="/feedback/sarah-johnson"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Sample Scorecard
          </Link>

          <a
            href="https://ai-interview-agent-rf0q.onrender.com/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-white transition-colors"
          >
            Backend API Docs ↗
          </a>
        </nav>

        {/* Right: Live Cloud Badge */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-slate-800/80 border border-slate-700 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-[11px] font-bold text-slate-300">Llama 3.3 70B Online</span>
          </div>

          <Link
            href="/"
            className="hidden sm:inline-flex items-center px-3.5 py-1.5 rounded-lg text-xs font-bold bg-[#007A63] hover:bg-[#006250] text-white transition-all shadow-sm"
          >
            Start Assessment
          </Link>
        </div>

      </div>
    </header>
  );
};