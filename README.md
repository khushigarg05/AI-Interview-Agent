# 🤖 InterviewIQ AI — Adaptive Technical Interview Agent

> **An AI-powered technical interview platform that transforms candidate learning data into personalized interviews, evaluates responses in real time, asks adaptive follow-up questions, and generates actionable feedback.**

**AI Interview Agent · Adaptive Evaluation · RAG · Groq · FastAPI · Next.js**

---

## 🌐 Live Demo

🚀 **Production:**
https://ai-interview-agent-e6x4ff0hp-ai-interview-agent1.vercel.app/

🎯 **Start Interview:**
https://ai-interview-agent-e6x4ff0hp-ai-interview-agent1.vercel.app/setup

⚡ **Backend API:**
https://ai-interview-agent-rf0q.onrender.com/api/interview

📋 **Swagger API Docs:**
https://ai-interview-agent-rf0q.onrender.com/docs

🩺 **Backend Health:**
https://ai-interview-agent-rf0q.onrender.com/health

---

# 🎯 Problem

Traditional technical interviews often follow a fixed sequence of questions, regardless of a candidate's background or performance.

**InterviewIQ AI** takes a different approach.

It considers:

* Candidate profile and role
* Learning journey and completed missions
* Skipped or weak topics
* Curriculum context
* Previous answers
* AI evaluation results

Instead of simply asking:

> "Can you answer this question?"

the system aims to determine:

> **What does this candidate understand, where are the gaps, and what should we ask next?**

---

# 🧠 How It Works

```text
Candidate Profile
       ↓
Learning Journey
       ↓
Curriculum Analysis
       ↓
Relevant Topic Retrieval
       ↓
AI Question Generation
       ↓
Candidate Answer
       ↓
AI Evaluation
       ↓
Strength / Knowledge Gap
       ↓
Adaptive Follow-Up
       ↓
Next Question
       ↓
Final Assessment
       ↓
Actionable Feedback
```

This creates an interview experience that adapts to the candidate rather than following a static questionnaire.

---

# ✨ Key Features

### 🧠 Candidate-Aware Interviews

Questions are personalized using candidate role, learning history, completed missions, skipped topics, and performance signals.

### 📚 Curriculum-Grounded Questions

The system uses a **31-Day AI Cohort Knowledge Base** covering topics such as:

* Prompt Engineering
* Embeddings
* Vector Databases
* RAG
* Agentic AI
* MCP
* AI Evaluation
* AI Security
* Deployment
* Production AI Systems

### 🎤 Multi-Turn Interviews

The candidate answers technical questions, receives AI evaluation, and continues through an adaptive interview flow.

### 🔄 Adaptive Follow-Ups

Weak, incomplete, shallow, or partially correct answers can trigger targeted follow-up questions.

### 📊 AI Response Evaluation

Responses are evaluated on:

* Technical correctness
* Depth
* Relevance
* Practical understanding
* Technical clarity
* Production awareness

Scores use a **1–10 scale**.

### 🛡️ Weak-Response Detection

Responses such as:

```text
I don't know
skip
no idea
not sure
```

are treated as insufficient rather than receiving an artificially high score.

### 📈 Final Assessment

The system generates:

* Overall score
* Hiring recommendation
* Technical strengths
* Improvement areas
* Weakest topics
* Performance summary

---

# 🏆 Requirement Coverage

| Requirement                        | Implementation               |
| ---------------------------------- | ---------------------------- |
| Conversational technical interview | ✅ Multi-turn interview       |
| Minimum 8 questions                | ✅ Interview session flow     |
| At least 4 curriculum days         | ✅ Curriculum-aware selection |
| Adaptive follow-ups                | ✅ Follow-up generation       |
| Previous response context          | ✅ Session state + evaluation |
| Structured final feedback          | ✅ Feedback endpoint          |
| `POST /api/interview`              | ✅ Implemented                |
| Candidate personalization          | ✅ Profile + learning signals |
| Curriculum grounding               | ✅ RAG/context retrieval      |
| AI evaluation                      | ✅ LLM evaluation layer       |

---

# 🏗️ Architecture

```text
                    Candidate Profile
                           │
                           ▼
                  Curriculum Analysis
                           │
                           ▼
                     RAG Retrieval
                           │
                           ▼
                  Question Generator
                    Groq / Llama
                           │
                           ▼
              ┌─────────────────────────┐
              │     Interview Loop      │
              │                         │
              │ Question → Answer       │
              │      ↓                  │
              │ Evaluation              │
              │      ↓                  │
              │ Follow-up / Next Topic  │
              └────────────┬────────────┘
                           │
                           ▼
                    Session State
                           │
                           ▼
                   Final Feedback
```

---

# 🔧 Backend Flow

```text
POST /api/interview
        │
        ▼
BreethService
        │
        ├── Candidate Service
        ├── Curriculum Service
        ├── RAG Service
        ├── LLM Service
        └── Session Service
                │
                ▼
        Interview Response
```

The orchestration layer coordinates candidate context, curriculum retrieval, question generation, evaluation, follow-ups, session state, and final assessment.

---

# 🛠️ Technology Stack

## Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

## Backend

* **Python**
* **FastAPI**
* **Pydantic**
* **Uvicorn**

## AI / LLM

* **Groq**
* **Llama 3.3 70B**
* **LangChain**
* **Google Gemini** — optional fallback
* **RAG**

## Data & State

* JSON curriculum data
* JSON candidate profiles
* In-memory interview sessions
* Structured Pydantic models

---

# 📁 Repository Structure

