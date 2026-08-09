# 🤖 InterviewIQ AI — Adaptive Technical Interview Agent

> **An AI-powered technical interview platform that transforms candidate learning data into personalized interviews, evaluates responses in real time, asks intelligent follow-up questions, and generates actionable candidate feedback.**

**AI Interview Agent • Adaptive Evaluation • RAG • Groq • FastAPI • Next.js**

---

# 🌐 Live Production Deployment

The complete InterviewIQ AI application is deployed and accessible online.

| Service | Live URL | Status |
|---|---|---|
| 🚀 **Live Frontend / Demo** | https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup | 🟢 Live |
🌐 Live Demo: https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app
🎯 Start Interview: https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup
| ⚡ **Backend API** | https://ai-interview-agent-rf0q.onrender.com/api/interview | 🟢 Live |
| 📋 **Interactive Swagger UI** | https://ai-interview-agent-rf0q.onrender.com/docs | 🟢 Live |
| 🩺 **Health Check** | https://ai-interview-agent-rf0q.onrender.com/health | 🟢 Live |
| 📊 **Feedback API** | https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id} | 🟢 Live |

## 🎯 Try the Live Demo

### 👉 https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup

The live application provides:

- 👤 Candidate profile selection
- 🧠 Candidate-aware interview generation
- 📚 Curriculum-grounded questions
- 🎤 Multi-turn technical interviews
- 🔍 AI-powered answer evaluation
- 🔄 Adaptive follow-up questions
- 🧩 Context-aware interview flow
- 📊 Structured final feedback
- 🎯 Candidate strengths and improvement areas

---

# 🌟 Problem Statement

Traditional technical interviews often follow a fixed sequence of questions.

This creates a major problem:

> **A candidate who struggles with one concept may receive unrelated questions instead of being intelligently assessed on their actual knowledge gaps.**

The **Interview Agent** solves this by adapting the interview based on:

- Candidate profile
- Learning journey
- Completed missions
- Skipped topics
- Learning signals
- Curriculum topics
- Previous answers
- Previous evaluations

Instead of simply asking:

> "Can you answer this question?"

InterviewIQ AI attempts to determine:

> **"What does this candidate understand, where are the gaps, and what should we ask next to measure that accurately?"**

---

# 🧠 How It Works

```text
Candidate Profile
       │
       ▼
Learning Journey
       │
       ▼
Curriculum Analysis
       │
       ▼
Relevant Topic Retrieval
       │
       ▼
AI Question Generation
       │
       ▼
Candidate Answer
       │
       ▼
AI Evaluation
       │
       ├───────────────┐
       │               │
       ▼               ▼
Strong Answer     Knowledge Gap
       │               │
       │               ▼
       │        Adaptive Follow-up
       │               │
       └───────┬───────┘
               ▼
        Next Interview Question
               │
               ▼
        Final Assessment
               │
               ▼
        Actionable Feedback
```

This creates an interview experience that behaves more like a real technical interviewer rather than a static questionnaire.

---

# ✨ Key Features

## 🧠 1. Candidate-Aware Interview Planning

The system loads candidate information and curriculum data to identify relevant technical areas.

It considers signals such as:

- Completed learning modules
- Skipped modules
- Failed attempts
- Candidate role
- Previous performance
- Curriculum day/topic
- Learning history

Instead of starting with a completely random question, the interview can target areas relevant to the candidate.

---

# 🎯 2. Curriculum-Grounded Question Generation

The question generation pipeline uses curriculum context to create technically relevant questions.

The curriculum contains the 31-day AI Cohort learning journey, including areas such as:

- Prompt Engineering
- Embeddings
- Vector Databases
- Retrieval-Augmented Generation
- Agentic AI
- MCP
- AI Evaluation
- AI Security
- Deployment
- Production AI Systems

The retrieval layer provides relevant curriculum information to the question-generation process.

### Example

```text
Candidate Profile
       │
       ▼
Learning History
       │
       ▼
Relevant / Weak Topics
       │
       ▼
Curriculum Knowledge Base
       │
       ▼
Relevant Context
       │
       ▼
Groq LLM
       │
       ▼
Technical Interview Question
```

This helps keep interview questions grounded in the intended learning journey.

---

# 🎤 3. Realistic Multi-Turn Technical Interview

InterviewIQ AI conducts the interview as a conversational process.

The candidate:

