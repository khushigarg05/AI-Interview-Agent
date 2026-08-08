# Prompts & AI Engineering Log — InterviewIQ AI

**Project:** InterviewIQ AI — Autonomous Technical Interview Agent  
**Live Production URL:** `https://ai-interview-agent-rf0q.onrender.com`  
**Official API Endpoint:** `https://ai-interview-agent-rf0q.onrender.com/api/interview`  
**Feedback Report API:** `https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id}`  
**Interactive Swagger Docs:** `https://ai-interview-agent-rf0q.onrender.com/docs`  
**Health Check:** `https://ai-interview-agent-rf0q.onrender.com/health`  

---

## 1. UI & DESIGN SYSTEM SPECIFICATION PROMPT

### Implementation Plan — Stitch UI System for The Interview IQ
Implement the approved 5-screen Design System for The Interview IQ platform in Next.js + React + TypeScript + Tailwind CSS.

#### User Review Required:
- **Landing Page (`/`):** "The most advanced AI cohort agent" hero section + candidate selection cards (Alex Chen, Jordan Smith, Khushi Garg, + Add Candidate).
- **Interview Session (`/interview/[id]`):** Live session screen with dark navy header, candidate profile sidebar, current topic focus card, and chat stream with submit/skip buttons.
- **Feedback Report (`/feedback/[id]`):** Executive summary with "Strong Hire" status, overall technical score progress bar, Strengths, Areas to Improve, and Topic Performance metrics.
- **Smooth Animations:** Button hover/press micro-interactions and smooth page loading transitions when clicking "START INTERVIEW", "Submit ▶", or "Back to Home".

---

## 2. BACKEND API INTEGRATION & CLOUD DEPLOYMENT PROMPT

### Implementation Plan — Live Backend API Integration
Connect the Next.js frontend to the live deployed FastAPI backend.

* **Deployed Production API Endpoint:** `https://ai-interview-agent-rf0q.onrender.com/api/interview`
* **Local Development & Tunnel Endpoint:** `https://weak-eagles-feel.loca.lt/api/interview`

#### Payload Architecture:
- **START INTERVIEW:** Sends candidate `sessionId`, member details, missions, and signals. Receives initial AI interviewer reply, `questionNumber`, and `progress`.
- **SUBMIT ANSWER:** Sends `sessionId` and candidate `message`. Receives AI evaluation reply, `done` status, and real-time score.
- **SKIP QUESTION:** Sends `sessionId` and `"Skip this question"` message. Triggers AI depth evaluation.
- **FEEDBACK RETRIEVAL:** When `done === true` (or End Session is triggered), stores the backend feedback object (`summary`, `strengths`, `gaps`, `next`) and navigates to `/feedback/[sessionId]`.

---

## 3. RAG CURRICULUM & CANDIDATE DATASET GROUNDING PROMPT

Proceed with implementing candidate-to-syllabus RAG grounding for personalized technical interviews.

* **Live Production API:** `https://ai-interview-agent-rf0q.onrender.com/api/interview`

### Requirements:
1. Map candidate profile history (`Sarah Johnson`, `Alex Chen`, `Emily Chen`, etc.) from `candidates.json` into the backend request structure.
2. Generate a unique `sessionId` when starting an interview.
3. Connect **START INTERVIEW** to `startInterview()` and display the grounded Day 7 (Embeddings) question.
4. Connect **Submit** to the backend using `{ sessionId, message }`.
5. Connect **Skip** so it sends `"Skip this question"` and triggers adaptive feedback.
6. Display each backend reply dynamically in the chat stream.
7. When `done === true`, save the returned feedback and navigate to the feedback scorecard page.
8. Make the feedback page display the backend's `summary`, `strengths`, `gaps`, and `next` dynamically.

---

## 4. PROGRESS BAR & SUBMIT BUTTON INTERACTION PROMPT

The backend sends rich UI state synchronization fields on every interview turn. Ensure the frontend binds these dynamically:

### Progress Bar & Topic Synchronization
The backend response sends these fields on every turn:
- `data.questionNumber` (e.g. 1, 2, 3...)
- `data.progress` (e.g. `"3 / 8"`)
- `data.currentTopic` (e.g. `"Embeddings & Vector Search"`)

