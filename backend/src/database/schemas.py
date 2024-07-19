from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    username: str
    password_salted: str

    class Config:
        from_attributes = True

class User(UserBase):
    id: int
    username: str

    class Config:
        from_attributes = True

class RatingBase(BaseModel):
    rating: int
    comment: Optional[str] = None

class RatingCreate(RatingBase):
    video_id: int

class Rating(RatingBase):
    id: int
    user_id: int
    video_id: int
    created_at: datetime

    class Config:
        from_attributes = True

class VideoWithRatings(BaseModel):
    id: int
    url: str
    average_rating: float
    ratings_count: int

    class Config:
        from_attributes = True
