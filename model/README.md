# secure-doc-llm
Starter repo for Secure LLM-based Bank Document Understanding

## Quickstart
1. Create a virtualenv: `python -m venv .venv && source .venv/bin/activate`
2. Install: `pip install -r requirements.txt`
3. Run: `uvicorn src.app.main:app --reload --port 8080`