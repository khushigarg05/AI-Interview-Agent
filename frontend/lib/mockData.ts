import { CandidateProfile } from './types';

export const all20Candidates: CandidateProfile[] = [
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    jobRole: "Senior Data Engineer",
    yearsExperience: 9,
    education: "MS Computer Science",
    progressPercent: 75,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Monitoring, Logging & Observability"],
    currentTopic: "Embeddings Explained",
    currentTopicDescription: "Vector embeddings, dimensionality trade-offs, and cosine similarity indexing.",
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
    id: "alex-turner",
    name: "Alex Turner",
    jobRole: "Backend Software Engineer",
    yearsExperience: 5,
    education: "B.Tech Computer Science",
    progressPercent: 60,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Retrieval & Matching Engine (4 attempts)"],
    currentTopic: "Vector Databases Overview",
    currentTopicDescription: "Comparing ChromaDB, Pinecone, and Qdrant for low-latency indexing.",
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
    id: "emily-chen",
    name: "Emily Chen",
    jobRole: "AI Engineer",
    yearsExperience: 6,
    education: "MS Artificial Intelligence",
    progressPercent: 95,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Multi-Agent Orchestration",
    currentTopicDescription: "LangGraph, CrewAI, multi-agent state machines, and failure recovery.",
    backendPayload: {
      member: { id: "CAND-003", name: "Emily Chen", jobRole: "AI Engineer", yearsExperience: 6, education: "MS Artificial Intelligence" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
        { day: 11, title: "RAG End-to-End & LLM API Basics", passed: true, attempts: 1 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
        { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
        { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 30 }
    }
  },
  {
    id: "david-miller",
    name: "David Miller",
    jobRole: "Business Analyst",
    yearsExperience: 8,
    education: "MBA",
    progressPercent: 55,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Docker & Kubernetes Deployment"],
    currentTopic: "Conversation Memory & Context Management",
    currentTopicDescription: "Managing context windows, summarization buffers, and state serialization.",
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
  },
  {
    id: "michael-brown",
    name: "Michael Brown",
    jobRole: "DevOps Engineer",
    yearsExperience: 10,
    education: "B.Tech Information Technology",
    progressPercent: 85,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Prompt Engineering Fundamentals"],
    currentTopic: "Docker & Kubernetes Deployment",
    currentTopicDescription: "Containerizing AI microservices, GPU autoscaling, and zero-downtime rollouts.",
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
    id: "wendy-foster",
    name: "Wendy Foster",
    jobRole: "Marketing Manager",
    yearsExperience: 12,
    education: "BA Marketing",
    progressPercent: 50,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Security, Privacy & Guardrails", "Docker Deployment"],
    currentTopic: "Chatbot Frontend Development",
    currentTopicDescription: "React UI components, WebSockets streaming, and Markdown rendering.",
    backendPayload: {
      member: { id: "CAND-006", name: "Wendy Foster", jobRole: "Marketing Manager", yearsExperience: 12, education: "BA Marketing" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 4 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
        { day: 17, title: "Chatbot Frontend Development", passed: true, attempts: 2 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 5 },
        { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
        { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
      ],
      signals: { commitDays: 19, missionsCompleted: 24, missionsFirstTry: 2 }
    }
  },
  {
    id: "ethan-brooks",
    name: "Ethan Brooks",
    jobRole: "Computer Science Intern",
    yearsExperience: 0,
    education: "BS Computer Science (in progress)",
    progressPercent: 78,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Docker & Kubernetes Deployment", "Security & Guardrails"],
    currentTopic: "First AI Project, React Frontend & GitHub",
    currentTopicDescription: "Git workflows, fullstack Next.js scaffolding, and AI endpoint integration.",
    backendPayload: {
      member: { id: "CAND-007", name: "Ethan Brooks", jobRole: "Computer Science Intern", yearsExperience: 0, education: "BS CS in progress" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
        { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 1 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 2 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
        { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
      ],
      signals: { commitDays: 26, missionsCompleted: 27, missionsFirstTry: 22 }
    }
  },
  {
    id: "harold-whitfield",
    name: "Harold Whitfield",
    jobRole: "Distinguished Engineer",
    yearsExperience: 28,
    education: "BS Computer Science",
    progressPercent: 82,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Fine-Tuning LoRA & QLoRA"],
    currentTopic: "Reading & Processing Structured Data",
    currentTopicDescription: "Polars, DuckDB, parquet ETL pipelines, and high-throughput data processing.",
    backendPayload: {
      member: { id: "CAND-008", name: "Harold Whitfield", jobRole: "Distinguished Engineer", yearsExperience: 28, education: "BS Computer Science" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
        { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 1 },
        { day: 5, title: "Reading & Processing Unstructured Data", passed: true, attempts: 1 },
        { day: 14, title: "Fine-Tuning: Concepts & When to Use It", skipped: true },
        { day: 15, title: "Fine-Tuning: Hands-On with LoRA & QLoRA", skipped: true },
        { day: 21, title: "LangChain Agents", passed: true, attempts: 5 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 4 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 5 },
        { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
      ],
      signals: { commitDays: 25, missionsCompleted: 27, missionsFirstTry: 15 }
    }
  },
  {
    id: "zara-ahmadi",
    name: "Zara Ahmadi",
    jobRole: "AI Engineer",
    yearsExperience: 1,
    education: "BS Computer Science",
    progressPercent: 92,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Model Context Protocol (MCP)",
    currentTopicDescription: "Custom MCP tool servers, stdio/SSE transports, and dynamic function binding.",
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
    id: "gerald-combs",
    name: "Gerald Combs",
    jobRole: "IT Support Specialist",
    yearsExperience: 20,
    education: "AAS Information Technology",
    progressPercent: 45,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Security Guardrails", "Docker & Kubernetes"],
    currentTopic: "VS Code & Python Environment Setup",
    currentTopicDescription: "Virtual environments, dependency management, and local terminal workflows.",
    backendPayload: {
      member: { id: "CAND-010", name: "Gerald Combs", jobRole: "IT Support Specialist", yearsExperience: 20, education: "AAS IT" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
        { day: 8, title: "Vector Databases Overview", passed: false, attempts: 4 },
        { day: 10, title: "Retrieval & Matching Engine", passed: false, attempts: 3 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
        { day: 22, title: "Multi-Agent Orchestration", passed: false, attempts: 3 },
        { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
        { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
      ],
      signals: { commitDays: 22, missionsCompleted: 23, missionsFirstTry: 1 }
    }
  },
  {
    id: "mia-alvarez",
    name: "Mia Alvarez",
    jobRole: "UX Researcher",
    yearsExperience: 6,
    education: "MA Human-Computer Interaction",
    progressPercent: 40,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Embeddings", "Vector Databases", "Multi-Agent"],
    currentTopic: "Local LLM & AI Coding Assistant Setup",
    currentTopicDescription: "Ollama, LM Studio, local model quantization, and prompt formatting.",
    backendPayload: {
      member: { id: "CAND-011", name: "Mia Alvarez", jobRole: "UX Researcher", yearsExperience: 6, education: "MA HCI" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
        { day: 2, title: "Local LLM & AI Coding Assistant Setup", passed: true, attempts: 1 },
        { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 3 },
        { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 2 },
        { day: 7, title: "Embeddings Explained", skipped: true },
        { day: 8, title: "Vector Databases Overview", skipped: true },
        { day: 12, title: "Prompt Engineering Fundamentals", skipped: true },
        { day: 16, title: "Chatbot Backend & API Integration", skipped: true },
        { day: 22, title: "Multi-Agent Orchestration", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 4 }
      ],
      signals: { commitDays: 9, missionsCompleted: 14, missionsFirstTry: 5 }
    }
  },
  {
    id: "chen-wei",
    name: "Chen Wei",
    jobRole: "Mobile App Developer",
    yearsExperience: 7,
    education: "BS Computer Engineering",
    progressPercent: 76,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Building & Populating Vector Databases",
    currentTopicDescription: "Document chunking strategies, indexing latency, and batch vector inserts.",
    backendPayload: {
      member: { id: "CAND-012", name: "Chen Wei", jobRole: "Mobile App Developer", yearsExperience: 7, education: "BS Computer Engineering" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
        { day: 9, title: "Building & Populating the Vector Database", passed: true, attempts: 4 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 4 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
        { day: 18, title: "Streaming Responses", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 30, title: "Production Readiness & Final Testing", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 27, missionsCompleted: 30, missionsFirstTry: 14 }
    }
  },
  {
    id: "ravi-patel",
    name: "Ravi Patel",
    jobRole: "Software Engineer",
    yearsExperience: 15,
    education: "MS Computer Science",
    progressPercent: 80,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Security, Privacy & Guardrails",
    currentTopicDescription: "NeMo Guardrails, prompt injection defenses, and PII masking techniques.",
    backendPayload: {
      member: { id: "CAND-013", name: "Ravi Patel", jobRole: "Software Engineer", yearsExperience: 15, education: "MS Computer Science" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
        { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 2 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 3 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 2 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 3 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 2 },
        { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 27, missionsCompleted: 30, missionsFirstTry: 13 }
    }
  },
  {
    id: "bethany-cole",
    name: "Bethany Cole",
    jobRole: "HR Manager",
    yearsExperience: 10,
    education: "BA Human Resources",
    progressPercent: 42,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Vector DBs", "Multi-Agent", "Docker"],
    currentTopic: "Conversation Memory & Context Management",
    currentTopicDescription: "Session token budgets and stateful chat memory persistence.",
    backendPayload: {
      member: { id: "CAND-014", name: "Bethany Cole", jobRole: "HR Manager", yearsExperience: 10, education: "BA Human Resources" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 4 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
        { day: 8, title: "Vector Databases Overview", skipped: true },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
        { day: 20, title: "Conversation Memory & Context Management", passed: true, attempts: 3 },
        { day: 22, title: "Multi-Agent Orchestration", skipped: true },
        { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
        { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 4 }
      ],
      signals: { commitDays: 17, missionsCompleted: 20, missionsFirstTry: 1 }
    }
  },
  {
    id: "noah-kim",
    name: "Noah Kim",
    jobRole: "Principal Architect",
    yearsExperience: 20,
    education: "MS Computer Science",
    progressPercent: 96,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Fine-Tuning LoRA & QLoRA"],
    currentTopic: "LangChain Agents & MCP",
    currentTopicDescription: "Autonomous plan-and-solve agents, LangGraph DAGs, and tool calling.",
    backendPayload: {
      member: { id: "CAND-015", name: "Noah Kim", jobRole: "Principal Architect", yearsExperience: 20, education: "MS Computer Science" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 14, title: "Fine-Tuning: Concepts & When to Use It", skipped: true },
        { day: 15, title: "Fine-Tuning: Hands-On with LoRA & QLoRA", skipped: true },
        { day: 21, title: "LangChain Agents", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
        { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 29, missionsCompleted: 29, missionsFirstTry: 27 }
    }
  },
  {
    id: "isabella-rossi",
    name: "Isabella Rossi",
    jobRole: "Software Engineer",
    yearsExperience: 5,
    education: "BS Computer Science",
    progressPercent: 52,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Security Guardrails", "Docker Deployment"],
    currentTopic: "Chatbot Backend & API Integration",
    currentTopicDescription: "FastAPI async endpoints, request validation, and streaming SSE responses.",
    backendPayload: {
      member: { id: "CAND-016", name: "Isabella Rossi", jobRole: "Software Engineer", yearsExperience: 5, education: "BS Computer Science" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
        { day: 7, title: "Embeddings Explained", passed: false, attempts: 4 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 3 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: false, attempts: 5 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 2 },
        { day: 22, title: "Multi-Agent Orchestration", passed: false, attempts: 4 },
        { day: 27, title: "Security, Privacy & Guardrails", skipped: true },
        { day: 28, title: "Docker & Kubernetes Deployment", skipped: true },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
      ],
      signals: { commitDays: 19, missionsCompleted: 21, missionsFirstTry: 2 }
    }
  },
  {
    id: "tyler-brooks",
    name: "Tyler Brooks",
    jobRole: "Junior Developer",
    yearsExperience: 0,
    education: "GED + Coding Bootcamp Certificate",
    progressPercent: 74,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Retrieval & Matching Engine",
    currentTopicDescription: "Vector search queries, top-k ranking, and cosine distance thresholds.",
    backendPayload: {
      member: { id: "CAND-017", name: "Tyler Brooks", jobRole: "Junior Developer", yearsExperience: 0, education: "Bootcamp Cert" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 3 },
        { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 5 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 5 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 5 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 5 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 5 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 4 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 5 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 4 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 3 }
      ],
      signals: { commitDays: 30, missionsCompleted: 31, missionsFirstTry: 1 }
    }
  },
  {
    id: "diane-foster",
    name: "Diane Foster",
    jobRole: "AI Engineer",
    yearsExperience: 4,
    education: "MS Computer Science",
    progressPercent: 98,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Function Calling & Structured Outputs",
    currentTopicDescription: "Pydantic schema constraints, JSON mode, and tool execution pipelines.",
    backendPayload: {
      member: { id: "CAND-018", name: "Diane Foster", jobRole: "AI Engineer", yearsExperience: 4, education: "MS Computer Science" },
      missions: [
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 1 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 1 },
        { day: 10, title: "Retrieval & Matching Engine", passed: true, attempts: 1 },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
        { day: 13, title: "Function Calling & Structured Outputs", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 23, title: "Model Context Protocol (MCP)", passed: true, attempts: 1 },
        { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 31, missionsCompleted: 31, missionsFirstTry: 31 }
    }
  },
  {
    id: "frank-deluca",
    name: "Frank DeLuca",
    jobRole: "Legacy Systems Engineer",
    yearsExperience: 25,
    education: "BS Computer Science",
    progressPercent: 72,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: [],
    currentTopic: "Response Formatting & Rich Outputs",
    currentTopicDescription: "Markdown, LaTeX, tables, and streaming output formatting for LLMs.",
    backendPayload: {
      member: { id: "CAND-019", name: "Frank DeLuca", jobRole: "Legacy Systems Engineer", yearsExperience: 25, education: "BS Computer Science" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 2 },
        { day: 4, title: "Reading & Processing Structured Data", passed: true, attempts: 1 },
        { day: 7, title: "Embeddings Explained", passed: true, attempts: 4 },
        { day: 8, title: "Vector Databases Overview", passed: true, attempts: 3 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
        { day: 17, title: "Chatbot Frontend Development", passed: true, attempts: 5 },
        { day: 19, title: "Response Formatting & Rich Outputs", passed: true, attempts: 4 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 3 },
        { day: 28, title: "Docker & Kubernetes Deployment", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 2 }
      ],
      signals: { commitDays: 26, missionsCompleted: 29, missionsFirstTry: 11 }
    }
  },
  {
    id: "priyanka-sharma",
    name: "Priyanka Sharma",
    jobRole: "Software Engineer",
    yearsExperience: 5,
    education: "BS Computer Science",
    progressPercent: 68,
    currentQuestion: 1,
    totalQuestions: 8,
    skippedTopics: ["Reading Structured Data", "Vector Databases"],
    currentTopic: "Prompt Engineering Fundamentals",
    currentTopicDescription: "Few-shot prompting, system message constraints, and prompt testing.",
    backendPayload: {
      member: { id: "CAND-020", name: "Priyanka Sharma", jobRole: "Software Engineer", yearsExperience: 5, education: "BS Computer Science" },
      missions: [
        { day: 1, title: "VS Code & Python Environment Setup", passed: true, attempts: 1 },
        { day: 3, title: "First AI Project, React Frontend & GitHub", passed: true, attempts: 1 },
        { day: 4, title: "Reading & Processing Structured Data", skipped: true },
        { day: 7, title: "Embeddings Explained", passed: false, attempts: 2 },
        { day: 8, title: "Vector Databases Overview", skipped: true },
        { day: 12, title: "Prompt Engineering Fundamentals", passed: true, attempts: 1 },
        { day: 16, title: "Chatbot Backend & API Integration", passed: true, attempts: 1 },
        { day: 22, title: "Multi-Agent Orchestration", passed: true, attempts: 1 },
        { day: 27, title: "Security, Privacy & Guardrails", passed: true, attempts: 1 },
        { day: 31, title: "Capstone Project & Final Demo", passed: true, attempts: 1 }
      ],
      signals: { commitDays: 24, missionsCompleted: 27, missionsFirstTry: 19 }
    }
  }
];

export const mockCandidates = all20Candidates.slice(0, 3);
