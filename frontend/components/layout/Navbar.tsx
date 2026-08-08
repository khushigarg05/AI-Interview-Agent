import React from 'react';
import Link from 'next/link';

export const Navbar: React.FC = () => {
  return (
    <header className="bg-[#5E5653] text-white border-b border-[#302C2A] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left: Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2 text-white font-semibold text-lg tracking-tight hover:opacity-90 transition-opacity">
            <div className="w-8 h-8 rounded bg-[#6B7C98] flex items-center justify-center text-white font-bold text-sm border border-white/20">
              AI
            </div>
            <span>AI Interview Agent</span>
          </Link>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="text-white hover:text-[#AB978C] transition-colors">
            Home
          </Link>
          <Link href="/setup" className="text-white/80 hover:text-[#AB978C] transition-colors">
            Interview Setup
          </Link>
          <Link href="/interview/session-1" className="text-white/80 hover:text-[#AB978C] transition-colors">
            Live Interview Room
          </Link>
          <Link href="/feedback/session-1" className="text-white/80 hover:text-[#AB978C] transition-colors">
            Feedback Report
          </Link>
        </nav>

        {/* Right: Candidate Profile Pill */}
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
            <span className="text-xs font-medium text-white/90">Khushi</span>
          </div>
        </div>
      </div>
    </header>
  );
};
