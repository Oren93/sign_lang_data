from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    password_hash = Column(String)

class Gloss(Base):
    __tablename__ = "glosses"
    id = Column(Integer, primary_key=True, index=True)
    gloss = Column(Text, unique=True, nullable=False, index=True)
    priority = Column(Integer)
    added_on = Column(DateTime(timezone=True), server_default=func.now())
