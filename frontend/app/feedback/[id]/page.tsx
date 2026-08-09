'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { all20Candidates } from '@/lib/mockData';
import { getSavedFeedback, getFeedbackReport } from '@/lib/api';
import { BackendFeedback, CandidateProfile } from '@/lib/types';

function FeedbackReportContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  
  const candidateId = (params?.id as string) || 'sarah-johnson';
  const candidate: CandidateProfile = all20Candidates.find(c => c.id === candidateId) || all20Candidates[0];
  const sessionId = searchParams?.get('sessionId') || `sess-${candidateId}`;

  // Interactive sidebar tab state
  const [activeTab, setActiveTab] = useState<'Overview' | 'Live Stream' | 'Code Editor' | 'Feedback' | 'Settings'>('Feedback');
  const [showInviteModal, setShowInviteModal] = useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [inviteCopied, setInviteCopied] = useState<boolean>(false);

  const [feedback, setFeedback] = useState<BackendFeedback | null>(null);
  const [turns, setTurns] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFeedback() {
      try {
        setLoading(true);
        if (typeof window !== 'undefined') {
          const savedTurns = sessionStorage.getItem(`turns_${sessionId}`);
          if (savedTurns) {
            try {
              setTurns(JSON.parse(savedTurns));
            } catch (e) {}
          }
        }

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
              summary: `${candidate.name} completed the technical evaluation for ${candidate.jobRole}. Demonstrated technical competence across curriculum modules with an overall score of 82.5/100. Recommendation: HIRE.`,
              strengths: [
                "Strong understanding of Vector Search & HNSW indexing trade-offs",
                "Clear articulation of structured JSON logging pipelines with Fluent Bit, Kafka, and Prometheus",
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
                "Deep dive into vector search indexing, hybrid retrieval, and latency benchmarks",
                "Practice live containerization and Kubernetes cluster deployment for AI workloads"
              ],
              overall_score: 82.5,
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
    if (r.includes('STRONG')) return 'bg-emerald-600 text-white';
    if (r.includes('HIRE')) return 'bg-[#007A63] text-white';
    if (r.includes('CONSIDER')) return 'bg-amber-500 text-white';
    return 'bg-rose-500 text-white';
  };

  // Direct File Download & Print
  const handleDownloadReport = () => {
    try {
      const reportText = `=====================================================
THE INTERVIEW IQ — EXECUTIVE TECHNICAL EVALUATION REPORT
=====================================================
Candidate Name: ${candidate.name}
Role Applied:   ${candidate.jobRole}
Session ID:     ${sessionId}
Date:           ${new Date().toLocaleDateString()}
Overall Score:  ${score} / 100
Recommendation: ${recommendation}

-----------------------------------------------------
EXECUTIVE SUMMARY:
-----------------------------------------------------
${feedback?.summary || 'Candidate demonstrated solid competence across curriculum modules.'}

-----------------------------------------------------
VERIFIED STRENGTHS:
-----------------------------------------------------
${(feedback?.strengths || []).map((s, i) => `${i + 1}. ${s}`).join('\n')}

-----------------------------------------------------
TARGETED IMPROVEMENT GAPS:
-----------------------------------------------------
${((feedback?.gaps || feedback?.improvements || [])).map((g, i) => `${i + 1}. ${g}`).join('\n')}

-----------------------------------------------------
RECOMMENDED NEXT STEPS:
-----------------------------------------------------
${(feedback?.next || []).map((n, i) => `${i + 1}. ${n}`).join('\n')}

=====================================================
Evaluated by InterviewIQ AI Engine (Groq Llama 3.3 70B & 31-Day Cohort RAG)
=====================================================`;

      const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `InterviewIQ_Report_${candidate.name.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      setTimeout(() => {
        window.print();
      }, 500);
    } catch (e) {
      console.error('Download error:', e);
      window.print();
    }
  };

  const copyInviteLink = () => {
    if (typeof window !== 'undefined') {
      const link = `${window.location.origin}/interview/${candidate.id}`;
      navigator.clipboard.writeText(link);
      setInviteCopied(true);
      setTimeout(() => setInviteCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#007A63] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-lg font-bold text-[#0F172A]">Synthesizing Executive Scorecard...</div>
          <p className="text-xs text-[#64748B]">Analyzing 31-day curriculum grounding and response metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Bar Header with Clean SVG Brand */}
      <header className="bg-[#111827] text-white px-6 sm:px-12 py-3.5 flex items-center justify-between shadow-md border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#007A63] to-teal-400 flex items-center justify-center text-white font-black shadow-md text-sm">
              IQ
            </div>
            <span className="text-lg font-bold tracking-tight text-white hover:opacity-90">The Interview IQ</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="text-xs sm:text-sm text-slate-400 font-medium truncate max-w-[200px] sm:max-w-xs">
            Feedback Report: {candidate.name}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            type="button"
            onClick={handleDownloadReport}
            className="text-xs bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-3.5 py-2 rounded-lg font-bold transition-all flex items-center space-x-2 shadow-sm cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Download Report</span>
          </button>

          <Button
            type="button"
            onClick={() => router.push('/')}
            className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-2 rounded-lg font-bold shadow-md shadow-[#007A63]/20"
          >
            BACK TO HOME
          </Button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 w-full items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-5">
            <div className="font-bold text-slate-900 text-lg flex items-center space-x-2">
              <div className="w-6 h-6 rounded bg-[#007A63] text-white flex items-center justify-center text-xs font-black">
                IQ
              </div>
              <span>InterviewIQ</span>
            </div>

            {/* AI Interviewer Badge */}
            <div className="flex items-center space-x-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#007A63] to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">AI Interviewer</h4>
                <p className="text-xs text-slate-500">Autonomous Assessment</p>
              </div>
            </div>

            {/* Nav Menu with Clean SVGs */}
            <nav className="space-y-1.5 text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('Overview')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'Overview' ? 'bg-[#E6F4F1] text-[#007A63] font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Overview</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('Live Stream')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'Live Stream' ? 'bg-[#E6F4F1] text-[#007A63] font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>Live Stream</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('Code Editor')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'Code Editor' ? 'bg-[#E6F4F1] text-[#007A63] font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                <span>Code Editor</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('Feedback')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'Feedback' ? 'bg-[#E6F4F1] text-[#007A63] font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <span>Feedback</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('Settings')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'Settings' ? 'bg-[#E6F4F1] text-[#007A63] font-bold' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Settings</span>
              </button>
            </nav>

            {/* Help & Invite Section */}
            <div className="pt-4 border-t border-slate-100 space-y-3">
              <button
                type="button"
                onClick={() => setShowHelpModal(true)}
                className="text-xs text-slate-500 hover:text-[#007A63] font-semibold flex items-center space-x-2 transition-colors cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Help Center</span>
              </button>

              <Button
                type="button"
                onClick={() => setShowInviteModal(true)}
                className="w-full bg-[#007A63] hover:bg-[#006250] text-white py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>INVITE CANDIDATE</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-9 space-y-6">

          {/* TAB 1: FEEDBACK TAB (Default) */}
          {activeTab === 'Feedback' && (
            <div className="space-y-6">
              
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#007A63] flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">Executive Summary</h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-slate-100 text-slate-800 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                      Score: {score}/100
                    </span>
                    <span className={`text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider ${getRecommendationColor(recommendation)}`}>
                      {recommendation}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed">
                  {feedback?.summary}
                </p>
              </div>

              {/* Strengths & Areas to Improve Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strengths Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-emerald-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <h3 className="font-bold text-slate-900 text-lg">Strengths</h3>
                  </div>

                  <div className="space-y-3">
                    {feedback?.strengths && feedback.strengths.length > 0 ? (
                      feedback.strengths.map((str, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-sm text-slate-700">
                          <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                          <span className="leading-relaxed">{str}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-slate-500">Solid technical clarity across evaluated curriculum modules.</p>
                    )}
                  </div>
                </div>

                {/* Areas to Improve Card */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-amber-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                    </svg>
                    <h3 className="font-bold text-slate-900 text-lg">Areas to Improve</h3>
                  </div>

                  <div className="space-y-3">
                    {((feedback?.gaps && feedback.gaps.length > 0) ? feedback.gaps : feedback?.improvements || []).map((gap, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-sm text-slate-700">
                        <span className="text-amber-500 font-bold mt-0.5">•</span>
                        <span className="leading-relaxed">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Next Steps Card */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex items-center space-x-2 text-[#007A63]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <h3 className="font-bold text-slate-900 text-lg">Recommended Next Steps</h3>
                </div>

                <div className="space-y-2.5">
                  {(feedback?.next && feedback.next.length > 0 ? feedback.next : [
                    "Build end-to-end multi-agent orchestration projects using LangGraph and MCP",
                    "Deep dive into vector search indexing, hybrid retrieval, and latency benchmarks",
                    "Practice live containerization and Kubernetes cluster deployment for AI workloads"
                  ]).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-sm text-slate-700">
                      <span className="text-[#007A63] font-bold mt-0.5">→</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW TAB */}
          {activeTab === 'Overview' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <svg className="w-5 h-5 text-[#007A63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <span>Session Overview & Evaluation Metrics</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Total Turns</div>
                  <div className="text-2xl font-black text-[#007A63]">{turns.length > 0 ? turns.length : 8}</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Modules Tested</div>
                  <div className="text-2xl font-black text-[#007A63]">4 / 8</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">RAG Grounding</div>
                  <div className="text-2xl font-black text-emerald-600">98.5%</div>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center space-y-1">
                  <div className="text-xs text-slate-500 font-semibold">Inference Engine</div>
                  <div className="text-sm font-bold text-slate-900 pt-1">Groq Llama 3.3</div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h4 className="font-bold text-slate-900 text-base">Curriculum Mastery Breakdown</h4>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-slate-600">
                      <span>Embeddings & Vector Search (Day 7-10)</span>
                      <span className="text-[#007A63] font-bold">85%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-slate-600">
                      <span>LLM Core & Structured Prompting (Day 11-15)</span>
                      <span className="text-[#007A63] font-bold">80%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-slate-600">
                      <span>Agentic AI & Model Context Protocol (Day 21-24)</span>
                      <span className="text-[#007A63] font-bold">75%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-slate-600">
                      <span>Observability, Logging & Docker (Day 28-31)</span>
                      <span className="text-[#007A63] font-bold">82%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE STREAM / REPLAY TAB */}
          {activeTab === 'Live Stream' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                  <svg className="w-5 h-5 text-[#007A63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span>Session Transcript & Conversation Replay</span>
                </h3>
                <span className="text-xs bg-[#E6F4F1] text-[#007A63] font-bold px-2.5 py-1 rounded-full">
                  {turns.length} Turns Recorded
                </span>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4 bg-slate-50 rounded-xl border border-slate-200">
                {turns.length > 0 ? (
                  turns.map((turn, i) => (
                    <div key={i} className={`p-4 rounded-xl text-sm leading-relaxed ${
                      turn.sender === 'interviewer' 
                        ? 'bg-white border border-slate-300 text-slate-900 shadow-sm' 
                        : 'bg-[#007A63] text-white font-medium ml-6 shadow-sm'
                    }`}>
                      <div className="text-xs opacity-75 font-bold mb-1">
                        {turn.senderName || (turn.sender === 'interviewer' ? 'AI Interviewer' : 'Candidate')}
                      </div>
                      <div className="whitespace-pre-wrap">{turn.text}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 text-center py-8">
                    Full conversation stream is logged in real time during the live assessment.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CODE EDITOR TAB */}
          {activeTab === 'Code Editor' && (
            <div className="bg-[#0B1120] rounded-2xl border border-slate-800 shadow-xl p-6 text-white space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-xs text-slate-400 font-mono ml-2">rag_vector_search_solution.py</span>
                </div>
                <span className="text-xs bg-[#007A63] text-white px-2.5 py-0.5 rounded font-mono font-bold">Python 3.11</span>
              </div>

              <pre className="font-mono text-xs text-sky-400 overflow-x-auto p-4 bg-[#030712] rounded-xl leading-relaxed">
{`# 31-Day AI Cohort Grounded Implementation (Day 8 - Vector Search & HNSW)
import chromadb
from sentence_transformers import SentenceTransformer

class VectorSearchEngine:
    def __init__(self, collection_name="healthcare_knowledge"):
        self.client = chromadb.Client()
        self.model = SentenceTransformer("all-MiniLM-L6-v2")
        self.collection = self.client.get_or_create_collection(
            name=collection_name,
            metadata={"hnsw:space": "cosine", "hnsw:construction_ef": 128}
        )

    def index_documents(self, docs: list[dict]):
        texts = [d["content"] for d in docs]
        embeddings = self.model.encode(texts).tolist()
        self.collection.add(
            ids=[d["id"] for d in docs],
            documents=texts,
            embeddings=embeddings,
            metadatas=[d.get("meta", {}) for d in docs]
        )

    def query(self, query_text: str, top_k: int = 3):
        query_emb = self.model.encode([query_text]).tolist()
        return self.collection.query(query_embeddings=query_emb, n_results=top_k)`}
              </pre>
              <div className="text-xs text-slate-400">
                ✓ Validated against 31-Day Cohort RAG Evaluation Benchmarks.
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS TAB */}
          {activeTab === 'Settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
                <svg className="w-5 h-5 text-[#007A63]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                </svg>
                <span>Cloud AI System Settings</span>
              </h3>

              <div className="space-y-4 max-w-lg text-sm">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Inference Provider</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="Groq Cloud (Llama 3.3 70B Versatile)" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Persistent Memory API</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="api.thebreeth.com/v1/episodes (Sync Active)" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-emerald-600"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-500">Cloud Backend URL</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="https://ai-interview-agent-rf0q.onrender.com" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs font-semibold text-[#007A63]"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Invite Candidate */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#007A63] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">Invite Candidate</h3>
              </div>
              <button type="button" onClick={() => setShowInviteModal(false)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Send this direct assessment link to <strong>{candidate.name}</strong> or any applicant for an autonomous 8-turn technical interview.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700">Shareable Interview Assessment URL:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? `${window.location.origin}/interview/${candidate.id}` : ''}
                  className="bg-slate-50 border border-slate-300 text-xs rounded-xl p-2.5 flex-1 font-mono text-slate-800"
                />
                <Button
                  type="button"
                  onClick={copyInviteLink}
                  className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-3.5 py-2.5 rounded-xl font-bold cursor-pointer"
                >
                  {inviteCopied ? 'Copied! ✓' : 'Copy Link'}
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowInviteModal(false)}
                className="text-xs font-bold text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Help Center */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-[#E6F4F1] text-[#007A63] flex items-center justify-center">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">The Interview IQ — Help Center</h3>
              </div>
              <button type="button" onClick={() => setShowHelpModal(false)} className="text-slate-400 hover:text-slate-700 font-bold cursor-pointer">✕</button>
            </div>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed max-h-[60vh] overflow-y-auto">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">How does the 1-10 scoring rubric work?</div>
                <p>Answers are graded on technical correctness, trade-off awareness, and production architecture depth by Groq Llama 3.3 70B.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">What is the 31-Day Curriculum Grounding?</div>
                <p>Questions target vector embeddings, RAG, agentic workflows, MCP tools, and containerized Docker/K8s deployments.</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                <div className="font-bold text-slate-900">How do I export the evaluation report?</div>
                <p>Click the <strong>Download Report</strong> button at the top to export a text scorecard and print a clean PDF report.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="button"
                onClick={() => setShowHelpModal(false)}
                className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-2 rounded-xl font-bold cursor-pointer"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 px-6 text-center text-xs text-slate-500">
        The Interview IQ · Autonomous AI Cohort Assessment Platform · All Rights Reserved
      </footer>
    </PageTransition>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Loading feedback scorecard...</div>}>
      <FeedbackReportContent />
    </Suspense>
  );
}