1. Receives a technical question
2. Submits an answer
3. Gets evaluated
4. Receives an adaptive follow-up when necessary
5. Continues to the next relevant topic
6. Receives structured final feedback

The goal is to simulate the reasoning and interaction of a technical interviewer.

---

# 🔄 4. Intelligent Follow-Up Questions

Adaptive follow-ups are one of the core features of the system.

If the candidate provides:

- A weak answer
- An incomplete explanation
- A shallow response
- An uncertain response
- A partially correct response
- A skipped answer

the system can generate a targeted follow-up.

### Example

**Original Question**

```text
What are embeddings?
```

**Candidate**

```text
I don't know much about embeddings.
```

**AI Follow-Up**

```text
Can you describe a scenario where high-dimensional data,
such as words or images, might need to be represented
in a lower-dimensional space?
```

The system can move toward foundational questions instead of simply repeating the original question.

---

# 🧩 5. Context-Aware Interviewing

The system maintains the current interview session and uses previous interaction information while determining the next step.

```text
Question
   ↓
Candidate Answer
   ↓
Evaluation
   ↓
Identified Strength / Gap
   ↓
Follow-Up Decision
   ↓
Next Question
```

This allows the interview to respond to the candidate's previous answer rather than treating every question independently.

---

# 📊 6. AI-Powered Response Evaluation

Candidate responses are evaluated using multiple dimensions, including:

- Technical correctness
- Depth of understanding
- Relevance
- Practical knowledge
- Technical clarity
- Production awareness

The evaluator produces structured information.

Example:

```json
{
  "score": 7,
  "evaluation": "The candidate demonstrates a good understanding of embeddings but provides limited depth and lacks practical examples.",
  "needs_follow_up": true
}
```

Scores are normalized to a **1–10 scale**.

---

# 🛡️ 7. Robust Handling of Weak Responses

The system explicitly detects common non-answers such as:

```text
skip
I don't know
no idea
not sure
hello
test
asdf
```

Instead of allowing such responses to receive an artificially high score, they can be classified as insufficient responses and trigger additional probing.

---

# 📈 8. Final Candidate Assessment

At the end of the interview, the system generates structured feedback containing:

- Overall score
- Hiring recommendation
- Technical strengths
- Improvement areas
- Weakest topics
- Candidate performance summary

Example recommendation levels:

```text
STRONG HIRE
HIRE
CONSIDER / JUNIOR ROLE
NOT RECOMMENDED / NEEDS IMPROVEMENT
```

---

# 🏆 PS #2 Requirement Coverage

The project is designed around the requirements of:

## The Interview Agent

### Minimum Requirements

| Requirement | Implementation |
|---|---|
| Conversational technical interview | ✅ Multi-turn interview flow |
| Minimum 8 questions | ✅ Interview question counter/session flow |
| At least 4 curriculum days | ✅ Curriculum-aware topic selection |
| Follow-up questions | ✅ Adaptive follow-up generation |
| Previous response context | ✅ Session state + evaluation |
| Structured final feedback | ✅ Feedback/reporting endpoint |
| Required HTTP endpoint | ✅ `POST /api/interview` |
| Candidate personalization | ✅ Candidate profile + learning signals |
| Curriculum grounding | ✅ RAG/context retrieval |
| AI-powered evaluation | ✅ LLM evaluation layer |

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │     Candidate       │
                         │      Profile        │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │ Curriculum & Mission│
                         │       Analysis      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │    RAG Retrieval    │
                         │ Topic-specific      │
                         │ Context             │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   LLM Question      │
                         │     Generator       │
                         │   Groq / Llama       │
                         └──────────┬──────────┘
                                    │
                                    ▼
                     ┌─────────────────────────────┐
                     │     Live Interview Loop     │
                     │                             │
                     │ Question → Answer → Score   │
                     │      → Follow-up → Next     │
                     └──────────────┬──────────────┘
                                    │
                       ┌────────────┴────────────┐
                       ▼                         ▼
             ┌─────────────────┐       ┌─────────────────┐
             │ Answer          │       │ Adaptive        │
             │ Evaluation      │──────▶│ Follow-up       │
             │ Engine          │       │ Generator       │
             └────────┬────────┘       └─────────────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Session State   │
             │ & Evaluations   │
             └────────┬────────┘
                      │
                      ▼
             ┌─────────────────┐
             │ Final Feedback  │
             │ & Assessment    │
             └─────────────────┘
