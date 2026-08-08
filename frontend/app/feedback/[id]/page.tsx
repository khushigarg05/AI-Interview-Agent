'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/ui/PageTransition';
import { sampleFeedbackReport, mockCandidates } from '@/lib/mockData';
import { getSavedFeedback, getFeedbackReport } from '@/lib/api';
import { FeedbackReport } from '@/lib/types';

const getRecommendationVariant = (rec: string): 'teal' | 'green' | 'orange' | 'red' | 'gray' => {
  const r = rec.toLowerCase();
  if (r.includes('strong')) return 'green';
  if (r.includes('hire')) return 'teal';
  if (r.includes('weak') || r.includes('pass')) return 'orange';
  if (r.includes('no') || r.includes('fail')) return 'red';
  return 'gray';
};

function FeedbackReportContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const [activeTab, setActiveTab] = useState<'Overview' | 'Live Stream' | 'Code Editor' | 'Feedback' | 'Settings'>('Feedback');
  const [isNavigatingHome, setIsNavigatingHome] = useState(false);

  const candidateId = params?.id as string;
  const candidate = mockCandidates.find(c => c.id === candidateId) || mockCandidates[2];
  const sessionId = searchParams?.get('sessionId') || '';

  const [feedback, setFeedback] = useState<{
    summary: string;
    strengths: string[];
    gaps: string[];
    next: string[];
    overall_score?: number;
    recommendation?: string;
    candidate_name?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    async function loadFeedback() {
      try {
        setLoading(true);
        setErrorMsg(null);
        const data = await getFeedbackReport(sessionId);
        if (isMounted) {
          setFeedback(data);
        }
      } catch (err) {
        console.error('Error fetching feedback:', err);
        if (isMounted) {
          const cached = getSavedFeedback(sessionId);
          if (cached && cached.summary) {
            setFeedback(cached);
          } else {
            setErrorMsg('Unable to load interview feedback. Please try again.');
          }
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadFeedback();

    return () => {
      isMounted = false;
    };
  }, [sessionId]);

  const handleBackToHome = () => {
    setIsNavigatingHome(true);
    setTimeout(() => {
      router.push('/');
    }, 250);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold text-[#0F172A]">Loading feedback report...</div>
          <div className="w-16 h-1.5 bg-[#007A63] rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] p-4 text-center">
        <div className="bg-white p-8 rounded-xl border border-red-200 shadow-sm max-w-md space-y-6">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-bold text-red-600">Error Loading Feedback</h2>
          <p className="text-sm text-gray-600">{errorMsg}</p>
          <div className="flex justify-center space-x-4">
            <Button variant="secondary" onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Button variant="primary" onClick={handleBackToHome}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const displayName = feedback?.candidate_name || candidate.name;

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      
      {/* Top Header matching Image 3 */}
      <header className="bg-[#151E28] text-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <Link href="/" className="text-xl sm:text-2xl font-bold tracking-tight text-white hover:opacity-90">
            The Interview IQ
          </Link>
          <span className="text-[#94A3B8] text-sm hidden sm:inline">|</span>
          <span className="text-[#CBD5E1] text-sm font-medium hidden sm:inline">Feedback Report: {displayName}</span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Downloading PDF Feedback Report...')}
            className="bg-[#1E293B] border border-[#334155] text-white hover:bg-[#334155] px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
          >
            <span>📥</span>
            <span>Download</span>
          </button>

          <Button
            variant="primary"
            size="md"
            onClick={handleBackToHome}
          >
            {isNavigatingHome ? 'Returning...' : 'Back to Home'}
          </Button>
        </div>
      </header>

      {/* Main Body Layout matching Images 2 & 3 */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar Drawer matching Images 2 & 3 */}
        <div className="lg:col-span-3 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="text-xl font-bold text-[#0F172A] tracking-tight">
              InterviewIQ
            </div>

            {/* AI Interviewer Badge Card */}
            <div className="flex items-center space-x-3 p-3 bg-[#F8FAFC] rounded-lg border border-[#E2E8F0]">
              <div className="w-9 h-9 rounded-full bg-[#007A63] text-white flex items-center justify-center font-bold text-sm shrink-0">
                🤖
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-[#0F172A] truncate">AI Interviewer</div>
                <div className="text-[11px] text-[#64748B] truncate">Technical Assessment Mode</div>
              </div>
            </div>

            {/* Navigation List */}
            <nav className="space-y-1 text-sm font-medium">
              {[
                { name: 'Overview', icon: '🎛️' },
                { name: 'Live Stream', icon: '📹' },
                { name: 'Code Editor', icon: '💻' },
                { name: 'Feedback', icon: '💬' },
                { name: 'Settings', icon: '⚙️' }
              ].map((item) => {
                const isActive = activeTab === item.name;
                return (
                  <button
                    key={item.name}
                    onClick={() => setActiveTab(item.name as any)}
                    className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-left transition-colors cursor-pointer ${
                      isActive
                        ? 'bg-[#E6F4F1] text-[#007A63] font-bold border border-[#B2DFD6]'
                        : 'text-[#475569] hover:bg-[#F1F5F9]'
                    }`}
                  >
                    <span className="text-base">{item.icon}</span>
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Bottom Drawer Actions */}
          <div className="space-y-4 pt-4 border-t border-[#E2E8F0]">
            <button className="flex items-center space-x-2 text-xs font-semibold text-[#64748B] hover:text-[#0F172A]">
              <span>❓</span>
              <span>Help Center</span>
            </button>

            <Button
              variant="primary"
              size="md"
              className="w-full text-xs"
              onClick={() => alert('Invitation link copied!')}
            >
              Invite Candidate
            </Button>
          </div>
        </div>

        {/* Right Main Feedback Content */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Executive Summary Card matching Image 3 */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">📄</span>
                <h2 className="text-xl font-bold text-[#0F172A]">Summary</h2>
              </div>
              {feedback && (feedback.overall_score !== undefined || feedback.recommendation) && (
                <div className="flex items-center space-x-2">
                  {feedback.overall_score !== undefined && (
                    <Badge variant={feedback.overall_score >= 80 ? 'green' : feedback.overall_score >= 60 ? 'teal' : feedback.overall_score >= 40 ? 'orange' : 'red'}>
                      Score: {feedback.overall_score}/100
                    </Badge>
                  )}
                  {feedback.recommendation && (
                    <Badge variant={getRecommendationVariant(feedback.recommendation)}>
                      {feedback.recommendation}
                    </Badge>
                  )}
                </div>
              )}
            </div>

            <p className="text-sm text-[#334155] leading-relaxed">
              {feedback ? feedback.summary : "No evaluation summary available for this session."}
            </p>
          </div>

          {/* Grid: Strengths & Areas to Improve matching Images 2 & 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Strengths Card */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
              <div className="flex items-center space-x-2 text-[#10B981]">
                <span className="text-lg">↗</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Strengths</h3>
              </div>

              <div className="space-y-4">
                {feedback && feedback.strengths && feedback.strengths.length > 0 ? (
                  feedback.strengths.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm text-[#334155] leading-relaxed">
                      <span className="text-[#10B981] font-bold text-base mt-0.5">✓</span>
                      <p>{item}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#64748B] italic">No strengths recorded.</div>
                )}
              </div>
            </div>

            {/* Areas to Improve Card */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 space-y-5">
              <div className="flex items-center space-x-2 text-[#F97316]">
                <span className="text-lg">↘</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Areas to Improve</h3>
              </div>

              <div className="space-y-4">
                {feedback && feedback.gaps && feedback.gaps.length > 0 ? (
                  feedback.gaps.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-sm text-[#334155] leading-relaxed">
                      <span className="text-[#F97316] text-base mt-0.5">💡</span>
                      <p>{item}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#64748B] italic">No areas to improve recorded.</div>
                )}
              </div>
            </div>

          </div>

          {/* Next Steps / Recommendations */}
          {feedback && feedback.next && feedback.next.length > 0 && (
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
              <div className="flex items-center space-x-2 text-[#007A63]">
                <span className="text-lg">🎯</span>
                <h3 className="text-lg font-bold text-[#0F172A]">Recommended Next Steps</h3>
              </div>
              <ul className="space-y-2 text-sm text-[#334155] list-disc list-inside pl-1">
                {feedback.next.map((step, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </div>
    </PageTransition>
  );
}

export default function FeedbackReportPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold text-[#0F172A]">Loading feedback report...</div>
          <div className="w-16 h-1.5 bg-[#007A63] rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    }>
      <FeedbackReportContent />
    </Suspense>
  );
}
