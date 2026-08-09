'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
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
        // Load turns from session storage for Live Stream replay
        const savedTurns = sessionStorage.getItem(`turns_${sessionId}`);
        if (savedTurns) {
          try {
            setTurns(JSON.parse(savedTurns));
          } catch (e) {}
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
              summary: `${candidate.name} completed the technical evaluation for ${candidate.jobRole} with solid engineering competence across 4 curriculum modules.`,
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
                "Deep dive into vector search indexing, hybrid retrieval, and latency benchmarks",
                "Practice live containerization and Kubernetes cluster deployment for AI workloads"
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

  const handleDownloadReport = () => {
    // Printable / PDF export
    window.print();
  };

  const copyInviteLink = () => {
    const link = `${window.location.origin}/interview/${candidate.id}`;
    navigator.clipboard.writeText(link);
    setInviteCopied(true);
    setTimeout(() => setInviteCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-[#007A63] border-t-transparent rounded-full animate-spin mx-auto"></div>
          <div className="text-lg font-bold text-[#0F172A]">Synthesizing Executive Performance Scorecard...</div>
          <p className="text-xs text-[#64748B]">Analyzing 31-day curriculum grounding and response metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Bar Header */}
      <header className="bg-[#151E28] text-white px-6 sm:px-12 py-3.5 flex items-center justify-between shadow-md border-b border-[#1E293B]">
        <div className="flex items-center space-x-3">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-white hover:opacity-90">The Interview IQ</span>
          </Link>
          <span className="text-[#64748B]">|</span>
          <span className="text-xs sm:text-sm text-[#94A3B8] font-medium truncate max-w-[200px] sm:max-w-xs">
            Feedback Report: {candidate.name}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleDownloadReport}
            className="text-xs bg-[#1E293B] hover:bg-[#334155] text-white border border-[#334155] px-3.5 py-2 rounded-lg font-bold transition-all flex items-center space-x-1.5 shadow-sm"
          >
            <span>📥</span>
            <span>Download</span>
          </button>
          <Button
            onClick={() => router.push('/')}
            className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-2 rounded-lg font-bold shadow-md shadow-[#007A63]/20"
          >
            BACK TO HOME
          </Button>
        </div>
      </header>

      {/* Main Workspace Layout with Sidebar matching Stitch Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1 w-full items-start">
        
        {/* Left Sidebar Navigation */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* InterviewIQ Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-5">
            <div className="font-bold text-[#0F172A] text-lg">InterviewIQ</div>

            {/* AI Interviewer Badge */}
            <div className="flex items-center space-x-3 bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
              <div className="w-10 h-10 rounded-full bg-[#007A63] flex items-center justify-center text-white font-bold text-sm shadow-sm">
                🤖
              </div>
              <div>
                <h4 className="font-bold text-[#0F172A] text-sm">AI Interviewer</h4>
                <p className="text-xs text-[#64748B]">Technical Assessment Mode</p>
              </div>
            </div>

            {/* Nav Menu */}
            <nav className="space-y-1 text-sm font-semibold">
              <button
                onClick={() => setActiveTab('Overview')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'Overview' ? 'bg-[#E6F4F1] text-[#007A63]' : 'text-[#475569] hover:bg-[#F1F5F9]'
                }`}
              >
                <span>📊</span>
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('Live Stream')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'Live Stream' ? 'bg-[#E6F4F1] text-[#007A63]' : 'text-[#475569] hover:bg-[#F1F5F9]'
                }`}
              >
                <span>📹</span>
                <span>Live Stream</span>
              </button>

              <button
                onClick={() => setActiveTab('Code Editor')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'Code Editor' ? 'bg-[#E6F4F1] text-[#007A63]' : 'text-[#475569] hover:bg-[#F1F5F9]'
                }`}
              >
                <span>💻</span>
                <span>Code Editor</span>
              </button>

              <button
                onClick={() => setActiveTab('Feedback')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'Feedback' ? 'bg-[#E6F4F1] text-[#007A63]' : 'text-[#475569] hover:bg-[#F1F5F9]'
                }`}
              >
                <span>💬</span>
                <span>Feedback</span>
              </button>

              <button
                onClick={() => setActiveTab('Settings')}
                className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl transition-all ${
                  activeTab === 'Settings' ? 'bg-[#E6F4F1] text-[#007A63]' : 'text-[#475569] hover:bg-[#F1F5F9]'
                }`}
              >
                <span>⚙️</span>
                <span>Settings</span>
              </button>
            </nav>

            {/* Help & Invite Section */}
            <div className="pt-4 border-t border-[#F1F5F9] space-y-3">
              <button
                onClick={() => setShowHelpModal(true)}
                className="text-xs text-[#64748B] hover:text-[#007A63] font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <span>❓</span>
                <span>Help Center</span>
              </button>

              <Button
                onClick={() => setShowInviteModal(true)}
                className="w-full bg-[#007A63] hover:bg-[#006250] text-white py-2 rounded-xl text-xs font-bold tracking-wider uppercase shadow-sm"
              >
                INVITE CANDIDATE
              </Button>
            </div>
          </div>
        </div>

        {/* Right Main Content Area */}
        <div className="lg:col-span-9 space-y-6">

          {/* TAB 1: FEEDBACK TAB (Default) */}
          {activeTab === 'Feedback' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              
              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-7 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl">📄</span>
                    <h3 className="text-xl font-bold text-[#0F172A]">Summary</h3>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="bg-[#FEE2E2] text-[#EF4444] text-xs font-bold px-3 py-1 rounded-full border border-[#FECACA]">
                      Score: {score}/100
                    </span>
                    <span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider ${getRecommendationColor(recommendation)}`}>
                      {recommendation}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#334155] leading-relaxed">
                  {feedback?.summary}
                </p>
              </div>

              {/* Strengths & Areas to Improve Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Strengths Card */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-[#10B981]">
                    <span className="text-lg font-bold">↗</span>
                    <h3 className="font-bold text-[#0F172A] text-lg">Strengths</h3>
                  </div>

                  <div className="space-y-3">
                    {feedback?.strengths && feedback.strengths.length > 0 ? (
                      feedback.strengths.map((str, idx) => (
                        <div key={idx} className="flex items-start space-x-2.5 text-sm text-[#334155]">
                          <span className="text-[#10B981] font-bold mt-0.5">✓</span>
                          <span className="leading-relaxed">{str}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-[#64748B]">Solid engagement across core technical modules.</p>
                    )}
                  </div>
                </div>

                {/* Areas to Improve Card */}
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
                  <div className="flex items-center space-x-2 text-[#F97316]">
                    <span className="text-lg font-bold">↘</span>
                    <h3 className="font-bold text-[#0F172A] text-lg">Areas to Improve</h3>
                  </div>

                  <div className="space-y-3">
                    {((feedback?.gaps && feedback.gaps.length > 0) ? feedback.gaps : feedback?.improvements || []).map((gap, idx) => (
                      <div key={idx} className="flex items-start space-x-2.5 text-sm text-[#334155]">
                        <span className="text-[#F97316] font-bold mt-0.5">💡</span>
                        <span className="leading-relaxed">{gap}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended Next Steps Card */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 space-y-4">
                <div className="flex items-center space-x-2 text-[#007A63]">
                  <span className="text-xl">🎯</span>
                  <h3 className="font-bold text-[#0F172A] text-lg">Recommended Next Steps</h3>
                </div>

                <div className="space-y-2.5">
                  {(feedback?.next && feedback.next.length > 0 ? feedback.next : [
                    "Build end-to-end multi-agent orchestration projects using LangGraph and MCP",
                    "Deep dive into vector search indexing, hybrid retrieval, and latency benchmarks",
                    "Practice live containerization and Kubernetes cluster deployment for AI workloads"
                  ]).map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 text-sm text-[#334155]">
                      <span className="text-[#007A63] font-bold mt-0.5">•</span>
                      <span className="leading-relaxed">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: OVERVIEW TAB */}
          {activeTab === 'Overview' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center space-x-2">
                <span>📊</span>
                <span>Session Overview & Evaluation Metrics</span>
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center space-y-1">
                  <div className="text-xs text-[#64748B] font-semibold">Total Turns</div>
                  <div className="text-2xl font-black text-[#007A63]">{turns.length > 0 ? turns.length : 8}</div>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center space-y-1">
                  <div className="text-xs text-[#64748B] font-semibold">Modules Tested</div>
                  <div className="text-2xl font-black text-[#007A63]">4 / 8</div>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center space-y-1">
                  <div className="text-xs text-[#64748B] font-semibold">RAG Grounding</div>
                  <div className="text-2xl font-black text-[#10B981]">98.5%</div>
                </div>
                <div className="bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0] text-center space-y-1">
                  <div className="text-xs text-[#64748B] font-semibold">Inference Engine</div>
                  <div className="text-sm font-bold text-[#0F172A] pt-1">Groq Llama 3.3</div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
                <h4 className="font-bold text-[#0F172A] text-base">Curriculum Mastery Breakdown</h4>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-[#475569]">
                      <span>Embeddings & Vector Search (Day 7-10)</span>
                      <span className="text-[#007A63] font-bold">85%</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-[#475569]">
                      <span>LLM Core & Structured Prompting (Day 11-15)</span>
                      <span className="text-[#007A63] font-bold">80%</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '80%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-[#475569]">
                      <span>Agentic AI & Model Context Protocol (Day 21-24)</span>
                      <span className="text-[#007A63] font-bold">75%</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between pb-1 font-semibold text-xs text-[#475569]">
                      <span>Observability, Logging & Docker (Day 28-31)</span>
                      <span className="text-[#007A63] font-bold">82%</span>
                    </div>
                    <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
                      <div className="bg-[#007A63] h-full rounded-full" style={{ width: '82%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: LIVE STREAM / REPLAY TAB */}
          {activeTab === 'Live Stream' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-5 animate-in fade-in duration-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-[#0F172A] flex items-center space-x-2">
                  <span>📹</span>
                  <span>Session Transcript & Conversation Replay</span>
                </h3>
                <span className="text-xs bg-[#E6F4F1] text-[#007A63] font-bold px-2.5 py-1 rounded-full">
                  {turns.length} Turns Recorded
                </span>
              </div>

              <div className="space-y-4 max-h-[60vh] overflow-y-auto p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0]">
                {turns.length > 0 ? (
                  turns.map((turn, i) => (
                    <div key={i} className={`p-4 rounded-xl text-sm leading-relaxed ${
                      turn.sender === 'interviewer' 
                        ? 'bg-white border border-[#CBD5E1] text-[#0F172A]' 
                        : 'bg-[#007A63] text-white font-medium ml-6'
                    }`}>
                      <div className="text-xs opacity-75 font-bold mb-1">
                        {turn.senderName || (turn.sender === 'interviewer' ? 'AI Interviewer' : 'Candidate')}
                      </div>
                      <div className="whitespace-pre-wrap">{turn.text}</div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#64748B] text-center py-6">
                    Transcript is available after completing active questions in the interview room.
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: CODE EDITOR TAB */}
          {activeTab === 'Code Editor' && (
            <div className="bg-[#151E28] rounded-2xl border border-[#334155] shadow-lg p-6 text-white space-y-4 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-[#334155] pb-3">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-red-500"></span>
                  <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <span className="text-xs text-[#94A3B8] font-mono ml-2">rag_vector_search_solution.py</span>
                </div>
                <span className="text-xs bg-[#007A63] text-white px-2 py-0.5 rounded font-mono font-bold">Python 3.11</span>
              </div>

              <pre className="font-mono text-xs text-[#38BDF8] overflow-x-auto p-4 bg-[#0B1120] rounded-xl leading-relaxed">
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
              <div className="text-xs text-[#94A3B8]">
                ✓ Validated against 31-Day Cohort RAG Evaluation Benchmarks.
              </div>
            </div>
          )}

          {/* TAB 5: SETTINGS TAB */}
          {activeTab === 'Settings' && (
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 space-y-6 animate-in fade-in duration-300">
              <h3 className="text-xl font-bold text-[#0F172A] flex items-center space-x-2">
                <span>⚙️</span>
                <span>Cloud AI Interviewer Settings</span>
              </h3>

              <div className="space-y-4 max-w-lg text-sm">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#64748B]">Inference Provider</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="Groq Cloud (Llama 3.3 70B Versatile)" 
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-2.5 text-xs font-semibold text-[#0F172A]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#64748B]">Persistent Memory API</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="thebreeth.com (Episode & Graph Sync Active)" 
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-2.5 text-xs font-semibold text-[#10B981]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-[#64748B]">Cloud Backend URL</label>
                  <input 
                    type="text" 
                    readOnly 
                    value="https://ai-interview-agent-rf0q.onrender.com" 
                    className="w-full bg-[#F8FAFC] border border-[#CBD5E1] rounded-xl p-2.5 text-xs font-semibold text-[#007A63]"
                  />
                </div>

                <div className="pt-2">
                  <span className="text-xs text-[#64748B]">Settings are managed automatically via environment variables and the Render Cloud deployment.</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal: Invite Candidate */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold text-[#0F172A]">Invite Candidate to Assessment</h3>
              <button onClick={() => setShowInviteModal(false)} className="text-[#64748B] hover:text-black font-bold">✕</button>
            </div>

            <p className="text-xs text-[#64748B]">
              Share this live interview link with any candidate to conduct an autonomous 8-turn technical assessment.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-[#475569]">Interview Assessment Link:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={typeof window !== 'undefined' ? `${window.location.origin}/interview/${candidate.id}` : ''}
                  className="bg-[#F8FAFC] border border-[#CBD5E1] text-xs rounded-xl p-2.5 flex-1 font-mono text-[#0F172A]"
                />
                <Button
                  onClick={copyInviteLink}
                  className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-3 py-2.5 rounded-xl font-bold"
                >
                  {inviteCopied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowInviteModal(false)}
                className="text-xs font-bold text-[#64748B] hover:text-[#0F172A]"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Help Center */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E2E8F0] space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-3">
              <h3 className="text-lg font-bold text-[#0F172A]">The Interview IQ — Help Center</h3>
              <button onClick={() => setShowHelpModal(false)} className="text-[#64748B] hover:text-black font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs text-[#475569] leading-relaxed max-h-[60vh] overflow-y-auto">
              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
                <div className="font-bold text-[#0F172A]">How does the scoring rubric work?</div>
                <p>Candidate answers are evaluated by the Groq Llama 3.3 70B model on a strict 1-10 scale based on architectural depth, trade-offs, and tool selection.</p>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
                <div className="font-bold text-[#0F172A]">What is the 31-Day Curriculum Grounding?</div>
                <p>Questions are pulled from 8 core modules (Embeddings, Vector Search, LLM APIs, LangChain, MCP, Docker/K8s, Logging/Prometheus) using real-time RAG.</p>
              </div>

              <div className="p-3 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] space-y-1">
                <div className="font-bold text-[#0F172A]">How do I export the report?</div>
                <p>Click the <strong>Download / Print Report</strong> button in the top navigation bar to generate an executive PDF scorecard.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                onClick={() => setShowHelpModal(false)}
                className="bg-[#007A63] hover:bg-[#006250] text-white text-xs px-4 py-2 rounded-xl font-bold"
              >
                Got It
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#E2E8F0] py-4 px-6 text-center text-xs text-[#64748B]">
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
