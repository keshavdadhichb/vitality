#!/usr/bin/env python3
"""
bootstrap_project.py
Creates the secure-doc-llm project skeleton with starter files.
Usage:
    python bootstrap_project.py            # run in current directory
    python bootstrap_project.py --target /path/to/repo
"""

import os
import argparse
from textwrap import dedent

PROJECT_FILES = {
    "README.md": dedent("""
        # secure-doc-llm
        Starter repo for Secure LLM-based Bank Document Understanding

        ## Quickstart
        1. Create a virtualenv: `python -m venv .venv && source .venv/bin/activate`
        2. Install: `pip install -r requirements.txt`
        3. Run: `uvicorn src.app.main:app --reload --port 8080`
    """).strip(),

    ".gitignore": dedent("""
        .venv/
        __pycache__/
        .pytest_cache/
        *.pyc
        .env
        .idea/
        .vscode/
        /data/
        /models/
    """).strip(),

    "requirements.txt": dedent("""
        fastapi
        uvicorn[standard]
        python-multipart
        pillow
        pytesseract
        pdf2image
        opencv-python
        pydantic
        pytest
    """).strip(),

    "docker/Dockerfile": dedent("""
        FROM python:3.10-slim
        WORKDIR /app
        COPY requirements.txt .
        RUN pip install --no-cache-dir -r requirements.txt
        COPY src/ src/
        EXPOSE 8080
        CMD ["uvicorn", "src.app.main:app", "--host", "0.0.0.0", "--port", "8080"]
    """).strip(),

    ".github/workflows/ci.yml": dedent("""
        name: CI
        on: [push,pull_request]
        jobs:
          build:
            runs-on: ubuntu-latest
            steps:
              - uses: actions/checkout@v4
              - name: Set up Python
                uses: actions/setup-python@v4
                with:
                  python-version: 3.10
              - name: Install deps
                run: |
                  python -m pip install --upgrade pip
                  pip install -r requirements.txt
              - name: Run tests
                run: |
                  pytest -q
    """).strip(),

    "src/app/main.py": dedent("""
        from fastapi import FastAPI, UploadFile, File
        from src.pii.redact import redact_text
        from src.audit.audit_logger import write_audit

        app = FastAPI(title="Secure Doc LLM - API")

        @app.get("/")
        def root():
            return {"status":"ok","service":"secure-doc-llm"}

        @app.post("/upload")
        async def upload(file: UploadFile = File(...), actor: str = "anonymous"):
            contents = await file.read()
            # placeholder: save file to /data and trigger processing
            # for now just log the upload and return filename
            filename = file.filename or "unnamed"
            write_audit(actor=actor, action="upload", resource=filename, fields=[], pii_redacted=False, purpose="ingest")
            text = "[OCR output would be here]"  # placeholder for OCR result
            redacted = redact_text(text)
            return {"filename": filename, "redacted_preview": redacted}
    """).strip(),

    "src/pii/redact.py": dedent("""
        import re
        def redact_text(text: str) -> str:
            \"\"\"Very small example of PII masking. Replace with production-safe logic.\"\"\"
            if text is None:
                return text
            # mask long digit sequences (account numbers)
            text = re.sub(r'\\b\\d{9,20}\\b', lambda m: 'X'*(len(m.group(0))-4) + m.group(0)[-4:], text)
            # mask Aadhaar-like patterns (4 4 4)
            text = re.sub(r'\\b\\d{4}\\s?\\d{4}\\s?\\d{4}\\b', '[REDACTED_AADHAAR]', text)
            # mask phone numbers (basic)
            text = re.sub(r'\\b\\d{10}\\b', lambda m: m.group(0)[:6] + 'XXXX', text)
            return text
    """).strip(),

    "src/audit/audit_logger.py": dedent("""
        import json, datetime, uuid, os
        AUDIT_FILE = os.getenv('AUDIT_FILE','audit.log')

        def write_audit(actor, action, resource, fields, pii_redacted, purpose, extra=None):
            entry = {
                "event_id": str(uuid.uuid4()),
                "timestamp": datetime.datetime.utcnow().isoformat() + "Z",
                "actor": actor,
                "action": action,
                "resource": resource,
                "fields_accessed": fields,
                "pii_redacted": pii_redacted,
                "purpose": purpose,
                "extra": extra or {}
            }
            with open(AUDIT_FILE, "a") as f:
                f.write(json.dumps(entry) + "\\n")
    """).strip(),

    "src/ocr/ocr.py": dedent("""
        # Minimal OCR wrapper example (tesseract required)
        from pdf2image import convert_from_path
        import pytesseract

        def pdf_to_text(pdf_path):
            pages = convert_from_path(pdf_path)
            texts = []
            for p in pages:
                texts.append(pytesseract.image_to_string(p))
            return "\\n".join(texts)
    """).strip(),

    "tests/test_smoke.py": dedent("""
        def test_smoke():
            assert 1 + 1 == 2
    """).strip(),
}

def create_file(path, content):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"created: {path}")

def main(target_dir):
    print("Bootstrapping project at:", target_dir)
    for rel_path, content in PROJECT_FILES.items():
        path = os.path.join(target_dir, rel_path)
        create_file(path, content)
    # create empty folders specified in earlier plan
    folders = [
        "src/model",
        "src/federation",
        "src/utils",
        "data",
        "models",
        "examples"
    ]
    for d in folders:
        p = os.path.join(target_dir, d)
        os.makedirs(p, exist_ok=True)
    print("Bootstrap complete. Review files, customize, and do not commit secrets.")

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--target", "-t", default=".", help="Target directory (repo root)")
    args = parser.parse_args()
    main(os.path.abspath(args.target))
