# Interview Lifecycle & Workflow Documentation

**Project:** InterviewIQ AI — Autonomous Technical Interview Agent  
**Standard Flow:** 8 Technical Questions · Min 4 Curriculum Modules · Real-Time Adaptive Follow-Ups  

---

## 1. End-to-End Interview State Machine

```mermaid
stateDiagram-v2
    [*] --> Idle: Candidate Chooses Profile
    Idle --> Initialized: POST /api/interview (with candidate payload)
    Initialized --> QuestionGeneration: Analyze Weak Days & Retrieve RAG Context
    QuestionGeneration --> WaitingForAnswer: Display Question in Live Chat
    
    WaitingForAnswer --> EvaluatingAnswer: Candidate Submits Answer
    EvaluatingAnswer --> FollowUpCheck: Score Answer (1-10)
    
    FollowUpCheck --> AdaptiveFollowUp: Score < 6 (Incomplete / Weak Answer)
    AdaptiveFollowUp --> WaitingForAnswer: Ask Sharp Follow-Up Question
    
    FollowUpCheck --> NextDayQuestion: Score >= 6 (Solid Answer)
    NextDayQuestion --> WaitingForAnswer: Ask Next Curriculum Day Question
    
    NextDayQuestion --> Completed: Reached 8 Questions & 4 Curriculum Days
    Completed --> FeedbackReport: Generate Executive Scorecard & done: true
    FeedbackReport --> [*]
```

---

## 2. Step-by-Step Workflow Phases

### Phase 1: Candidate Initialization & Gap Discovery
1. The recruiter or user selects one of the 20 pre-configured candidates (e.g. `Sarah Johnson` - `CAND-001`).
2. The frontend sends the candidate payload to `POST /api/interview`.
3. The backend orchestrator scans the candidate's `missions` array:
   * Identifies skipped missions (e.g. Day 29 Logging & Observability).
   * Identifies high-attempt missions (attempts >= 3).
4. The system retrieves grounded subtopics from `curriculum.json` and synthesizes **Question 1**.

---

### Phase 2: Conversational Evaluation & Adaptive Follow-Up Loop
1. The candidate types their answer in the chat interface and clicks **Submit**.
2. The payload `{ sessionId, message }` is dispatched to `POST /api/interview`.
3. **Groq LLM Engine Evaluation:**
   * **Correctness & Architecture Depth:** Analyzes accuracy, trade-offs, and tool selection.
   * **Score Assignment:** Evaluated from 1 to 10.
   * **Gibberish & Skip Handling:** Inadequate responses (`skip`, `hiiii`, random keys) are immediately flagged (Score 1/10).
4. **Branching Decision:**
   * **If Score < 6:** Generates a constructive 2-sentence critique and an **Adaptive Follow-Up** drilling into the missing mechanics.
   * **If Score >= 6:** Advances to the next curriculum module day (e.g. Vector Databases → LangChain Agents → MCP → Kubernetes).

---

### Phase 3: Session Termination & Executive Scorecard Synthesis
1. When the candidate completes **Question 8**:
   * The session state is marked as `completed`.
   * The orchestrator compiles all turn scores and answers.
2. The system computes:
   * **Overall Technical Score** (Percentage 0–100%).
   * **Topic-Wise Breakdown** (Vector Search, RAG, Logging, Multi-Agent).
   * **Strengths List** (Topics with score >= 7).
   * **Areas to Improve / Gaps** (Topics with score < 7).
   * **Hiring Recommendation** (`STRONG HIRE`, `HIRE`, `CONSIDER / JUNIOR ROLE`, `NEEDS IMPROVEMENT`).
3. The response returns `done: true` and the complete `feedback` object, transitioning the frontend to the Final Report Screen.

---

## 3. Detailed Sequence Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Candidate as Candidate / Recruiter
    participant UI as Next.js Web Frontend
    participant API as FastAPI Backend
    participant Orch as BreethService
    participant RAG as RAGService
    participant LLM as Groq LLM (Llama 3.3 70B)

    Candidate->>UI: Selects Candidate & clicks Start
    UI->>API: POST /api/interview (candidate payload)
    API->>Orch: handle_interview_turn(sessionId, candidate)
    Orch->>RAG: retrieve_context_for_topic("Embeddings Explained")
    RAG-->>Orch: Context: Sentence Transformers, Cosine Similarity
    Orch->>LLM: generate_question(role, topic, context)
    LLM-->>Orch: "What approach would you take to generate embeddings..."
    Orch-->>API: InterviewTurnResponse(reply, questionNumber: 1, done: false)
    API-->>UI: 200 OK (Displays Question 1 & Progress 1/8)

    loop Conversation Turns (Questions 1 to 8)
        Candidate->>UI: Types and Submits Technical Answer
        UI->>API: POST /api/interview (sessionId, message)
        API->>Orch: handle_interview_turn(sessionId, message)
        Orch->>LLM: evaluate_response(question, candidate_answer)
        LLM-->>Orch: { score: 8, evaluation: "Solid grasp of HNSW indexing." }
        Orch->>LLM: generate_question(next_topic)
        LLM-->>Orch: Next Question Text
        Orch-->>API: InterviewTurnResponse(reply, questionNumber: N, done: false)
        API-->>UI: 200 OK (Appends AI reply & updates Progress N/8)
    end

    Candidate->>UI: Submits Final Answer (Turn 8)
    UI->>API: POST /api/interview (sessionId, message)
    API->>Orch: handle_interview_turn(sessionId, message)
    Orch->>LLM: generate_final_report(evaluations, topic_scores)
    LLM-->>Orch: { overall_score: 82.5, recommendation: "HIRE", strengths: [...], gaps: [...] }
    Orch-->>API: InterviewTurnResponse(done: true, feedback: {...})
    API-->>UI: 200 OK (Renders Final Scorecard & Performance Report)
```