```

---

# 🧩 Core Backend Flow

The central orchestration is handled by the backend service layer.

```text
POST /api/interview
        │
        ▼
BreethService
        │
        ├── Candidate Service
        │
        ├── Curriculum Service
        │
        ├── RAG Service
        │
        ├── LLM Service
        │
        └── Session Service
                │
                ▼
        Interview Response
```

The central orchestration layer coordinates:

- Candidate data
- Curriculum context
- Question generation
- Answer evaluation
- Adaptive follow-ups
- Session state
- Final assessment

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| **Next.js** | React web application |
| **React** | Interactive UI |
| **TypeScript** | Type-safe frontend development |
| **Tailwind CSS** | Styling and responsive UI |

The frontend lives inside the `frontend/` directory.

---

## Backend

| Technology | Purpose |
|---|---|
| **Python** | Backend development |
| **FastAPI** | REST API framework |
| **Pydantic** | Request/response validation |
| **Uvicorn** | ASGI server |

---

## AI / LLM Layer

| Technology | Purpose |
|---|---|
| **Groq** | LLM inference |
| **Llama 3.3 70B Versatile** | Question generation & evaluation |
| **LangChain** | LLM integration |
| **Google Gemini** | Optional fallback model |
| **RAG** | Curriculum-grounded retrieval |

The current backend is configured to initialize Groq first and can fall back to Gemini when configured.

---

## Data & State

The backend currently uses:

- JSON curriculum data
- JSON candidate profiles
- In-memory interview session state
- Topic-specific retrieval
- Structured Pydantic models

---

# 📁 Repository Structure

```text
AI-Interview-Agent/
│
├── ai_engine/
│   ├── agents/
│   │   ├── planner_agent.py
│   │   ├── interviewer_agent.py
│   │   └── feedback_agent.py
│   │
│   ├── prompts/
│   ├── rag/
│   └── graph.py
│
├── backend/
│   ├── data/
│   │   ├── curriculum.json
│   │   └── candidates.json
│   │
│   ├── models/
│   │   ├── request_models.py
│   │   └── response_models.py
│   │
│   ├── routes/
│   │   ├── interview.py
│   │   ├── feedback.py
│   │   └── health.py
│   │
│   └── services/
│       ├── breeth_service.py
│       ├── llm_services.py
│       ├── rag_service.py
│       ├── candidate_service.py
│       └── session_service.py
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── documentation/
│
├── PROMPTS.md
│
├── .env.example
│
└── README.md
```

---

# 🔍 Important Backend Services

## `breeth_service.py`

Central interview orchestration layer.

Responsibilities include:

- Interview session management
- Candidate context
- Question generation
- Answer evaluation
- Follow-up decisions
- Interview progression
- Final assessment coordination

---

## `llm_services.py`

LLM integration layer.

Responsibilities include:

- Initializing Groq
- Optional Gemini fallback
- Technical question generation
- Adaptive follow-up generation
- Candidate response evaluation
- Final scoring logic

---

## `rag_service.py`

Provides topic-specific curriculum context to the question-generation pipeline.

---

## `candidate_service.py`

Loads candidate information and curriculum metadata.

---

## `session_service.py`

Maintains interview session state including:

- Questions
- Answers
- Evaluations
- Scores
- Current interview progress

---

# 📚 Curriculum Intelligence

The project uses a **31-Day AI Cohort Knowledge Base**.

The curriculum can contain topics such as:

- Embeddings & Vector Search
- LLM Fundamentals
- Prompt Engineering
- RAG
- Vector Databases
- Agentic AI
- Model Context Protocol
- Evaluation
- Security
- Deployment
- Production AI Systems

Candidate mission history is used to identify relevant areas for assessment.

---

# 🔄 Adaptive Interview Example

### Step 1 — Candidate starts interview

```json
{
  "sessionId": "adaptive-test-001",
  "candidate": {
    "member": {
      "id": "CAND-001",
      "name": "Sarah Johnson",
      "jobRole": "Senior Data Engineer"
    },
    "missions": []
  }
}
```

### Step 2 — AI generates question

```text
Question 1 — Embeddings Explained

