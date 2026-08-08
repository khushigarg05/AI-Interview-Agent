# AI Usage Log & Prompt Engineering History

**Project:** InterviewIQ AI - Autonomous AI Technical Interview Agent  
**Author:** Khaleek Ahmad (`khaleek-backend`)  
**Repository:** [AI-Interview-Agent](https://github.com/khushigarg05/AI-Interview-Agent)  
**AI Models & Frameworks Used:** Groq (`llama-3.3-70b-versatile`), LangChain, FastAPI, Python 3.11  

---

## 1. Executive Summary & AI Development Strategy

This document provides a complete, chronological record of all user prompts, system prompts, and architectural queries used during the end-to-end development of the **AI Interview Agent Backend**. The AI development was conducted across 7 distinct engineering phases:

1. **Backend Initialization & Environment Configuration**
2. **RAG Knowledge Base & Candidate Dataset Integration**
3. **LLM System Prompt Engineering & Adaptive Interview Flow**
4. **Single Unified Endpoint (`POST /api/interview`) Specification Compliance**
5. **Session State Management & Progress Tracking**
6. **Executive Feedback Report Generation Engine**
7. **Live Tunneling, Postman Verification, and Frontend Integration**

---

## 2. Chronological Developer Prompts (English Translation & Intent)

### Phase 1: Environment & FastAPI Project Setup

#### Prompt 1.1: Virtual Environment & Backend Setup
> **User Prompt:**  
> *"I want to set up an isolated Python 3.11 virtual environment for our AI interview backend, install all required dependencies (FastAPI, Uvicorn, LangChain, Groq, Pydantic, Python-dotenv), and configure the project directory structure."*
> 
> **AI Action & Implementation:**  
> - Initialized `venv` with Python 3.11.  
> - Created `backend/requirements.txt` with locked dependencies.  
> - Set up directory layout: `backend/models`, `backend/services`, `backend/routes`, `backend/data`, `backend/utils`.  
> - Created `.env` and `.env.example` to securely manage `GROQ_API_KEY`, `BREETH_API_KEY`, `HOST`, and `PORT`.

---

### Phase 2: Curriculum RAG & Candidate Profile Integration

#### Prompt 2.1: 31-Day AI Cohort Knowledge Base
> **User Prompt:**  
> *"Create a comprehensive 31-Day AI Curriculum dataset (`backend/data/curriculum.json`) divided into 8 core modules (Environment & Tooling, Python for AI, Prompt Engineering, Embeddings & Vector Search, Chatbot Architecture, Agentic AI & MCP, Local AI, Evaluation & Deployment). Implement a RAG retriever in `rag_service.py` that retrieves relevant day topics and objectives for question synthesis."*
> 
> **AI Action & Implementation:**  
> - Structured `curriculum.json` with 31 distinct technical days, tools, and objectives.  
> - Implemented `RAGService.retrieve_context_for_topic()` to supply grounding context to the LLM during question generation.

#### Prompt 2.2: 20 Candidate Dataset Loader
> **User Prompt:**  
> *"Add all 20 official candidate profiles (`CAND-001` through `CAND-020`) in `backend/data/candidates.json` containing member details (id, name, jobRole), completed/skipped missions, commit history, and performance signals. Build `candidate_service.py` to parse candidate gaps."*
> 
> **AI Action & Implementation:**  
> - Created `candidates.json` populated with realistic candidate scenarios.  
> - Built `CandidateService` to parse weak days, skipped modules, and candidate target roles.

---

### Phase 3: LLM Prompt Engineering & System Prompts

#### Prompt 3.1: Groq LLM Integration with Fallback
> **User Prompt:**  
> *"Integrate Groq Cloud LLM (`llama-3.3-70b-versatile`) using LangChain in `llm_services.py`. Ensure graceful fallback to intelligent heuristic evaluation if API limits are reached."*
> 
> **System Prompt Implemented for Question Generation:**
> ```text
> You are a Senior Technical Interviewer conducting a realistic technical interview for the role of {role}.
> Candidate Name: {candidate_name}
> Topic: {topic}
> Difficulty: {difficulty}
> Question Number: {question_num}
> Context / Subtopics: {context}
> 
> Generate ONE direct, practical, real-world technical question.
> Do not include pleasantries or conversational preamble, output only the question.
> ```

#### Prompt 3.2: Real-Time Answer Evaluation & Scoring
> **User Prompt:**  
> *"Build an objective answer evaluation prompt that assesses technical depth, assigns a score between 1 and 10, provides constructive critique, and flags if an adaptive follow-up is necessary. Handle non-technical greetings and skipped questions strictly (Score 1/10)."*
> 
> **System Prompt Implemented for Response Evaluation:**
> ```text
> You are an objective technical evaluator in an AI engineering interview.
> Topic: {topic}
> Question: {question}
> Candidate Answer: {candidate_answer}
> 
> Evaluate the answer strictly on correctness, depth, and technical clarity.
> Assign a realistic score between 1 and 10 (1=completely wrong/empty, 5=average, 10=exceptional).
> Output strictly valid JSON with no markdown:
> {
>   "score": <int 1-10>,
>   "evaluation": "<2 sentences explaining score>",
>   "needs_follow_up": <true/false>
> }
> ```

#### Prompt 3.3: Adaptive Follow-Up Question Prompt
> **System Prompt Implemented for Follow-Up Generation:**
> ```text
> You are an expert technical interviewer.
> Topic: {topic}
> Question Asked: {previous_question}
> Candidate's Answer: {candidate_answer}
> 
> The candidate gave an incomplete, weak, or brief answer.
> Provide ONE brief critical critique of why the answer is insufficient, followed by ONE sharp follow-up question.
> Format: <2 sentence critique> Follow-up Question: <new question>
> ```

---

### Phase 4: Single Unified Endpoint (`POST /api/interview`)

#### Prompt 4.1: Technical Specification Compliance
> **User Prompt:**  
> *"Implement the unified official `POST /api/interview` endpoint that conforms 100% to the technical specification: Handling Start turns with `{ sessionId, candidate }`, Conversation turns with `{ sessionId, message }`, and Final turn returning `{ reply, done: true, feedback: { summary, strengths, gaps, next } }`."*
> 
> **AI Action & Implementation:**  
> - Defined `InterviewTurnRequest` and `InterviewTurnResponse` in `request_models.py` and `response_models.py`.  
> - Built `BreethService.handle_interview_turn()` orchestrator to handle session creation, conversation turns, and termination.

---

### Phase 5: UI State Synchronization & Progress Tracking

#### Prompt 5.1: Frontend Helper Fields
> **User Prompt:**  
> *"Update the turn response model so the frontend can seamlessly sync its progress bar and question numbering without getting stuck. Include `questionNumber`, `totalQuestions`, `currentTopic`, and `progress` string."*
> 
> **AI Action & Implementation:**  
> - Enriched `InterviewTurnResponse` with helper fields (`progress: "3 / 8"`, `questionNumber: 3`, `currentTopic: "..."`).  
> - Capped the interview strictly at 8 questions, automatically returning `done: true` on Turn 8.

---

### Phase 6: Executive Feedback Reporting Engine

#### Prompt 6.1: Bulletproof Feedback & Gaps Breakdown
> **User Prompt:**  
> *"Ensure that when an interview concludes or when `/feedback/{session_id}` is requested, the system returns a comprehensive performance report with executive summary, strengths, gaps/improvements, and hiring recommendations. Ensure aliases like `gaps`, `improvements`, and `areasToImprove` are all populated so the UI cards never display empty state."*
> 
> **AI Action & Implementation:**  
> - Created `FeedbackResponse` with multi-alias support (`gaps`, `improvements`, `areasToImprove`, `next`).  
> - Implemented `BreethService.get_feedback()` with intelligent fallback to active session data.  
> - Exposed `GET /feedback/{session_id}`, `GET /api/feedback/{session_id}`, and `GET /api/interview/feedback/{session_id}`.

---

### Phase 7: Live Testing & Deployment Architecture

#### Prompt 7.1: LocalTunnel & CORS Setup
> **User Prompt:**  
> *"Configure FastAPI CORSMiddleware with `allow_origins=['*']` to allow cross-origin requests from Next.js. Expose the port 8000 backend via LocalTunnel so the frontend team member can test remotely with Postman and browser."*
> 
> **Implementation Result:**  
> - CORS configured in `backend/main.py`.  
> - Verified live on `https://weak-eagles-feel.loca.lt/api/interview` returning `200 OK` on start and conversation turns.

---

## 3. Key Prompt Engineering Principles Applied

| Principle | Implementation in Project |
|---|---|
| **Role-Based Persona Framing** | Interviewer persona anchored as a Senior Technical Lead for AI/Data Engineering roles. |
| **Strict JSON Output Enforcement** | Zero-shot JSON structured schemas used for evaluation ratings and follow-up flags. |
| **RAG Grounding** | Prompts grounded in 31-day curriculum subtopics to prevent hallucinated questions. |
| **Adaptive Difficulty Tuning** | Difficulty dynamically scales from Medium to Hard based on candidate performance. |
| **Fail-Safe Heuristics** | Rule-based fallback systems ensure uninterrupted execution if external LLM APIs experience rate limits. |

---

## 4. Verification & Reproducibility Commands

To run and verify the backend locally:

```bash
# 1. Activate virtual environment
source venv/bin/activate

# 2. Run backend server
uvicorn backend.main:app --host 0.0.0.0 --port 8000 --reload

# 3. Test health check in browser / curl
curl http://localhost:8000/health

# 4. Access interactive Swagger API documentation
http://localhost:8000/docs
```
