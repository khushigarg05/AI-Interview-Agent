# Prompts Used During Frontend Development

## 1. STITCH UI REDESIGN PROMPT

# Implementation Plan - Stitch UI Redesign for AI Interview Agent

Implement the approved 5-image Stitch Design System for The Interview IQ platform in Next.js + React + TypeScript + Tailwind CSS.

## User Review Required

IMPORTANT

Design Alignment: Everything created yesterday will be replaced with the pixel-accurate Stitch design system shown in your attached mockups:

- Landing Page (/): "The most advanced AI cohort agent" hero section + candidate selection cards (Alex Chen, Jordan Smith, Khushi Garg, + Add Candidate).
- Interview Session (/interview/[id]): Live session screen with dark navy header, candidate profile sidebar, current topic focus card, and chat stream with submit/skip buttons.
- Feedback Report (/feedback/[id]): Executive summary with "Strong Hire" status, overall technical score progress bar, Strengths, Areas to Improve, and Topic Performance metrics.
- Smooth Animations: Button hover/press micro-interactions and smooth page loading transitions when clicking "START INTERVIEW", "Submit ▶", or "Back to Home".

## Proposed Changes

### Frontend Design System & Tokens

Modify globals.css

- Define CSS custom properties for Stitch colors:
  - Header Dark Navy: #151E28 / #182230
  - Primary Brand Teal Accent: #007A63
  - Hover Teal: #006250
  - Soft Teal Tint: #E6F4F1
  - Card & Background neutrals: #F8FAFC, #FFFFFF, #E2E8F0
  - Status Indicators: #10B981 (Green), #F97316 (Orange), #EF4444 (Red)
- Add keyframe animations for smooth button clicks, ripple press, and page route transitions.

Modify layout.tsx

- Ensure root layout accommodates full-width top headers seamlessly.

### Core Components & UI Libraries

Modify Button.tsx

- Implement Stitch button styles (Primary Teal, Secondary Outline, Dark Nav Outline, Danger Red Outline).
- Add micro-animations: scale feedback on active press (active:scale-95), loading state spinner indicator.

New PageTransition.tsx

- Lightweight wrapper providing smooth entrance animations (fade-in and slide-up) for seamless page navigation.

Modify mockData.ts

- Update mock data with candidates from the Stitch design:
  - Alex Chen: 60% progress, Skipped: System Design, Data Structures.
  - Jordan Smith: 25% progress, Skipped: None.
  - Khushi Garg: 75% progress (2/8 active session), Skipped: Binary Trees, System Design.

### App Pages & Routes

Modify page.tsx

- Rebuild landing page matching Image 4:
  - Header: Dark navbar with The Interview IQ, Company, Help Center, social links.
  - Hero Card: Headline "The most advanced AI cohort agent", italicized subtext, candidate interview photo with soft gradient.
  - Profile Selection Grid: Alex Chen, Jordan Smith, Khushi Garg, plus dashed "+ Add Candidate" placeholder.
  - Interactive "START INTERVIEW" buttons with click animation leading to candidate session.

Modify app/interview/[id]/page.tsx

- Rebuild live session screen matching Image 1:
  - Top Navy Header with navigation tabs (Dashboard, Sessions, Analytics, Settings), candidate status (Status: Paused), and End Session action.
  - Left Sidebar: Candidate Profile, Live Session Overview, progress (2/8), skipped topics, and active topic card ("Vector Databases").
  - Right Workspace: Chat stream displaying AI interviewer questions, candidate response, input textarea with mic/code tools, Skip, and animated Submit ▶ buttons.

Modify app/feedback/[id]/page.tsx

- Rebuild feedback report screen matching Images 2 & 3:
  - Top bar with Download and "Back to Home" buttons.
  - Left drawer: InterviewIQ, AI Interviewer badge, section links (Overview, Live Stream, Code Editor, Feedback, Settings), Help Center, Invite Candidate.
  - Main Panel: Executive Summary with "Strong Hire" badge, Overall Technical Score progress bar (85/100), Strengths card, Areas to Improve card, and Performance by Topic chart.

