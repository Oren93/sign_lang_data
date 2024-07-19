from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

Base = declarative_base()

class Migration(Base):
    __tablename__ = "migrations"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, unique=True, nullable=False)
    applied_at = Column(DateTime(timezone=True), server_default=func.now())

class Video(Base):
    __tablename__ = "videos"
    id = Column(Integer, primary_key=True, index=True)
    signer = Column(Integer, ForeignKey('users.id'), nullable=False)
    url = Column(String, nullable=False)
    fps = Column(Integer)
    uploaded_at = Column(DateTime(timezone=True), server_default=func.now())
    user = relationship("User", back_populates="videos")
    glosses = relationship("Gloss", secondary="gloss_videos", back_populates="videos")
    ratings = relationship("VideoRating", back_populates="video")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)
    videos = relationship("Video", back_populates="user")

class Gloss(Base):
    __tablename__ = "glosses"
    id = Column(Integer, primary_key=True, index=True)
    gloss = Column(Text, unique=True, nullable=False, index=True)
    priority = Column(Integer)
    added_on = Column(DateTime(timezone=True), server_default=func.now())
    videos = relationship("Video", secondary="gloss_videos", back_populates="glosses")

class GlossVideo(Base):
    __tablename__ = 'gloss_videos'
    id = Column(Integer, primary_key=True, autoincrement=True)
    gloss_id = Column(Integer, ForeignKey('glosses.id', ondelete='CASCADE'), nullable=False)
    video_id = Column(Integer, ForeignKey('videos.id', ondelete='CASCADE'), nullable=False)

    __table_args__ = (
        UniqueConstraint('gloss_id', 'video_id', name='unique_gloss_video'),
    )

class VideoRating(Base):
    __tablename__ = "video_ratings"
    id = Column(Integer, primary_key=True, index=True)
    video_id = Column(Integer, ForeignKey('videos.id'), nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    rating = Column(Integer, nullable=False)
    comment_text = Column(Text)
    posted_on = Column(DateTime(timezone=True), server_default=func.now())
    video = relationship("Video", back_populates="ratings")
    user = relationship("User")