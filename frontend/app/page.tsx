'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { all20Candidates, mockCandidates } from '@/lib/mockData';
import { startInterview } from '@/lib/api';
import { CandidateProfile } from '@/lib/types';

export default function LandingPage() {
  const router = useRouter();

  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredCandidates = all20Candidates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.jobRole.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.currentTopic.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.backendPayload.member.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartInterview = async (candidate: CandidateProfile) => {
    setNavigatingId(candidate.id);
    try {
      const sessionId = `sess-${candidate.id}-${Date.now()}`;

      const response = await startInterview(
        sessionId,
        candidate.backendPayload
      );

      const initialTurns = [
        {
          id: '1',
          sender: 'interviewer' as const,
          senderName: 'AI Interviewer',
          text: response.reply,
        },
      ];
      sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(initialTurns));
      sessionStorage.setItem(`session_candidate_${sessionId}`, candidate.id);
      sessionStorage.setItem(`candidate_profile_${sessionId}`, JSON.stringify(candidate));
      if (response.currentTopic) sessionStorage.setItem(`topic_${sessionId}`, response.currentTopic);
      if (response.progress) sessionStorage.setItem(`progress_${sessionId}`, response.progress);
      if (response.questionNumber) sessionStorage.setItem(`question_${sessionId}`, String(response.questionNumber));

      router.push(`/interview/${candidate.id}?sessionId=${sessionId}`);
    } catch (error) {
      console.error('Failed to start interview:', error);
      const fallbackSessionId = `sess-fallback-${candidate.id}-${Date.now()}`;
      router.push(`/interview/${candidate.id}?sessionId=${fallbackSessionId}`);
    } finally {
      setNavigatingId(null);
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Hero Header Area */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 sm:py-14 space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Hero Text */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center space-x-2 bg-[#E6F4F1] border border-[#007A63]/20 px-3.5 py-1.5 rounded-full text-xs font-bold text-[#007A63]">
                <span className="w-2 h-2 rounded-full bg-[#007A63] animate-pulse"></span>
                <span>31-Day AI Cohort Grounded · Groq Llama 3.3 70B</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                The Most Advanced AI Technical Interview Agent
              </h1>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                Conduct autonomous, curriculum-grounded technical interviews tailored to real engineering missions, skipped syllabus days, and candidate performance signals. Powered by real-time RAG and adaptive follow-up reasoning.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  onClick={() => handleStartInterview(all20Candidates[0])}
                  disabled={navigatingId !== null}
                  className="bg-[#007A63] hover:bg-[#006250] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg shadow-[#007A63]/25 flex items-center space-x-2 cursor-pointer"
                >
                  <span>{navigatingId === all20Candidates[0].id ? 'INITIALIZING...' : 'START FEATURED INTERVIEW (SARAH JOHNSON)'}</span>
                  <span>▶</span>
                </Button>

                <button
                  type="button"
                  onClick={() => setShowAllModal(true)}
                  className="bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 px-5 py-3 rounded-xl font-bold transition-all shadow-sm flex items-center space-x-2 text-xs sm:text-sm cursor-pointer"
                >
                  <span>Browse All 20 Candidates</span>
                  <span>▾</span>
                </button>
              </div>
            </div>

            {/* Right Status Card */}
            <div className="lg:col-span-4 bg-[#111827] rounded-2xl p-6 text-white border border-slate-800 shadow-xl space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-teal-400">
                Cloud Engine Status
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">LLM Engine</span>
                  <span className="font-bold text-white">Llama-3.3-70B-Versatile</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Knowledge Base</span>
                  <span className="font-bold text-white">31-Day AI Cohort</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Candidate Dataset</span>
                  <span className="font-bold text-teal-400">20 Real Profiles</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-400">Evaluation Standard</span>
                  <span className="font-bold text-emerald-400">1-10 Rubric + Report</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Featured Candidates Section */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-10 flex-1 w-full space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Featured AI Cohort Candidates</h2>
            <p className="text-xs text-slate-500">Select a candidate profile to initialize an adaptive, syllabus-targeted technical interview.</p>
          </div>
          <button
            type="button"
            onClick={() => setShowAllModal(true)}
            className="text-xs font-bold text-[#007A63] hover:underline cursor-pointer"
          >
            View all 20 candidates →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {all20Candidates.slice(0, 3).map((candidate, idx) => {
            const isStarting = navigatingId === candidate.id;
            return (
              <div
                key={candidate.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between relative group hover:border-[#007A63]"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-11 h-11 rounded-full bg-[#E6F4F1] border-2 border-[#007A63] flex items-center justify-center font-black text-[#007A63] text-base">
                        {candidate.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 text-lg group-hover:text-[#007A63] transition-colors">
                          {candidate.name}
                        </h3>
                        <p className="text-xs text-slate-500 font-medium">{candidate.jobRole} · {candidate.yearsExperience || 5} yrs exp</p>
                      </div>
                    </div>
                    <span className="bg-[#E6F4F1] text-[#007A63] text-xs font-bold px-2.5 py-1 rounded-full">
                      {candidate.backendPayload.member.id}
                    </span>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>Cohort Progress</span>
                      <span className="font-bold text-slate-900">{candidate.progressPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-[#007A63] h-full rounded-full transition-all duration-500" 
                        style={{ width: `${candidate.progressPercent}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-slate-500 font-semibold">Focus Topic / Initial Day:</div>
                    <div className="text-slate-900 font-bold bg-slate-50 p-2 rounded-lg border border-slate-200">
                      {candidate.currentTopic}
                    </div>
                  </div>

                  {candidate.skippedTopics.length > 0 && (
                    <div className="space-y-1 text-xs">
                      <div className="text-rose-500 font-semibold">Target Gap Area:</div>
                      <div className="text-slate-600 text-xs line-clamp-1">
                        {candidate.skippedTopics.join(', ')}
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-6">
                  <Button
                    type="button"
                    onClick={() => handleStartInterview(candidate)}
                    disabled={navigatingId !== null}
                    className="w-full bg-[#007A63] hover:bg-[#006250] text-white py-2.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-sm"
                  >
                    <span>{isStarting ? 'Initializing...' : 'START INTERVIEW'}</span>
                    {!isStarting && <span>▶</span>}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: All 20 Candidates Selector */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#111827] text-white">
              <div>
                <h3 className="text-xl font-bold">Select from 20 AI Cohort Candidates</h3>
                <p className="text-xs text-slate-400">All 20 profiles are grounded in the 31-day syllabus mission records.</p>
              </div>
              <button 
                type="button"
                onClick={() => setShowAllModal(false)}
                className="text-slate-400 hover:text-white font-bold text-2xl px-2 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 bg-slate-50 border-b border-slate-200">
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search candidates by name, job role, or topic..."
                className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 outline-none focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/20 transition-all"
              />
            </div>

            {/* Candidates List */}
            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-slate-100 flex-1">
              {filteredCandidates.map((c) => (
                <div key={c.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 p-3.5 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-slate-900 text-base">{c.name}</span>
                      <span className="text-xs bg-[#E6F4F1] text-[#007A63] font-bold px-2 py-0.5 rounded-full">
                        {c.backendPayload.member.id}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {c.progressPercent}% Cohort Mastery
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">
                      {c.jobRole} · {c.education || 'CS Degree'} · {c.yearsExperience || 0} years experience
                    </p>
                    <p className="text-xs text-[#007A63] font-semibold">
                      🎯 Target Focus: {c.currentTopic}
                    </p>
                  </div>

                  <Button
                    type="button"
                    onClick={() => {
                      setShowAllModal(false);
                      handleStartInterview(c);
                    }}
                    disabled={navigatingId !== null}
                    className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-2.5 rounded-xl font-bold shrink-0 cursor-pointer shadow-sm"
                  >
                    Start Interview ▶
                  </Button>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex justify-end">
              <button 
                type="button"
                onClick={() => setShowAllModal(false)}
                className="text-sm font-semibold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 px-6 sm:px-12 text-center text-xs text-slate-500">
        The Interview IQ — Autonomous AI Technical Interview Agent · 24/7 Cloud Engine on Render
      </footer>
    </PageTransition>
  );
}