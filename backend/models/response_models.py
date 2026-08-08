from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


# Official API Specification Models (with rich backward-compatible helper fields)
class FeedbackData(BaseModel):
    summary: str = Field(..., description="High-level performance summary")
    strengths: List[str] = Field(default_factory=list, description="Actionable concise strengths")
    gaps: List[str] = Field(default_factory=list, description="Actionable concise gaps and weak areas")
    improvements: List[str] = Field(default_factory=list, description="Alias for gaps / areas to improve")
    areasToImprove: List[str] = Field(default_factory=list, description="CamelCase alias for areas to improve")
    next: List[str] = Field(default_factory=list, description="Actionable next steps / recommendations")
    recommendation: Optional[str] = Field(default="MODERATE", description="Hiring recommendation")


class InterviewTurnResponse(BaseModel):
    reply: str = Field(..., description="AI Interviewer reply or next question")
    done: bool = Field(default=False, description="True if interview is concluded")
    feedback: Optional[FeedbackData] = Field(default=None, description="Detailed feedback report when done is True")
    # Helper fields for frontend UI state syncing
    questionNumber: Optional[int] = Field(default=1, description="Current question number e.g. 1, 2, 3")
    totalQuestions: Optional[int] = Field(default=8, description="Total number of interview questions")
    currentTopic: Optional[str] = Field(default=None, description="Current topic being asked")
    progress: Optional[str] = Field(default=None, description="e.g. 2 / 8")


# Additional detailed models for rich dashboards
class HealthResponse(BaseModel):
    status: str = Field(..., example="healthy")
    project: str = Field(..., example="InterviewIQ AI")


class QuestionItem(BaseModel):
    question_id: str
    question_text: str
    topic: str
    difficulty: str  # "easy", "medium", "hard"
    question_number: int
    total_questions: int = 8
    is_follow_up: bool = False
    curriculum_day: Optional[int] = None


class StartInterviewResponse(BaseModel):
    session_id: str
    candidate_name: str
    candidate_id: str
    role: str
    message: str
    first_question: QuestionItem


class QuestionResponse(BaseModel):
    session_id: str
    question: Optional[QuestionItem] = None
    is_completed: bool = False
    message: Optional[str] = None


class AnswerEvaluationResponse(BaseModel):
    session_id: str
    question_id: str
    score: int = Field(..., ge=1, le=10, description="Score out of 10")
    evaluation: str
    is_follow_up: bool = False
    next_question: Optional[QuestionItem] = None


class EndInterviewResponse(BaseModel):
    session_id: str
    message: str
    total_questions_answered: int
    status: str = "completed"


class QuestionFeedbackItem(BaseModel):
    question_id: str
    question: str
    topic: str
    candidate_answer: str
    score: int
    evaluation: str
    ideal_answer: Optional[str] = None


class FeedbackResponse(BaseModel):
    session_id: str
    candidate_name: str
    candidate_id: str
    role: str
    overall_score: float
    total_questions: int
    curriculum_days_covered: int
    topic_wise_scores: Dict[str, float]
    strengths: List[str]
    improvements: List[str]
    gaps: List[str] = Field(default_factory=list)
    areasToImprove: List[str] = Field(default_factory=list)
    next: List[str] = Field(default_factory=list)
    detailed_feedback: List[QuestionFeedbackItem]
    recommendation: str
    summary: str
