export interface MemberInfo {
  id: string;
  name: string;
  jobRole: string;
  yearsExperience?: number;
  education?: string;
  status?: string;
}

export interface MissionInfo {
  day: number;
  title: string;
  passed?: boolean;
  attempts?: number;
  skipped?: boolean;
}

export interface SignalInfo {
  commitDays: number;
  missionsCompleted: number;
  missionsFirstTry: number;
}

export interface BackendCandidate {
  member: MemberInfo;
  missions: MissionInfo[];
  signals: SignalInfo;
}

export interface StartInterviewPayload {
  sessionId: string;
  candidate: BackendCandidate;
}

export interface SubmitAnswerPayload {
  sessionId: string;
  message: string;
}

export interface BackendFeedback {
  summary: string;
  strengths: string[];
  gaps: string[];
  improvements?: string[];
  areasToImprove?: string[];
  next: string[];
  overall_score?: number;
  recommendation?: string;
  candidate_name?: string;
}

export interface BackendInterviewResponse {
  reply: string;
  done: boolean;
  feedback: BackendFeedback | null;
  questionNumber?: number;
  totalQuestions?: number;
  progress?: string;
  currentTopic?: string;
}

// UI Types matching Stitch Design
export interface CandidateProfile {
  id: string;
  name: string;
  jobRole: string;
  yearsExperience?: number;
  education?: string;
  avatar?: string;
  progressPercent: number;
  currentQuestion: number;
  totalQuestions: number;
  skippedTopics: string[];
  currentTopic: string;
  currentTopicDescription: string;
  backendPayload: BackendCandidate;
}

export interface ConversationTurn {
  id: string;
  sender: 'interviewer' | 'candidate';
  senderName: string;
  avatar?: string;
  text: string;
  timestamp?: string;
}

export interface DetailedStrength {
  title: string;
  description: string;
}

export interface DetailedImprovement {
  title: string;
  description: string;
}

export interface TopicPerformance {
  topic: string;
  subtopics: string;
  score: number;
  color?: 'teal' | 'orange' | 'green' | 'red';
}

export interface FeedbackReport {
  sessionId: string;
  candidateName: string;
  hireStatus: 'Strong Hire' | 'Hire' | 'Weak Pass' | 'No Hire';
  summary: string;
  overallScore: number;
  strengths: DetailedStrength[];
  areasToImprove: DetailedImprovement[];
  topicPerformances: TopicPerformance[];
  nextSteps?: string[];
}
