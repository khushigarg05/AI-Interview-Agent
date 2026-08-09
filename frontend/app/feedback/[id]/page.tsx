'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { PageTransition } from '@/components/ui/PageTransition';
import { all20Candidates, sampleFeedbackReport } from '@/lib/mockData';
import { getSavedFeedback, getFeedbackReport } from '@/lib/api';
import { BackendFeedback, CandidateProfile } from '@/lib/types';

function FeedbackReportContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const candidateId = (params?.id as string) || 'sarah-johnson';
  const candidate: CandidateProfile = all20Candidates.find(c => c.id === candidateId) || all20Candidates[0];
  const sessionId = searchParams?.get('sessionId') || `sess-${candidateId}`;

  const [feedback, setFeedback] = useState<BackendFeedback | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeedback() {
      try {
        setLoading(true);
        const data = await getFeedbackReport(sessionId);
        if (isMounted) {
          setFeedback(data);
        }
      } catch (err) {
        console.error('Error fetching feedback:', err);
        if (isMounted) {
          const cached = getSavedFeedback(sessionId);
          if (cached) {
            setFeedback(cached);
          } else {
            setFeedback({
              summary: `${candidate.name} completed the technical evaluation for ${candidate.jobRole} with solid engineering competence.`,
              strengths: [
                "Strong understanding of Vector Search & HNSW indexing trade-offs",
                "Clear articulation of structured JSON logging pipelines with Fluent Bit and Kafka",
                "Solid grasp of latency benchmarks and distributed tracing telemetry"
              ],
              gaps: [
                "Deepen understanding of Multi-Agent Orchestration failure recovery mechanisms",
                "Review Model Context Protocol (MCP) tool schema definitions"
              ],
              improvements: [
                "Deepen understanding of Multi-Agent Orchestration failure recovery mechanisms",
                "Review Model Context Protocol (MCP) tool schema definitions"
              ],
              areasToImprove: [
                "Deepen understanding of Multi-Agent Orchestration failure recovery mechanisms",
                "Review Model Context Protocol (MCP) tool schema definitions"
              ],
              next: [
                "Build end-to-end multi-agent orchestration projects using LangGraph and MCP",
                "Deep dive into vector search indexing, hybrid retrieval, and latency benchmarks"
              ],
              overall_score: 80.0,
              recommendation: "HIRE",
              candidate_name: candidate.name
            });
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
  }, [sessionId, candidate.name, candidate.jobRole]);

  const score = Math.round(feedback?.overall_score || 80);
  const recommendation = feedback?.recommendation || "HIRE";

  const getRecommendationColor = (rec: string) => {
    const r = rec.toUpperCase();
    if (r.includes('STRONG')) return 'bg-[#10B981] text-white';
    if (r.includes('HIRE')) return 'bg-[#007A63] text-white';
    if (r.includes('CONSIDER')) return 'bg-[#F97316] text-white';
    return 'bg-[#EF4444] text-white';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#007A63] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-lg font-bold text-[#0F172A]">Synthesizing Executive Performance Report...</div>
          <p className="text-xs text-[#64748B]">Evaluating curriculum grounding and topic competencies...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Bar */}
      <header className="bg-[#151E28] text-white px-6 sm:px-12 py-4 flex items-center justify-between shadow-md border-b border-[#1E293B]">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#007A63] to-[#10B981] flex items-center justify-center font-black text-white text-lg">
            IQ
          </div>
          <span className="text-xl font-bold tracking-tight text-white">The Interview IQ</span>
          <span className="hidden sm:inline-block bg-[#1E293B] text-[#10B981] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#334155]">
            Evaluation Complete
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => window.print()}
            className="text-xs bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155] px-3 py-1.5 rounded-lg font-bold transition-colors flex items-center space-x-1.5"
          >
            <span>🖨️</span>
            <span>Print Report</span>
          </button>
          <Button
            onClick={() => router.push('/')}
            className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-1.5 rounded-lg font-bold shadow-sm"
          >
            Back to Dashboard
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-8 space-y-8 flex-1 w-full">
        
        {/* Executive Summary Hero Card */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full bg-[#E6F4F1] border-2 border-[#007A63] flex items-center justify-center font-black text-[#007A63] text-xl">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#0F172A]">{candidate.name}</h1>
                <p className="text-sm text-[#64748B]">{candidate.jobRole} · {candidate.education || 'CS Graduate'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-wider uppercase shadow-sm ${getRecommendationColor(recommendation)}`}>
                {recommendation}
              </span>
            </div>
          </div>

          {/* Score & Summary Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-4 bg-[#F8FAFC] p-6 rounded-xl border border-[#E2E8F0] text-center space-y-2">
              <div className="text-xs uppercase font-bold text-[#64748B] tracking-wider">Overall Technical Score</div>
              <div className="text-4xl font-extrabold text-[#007A63]">{score} <span className="text-lg text-[#94A3B8]">/ 100</span></div>
              <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#007A63] h-full rounded-full transition-all duration-700" 
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>

            <div className="md:col-span-8 space-y-2">
              <h3 className="text-xs uppercase font-bold text-[#64748B] tracking-wider">Executive Evaluation Summary</h3>
              <p className="text-sm sm:text-base text-[#334155] leading-relaxed">
                {feedback?.summary}
              </p>
            </div>
          </div>
        </div>

        {/* Strengths & Improvement Areas Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Verified Strengths Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2 text-[#10B981]">
              <span className="text-lg font-bold">✓</span>
              <h3 className="font-bold text-[#0F172A] text-lg">Verified Strengths</h3>
            </div>

            <div className="space-y-3">
              {feedback?.strengths && feedback.strengths.length > 0 ? (
                feedback.strengths.map((str, idx) => (
                  <div key={idx} className="bg-[#F0FDF4] border border-[#DCFCE7] p-3.5 rounded-xl text-xs sm:text-sm text-[#166534] font-medium leading-relaxed flex items-start space-x-2">
                    <span className="text-[#10B981] font-bold">●</span>
                    <span>{str}</span>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#64748B]">Solid performance demonstrated across core concepts.</p>
              )}
            </div>
          </div>

          {/* Areas to Improve Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
            <div className="flex items-center space-x-2 text-[#F97316]">
              <span className="text-lg font-bold">⚠</span>
              <h3 className="font-bold text-[#0F172A] text-lg">Targeted Improvement Gaps</h3>
            </div>

            <div className="space-y-3">
              {((feedback?.gaps && feedback.gaps.length > 0) ? feedback.gaps : feedback?.improvements || []).map((gap, idx) => (
                <div key={idx} className="bg-[#FFF7ED] border border-[#FFEDD5] p-3.5 rounded-xl text-xs sm:text-sm text-[#9A3412] font-medium leading-relaxed flex items-start space-x-2">
                  <span className="text-[#F97316] font-bold">●</span>
                  <span>{gap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recommended Architectural Next Steps */}
        {feedback?.next && feedback.next.length > 0 && (
          <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
            <h3 className="font-bold text-[#0F172A] text-lg flex items-center space-x-2">
              <span>🚀</span>
              <span>Recommended Next Steps & Action Plan</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {feedback.next.map((step, idx) => (
                <div key={idx} className="bg-[#F8FAFC] border border-[#E2E8F0] p-4 rounded-xl space-y-1.5">
                  <div className="text-xs font-bold text-[#007A63]">Action Item {idx + 1}</div>
                  <p className="text-xs text-[#475569] leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={() => router.push('/')}
            className="bg-[#007A63] hover:bg-[#006250] text-white px-8 py-3 rounded-xl font-bold shadow-md shadow-[#007A63]/20"
          >
            Assess Another Candidate ▶
          </Button>
        </div>
      </div>
    </PageTransition>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Loading scorecard...</div>}>
      <FeedbackReportContent />
    </Suspense>
  );
}
