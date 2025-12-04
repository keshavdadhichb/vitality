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