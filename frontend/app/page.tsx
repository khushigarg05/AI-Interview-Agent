'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PageTransition } from '@/components/ui/PageTransition';
import { mockCandidates } from '@/lib/mockData';
import { startInterview } from '@/lib/api';

type Candidate = {
  id: string;
  name: string;
  role: string;
  progress: string;
  skippedTopics: string[];
  backendPayload: any;
};

export default function LandingPage() {
  const router = useRouter();

  const [navigatingId, setNavigatingId] = useState<string | null>(null);

  // Add Candidate modal state
  const [showAddCandidate, setShowAddCandidate] = useState(false);

  const [newCandidate, setNewCandidate] = useState({
    name: '',
    role: '',
    progress: '0',
    skippedTopics: '',
  });

  // Dynamically added candidates
  const [addedCandidates, setAddedCandidates] = useState<Candidate[]>([]);

  const handleStartInterview = async (candidateId: string) => {
    setNavigatingId(candidateId);

    try {
      // First search existing mock candidates
      const mockCandidate = mockCandidates.find(
        (candidate) => candidate.id === candidateId
      );

      // Search dynamically added candidates
      const addedCandidate = addedCandidates.find(
        (candidate) => candidate.id === candidateId
      );

      const candidate: any = mockCandidate || addedCandidate;

      if (!candidate) {
        throw new Error(`Candidate ${candidateId} not found`);
      }

      // Generate unique session ID
      const sessionId = `sess-${candidateId}-${Date.now()}`;

      // Call backend
      const response = await startInterview(
        sessionId,
        candidate.backendPayload
      );

      // Save first AI response
      const initialTurns = [
        {
          id: '1',
          sender: 'interviewer' as const,
          senderName: 'AI Interviewer',
          text: response.reply,
        },
      ];

      sessionStorage.setItem(
        `turns_${sessionId}`,
        JSON.stringify(initialTurns)
      );

      sessionStorage.setItem(
        `session_candidate_${sessionId}`,
        candidateId
      );

      // Navigate to interview
      router.push(
        `/interview/${candidateId}?sessionId=${sessionId}`
      );
    } catch (error) {
      console.error('Failed to start interview:', error);

      /*
       * IMPORTANT:
       * We still navigate to the interview page if the backend
       * temporarily fails.
       */

      const fallbackSessionId = `sess-fallback-${candidateId}-${Date.now()}`;

      router.push(
        `/interview/${candidateId}?sessionId=${fallbackSessionId}`
      );
    } finally {
      setNavigatingId(null);
    }
  };

  // Handle Add Candidate
  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();

    const name = newCandidate.name.trim();
    const role = newCandidate.role.trim();
    const progress = newCandidate.progress.trim();
    const skippedTopics = newCandidate.skippedTopics
      .split(',')
      .map((topic) => topic.trim())
      .filter(Boolean);

    if (!name || !role) {
      alert('Please enter candidate name and job role.');
      return;
    }

    // Create safe ID
    const candidateId =
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '') +
      `-${Date.now()}`;

    /*
     * Backend payload.
     *
     * This follows the same general structure used by the
     * existing interview API.
     */
    const backendPayload = {
      candidate: {
        member: {
          id: candidateId,
          name: name,
          jobRole: role,
        },
        missions: [],
      },
    };

    const candidate: Candidate = {
      id: candidateId,
      name,
      role,
      progress: `${progress}%`,
      skippedTopics,
      backendPayload,
    };

    setAddedCandidates((previous) => [
      ...previous,
      candidate,
    ]);

    // Reset form
    setNewCandidate({
      name: '',
      role: '',
      progress: '0',
      skippedTopics: '',
    });

    // Close modal
    setShowAddCandidate(false);
  };

  return (
    <PageTransition className="min-h-screen flex flex-col bg-[#F8FAFC]">

      {/* =========================
          NAVBAR
      ========================== */}

      <header className="bg-[#151E28] text-white px-6 sm:px-12 py-4 flex items-center justify-between shadow-sm">

        <div className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            The Interview IQ
          </span>
        </div>

        <div className="flex items-center space-x-6 text-sm font-medium text-[#CBD5E1]">

          <Link
            href="#"
            className="hover:text-white transition-colors"
          >
            Company
          </Link>

          <Link
            href="#"
            className="hover:text-white transition-colors"
          >
            Help Center
          </Link>

          <div className="flex items-center space-x-3 text-white pl-2">

            {/* Facebook */}
            <a
              href="#"
              className="hover:text-[#007A63] transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="#"
              className="hover:text-[#007A63] transition-colors"
              aria-label="LinkedIn"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="#"
              className="hover:text-[#007A63] transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-4.771-4.919-4.92-.058-1.28-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

          </div>
        </div>
      </header>

      {/* =========================
          MAIN
      ========================== */}

      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-10 flex-1 w-full">

        {/* HERO */}

        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 space-y-6">

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
              The most advanced AI cohort agent
            </h1>

            <p className="text-base sm:text-lg text-[#475569] italic leading-relaxed">
              Practice explaining the systems you built during the 31-day AI Cohort.
              This AI interviewer tailors questions to your missions, skipped topics,
              and learning signals. Get a realistic technical interview experience
              and clear feedback on where you stand.
            </p>

          </div>

          <div className="lg:col-span-5 relative overflow-hidden rounded-xl h-64 sm:h-80 shadow-md">

            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80"
              alt="AI Cohort Candidate Interview"
              className="w-full h-full object-cover object-center"
            />

            <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white via-white/40 to-transparent" />

          </div>
        </div>

        {/* PROFILE SECTION */}

        <div className="space-y-6">

          <div className="flex items-center justify-between">

            <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] tracking-tight">
              Select Your Profile
            </h2>

            <span className="text-xs text-[#64748B]">
              {3 + addedCandidates.length} candidates
            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* =========================
                CANDIDATE 1
            ========================== */}

            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">

              <div className="space-y-4">

                <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">
                  <span className="text-[#007A63]">👤</span>
                  <span>Candidate 1</span>
                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Name:</span>
                    <span className="font-semibold text-[#0F172A]">
                      Alex Chen
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">Progress:</span>
                    <span className="font-bold text-[#007A63]">
                      60%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Skipped Topic:
                    </span>

                    <span className="font-medium text-[#475569] text-right">
                      System Design
                      <br />
                      Data Structures
                    </span>
                  </div>

                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() =>
                  handleStartInterview('alex-chen')
                }
              >
                {navigatingId === 'alex-chen'
                  ? 'Starting...'
                  : 'START INTERVIEW'}
              </Button>

            </div>

            {/* =========================
                CANDIDATE 2
            ========================== */}

            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">

              <div className="space-y-4">

                <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">
                  <span className="text-[#007A63]">👤</span>
                  <span>Candidate 2</span>
                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Name:
                    </span>

                    <span className="font-semibold text-[#0F172A]">
                      Jordan Smith
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Progress:
                    </span>

                    <span className="font-bold text-[#007A63]">
                      25%
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Skipped Topic:
                    </span>

                    <span className="font-medium text-[#475569]">
                      None
                    </span>
                  </div>

                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() =>
                  handleStartInterview('jordan-smith')
                }
              >
                {navigatingId === 'jordan-smith'
                  ? 'Starting...'
                  : 'START INTERVIEW'}
              </Button>

            </div>

            {/* =========================
                CANDIDATE 3
            ========================== */}

            <div className="bg-white rounded-xl border-2 border-[#007A63]/30 shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow relative">

              <div className="absolute top-3 right-3 bg-[#E6F4F1] text-[#007A63] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Active Session
              </div>

              <div className="space-y-4">

                <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">
                  <span className="text-[#007A63]">👤</span>
                  <span>Candidate 3</span>
                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Name:
                    </span>

                    <span className="font-semibold text-[#0F172A]">
                      Khushi Garg
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Progress:
                    </span>

                    <span className="font-bold text-[#007A63]">
                      2 / 8 (25%)
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-[#64748B]">
                      Skipped Topic:
                    </span>

                    <span className="font-medium text-[#475569] text-right">
                      Binary Trees
                      <br />
                      System Design Basics
                    </span>
                  </div>

                </div>
              </div>

              <Button
                variant="primary"
                size="md"
                className="w-full"
                onClick={() =>
                  handleStartInterview('khushi-garg')
                }
              >
                {navigatingId === 'khushi-garg'
                  ? 'Starting...'
                  : 'START INTERVIEW'}
              </Button>

            </div>

            {/* =========================
                DYNAMIC CANDIDATES
            ========================== */}

            {addedCandidates.map((candidate) => (

              <div
                key={candidate.id}
                className="bg-white rounded-xl border border-[#007A63]/30 shadow-sm p-6 flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
              >

                <div className="space-y-4">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center space-x-2 text-[#0F172A] font-bold text-base">

                      <span className="text-[#007A63]">
                        👤
                      </span>

                      <span>
                        New Candidate
                      </span>

                    </div>

                    <span className="text-[10px] bg-[#E6F4F1] text-[#007A63] px-2 py-1 rounded-full font-bold">
                      NEW
                    </span>

                  </div>

                  <div className="space-y-2 text-sm">

                    <div className="flex justify-between">

                      <span className="text-[#64748B]">
                        Name:
                      </span>

                      <span className="font-semibold text-[#0F172A]">
                        {candidate.name}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-[#64748B]">
                        Role:
                      </span>

                      <span className="font-medium text-[#475569] text-right">
                        {candidate.role}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-[#64748B]">
                        Progress:
                      </span>

                      <span className="font-bold text-[#007A63]">
                        {candidate.progress}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-[#64748B]">
                        Skipped:
                      </span>

                      <span className="font-medium text-[#475569] text-right">
                        {candidate.skippedTopics.length > 0
                          ? candidate.skippedTopics.map(
                              (topic, index) => (
                                <React.Fragment key={topic}>
                                  {topic}
                                  {index <
                                  candidate.skippedTopics.length -
                                    1 ? (
                                    <br />
                                  ) : null}
                                </React.Fragment>
                              )
                            )
                          : 'None'}
                      </span>

                    </div>

                  </div>

                </div>

                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  onClick={() =>
                    handleStartInterview(candidate.id)
                  }
                >
                  {navigatingId === candidate.id
                    ? 'Starting...'
                    : 'START INTERVIEW'}
                </Button>

              </div>

            ))}

            {/* =========================
                ADD CANDIDATE
            ========================== */}

            <button
              type="button"
              onClick={() => setShowAddCandidate(true)}
              className="border-2 border-dashed border-[#CBD5E1] rounded-xl p-8 flex flex-col items-center justify-center space-y-3 text-[#94A3B8] hover:border-[#007A63] hover:text-[#007A63] cursor-pointer transition-colors group bg-white/50 min-h-[220px]"
            >

              <span className="text-3xl font-light group-hover:scale-110 transition-transform">
                +
              </span>

              <span className="font-semibold text-sm">
                Add Candidate
              </span>

            </button>

          </div>

        </div>

      </div>

      {/* =========================
          ADD CANDIDATE MODAL
      ========================== */}

      {showAddCandidate && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
          onClick={() => setShowAddCandidate(false)}
        >

          <div
            className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6"
            onClick={(event) => event.stopPropagation()}
          >

            {/* Modal Header */}

            <div className="flex items-center justify-between mb-6">

              <div>

                <h2 className="text-xl font-bold text-[#0F172A]">
                  Add Candidate
                </h2>

                <p className="text-sm text-[#64748B] mt-1">
                  Create a new candidate profile
                </p>

              </div>

              <button
                type="button"
                onClick={() => setShowAddCandidate(false)}
                className="text-[#64748B] hover:text-[#0F172A] text-2xl"
              >
                ×
              </button>

            </div>

            {/* Form */}

            <form
              onSubmit={handleAddCandidate}
              className="space-y-4"
            >

              {/* Name */}

              <div>

                <label className="block text-sm font-semibold text-[#334155] mb-1">
                  Candidate Name
                </label>

                <input
                  type="text"
                  value={newCandidate.name}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Priya Sharma"
                  className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2.5 text-sm outline-none focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/10"
                  required
                />

              </div>

              {/* Role */}

              <div>

                <label className="block text-sm font-semibold text-[#334155] mb-1">
                  Job Role
                </label>

                <input
                  type="text"
                  value={newCandidate.role}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      role: e.target.value,
                    })
                  }
                  placeholder="e.g. AI Engineer"
                  className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2.5 text-sm outline-none focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/10"
                  required
                />

              </div>

              {/* Progress */}

              <div>

                <label className="block text-sm font-semibold text-[#334155] mb-1">
                  Learning Progress (%)
                </label>

                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newCandidate.progress}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      progress: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2.5 text-sm outline-none focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/10"
                />

              </div>

              {/* Skipped Topics */}

              <div>

                <label className="block text-sm font-semibold text-[#334155] mb-1">
                  Skipped Topics
                </label>

                <input
                  type="text"
                  value={newCandidate.skippedTopics}
                  onChange={(e) =>
                    setNewCandidate({
                      ...newCandidate,
                      skippedTopics: e.target.value,
                    })
                  }
                  placeholder="RAG, Vector DB, LangChain"
                  className="w-full rounded-lg border border-[#CBD5E1] px-3 py-2.5 text-sm outline-none focus:border-[#007A63] focus:ring-2 focus:ring-[#007A63]/10"
                />

                <p className="text-xs text-[#94A3B8] mt-1">
                  Separate multiple topics with commas.
                </p>

              </div>

              {/* Buttons */}

              <div className="flex gap-3 pt-3">

                <button
                  type="button"
                  onClick={() =>
                    setShowAddCandidate(false)
                  }
                  className="flex-1 rounded-lg border border-[#CBD5E1] px-4 py-2.5 text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="flex-1 rounded-lg bg-[#007A63] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#006653] transition-colors"
                >
                  Add Candidate
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </PageTransition>
  );
}