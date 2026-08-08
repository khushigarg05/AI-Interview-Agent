# 🤖 InterviewIQ AI — Adaptive Technical Interview Agent

> **An AI-powered technical interview platform that transforms candidate learning data into personalized interviews, evaluates responses in real time, asks intelligent follow-up questions, and generates actionable hiring insights.**

<p align="center">

**AI Interview Agent • Adaptive Evaluation • RAG • Groq • FastAPI • Next.js**

</p>

---

## 🌐 Live Production Cloud Deployment (Render 24/7)

The backend is permanently deployed and accessible 24/7 on the cloud:

| Service | Live Cloud URL Link | Status |
|---|---|---|
| 🚀 **Official API Endpoint** | [`https://ai-interview-agent-rf0q.onrender.com/api/interview`](https://ai-interview-agent-rf0q.onrender.com/api/interview) | 🟢 Live |
| 📋 **Interactive Swagger UI** | [`https://ai-interview-agent-rf0q.onrender.com/docs`](https://ai-interview-agent-rf0q.onrender.com/docs) | 🟢 Live |
| 🩺 **Health Check Probe** | [`https://ai-interview-agent-rf0q.onrender.com/health`](https://ai-interview-agent-rf0q.onrender.com/health) | 🟢 Live |
| 📊 **Feedback Report API** | [`https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id}`](https://ai-interview-agent-rf0q.onrender.com/feedback/test-sess-1) | 🟢 Live |

---

## 🌟 Key Features

Traditional technical interviews often follow a fixed question sequence.

That creates a problem:

> **A candidate who struggles with one concept may receive unrelated questions instead of being intelligently assessed on their actual knowledge gaps.**

**InterviewIQ AI** solves this by creating an adaptive interview loop.

The system analyzes:

* Candidate profile
* Learning curriculum
* Completed and skipped modules
* Previous performance signals
* Technical topics
* Candidate answers

It then dynamically decides:

**What to ask → How to evaluate → Whether to probe deeper → What to ask next → What the candidate should improve**

This creates a more realistic, personalized technical interview experience.

---

# ✨ Key Features

## 🧠 1. Candidate-Aware Interview Planning

The system loads candidate information and curriculum data to identify relevant technical areas.

It considers signals such as:

* Completed learning modules
* Skipped modules
* Failed attempts
* Candidate role
* Previous performance
* Curriculum day/topic

Instead of starting with a completely random question, the interview can target areas that matter to the candidate.

---

## 🎯 2. RAG-Grounded Question Generation

The interview question generator is connected to the curriculum knowledge base.

The RAG service retrieves topic-specific context before the LLM generates a question.

### Example

```text
Candidate Profile
       │
       ▼
Learning History
       │
       ▼
Weak / Relevant Topics
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

This helps keep questions grounded in the intended curriculum instead of relying entirely on generic LLM knowledge.

---

## 🎤 3. Live Adaptive Technical Interview

InterviewIQ AI conducts the interview as a multi-turn conversation.

The candidate:

1. Receives a technical question
2. Submits an answer
3. Gets evaluated
4. Receives a follow-up when necessary
5. Moves to the next topic when sufficient understanding is demonstrated

The interview therefore adapts to the candidate instead of following a completely rigid question list.

---

## 🔄 4. Intelligent Follow-Up Questions

One of the core features is adaptive probing.

If the candidate provides:

* A weak answer
* An incomplete explanation
* A shallow response
* A skipped answer
* An uncertain response

the system can generate a more targeted follow-up.

### Example

**Original Question**

> What are embeddings?

**Candidate**

> I don't know much about embeddings.

**AI Follow-Up**

> Can you describe a scenario where high-dimensional data, such as words or images, might need to be represented in a lower-dimensional space?

The follow-up becomes simpler and more foundational rather than simply repeating the original question.

---

## 📊 5. AI-Powered Response Evaluation

Candidate responses are evaluated using the LLM across multiple dimensions:

* Technical correctness
* Depth of understanding
* Relevance
* Practical knowledge
* Technical clarity
* Production awareness

The evaluator returns structured information such as:

```json
{
  "score": 7,
  "evaluation": "The candidate demonstrates a good understanding of embeddings but provides limited depth and lacks practical examples.",
  "needs_follow_up": true
}
```

Scores are normalized to a **1–10 scale**.

---

## 🛡️ 6. Robust Handling of Weak Responses

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

Instead of allowing such responses to receive an artificially high score, they are classified as insufficient responses and can trigger an adaptive follow-up.

---

## 📈 7. Final Candidate Assessment

At the end of the interview, the system generates an overall assessment containing:

* Overall score
* Hiring recommendation
* Technical strengths
* Improvement areas
* Weakest topics
* Summary of candidate performance

Example recommendation levels:

```text
STRONG HIRE
HIRE
CONSIDER / JUNIOR ROLE
NOT RECOMMENDED / NEEDS IMPROVEMENT
```

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
             │ & Hiring Report │
             └─────────────────┘
```

---

# 🧩 Core Backend Flow

The main orchestration is handled by the backend service layer.

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

The central orchestration layer coordinates candidate data, curriculum context, LLM generation, evaluation, follow-ups, and session state.

---

# 🛠️ Technology Stack

## Frontend

| Technology       | Purpose                        |
| ---------------- | ------------------------------ |
| **Next.js**      | React web application          |
| **React**        | Interactive UI                 |
| **TypeScript**   | Type-safe frontend development |
| **Tailwind CSS** | Styling and responsive UI      |

The frontend lives inside the `frontend/` directory and contains the application routes, reusable components, static assets, and TypeScript configuration.

---

## Backend

| Technology   | Purpose                     |
| ------------ | --------------------------- |
| **Python**   | Backend development         |
| **FastAPI**  | REST API framework          |
| **Pydantic** | Request/response validation |
| **Uvicorn**  | ASGI server                 |

---

## AI / LLM Layer

| Technology                  | Purpose                          |
| --------------------------- | -------------------------------- |
| **Groq**                    | LLM inference                    |
| **Llama 3.3 70B Versatile** | Question generation & evaluation |
| **LangChain**               | LLM integration                  |
| **Google Gemini**           | Optional fallback model          |
| **RAG**                     | Curriculum-grounded retrieval    |

The current backend is configured to initialize Groq first and can fall back to Gemini when configured. The repository identifies `llama-3.3-70b-versatile` as its primary model.

---

## Data & State

The backend currently uses:

* JSON curriculum data
* JSON candidate profiles
* In-memory interview session state
* Topic-specific retrieval
* Structured Pydantic models

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
│   │   ├── interview.py          # Unified POST /api/interview & modular routes
│   │   ├── feedback.py           # GET /feedback/{session_id} reporting routes
│   │   └── health.py             # Health check endpoint
│   └── services/
│       ├── breeth_service.py     # Central interview orchestrator
│       ├── llm_services.py       # Groq LLM scoring and question generator
│       ├── rag_service.py        # Curriculum RAG retriever
│       ├── candidate_service.py  # Candidate loader
│       └── session_service.py    # In-memory session state manager
├── documentation/                # Complete API, Architecture, Workflow & Presentation Docs
├── PROMPTS.md                    # Complete prompt engineering & AI usage log
└── README.md                     # Project documentation
```

The repository currently contains dedicated `ai_engine`, `backend`, `documentation`, and `frontend` areas, along with `.env.example` and `PROMPTS.md`.

---

# 🔍 Important Backend Services

### 1. Create and Activate Virtual Environment

**macOS / Linux:**
```bash
python3.11 -m venv venv
source venv/bin/activate
```

**Windows (PowerShell):**
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

Responsible for coordinating:

### 4. Run Server
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Local Interactive API Docs:** `http://localhost:8000/docs`
- **Local Health Check:** `http://localhost:8000/health`

---

### `llm_services.py`

LLM integration layer.

Responsibilities include:

* Initializing Groq
* Optional Gemini fallback
* Technical question generation
* Adaptive follow-up generation
* Candidate response evaluation
* Final scoring logic

---

### `rag_service.py`

Provides topic-specific curriculum context to the question-generation pipeline.

---

### `candidate_service.py`

Loads candidate information and curriculum metadata.

---

### `session_service.py`

Maintains interview session state, questions, answers, evaluations, and scores.

---

# 📚 Curriculum Intelligence

The project uses a **31-Day AI Cohort Knowledge Base**.

The curriculum can contain topics such as:

* Embeddings & Vector Search
* LLM Fundamentals
* Prompt Engineering
* RAG
* Vector Databases
* Agentic AI
* Model Context Protocol
* Evaluation
* Security
* Deployment

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

Design a system to generate and store vector embeddings for
a large corpus of unstructured data...
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

The backend evaluates the response and decides whether the candidate should receive a follow-up question or move to the next topic.

---

## Get Feedback

### `GET /feedback/{session_id}`

Returns the candidate's final interview assessment.

The repository currently exposes feedback/reporting routes in the backend.

---

## Health Check

### `GET /health`

Used to verify that the backend is running.

---

# 🚀 Getting Started

## Prerequisites

Install:

* Python 3.11+
* Node.js 18+
* npm
* Git

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

---

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

If you are using Groq through LangChain, make sure the Groq integration package is installed:

```bash
python -m pip install langchain-groq
```

---

# 5️⃣ Start FastAPI

From the **repository root**:

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

**http://localhost:8000/docs**

FastAPI provides an interactive Swagger UI where the available endpoints can be tested directly.

---

# 7️⃣ Start the Frontend

Open another terminal.

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

**http://localhost:3000**

---

# 🧪 Testing the Interview API

You can test the backend directly from PowerShell.

### Start a session

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

### Submit an answer

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

| Score | Interpretation                            |
| ----: | ----------------------------------------- |
|   1–2 | No meaningful knowledge                   |
|   3–4 | Very limited understanding                |
|   5–6 | Basic understanding with significant gaps |
|   7–8 | Good technical understanding              |
|     9 | Strong technical depth                    |
|    10 | Exceptional expert-level response         |

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

# 📈 Future Roadmap

The current architecture can be extended with:

* 🎙️ Real-time voice interviews
* 🗣️ Speech-to-text and text-to-speech
* 🧠 Long-term candidate memory
* 📊 More advanced competency scoring
* 📚 Personalized revision plans
* 🔎 Semantic candidate search
* 🧪 Automated evaluation benchmarks
* ⚡ Redis-backed session state
* 🗄️ Persistent database storage
* 🔐 Authentication and role-based access
* 📈 Recruiter analytics dashboard
* ☁️ Production cloud deployment
* 🔄 More advanced multi-agent orchestration

---

# 🔐 Security Considerations

Before production deployment, the following should be implemented:

* API key management through secure secret stores
* Authentication and authorization
* Rate limiting
* Input validation
* Prompt injection defenses
* Persistent encrypted storage
* Secure CORS configuration
* Audit logging
* Candidate-data privacy controls

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

The repository also includes `.env.example` for safe environment configuration.

---

# 🎯 Hackathon Value Proposition

InterviewIQ AI is designed around a simple idea:

> **Don't give every candidate the same interview. Let the interview adapt to the candidate.**

The platform combines:

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

Instead of simply asking:

> **"Can you answer this question?"**

InterviewIQ AI attempts to determine:

> **"What does this candidate actually understand, where are the gaps, and what should we ask next to measure that accurately?"**

---

# 👩‍💻 Project

**InterviewIQ AI — Autonomous AI Technical Interview Agent**

Built for Vicodathon - A 48hrs Hackathon by team DARK ALGORITHMS
### Repository

[GitHub — AI-Interview-Agent](https://github.com/khushigarg05/AI-Interview-Agent)

---

# ⭐ If you find this project interesting

Consider giving the repository a ⭐ and exploring the implementation.

---

## License

This project was developed as part of an VicoDathon and is provided for educational and demonstration purposes.
