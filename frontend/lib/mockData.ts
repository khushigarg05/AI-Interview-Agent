import { CandidateProfile, ConversationTurn, FeedbackReport, BackendCandidate } from './types';

export const defaultCandidatePayload: BackendCandidate = {
  member: {
    id: "CAND-001",
    name: "Alex Chen",
    jobRole: "Software Engineer"
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

export const mockCandidates: CandidateProfile[] = [
  {
    id: 'alex-chen',
    name: 'Alex Chen',
    jobRole: 'Software Engineer',
    progressPercent: 60,
    currentQuestion: 5,
    totalQuestions: 8,
    skippedTopics: ['System Design', 'Data Structures'],
    currentTopic: 'Embeddings & Vector Search',
    currentTopicDescription: 'Assessing knowledge of vector storage and retrieval architecture.',
    backendPayload: defaultCandidatePayload
  },
  {
    id: 'jordan-smith',
    name: 'Jordan Smith',
    jobRole: 'AI Engineer',
    progressPercent: 25,
    currentQuestion: 2,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: 'Algorithms',
    currentTopicDescription: 'Assessing dynamic programming and search techniques.',
    backendPayload: {
      member: { id: "CAND-002", name: "Jordan Smith", jobRole: "AI Engineer" },
      missions: [{ day: 5, title: "Data Structures", passed: true, attempts: 1 }],
      signals: { commitDays: 12, missionsCompleted: 15, missionsFirstTry: 10 }
    }
  },
  {
    id: 'khushi-garg',
    name: 'Khushi Garg',
    jobRole: 'AI Cohort Engineer',
    progressPercent: 25,
    currentQuestion: 2,
    totalQuestions: 8,
    skippedTopics: ['Binary Trees', 'System Design Basics'],
    currentTopic: 'Vector Databases',
    currentTopicDescription: 'Assessing knowledge of embedding storage and retrieval.',
    backendPayload: {
      member: { id: "CAND-003", name: "Khushi Garg", jobRole: "AI Cohort Engineer" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 29, title: "System Design Basics", skipped: true }
      ],
      signals: { commitDays: 24, missionsCompleted: 28, missionsFirstTry: 22 }
    }
  }
];

export const defaultCandidate = mockCandidates[2]; // Khushi Garg

export const sampleSessionTurns: ConversationTurn[] = [
  {
    id: '1',
    sender: 'interviewer',
    senderName: 'AI Interviewer',
    text: "Welcome. Let's start with a foundational concept. Can you explain the primary difference between a traditional relational database (like PostgreSQL) and a vector database when it comes to search capabilities?"
  },
  {
    id: '2',
    sender: 'candidate',
    senderName: 'You',
    text: "Relational databases typically use exact keyword matching or full-text search based on inverted indexes. Vector databases, however, store data as high-dimensional vectors and perform semantic search using algorithms like Approximate Nearest Neighbor (ANN). This allows them to find data that is conceptually similar, even if exact keywords don't match."
  },
  {
    id: '3',
    sender: 'interviewer',
    senderName: 'AI Interviewer',
    text: "That's a solid explanation. Building on that, how would you handle the trade-off between search speed and recall accuracy when configuring an ANN index like HNSW (Hierarchical Navigable Small World) in a production vector database?"
  }
];

export const sampleFeedbackReport: FeedbackReport = {
  sessionId: 'sess-101',
  candidateName: 'Sarah Johnson',
  hireStatus: 'Strong Hire',
  summary: "The candidate demonstrated a solid understanding of core algorithms and data structures. Communication was clear, and they articulated their thought process effectively during problem-solving. While initial implementations were slightly unoptimized, they quickly identified bottlenecks and refactored code appropriately after prompts. They show great potential for senior-level architectural discussions.",
  overallScore: 85,
  strengths: [
    {
      title: 'Algorithmic Problem Solving',
      description: 'Quickly identified optimal solutions using Dynamic Programming for complex graph traversal problems.'
    },
    {
      title: 'Communication',
      description: "Excellent 'think out loud' protocol. Clarified edge cases before writing any code."
    },
    {
      title: 'System Design Basics',
      description: 'Strong grasp of load balancing and database sharding concepts during the unstructured Q&A.'
    }
  ],
  areasToImprove: [
    {
      title: 'Time Complexity Analysis',
      description: 'Struggled initially to accurately state the Big O notation for recursive functions involving memoization.'
    },
    {
      title: 'Code Cleanliness',
      description: 'Variable naming could be more descriptive. Tended to use single-letter variables outside of loops.'
    },
    {
      title: 'Testing',
      description: 'Did not proactively write unit tests or dry-run code with extreme edge cases until prompted.'
    }
  ],
  topicPerformances: [
    {
      topic: 'Data Structures',
      subtopics: 'Arrays, Hash Maps, Trees',
      score: 90,
      color: 'teal'
    },
    {
      topic: 'Algorithms',
      subtopics: 'Sorting, Searching, Dynamic Prog.',
      score: 75,
      color: 'teal'
    },
    {
      topic: 'Code Quality',
      subtopics: 'Readability, Maintainability, Naming',
      score: 60,
      color: 'orange'
    },
    {
      topic: 'Communication',
      subtopics: 'Clarity, Articulation of constraints',
      score: 95,
      color: 'teal'
    }
  ],
  nextSteps: [
    'Deep dive into ANN index tuning (HNSW efSearch & M parameters)',
    'Practice Big-O time complexity analysis for recursive memoized algorithms'
  ]
};
