import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings:
    PROJECT_NAME: str = "InterviewIQ AI - AI Interview Agent"
    GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
    BREETH_API_KEY: str = os.getenv("BREETH_API_KEY", "")
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    MODEL_NAME: str = os.getenv("MODEL_NAME", "llama-3.3-70b-versatile")
    HOST: str = os.getenv("HOST", "0.0.0.0")
    PORT: int = int(os.getenv("PORT", 8000))
    MIN_QUESTIONS: int = 8
    MIN_CURRICULUM_DAYS: int = 4

settings = Settings()
