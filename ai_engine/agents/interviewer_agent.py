"""
Interviewer Agent for AI Interview Engine.
Generates role-specific, scenario-based interview questions.
"""
from typing import Optional
from backend.services.llm_services import llm_service


class InterviewerAgent:
    def __init__(self):
        pass

    def generate_question(
        self,
        candidate_name: str,
        role: str,
        topic: str,
        difficulty: str = "medium",
        question_num: int = 1,
        context: Optional[str] = None,
    ) -> str:
        return llm_service.generate_question(
            candidate_name=candidate_name,
            role=role,
            topic=topic,
            difficulty=difficulty,
            question_num=question_num,
            context=context,
        )

    def generate_follow_up(self, previous_question: str, candidate_answer: str, topic: str) -> str:
        return llm_service.generate_follow_up(
            previous_question=previous_question,
            candidate_answer=candidate_answer,
            topic=topic,
        )


interviewer_agent = InterviewerAgent()
