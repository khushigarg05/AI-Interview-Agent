# 🤖 InterviewIQ AI — Adaptive Technical Interview Agent

> **An AI-powered technical interview platform that transforms candidate learning data into personalized interviews, evaluates responses in real time, asks intelligent follow-up questions, and generates actionable feedback.**

**AI Interview Agent • Adaptive Evaluation • RAG • Groq/Llama • FastAPI • Next.js**

---

# 🌐 Live Demo

🚀 **Start Interview:**
https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup

🌐 **Application:**
https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app

⚡ **Backend API:**
https://ai-interview-agent-rf0q.onrender.com/api/interview

📋 **Swagger API Docs:**
https://ai-interview-agent-rf0q.onrender.com/docs

🩺 **Health Check:**
https://ai-interview-agent-rf0q.onrender.com/health

💻 **GitHub:**
https://github.com/khushigarg05/AI-Interview-Agent

---

# 🎯 Problem

Traditional technical interviews often follow a fixed sequence of questions, treating every candidate similarly.

This makes it difficult to identify:

* What the candidate actually understands
* Where their knowledge gaps are
* Whether a weak answer needs deeper probing
* Which topics should be assessed next

**InterviewIQ AI makes the interview adaptive.**

Instead of:

```text
Question → Answer → Next Question
```

it follows:

```text
Question
   ↓
Candidate Answer
   ↓
AI Evaluation
   ↓
Identify Strength / Knowledge Gap
   ↓
Adaptive Follow-Up
   ↓
Next Relevant Question
   ↓
Final Assessment
```

---

# 🧠 Solution

InterviewIQ AI combines **candidate intelligence, curriculum knowledge, RAG, LLM reasoning, and response evaluation** to create personalized technical interviews.

The system considers:

* Candidate profile and role
* Learning history
* Completed and skipped topics
* Curriculum content
* Previous answers
* Previous evaluations
* Current interview progress

This allows the interviewer agent to dynamically decide **what to ask next and whether additional probing is required.**

---

# ✨ Key Features

### 👤 Candidate-Aware Interviews

Questions are personalized using candidate profiles, roles, learning history, and curriculum progress.

### 📚 Curriculum-Grounded Questions

RAG retrieves relevant content from the 31-day AI Cohort curriculum before generating questions.

### 🎤 Multi-Turn Interviews

Candidates answer questions across a continuous interview session.

### 🔄 Adaptive Follow-Ups

Weak, incomplete, shallow, or uncertain answers can trigger targeted follow-up questions.

### 🧠 Context-Aware Reasoning

Previous questions, answers, evaluations, and topics influence subsequent interview decisions.

### 📊 AI Response Evaluation

Answers are evaluated for:

* Technical correctness
* Depth
* Relevance
* Practical understanding
* Clarity
* Production awareness

### 📝 Final Candidate Assessment

The system generates:

* Overall score
* Hiring recommendation
* Technical strengths
* Improvement areas
* Weakest topics
* Performance summary

### 🛡️ Weak-Response Handling

Responses such as `skip`, `I don't know`, `not sure`, or meaningless input are handled separately rather than receiving artificially high scores.

---

# 🏆 Problem Statement Coverage

| Requirement                        | Implementation                 |
| ---------------------------------- | ------------------------------ |
| Conversational technical interview | ✅ Multi-turn interview         |
| Minimum 8 questions                | ✅ Session question flow        |
| At least 4 curriculum days         | ✅ Curriculum-aware selection   |
| Adaptive follow-ups                | ✅ Follow-up generation         |
| Previous response context          | ✅ Session state                |
| Structured feedback                | ✅ Feedback endpoint            |
| Candidate personalization          | ✅ Candidate + learning signals |
| Curriculum grounding               | ✅ RAG retrieval                |
| AI evaluation                      | ✅ LLM evaluation               |
| Required API                       | ✅ `POST /api/interview`        |

---

# 🏗️ Architecture

```text
Candidate Profile
       │
       ▼
Learning / Mission History
       │
       ▼
Curriculum Analysis
       │
       ▼
RAG Retrieval
       │
       ▼
Relevant Curriculum Context
       │
       ▼
Groq / Llama
       │
       ▼
Question Generation
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
       │        Adaptive Follow-Up
       │               │
       └───────┬───────┘
               ▼
        Next Question
               │
               ▼
        Final Assessment
               │
               ▼
        Candidate Feedback
```

---

# 🔄 Interview Flow

