import requests
from app.config import AI_API_KEY, AI_API_URL

def send_file_to_ai(file_path: str) -> str:
    
    if not AI_API_URL or not AI_API_KEY:
        raise RuntimeError("AI_API_URL or AI_API_KEY not configured in .env")

    headers = {
        "Authorization": f"Bearer {AI_API_KEY}",
    }

    with open(file_path, "rb") as f:
        files = {
            "file": ("uploaded_file", f)
        }
        # Add extra params here if your API needs (e.g. model name)
        resp = requests.post(AI_API_URL, headers=headers, files=files)

    resp.raise_for_status()
    data = resp.json()

    # Adjust this based on your actual AI response
    # Example: {"result": "some text"}
    ai_text = data.get("result") or data.get("text") or str(data)
    return ai_text