Design a system to generate and store vector embeddings
for a large corpus of unstructured data...
```

### Step 3 — Candidate answers

```text
I don't know much about embeddings.
```

### Step 4 — AI evaluates

```json
{
  "score": 1,
  "needs_follow_up": true
}
```

### Step 5 — AI adapts

```text
What is your understanding of the basic concept of
word embeddings and how they are typically used in
natural language processing tasks?
```

### Step 6 — Interview continues

The system records the response and continues the adaptive interview until the configured question limit is reached.

---

# 📡 API

## Start Interview

### `POST /api/interview`

Example:

```json
{
  "sessionId": "sess-001",
  "candidate": {
    "member": {
      "id": "CAND-001",
      "name": "Sarah Johnson",
      "jobRole": "Senior Data Engineer"
    },
    "missions": [
      {
        "day": 7,
        "title": "Embeddings Explained",
        "passed": true,
        "attempts": 1
      }
    ]
  }
}
```

---

## Submit Candidate Answer

### `POST /api/interview`

```json
{
  "sessionId": "sess-001",
  "message": "Embeddings are numerical vector representations that capture semantic meaning."
}
```

The backend evaluates the response and determines whether the candidate should receive a follow-up question or move to the next topic.

---

## Get Feedback

### `GET /feedback/{session_id}`

Returns the candidate's final interview assessment.

---

## Health Check

### `GET /health`

Used to verify that the backend is running.

---

# 🚀 Getting Started

## Prerequisites

Install:

- Python 3.11+
- Node.js 18+
- npm
- Git

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/khushigarg05/AI-Interview-Agent.git

cd AI-Interview-Agent
```

---

# 2️⃣ Configure Backend

Create a `.env` file in the project root.

Use `.env.example` as the template.

```env
GROQ_API_KEY=your_groq_api_key_here
BREETH_API_KEY=your_breeth_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

HOST=0.0.0.0
PORT=8000

MODEL_NAME=llama-3.3-70b-versatile
```

### ⚠️ Security

**Never commit your real API keys to GitHub.**

Use:

```text
.env
```

for local secrets and:

```text
.env.example
```

for safe example configuration.

---

# 3️⃣ Create Python Virtual Environment

### Windows PowerShell

```powershell
python -m venv venv

.\venv\Scripts\Activate.ps1
```

If PowerShell blocks activation, you can run the server directly using the virtual environment's Python executable.

### macOS / Linux

```bash
python3 -m venv venv

source venv/bin/activate
```

---

# 4️⃣ Install Backend Dependencies

From the repository root:

```bash
python -m pip install -r backend/requirements.txt
```

If required:

```bash
python -m pip install langchain-groq
```

---

# 5️⃣ Start FastAPI

From the repository root:

```bash
python -m uvicorn backend.main:app --reload
```

You should see:

```text
Uvicorn running on http://127.0.0.1:8000
Application startup complete.
```

---

# 6️⃣ Open API Documentation

Visit:

```text
http://localhost:8000/docs
```

FastAPI provides an interactive Swagger UI where the available endpoints can be tested directly.

---

# 7️⃣ Start the Frontend

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start Next.js:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Testing the Interview API

You can test the backend directly from PowerShell.

## Start a Session

```powershell
$body = @{
    sessionId = "adaptive-test-001"
    candidate = @{
        member = @{
            id = "CAND-001"
            name = "Sarah Johnson"
            jobRole = "Senior Data Engineer"
        }
        missions = @()
    }
} | ConvertTo-Json -Depth 10

$response = Invoke-RestMethod `
    -Uri "http://localhost:8000/api/interview" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$response | ConvertTo-Json -Depth 10
```

---

## Submit an Answer

```powershell
$body = @{
    sessionId = "adaptive-test-001"
    message = "Embeddings are numerical vector representations that capture semantic meaning."
} | ConvertTo-Json

$response = Invoke-RestMethod `
    -Uri "http://localhost:8000/api/interview" `
    -Method POST `
    -ContentType "application/json" `
    -Body $body

