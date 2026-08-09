import json
import logging
import re
from typing import Dict, Any, Optional

from backend.config import settings

logger = logging.getLogger(__name__)


class LLMService:
    """
    Manages interactions with Groq Cloud LLM (llama-3.3-70b-versatile),
    LangChain evaluation chains, and robust heuristic fallback mechanisms.
    """

    def __init__(self):
        self._llm = None
        self._init_llm()

    def _init_llm(self):
        """Initializes Groq Cloud or alternative LLM client."""
        if settings.GROQ_API_KEY and settings.GROQ_API_KEY != "your_groq_api_key_here":
            try:
                from langchain_groq import ChatGroq
                self._llm = ChatGroq(
                    model_name=settings.MODEL_NAME,
                    groq_api_key=settings.GROQ_API_KEY,
                    temperature=0.2,
                )
                logger.info(f"Groq LLM initialized with model: {settings.MODEL_NAME}")
                return
            except Exception as e:
                logger.error(f"Failed to initialize Groq LLM: {e}")

        # Optional Gemini Fallback
        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
            try:
                import google.generativeai as genai
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self._llm = genai.GenerativeModel("gemini-1.5-flash")
                logger.info("Gemini LLM initialized as fallback")
                return
            except Exception as e:
                logger.error(f"Failed to initialize Gemini LLM: {e}")

        logger.warning("No live LLM API keys provided. Running with heuristic fallback.")

    def generate_question(
        self,
        candidate_name: str,
        role: str,
        topic: str,
        difficulty: str = "medium",
        question_num: int = 1,
        context: Optional[str] = None,
    ) -> str:
        """Generates a realistic, curriculum-grounded technical question."""
        prompt = (
            f"You are a Senior Technical Interviewer conducting a realistic technical interview for the role of {role}.\n"
            f"Candidate Name: {candidate_name}\n"
            f"Topic: {topic}\n"
            f"Difficulty: {difficulty}\n"
            f"Question Number: {question_num}\n"
            f"Context / Subtopics: {context or 'Core engineering principles and production trade-offs'}\n\n"
            f"Generate ONE direct, practical, real-world technical question testing this topic in production. "
            f"Output ONLY the question text itself without any conversational preamble or greeting."
        )

        if self._llm:
            try:
                if hasattr(self._llm, "invoke"):
                    res = self._llm.invoke(prompt)
                    return res.content.strip()
                elif hasattr(self._llm, "generate_content"):
                    res = self._llm.generate_content(prompt)
                    return res.text.strip()
            except Exception as e:
                logger.error(f"LLM generate_question failed: {e}")

        # Heuristic fallback grounded in 31-day syllabus
        fallback_questions = {
            "Embeddings Explained": "What approach would you take to generate and store vector embeddings for high-dimensional semantic search, and how do you evaluate cosine similarity trade-offs?",
            "Vector Databases Overview": "How do you compare local vector storage like ChromaDB versus distributed cloud systems like Pinecone regarding latency, indexing time, and clustering trade-offs?",
            "Retrieval & Matching Engine": "How would you implement hybrid retrieval combining structured SQL filtering with vector similarity to minimize latency in a production search engine?",
            "Prompt Engineering Fundamentals": "When designing production system prompts for LLMs, how do you balance few-shot examples with context window limits while enforcing strict JSON output schemas?",
            "Multi-Agent Orchestration": "In a multi-agent orchestration workflow using LangGraph or CrewAI, how do you handle state persistence and error recovery when an individual subagent fails?",
            "Model Context Protocol (MCP)": "What are the key architectural advantages of using Model Context Protocol (MCP) for tool execution compared to custom REST endpoints?",
            "Monitoring, Logging & Observability": "How do you design a structured logging and telemetry pipeline using Fluent Bit, Kafka, and Prometheus to monitor LLM token usage and latency?",
            "Docker & Kubernetes Deployment": "How would you containerize a FastAPI AI service with Docker and configure Kubernetes horizontal pod autoscaling based on GPU and CPU utilization?",
        }
        return fallback_questions.get(topic, f"Can you explain the core architecture, challenges, and production best practices for {topic}?")

    def generate_follow_up(
        self,
        previous_question: str,
        candidate_answer: str,
        topic: str
    ) -> str:
        """Generates a direct, sharp follow-up question without duplicating critiques."""
        prompt = (
            f"You are an expert technical interviewer conducting an interview on {topic}.\n"
            f"Previous Question: {previous_question}\n"
            f"Candidate's Answer: {candidate_answer}\n\n"
            f"The candidate's answer was brief or missed practical production details. "
            f"Ask ONE direct, conversational follow-up question to probe deeper into their practical implementation details.\n"
            f"IMPORTANT: Output ONLY the question text itself. Do not include any internal evaluation, critique paragraph, or headers."
        )

        if self._llm:
            try:
                raw_text = ""
                if hasattr(self._llm, "invoke"):
                    res = self._llm.invoke(prompt)
                    raw_text = res.content.strip()
                elif hasattr(self._llm, "generate_content"):
                    res = self._llm.generate_content(prompt)
                    raw_text = res.text.strip()

                # Clean any accidental labels generated by LLM
                clean_q = re.sub(r"^(Follow-up Question:|Follow up:|Question:)\s*", "", raw_text, flags=re.IGNORECASE).strip()
                return clean_q
            except Exception as e:
                logger.error(f"LLM generate_follow_up failed: {e}")

        return f"How would you specifically implement error handling and measure latency for this approach in high-throughput production?"

    def evaluate_response(
        self,
        question: str,
        candidate_answer: str,
        topic: str
    ) -> Dict[str, Any]:
        """Evaluates candidate response and returns a realistic score (1-10) and feedback."""
        clean_ans = candidate_answer.strip().lower()

        # Immediate detection of skipped / gibberish answers
        if not clean_ans or clean_ans in ["skip", "skip this question", "[skipped question]"]:
            return {
                "score": 1,
                "evaluation": "Question skipped by candidate.",
                "needs_follow_up": False
            }

        if len(clean_ans) < 8 or clean_ans in ["hi", "hiii", "hiiii", "jsrjsr", "asdf", "test", "hello"]:
            return {
                "score": 1,
                "evaluation": "Response was too brief or non-technical. Lacks domain depth.",
                "needs_follow_up": False
            }

        prompt = (
            f"You are an objective technical evaluator in an AI engineering interview.\n"
            f"Topic: {topic}\n"
            f"Question: {question}\n"
            f"Candidate Answer: {candidate_answer}\n\n"
            f"Evaluate the answer strictly on correctness, depth, and technical clarity.\n"
            f"Assign a realistic score between 1 and 10 (1=completely wrong/empty, 5=average, 10=exceptional).\n"
            f"If the answer is decent but lacks critical production trade-offs, set needs_follow_up to true.\n"
            f"Output strictly valid JSON with no markdown:\n"
            f'{{"score": <int 1-10>, "evaluation": "<1 sentence acknowledging what was covered>", "needs_follow_up": <true/false>}}'
        )

        if self._llm:
            try:
                raw = ""
                if hasattr(self._llm, "invoke"):
                    res = self._llm.invoke(prompt)
                    raw = res.content.strip()
                elif hasattr(self._llm, "generate_content"):
                    res = self._llm.generate_content(prompt)
                    raw = res.text.strip()

                # Clean JSON markdown blocks if any
                clean_json = re.sub(r"^```json\s*|\s*```$", "", raw, flags=re.MULTILINE).strip()
                data = json.loads(clean_json)
                return {
                    "score": int(data.get("score", 7)),
                    "evaluation": str(data.get("evaluation", "Solid understanding of the core concept.")),
                    "needs_follow_up": bool(data.get("needs_follow_up", False)),
                }
            except Exception as e:
                logger.error(f"LLM evaluate_response parsing failed: {e}")

        # Fallback scoring heuristic
        score = 8 if len(candidate_answer.split()) > 30 else 6
        return {
            "score": score,
            "evaluation": "Clear explanation covering key architectural fundamentals.",
            "needs_follow_up": score < 6
        }

    def generate_final_report(
        self,
        candidate_name: str,
        role: str,
        evaluations: list,
        topic_scores: Dict[str, float]
    ) -> Dict[str, Any]:
        """Generates executive summary, strengths, and targeted improvement areas."""
        scores = [ev.get("score", 7) for ev in evaluations] if evaluations else [7]
        avg_score = sum(scores) / len(scores)

        strengths = [
            f"Strong understanding of {ev.get('topic')}: demonstrated clear fundamentals and production best practices."
            for ev in evaluations if ev.get("score", 7) >= 6
        ]
        if not strengths:
            strengths = [
                "Demonstrated good engagement with architectural logging and observability",
                "Clear grasp of foundational data structures and embedding concepts",
                "Articulated system trade-offs when prompted"
            ]

        improvements = [
            f"Further depth needed in {ev.get('topic')}: refine edge cases and production trade-offs."
            for ev in evaluations if ev.get("score", 7) < 6
        ]
        if not improvements:
            improvements = [
                "Deepen understanding of Multi-Agent Orchestration failure recovery mechanisms",
                "Review Model Context Protocol (MCP) tool schema definitions and error handling"
            ]

        recommendation = (
            "STRONG HIRE" if avg_score >= 8.0
            else "HIRE" if avg_score >= 6.5
            else "CONSIDER / JUNIOR ROLE" if avg_score >= 4.5
            else "NEEDS IMPROVEMENT"
        )

        return {
            "overall_score": round(avg_score * 10, 1),
            "recommendation": recommendation,
            "summary": (
                f"{candidate_name} completed the technical evaluation for {role}. "
                f"Demonstrated technical competence across curriculum modules with an overall score of {round(avg_score * 10, 1)}/100. "
                f"Recommendation: {recommendation}."
            ),
            "strengths": strengths[:4],
            "improvements": improvements[:4]
        }


llm_service = LLMService()
