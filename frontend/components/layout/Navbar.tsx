'use client';

import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header className="w-full border-b border-white/10 bg-[#302C2A]">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Left: Brand Logo & Title */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded bg-[#AB978C] flex items-center justify-center text-[#302C2A] font-bold">
            AI
          </div>

          <span className="text-white font-semibold">
            AI Interview Agent
          </span>
        </Link>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            href="/"
            className="text-white hover:text-[#AB978C] transition-colors"
          >
            Overview
          </Link>

          <Link
            href="/setup"
            className="text-white/80 hover:text-[#AB978C] transition-colors"
          >
            Interview Setup
          </Link>

          <Link
            href="/setup"
            className="text-white/80 hover:text-[#AB978C] transition-colors"
          >
            Live Interview
          </Link>

          <Link
            href="/setup"
            className="text-white/80 hover:text-[#AB978C] transition-colors"
          >
            Feedback
          </Link>
        </nav>

        {/* Right: Candidate Profile */}
        <div className="flex items-center space-x-4">
          <Link
            href="/setup"
            className="hidden sm:inline-flex items-center px-4 py-1.5 rounded text-xs font-semibold bg-[#6B7C98] text-white hover:bg-[#576882] transition-colors"
          >
            Start Interview
          </Link>

          <div className="flex items-center space-x-2 pl-3 border-l border-white/20">
            <div className="w-7 h-7 rounded-full bg-[#AB978C] flex items-center justify-center text-[#302C2A] text-xs font-bold">
              K
            </div>

            <span className="text-xs font-medium text-white/90">
              Khushi
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};