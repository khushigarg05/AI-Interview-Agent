'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/ui/PageTransition';
import { all20Candidates, mockCandidates } from '@/lib/mockData';
import { startInterview, sendAnswer, skipQuestion } from '@/lib/api';
import { CandidateProfile } from '@/lib/types';

function InterviewSessionContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const candidateId = (params?.id as string) || 'sarah-johnson';

  const candidate: CandidateProfile = all20Candidates.find(c => c.id === candidateId) || all20Candidates[0];

  const sessionId = searchParams?.get('sessionId') || `sess-${candidateId}-${Date.now()}`;

  const [inputMessage, setInputMessage] = useState('');
  const [turns, setTurns] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isListening, setIsListening] = useState(false);

  // Dynamic backend states
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [progress, setProgress] = useState<string>("1 / 8");
  const [currentTopic, setCurrentTopic] = useState<string>(candidate.currentTopic);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [turns]);

  const parseProgressPercent = (progStr: string) => {
    try {
      const parts = progStr.split('/');
      if (parts.length === 2) {
        const current = parseFloat(parts[0].trim());
        const total = parseFloat(parts[1].trim());
        if (total > 0) {
          return Math.min(Math.round((current / total) * 100), 100);
        }
      }
    } catch (e) {
      console.error('Failed to parse progress percent', e);
    }
    return Math.round((currentQuestion / 8) * 100);
  };

  useEffect(() => {
    if (!sessionId) return;

    // Check if we have saved turns in sessionStorage
    const saved = sessionStorage.getItem(`turns_${sessionId}`);
    const savedQuestion = sessionStorage.getItem(`question_${sessionId}`);
    const savedProgress = sessionStorage.getItem(`progress_${sessionId}`);
    const savedTopic = sessionStorage.getItem(`topic_${sessionId}`);

    if (saved) {
      try {
        setTurns(JSON.parse(saved));
      } catch (e) {
        console.error('Failed parsing turns', e);
      }
      if (savedQuestion) setCurrentQuestion(Number(savedQuestion));
      if (savedProgress) setProgress(savedProgress);
      if (savedTopic) setCurrentTopic(savedTopic);
      setIsLoading(false);
    } else {
      // Initialize interview session from API
      setIsLoading(true);
      startInterview(sessionId, candidate.backendPayload)
        .then(res => {
          const initial = [
            {
              id: '1',
              sender: 'interviewer' as const,
              senderName: 'AI Interviewer',
              text: res.reply
            }
          ];
          setTurns(initial);
          sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(initial));

          if (res.questionNumber !== undefined) {
            setCurrentQuestion(res.questionNumber);
            sessionStorage.setItem(`question_${sessionId}`, String(res.questionNumber));
          }
          if (res.progress !== undefined) {
            setProgress(res.progress);
            sessionStorage.setItem(`progress_${sessionId}`, res.progress);
          }
          if (res.currentTopic !== undefined) {
            setCurrentTopic(res.currentTopic);
            sessionStorage.setItem(`topic_${sessionId}`, res.currentTopic);
          }
        })
        .catch(err => {
          console.error('Failed to start interview:', err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [sessionId, candidateId]);

  // Voice speech-to-text recognition
  const toggleVoiceInput = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported in this browser. Please use Google Chrome.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onerror = () => setIsListening(false);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(prev => prev ? `${prev} ${transcript}` : transcript);
      };

      recognition.start();
    } catch (e) {
      console.error('Speech recognition error:', e);
      setIsListening(false);
    }
  };

  const handleSubmitTurn = async () => {
    if (!inputMessage.trim() || isSubmitting) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');
    setIsSubmitting(true);

    const userTurn = {
      id: `user-${Date.now()}`,
      sender: 'candidate' as const,
      senderName: `You (${candidate.name})`,
      text: userMessage
    };

    const updatedTurns = [...turns, userTurn];
    setTurns(updatedTurns);
    sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(updatedTurns));

    try {
      const response = await sendAnswer(sessionId, userMessage);
      
      const systemTurn = {
        id: `system-${Date.now()}`,
        sender: 'interviewer' as const,
        senderName: 'AI Interviewer',
        text: response.reply
      };
      
      const finalTurns = [...updatedTurns, systemTurn];
      setTurns(finalTurns);
      sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(finalTurns));

      // Update backend-driven progress states
      if (response.questionNumber !== undefined) {
        setCurrentQuestion(response.questionNumber);
        sessionStorage.setItem(`question_${sessionId}`, String(response.questionNumber));
      }
      if (response.progress !== undefined) {
        setProgress(response.progress);
        sessionStorage.setItem(`progress_${sessionId}`, response.progress);
      }
      if (response.currentTopic !== undefined) {
        setCurrentTopic(response.currentTopic);
        sessionStorage.setItem(`topic_${sessionId}`, response.currentTopic);
      }

      if (response.done) {
        router.push(`/feedback/${candidateId}?sessionId=${sessionId}`);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSkip = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    const skipTurn = {
      id: `skip-${Date.now()}`,
      sender: 'candidate' as const,
      senderName: `You (${candidate.name})`,
      text: '[Skipped Question]'
    };

    const updatedTurns = [...turns, skipTurn];
    setTurns(updatedTurns);
    sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(updatedTurns));

    try {
      const response = await skipQuestion(sessionId);
      
      const systemTurn = {
        id: `system-${Date.now()}`,
        sender: 'interviewer' as const,
        senderName: 'AI Interviewer',
        text: response.reply
      };
      
      const finalTurns = [...updatedTurns, systemTurn];
      setTurns(finalTurns);
      sessionStorage.setItem(`turns_${sessionId}`, JSON.stringify(finalTurns));

      if (response.questionNumber !== undefined) {
        setCurrentQuestion(response.questionNumber);
        sessionStorage.setItem(`question_${sessionId}`, String(response.questionNumber));
      }
      if (response.progress !== undefined) {
        setProgress(response.progress);
        sessionStorage.setItem(`progress_${sessionId}`, response.progress);
      }
      if (response.currentTopic !== undefined) {
        setCurrentTopic(response.currentTopic);
        sessionStorage.setItem(`topic_${sessionId}`, response.currentTopic);
      }

      if (response.done) {
        router.push(`/feedback/${candidateId}?sessionId=${sessionId}`);
      }
    } catch (error) {
      console.error('Error skipping question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to conclude the interview and view your feedback scorecard?")) {
      router.push(`/feedback/${candidateId}?sessionId=${sessionId}`);
    }
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar Header */}
      <header className="bg-[#151E28] text-white px-6 py-3 flex items-center justify-between shadow-md border-b border-[#1E293B]">
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg font-bold tracking-tight text-white hover:opacity-90 flex items-center space-x-2">
            <span className="w-7 h-7 rounded bg-[#007A63] flex items-center justify-center font-bold text-xs">IQ</span>
            <span>The Interview IQ</span>
          </Link>
          <span className="hidden md:inline-block bg-[#1E293B] text-[#10B981] text-xs font-semibold px-2.5 py-0.5 rounded-full border border-[#334155]">
            Live Cloud Assessment
          </span>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-[#1E293B] px-3 py-1 rounded-full text-xs text-[#CBD5E1] border border-[#334155]">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
            <span>Active Session</span>
          </div>
          <button
            onClick={handleEndSession}
            className="text-xs bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white border border-[#EF4444]/30 px-3 py-1.5 rounded-lg font-bold transition-colors"
          >
            End Session
          </button>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Sidebar */}
        <div className="lg:col-span-4 space-y-5">
          {/* Candidate Profile Card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full bg-[#E6F4F1] border-2 border-[#007A63] flex items-center justify-center font-black text-[#007A63] text-lg">
                {candidate.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <h3 className="font-bold text-[#0F172A] text-base">{candidate.name}</h3>
                <p className="text-xs text-[#64748B]">{candidate.jobRole}</p>
                <p className="text-xs text-[#007A63] font-semibold">{candidate.education || 'CS Graduate'}</p>
              </div>
            </div>

            {/* Progress Section */}
            <div className="space-y-2 pt-3 border-t border-[#F1F5F9]">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#64748B]">Interview Progress:</span>
                <span className="font-bold text-[#007A63]">{progress} Questions</span>
              </div>
              <div className="w-full bg-[#E2E8F0] h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-[#007A63] h-full rounded-full transition-all duration-500" 
                  style={{ width: `${parseProgressPercent(progress)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Active Topic Focus Card */}
          <div className="bg-gradient-to-br from-[#151E28] to-[#1E293B] rounded-2xl p-5 text-white border border-[#334155] shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-[#10B981] tracking-wider">Current Topic Focus</span>
              <span className="text-xs bg-[#334155] text-white px-2 py-0.5 rounded font-mono">Q{currentQuestion} of 8</span>
            </div>
            <h4 className="text-base font-bold text-white leading-snug">{currentTopic}</h4>
            <p className="text-xs text-[#94A3B8] leading-relaxed">
              Questions are grounded in the 31-Day AI Cohort curriculum with real-time adaptive difficulty scaling.
            </p>
          </div>
        </div>

        {/* Right Chat Stream */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-[#E2E8F0] shadow-sm flex flex-col h-[70vh] sm:h-[75vh] overflow-hidden">
          
          {/* Chat Messages List */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-center space-y-2">
                <div className="space-y-3">
                  <div className="w-10 h-10 border-4 border-[#007A63] border-t-transparent rounded-full animate-spin mx-auto"></div>
                  <p className="text-sm font-semibold text-[#64748B]">Connecting to AI Interviewer...</p>
                </div>
              </div>
            ) : (
              turns.map((turn, index) => {
                const isInterviewer = turn.sender === 'interviewer';
                return (
                  <div 
                    key={turn.id || index}
                    className={`flex ${isInterviewer ? 'justify-start' : 'justify-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                  >
                    <div className={`max-w-[85%] rounded-2xl p-4 sm:p-5 shadow-sm space-y-1.5 ${
                      isInterviewer 
                        ? 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A]' 
                        : 'bg-[#007A63] text-white font-medium'
                    }`}>
                      <div className="flex items-center justify-between text-xs opacity-75 font-semibold">
                        <span>{turn.senderName}</span>
                      </div>
                      <div className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                        {turn.text}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <div className="p-4 border-t border-[#E2E8F0] bg-[#F8FAFC] space-y-3">
            <div className="relative">
              <textarea
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmitTurn();
                  }
                }}
                disabled={isSubmitting || isLoading}
                placeholder="Type your technical explanation here (or click the mic icon to speak)..."
                rows={3}
                className="w-full bg-white border border-[#CBD5E1] focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/20 rounded-xl p-3 text-sm text-[#0F172A] placeholder-[#94A3B8] resize-none outline-none transition-all"
              />
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`absolute right-3 bottom-3 p-2 rounded-lg text-xs font-semibold flex items-center space-x-1 transition-all ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#475569]'
                }`}
                title="Voice Speech Input"
              >
                <span>🎙️</span>
                <span>{isListening ? 'Listening...' : 'Voice'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={handleSkip}
                disabled={isSubmitting || isLoading}
                className="text-xs text-[#64748B] hover:text-[#EF4444] font-bold px-3 py-2 rounded-lg transition-colors"
              >
                Skip Question ⏭
              </button>

              <Button
                onClick={handleSubmitTurn}
                disabled={isSubmitting || isLoading || !inputMessage.trim()}
                className="bg-[#007A63] hover:bg-[#006250] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-md shadow-[#007A63]/20 flex items-center space-x-2"
              >
                <span>{isSubmitting ? 'Evaluating...' : 'Submit Answer'}</span>
                {!isSubmitting && <span>▶</span>}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default function InterviewPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm font-semibold">Loading assessment workspace...</div>}>
      <InterviewSessionContent />
    </Suspense>
  );
}