## Verification Plan

### Automated Verification

- Run npm run build inside frontend/ to confirm zero TypeScript compile or Next.js build errors.
- Run npm run dev to verify localhost startup.

### Manual Verification

- Check landing page layout, colors, font hierarchy, candidate cards, and image alignment.
- Click "START INTERVIEW" to verify smooth button click animation and navigation to /interview/khushi.
- Test candidate response input and "Submit ▶" button animation on the active interview page.
- Test navigation to feedback report page (/feedback/khushi) and verify summary, strengths, areas to improve, and performance charts.


---

## 2. BACKEND API INTEGRATION PROMPT

# Implementation Plan - Live Backend API Integration

Connect the Next.js Stitch frontend to the live deployed FastAPI backend.

Deployed API Endpoint:
https://weak-eagles-feel.loca.lt/api/interview

## Payload Architecture

- START INTERVIEW: Sends candidate sessionId, member details, missions, and signals. Receives initial AI interviewer reply.
- SUBMIT ANSWER: Sends sessionId and candidate message. Receives AI reply, done status, and optional feedback.
- SKIP QUESTION: Sends sessionId and "Skip this question" message.
- FEEDBACK NAVIGATION: When done === true (or End Session is triggered), stores the backend feedback object (summary, strengths, gaps, next) and navigates to /feedback/[sessionId].
- UI INTEGRATION: The exact Stitch layout, styling, and animations will remain 100% intact.

## Proposed Changes

### API Service Layer

New api.ts

- Implement startInterview(sessionId, candidatePayload): sends POST request to start session.
- Implement sendInterviewMessage(sessionId, message): sends POST request with user answer or skip command.
- Implement feedback storage utilities (setSessionFeedback, getSessionFeedback) using sessionStorage so feedback persists seamlessly across page navigation.
- Implement network fallback to mockData.ts if offline or connection fails.

Modify types.ts

- Add TypeScript interfaces for BackendCandidatePayload, BackendInterviewResponse, and BackendFeedback.

### Page Components & Integration

Modify page.tsx

- Connect candidate profile cards (Sarah Johnson / Khushi, Alex Chen, Jordan Smith) to initialize the live interview session via startInterview() before routing to /interview/[sessionId].

Modify app/interview/[id]/page.tsx

- On page load, initialize or load the conversation for sessionId.
- On Submit ▶, send candidate's text input to sendInterviewMessage(sessionId, message).
- On Skip, send "Skip this question" to sendInterviewMessage(sessionId, "Skip this question").
- When backend returns done: true, save the returned feedback object and route to /feedback/[sessionId].

Modify app/feedback/[id]/page.tsx

- Retrieve backend feedback (summary, strengths, gaps, next) for the session and map it to the Stitch feedback dashboard elements (Executive Summary, Strengths, Areas to Improve/Gaps, and Recommended Next Steps).


---

## 3. NEW BACKEND ENDPOINT / CANDIDATE MAPPING PROMPT

Yes, proceed with implementing all 5 identified gaps.

IMPORTANT: The backend developer has provided a new deployed API URL. Use this as the current API endpoint:

https://weak-eagles-feel.loca.lt/api/interview

Do NOT use the previous https://tidy-terms-hammer.loca.lt/api/interview URL.

Please:

1. Keep the Stitch candidates as Alex Chen, Jordan Smith, and Khushi Garg. Sarah Johnson is only the example candidate from the backend documentation.
2. Map each candidate's existing frontend/mock data into the backend's required candidate payload structure.
3. Generate a unique sessionId when starting an interview.
4. Connect START INTERVIEW to startInterview() and display the real backend reply.
5. Connect Submit to the backend using { sessionId, message }.
6. Connect Skip so it sends exactly "Skip this question".
7. Display each backend reply dynamically in the chat stream.
8. When done === true, save the returned feedback and navigate to the feedback page.
9. Make the feedback page display the backend's summary, strengths, gaps, and next dynamically.
10. Keep the existing Stitch UI, layout, styling, and animations unchanged.

