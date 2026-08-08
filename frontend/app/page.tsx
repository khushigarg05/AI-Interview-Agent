'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { mockCandidates } from '@/lib/mockData';
import { startInterview } from '@/lib/api';

export default function LandingPage() {
  const router = useRouter();
  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  const handleStartInterview = async (candidateId: string) => {
    setNavigatingId(candidateId);
    try {
      const candidate = mockCandidates.find(c => c.id === candidateId);
      if (!candidate) {
        throw new Error(`Candidate ${candidateId} not found`);
      }

      // Generate a unique sessionId
      const sessionId = `sess-${candidateId}-${Date.now()}`;

      // Call startInterview() with backend payload
      const response = await startInterview(sessionId, candidate.backendPayload);

      // Save initial reply and session info to sessionStorage
      const initialTurns = [
        {
          id: '1',
          sender: 'interviewer' as const,
          senderName: 'AI Interviewer',
          text: response.reply
        }
      ];
      sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(initialTurns));
      sessionStorage.setItem(`session_candidate_${sessionId}`, candidateId);

      // Navigate to the interview page
      router.push(`/interview/${candidateId}?sessionId=${sessionId}`);
    } catch (error) {
      console.error('Failed to start interview:', error);
      // Fallback in case of server/tunnel issues
      const fallbackSessionId = `sess-fallback-${candidateId}-${Date.now()}`;
      router.push(`/interview/${candidateId}?sessionId=${fallbackSessionId}`);
    } finally {
      setNavigatingId(null);
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar matching Image 4 */}
      <header className="bg-[#151E28] text-white px-6 sm:px-12 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">The Interview IQ</span>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium text-[#CBD5E1]">
          <Link href="#" className="hover:text-white transition-colors">Company</Link>
          <Link href="#" className="hover:text-white transition-colors">Help Center</Link>
          <div className="flex items-center space-x-3 text-white pl-2">
            {/* Social Icons */}
            <a href="#" className="hover:text-[#007A63] transition-colors" aria-label="Facebook">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#007A63] transition-colors" aria-label="LinkedIn">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-[#007A63] transition-colors" aria-label="Instagram">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 flex-1 w-full">
        
        {/* Hero Section matching Image 4 */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
              The most advanced AI cohort agent
            </h1>
            <p className="text-base sm:text-lg text-[#475569] italic leading-relaxed">
              Practice explaining the systems you built during the 31-day AI Cohort. This AI interviewer tailors questions to your missions, skipped topics, and learning signals. Get a realistic technical interview experience and clear feedback on where you stand.
            </p>
          </div>

          <div className="lg:col-span-5 relative overflow-hidden rounded-xl h-64 sm:h-80 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
              alt="AI Cohort Candidate Interview"
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlay on Left Edge to match design */}
            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/40 to-transparent" />
          </div>
        </div>

        {/* Profile Selection Section matching Image 4 */}
        <div className="space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
            Select Your Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Candidate 1 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">
                  <span className="text-[#007A63]">👤</span>
                  <span>Candidate 1</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Name:</span>
                    <span className="font-semibold text-[#0F172A]">Alex Chen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Progress:</span>
                    <span className="font-bold text-[#007A63]">60%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Skipped Topic:</span>
                    <span className="font-medium text-[#475569] text-right">System Design<br/>Data Structures</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => handleStartInterview('alex-chen')}
              >
                {navigatingId === 'alex-chen' ? 'Starting...' : 'START INTERVIEW'}
              </Button>
            </div>

            {/* Candidate 2 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">
                  <span className="text-[#007A63]">👤</span>
                  <span>Candidate 2</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Name:</span>
                    <span className="font-semibold text-[#0F172A]">Jordan Smith</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Progress:</span>
                    <span className="font-bold text-[#007A63]">25%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Skipped Topic:</span>
                    <span className="font-medium text-[#475569]">None</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => handleStartInterview('jordan-smith')}
              >
                {navigatingId === 'jordan-smith' ? 'Starting...' : 'START INTERVIEW'}
              </Button>
            </div>

            {/* Candidate 3 (Khushi - Active Session Profile) */}
            <div className="bg-white rounded-xl border-2 border-[#007A63]/30 shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow relative">
              <div className="absolute top-3 right-3 bg-[#E6F4F1] text-[#007A63] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Active Session
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">
                  <span className="text-[#007A63]">👤</span>
                  <span>Candidate 3</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Name:</span>
                    <span className="font-semibold text-[#0F172A]">Khushi Garg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Progress:</span>
                    <span className="font-bold text-[#007A63]">2 / 8 (25%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Skipped Topic:</span>
                    <span className="font-medium text-[#475569] text-right">Binary Trees<br/>System Design Basics</span>
                  </div>
                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => handleStartInterview('khushi-garg')}
              >
                {navigatingId === 'khushi-garg' ? 'Starting...' : 'START INTERVIEW'}
              </Button>
            </div>

            {/* Add Candidate Placeholder Card matching Image 4 */}
            <div className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 flex flex-col items-center justify-center space-y-3 text-[#94A3B8] hover:border-[#007A63] hover:text-[#007A63] cursor-pointer transition-colors group bg-white/50 min-h-[220px]">
              <span className="text-3xl font-light group-hover:scale-110 transition-transform">+</span>
              <span className="font-semibold text-sm">Add Candidate</span>
            </div>

          </div>
        </div>

      </div>
    </PageTransition>
  );
}