```text
AI-Interview-Agent/
│
├── ai_engine/
│   ├── agents/
│   ├── prompts/
│   ├── rag/
│   └── graph.py
│
├── backend/
│   ├── data/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── public/
│
├── documentation/
├── PROMPTS.md
├── .env.example
└── README.md
```

---

# 📡 API

### Start / Continue Interview

`POST /api/interview`

Handles interview initialization and candidate responses.

### Get Feedback

`GET /feedback/{session_id}`

Returns the candidate's final interview assessment.

### Health Check

`GET /health`

Checks backend availability.

### Interactive API Documentation

`/docs`

Provides Swagger UI for testing the API.

---

# 🚀 Getting Started

## Prerequisites

* Python 3.11+
* Node.js 18+
* npm
* Git

## 1. Clone

```bash
git clone https://github.com/khushigarg05/AI-Interview-Agent.git
cd AI-Interview-Agent
```

## 2. Configure Environment

Create `.env` using `.env.example`.

```env
GROQ_API_KEY=your_groq_api_key_here
BREETH_API_KEY=your_breeth_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

HOST=0.0.0.0
PORT=8000
MODEL_NAME=llama-3.3-70b-versatile
```

**Never commit real API keys to GitHub.**

## 3. Install Backend

### Windows

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install -r backend/requirements.txt
```

### macOS / Linux

```bash
python3 -m venv venv
source venv/bin/activate
python -m pip install -r backend/requirements.txt
```

## 4. Start Backend

From the repository root:

```bash
python -m uvicorn backend.main:app --reload
```

Backend:

```text
http://localhost:8000
```

Swagger:

```text
http://localhost:8000/docs
```

## 5. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🧪 Example Adaptive Interview

### Question

```text
What are embeddings?
```

### Candidate

```text
I don't know much about embeddings.
```

### Evaluation

```json
{
  "score": 1,
  "needs_follow_up": true
}
```

### Adaptive Follow-Up

```text
What is your understanding of the basic concept of
word embeddings and how they are used in NLP?
```

The interview then uses the candidate's response to determine the next step.

---

# 📊 Evaluation Scale

| Score | Interpretation                    |
| ----- | --------------------------------- |
| 1–2   | No meaningful knowledge           |
| 3–4   | Very limited understanding        |
| 5–6   | Basic understanding with gaps     |
| 7–8   | Good technical understanding      |
| 9     | Strong technical depth            |
| 10    | Exceptional expert-level response |

The evaluator also determines whether:

```text
needs_follow_up = true / false
```

---

# 🧠 Design Principles

### Candidate-Aware

Questions reflect the candidate's role and learning history.

### Adaptive

The next question depends on the previous response.

### Grounded

Questions are informed by curriculum context.

### Structured

LLM outputs are converted into structured API responses.

### Fault Tolerant

Fallback behavior is available for important interview operations.

### Interviewer-Like

The system focuses on realistic technical assessment rather than static quizzes.

---

# 🎯 Why InterviewIQ AI?

Traditional approach:

```text
Question → Answer → Next Question
```

InterviewIQ AI:

```text
Question
   ↓
Answer
   ↓
Understand Response
   ↓
Identify Strength / Gap
   ↓
Decide Whether to Probe
   ↓
Generate Follow-Up
   ↓
Continue Interview
```

> **Don't give every candidate the same interview. Let the interview adapt to the candidate.**

---

# 📈 Future Roadmap

* 🎙️ Real-time voice interviews
* 🗣️ Speech-to-text and text-to-speech
* 🧠 Long-term candidate memory
* 📊 Advanced competency scoring
* 📚 Personalized revision plans
* 🔎 Semantic candidate search
* 🧪 Automated evaluation benchmarks
* ⚡ Redis-backed session state
* 🗄️ Persistent database storage
* 🔐 Authentication and RBAC
* 📈 Recruiter analytics dashboard
* ☁️ Expanded cloud deployment
* 🔄 Advanced multi-agent orchestration

---

# 🔐 Security

Before production-scale deployment, consider:

* Secure API key management
* Authentication and authorization
* Rate limiting
* Input validation
* Prompt-injection defenses
* Encrypted persistent storage
* Secure CORS configuration
* Audit logging
* Candidate-data privacy controls

**Never expose API keys in source code or GitHub.**

---

# 📖 Documentation

Additional documentation:

```text
documentation/
```

Prompt engineering notes:

```text
PROMPTS.md
```

Environment template:

```text
.env.example
```

---

# 🎥 Recommended Demo Flow

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
Continue Interview
      ↓
Complete Interview
      ↓
Review Final Feedback
```

## 🚀 Live Application

**https://ai-interview-agent-e6x4ff0hp-ai-interview-agent1.vercel.app/**

---

# 👩‍💻 Project

## InterviewIQ AI — Adaptive Technical Interview Agent

Built for **VicoDathon — A 48hrs Hackathon**

### Team DARK ALGORITHMS

---

# 🔗 Project Links

* 🌐 **Live Demo:** https://ai-interview-agent-e6x4ff0hp-ai-interview-agent1.vercel.app/
* 🎯 **Start Interview:** https://ai-interview-agent-e6x4ff0hp-ai-interview-agent1.vercel.app/setup
* 💻 **GitHub:** https://github.com/khushigarg05/AI-Interview-Agent
* ⚡ **Backend:** https://ai-interview-agent-rf0q.onrender.com/api/interview
* 📋 **Swagger:** https://ai-interview-agent-rf0q.onrender.com/docs
* 🩺 **Health:** https://ai-interview-agent-rf0q.onrender.com/health

---

## ⭐ Support

If you find the project interesting, consider giving the repository a ⭐.

---

## License

Developed as part of **VicoDathon** for educational and demonstration purposes.