Do not invent any additional endpoints or change the backend request/response format.

After implementation, run npm run build and report any errors.


---

## 4. PROGRESS BAR + SUBMIT BUTTON FIX PROMPT

The backend is working 100%. Here is the exact fix for the Progress bar & Submitting button in the frontend:

### Progress Bar Fix

The backend response now sends these fields on every turn:

- data.questionNumber (e.g. 1, 2, 3...)
- data.progress (e.g. "3 / 8")
- data.currentTopic (e.g. "Embeddings & Vector Search")

In the React/Next.js state, update:

setCurrentQuestion(data.questionNumber);
setProgress(data.progress);
setCurrentTopic(data.currentTopic);

The interview sidebar and progress bar should use these values dynamically instead of hardcoded values.

### Submitting Button Fix

Make sure the fetch call is wrapped in a try/finally block so the button always re-enables:

const handleSubmitAnswer = async () => {
  setIsSubmitting(true);

  try {
    const res = await fetch(
      "https://weak-eagles-feel.loca.lt/api/interview",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "bypass-tunnel-reminder": "true"
        },
        body: JSON.stringify({
          sessionId: sessionId,
          message: userAnswer
        })
      }
    );

    const data = await res.json();

    if (data.done) {
      setFeedback(data.feedback);
      setShowFeedbackScreen(true);
    } else {
      addMessageToChat({
        sender: "AI",
        text: data.reply
      });
    }
  } catch (error) {
    console.error("Submit error:", error);
  } finally {
    setIsSubmitting(false);
  }
};

The Submit button must never remain stuck in the loading state after an API error.

Keep the existing Stitch UI unchanged.


---

## 5. PERMANENT RENDER BACKEND MIGRATION PROMPT

The backend has now been permanently deployed and is live on Render.

Use this as the final interview API endpoint:

https://ai-interview-agent-rf0q.onrender.com/api/interview

Replace the previous temporary localtunnel endpoint.

Do not use:

https://weak-eagles-feel.loca.lt/api/interview

Only update the API configuration.

Do not change the existing Stitch frontend design, layout, styling, animations, candidate cards, interview UI, progress bar, Submit/Skip functionality, or feedback UI.

Run npm run build from the frontend directory after the change and confirm that the build passes successfully.


---

## 6. DYNAMIC FEEDBACK FIX PROMPT

The backend evaluation is working correctly, but the Feedback Screen contains hardcoded/dummy data.

Replace the hardcoded feedback values with the real backend feedback.

The frontend must use the backend feedback dynamically:

{feedback.summary}

{feedback.strengths}

{feedback.gaps}

{feedback.next}

The feedback page must NOT hardcode:

- 85 / 100
- Strong Hire
- Alex Chen
- Algorithmic Problem Solving
- Dummy strengths
- Dummy gaps

Use the actual values returned by the backend.

If a value is not provided by the backend, do not invent one.

Keep the existing Stitch Feedback UI exactly as it is.


---

## 7. FINAL FEEDBACK API INTEGRATION PROMPT

I NEED YOU TO FIX THE FEEDBACK GENERATION/RETRIEVAL END-TO-END. DO NOT REDESIGN OR CHANGE MY EXISTING FRONTEND UI.

The backend developer has provided the FINAL production backend URLs:

INTERVIEW API:
https://ai-interview-agent-rf0q.onrender.com/api/interview

FEEDBACK REPORT API:
https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id}

SWAGGER/DOCUMENTATION:
https://ai-interview-agent-rf0q.onrender.com/docs

HEALTH CHECK:
https://ai-interview-agent-rf0q.onrender.com/health

IMPORTANT: The Feedback Report API is a SEPARATE endpoint from the Interview API.

