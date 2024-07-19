from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from src.database.database import get_db
from src.database.models import Video, VideoRating, User
from src.database.schemas import RatingCreate, Rating, VideoWithRatings
from src.user.auth import get_current_user
from typing import List
import random

router = APIRouter()

@router.post("/rate", response_model=Rating)
async def rate_video(
    rating: RatingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    db_rating = VideoRating(
        video_id=rating.video_id,
        user_id=current_user.id,
        rating=rating.rating,
        comment=rating.comment
    )
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)
    return db_rating

@router.get("/random", response_model=VideoWithRatings)
async def get_random_video(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get all video IDs
    video_ids = db.query(Video.id).all()
    
    # Shuffle the IDs and select one
    random_id = random.choice(video_ids)[0]
    
    # Get the video with its average rating and rating count
    video = db.query(Video, 
                     func.avg(VideoRating.rating).label('average_rating'),
                     func.count(VideoRating.id).label('ratings_count')) \
              .outerjoin(VideoRating) \
              .filter(Video.id == random_id) \
              .group_by(Video.id) \
              .first()
    
    if not video:
        raise HTTPException(status_code=404, detail="No videos found")
    
    return VideoWithRatings(
        id=video.Video.id,
        url=video.Video.url,
        average_rating=float(video.average_rating) if video.average_rating else None,
        ratings_count=video.ratings_count
    )

@router.get("/video/{video_id}/ratings", response_model=List[Rating])
async def get_video_ratings(
    video_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    ratings = db.query(VideoRating).filter(VideoRating.video_id == video_id).all()
    return ratings