from pathlib import Path
import os
from dotenv import load_dotenv

# project root = backend/
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")

DATABASE_URL: str = os.getenv("DATABASE_URL", "")
AI_API_KEY: str = os.getenv("AI_API_KEY", "")
AI_API_URL: str = os.getenv("AI_API_URL", "")
UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")

UPLOAD_DIR_PATH = BASE_DIR / UPLOAD_DIR
