'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { PageTransition } from '@/components/ui/PageTransition';
import { mockCandidates } from '@/lib/mockData';
import { startInterview, sendAnswer, skipQuestion } from '@/lib/api';

function InterviewSessionContent() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const candidateId = (params?.id as string) || 'khushi-garg';

  const candidate = mockCandidates.find(c => c.id === candidateId) || mockCandidates[2];

  const sessionId = searchParams?.get('sessionId') || `sess-${candidateId}-${Date.now()}`;

  const [inputMessage, setInputMessage] = useState('');
  const [turns, setTurns] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Dynamic backend states
  const [currentQuestion, setCurrentQuestion] = useState<number>(1);
  const [progress, setProgress] = useState<string>("1 / 8");
  const [currentTopic, setCurrentTopic] = useState<string>(candidate.currentTopic);

  const parseProgressPercent = (progStr: string) => {
    try {
      const parts = progStr.split('/');
      if (parts.length === 2) {
        const current = parseFloat(parts[0].trim());
        const total = parseFloat(parts[1].trim());
        if (total > 0) {
          return Math.round((current / total) * 100);
        }
      }
    } catch (e) {
      console.error('Failed to parse progress percent', e);
    }
    return 25; // fallback
  };

  const getTopicDescription = (topic: string) => {
    const found = mockCandidates.find(c => c.currentTopic.toLowerCase() === topic.toLowerCase());
    return found ? found.currentTopicDescription : "Assessing knowledge of vector storage and retrieval architecture.";
  };

  useEffect(() => {
    if (!sessionId) return;

    // Check if we have saved turns and states in sessionStorage
    const saved = sessionStorage.getItem(`turns_${sessionId}`);
    const savedQuestion = sessionStorage.getItem(`question_${sessionId}`);
    const savedProgress = sessionStorage.getItem(`progress_${sessionId}`);
    const savedTopic = sessionStorage.getItem(`topic_${sessionId}`);

    if (saved) {
      setTurns(JSON.parse(saved));
      if (savedQuestion) setCurrentQuestion(Number(savedQuestion));
      if (savedProgress) setProgress(savedProgress);
      if (savedTopic) setCurrentTopic(savedTopic);
      setIsLoading(false);
    } else {
      // Fallback start if loaded directly
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
  }, [sessionId, candidateId, candidate.backendPayload]);

  const handleSubmitTurn = async () => {
    if (!inputMessage.trim() || isSubmitting) return;

    const userMessage = inputMessage;
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
      console.error('Error skipping question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEndSession = () => {
    router.push(`/feedback/${candidateId}?sessionId=${sessionId}`);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">
      {/* Top Navbar Header matching Image 1 */}
      <header className="bg-[#151E28] text-white px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-8">
          <Link href="/" className="text-xl font-bold tracking-tight text-white hover:opacity-90">
            The Interview IQ
          </Link>

          {/* Nav tabs matching Image 1 */}
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link href="/" className="text-[#CBD5E1] hover:text-white transition-colors py-1">
              Dashboard
            </Link>
            <Link href="#" className="text-[#007A63] font-bold border-b-2 border-[#007A63] py-1">
              Sessions
            </Link>
            <Link href="#" className="text-[#CBD5E1] hover:text-white transition-colors py-1">
              Analytics
            </Link>
            <Link href="#" className="text-[#CBD5E1] hover:text-white transition-colors py-1">
              Settings
            </Link>
          </nav>
        </div>

        {/* Right Header Status & Avatar matching Image 1 */}
        <div className="flex items-center space-x-4 text-sm">
          <div className="bg-[#1E293B] border border-[#334155] px-3 py-1 rounded-full text-xs text-[#94A3B8]">
            Status: <span className="text-white font-medium">Paused</span>
          </div>

          <div className="flex items-center space-x-2 font-medium">
            <span className="text-[#007A63]">👤</span>
            <span className="text-white">{candidate.name}</span>
          </div>

          <button className="text-[#CBD5E1] hover:text-white p-1" aria-label="Notifications">
            🔔
          </button>

          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-gray-600 object-cover"
          />

          <Button
            variant="danger"
            size="sm"
            onClick={handleEndSession}
            className="border-dashed"
          >
            End Session
          </Button>
        </div>
      </header>

      {/* Main Workspace matching Image 1 */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar: Candidate Profile (Live Session Overview) */}
        <div className="lg:col-span-3 space-y-6 bg-white p-5 rounded-xl border border-[#E2E8F0] shadow-sm">
          <div>
            <h2 className="text-lg font-bold text-[#0F172A]">Candidate Profile</h2>
            <p className="text-xs text-[#64748B]">Live Session Overview</p>
          </div>

          <hr className="border-[#E2E8F0]" />

          {/* Name */}
          <div className="space-y-1">
            <div className="text-xs font-semibold text-[#64748B]">Name</div>
            <div className="flex items-center space-x-2 font-bold text-[#0F172A]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] inline-block animate-pulse" />
              <span>{candidate.name}</span>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[#64748B]">Progress</span>
              <span className="text-[#007A63]">{progress}</span>
            </div>
            <ProgressBar progress={parseProgressPercent(progress)} color="teal" height="h-2" />
          </div>

          {/* Skipped Topics */}
          <div className="space-y-2">
            <div className="text-xs font-semibold text-[#64748B]">Skipped Topics</div>
            <div className="flex flex-wrap gap-1.5">
              {candidate.skippedTopics.map((topic) => (
                <span key={topic} className="bg-[#F1F5F9] text-[#475569] border border-[#CBD5E1] text-xs px-2.5 py-1 rounded-full font-medium">
                  {topic}
                </span>
              ))}
            </div>
          </div>

          {/* Current Topic Card matching Image 1 */}
          <div className="bg-[#E6F4F1] border border-[#B2DFD6] rounded-xl p-4 space-y-1 mt-4">
            <div className="text-xs font-semibold text-[#64748B]">Current Topic</div>
            <h3 className="text-base font-bold text-[#007A63]">{currentTopic}</h3>
            <p className="text-xs text-[#475569] leading-relaxed">
              {getTopicDescription(currentTopic)}
            </p>
          </div>
        </div>

        {/* Right Workspace: Chat & Question Session */}
        <div className="lg:col-span-9 flex flex-col justify-between bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden min-h-[600px]">
          
          {/* Header Bar */}
          <div className="p-4 sm:p-5 border-b border-[#E2E8F0] flex items-center justify-between bg-white">
            <div>
              <h2 className="text-lg font-bold text-[#0F172A]">
                Question {currentQuestion} of {candidate.totalQuestions}
              </h2>
              <p className="text-xs text-[#64748B]">Topic: {currentTopic}</p>
            </div>

            <div className="flex items-center space-x-3 text-xs text-[#64748B]">
              <span>⏱ 05:24 elapsed</span>
              <button className="text-gray-400 hover:text-gray-600 p-1 text-base">⋮</button>
            </div>
          </div>

          {/* Conversation Chat Stream */}
          <div className="p-4 sm:p-6 space-y-6 flex-1 overflow-y-auto bg-[#F8FAFC]/50">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full py-20 space-y-3">
                <span className="text-3xl animate-spin">⏳</span>
                <span className="text-sm font-medium text-[#475569]">Initializing session with backend...</span>
              </div>
            ) : turns.length === 0 ? (
              <div className="flex items-center justify-center h-full text-[#64748B] text-sm">
                No conversation turns yet.
              </div>
            ) : (
              turns.map((turn) => {
                if (turn.sender === 'candidate') {
                  return (
                    <div key={turn.id} className="flex justify-end items-start space-x-3 max-w-3xl ml-auto animate-fade-in">
                      <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-2xl p-4 text-sm text-[#1E293B] shadow-sm leading-relaxed max-w-2xl">
                        <div className="text-xs font-bold text-[#4338CA] mb-1 text-right">
                          {turn.senderName}
                        </div>
                        <p>{turn.text}</p>
                      </div>
                      <img
                        src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80"
                        alt="Candidate Avatar"
                        className="w-8 h-8 rounded-full border border-indigo-200 object-cover shrink-0 mt-1"
                      />
                    </div>
                  );
                }

                return (
                  <div key={turn.id} className="flex justify-start items-start space-x-3 max-w-3xl mr-auto animate-fade-in">
                    <div className="w-8 h-8 rounded-full bg-[#007A63] text-white flex items-center justify-center font-bold text-sm shrink-0 mt-1">
                      🤖
                    </div>
                    <div className="bg-white border border-[#E2E8F0] rounded-2xl p-4 text-sm text-[#0F172A] shadow-sm leading-relaxed max-w-2xl">
                      <div className="text-xs font-bold text-[#007A63] mb-1">
                        {turn.senderName}
                      </div>
                      <p>{turn.text}</p>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Bottom Input Box & Action Row matching Image 1 */}
          <div className="p-4 border-t border-[#E2E8F0] bg-white space-y-3">
            <div className="relative border border-[#CBD5E1] rounded-xl p-3 focus-within:border-[#007A63] transition-colors bg-white">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your response here..."
                rows={3}
                className="w-full text-sm text-[#0F172A] focus:outline-none resize-none bg-transparent"
                disabled={isLoading || isSubmitting}
              />

              {/* Action Icons inside box right side */}
              <div className="absolute bottom-3 right-3 flex items-center space-x-2">
                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700" title="Voice Input">
                  🎙️
                </button>
                <button className="p-1.5 rounded-md hover:bg-gray-100 text-gray-500 hover:text-gray-700" title="Code Editor">
                  <code>&lt;&gt;</code>
                </button>
              </div>
            </div>

            {/* Bottom Actions Bar */}
            <div className="flex items-center justify-between pt-1">
              <button
                onClick={handleEndSession}
                className="text-xs font-semibold text-red-500 hover:underline border border-dashed border-red-300 px-2.5 py-1 rounded"
              >
                End Session
              </button>

              <div className="flex items-center space-x-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleSkip}
                  disabled={isLoading || isSubmitting}
                >
                  Skip
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmitTurn}
                  className="px-6"
                  disabled={isLoading || isSubmitting || !inputMessage.trim()}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit ▶'}
                </Button>
              </div>
            </div>
          </div>

        </div>

      </div>
    </PageTransition>
  );
}

export default function InterviewSessionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center space-y-4">
          <div className="text-xl font-semibold text-[#0F172A]">Loading interview session...</div>
          <div className="w-16 h-1.5 bg-[#007A63] rounded animate-pulse mx-auto"></div>
        </div>
      </div>
    }>
      <InterviewSessionContent />
    </Suspense>
  );
}
