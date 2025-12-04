from pydantic import BaseModel
from typing import Optional

class UploadedFileOut(BaseModel):
    id: int
    original_filename: str
    stored_filename: str
    file_path: str
    ai_result: Optional[str] = None

    class Config:
        from_attributes = True


class AIResultOut(BaseModel):
    id: int
    ai_result: str
