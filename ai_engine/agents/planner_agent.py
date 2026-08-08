"""
Planner Agent for AI Interview Engine.
Analyzes candidate's historical missions, skipped topics, and signals to formulate the interview roadmap.
"""
from typing import Dict, Any, List


class PlannerAgent:
    def __init__(self):
        pass

    def analyze_candidate_profile(self, candidate_data: Dict[str, Any]) -> Dict[str, Any]:
        missions = candidate_data.get("missions", [])
        signals = candidate_data.get("signals", {})

        skipped_days = [m.get("day") for m in missions if m.get("skipped")]
        high_attempt_days = [m.get("day") for m in missions if m.get("attempts", 0) >= 3]
        passed_days = [m.get("day") for m in missions if m.get("passed")]

        focus_days = (skipped_days + high_attempt_days + passed_days)[:8]
        if not focus_days:
            focus_days = [7, 8, 10, 12, 16, 22, 23, 28]

        return {
            "focus_days": focus_days,
            "commit_days": signals.get("commitDays", 0),
            "first_try_rate": signals.get("missionsFirstTry", 0),
            "recommended_start_day": focus_days[0],
            "difficulty_strategy": "adaptive",
        }


planner_agent = PlannerAgent()
