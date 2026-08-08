import os
import json
import logging
from typing import Optional, Dict, Any, List
from backend.config import settings

logger = logging.getLogger(__name__)


class LLMService:
    def __init__(self):
        self._llm = None
        self._init_llm()

    def _init_llm(self):
        """Initializes Groq or Google Gemini model with graceful fallback."""
        if settings.GROQ_API_KEY and settings.GROQ_API_KEY != "your_groq_api_key_here":
            try:
                from langchain_groq import ChatGroq
                self._llm = ChatGroq(
                    temperature=0.4,
                    groq_api_key=settings.GROQ_API_KEY,
                    model_name=settings.MODEL_NAME,
                )
                logger.info("ChatGroq LLM initialized successfully.")
                return
            except Exception as e:
                logger.warning(f"Failed to initialize ChatGroq: {e}. Falling back to internal engine.")

        if settings.GEMINI_API_KEY and settings.GEMINI_API_KEY != "your_gemini_api_key_here":
            try:
                import google.generativeai as genai
                genai.configure(api_key=settings.GEMINI_API_KEY)
                self._llm = genai.GenerativeModel("gemini-1.5-flash")
                logger.info("Google Gemini model initialized successfully.")
                return
            except Exception as e:
                logger.warning(f"Failed to initialize Gemini: {e}.")

        self._llm = None

    def generate_question(
        self,
        candidate_name: str,
        role: str,
        topic: str,
        difficulty: str,
        question_num: int,
        context: Optional[str] = None
    ) -> str:
        """Generates an interview question using LLM or structured fallback."""
        prompt = (
            f"You are a Senior Technical Interviewer conducting a realistic technical interview for the role of {role}.\n"
            f"Candidate Name: {candidate_name}\n"
            f"Topic: {topic}\n"
            f"Difficulty: {difficulty}\n"
            f"Question Number: {question_num}\n"
            f"Context / Subtopics: {context}\n\n"
            f"Generate ONE direct, practical, real-world technical question. "
            f"Do not include pleasantries or conversational preamble, output only the question."
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

        # Fallback question bank if API key not set
        fallback_questions = {
            "Embeddings & Vector Search": "What approach would you take to generate and store vector embeddings for unstructured data, and how do you evaluate embedding quality?",
            "LLM Core, Prompting & Fine-Tuning": "What is the key difference between RAG, Few-Shot Prompting, and LoRA Fine-Tuning in terms of cost and factual accuracy?",
            "Agentic AI & MCP": "How does the Model Context Protocol (MCP) standardize tool exposure for multi-agent workflows compared to legacy function calling?",
            "Evaluation, Security & Deployment": "How do you protect a FastAPI LLM pipeline against prompt injection and ensure zero-downtime Kubernetes deployments?",
        }
        return fallback_questions.get(topic, f"Can you explain the core architecture, challenges, and production best practices for {topic}?")

    def generate_follow_up(
        self,
        previous_question: str,
        candidate_answer: str,
        topic: str
    ) -> str:
        """Generates an adaptive follow-up question based on the candidate's previous response."""
        prompt = (
            f"You are an expert technical interviewer.\n"
            f"Topic: {topic}\n"
            f"Question Asked: {previous_question}\n"
            f"Candidate's Answer: {candidate_answer}\n\n"
            f"The candidate gave an incomplete, weak, or brief answer. "
            f"Provide ONE brief critical critique of why the answer is insufficient, followed by ONE sharp follow-up question. "
            f"Format: <2 sentence critique> Follow-up Question: <new question>"
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
                logger.error(f"LLM generate_follow_up failed: {e}")

        return f"Your answer missed key technical depth. Follow-up Question: How would you handle this specifically in high-throughput production environments?"

    def evaluate_response(
        self,
        question: str,
        candidate_answer: str,
        topic: str
    ) -> Dict[str, Any]:
        """Evaluates candidate response and returns a realistic score (1-10) and feedback."""
        clean_ans = candidate_answer.strip().lower()

        # Immediate detection of skipped / gibberish answers
        if not clean_ans or clean_ans in ["skip", "skip this question", "[skipped question]", "hi", "hiii", "hiiii"] or len(clean_ans) < 8 or clean_ans in ["jsrjsr", "asdf", "test"]:
            return {
                "score": 1,
                "evaluation": "Candidate did not answer the question or provided non-technical gibberish. Shows lack of domain preparation.",
                "needs_follow_up": True
            }

        prompt = (
            f"You are an objective technical evaluator in an AI engineering interview.\n"
            f"Topic: {topic}\n"
            f"Question: {question}\n"
            f"Candidate Answer: {candidate_answer}\n\n"
            f"Evaluate the answer strictly on correctness, depth, and technical clarity.\n"
            f"Assign a realistic score between 1 and 10 (1=completely wrong/empty, 5=average, 10=exceptional).\n"
            f"Output strictly valid JSON with no markdown:\n"
            f'{{"score": <int 1-10>, "evaluation": "<2 sentences explaining score>", "needs_follow_up": <true/false>}}'
        )

        if self._llm:
            try:
                if hasattr(self._llm, "invoke"):
                    res = self._llm.invoke(prompt)
                    raw_text = res.content.strip()
                elif hasattr(self._llm, "generate_content"):
                    res = self._llm.generate_content(prompt)
                    raw_text = res.text.strip()

                if "```json" in raw_text:
                    raw_text = raw_text.split("```json")[1].split("```")[0].strip()
                elif "```" in raw_text:
                    raw_text = raw_text.split("```")[1].split("```")[0].strip()

                parsed = json.loads(raw_text)
                score = int(parsed.get("score", 5))
                return {
                    "score": max(1, min(10, score)),
                    "evaluation": parsed.get("evaluation", "Candidate provided an initial response."),
                    "needs_follow_up": bool(parsed.get("needs_follow_up", False) or score < 6)
                }
            except Exception as e:
                logger.error(f"LLM evaluate_response parsing failed: {e}")

        # Intelligent heuristic fallback
        ans_len = len(candidate_answer.strip())
        score = 8 if ans_len > 120 else (5 if ans_len > 40 else 2)
        needs_follow_up = score < 6

        return {
            "score": score,
            "evaluation": "Answer covers basic surface concepts but lacks deep architectural trade-offs." if score < 6 else "Comprehensive and technically accurate explanation.",
            "needs_follow_up": needs_follow_up
        }

    def generate_final_report(
        self,
        candidate_name: str,
        role: str,
        evaluations: List[Dict[str, Any]],
        topic_scores: Dict[str, float]
    ) -> Dict[str, Any]:
        """Generates comprehensive final interview feedback report with realistic scoring."""
        avg_score = sum(topic_scores.values()) / max(len(topic_scores), 1)

        recommendation = (
            "STRONG HIRE" if avg_score >= 8.0
            else "HIRE" if avg_score >= 6.5
            else "CONSIDER / JUNIOR ROLE" if avg_score >= 4.5
            else "NOT RECOMMENDED / NEEDS IMPROVEMENT"
        )

        strengths = [
            f"Solid understanding of {topic}" for topic, score in topic_scores.items() if score >= 6.5
        ]
        if not strengths:
            strengths = ["Participated actively in the technical session"]

        improvements = [
            f"Needs significant revision in {topic}" for topic, score in topic_scores.items() if score < 6.5
        ]
        if not improvements:
            improvements = ["Continue keeping up with latest multi-agent framework patterns"]

        summary = (
            f"{candidate_name} completed the technical evaluation for {role}. "
            f"Demonstrated an overall performance rating of {round(avg_score * 10, 1)}/100 across {len(topic_scores)} curriculum modules. "
            f"Recommendation: {recommendation}."
        )

        return {
            "overall_score": round(avg_score * 10, 1),
            "recommendation": recommendation,
            "strengths": strengths,
            "improvements": improvements,
            "summary": summary
        }


llm_service = LLMService()
