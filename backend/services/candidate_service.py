import json
import os
from typing import Dict, Any, Optional, List

DATA_DIR = os.path.join(os.path.dirname(os.path.dirname(__file__)), "data")
CANDIDATES_JSON_PATH = os.path.join(DATA_DIR, "candidates.json")
CURRICULUM_PATH = os.path.join(DATA_DIR, "curriculum.json")


class CandidateService:
    def __init__(self):
        self._curriculum_cache: Optional[Dict[str, Any]] = None
        self._candidates_cache: Optional[List[Dict[str, Any]]] = None

    def get_all_candidates(self) -> List[Dict[str, Any]]:
        if self._candidates_cache is not None:
            return self._candidates_cache

        if os.path.exists(CANDIDATES_JSON_PATH):
            try:
                with open(CANDIDATES_JSON_PATH, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    self._candidates_cache = data.get("candidates", [])
                    return self._candidates_cache
            except Exception:
                pass
        return []

    def get_candidate(self, candidate_id: str) -> Optional[Dict[str, Any]]:
        candidates = self.get_all_candidates()
        clean_id = candidate_id.strip().upper()

        # Check in candidates.json
        for c in candidates:
            member = c.get("member", {})
            m_id = member.get("id", "").upper()
            if m_id == clean_id or m_id.replace("-", "") == clean_id.replace("-", ""):
                return c

        return None

    def get_curriculum(self) -> Dict[str, Any]:
        if self._curriculum_cache is not None:
            return self._curriculum_cache

        if os.path.exists(CURRICULUM_PATH):
            with open(CURRICULUM_PATH, "r", encoding="utf-8") as f:
                self._curriculum_cache = json.load(f)
                return self._curriculum_cache

        return {"days": []}


candidate_service = CandidateService()
