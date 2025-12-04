from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models.file_model import UploadedFile
from app.schemas.file_schema import UploadedFileOut, AIResultOut
from app.utils.file_utils import save_upload_file
from app.services.ai_service import send_file_to_ai

router = APIRouter(prefix="/files", tags=["files"])


@router.post(
    "/upload",
    response_model=UploadedFileOut,
    status_code=status.HTTP_201_CREATED,
)
def upload_file(
    uploaded_file: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    
    original, stored, path = save_upload_file(uploaded_file)

    
    db_file = UploadedFile(
        original_filename=original,
        stored_filename=stored,
        file_path=path,
        ai_result=None,
    )
    db.add(db_file)
    db.commit()
    db.refresh(db_file)

    
    try:
        ai_text = send_file_to_ai(path)
    except Exception as e:
        raise HTTPException(
            status_code=502,
            detail=f"Error calling AI service: {e}",
        )

    
    db_file.ai_result = ai_text
    db.commit()
    db.refresh(db_file)

    return db_file


@router.get("/{file_id}", response_model=UploadedFileOut)
def get_file_info(file_id: int, db: Session = Depends(get_db)):
    file_obj = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not file_obj:
        raise HTTPException(status_code=404, detail="File not found")
    return file_obj


@router.get("/{file_id}/ai-result", response_model=AIResultOut)
def get_ai_result(file_id: int, db: Session = Depends(get_db)):
    file_obj = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
    if not file_obj:
        raise HTTPException(status_code=404, detail="File not found")
    if not file_obj.ai_result:
        raise HTTPException(status_code=404, detail="AI result not available yet")
    return AIResultOut(id=file_obj.id, ai_result=file_obj.ai_result)
