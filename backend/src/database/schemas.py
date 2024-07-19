from pydantic import BaseModel, Field, validator
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
    rating: int = Field(..., ge=0, le=10)  # Rating must be between 0 and 10
    comment_text: Optional[str] = None

    @validator('rating')
    def rating_not_null(cls, v):
        if v is None:
            raise ValueError('Rating cannot be null')
        return v

class RatingCreate(RatingBase):
    video_id: int

class Rating(RatingBase):
    id: int
    user_id: int
    video_id: int
    posted_on: datetime

    class Config:
        from_attributes = True

class VideoWithRatings(BaseModel):
    id: int
    url: str
    average_rating: Optional[float] = None
    ratings_count: int

    class Config:
        from_attributes = True