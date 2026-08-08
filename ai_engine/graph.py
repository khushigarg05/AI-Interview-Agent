"""
Multi-Agent LangGraph Workflow for InterviewIQ AI.
Orchestrates Planner, Interviewer, and Feedback agents.
"""
from typing import Dict, Any, TypedDict, List, Optional
from ai_engine.agents.planner_agent import planner_agent
from ai_engine.agents.interviewer_agent import interviewer_agent
from ai_engine.agents.feedback_agent import feedback_agent


class InterviewState(TypedDict):
    session_id: str
    candidate_data: Dict[str, Any]
    current_question: Optional[str]
    candidate_answer: Optional[str]
    question_count: int
    covered_days: List[int]
    evaluations: List[Dict[str, Any]]
    done: bool
    final_feedback: Optional[Dict[str, Any]]


class InterviewGraph:
    """
    Workflow graph coordinating Planner, Interviewer, and Feedback Agents.
    """

    def __init__(self):
        self.planner = planner_agent
        self.interviewer = interviewer_agent
        self.feedback = feedback_agent

    def step_plan(self, state: InterviewState) -> InterviewState:
        """Plans topics and focus areas based on candidate profile."""
        plan = self.planner.analyze_candidate_profile(state["candidate_data"])
        state["covered_days"] = plan["focus_days"]
        return state

    def step_generate_question(self, state: InterviewState, topic: str, difficulty: str = "medium") -> InterviewState:
        """Generates the next technical interview question."""
        member = state["candidate_data"].get("member", {})
        name = member.get("name", "Candidate")
        role = member.get("jobRole", "AI Engineer")

        q_text = self.interviewer.generate_question(
            candidate_name=name,
            role=role,
            topic=topic,
            difficulty=difficulty,
            question_num=state["question_count"] + 1,
        )
        state["current_question"] = q_text
        state["question_count"] += 1
        return state

    def step_evaluate_response(self, state: InterviewState, topic: str) -> Dict[str, Any]:
        """Evaluates candidate answer and determines score."""
        eval_result = self.feedback.evaluate(
            question=state.get("current_question", ""),
            candidate_answer=state.get("candidate_answer", ""),
            topic=topic,
        )
        state["evaluations"].append(eval_result)
        return eval_result


interview_graph = InterviewGraph()
