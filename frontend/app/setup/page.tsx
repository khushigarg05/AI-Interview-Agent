'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageTransition } from '@/components/ui/PageTransition';
import { defaultCandidate } from '@/lib/mockData';

export default function SetupPage() {
  const router = useRouter();
  const [difficulty, setDifficulty] = useState<'Foundational' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [questionCount, setQuestionCount] = useState<8 | 10 | 12>(8);

  const handleBeginInterview = () => {
    router.push('/interview/khushi');
  };

  return (
    <PageTransition className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      <div>
        <h1 className="text-3xl font-bold text-[#0F172A] tracking-tight">Prepare for your interview</h1>
        <p className="text-sm text-[#64748B] mt-1">
          Review candidate profile context and set assessment parameters before starting the session.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="space-y-6">
          <div className="border-b border-[#E2E8F0] pb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Candidate Profile</span>
            <div className="flex items-center space-x-3 mt-3">
              <div className="w-10 h-10 rounded-full bg-[#007A63] text-white flex items-center justify-center font-bold text-sm">
                K
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0F172A]">{defaultCandidate.name}</h3>
                <p className="text-xs text-[#64748B]">AI Assessment Track</p>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#64748B]">Current Topic</div>
            <div className="text-sm font-bold text-[#007A63]">{defaultCandidate.currentTopic}</div>
            <p className="text-xs text-[#475569]">{defaultCandidate.currentTopicDescription}</p>
          </div>
        </Card>

        <Card className="space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="border-b border-[#E2E8F0] pb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#64748B]">Assessment Parameters</span>
              <h3 className="text-base font-bold text-[#0F172A] mt-1">Configure Assessment Session</h3>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#64748B]">Interview Difficulty Level</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Foundational', 'Intermediate', 'Advanced'] as const).map((level) => (
                  <button
                    key={level}
                    onClick={() => setDifficulty(level)}
                    className={`py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                      difficulty === level
                        ? 'bg-[#007A63] text-white border-[#007A63]'
                        : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-gray-50'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#64748B]">Number of Technical Questions</label>
              <div className="grid grid-cols-3 gap-2">
                {([8, 10, 12] as const).map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-2 px-3 text-xs font-semibold rounded border transition-colors ${
                      questionCount === count
                        ? 'bg-[#007A63] text-white border-[#007A63]'
                        : 'bg-white text-[#0F172A] border-[#CBD5E1] hover:bg-gray-50'
                    }`}
                  >
                    {count} Questions
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E2E8F0]">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              onClick={handleBeginInterview}
            >
              Begin Interview
            </Button>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
}
