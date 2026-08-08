# 🧠 InterviewIQ AI

### Adaptive AI Technical Interview Agent

> **Turn a candidate's learning history into a personalized, adaptive technical interview.**

InterviewIQ AI is an **AI-powered technical interview platform** that analyzes candidate learning progress, identifies relevant competency areas, generates realistic technical questions, evaluates answers using an LLM, and dynamically adapts the interview based on candidate performance.

Instead of asking every candidate the same static questions, InterviewIQ AI creates a **feedback-driven interview loop**:

**Candidate Profile → Curriculum Signals → RAG Context → AI Question → Candidate Answer → LLM Evaluation → Adaptive Follow-up → Final Assessment**

---

## 🎯 The Problem

Traditional technical interviews often suffer from three problems:

* ❌ The same questions are asked regardless of a candidate's background.
* ❌ Weak answers are either immediately rejected or followed by generic questions.
* ❌ Interview feedback is often subjective and difficult to convert into actionable learning recommendations.

### 💡 Our Approach

InterviewIQ AI treats the interview as an **adaptive learning and evaluation system**.

The platform uses:

* Candidate learning history
* Curriculum completion signals
* Topic-specific knowledge retrieval
* LLM-generated technical questions
* Answer quality evaluation
* Adaptive follow-up questioning
* Structured scoring
* Final competency feedback

This allows the interview to dynamically respond to **what the candidate actually knows**, rather than simply moving through a fixed question list.

---

# ✨ Key Features

## 1. 👤 Candidate-Aware Interview Planning

The system can consume candidate profile information including:

* Candidate identity
* Target job role
* Completed learning missions
* Skipped modules
* Attempt history
* Performance signals

These signals are used to identify relevant curriculum areas for evaluation.

---

## 2. 📚 31-Day AI Curriculum Integration

InterviewIQ AI works with a structured AI learning curriculum containing technical modules and subtopics.

The system can use curriculum signals to focus the interview on areas such as:

* Embeddings & Vector Search
* RAG
* LLM Fundamentals
* Prompt Engineering
* Agentic AI
* MCP
* Evaluation
* Security
* Deployment
* AI Architecture

This creates a bridge between **learning progress and technical assessment**.

---

## 3. 🔎 RAG-Grounded Question Generation

The interview question generator receives topic-specific context from the curriculum knowledge base.

Instead of relying entirely on generic prompting, the system follows:

```text
Curriculum Topic
      ↓
Relevant Context
      ↓
LLM Question Generation
      ↓
Practical Technical Question
```

Questions are generated according to:

* Candidate role
* Topic
* Difficulty
* Question number
* Relevant subtopics/context

---

## 4. 🤖 LLM-Powered Interviewer

The interview engine uses **Groq + LangChain** with:

`llama-3.3-70b-versatile`

The LLM is responsible for:

* Generating technical questions
* Evaluating candidate responses
* Determining answer quality
* Identifying knowledge gaps
* Generating adaptive follow-up questions

The implementation also includes a graceful fallback strategy when an external LLM is unavailable.

---

## 5. 🧠 Adaptive Follow-Up Engine

This is one of the core features of InterviewIQ AI.

When a candidate gives an incomplete, weak, skipped, or technically insufficient answer:

```text
Candidate Answer
       ↓
LLM Evaluation
       ↓
Low / Insufficient Score
       ↓
Identify Missing Knowledge
       ↓
Generate Follow-up Question
       ↓
Continue Interview
```

For example:

**Original Question**

> What are embeddings and how are they used in vector search?

**Candidate**

> I don't know much about embeddings.

Instead of immediately ending the assessment, the system generates a simpler foundational follow-up such as:

> Can you describe a scenario where high-dimensional data, such as words or images, might need to be represented in a lower-dimensional space?

This creates a more realistic interview experience where the interviewer can **probe the candidate's actual understanding**.

---

## 6. 📊 LLM-Based Answer Evaluation

Candidate responses are evaluated across multiple dimensions:

* Technical correctness
* Depth of understanding
* Relevance
* Practical knowledge
* Technical clarity

The evaluator produces structured results such as:

```json
{
  "score": 7,
  "evaluation": "The candidate demonstrates a good understanding...",
  "needs_follow_up": true
}
```

Scores are normalized to a **1–10 scale** and can trigger additional questioning.

---

## 7. 📝 Final Interview Assessment

After the interview, the system generates a structured assessment containing:

