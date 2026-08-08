from fastapi import APIRouter, HTTPException, status
from backend.models.response_models import FeedbackResponse
from backend.services.breeth_service import breeth_service
from backend.services.session_service import session_service

router = APIRouter(tags=["Feedback"])


@router.get("/feedback/{session_id}", response_model=FeedbackResponse)
@router.get("/api/feedback/{session_id}", response_model=FeedbackResponse)
@router.get("/api/interview/feedback/{session_id}", response_model=FeedbackResponse)
def get_feedback(session_id: str):
    """
    Returns the comprehensive final performance report for a completed or active interview session.
    Includes overall scores, topic breakdowns, strengths, improvement areas, and hiring recommendation.
    """
    try:
        response = breeth_service.get_feedback(session_id=session_id)
        return response
    except ValueError as ve:
        # Fallback to the latest active session if specific session_id is generic
        active_sessions = session_service.list_active_sessions()
        if active_sessions:
            try:
                return breeth_service.get_feedback(session_id=active_sessions[-1])
            except Exception:
                pass

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(ve)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to generate feedback report: {str(e)}"
        )
