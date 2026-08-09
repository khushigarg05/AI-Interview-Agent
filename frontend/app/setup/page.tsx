'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageTransition } from '@/components/ui/PageTransition';
import { all20Candidates } from '@/lib/mockData';
import { CandidateProfile } from '@/lib/types';

export default function SetupPage() {
  const router = useRouter();

  const [selectedCandidate, setSelectedCandidate] = useState<CandidateProfile>(all20Candidates[0]);
  const [difficulty, setDifficulty] = useState<'Foundational' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [questionCount, setQuestionCount] = useState<8 | 10 | 12>(8);

  const handleBeginInterview = () => {
    const sessionId = `sess-${selectedCandidate.id}-${Date.now()}`;
    const params = new URLSearchParams({
      sessionId,
      difficulty,
      questionCount: questionCount.toString(),
    });

    sessionStorage.setItem(`session_candidate_${sessionId}`, selectedCandidate.id);
    sessionStorage.setItem(`candidate_profile_${sessionId}`, JSON.stringify(selectedCandidate));

    router.push(`/interview/${selectedCandidate.id}?${params.toString()}`);
  };

  return (
    <PageTransition className="max-w-5xl mx-auto px-6 py-10 space-y-8">
      <div>
        <div className="inline-flex items-center space-x-2 bg-[#E6F4F1] border border-[#007A63]/20 px-3 py-1 rounded-full text-xs font-bold text-[#007A63] mb-3">
          <span>⚙️ Custom Assessment Session</span>
        </div>
        <h1 className="text-3xl font-bold text-slate-900">
          Configure Technical Interview Session
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Select any candidate from the 20 AI Cohort profiles and set adaptive assessment parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Candidate Profile Selection */}
        <Card className="p-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl">
          <div className="border-b border-slate-100 pb-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Candidate Profile
            </label>

            <select
              value={selectedCandidate.id}
              onChange={(e) => {
                const found = all20Candidates.find(c => c.id === e.target.value);
                if (found) setSelectedCandidate(found);
              }}
              className="mt-2 w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-sm font-semibold text-slate-900 outline-none focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/20"
            >
              {all20Candidates.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.jobRole} · {c.backendPayload.member.id})
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F1] border-2 border-[#007A63] flex items-center justify-center font-black text-[#007A63] text-lg">
                {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-500">{selectedCandidate.jobRole} · {selectedCandidate.yearsExperience || 5} yrs exp</p>
                <p className="text-xs text-[#007A63] font-semibold">{selectedCandidate.education || 'CS Degree'}</p>
              </div>
            </div>

            <div className="space-y-1.5 pt-3 border-t border-slate-100 text-xs">
              <div className="text-slate-500 font-semibold">Initial Focus Topic:</div>
              <div className="text-slate-900 font-bold bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                {selectedCandidate.currentTopic}
              </div>
            </div>

            {selectedCandidate.skippedTopics.length > 0 && (
              <div className="space-y-1 text-xs">
                <div className="text-rose-500 font-semibold">Target Gap Area:</div>
                <div className="text-slate-600 text-xs">
                  {selectedCandidate.skippedTopics.join(', ')}
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Assessment Parameters */}
        <Card className="p-6 space-y-6 bg-white border border-slate-200 shadow-sm rounded-2xl flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Assessment Parameters
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Adaptive Difficulty & Length
              </h3>
            </div>

            {/* Difficulty */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">
                Interview Difficulty Level
              </label>

              <div className="grid grid-cols-3 gap-2">
                {(['Foundational', 'Intermediate', 'Advanced'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficulty(level)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      difficulty === level
                        ? 'bg-[#007A63] text-white border-[#007A63] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Question Count */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600">
                Number of Technical Questions
              </label>

              <div className="grid grid-cols-3 gap-2">
                {([8, 10, 12] as const).map((count) => (
                  <button
                    key={count}
                    type="button"
                    onClick={() => setQuestionCount(count)}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      questionCount === count
                        ? 'bg-[#007A63] text-white border-[#007A63] shadow-sm'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Begin Interview */}
          <div className="pt-6 border-t border-slate-100">
            <Button
              type="button"
              className="w-full bg-[#007A63] hover:bg-[#006250] text-white py-3 rounded-xl font-bold transition-all shadow-md shadow-[#007A63]/20 flex items-center justify-center space-x-2 cursor-pointer"
              onClick={handleBeginInterview}
            >
              <span>Begin Technical Assessment</span>
              <span>▶</span>
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}