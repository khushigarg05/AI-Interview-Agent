import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.routes.health import router as health_router
from backend.routes.interview import router as interview_router
from backend.routes.feedback import router as feedback_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="AI Interview Agent Backend conforming to official single endpoint POST /api/interview specification and 31-day AI Cohort curriculum.",
    version="1.0.0",
)

# Configure CORS for Next.js / frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes
app.include_router(health_router)
app.include_router(interview_router)
app.include_router(feedback_router)


@app.get("/")
def home():
    return {
        "status": "running",
        "project": settings.PROJECT_NAME,
        "docs_url": "/docs",
        "official_endpoint": "POST /api/interview",
        "supported_endpoints": [
            "GET  /health",
            "POST /api/interview",
            "POST /start-interview",
            "POST /next-question",
            "POST /submit-answer",
            "POST /end-interview",
            "GET  /feedback/{session_id}",
        ],
    }


if __name__ == "__main__":
    uvicorn.run("backend.main:app", host=settings.HOST, port=settings.PORT, reload=True)