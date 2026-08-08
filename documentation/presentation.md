# Hackathon Presentation Deck & Demo Pitch

**Project Name:** InterviewIQ AI — Autonomous AI Technical Interview Agent  
**Track:** AI Agents & Autonomous Workflows  
**Live Production URL:** `https://ai-interview-agent-rf0q.onrender.com`  
**GitHub Repository:** [khushigarg05/AI-Interview-Agent](https://github.com/khushigarg05/AI-Interview-Agent)  

---

## 🎯 1. The Problem Statement

* **Manual Technical Screening is Broken:** Engineering managers spend 15–20 hours per week conducting initial technical screening calls.
* **Lack of Curriculum Grounding:** Traditional AI interview tools ask generic LeetCode questions that fail to evaluate actual day-to-day engineering competencies.
* **Subjectivity & Inconsistency:** Human interviewers introduce cognitive bias, inconsistent rubrics, and irregular follow-up depths.

---

## 💡 2. The Solution: InterviewIQ AI

**InterviewIQ AI** is an autonomous, curriculum-grounded technical interview agent that conducts real-time conversational technical assessments.

* **Syllabus-Grounded RAG:** Directly maps 31-Day AI Cohort modules into deep scenario-based questions.
* **Adaptive Follow-Up Engine:** Dynamically assesses candidate response depth and generates instant follow-ups on incomplete answers.
* **Executive Performance Scorecard:** Generates multi-dimensional competency ratings, actionable strengths, and gap recommendations upon completion.

---

## 🏗️ 3. Technical Architecture & Stack

| Layer | Technologies Used | Key Purpose |
|---|---|---|
| **API & Server** | FastAPI, Python 3.11, Uvicorn | Ultra-fast asynchronous REST APIs with full CORS and Swagger UI. |
| **LLM Engine** | Groq Cloud (`llama-3.3-70b-versatile`), LangChain | Sub-second inference latency for real-time natural conversational interview turns. |
| **Knowledge Base** | RAG Context Retriever, 31-Day JSON Syllabus | Prevents hallucination by grounding questions in real syllabus subtopics. |
| **State Store** | Thread-Safe In-Memory Session Manager | Tracks question indices, topic coverage, and candidate evaluations across turns. |
| **Cloud Hosting** | Render Web Services (Singapore) | 24/7 permanent HTTPS deployment with zero localtunnel dependencies. |

---

## 🌟 4. Key Innovations & USPs

1. **Strict Technical Specification Conformance:** Single unified endpoint (`POST /api/interview`) handling start, conversation turns, and final reports seamlessly.
2. **Adaptive Branching Logic:** Weak, skipped, or gibberish answers trigger critical feedback and drill-down follow-up questions instead of blindly progressing.
3. **Multi-Dimensional Evaluation:** Generates objective 1–10 scores, topic breakdowns (Embeddings, RAG, Logging, Multi-Agent, MCP), and hiring recommendations.

---

## 🎤 5. Live Demo Script (2-Minute Pitch for Judges)

> *"Good afternoon judges and fellow engineers!*
> 
> *Today we are thrilled to present **InterviewIQ AI**, an autonomous technical interviewer designed to revolutionize technical hiring.*
> 
> *Instead of generic trivia, InterviewIQ AI connects directly to a structured **31-Day AI Cohort Knowledge Base** and evaluates candidates against real-world engineering missions.*
> 
> *Watch as we initialize an interview for Sarah Johnson, a Senior Data Engineer. Notice how our RAG engine identifies her skipped curriculum modules and immediately synthesizes a grounded, scenario-based question on **Embeddings and Vector Search**.*
> 
> *When the candidate provides a technical response, our **Groq-powered Llama 3.3 70B engine** evaluates the answer in under 2 seconds. If the candidate answers incompletely, the AI adaptively pushes back with a sharp follow-up. When the 8-question milestone is completed, the system synthesizes a full **Executive Performance Report** with topic scores, verified strengths, and actionable gap analysis.*
> 
> *The entire backend is live on Render, fully tested with FastAPI, LangChain, and ready to scale. Thank you!"*

---

## 🚀 6. Future Roadmap

* **Live Code Execution Sandbox:** Integrated Python sandbox for real-time coding tasks and unit-test evaluations.
* **Voice-to-Voice AI:** Low-latency WebRTC integration for natural spoken technical dialogue.
* **Enterprise ATS Integration:** One-click exports to Greenhouse, Lever, and Workday.
