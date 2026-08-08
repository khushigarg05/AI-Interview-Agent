# InterviewIQ AI — Adaptive AI Technical Interview Platform

An AI-powered technical interview agent designed to conduct realistic, adaptive engineering interviews based on a candidate's actual learning journey and curriculum progress.

---

## 📌 Project Overview

**InterviewIQ AI** transforms technical hiring and practice interviews by replacing generic chatbot questions with structured, curriculum-aware assessment sessions. The platform inspects a candidate's completed learning modules (e.g., RAG, Vector Databases, Prompt Engineering, Agentic AI), dynamic AI agents formulate tailored questions, evaluate candidate responses in real-time, generate dynamic follow-up questions, and output a comprehensive performance assessment report.

---

## 🔄 Candidate Journey & Core Workflow

```text
  ┌──────────────────────────┐
  │ Candidate Opens Website  │
  └─────────────┬────────────┘
                │
                ▼
  ┌──────────────────────────┐
  │ Select Candidate Profile │  (e.g., Khushi - AI Engineering Track)
  └─────────────┬────────────┘
                │
                ▼
  ┌──────────────────────────┐
  │ Backend Loads Profile &  │  (Reads completed modules & skill context)
  │ AI Inspects Curriculum   │
  └─────────────┬────────────┘
                │
                ▼
  ┌──────────────────────────┐
  │ AI Decides First Question│  (Tailored technical evaluation)
  └─────────────┬────────────┘
                │
                ▼
  ┌──────────────────────────┐
  │ Candidate Answers        │  (Text response / Microphone input)
  └─────────────┬────────────┘
                │
                ▼
  ┌──────────────────────────┐
  │ AI Evaluates Answer &    │  (Adaptive follow-ups based on accuracy)
  │ Asks Follow-up Question  │
  └─────────────┬────────────┘
                │
                ▼
  ┌──────────────────────────┐
  │ Generate Assessment      │  (Overall score, metric ratings, strengths,
  │ Performance Report       │   and recommended revisions)
  └──────────────────────────┘

  ### **✨ Key Features**
Candidate Profile & Curriculum Inspection:

Loads candidate-specific profiles (e.g., Khushi) and checks completed learning modules (e.g., 24 of 31 days completed).
Identifies focus areas to evaluate: Retrieval-Augmented Generation (RAG), Vector Databases, Prompt Engineering, Agentic AI, and Model Context Protocol (MCP).
Adaptive Live Technical Interview Room:

Planner Agent: Selects relevant technical topics based on difficulty settings (Foundational, Intermediate, Advanced).
Interviewer Agent: Conducts live technical Q&A, analyzes candidate answers, and dynamically asks intelligent follow-up questions when responses need elaboration or trade-off analysis.
Dual Input Mode: Supports both rich text entry and voice/microphone input.
Detailed Candidate Assessment Report:

Generates a candidate evaluation dashboard with an overall performance score (e.g., 78 / 100).
Breakdown across 5 core competency metrics: Technical Understanding, Conceptual Clarity, Problem Solving, Communication, and Adaptability.
Highlights specific candidate Strengths, Areas to Improve, and Recommended Revision Topics.

🛠️ Technology Stack
Frontend
Framework: Next.js 16 (App Router) & React 19
Language: TypeScript
Styling: Tailwind CSS v4
Design System: Custom warm, uncluttered design tokens (#FDFBF7 sand background, #2D2A26 espresso typography, #C86D51 terracotta accents, #6B7C98 steel blue progress indicators)
Backend
Framework: FastAPI (Python)
REST APIs: Structured endpoints for interview session management, answer evaluation, and score calculation.
AI Engine
Multi-Agent Orchestration: LangChain / LangGraph architecture
planner_agent.py: Formulates evaluation plans from curriculum metadata.
interviewer_agent.py: Conducts live interviews and generates adaptive follow-ups.
feedback_agent.py: Calculates score metrics and actionable candidate revision plans.


**REPOSITORY STRUCTURE**
vicodathon_interview_ps2/
├── frontend/                     # Next.js 16 Web Application
│   ├── app/
│   │   ├── page.tsx              # Candidate Selection & Landing Page
│   │   ├── setup/page.tsx        # Profile Loading & Curriculum Inspection
│   │   ├── interview/[id]/       # Live AI Interview Room (Q&A + Follow-ups)
│   │   └── feedback/[id]/        # Assessment Performance Report
│   ├── components/               # Reusable UI & Layout Components
│   │   ├── layout/Navbar.tsx     # Header Navigation Bar
│   │   └── ui/                   # Button, Card, Badge, ProgressBar
│   ├── lib/
│   │   ├── types.ts              # TypeScript Data Interfaces
│   │   └── mockData.ts           # Default Candidate Profile (Khushi) & Questions
│   ├── globals.css               # Design tokens & CSS variables
│   └── package.json              # Frontend Dependencies
│
├── backend/                      # FastAPI Backend Server
│   ├── main.py                   # FastAPI Application Entrypoint
│   ├── config.py                 # Environment Configuration
│   ├── routes/                   # API Routes (interview.py, feedback.py)
│   ├── services/                 # Business Logic Services
│   └── requirements.txt          # Python Dependencies
│
├── ai_engine/                    # Multi-Agent AI System
│   ├── graph.py                  # Agent Workflow Graph
│   └── agents/                   # Agent Implementations
│       ├── planner_agent.py      # Curriculum & Question Planner
│       ├── interviewer_agent.py  # Adaptive Interviewer Agent
│       └── feedback_agent.py     # Assessment & Scoring Agent
│
└── README.md                     # Project Documentation


🚀 Getting Started & Local Setup
Prerequisites
Node.js (v18.x or later)
npm (v9.x or later)
Python (v3.11 or later)

Step 1: Clone the Repository
git clone https://github.com/khushigarg05/vicodathon_interview_ps2.git
cd vicodathon_interview_ps2


Step 2: Set Up & Run the Frontend
Navigate into the frontend folder:

bash


cd frontend
Install dependencies:

bash


npm install
Start the Next.js development server:

bash


npm run dev
Open your browser and visit: 👉 http://localhost:3000



Step 3: Set Up & Run the Backend (FastAPI)
Open a new terminal window and navigate to backend:

bash


cd backend
Create and activate a Python virtual environment:

bash


# Windows (PowerShell)
python -m venv venv
.\venv\Scripts\Activate
# macOS / Linux
python3 -m venv venv
source venv/bin/activate
Install required Python packages:

bash


pip install -r requirements.txt
Start the FastAPI server:

bash


uvicorn main:app --reload --port 8000
Access FastAPI API docs at: 👉 http://localhost:8000/docs

🛣️ Application Page Routes
Candidate Selection: http://localhost:3000/
Profile Setup & Curriculum Inspection: http://localhost:3000/setup
Live AI Technical Interview Room: http://localhost:3000/interview/session-1
Candidate Feedback & Assessment Report: http://localhost:3000/feedback/session-1
