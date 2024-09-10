from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from src.database.database import SessionLocal
from src.database.models import Gloss, GlossVideo, Video

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
        words = db.query(Gloss).all()
        word_list = {word.id: word.gloss for word in words}
        return {"words": word_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/glosses")
async def get_glosses(db: Session = Depends(get_db)):
    """
    Send a list of glosses with their video count to frontend
    """
    try:
        glosses = db.query(Gloss, func.count(GlossVideo.id).label('video_count')).outerjoin(GlossVideo).group_by(Gloss.id).all()
        gloss_list = [{"id": gloss.id, "gloss": gloss.gloss, "video_count": video_count} for gloss, video_count in glosses]
        return {"glosses": gloss_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/gloss/{gloss_id}/videos")
async def get_gloss_videos(gloss_id: int, db: Session = Depends(get_db)):
    """
    Send a list of videos associated with a specific gloss
    """
    try:
        gloss = db.query(Gloss).filter(Gloss.id == gloss_id).first()
        if not gloss:
            raise HTTPException(status_code=404, detail="Gloss not found")
        
        videos = db.query(Video).join(GlossVideo).filter(GlossVideo.gloss_id == gloss_id).all()
        video_list = [{"id": video.id, "url": video.url} for video in videos]
        return {"gloss": gloss.gloss, "videos": video_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))