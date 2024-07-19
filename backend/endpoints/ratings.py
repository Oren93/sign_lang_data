from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.sql import func
from src.database.database import get_db
from src.database.models import Video, VideoRating, User
from src.database.schemas import RatingCreate, Rating, VideoWithRatings
from src.user.auth import get_current_user
import random
from typing import Optional
from pydantic import ValidationError


router = APIRouter()

@router.get("/random", response_model=VideoWithRatings)
async def get_random_video(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get all video IDs that the current user hasn't rated yet
    rated_video_ids = db.query(VideoRating.video_id).filter(VideoRating.user_id == current_user.id)
    unrated_videos = db.query(Video).filter(~Video.id.in_(rated_video_ids)).all()
    
    if not unrated_videos:
        raise HTTPException(status_code=404, detail="No unrated videos found")
    
    # Select a random video from the unrated videos
    random_video = random.choice(unrated_videos)
    
    # Get the average rating and rating count for this video
    rating_stats = db.query(
        func.avg(VideoRating.rating).label('average_rating'),
        func.count(VideoRating.id).label('ratings_count')
    ).filter(VideoRating.video_id == random_video.id).first()
    
    return VideoWithRatings(
        id=random_video.id,
        url=random_video.url,
        average_rating=float(rating_stats.average_rating) if rating_stats.average_rating else None,
        ratings_count=rating_stats.ratings_count
    )

@router.post("/rate", response_model=Rating)
async def rate_video(
    rating: RatingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        # This will raise a ValidationError if rating is outside 0-10 or null
        rating_validated = RatingCreate(**rating.dict())
    except ValidationError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Check if the user has already rated this video
    existing_rating = db.query(VideoRating).filter(
        VideoRating.video_id == rating_validated.video_id,
        VideoRating.user_id == current_user.id
    ).first()
    
    if existing_rating:
        raise HTTPException(status_code=400, detail="You have already rated this video")
    
    # Create new rating
    db_rating = VideoRating(
        video_id=rating_validated.video_id,
        user_id=current_user.id,
        rating=rating_validated.rating,
        comment_text=rating_validated.comment_text
    )
    db.add(db_rating)
    db.commit()
    db.refresh(db_rating)
    
    return Rating(
        id=db_rating.id,
        user_id=db_rating.user_id,
        video_id=db_rating.video_id,
        rating=db_rating.rating,
        comment_text=db_rating.comment_text,
        posted_on=db_rating.posted_on
    )



@router.get("/video/{video_id}", response_model=VideoWithRatings)
async def get_video_with_ratings(
    video_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    video = db.query(Video).filter(Video.id == video_id).first()
    if not video:
        raise HTTPException(status_code=404, detail="Video not found")
    
    rating_stats = db.query(
        func.avg(VideoRating.rating).label('average_rating'),
        func.count(VideoRating.id).label('ratings_count')
    ).filter(VideoRating.video_id == video_id).first()
    
    return VideoWithRatings(
        id=video.id,
        url=video.url,
        average_rating=float(rating_stats.average_rating) if rating_stats.average_rating else None,
        ratings_count=rating_stats.ratings_count
    )