import uuid
import time
from typing import Dict, Any, Optional, List


class SessionService:
    def __init__(self):
        # In-memory session store
        self._sessions: Dict[str, Dict[str, Any]] = {}

    def create_session(self, candidate_id: str, candidate_data: Dict[str, Any], role: str) -> str:
        session_id = f"sess_{uuid.uuid4().hex[:12]}"
        self._sessions[session_id] = {
            "session_id": session_id,
            "candidate_id": candidate_id,
            "candidate_name": candidate_data.get("name", "Candidate"),
            "candidate_data": candidate_data,
            "role": role,
            "questions": [],           # List of QuestionItem dicts
            "answers": [],             # List of submitted answers
            "evaluations": [],         # List of evaluations per answer
            "current_question_index": 0,
            "covered_days": set(),     # Set of curriculum days asked
            "status": "in_progress",   # "in_progress" or "completed"
            "created_at": time.time(),
            "updated_at": time.time(),
        }
        return session_id

    def get_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        return self._sessions.get(session_id)

    def add_question(self, session_id: str, question: Dict[str, Any]) -> None:
        session = self.get_session(session_id)
        if session:
            session["questions"].append(question)
            if question.get("curriculum_day"):
                session["covered_days"].add(question["curriculum_day"])
            session["current_question_index"] = len(session["questions"])
            session["updated_at"] = time.time()

    def record_answer_and_evaluation(
        self,
        session_id: str,
        question_id: str,
        answer: str,
        score: int,
        evaluation: str,
        topic: str,
        question_text: str,
    ) -> None:
        session = self.get_session(session_id)
        if session:
            session["answers"].append({
                "question_id": question_id,
                "answer": answer,
                "timestamp": time.time()
            })
            session["evaluations"].append({
                "question_id": question_id,
                "question": question_text,
                "topic": topic,
                "candidate_answer": answer,
                "score": score,
                "evaluation": evaluation,
            })
            session["updated_at"] = time.time()

    def end_session(self, session_id: str) -> Optional[Dict[str, Any]]:
        session = self.get_session(session_id)
        if session:
            session["status"] = "completed"
            session["updated_at"] = time.time()
        return session

    def list_active_sessions(self) -> List[str]:
        return list(self._sessions.keys())


session_service = SessionService()