In the React/Next.js state, update:
```javascript
setCurrentQuestion(data.questionNumber);
setProgress(data.progress);
setCurrentTopic(data.currentTopic);
```

### Submit Button State Recovery (Try/Finally)
Wrap the fetch call in a `try/finally` block so the button always re-enables:
```javascript
const handleSubmitAnswer = async () => {
  setIsSubmitting(true);
  try {
    const res = await fetch("https://ai-interview-agent-rf0q.onrender.com/api/interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "bypass-tunnel-reminder": "true"
      },
      body: JSON.stringify({
        sessionId: sessionId,
        message: userAnswer
      })
    });
    const data = await res.json();

    if (data.done) {
      setFeedback(data.feedback);
      setShowFeedbackScreen(true);
    } else {
      addMessageToChat({ sender: "AI", text: data.reply });
    }
  } catch (error) {
    console.error("Submit error:", error);
  } finally {
    setIsSubmitting(false); // Un-freezes the submit button
  }
};
```

---

## 5. GROQ LLM EVALUATION & ADAPTIVE SYSTEM PROMPTS

### System Prompt 1: Grounded Question Generation
```text
You are a Senior Technical Interviewer conducting a realistic technical interview for the role of {role}.
Candidate Name: {candidate_name}
Topic: {topic}
Difficulty: {difficulty}
Question Number: {question_num}
Context / Subtopics: {context}

Generate ONE direct, practical, real-world technical question.
Do not include pleasantries or conversational preamble, output only the question.
```

### System Prompt 2: Real-Time Answer Evaluation & Scoring
```text
You are an objective technical evaluator in an AI engineering interview.
Topic: {topic}
Question: {question}
Candidate Answer: {candidate_answer}

Evaluate the answer strictly on correctness, depth, and technical clarity.
Assign a realistic score between 1 and 10 (1=completely wrong/empty/gibberish, 5=average, 10=exceptional).
Output strictly valid JSON with no markdown:
{
  "score": <int 1-10>,
  "evaluation": "<2 sentences explaining score>",
  "needs_follow_up": <true/false>
}
```

### System Prompt 3: Adaptive Follow-Up Question Generation
```text
You are an expert technical interviewer.
Topic: {topic}
Question Asked: {previous_question}
Candidate's Answer: {candidate_answer}

The candidate gave an incomplete, weak, or brief answer.
Provide ONE brief critical critique of why the answer is insufficient, followed by ONE sharp follow-up question.
Format: <2 sentence critique> Follow-up Question: <new question>
```

---

## 6. FINAL FEEDBACK & EXECUTIVE SCORECARD INTEGRATION PROMPT

The Feedback Screen must consume live dynamic data generated by the backend orchestrator and LLM evaluator:

### Live Feedback Endpoints:
* **Primary Turn 8 Object:** Returned inside `POST /api/interview` when `done === true`
* **Dedicated REST Endpoint:** `GET https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id}`

### Dynamic Field Mapping:
- `{feedback.summary}` — Executive summary with overall technical rating.
- `{feedback.strengths}` — Strong competencies and validated best practices.
- `{feedback.gaps}` / `{feedback.areasToImprove}` — Critical knowledge gaps to address.
- `{feedback.next}` — Recommended projects and architectural next steps.
- `{feedback.recommendation}` — Hiring recommendation (`STRONG HIRE`, `HIRE`, `CONSIDER`, `NEEDS IMPROVEMENT`).

---

## 7. FINAL PRODUCTION ENDPOINT SUMMARY

| Service Name | Production Cloud URL | Method |
|---|---|---|
| **Interview Engine API** | `https://ai-interview-agent-rf0q.onrender.com/api/interview` | `POST` |
| **Feedback Report API** | `https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id}` | `GET` |
| **Interactive Swagger Docs** | `https://ai-interview-agent-rf0q.onrender.com/docs` | `GET` |
| **Health Check Probe** | `https://ai-interview-agent-rf0q.onrender.com/health` | `GET` |
