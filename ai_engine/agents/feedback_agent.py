"""
Feedback Agent for AI Interview Engine.
Evaluates candidate responses and generates comprehensive reports.
"""
from typing import Dict, Any, List
from backend.services.llm_services import llm_service


class FeedbackAgent:
    def __init__(self):
        pass

    def evaluate(self, question: str, candidate_answer: str, topic: str) -> Dict[str, Any]:
        return llm_service.evaluate_response(
            question=question,
            candidate_answer=candidate_answer,
            topic=topic,
        )

    def generate_report(
        self,
        candidate_name: str,
        role: str,
        evaluations: List[Dict[str, Any]],
        topic_scores: Dict[str, float],
    ) -> Dict[str, Any]:
        return llm_service.generate_final_report(
            candidate_name=candidate_name,
            role=role,
            evaluations=evaluations,
            topic_scores=topic_scores,
        )


feedback_agent = FeedbackAgent()
