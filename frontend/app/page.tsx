'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/ui/PageTransition';
import { mockCandidates, all20Candidates } from '@/lib/mockData';
import { startInterview } from '@/lib/api';
import { CandidateProfile } from '@/lib/types';

export default function LandingPage() {
  const router = useRouter();
  const [navigatingId, setNavigatingId] = useState<string | null>(null);
  const [showAllModal, setShowAllModal] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(mockCandidates[0]);

  const handleStartInterview = async (candidate: CandidateProfile) => {
    setNavigatingId(candidate.id);
    try {
      // Generate a unique sessionId
      const sessionId = `sess-${candidate.id}-${Date.now()}`;

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
      sessionStorage.setItem(`session_candidate_${sessionId}`, candidate.id);
      sessionStorage.setItem(`candidate_profile_${sessionId}`, JSON.stringify(candidate));
      if (response.currentTopic) sessionStorage.setItem(`topic_${sessionId}`, response.currentTopic);
      if (response.progress) sessionStorage.setItem(`progress_${sessionId}`, response.progress);
      if (response.questionNumber) sessionStorage.setItem(`question_${sessionId}`, String(response.questionNumber));

      // Navigate to the interview page
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
      {/* Top Navbar Header */}
      <header className="bg-[#151E28] text-white px-6 sm:px-12 py-4 flex items-center justify-between shadow-md border-b border-[#1E293B]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#007A63] to-[#10B981] flex items-center justify-center font-black text-white text-lg shadow-sm">
            IQ
          </div>
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">The Interview IQ</span>
          <span className="hidden sm:inline-block bg-[#1E293B] text-[#10B981] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#334155]">
            Live Cloud AI
          </span>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium text-[#CBD5E1]">
          <Link href="/docs" target="_blank" className="hover:text-white transition-colors">API Docs</Link>
          <button 
            onClick={() => setShowAllModal(true)} 
            className="hover:text-[#10B981] transition-colors font-semibold"
          >
            All Candidates (20)
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 flex-1 w-full">
        
        {/* Hero Section */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden">
          <div className="lg:col-span-8 space-y-5">
            <div className="inline-flex items-center space-x-2 bg-[#E6F4F1] border border-[#007A63]/20 px-3 py-1 rounded-full text-xs font-bold text-[#007A63]">
              <span className="w-2 h-2 rounded-full bg-[#007A63] animate-ping"></span>
              <span>31-Day AI Cohort Grounded · Groq Llama 3.3 70B</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#0F172A] leading-tight">
              The Most Advanced AI Technical Interview Agent
            </h1>
            <p className="text-base sm:text-lg text-[#475569] leading-relaxed">
              Conduct autonomous, curriculum-grounded technical interviews tailored to real engineering missions, skipped syllabus days, and candidate performance signals. Powered by real-time RAG and adaptive follow-up reasoning.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                onClick={() => handleStartInterview(mockCandidates[0])}
                disabled={navigatingId !== null}
                className="bg-[#007A63] hover:bg-[#006250] text-white px-6 py-3 rounded-xl font-bold shadow-md shadow-[#007A63]/20 flex items-center space-x-2"
              >
                <span>{navigatingId === mockCandidates[0].id ? 'Starting Session...' : 'Start Featured Interview (Sarah Johnson)'}</span>
                <span>▶</span>
              </Button>
              <button 
                onClick={() => setShowAllModal(true)}
                className="border-2 border-[#CBD5E1] hover:border-[#007A63] hover:text-[#007A63] text-[#475569] px-5 py-3 rounded-xl font-bold transition-colors"
              >
                Browse All 20 Candidates ▾
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 bg-gradient-to-br from-[#151E28] to-[#1E293B] rounded-2xl p-6 text-white border border-[#334155] shadow-lg space-y-4">
            <div className="text-xs uppercase font-bold text-[#10B981] tracking-wider">Cloud Engine Status</div>
            <div className="space-y-3 text-sm text-[#94A3B8]">
              <div className="flex justify-between items-center pb-2 border-b border-[#334155]">
                <span>LLM Engine</span>
                <span className="font-semibold text-white">Llama-3.3-70B-Versatile</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#334155]">
                <span>Knowledge Base</span>
                <span className="font-semibold text-white">31-Day AI Cohort</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-[#334155]">
                <span>Candidate Dataset</span>
                <span className="font-semibold text-white">20 Real Profiles</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Evaluation Standard</span>
                <span className="font-semibold text-[#10B981]">1-10 Rubric + Report</span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Selection Section */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0F172A]">Featured AI Cohort Candidates</h2>
              <p className="text-sm text-[#64748B]">Select a candidate profile to initialize an adaptive, syllabus-targeted technical interview.</p>
            </div>
            <button
              onClick={() => setShowAllModal(true)}
              className="text-sm font-bold text-[#007A63] hover:underline flex items-center space-x-1"
            >
              <span>View all 20 candidates</span>
              <span>→</span>
            </button>
          </div>

          {/* Grid of Candidate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockCandidates.map((candidate, idx) => {
              const isStarting = navigatingId === candidate.id;
              return (
                <div
                  key={candidate.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-200 p-6 flex flex-col justify-between relative group hover:border-[#007A63]"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-11 h-11 rounded-full bg-[#E6F4F1] border-2 border-[#007A63] flex items-center justify-center font-bold text-[#007A63] text-base">
                          {candidate.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h3 className="font-bold text-[#0F172A] text-lg group-hover:text-[#007A63] transition-colors">
                            {candidate.name}
                          </h3>
                          <p className="text-xs text-[#64748B] font-medium">{candidate.jobRole} · {candidate.yearsExperience || 5} yrs exp</p>
                        </div>
                      </div>
                      <span className="bg-[#E6F4F1] text-[#007A63] text-xs font-bold px-2.5 py-1 rounded-full">
                        CAND-00{idx + 1}
                      </span>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-[#F1F5F9]">
                      <div className="flex justify-between text-xs text-[#64748B]">
                        <span>Cohort Progress</span>
                        <span className="font-bold text-[#0F172A]">{candidate.progressPercent}%</span>
                      </div>
                      <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#007A63] h-full rounded-full transition-all duration-500" 
                          style={{ width: `${candidate.progressPercent}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs">
                      <div className="text-[#64748B] font-semibold">Focus Topic / Initial Day:</div>
                      <div className="text-[#0F172A] font-bold bg-[#F8FAFC] p-2 rounded-lg border border-[#E2E8F0]">
                        {candidate.currentTopic}
                      </div>
                    </div>

                    {candidate.skippedTopics.length > 0 && (
                      <div className="space-y-1 text-xs">
                        <div className="text-[#EF4444] font-semibold">Target Gap Area:</div>
                        <div className="text-[#475569] text-xs line-clamp-1">
                          {candidate.skippedTopics.join(', ')}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6">
                    <Button
                      onClick={() => handleStartInterview(candidate)}
                      disabled={navigatingId !== null}
                      className="w-full bg-[#007A63] hover:bg-[#006250] text-white py-2.5 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
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
      </div>

      {/* Modal: All 20 Candidates Selector */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-[#E2E8F0] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between bg-[#151E28] text-white">
              <div>
                <h3 className="text-xl font-bold">Select from 20 AI Cohort Candidates</h3>
                <p className="text-xs text-[#CBD5E1]">Every candidate is grounded in real 31-day syllabus mission records.</p>
              </div>
              <button 
                onClick={() => setShowAllModal(false)}
                className="text-white hover:text-red-400 font-bold text-2xl px-2"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 divide-y divide-[#F1F5F9] flex-1">
              {all20Candidates.map((c, i) => (
                <div key={c.id} className="pt-4 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F8FAFC] p-3 rounded-xl transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <span className="font-bold text-[#0F172A] text-base">{c.name}</span>
                      <span className="text-xs bg-[#E6F4F1] text-[#007A63] font-bold px-2 py-0.5 rounded-full">
                        {c.backendPayload.member.id}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B]">
                      {c.jobRole} · {c.education || 'CS Degree'} · {c.yearsExperience || 0} years experience
                    </p>
                    <p className="text-xs text-[#007A63] font-medium">
                      🎯 Target Topic: <strong>{c.currentTopic}</strong>
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setShowAllModal(false);
                      handleStartInterview(c);
                    }}
                    disabled={navigatingId !== null}
                    className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-2 rounded-lg font-bold shrink-0"
                  >
                    Start Interview ▶
                  </Button>
                </div>
              ))}
            </div>

            <div className="px-6 py-3 border-t border-[#E2E8F0] bg-[#F8FAFC] flex justify-end">
              <button 
                onClick={() => setShowAllModal(false)}
                className="text-sm font-semibold text-[#64748B] hover:text-[#0F172A]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-6 px-6 sm:px-12 text-center text-xs text-[#64748B]">
        InterviewIQ AI — Autonomous AI Technical Interview Agent · 24/7 Cloud Engine on Render
      </footer>
    </PageTransition>
  );
}
