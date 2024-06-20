from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.database import SessionLocal
from src.database.models import Gloss

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/words")
async def get_words(db: Session = Depends(get_db)):
    """
    Send a list of words to frontend
    """
    try:
        words = db.query(Gloss.gloss).all()
        word_list = [word.gloss for word in words]
        return {"words": word_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
