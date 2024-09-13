from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from endpoints import videos, vocabulary, user, ratings
from src.scheduler import start_scheduler
from fastapi.security import OAuth2PasswordBearer
from src.user import auth
from src.database import models
from fastapi.staticfiles import StaticFiles
import os
from fastapi.responses import FileResponse

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

UPLOAD_DIR = "videos"

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(user.router, prefix="/user")
app.include_router(vocabulary.router)
app.include_router(videos.router)
app.include_router(ratings.router, prefix="/ratings")

app.mount("/app/videos", StaticFiles(directory=UPLOAD_DIR), name="videos")

# Serve static files
app.mount("/static", StaticFiles(directory="build/static"), name="static")

# Catch-all route to serve index.html for React Router
@app.get("/{full_path:path}")
async def serve_react_app(full_path: str):
    if full_path.startswith(("user/", "api/", "videos/", "ratings/")):
        raise HTTPException(status_code=404, detail="API route not found")
    return FileResponse("build/index.html")

# Start scheduler
start_scheduler()