The current frontend reaches the Feedback page, but it displays:

"No evaluation summary available for this session."
"No strengths recorded."
"No areas to improve recorded."

This means the frontend is not successfully retrieving the actual backend feedback.

PLEASE DEBUG THIS PROPERLY IN THE EXISTING CODE.

### REQUIRED TASK

1. Inspect the CURRENT frontend/lib/api.ts, frontend/lib/types.ts, frontend/app/interview/[id]/page.tsx, and frontend/app/feedback/[id]/page.tsx.

2. Inspect the backend API documentation at:
https://ai-interview-agent-rf0q.onrender.com/docs

Determine the EXACT request/response format of:
- POST /api/interview
- GET /feedback/{session_id}

Do NOT guess the response structure.

3. Keep the interview API exactly as it currently works:

POST:
https://ai-interview-agent-rf0q.onrender.com/api/interview

The existing:
- startInterview()
- sendAnswer()
- skipQuestion()

must continue working.

4. When the interview finishes and the backend indicates done === true, make sure we have the correct sessionId.

5. IMPORTANT:

If the final /api/interview response does NOT contain the complete feedback object, DO NOT assume feedback is missing.

Instead, call the separate Feedback Report API:

GET:
https://ai-interview-agent-rf0q.onrender.com/feedback/${sessionId}

Use the actual session ID generated for that interview.

6. Retrieve the REAL feedback from that endpoint and save it for the feedback page.

7. The Feedback page must display the REAL backend data:
- summary
- strengths
- gaps
- next

8. Remove all fallback behavior that silently makes the Feedback page look empty when the backend request fails.

If the feedback API fails, show a clear frontend error such as:
"Unable to load interview feedback. Please try again."

Do NOT silently display:
"No evaluation summary available for this session."

9. Do NOT use hardcoded:
- 85 / 100
- Strong Hire
- Alex Chen
- Algorithmic Problem Solving
- fake strengths
- fake gaps
- fake topics

10. If the backend response contains score/recommendation fields, use those real fields dynamically.

If the backend DOES NOT provide score/recommendation fields, do NOT invent them.

11. Keep the existing Stitch Feedback UI exactly as it is. Only replace the data source.

12. Keep the existing:
- candidate selection
- interview UI
- progress bar
- question number
- current topic
- Submit
- Skip
- animations
- styling
- routing

13. Do NOT create another backend endpoint.
Do NOT change the backend.
Do NOT rewrite the application.
Do NOT replace the Stitch design.

### VERY IMPORTANT DEBUGGING REQUIREMENT

Before declaring this fixed, actually verify the complete flow:

START INTERVIEW
→ POST /api/interview
→ receive question
→ Submit/Skip
→ continue interview
→ backend returns done === true
→ obtain the correct sessionId
→ GET /feedback/${sessionId}
→ receive real feedback
→ display it on /feedback/[id]

Also inspect the browser/network/API errors if necessary.

If the Feedback API response shape differs from the old feedback object, update the TypeScript types and mapping accordingly.

### FINAL VERIFICATION

After implementation:

1. Run:
npm run build

2. Report:
- exactly which files changed
- the exact Feedback API response shape discovered
- how the frontend now retrieves feedback
- whether the build passed

DO NOT say "fixed" unless the separate /feedback/{session_id} endpoint is actually integrated into the frontend feedback flow.

Again: PRESERVE THE CURRENT FRONTEND UI. This is a DATA/API INTEGRATION FIX ONLY.


---

## 8. FINAL API CONFIGURATION

The final production backend endpoints used by the frontend are:

### Interview API

https://ai-interview-agent-rf0q.onrender.com/api/interview

### Feedback Report API

https://ai-interview-agent-rf0q.onrender.com/feedback/{session_id}

### Swagger Documentation

https://ai-interview-agent-rf0q.onrender.com/docs

### Health Check

https://ai-interview-agent-rf0q.onrender.com/health
