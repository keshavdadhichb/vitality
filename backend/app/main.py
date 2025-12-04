from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.db import Base, engine
from app.routes.file_routes import router as file_router
import app.models.file_model  

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],    
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(file_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Backend is running"}