$response | ConvertTo-Json -Depth 10
```

---

# 📊 Evaluation Logic

The evaluation engine produces a score between **1 and 10**.

| Score | Interpretation |
|---|---|
| **1–2** | No meaningful knowledge |
| **3–4** | Very limited understanding |
| **5–6** | Basic understanding with significant gaps |
| **7–8** | Good technical understanding |
| **9** | Strong technical depth |
| **10** | Exceptional expert-level response |

The system also determines:

```text
needs_follow_up = true / false
```

This allows the interview to dynamically probe knowledge gaps.

---

# 🧠 Design Principles

## 1. Candidate-Aware

Questions should reflect the candidate's role and learning history.

## 2. Adaptive

The next question depends on the candidate's response.

## 3. Grounded

Questions are informed by curriculum context rather than generated blindly.

## 4. Structured

LLM outputs are converted into structured API responses.

## 5. Fault Tolerant

If an LLM call fails, the backend contains fallback behavior for important interview operations.

## 6. Interviewer-Like

The system aims to simulate realistic technical interviewing rather than simply generating random quiz questions.

---

# 🧪 Example Evaluation

### Question

```text
What are embeddings?
```

### Candidate Answer

```text
Embeddings are numerical vector representations that capture semantic meaning.
```

### AI Evaluation

```json
{
  "score": 7,
  "evaluation": "The candidate demonstrates a good and technically correct understanding of embeddings, but the response lacks additional depth and practical examples.",
  "needs_follow_up": true
}
```

The interview can then continue with a deeper question.

---

# 🏆 Why InterviewIQ AI?

Most interview systems ask:

```text
Question → Answer → Next Question
```

InterviewIQ AI aims for:

```text
Question
   ↓
Answer
   ↓
Understand the response
   ↓
Identify strengths and gaps
   ↓
Decide whether probing is needed
   ↓
Generate an appropriate follow-up
   ↓
Continue the interview
```

The core idea is:

> **Don't give every candidate the same interview. Let the interview adapt to the candidate.**

---

# 📈 Future Roadmap

The current architecture can be extended with:

- 🎙️ Real-time voice interviews
- 🗣️ Speech-to-text and text-to-speech
- 🧠 Long-term candidate memory
- 📊 More advanced competency scoring
- 📚 Personalized revision plans
- 🔎 Semantic candidate search
- 🧪 Automated evaluation benchmarks
- ⚡ Redis-backed session state
- 🗄️ Persistent database storage
- 🔐 Authentication and role-based access
- 📈 Recruiter analytics dashboard
- ☁️ Expanded production cloud deployment
- 🔄 More advanced multi-agent orchestration

---

# 🔐 Security Considerations

Before production deployment, the following should be implemented:

- API key management through secure secret stores
- Authentication and authorization
- Rate limiting
- Input validation
- Prompt injection defenses
- Persistent encrypted storage
- Secure CORS configuration
- Audit logging
- Candidate-data privacy controls

**Never expose API keys in source code or commit them to GitHub.**

---

# 📖 Documentation

Additional project documentation is available in:

```text
documentation/
```

Prompt engineering and AI-development notes are available in:

```text
PROMPTS.md
```

The repository also includes:

```text
.env.example
```

for safe environment configuration.

---

# 🎯 Hackathon Value Proposition

InterviewIQ AI combines:

```text
Candidate Intelligence
        +
Curriculum Intelligence
        +
RAG
        +
LLM Reasoning
        +
Real-Time Evaluation
        +
Adaptive Follow-Ups
        +
Actionable Feedback
```

into a single technical interview workflow.

The system is designed to help determine:

> **What does this candidate actually understand?**

> **Where are their technical gaps?**

> **How should the interviewer probe those gaps?**

> **What should the candidate improve next?**

---

# 🎥 Live Demo Flow

The recommended judging flow is:

```text
Open Live Demo
      ↓
Select Candidate
      ↓
Start Interview
      ↓
Answer Technical Question
      ↓
Observe AI Evaluation
      ↓
Receive Adaptive Follow-Up
      ↓
Continue Multi-Turn Interview
      ↓
Complete Interview
      ↓
Review Final Feedback
```

### 🚀 Live Application

**https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup**

---

# 👩‍💻 Project

## InterviewIQ AI — Adaptive Technical Interview Agent

Built for **VicoDathon — A 48hrs Hackathon**

### Team

**Team DARK ALGORITHMS**

---

# 🔗 Project Links
###🌐 Live Demo:

https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app

###🎯 Start Interview: 

https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup

### 💻 GitHub Repository

https://github.com/khushigarg05/AI-Interview-Agent

### ⚡ Backend API

https://ai-interview-agent-rf0q.onrender.com/api/interview

### 📋 API Documentation

https://ai-interview-agent-rf0q.onrender.com/docs

### 🩺 Backend Health

https://ai-interview-agent-rf0q.onrender.com/health

---

# ⭐ If You Find This Project Interesting

Consider giving the repository a ⭐ and exploring the implementation.

---

## License

This project was developed as part of VicoDathon and is provided for educational and demonstration purposes.
