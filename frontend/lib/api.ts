import {
  BackendCandidate,
  BackendInterviewResponse,
  BackendFeedback,
  StartInterviewPayload,
  SubmitAnswerPayload
} from './types';
import { sampleFeedbackReport } from './mockData';

const API_ENDPOINT = 'https://ai-interview-agent-rf0q.onrender.com/api/interview';

const defaultHeaders = {
  'Content-Type': 'application/json',
  'Bypass-Tunnel-Reminder': 'true',
  'bypass-tunnel-reminder': 'true',
  'ngrok-skip-browser-warning': 'true'
};

/**
 * Default candidate payload provided in the API contract
 */
export const defaultCandidatePayload: BackendCandidate = {
  member: {
    id: "CAND-001",
    name: "Sarah Johnson",
    jobRole: "Senior Data Engineer"
  },
  missions: [
    { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
    { day: 29, title: "Monitoring, Logging & Observability", skipped: true }
  ],
  signals: {
    commitDays: 28,
    missionsCompleted: 30,
    missionsFirstTry: 20
  }
};

/**
 * Start or initialize an interview session with candidate details
 */
export async function startInterview(
  sessionId: string,
  candidate: BackendCandidate = defaultCandidatePayload
): Promise<BackendInterviewResponse> {
  const payload: StartInterviewPayload = {
    sessionId,
    candidate
  };

  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: BackendInterviewResponse = await res.json();
    
    if (data.done && data.feedback) {
      saveFeedback(sessionId, data.feedback);
    }

    return data;
  } catch (error) {
    console.warn('Backend API connection failed, using fallback mock response:', error);
    return {
      reply: `Welcome ${candidate.member.name}. Let's start with a foundational concept. Can you explain the primary difference between a traditional relational database (like PostgreSQL) and a vector database when it comes to search capabilities?`,
      done: false,
      feedback: null
    };
  }
}

/**
 * Submit candidate response answer
 */
export async function sendAnswer(
  sessionId: string,
  message: string
): Promise<BackendInterviewResponse> {
  const payload: SubmitAnswerPayload = {
    sessionId,
    message
  };

  try {
    const res = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: defaultHeaders,
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data: BackendInterviewResponse = await res.json();

    if (data.done && data.feedback) {
      saveFeedback(sessionId, data.feedback);
    }

    return data;
  } catch (error) {
    console.warn('Backend API submission failed, using fallback mock response:', error);
    return {
      reply: "That's a solid explanation. Building on that, how would you handle the trade-off between search speed and recall accuracy when configuring an ANN index like HNSW (Hierarchical Navigable Small World) in a production vector database?",
      done: false,
      feedback: null
    };
  }
}

/**
 * Skip current question
 */
export async function skipQuestion(sessionId: string): Promise<BackendInterviewResponse> {
  return sendAnswer(sessionId, "Skip this question");
}

/**
 * Save backend feedback to sessionStorage
 */
export function saveFeedback(sessionId: string, feedback: BackendFeedback): void {
  if (typeof window !== 'undefined') {
    try {
      sessionStorage.setItem(`feedback_${sessionId}`, JSON.stringify(feedback));
    } catch (e) {
      console.error('Failed to save feedback to sessionStorage', e);
    }
  }
}

/**
 * Retrieve saved backend feedback from sessionStorage
 */
export function getSavedFeedback(sessionId: string): BackendFeedback | null {
  if (typeof window !== 'undefined') {
    try {
      const data = sessionStorage.getItem(`feedback_${sessionId}`);
      if (data) {
        return JSON.parse(data);
      }
    } catch (e) {
      console.error('Failed to parse feedback from sessionStorage', e);
    }
  }
  return null;
}

const FEEDBACK_ENDPOINT = 'https://ai-interview-agent-rf0q.onrender.com/feedback';

/**
 * Fetch feedback report from the separate Feedback Report API
 */
export async function getFeedbackReport(sessionId: string): Promise<BackendFeedback> {
  const url = `${FEEDBACK_ENDPOINT}/${sessionId}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: defaultHeaders
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch feedback report. Status: ${res.status}`);
  }

  const data = await res.json();
  
  const feedback: BackendFeedback = {
    summary: data.summary || '',
    strengths: data.strengths || [],
    gaps: data.gaps || data.improvements || data.areasToImprove || [],
    next: data.next || [],
    overall_score: data.overall_score,
    recommendation: data.recommendation,
    candidate_name: data.candidate_name
  };

  saveFeedback(sessionId, feedback);

  return feedback;
}
