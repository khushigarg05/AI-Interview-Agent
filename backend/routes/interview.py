from fastapi import APIRouter, HTTPException, status
from backend.models.request_models import (
    InterviewTurnRequest,
    StartInterviewRequest,
    NextQuestionRequest,
    SubmitAnswerRequest,
    EndInterviewRequest,
)
from backend.models.response_models import (
    InterviewTurnResponse,
    StartInterviewResponse,
    QuestionResponse,
    AnswerEvaluationResponse,
    EndInterviewResponse,
)
from backend.services.breeth_service import breeth_service

router = APIRouter(tags=["Interview"])


# =====================================================================
# OFFICIAL SPECIFICATION ENDPOINT: POST /api/interview
# =====================================================================
@router.post("/api/interview", response_model=InterviewTurnResponse)
def api_interview_turn(request: InterviewTurnRequest):
    """
    Official single endpoint required by Technical Specification:
    1. Start Interview: { "sessionId": "abc-123", "candidate": { ... } }
       -> { "reply": "...", "done": false }
    2. Conversation Turn: { "sessionId": "abc-123", "message": "..." }
       -> { "reply": "...", "done": false }
    3. End Interview:
       -> { "reply": "Interview completed.", "done": true, "feedback": { "summary": "...", "strengths": [...], "gaps": [...], "next": [...] } }
    """
    try:
        response = breeth_service.handle_interview_turn(
            session_id=request.sessionId,
            candidate_data=request.candidate,
            message=request.message,
        )
        return response
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Interview turn processing error: {str(e)}"
        )


# =====================================================================
# MODULAR / DASHBOARD ENDPOINTS
# =====================================================================
@router.post("/start-interview", response_model=StartInterviewResponse, status_code=status.HTTP_201_CREATED)
def start_interview(request: StartInterviewRequest):
    """Initializes an interview session for candidate ID."""
    try:
        return breeth_service.start_interview(
            candidate_id=request.candidate_id,
            role=request.role
        )
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/next-question", response_model=QuestionResponse)
def get_next_question(request: NextQuestionRequest):
    """Fetches the next curriculum question."""
    try:
        return breeth_service.get_next_question(session_id=request.session_id)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/submit-answer", response_model=AnswerEvaluationResponse)
def submit_answer(request: SubmitAnswerRequest):
    """Submits answer and returns score and evaluation."""
    try:
        return breeth_service.evaluate_answer(
            session_id=request.session_id,
            question_id=request.question_id,
            answer=request.answer,
        )
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))


@router.post("/end-interview", response_model=EndInterviewResponse)
def end_interview(request: EndInterviewRequest):
    """Ends interview session."""
    try:
        return breeth_service.end_interview(session_id=request.session_id)
    except ValueError as ve:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e))
