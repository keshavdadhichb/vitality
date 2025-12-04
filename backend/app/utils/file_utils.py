import uuid
from pathlib import Path
from fastapi import UploadFile
from app.config import UPLOAD_DIR_PATH

# make sure uploads folder exists
UPLOAD_DIR_PATH.mkdir(parents=True, exist_ok=True)

def save_upload_file(upload_file: UploadFile) -> tuple[str, str, str]:
   
    original_filename = upload_file.filename
    suffix = Path(original_filename).suffix  # e.g. ".pdf"
    stored_filename = f"{uuid.uuid4().hex}{suffix}"

    full_path: Path = UPLOAD_DIR_PATH / stored_filename

    with full_path.open("wb") as buffer:
        buffer.write(upload_file.file.read())

    return original_filename, stored_filename, str(full_path)