* Overall score
* Hiring recommendation
* Strengths
* Improvement areas
* Topic-level performance
* Candidate summary

Example recommendation levels:

| Score  | Recommendation            |
| ------ | ------------------------- |
| 8.5–10 | 🟢 STRONG HIRE            |
| 7–8.4  | 🟢 HIRE                   |
| 5–6.9  | 🟡 CONSIDER / JUNIOR ROLE |
| <5     | 🔴 NOT RECOMMENDED        |

---

# 🏗️ System Architecture

```text
                         ┌──────────────────────┐
                         │   Candidate Profile  │
                         │  Learning / Missions │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Candidate Service    │
                         │ Curriculum Signals   │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │     RAG Service      │
                         │ Topic Context        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    LLM Service       │
                         │ Groq / Gemini        │
                         └──────────┬───────────┘
                                    │
                                    ▼
                 ┌─────────────────────────────────────┐
                 │        Adaptive Interview           │
                 │                                     │
                 │ Question → Answer → Evaluation      │
                 │            ↓                        │
                 │       Follow-up?                    │
                 │        ↙       ↘                    │
                 │      YES        NO                  │
                 │       ↓          ↓                  │
                 │  Follow-up    Next Topic             │
                 └─────────────────┬───────────────────┘
                                   │
                                   ▼
                         ┌──────────────────────┐
                         │ Session Service      │
                         │ Interview State      │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │ Final Assessment     │
                         │ Score + Feedback     │
                         └──────────────────────┘
```

---

# 🔄 Interview Flow

```text
1. Candidate profile received
              ↓
2. Learning history analyzed
              ↓
3. Relevant curriculum topic selected
              ↓
4. RAG retrieves topic context
              ↓
5. LLM generates interview question
              ↓
6. Candidate submits answer
              ↓
7. LLM evaluates response
              ↓
8. Weak answer?
       ↙              ↘
     YES               NO
      ↓                 ↓
Follow-up          Next topic
      ↓                 ↓
      └────────┬────────┘
               ↓
        Continue interview
               ↓
        Final assessment
```

---

# 🧩 Repository Structure

```text
AI-Interview-Agent/
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
│   ├── services/
│   │   ├── breeth_service.py
│   │   ├── llm_services.py
│   │   ├── rag_service.py
│   │   ├── candidate_service.py
│   │   └── session_service.py
│   │
│   ├── config.py
│   ├── main.py
│   └── requirements.txt
│
├── ai_engine/
│   ├── agents/
│   ├── prompts/
│   ├── rag/
│   └── graph.py
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
├── .env.example
├── .gitignore
└── README.md
```

The repository currently contains dedicated `backend`, `frontend`, `ai_engine`, and `documentation` directories, along with `PROMPTS.md` and environment configuration templates.

---

# 🛠️ Technology Stack

## Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**
* Component-based UI architecture

## Backend

* **Python**
* **FastAPI**
* **Pydantic**
* REST APIs
* In-memory interview session management

## AI / LLM

* **LangChain**
* **Groq**
* **Llama 3.3 70B**
* Google Gemini fallback
* Prompt-driven evaluation
* Adaptive follow-up generation

## Knowledge Layer

* Curriculum-based retrieval
* Topic-specific context retrieval
* 31-day AI learning curriculum

## Development

* Git
* GitHub
* PowerShell / Terminal
* Python virtual environments
* npm

---

# 📡 API

## Start Interview

```http
POST /api/interview
```

Example request:

```json
{
  "sessionId": "sess-001",
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

Example response:

```json
{
  "reply": "Welcome Sarah Johnson! Let's begin your technical interview...",
  "done": false,
  "feedback": null,
  "questionNumber": 1,
  "totalQuestions": 8,
  "currentTopic": "Embeddings Explained",
  "progress": "1 / 8"
}
```

---

## Submit Interview Answer

```http
POST /api/interview
```

```json
{
  "sessionId": "sess-001",
  "message": "Embeddings are numerical vector representations..."
}
```

The same unified endpoint processes the candidate's answer, evaluates it, and either generates a follow-up question or advances the interview.

---

## Health Check

```http
GET /health
```

---

## API Documentation

Once the backend is running:

**Swagger UI**

`http://localhost:8000/docs`

The repository currently documents the unified `POST /api/interview` flow and feedback endpoint in its API specification.

---

# 🚀 Getting Started

## Prerequisites

Make sure you have:

* Python 3.11+
* Node.js 18+
* npm
* Git
* A Groq API key

---

## 1. Clone the Repository

