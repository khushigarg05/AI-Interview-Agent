import { CandidateProfile, ConversationTurn, FeedbackReport, BackendCandidate } from './types';

export const all20Candidates: CandidateProfile[] = [
  {
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    jobRole: 'Senior Data Engineer',
    yearsExperience: 9,
    education: 'MS Computer Science',
    progressPercent: 75,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ['Monitoring, Logging & Observability'],
    currentTopic: 'Embeddings Explained',
    currentTopicDescription: 'Assessing knowledge of vector embeddings, dimensional reduction, and semantic clustering.',
    backendPayload: {
      member: { id: "CAND-001", name: "Sarah Johnson", jobRole: "Senior Data Engineer", yearsExperience: 9, education: "MS Computer Science" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 2 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 3 },
        { day: 29, title: "Monitoring, Logging & Observability", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 28, missionsCompleted: 30, missionsFirstTry: 20 }
    }
  },
  {
    id: 'alex-turner',
    name: 'Alex Turner',
    jobRole: 'Backend Software Engineer',
    yearsExperience: 5,
    education: 'B.Tech Computer Science',
    progressPercent: 60,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ['Retrieval & Matching Engine (4 attempts)'],
    currentTopic: 'Vector Databases Overview',
    currentTopicDescription: 'Evaluating local ChromaDB vs Pinecone cloud indexing trade-offs.',
    backendPayload: {
      member: { id: "CAND-002", name: "Alex Turner", jobRole: "Backend Software Engineer", yearsExperience: 5, education: "B.Tech Computer Science" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
        { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 4 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
        { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
      ],
      signals: { commitDays: 22, missionsCompleted: 29, missionsFirstTry: 10 }
    }
  },
  {
    id: 'emily-chen',
    name: 'Emily Chen',
    jobRole: 'AI Engineer',
    yearsExperience: 6,
    education: 'MS Artificial Intelligence',
    progressPercent: 95,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: 'Multi-Agent Orchestration',
    currentTopicDescription: 'Deep dive into LangGraph, ReAct agents, and Model Context Protocol.',
    backendPayload: {
      member: { id: "CAND-003", name: "Emily Chen", jobRole: "AI Engineer", yearsExperience: 6, education: "MS Artificial Intelligence" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
        { day: 11, title: "RAG End-to-End & LLM API Basics", passed: true, attempts: 1 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
        { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
        { day: 21, "title": "LangChain Agents", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 }
    }
  },
  {
    id: 'michael-brown',
    name: 'Michael Brown',
    jobRole: 'DevOps Engineer',
    yearsExperience: 10,
    education: 'B.Tech Information Technology',
    progressPercent: 70,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ['Prompt Engineering Fundamentals (4 attempts)'],
    currentTopic: 'Docker & Kubernetes Deployment',
    currentTopicDescription: 'Assessing containerization, cluster orchestration, and production health probes.',
    backendPayload: {
      member: { id: "CAND-005", name: "Michael Brown", jobRole: "DevOps Engineer", yearsExperience: 10, education: "B.Tech Information Technology" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 2 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 2 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
        { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 3 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 29, title: "Monitoring, Logging & Observability", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 30, missionsCompleted: 31, missionsFirstTry: 22 }
    }
  },
  {
    id: 'zara-ahmadi',
    name: 'Zara Ahmadi',
    jobRole: 'AI Engineer',
    yearsExperience: 1,
    education: 'BS Computer Science',
    progressPercent: 90,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: 'Model Context Protocol (MCP)',
    currentTopicDescription: 'Assessing standardized tool integration, JSON-RPC protocols, and client connections.',
    backendPayload: {
      member: { id: "CAND-009", name: "Zara Ahmadi", jobRole: "AI Engineer", yearsExperience: 1, education: "BS Computer Science" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
        { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
        { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
        { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 29 }
    }
  },
  {
    id: 'david-miller',
    name: 'David Miller',
    jobRole: 'Business Analyst',
    yearsExperience: 8,
    education: 'MBA',
    progressPercent: 50,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ['Docker & Kubernetes Deployment'],
    currentTopic: 'Conversation Memory & Context',
    currentTopicDescription: 'Assessing context window optimization, summarization, and token limits.',
    backendPayload: {
      member: { id: "CAND-004", name: "David Miller", jobRole: "Business Analyst", yearsExperience: 8, education: "MBA" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 5 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 3 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
        { day: 20, title: "Conversation Memory & Context Management", passed: true, attempts: 3 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 4 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 5 },
        { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
      ],
      signals: { commitDays: 18, missionsCompleted: 28, missionsFirstTry: 6 }
    }
  }
];

export const mockCandidates: CandidateProfile[] = all20Candidates.slice(0, 3);

export const defaultCandidate = all20Candidates[0]; // Sarah Johnson

export const sampleSessionTurns: ConversationTurn[] = [
  {
    id: '1',
    sender: 'interviewer',
    senderName: 'AI Interviewer',
    text: "Welcome Sarah Johnson! Let's begin your technical interview for the Senior Data Engineer position.\n\nQuestion 1 (Day 7 - Embeddings Explained):\nWhat approach would you take to generate and store vector embeddings for a large corpus of unstructured clinical notes, and how would you evaluate embedding quality in terms of capturing semantic relationships?"
  }
];

export const sampleFeedbackReport: FeedbackReport = {
  sessionId: 'sess-101',
  candidateName: 'Sarah Johnson',
  hireStatus: 'Strong Hire',
  summary: "Sarah Johnson completed the technical evaluation for Senior Data Engineer with exceptional competence. Demonstrated solid understanding of vector embeddings, HNSW indexing trade-offs, and structured Kafka/Elasticsearch telemetry. Highly recommended for senior engineering roles.",
  overallScore: 85,
  strengths: [
    {
      title: 'Vector Search & Embeddings',
      description: 'Clearly explained Sentence Transformers, cosine similarity clustering, and high-dimensional semantic search.'
    },
    {
      title: 'Observability & Telemetry',
      description: 'Strong architectural grasp of Fluent Bit, Kafka logging queues, and Prometheus/Grafana dashboards.'
    },
    {
      title: 'Structured Problem Solving',
      description: 'Proactively articulated latency, recall accuracy, and memory trade-offs when designing retrieval systems.'
    }
  ],
  areasToImprove: [
    {
      title: 'Multi-Agent Orchestration',
      description: 'Deepen understanding of LangGraph cycle states and agent error recovery mechanics.'
    },
    {
      title: 'MCP Protocol Tool Schemas',
      description: 'Review JSON-RPC tool schema validation and client connection timeouts.'
    }
  ],
  topicPerformances: [
    {
      topic: 'Embeddings & Vector Search',
      subtopics: 'Sentence Transformers, ChromaDB, HNSW',
      score: 90,
      color: 'teal'
    },
    {
      topic: 'LLM & Prompt Engineering',
      subtopics: 'Function Calling, Pydantic, Grounding',
      score: 85,
      color: 'teal'
    },
    {
      topic: 'Agentic AI & MCP',
      subtopics: 'LangChain, LangGraph, Tools',
      score: 75,
      color: 'teal'
    },
    {
      topic: 'Logging & Deployment',
      subtopics: 'Docker, Kubernetes, Prometheus',
      score: 80,
      color: 'teal'
    }
  ],
  nextSteps: [
    'Build end-to-end multi-agent orchestration projects using LangGraph and MCP',
    'Deep dive into vector search indexing, hybrid retrieval, and latency benchmarks',
    'Practice live containerization and Kubernetes cluster deployment for AI workloads'
  ]
};
