import os
import json
from typing import List, Dict, Any, Optional

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")


class RAGService:
    def __init__(self):
        self._curriculum_docs = []
        self._load_curriculum_docs()

    def _load_curriculum_docs(self):
        cpath = os.path.join(DATA_DIR, "curriculum.json")
        if os.path.exists(cpath):
            try:
                with open(cpath, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    for day_info in data.get("days", []):
                        title = day_info.get("title") or day_info.get("topic") or f"Day {day_info.get('day', 1)}"
                        objectives = day_info.get("objectives", []) or day_info.get("subtopics", [])
                        doc = {
                            "day": day_info.get("day", 1),
                            "topic": str(title),
                            "subtopics": objectives,
                            "text": f"Day {day_info.get('day')}: {title} covering {', '.join(objectives)}"
                        }
                        self._curriculum_docs.append(doc)
            except Exception:
                pass

    def retrieve_context_for_topic(self, topic: Optional[str]) -> str:
        """Retrieves curriculum subtopics and context for question generation."""
        if not topic:
            return "AI, Machine Learning, and Software Architecture fundamentals."

        safe_topic = str(topic).lower()
        for doc in self._curriculum_docs:
            doc_topic = str(doc.get("topic", "")).lower()
            if safe_topic in doc_topic or doc_topic in safe_topic:
                subtopics = doc.get("subtopics", [])
                subtopics_str = ", ".join(subtopics) if isinstance(subtopics, list) else str(subtopics)
                return f"Curriculum Day {doc.get('day')} - Topics: {subtopics_str}"

        # Default fallback context
        return f"Core principles, trade-offs, and practical implementations of {topic}"


rag_service = RAGService()
