from pydantic import BaseModel, Field
from typing import Optional, Dict, Any


# Official API Specification Model
class InterviewTurnRequest(BaseModel):
    sessionId: str = Field(..., description="Unique interview session ID", example="abc-123")
    candidate: Optional[Dict[str, Any]] = Field(default=None, description="Candidate object from candidates.json")
    message: Optional[str] = Field(default=None, description="Candidate's answer/response to the AI question")


# Legacy / Helper routes models for extended UI support
class StartInterviewRequest(BaseModel):
    candidate_id: str = Field(..., description="ID of the candidate e.g. CAND-001", example="CAND-001")
    role: Optional[str] = Field(default="AI Engineer", description="Role applied for")


class NextQuestionRequest(BaseModel):
    session_id: str = Field(..., description="Active interview session ID")


class SubmitAnswerRequest(BaseModel):
    session_id: str = Field(..., description="Active interview session ID")
    question_id: str = Field(..., description="ID of the question being answered")
    answer: str = Field(..., description="Candidate's answer text")


class EndInterviewRequest(BaseModel):
    session_id: str = Field(..., description="Active interview session ID")
