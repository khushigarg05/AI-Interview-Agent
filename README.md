# InterviewIQ AI — Autonomous AI Technical Interview Agent

InterviewIQ AI is a production-grade, autonomous technical interview platform powered by **FastAPI**, **LangChain**, **Groq LLM (`llama-3.3-70b-versatile`)**, and a **31-Day AI Cohort Knowledge Base**.

---

## 🌟 Key Features

- **Official Unified Endpoint (`POST /api/interview`):** Strict conformance to single-endpoint interview orchestrator specifications.
- **RAG-Grounded Curriculum:** Dynamically maps 31-Day AI Syllabus modules into realistic scenario-based questions.
- **20 Candidate Profiles:** Pre-loaded candidate datasets with real-world mission histories and performance signals.
- **Adaptive LLM Follow-Up Engine:** Evaluates candidate answers on depth, correctness, and trade-offs, triggering adaptive follow-ups for weak/skipped responses.
- **Executive Feedback & Gaps Report:** Generates multi-dimensional performance scorecards, strengths, improvement gaps, and hiring recommendations.

---

## 🛠️ Architecture & Project Structure

```text
AI-Interview-Agent/
├── backend/
│   ├── config.py                 # Environment and application configuration
│   ├── main.py                   # FastAPI application entrypoint with CORS
│   ├── requirements.txt          # Python dependencies
│   ├── data/
│   │   ├── curriculum.json       # 31-Day AI Cohort syllabus and subtopics
│   │   └── candidates.json       # 20 pre-configured candidate profiles
│   ├── models/
│   │   ├── request_models.py     # Pydantic request models
│   │   └── response_models.py    # Pydantic response models and aliases
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
├── PROMPTS.md                    # Complete prompt engineering & AI usage log
└── README.md                     # Project documentation
```

---

## 🚀 Quick Start (Local Setup)

### 1. Create and Activate Virtual Environment
```bash
python3.11 -m venv venv
source venv/bin/activate
```

### 2. Install Dependencies
```bash
pip install -r backend/requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_groq_api_key_here
BREETH_API_KEY=your_breeth_api_key_here
MODEL_NAME=llama-3.3-70b-versatile
HOST=0.0.0.0
PORT=8000
```

### 4. Run Server
```bash
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload
```

- **Interactive API Docs (Swagger):** `http://localhost:8000/docs`
- **Health Check:** `http://localhost:8000/health`

---

## 📡 API Specification

### 1. Start Interview Session
**`POST /api/interview`**
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
      { "day": 7, "title": "Embeddings Explained", "passed": true, "attempts": 1 }
    ],
    "signals": { "commitDays": 28, "missionsCompleted": 30, "missionsFirstTry": 20 }
  }
}
```

### 2. Submit Answer / Turn
**`POST /api/interview`**
```json
{
  "sessionId": "sess-001",
  "message": "I would use Sentence Transformers to generate embeddings and store them in ChromaDB with HNSW indexing."
}
```

### 3. Feedback & Report
**`GET /feedback/{session_id}`**
Returns executive summary, strengths, improvement gaps, and hiring recommendation.

---

## 📄 License & Attribution
Developed for the AI Technical Interview Hackathon.