```text
Start Session
     ↓
Analyze Candidate
     ↓
Select Relevant Topic
     ↓
Retrieve Curriculum Context
     ↓
Generate Question
     ↓
Candidate Answers
     ↓
Evaluate Response
     ↓
Follow-Up Needed?
   ↙           ↘
 Yes            No
  ↓              ↓
Probe         Next Topic
  ↓              ↓
  └──────→ Next Question
                ↓
        Final Assessment
```

---

# 🛠️ Technology Stack

### Frontend

* **Next.js**
* **React**
* **TypeScript**
* **Tailwind CSS**

### Backend

* **Python**
* **FastAPI**
* **Pydantic**
* **Uvicorn**

### AI

* **Groq**
* **Llama 3.3 70B**
* **LangChain**
* **RAG**
* **Google Gemini** fallback

### Data & State

* JSON curriculum data
* JSON candidate profiles
* In-memory interview sessions
* Structured Pydantic models

---

# 📁 Project Structure

```text
AI-Interview-Agent/
│
├── ai_engine/
│   ├── agents/
│   │   ├── planner_agent.py
│   │   ├── interviewer_agent.py
│   │   └── feedback_agent.py
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

# 🔌 API

### Start / Continue Interview

`POST /api/interview`

The endpoint handles interview session creation, candidate context, question generation, answer evaluation, and adaptive progression.

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
    "missions": []
  }
}
```

### Submit Answer

```json
{
  "sessionId": "sess-001",
  "message": "Embeddings are numerical vector representations that capture semantic meaning."
}
```

### Get Feedback

`GET /feedback/{session_id}`

Returns the final candidate assessment.

### Health

`GET /health`

---

# 🧪 Example Adaptive Interaction

**Question**

```text
What are embeddings?
```

**Candidate**

```text
I don't know much about embeddings.
```

**Evaluation**

```json
{
  "score": 1,
  "needs_follow_up": true
}
```

**Adaptive Follow-Up**

```text
What is your understanding of word embeddings
and how they are used in NLP?
```

The system uses the candidate's response to determine how deeply to probe the topic.

---

# 📊 Evaluation

Responses are scored on a **1–10 scale**.

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

# 🚀 Local Setup

## Prerequisites

* Python 3.11+
* Node.js 18+
* npm
* Git

### 1. Clone

```bash
git clone https://github.com/khushigarg05/AI-Interview-Agent.git
cd AI-Interview-Agent
```

### 2. Configure Environment

Create `.env` using `.env.example`.

```env
GROQ_API_KEY=your_groq_api_key
BREETH_API_KEY=your_breeth_api_key
GEMINI_API_KEY=your_gemini_api_key

HOST=0.0.0.0
PORT=8000
MODEL_NAME=llama-3.3-70b-versatile
```

**Never commit real API keys to GitHub.**

### 3. Backend

```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1

python -m pip install -r backend/requirements.txt

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

### 4. Frontend

Open another terminal:

```powershell
cd frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:3000
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
Observe Evaluation
      ↓
Receive Adaptive Follow-Up
      ↓
Continue Interview
      ↓
Complete Interview
      ↓
Review Final Feedback
```

👉 **Demo:**
https://ai-interview-agent-f1iema3e7-ai-interview-agent1.vercel.app/setup

---

# 🚀 Why InterviewIQ AI?

Traditional systems ask every candidate similar questions.

InterviewIQ AI instead asks:

> **What does this candidate understand?**

> **Where are their technical gaps?**

> **How should the interviewer probe those gaps?**

> **What should the candidate improve next?**

The core principle:

```text
Don't give every candidate the same interview.
Let the interview adapt to the candidate.
```

---

# 🔮 Future Roadmap

* 🎙️ Real-time voice interviews
* 🗣️ Speech-to-text / text-to-speech
* 🧠 Long-term candidate memory
* 📊 Advanced competency scoring
* 📚 Personalized revision plans
* 🔎 Semantic candidate search
* 🧪 Automated evaluation benchmarks
* 🗄️ Persistent database storage
* 🔐 Authentication and RBAC
* 📈 Recruiter analytics dashboard
* ⚡ Scalable production infrastructure

---

# 📖 Documentation

Additional documentation:

```text
documentation/
PROMPTS.md
.env.example
```

---

# 👩‍💻 Project

## InterviewIQ AI — Adaptive Technical Interview Agent

**Built for VicoDathon — 48-Hour Hackathon**

### Team DARK ALGORITHMS

⭐ If you find the project interesting, consider starring the repository.

---

## License

Developed as part of VicoDathon for educational and demonstration purposes.
