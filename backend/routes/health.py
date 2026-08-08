from fastapi import APIRouter
from backend.models.response_models import HealthResponse
from backend.config import settings

router = APIRouter(tags=["Health"])


@router.get("/health", response_model=HealthResponse)
def health_check():
    """Health check endpoint to verify backend status."""
    return HealthResponse(
        status="healthy",
        project=settings.PROJECT_NAME
    )