```bash
git clone https://github.com/khushigarg05/AI-Interview-Agent.git

cd AI-Interview-Agent
```

---

## 2. Configure Environment Variables

Create:

```text
.env
```

in the project root.

Example:

```env
GROQ_API_KEY=your_groq_api_key_here
BREETH_API_KEY=your_breeth_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

MODEL_NAME=llama-3.3-70b-versatile

HOST=0.0.0.0
PORT=8000
```

> ⚠️ Never commit your real API keys. Use `.env.example` as the template.

---

# 🐍 3. Backend Setup

Create a virtual environment:

### Windows PowerShell

```powershell
python -m venv venv

.\venv\Scripts\Activate.ps1
```

Install dependencies:

```powershell
python -m pip install -r backend\requirements.txt
```

Start FastAPI:

```powershell
python -m uvicorn backend.main:app --reload
```

Backend:

```text
http://127.0.0.1:8000
```

Swagger:

```text
http://127.0.0.1:8000/docs
```

---

# 💻 4. Frontend Setup

Open another terminal:

```powershell
cd frontend
```

Install dependencies:

```powershell
npm install
```

Run development server:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Example Interview Scenario

### Candidate

**Sarah Johnson**

### Role

**Senior Data Engineer**

### Candidate Signal

The candidate has limited knowledge of embeddings.

### AI Interview

**Question**

> Design a system to generate and store vector embeddings for a large corpus of unstructured data.

### Candidate Answer

> I don't know much about embeddings.

### Evaluation

```text
Score: 1 / 10

The candidate demonstrated insufficient knowledge
of the topic.

Follow-up required: YES
```

### Adaptive Follow-up

> Can you describe a scenario where high-dimensional data, such as words or images, might need to be represented in a lower-dimensional space?

The interviewer therefore **adapts to the candidate instead of blindly proceeding to the next question.**

---

# 🧠 AI Design Principles

InterviewIQ AI follows several principles:

### 1. Context before Question

Questions should be grounded in the candidate's role and curriculum context.

### 2. Evaluate Before Advancing

The system evaluates the candidate response before deciding what happens next.

### 3. Weak Answers Trigger Deeper Probing

A weak answer does not immediately terminate the assessment.

### 4. Follow-ups Should Target Knowledge Gaps

Follow-up questions are generated from the original question and candidate response.

### 5. Structured Output

LLM evaluation is converted into structured JSON so the backend can reliably process scores and interview state.

---

# 🔐 Security Notes

API keys are loaded through environment variables and should never be committed to Git.

Before deploying publicly, additional production safeguards should be added, including:

* Authentication
* Rate limiting
* Persistent session storage
* Request validation
* Secret management
* LLM abuse protection
* Production logging and monitoring

---

# 📈 Future Roadmap

InterviewIQ AI can be extended with:

* 🎙️ Real-time voice interviews
* 🧑‍💻 Coding interview sandbox
* 🖥️ Browser-based IDE
* 📹 Video interview mode
* 📊 Recruiter analytics dashboard
* 🗄️ PostgreSQL session persistence
* 🔎 Production vector database integration
* 🔐 Authentication and role-based access
* ⚡ Redis-backed session management
* 📈 Interview benchmarking
* 🧠 Long-term candidate skill memory
* 🌐 Multi-language interviews
* ☁️ Cloud deployment

---

# 🏆 Why InterviewIQ AI?

Most interview systems follow:

```text
Question → Answer → Next Question
```

InterviewIQ AI follows:

```text
Candidate Context
       ↓
Curriculum Signals
       ↓
Relevant Topic
       ↓
Context-Grounded Question
       ↓
Candidate Answer
       ↓
LLM Evaluation
       ↓
Knowledge Gap Detection
       ↓
Adaptive Follow-up
       ↓
Final Competency Report
```

The goal is not simply to **ask questions**.

The goal is to create an AI interviewer that can **understand, evaluate, adapt, and explain candidate performance.**

---

# 📂 Documentation

Additional project documentation and prompt-engineering material are available in:

```text
documentation/
PROMPTS.md
```

---

# 👩‍💻 Built For

**VicoDathon**

Built with a focus on:

**Generative AI • Adaptive Interviews • RAG • LLM Evaluation • FastAPI • LangChain • AI Agents**

---

# ⭐ Project

**InterviewIQ AI — Adaptive AI Technical Interview Agent**

Built by **DARK ALGORITHMS**

If you find the project interesting, consider giving the repository a ⭐.
