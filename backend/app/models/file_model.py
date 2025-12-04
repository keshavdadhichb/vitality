from sqlalchemy import Column, Integer, String, Text
from app.db import Base

class UploadedFile(Base):
    __tablename__ = "uploaded_files"

    id = Column(Integer, primary_key=True, index=True)
    original_filename = Column(String(255), nullable=False)
    stored_filename = Column(String(255), nullable=False)
    file_path = Column(Text, nullable=False)      # path on disk
    ai_result = Column(Text, nullable=True)       # AI response text
