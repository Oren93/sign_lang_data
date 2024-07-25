from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from endpoints import videos, vocabulary, user, ratings
from src.scheduler import start_scheduler
from fastapi.security import OAuth2PasswordBearer
from src.user import auth
from src.database import models
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

UPLOAD_DIR = "uploaded_videos"

origins = [
    "sign_ui",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/protected")
async def protected_route(current_user: models.User = Depends(auth.get_current_user)):
    return {"message": "This is a protected route", "user": current_user.email}

app.include_router(user.router, prefix="/user")
app.include_router(vocabulary.router)
app.include_router(videos.router)
app.include_router(ratings.router, prefix="/ratings") 

app.mount("/app/videos", StaticFiles(directory=UPLOAD_DIR), name="videos")

start_scheduler()
